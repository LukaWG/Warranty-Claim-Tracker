import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { Reply, MessageCircle, CheckCheck, Paperclip, X, ExternalLink, MailOpen } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';
import { useRouter } from 'next/router';
import { createPageUrl } from '@/utils';
import { toast } from '@/components/ui/use-toast';

function MessageBubble({ message, isOwn, readers }) {
  return (
    <div className={`flex flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'}`}>
      <div className={`max-w-[80%] rounded-xl px-4 py-2.5 ${isOwn ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-800'}`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.body}</p>
        {message.image_urls?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.image_urls.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                <img src={url} alt="" className="h-20 w-20 object-cover rounded-md border border-white/20 hover:opacity-90 transition-opactity" />
              </a>
            ))}
            </div>
        )}
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

export default function MessageThread({ rootMessage, replies, currentUser, onReply, allReadReceipts = [], onGoToRepair, onMarkUnread, onMarkRead }) {
  const [replyBody, setReplyBody] = useState('');
  const [sending, setSending] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [markingUnread, setMarkingUnread] = useState(false);
  const [markingRead, setMarkingRead] = useState(false);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleMarkRead = async () => {
    setMarkingRead(true);
    try {
      await onMarkRead?.();
      queryClient.invalidateQueries({ queryKey: ['message-reads', currentUser?.email] });
      queryClient.invalidateQueries({ queryKey: ['message-reads-all'] });
      queryClient.invalidateQueries({ queryKey: ['messages-unread', currentUser?.email] });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to mark as read',
        description: error?.message || 'Please try again.',
      });
    } finally {
      setMarkingRead(false);
    }
  };

  const handleMarkUnread = async () => {
    setMarkingUnread(true);
    try {
      const allMessages = [rootMessage, ...replies];

      // Shared read state: marking unread clears the read flag for all users
      await Promise.all(allMessages.map(m => databaseClients.Message.update(m.id, { read: false })));
      queryClient.invalidateQueries({ queryKey: ['message-reads', currentUser?.email] });
      queryClient.invalidateQueries({ queryKey: ['message-reads-all'] });
      queryClient.invalidateQueries({ queryKey: ['messages-unread', currentUser?.email] });
      onMarkUnread?.();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to mark as unread',
        description: error?.message || 'Please try again.',
      });
    } finally {
      setMarkingUnread(false);
    }
  };

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

  const handlePaste = (e) => {
    const items = Array.from(e.clipboardData?.items || []);
    const imageItems = items.filter(item => item.type.startsWith('image/'));
    if (imageItems.length === 0) return;
    imageItems.forEach(item => {
      const file = item.getAsFile();
      if (!file) return;
      setImageFiles(prev => [...prev, file]);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreviews(prev => [...prev, ev.target.result]);
      reader.readAsDataURL(file);
    });
  };

  const { data: sites = [] } = useQuery({
    queryKey: ['sites'],
    queryFn: () => databaseClients.Site.get()
  })

  const handleSendReply = async () => {
    if (!replyBody.trim()) return;
    setSending(true);
    try {
      const senderName = currentUser.full_name || currentUser.email;
      const uploadedUrls = []; // TODO: Implement image upload logic here and get the uploaded image URLs
      alert("Image upload not implemented - message will be sent without the image");
      await Promise.all([
        databaseClients.Message.create({
          claim_id: rootMessage.claim_id,
          wip_number: rootMessage.wip_number,
          target_site: rootMessage.target_site,
          subject: rootMessage.subject,
          body: replyBody.trim(),
          sender_email: currentUser.email,
          sender_name: senderName,
          parent_message_id: rootMessage.id,
          is_reply: true,
          image_urls: uploadedUrls
        }),
        databaseClients.ClaimNote.create({
          claim_id: rootMessage.claim_id,
          content: `[Message Reply] ${rootMessage.subject}\n\n${replyBody.trim()}\n\n- ${senderName}`,
          image_url: uploadedUrls[0] || undefined
        }),
        rootMessage.claim_id
          ? databaseClients.WarrantyClaim.update(rootMessage.claim_id, { site_responded: true }).catch(() => {}) // Ignore errors if claim_id is not valid
          : Promise.resolve()
      ]);
      setReplyBody('');
      setImageFiles([]);
      setImagePreviews([]);
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      onReply?.();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to send reply',
        description: error?.message || 'Please try again.',
      });
    } finally {
      setSending(false);
    }
  };

  const allMessages = [rootMessage, ...replies].sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
  const threadUnread = [rootMessage, ...replies].some(m => m.sender_email !== currentUser?.email && !m.read);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <MessageCircle className="h-4 w-4 text-slate-400" />
        <span className="text-sm font-medium text-slate-700">{rootMessage.subject || `WIP ${rootMessage.wip_number}`}</span>
        <Badge variant="outline" className="text-xs">{rootMessage.wip_number}</Badge>
        <Badge variant="outline" className="text-xs bg-slate-50">{sites.find(site => site.id === rootMessage.target_site)?.name}</Badge>
        <div className="ml-auto flex items-center gap-2">
          {threadUnread ? (
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs gap-1 text-slate-500"
              onClick={handleMarkRead}
              disabled={markingRead}
              title="Mark as read"
            >
              <CheckCheck className="h-3 w-3" />
              {markingRead ? 'Marking...' : 'Mark read'}
            </Button>
          ) : (
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs gap-1 text-slate-500"
            onClick={handleMarkUnread}
            disabled={markingUnread}
            title="Mark as unread"
          >
            <MailOpen className="h-3 w-3" />
            {markingUnread ? 'Marking...' : 'Mark unread'}
          </Button>
          )}
        
          <Button 
            size="sm" 
            variant="outline" 
            className="h-7 text-xs gap-1" 
            onClick={ () => {
              router.push(`${createPageUrl('Dashboard')}?wip=${encodeURIComponent(rootMessage.wip_number)}`);
              onGoToRepair?.();
            }}
          >
            <ExternalLink className="h-3 w-3" />
            Go to Repair
          </Button>
        </div>
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
      <div className="pt-2 border-t border-slate-100 space-y-2">
        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {imagePreviews.map((src, idx) => (
              <div key={idx} className="relative">
                <img src={src} alt="" className="h-14 w-14 object-cover rounded-md border border-slate-200" />
                <button onClick={() => removeImage(idx)} className="absolute -top-1.5 -right-1.5 bg-white rounded-full border border-slate-200 p-0.5 hover:bg-red-50">
                  <X className="h-3 w-3 text-slate-500" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
        <Textarea
          placeholder="Write a reply..."
          value={replyBody}
          onChange={e => setReplyBody(e.target.value)}
          onPaste={handlePaste}
          rows={2}
          className="resize-none text-sm"
        />
        <div className="flex flex-col gap-1 self-end">
            <Button size="icon" variant="outline" className="h-9 w-9 shrink-0" onClick={() => fileInputRef.current?.click()}>
              <Paperclip className="h-4 w-4" />
            </Button>
        <Button size="icon" className="h-9 w-9 shrink-0" onClick={handleSendReply} disabled={!replyBody.trim() || sending}>
          <Reply className="h-4 w-4" />
        </Button>
        </div>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageAdd} />
      </div>
    </div>
  );
}