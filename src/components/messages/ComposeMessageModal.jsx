import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export default function ComposeMessageModal({ open, onClose, onSent, currentUser, prefilledClaim = null }) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedClaimId, setSelectedClaimId] = useState(prefilledClaim?.id || '');
  const [sending, setSending] = useState(false);

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: () => databaseClients.Brand.get()
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
    await databaseClients.Message.create({
      claim_id: selectedClaim.id,
      wip_number: selectedClaim.wip_number,
      target_site: selectedClaim.site,
      subject: subject.trim() || `Re: WIP ${selectedClaim.wip_number}`,
      body: body.trim(),
      sender_email: currentUser.email,
      sender_name: currentUser.full_name || currentUser.email,
      is_reply: false
    });
    setSending(false);
    setBody('');
    setSubject('');
    setSelectedClaimId('');
    onSent?.();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
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
                      {c.wip_number} — {c.site} {c.brand ? `(${brands.find(b => b.id === c.brand)?.name})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {selectedClaim && (
            <div className="px-3 py-2 rounded-md bg-slate-50 border border-slate-200 text-sm text-slate-600">
              Sending to all processors at <strong>{selectedClaim.site}</strong> re WIP <strong>{selectedClaim.wip_number}</strong>
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