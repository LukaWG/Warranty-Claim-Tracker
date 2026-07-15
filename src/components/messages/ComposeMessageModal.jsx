import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';
import { Paperclip, X } from 'lucide-react';

export default function ComposeMessageModal({ open, onClose, onSent, currentUser, prefilledClaim = null }) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedClaimId, setSelectedClaimId] = useState(prefilledClaim?.id || '');
  const [sending, setSending] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
    files.forEach(f => {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreviews(prev => [...prev, ev.target.result]);
      reader.readAsDataURL(f);
    });
    e.target.value = '';
  };

  const removeImage = (idx) => {
    setImageFiles(prev => prev.filter((_, i) => i !== idx));
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: () => databaseClients.Brand.get()
  });

  const { data: sites = [] } = useQuery({
    queryKey: ['sites'],
    queryFn: () => databaseClients.Site.get()
  });

  const { data: claims = [] } = useQuery({
    queryKey: ['claims-for-messages'],
    queryFn: () => databaseClients.WarrantyClaim.get(),
    enabled: open
  });

  const selectedClaim = prefilledClaim || claims.find(c => c.id === selectedClaimId);

  const handleSend = async () => {
    if (!selectedClaim || !body.trim()) return;
    setSending(true);
    const msgSubject = subject.trim() || `Re: WIP ${selectedClaim.wip_number}`;
    const senderName = currentUser.full_name || currentUser.email;
    // Upload any attached images first and get their URLs
    // TODO: Implement image upload logic here and get the uploaded image URLs
    await Promise.all([
      databaseClients.Message.create({
        claim_id: selectedClaim.id,
        wip_number: selectedClaim.wip_number,
        target_site: selectedClaim.site,
        subject: msgSubject,
        body: body.trim(),
        sender_email: currentUser.email,
        sender_name: senderName,
        is_reply: false,
        image_urls: [] // Replace with actual uploaded image URLs
      }),
      databaseClients.ClaimNote.create({
        claim_id: selectedClaim.id,
        content: `[Message] ${msgSubject}\n\n${body.trim()}\n\n- ${senderName}`,
        image_urls: [] // Replace with actual uploaded image URLs
      }),
      databaseClients.WarrantyClaim.update(selectedClaim.id, { site_responded: true })
    ]);
    setSending(false);
    setBody('');
    setSubject('');
    setSelectedClaimId('');
    setImageFiles([]);
    setImagePreviews([]);
    onSent?.();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2 flex-1 min-h-0 overflow-y-auto pr-1">
          {!prefilledClaim && (
            <div className="space-y-2">
              <Label>Claim / WIP Number <span className="text-red-500">*</span></Label>
              <Select value={selectedClaimId} onValueChange={setSelectedClaimId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a claim..." />
                </SelectTrigger>
                <SelectContent>
                  {claims.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.wip_number} — {sites.find(s => s.id === c.site)?.name} {c.brand ? `(${brands.find(b => b.id === c.brand)?.name})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {selectedClaim && (
            <div className="px-3 py-2 rounded-md bg-slate-50 border border-slate-200 text-sm text-slate-600">
              Sending to all processors at <strong>{sites.find(s => s.id === selectedClaim.site)?.name}</strong> re WIP <strong>{selectedClaim.wip_number}</strong>
            </div>
          )}
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input
              placeholder={selectedClaim ? `Re: WIP ${selectedClaim.wip_number}` : 'Subject...'}
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Message <span className="text-red-500">*</span></Label>
            <Textarea
              placeholder="Write your message..."
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
          {/* Image attachments */}
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {imagePreviews.map((src, idx) => (
                <div key={idx} className="relative">
                  <img src={src} alt="" className="h-16 w-16 object-cover rounded-md border border-slate-200" />
                  <button onClick={() => removeImage(idx)} className="absolute -top-1.5 -right-1.5 bg-white rounded-full border border-slate-200 p-0.5 hover:bg-red-50">
                    <X className="h-3 w-3 text-slate-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" multiple classname="hidden" onChange={handleImageAdd} />
          <Button variant="outline" size="sm" className="w-fit gap-2" onClick={() => fileInputRef.current?.click()}>
            <Paperclip className="h-4 w-4" /> Attach Images
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSend} disabled={!selectedClaim || !body.trim() || sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}