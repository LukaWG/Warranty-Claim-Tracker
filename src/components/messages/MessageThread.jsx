import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { Reply, MessageCircle, CheckCheck } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

function MessageBubble({ message, isOwn, readers }) {
  return (
    <div className={`flex flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'}`}>
      <div className={`max-w-[80%] rounded-xl px-4 py-2.5 ${isOwn ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-800'}`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.body}</p>
      </div>
      <span className="text-xs text-slate-400 px-1">
        {message.sender_name || message.sender_email} · {format(new Date(message.created_date), 'dd/MM/yyyy HH:mm')}
      </span>
      {isOwn && readers.length > 0 && (
        <div className="flex items-center gap-1 px-1">
          <CheckCheck className="h-3 w-3 text-teal-500" />
          <span className="text-xs text-teal-600">
            Read by {readers.map(r => r.reader_name || r.reader_email).join(', ')}
          </span>
        </div>
      )}
    </div>
  );
}

export default function MessageThread({ rootMessage, replies, currentUser, onReply, allReadReceipts = [] }) {
  const [replyBody, setReplyBody] = useState('');
  const [sending, setSending] = useState(false);
  const queryClient = useQueryClient();

  const handleSendReply = async () => {
    if (!replyBody.trim()) return;
    setSending(true);
    await databaseClients.Message.create({
      claim_id: rootMessage.claim_id,
      wip_number: rootMessage.wip_number,
      target_site: rootMessage.target_site,
      subject: rootMessage.subject,
      body: replyBody.trim(),
      sender_email: currentUser.email,
      sender_name: currentUser.full_name || currentUser.email,
      parent_message_id: rootMessage.id,
      is_reply: true
    });
    setReplyBody('');
    setSending(false);
    queryClient.invalidateQueries({ queryKey: ['messages'] });
    onReply?.();
  };

  const allMessages = [rootMessage, ...replies].sort((a, b) => new Date(a.created_date) - new Date(b.created_date));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <MessageCircle className="h-4 w-4 text-slate-400" />
        <span className="text-sm font-medium text-slate-700">{rootMessage.subject || `WIP ${rootMessage.wip_number}`}</span>
        <Badge variant="outline" className="text-xs">{rootMessage.wip_number}</Badge>
        <Badge variant="outline" className="text-xs bg-slate-50">{rootMessage.target_site}</Badge>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {allMessages.map(msg => {
          const readers = allReadReceipts.filter(r => r.message_id === msg.id && r.reader_email !== msg.sender_email);
          return (          
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.sender_email === currentUser?.email}
            readers={readers}
          />
        );
      })}
      </div>
      <div className="flex gap-2 pt-2 border-t border-slate-100">
        <Textarea
          placeholder="Write a reply..."
          value={replyBody}
          onChange={e => setReplyBody(e.target.value)}
          rows={2}
          className="resize-none text-sm"
        />
        <Button size="icon" className="self-end h-9 w-9 shrink-0" onClick={handleSendReply} disabled={!replyBody.trim() || sending}>
          <Reply className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}