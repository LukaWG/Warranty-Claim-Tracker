import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Send, MessagesSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { databaseClients } from '@/api/databaseClient';

const ADMIN_ROLES = ['Group Manager', 'Owner', 'Administrator'];

export default function ApprovalChat({ claim, currentUser }) {
  const queryClient = useQueryClient();
  const [body, setBody] = useState('');
  const scrollRef = useRef(null);

  const userRole = currentUser?.custom_role || currentUser?.role;
  const isApprover = ADMIN_ROLES.includes(userRole);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['approvalMessages', claim?.id],
    queryFn: () => databaseClients.ApprovalMessage.filter({ claim_id: claim.id }, 'created_date'),
    enabled: !!claim?.id,
    refetchInterval: 15000,
  });

  // Mark messages from the other party as read when loaded
  useEffect(() => {
    if (!claim?.id || !currentUser?.email || messages.length === 0) return;
    const hasUnreadFromOther = messages.some(m => !m.read && m.sender_email !== currentUser.email);
    if (!hasUnreadFromOther) return;
    databaseClients.ApprovalMessage.updateMany(
      { claim_id: claim.id, read: false, sender_email: { $ne: currentUser.email } },
      { $set: { read: true } }
    ).then(() => queryClient.invalidateQueries({ queryKey: ['approvalMessages', claim.id] }));
  }, [messages, claim?.id, currentUser?.email]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMutation = useMutation({
    mutationFn: async (text) => {
      await databaseClients.ApprovalMessage.create({
        claim_id: claim.id,
        wip_number: claim.wip_number,
        target_site: claim.site,
        body: text,
        sender_email: currentUser.email,
        sender_name: currentUser.full_name || currentUser.email,
        sender_role: isApprover ? 'approver' : 'site',
        read: false,
      });
    },
    onSuccess: () => {
      setBody('');
      queryClient.invalidateQueries({ queryKey: ['approvalMessages', claim.id] });
    },
  });

  const handleSend = () => {
    if (!body.trim()) return;
    sendMutation.mutate(body.trim());
  };

  return (
    <div className="border border-slate-200 rounded-lg bg-slate-50/50">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-200">
        <MessagesSquare className="h-4 w-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">Approval Chat</span>
      </div>
      <div ref={scrollRef} className="max-h-56 overflow-y-auto px-4 py-3 space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <div className="h-5 w-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">No messages yet. Start the conversation.</p>
        ) : (
          messages.map((m) => {
            const mine = m.sender_email === currentUser?.email;
            return (
              <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 ${mine ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>
                  {!mine && (
                    <p className="text-xs font-medium mb-0.5 text-slate-500">
                      {m.sender_name || m.sender_email}
                      {m.sender_role === 'approver' ? ' (approver)' : ' (site)'}
                    </p>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{m.body}</p>
                  <p className={`text-[10px] mt-1 ${mine ? 'text-blue-100' : 'text-slate-400'}`}>
                    {format(new Date(m.created_date), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="px-3 py-2 border-t border-slate-200 flex items-end gap-2">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type a message..."
          className="min-h-10 max-h-24 resize-none text-sm"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          size="sm"
          onClick={handleSend}
          disabled={!body.trim() || sendMutation.isPending}
          style={{ backgroundColor: 'var(--hendy-blue)' }}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}