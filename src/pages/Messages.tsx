import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import { PenSquare, MessageCircle, ChevronRight, Eye } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ComposeMessageModal from '@/components/messages/ComposeMessageModal';
import MessageThread from '@/components/messages/MessageThread';
import { databaseClients } from '@/api/databaseClient';

export default function Messages() {
  const queryClient = useQueryClient();
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => databaseClients.User.me()
  });
  const userRole = currentUser?.custom_role || currentUser?.role;
  const isAdmin = ['Admin Manager', 'Service Manager', 'Owner', 'Admin'].includes(userRole);
  const userSite = currentUser?.default_site;

  const { data: allMessages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => databaseClients.Message.get(),
    refetchInterval: 30000
  });

  const { data: readReceipts = [] } = useQuery({
    queryKey: ['message-reads', currentUser?.email],
    queryFn: () => databaseClients.MessageRead.filter({ reader_email: currentUser.email }),
    enabled: !!currentUser?.email,
    refetchInterval: 30000
  });

  const { data: allReadReceipts = [] } = useQuery({
    queryKey: ['message-reads-all'],
    queryFn: () => databaseClients.MessageRead.get(),
    refetchInterval: 3000
  });

  const { data: sites = [] } = useQuery({
    queryKey: ['sites'],
    queryFn: () => databaseClients.Site.get()
  });

  const markReadMutation = useMutation({
    mutationFn: ({ messageId }) => databaseClients.MessageRead.create({
       message_id: messageId,
       reader_email: currentUser.email,
       reader_name: (currentUser.firstName + ' ' + currentUser.lastName) || currentUser.email,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message-reads', currentUser?.email] });
      queryClient.invalidateQuereis({ queryKey: ['message-reads-all', currentUser?.email] });
    }
  });

  const readIds = new Set(readReceipts.map(r => r.message_id));

  // Root messages (not replies)
  const rootMessages = allMessages.filter(m => !m.is_reply);

  // Visible threads based on role
  const visibleThreads = rootMessages.filter(m => {
    if (isAdmin) return true; // admins see all
    return m.target_site === userSite; // processors see their site's messages
  });

  const getReplies = (rootId) => allMessages.filter(m => m.parent_message_id === rootId);

  const isThreadUnread = (rootMsg) => {
    const allInThread = [rootMsg, ...getReplies(rootMsg.id)];
    return allInThread.some(m => m.sender_email !== currentUser?.email && !readIds.has(m.id));
  };

  const markThreadRead = async (rootMsg) => {
    const allInThread = [rootMsg, ...getReplies(rootMsg.id)];
    for (const m of allInThread) {
      if (m.sender_email !== currentUser?.email && !readIds.has(m.id)) {
        markReadMutation.mutate({ messageId: m.id });
      }
    }
  };

  const handleOpenThread = async (msg) => {
    setSelectedThread(msg);
    await markThreadRead(msg);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--hendy-blue)' }}>
              MESSAGES
            </h1>
            <p className="text-slate-500">Claim-related communications</p>
          </div>
          {isAdmin && (
            <Button onClick={() => setComposeOpen(true)} className="flex items-center gap-2" style={{ backgroundColor: 'var(--hendy-blue)' }}>
              <PenSquare className="h-4 w-4" />
              New Message
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : visibleThreads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">No messages yet</p>
            <p className="text-sm text-slate-400 mt-1">
              {isAdmin ? 'Send a message to notify processors about a claim.' : 'Messages from your admin team will appear here.'}
            </p>
          </div>
        ) : (
          <Card className="border-0 shadow-xl bg-white">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">
                {isAdmin ? 'All Threads' : `Messages for ${userSite}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-slate-100">
              {visibleThreads.map(msg => {
                const replies = getReplies(msg.id);
                const unread = isThreadUnread(msg);
                return (
                  <div
                    key={msg.id}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => handleOpenThread(msg)}
                  >
                    <div className={`h-2 w-2 rounded-full shrink-0 ${unread ? 'bg-red-500' : 'bg-transparent'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-sm ${unread ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>
                          {msg.subject || `WIP ${msg.wip_number}`}
                        </span>
                        <Badge variant="outline" className="text-xs shrink-0">{msg.wip_number}</Badge>
                        <Badge variant="outline" className="text-xs shrink-0 bg-slate-50">{sites.find(site => site.id === msg.target_site)?.name}</Badge>
                      </div>
                      <p className="text-xs text-slate-400 truncate">
                        {msg.sender_name || msg.sender_email} · {format(new Date(msg.created_date), 'dd/MM/yyyy HH:mm')}
                        {replies.length > 0 && ` · ${replies.length} repl${replies.length === 1 ? 'y' : 'ies'}`}
                      </p>
                      <p className="text-sm text-slate-500 truncate mt-0.5">{msg.body}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300 shrink-0" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Thread Dialog */}
      {selectedThread && (
        <Dialog open={!!selectedThread} onOpenChange={() => setSelectedThread(null)}>
          <DialogContent className="max-w-lg">
            <MessageThread
              rootMessage={selectedThread}
              replies={getReplies(selectedThread.id)}
              currentUser={currentUser}
              allReadReceipts={allReadReceipts}
              onReply={() => {
                queryClient.invalidateQueries({ queryKey: ['messages'] });
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Compose Modal */}
      <ComposeMessageModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        currentUser={currentUser}
        onSent={() => queryClient.invalidateQueries({ queryKey: ['messages'] })}
      />
    </div>
  );
}