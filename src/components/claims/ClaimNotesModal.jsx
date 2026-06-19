import React, { useState, useRef } from 'react';
import { databaseClients } from '@/api/databaseClient';
// import { useAuth } from '@/lib/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, User, Paperclip, X, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';


const ADMIN_ROLES = ['Owner', 'Admin', 'Service Manager', 'Admin Manager'];


export default function ClaimNotesModal({ claim, open, onClose, onStatusUpdate, requireNote }) {
  const [newNote, setNewNote] = useState('');
  const [selectedAlert, setSelectedAlert] = useState('Queried');
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [attachedImage, setAttachedImage] = useState(null); // { file, previewUrl }
  const [isUploading, setIsUploading] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
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
    queryFn: () => claim?.id ? databaseClients.ClaimNote.query('*', `claim_id=${claim.id}`) : [],
    enabled: !!claim?.id
  });

  const userRole = currentUser?.custom_role || currentUser?.role;
  const isAdminUser = ADMIN_ROLES.includes(userRole);
  const isProcessor = userRole === 'Processor';

  const handleWithdraw = async () => {
    if (!newNote.trim()) return;
    setIsWithdrawing(true);
    await databaseClients.WarrantyClaim.update(claim.id, { status: 'withdrawn' });
    await databaseClients.ClaimNote.create({ claim_id: claim.id, content: `[Withdrawn] ${newNote}` });
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
    if (onStatusUpdate) onStatusUpdate();
    onClose();
  }

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
          await databaseClients.WarrantyClaim.update(claim.id, { status: 'rejected' });
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

          await databaseClients.WarrantyClaim.update(claim.id, { alert: newAlert, status: newStatus });
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

      // Move to awaiting_review if claim is rejected and user is a Processor or Site Manager
      const userRole = currentUser?.custom_role || currentUser?.role;
      if (currentStatus === 'rejected' && (userRole === 'Processor' || userRole === 'Site Manager')) {
        await databaseClients.WarrantyClaim.update(claim.id, { status: 'awaiting_review' });
        await databaseClients.ClaimAudit.create({
          claim_id: claim.id,
          wip_number: claim.wip_number,
          field_changed: 'status',
          old_value: 'rejected',
          new_value: 'awaiting_review',
          change_type: 'status_changed'
        });
      }

      // Move to claimed_info_received if claim is claimed_info_requested and user is a Processor
      if (currentStatus === 'claimed_info_requested' && (userRole === 'Processor' || userRole === 'Site Manager')) {
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Claim Notes
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* {requireNote && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-md bg-amber-50 border border-amber-200">
              <span className="text-amber-500">!</span>
              <p className="text-sm text-amber-700 font-medium">Please add a note explaining this alert before it is saved.</p>
            </div>
          )} */}
          
          {/* Add Note/Withdraw Section */}
          <div className="border-b pb-6">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium block">Add Note</Label>

              {isProcessor && claim?.status !== 'withdrawn' && (
                <button
                  type="button"
                  onClick={() => setShowWithdraw(!showWithdraw)}
                  className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
                >
                  Withdraw <ChevronDown className={`h-3 w-3 transition-transform ${showWithdraw ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>

              {showWithdraw && (
                <p className="text-xs text-slate-400 mb-3 pb-3 border-b">Withdraw explanation (required)</p>
              )}

            <form onSubmit={showWithdraw ? (e) => { e.preventDefault(); handleWithdraw(); } : handleAddNote} className="space-y-3">
              <Textarea
                placeholder={showWithdraw ? "Explain why this claim is being withdrawn..." : "Enter your note..."}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-24"
              />

              {/* Image attachment preview */}
              {attachedImage && !showWithdraw && (
                <div className="relative inline-block">
                  <img
                    src={attachedImage.previewUrl}
                    alt="Attachment preview"
                    className="max-h-32 rounded-lg border border-slate-200 object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeAttachment}
                    className="absolute -top-2 -right-2 bg-white border border-slate-200 rounded-full p-0.5 text-slate-500 hover:text-red-500 shadow-sm"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {!showWithdraw && isAdminUser && !claim?.claimed && (
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
                    <Select
                      value={selectedAlert}
                      onValueChange={(value) => setSelectedAlert(value)}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Resolved" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Resolved</SelectItem>
                        {alerts.filter(a => a.active !== false && a.name !== 'Action' && a.name !== 'Credit' && (a.name !== 'Info - Post Claim' || claim?.status === 'completed')).sort((a, b) => {
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
                  {!showWithdraw && (
                    <>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-slate-500"
                      >
                        <Paperclip className="h-4 w-4 mr-1" />
                        Attach Screenshot
                      </Button>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setNewNote('');
                      setShowWithdraw(false);
                      removeAttachment();
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!newNote.trim() || (showWithdraw ? isWithdrawing : (addNoteMutation.isPending || isUploading))}
                    className={showWithdraw ? "bg-orange-600 hover:bg-orange-700" : "bg-blue-600 hover:bg-blue-700"}
                  >
                    {showWithdraw ? (
                      isWithdrawing ? "Withdrawing..." : "Confirm Withdrawal"
                    ) : (
                      isUploading ? "Uploading..." : addNoteMutation.isPending ? "Adding..." : "Add Note"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>

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