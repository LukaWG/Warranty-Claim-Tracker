import React, { useState, useRef, useEffect } from 'react';
import { databaseClients } from '@/api/databaseClient';
// import { useAuth } from '@/lib/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MessageSquare, User, Paperclip, X, ChevronDown, Send, Undo2 } from 'lucide-react';
import { format } from 'date-fns';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';


const ADMIN_ROLES = ['Owner', 'Administrator', 'Service Manager', 'Group Manager'];


export default function ClaimNotesModal({ claim, open, onClose, onStatusUpdate, requireNote }) {
  const [activeTab, setActiveTab] = useState('note'); // 'note' | 'message'
  const [newNote, setNewNote] = useState('');
  const [selectedAlert, setSelectedAlert] = useState('Queried');
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [attachedImage, setAttachedImage] = useState(null); // { file, previewUrl }
  const [isUploading, setIsUploading] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isUndoingWithdrawl, setIsUndoingWithdrawal] = useState(false);
  const [withdrawImage, setWithdrawImage] = useState(null); // { file, previewUrl }
  // Message state
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const [msgSending, setMsgSending] = useState(false);
  const [msgImageFiles, setMsgImageFiles] = useState([]);
  const [msgImagePreviews, setMsgImagePreviews] = useState([]);
  const msgFileInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  // const { user } = useAuth();

  // const { data: currentUser } = useQuery({
  //   queryKey: ['currentUser'],
  //   queryFn: () => Promise.resolve(user)
  // });

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => databaseClients.User.me(),
    staleTime: 30000,
  });

  const { data: alerts = [] } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => databaseClients.Alert.get(),
  });

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['claimNotes', claim?.id],
    queryFn: () => claim?.id ? databaseClients.ClaimNote.filter({claim_id: claim.id }, `-created_date`) : [],
    enabled: !!claim?.id
  });

  const userRole = currentUser?.custom_role || currentUser?.role;
  const isAdminUser = ADMIN_ROLES.includes(userRole);
  const isProcessor = userRole === 'Location';
  const isSiteUser = userRole === 'Location';
  const isQueried = !!claim?.alert || claim?.status === 'claimed_info_requested';
  const isWithdrawn = claim?.status === 'withdrawn';
  const canAddNote = isAdminUser || !isSiteUser || isQueried || isWithdrawn;

  // If user can't add notes, default to message tab
  useEffect (() => {
    if (!canAddNote) setActiveTab('message');
  }, [canAddNote]);

  const removeWithdrawImage = () => {
    if (withdrawImage?.previewUrl) URL.revokeObjectURL(withdrawImage.previewUrl);
    setWithdrawImage(null);
  };

  const handleWithdrawPaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type?.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          const previewUrl = URL.createObjectURL(file);
          setWithdrawImage({ file, previewUrl });
        }
        break;
      }
    }
  };

  const handleWithdraw = async () => {
    if (!newNote.trim()) return;
    setIsWithdrawing(true);
    let imageUrl = null;
    if (withdrawImage?.file) {
      const result = {file_url: ''} // TODO implement file upload
      imageUrl = result.file_url;
    }
    await databaseClients.WarrantyClaim.update(claim.id, { status: 'withdrawn', site_responded: true });
    await databaseClients.ClaimNote.create({ claim_id: claim.id, content: `[Withdrawn] ${newNote}`, ...(imageUrl ? { image_url: imageUrl } : {}) });
    await databaseClients.ClaimAudit.create({
      claim_id: claim.id,
      wip_number: claim.wip_number,
      field_changed: 'status',
      old_value: claim.status || '',
      new_value: 'withdrawn',
      change_type: 'status_changed'
    });
    queryClient.invalidateQueries({ queryKey: ['claimNotes', claim.id] });
    queryClient.invalidateQueries({ queryKey: ['claims'] });
    setNewNote('');
    setShowWithdraw(false);
    setIsWithdrawing(false);
    removeWithdrawImage();
    if (onStatusUpdate) onStatusUpdate();
    onClose();
  }

  const handleUndoWithdrawal = async () => {
    if (!newNote.trim()) return;
    setIsUndoingWithdrawal(true);
    await databaseClients.WarrantyClaim.update(claim.id, { status: 'in_progress' });
    await databaseClients.ClaimNote.create({ claim_id: claim.id, content: `[Withdrawal Undone] ${newNote}` });
    await databaseClients.ClaimNote.create({
      claim_id: claim.id,
      wip_number: claim.wip_number,
      field_changed: 'status',
      old_value: 'withdrawn',
      new_value: 'in_progress',
      change_type: 'status_changed'
    });
    queryClient.invalidateQueries({ queryKey: ['claimNotes', claim.id] });
    queryClient.invalidateQueries({ queryKey: ['claims'] });
    setNewNote('');
    setIsUndoingWithdrawal(false);
    if (onStatusUpdate) onStatusUpdate();
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setAttachedImage({ file, previewUrl });
    e.target.value = '';
  };

  const removeAttachment = () => {
    if (attachedImage?.previewUrl) URL.revokeObjectURL(attachedImage.previewUrl);
    setAttachedImage(null);
  };

  const addNoteMutation = useMutation({
    mutationFn: async ({ content, imageUrl, alert }) => {
      const note = await databaseClients.ClaimNote.create({
        claim_id: claim.id,
        content,
        ...(imageUrl ? { image_url: imageUrl } : {})
      });
      
      // Fetch fresh claim data to avoid acting on stale status from props
      const freshClaims = await databaseClients.WarrantyClaim.filter({id: claim.id });
      const freshClaim = freshClaims?.[0] || claim;
      const currentStatus = freshClaim.status || claim.status;
      const currentAlert = freshClaim.alert || claim.alert;

      // Update alert on the claim if admin user selected one
      if (isAdminUser && alert != undefined) {
        const newAlert = alert === 'none' ? '' : alert;

        // If alert is unchanged but still active, reset status back to rejected (Queried)
        if (newAlert && newAlert === (currentAlert || '') && currentStatus !== 'rejected') {
          await databaseClients.WarrantyClaim.update(claim.id, { status: 'rejected', site_responded: false });
          await databaseClients.ClaimAudit.create({
            claim_id: claim.id,
            wip_number: claim.wip_number,
            field_changed: 'status',
            old_value: currentStatus || '',
            new_value: 'rejected',
            change_type: 'status_changed'
          });
        }

        if (newAlert !== (currentAlert || '')) {
          // Apply same status logic as the edit/alert change flow
          const newStatus = newAlert === 'Info - Post Claim' ? 'claimed_info_requested' : 
            (freshClaim.claimed ? 'completed' : (newAlert ? 'rejected' : 'in_progress'));

          await databaseClients.WarrantyClaim.update(claim.id, { alert: newAlert, status: newStatus, site_responded: false });
          await databaseClients.ClaimAudit.create({
            claim_id: claim.id,
            wip_number: claim.wip_number,
            field_changed: 'alert',
            old_value: currentAlert || '',
            new_value: newAlert,
            change_type: 'updated'
          });

          if (currentStatus !== newStatus) {
            await databaseClients.ClaimAudit.create({
              claim_id: claim.id,
              wip_number: claim.wip_number,
              field_changed: 'status',
              old_value: currentStatus,
              new_value: newStatus,
              change_type: 'status_changed'
            });
          }


        }
      }

      // Set site_responded flag when any user adds a note to an in_progress claim (shows orange alert icon)
      if (currentStatus === 'in_progress') {
        await databaseClients.WarrantyClaim.update(claim.id, { site_responded: true });
      }

      // Move back to in_progress with site_responded flat if claim is queried (rejected) OR awaiting_review and user is a Location
      const userRole = currentUser?.custom_role || currentUser?.role;
      if (currentStatus === 'rejected' || currentStatus === 'awaiting_review' && (userRole === 'Location')) {
        await databaseClients.WarrantyClaim.update(claim.id, { status: 'in_progress', site_responded: true });
        await databaseClients.ClaimAudit.create({
          claim_id: claim.id,
          wip_number: claim.wip_number,
          field_changed: 'status',
          old_value: currentStatus,
          new_value: 'in_progress',
          change_type: 'status_changed'
        });
      }

      // Move to claimed_info_received if claim is claimed_info_requested and user is a Location
      if (currentStatus === 'claimed_info_requested' && (userRole === 'Location')) {
        await databaseClients.WarrantyClaim.update(claim.id, { status: 'claimed_info_received' });
        await databaseClients.ClaimAudit.create({
          claim_id: claim.id,
          wip_number: claim.wip_number,
          field_changed: 'status',
          old_value: 'claimed_info_requested',
          new_value: 'claimed_info_received',
          change_type: 'status_changed'
        });
      }

      // Create audit log for note addition
      await databaseClients.ClaimAudit.create({
        claim_id: claim.id,
        wip_number: claim.wip_number,
        field_changed: 'note_added',
        old_value: '',
        new_value: content.substring(0, 100),
        change_type: 'updated'
      });

      return note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claimNotes', claim.id] });
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      setNewNote('');
      setSelectedAlert('Information');
      setAlertEnabled(false);
      removeAttachment();
      if (onStatusUpdate) onStatusUpdate();
    }
  });

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() && !attachedImage) return;

    let imageUrl = null;
    if (attachedImage?.file) {
      setIsUploading(true);
      alert('Image upload is not implemented. The note will be added without the image.'); // Placeholder alert
      const result = { file_url: undefined }; // Replace with actual upload logic
      imageUrl = result.file_url;
      setIsUploading(false);
    }

    addNoteMutation.mutate({ content: newNote || ' ', imageUrl, alert: isAdminUser && alertEnabled ? selectedAlert : undefined });
  };

  const handleMsgImageAdd = (e) => {
    const files = Array.from(e.target.files);
    setMsgImageFiles(prev => [...prev, ...files]);
    files.forEach(f => {
      const reader = new FileReader();
      reader.onload = (ev) => setMsgImagePreviews(prev => [...prev, ev.target.result]);
      reader.readAsDataURL(f);
    });
    e.target.value = '';
  };

  const msgTextareaRef = useRef(null);
  const noteTextareaRef = useRef(null);

  const handleMsgPaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type?.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          setMsgImageFiles(prev => [...prev, file]);
          const reader = new FileReader();
          reader.onload = (ev) => setMsgImagePreviews(prev => [...prev, ev.target.result]);
          reader.readAsDataURL(file);
        }
        break;
      }
    }
  };

  const handleNotePaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type?.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          const previewUrl = URL.createObjectURL(file);
          setAttachedImage({ file, previewUrl });
        }
        break;
      }
    }
  };

  const removeMsgImage = (idx) => {
    setMsgImageFiles(prev => prev.filter((_, i) => i !== idx));
    setMsgImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSendMessage = async () => {
    if (!msgBody.trim() || !claim) return;
    setMsgSending(true);
    const senderName = currentUser.full_name || currentUser.email;
    const subject = msgSubject.trim() || `Re: WIP ${claim.wip_number}`;
    const uploadedUrls = []; // TODO: Implement image upload logic here and get the uploaded image URLs
    await Promise.all([
      databaseClients.Message.create({
        claim_id: claim.id,
        wip_number: claim.wip_number,
        target_site: claim.site,
        subject,
        body: msgBody.trim(),
        sender_email: currentUser.email,
        sender_name: senderName,
        is_reply: false,
        // @ts-ignore
        image_urls: uploadedUrls
      }),
      databaseClients.ClaimNote.create({
        claim_id: claim.id,
        wip_number: claim.wip_number,
        content: `[Message] ${msgSubject}\n\n${body.trim()}\n\n— ${senderName}`,
        // @ts-ignore
        image_urls: uploadedUrls,
      }),
      databaseClients.WarrantyClaim.update(claim.id, { site_responded: true })
    ]);
    queryClient.invalidateQueries({ queryKey: ['messages'] });
    queryClient.invalidateQueries({ queryKey: ['claimNotes', claim.id] });
    queryClient.invalidateQueries({ queryKey: ['claims'] });
    setMsgBody('');
    setMsgSubject('');
    setMsgImageFiles([]);
    setMsgImagePreviews([]);
    setMsgSending(false);
    setActiveTab('note'); // Switch back to the note tab after sending
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message Centre
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 flex-1 min-h-0 overflow-y-auto pr-1">
          {/* {requireNote && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-md bg-amber-50 border border-amber-200">
              <span className="text-amber-500">!</span>
              <p className="text-sm text-amber-700 font-medium">Please add a note explaining this alert before it is saved.</p>
            </div>
          )} */}

          {/* Tab switcher - Note tab only shown when canAddNote, Message tab hidden for site users when claim is queried */}
          <div className="flex gap-1 p-1 bg-slate-100 rounded-lg w-fit">
            {canAddNote && (
              <button
                onClick={() => setActiveTab('note')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${(activeTab === 'note' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700')}`}
              >
                Note
              </button>
            )}
            {!isSiteUser || !isQueried ? (
              <button
                onClick={() => setActiveTab('message')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === 'message' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Send className="h-3.5 w-3.5" /> Message {isProcessor ? 'Administrator' : 'Site'}
                </button>
              ) : null}
            </div>

          {/* Note form - Admin users always see it, site users only when alert exists */}
          {activeTab === 'note' && (isAdminUser || isQueried || isWithdrawn) && (
            <div className="border-b pb-6 space-y-3">
              <form onSubmit={handleAddNote} className="space-y-3">
                <Textarea
                  ref={noteTextareaRef}
                  placeholder="Enter your note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onPaste={handleNotePaste}
                  className="min-h-24"
                />

                {attachedImage && (
                  <div className="relative inline-block">
                    <img src={attachedImage.previewUrl} alt="Attachment preview" className="max-h-32 rounded-lg border border-slate-200 object-contain" />
                    <button type="button" onClick={removeAttachment} className="absolute -top-2 -right-2 bg-white border border-slate-200 rounded-full p-0.5 text-slate-500 hover:text-red-500 shadow-sm">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}

                {isAdminUser && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="alert-toggle"
                      checked={alertEnabled}
                      onCheckedChange={(checked) => {
                        setAlertEnabled(!!checked);
                        if (!checked) setSelectedAlert('Information');
                      }}
                    />
                    <label htmlFor="alert-toggle" className="text-xs text-slate-500 cursor-pointer select-none">
                      Update alert status
                    </label>
                  </div>
                  {alertEnabled && (
                    <Select value={selectedAlert} onValueChange={(val) => setSelectedAlert(val)}>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Resolved" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Resolved</SelectItem>
                        {alerts.filter(a => a.active !== false && a.name !== 'Action' && a.name !== 'Credit' && (a.name !== 'Info - Post Claim' || claim?.claimed)).sort((a, b) => {
                          if (a.name === 'Info - Post Claim') return 1;
                          if (b.name === 'Info - Post Claim') return -1;
                          return a.name.localeCompare(b.name);
                        }).map((alert) => (
                          <SelectItem key={alert.id} value={alert.name}>{alert.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="text-slate-500">
                      <Paperclip className="h-4 w-4 mr-1" /> Attach Screenshot
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => { setNewNote(''); setShowWithdraw(false); removeAttachment(); onClose(); }}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!newNote.trim() || (addNoteMutation.isPending || isUploading)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isUploading ? 'Uploading...' : addNoteMutation.isPending ? 'Adding...' : 'Add Note'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Message form */}
          {activeTab === 'message' && (
            <div className="border-b pb-6 space-y-3">
              <div>
                <Label className="text-sm font-medium mb-1 block">Subject</Label>
                <Input
                  placeholder={`Re: WIP ${claim?.wip_number}`}
                  value={msgSubject}
                  onChange={(e) => setMsgSubject(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1 block">Message <span className="text-red-500">*</span></Label>
                <Textarea
                  ref={msgTextareaRef}
                  placeholder="Write your message..."
                  value={msgBody}
                  onChange={(e) => setMsgBody(e.target.value)}
                  onPaste={handleMsgPaste}
                  className="min-h-24 resize-none"
                />
              </div>
              {msgImagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {msgImagePreviews.map((src, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={src}
                        alt=""
                        className="h-16 w-16 object-cover rounded-md border border-slate-200"
                      />
                      <button onClick={() => removeMsgImage(idx)} className="absolute -top-1.5 -right-1.5 bg-white rounded-full border border-slate-200 p-0.5 hover:bg-red-50">
                        <X className="h-3 w-3 text-slate-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input ref={msgFileInputRef} type="file" accept="image/*" hidden multiple onChange={handleMsgImageAdd} />
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => msgFileInputRef.current?.click()}>
                  <Paperclip className="h-4 w-4" /> Attach Images
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => { setMsgBody(''); setMsgSubject(''); setMsgImageFiles([]); setMsgImagePreviews([]); onClose(); }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!msgBody.trim() || msgSending} style={{ backgroundColor: 'var(--hendy-blue)' }}>
                    {msgSending ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Withdrawal Actions - Subtle header style for site users */}
          {isSiteUser && claim?.status !== 'completed' && claim?.status !== 'claimed_info_received' && (
          <div className="border-b pb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                {claim?.status === 'withdrawn' ? 'Undo Withdrawal' : 'Withdraw Claim'}
              </span>

              {claim?.status !== 'withdrawn' && (
                <button
                  type="button"
                  onClick={() => {
                    setShowWithdraw(!showWithdraw);
                    setActiveTab('note');
                  }}
                  className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
                >
                  {showWithdraw ? 'Hide' : 'Show'} <ChevronDown className={`h-3 w-3 transition-transform ${showWithdraw ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>

            {(claim?.status === 'withdrawn' || showWithdraw) && (
            <div className="mt-3 space-y-3">
              <p className="text-xs text-slate-400">
              {claim?.status === 'withdrawn' ? 'Add a note to undo withdrawal (required)' : 'Withdraw explanation (required)'}
              </p>

              <form onSubmit={claim?.status === 'withdrawn' ? (e) => { e.preventDefault(); handleUndoWithdrawal(); } : (e) => { e.preventDefault(); handleWithdraw(); } } className="space-y-3">
                <Textarea
                  placeholder={claim?.status === 'withdrawn' ? "Explain why you're undoing the withdrawal..." : "Explain why this claim is being withdrawn..."}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onPaste={handleWithdrawPaste}
                  className="min-h-24"
                />

                {withdrawImage && (
                  <div className="relative inline-block">
                    <img src={withdrawImage.previewUrl} alt="Attachment preview" className="max-h-32 rounded-lg border border-slate-200 object-contain" />
                    <button type="button" onClick={removeWithdrawImage} className="absolute -top-2 -right-2 bg-white border border-slate-200 rounded-full p-0.5 text-slate-500 hover:text-red-500 shadow-sm">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  // <div className="relative">
                  //     <img
                  //       src={src}
                  //       alt=""
                  //       className="h-16 w-16 object-cover rounded-md border border-slate-200"
                  //     />
                  //     <button onClick={() => removeMsgImage(idx)} className="absolute -top-1.5 -right-1.5 bg-white rounded-full border border-slate-200 p-0.5 hover:bg-red-50">
                  //       <X className="h-3 w-3 text-slate-500" />
                  //     </button>
                  //   </div>
                )}

              <div className="flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setNewNote('');
                      setShowWithdraw(false);
                      removeWithdrawImage();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!newNote.trim() || (claim?.status === 'withdrawn' ? isUndoingWithdrawl : isWithdrawing)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    {claim?.status === 'withdrawn' ? (isUndoingWithdrawl ? 'Restoring...' : 'Undo Withdrawal') : (isWithdrawing? 'Withdrawing...' : 'Confirm Withdrawal')}
                  </Button>
                </div>
            </form>
            </div>
            )}
          </div>
          )}

          {/* Notes List */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Notes History</Label>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-6 w-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                </div>
              ) : notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MessageSquare className="h-8 w-8 text-slate-300 mb-2" />
                  <p className="text-sm text-slate-400">No notes yet</p>
                </div>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs">
                        <User className="h-3 w-3 text-slate-400" />
                        <span className="font-medium text-slate-700">{note.created_by}</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {format(new Date(note.created_date), 'MMM d, yyyy HH:mm')}
                      </span>
                    </div>
                    {note.content && note.content.trim() !== ' ' && (
                      <p className="text-sm text-slate-600 whitespace-pre-wrap">{note.content}</p>
                    )}
                    {note.image_url && (
                      <a href={note.image_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block">
                        <img
                          src={note.image_url}
                          alt="Attached screenshot"
                          className="max-h-48 rounded-lg border border-slate-200 object-contain hover:opacity-90 transition-opacity"
                        />
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}