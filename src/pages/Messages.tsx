import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import { PenSquare, MessageCircle, ChevronRight, Eye, Filter, X } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ComposeMessageModal from '@/components/messages/ComposeMessageModal';
import MessageThread from '@/components/messages/MessageThread';
import { databaseClients } from '@/api/databaseClient';
import { currentUser as currentUserClient } from '@/api/currentUser';

export default function Messages() {
  const queryClient = useQueryClient();
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [filterSite, setFilterSite] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterUnread, setFilterUnread] = useState(false);
  const [filterWip, setFilterWip] = useState('');

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const wip = typeof router.query.wip === 'string' ? router.query.wip : '';
    if (wip) setFilterWip(wip);
  }, [router.isReady, router.query.wip]);

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => currentUserClient.me()
  });
  const userRole = currentUser?.custom_role || currentUser?.role;
  const isAdmin = ['Group Manager', 'Owner'].includes(userRole);
  const userSite = currentUser?.default_site;

  const { data: allMessages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => databaseClients.Message.get(),
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

  const { data: allClaims = [] } = useQuery({
    queryKey: ['claims-for-messages'],
    queryFn: () => databaseClients.WarrantyClaim.get(),
  })

  const claimsByWip = React.useMemo(() => {
    const map = {};
    allClaims.forEach(c => { if (c.wip_number) map[c.wip_number] = c; });
    return map;
  }, [allClaims]);

  const markReadMutation = useMutation({
    mutationFn: ({ messageId }) => databaseClients.MessageRead.create({
       message_id: messageId,
       reader_email: currentUser.email,
       reader_name: (currentUser.firstName + ' ' + currentUser.lastName) || currentUser.email,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message-reads-all', currentUser?.email] });
    }
  });

  const getReplies = (rootId) => allMessages.filter(m => m.parent_message_id === rootId);

  const isThreadUnread = (rootMsg) => {
    const allInThread = [rootMsg, ...getReplies(rootMsg.id)];
    return allInThread.some(m => m.sender_email !== currentUser?.email && !m.read);
  };

  // Root messages (not replies)
  const rootMessages = allMessages.filter(m => !m.is_reply);

  // Visible threads based on role
  const roleFilteredThreads = rootMessages.filter(m => {
    if (isAdmin) return true;
    return m.target_site === userSite;
  });

  const siteName = (id) => sites.find(site => site.id === id)?.name || id;

  // Derive unique sites and brands for filter dropdowns
  const availableSites = useMemo(() =>
    [...new Set(roleFilteredThreads.map(m => m.target_site).filter(Boolean))]
      .sort((a, b) => String(siteName(a)).localeCompare(String(siteName(b)))),
    [roleFilteredThreads, sites]
  );

  const availableBrands = useMemo(() =>
    [...new Set(roleFilteredThreads.map(m => claimsByWip[m.wip_number]?.brands).filter(Boolean))].sort(),
    [roleFilteredThreads, claimsByWip]
  );

  // Apply filters
  const visibleThreads = roleFilteredThreads.filter(m => {
    if (filterSite && m.target_site !== filterSite) return false;
    if (filterBrand && claimsByWip[m.wip_number]?.brand !== filterBrand) return false;
    if (filterUnread && !isThreadUnread(m)) return false;
    if (filterWip && !m.wip_number?.toLowerCase().includes(filterWip.toLowerCase())) return false;
    return true;
  });

  const activeFilters = [filterSite, filterBrand, filterUnread, filterWip].filter(Boolean).length;

  // Auto-open thread when arriving from dashboard with a WIP filter
  React.useEffect(() => {
    if (filterWip && visibleThreads.length === 1 && !selectedThread) {
      handleOpenThread(visibleThreads[0])
    }
  }, [filterWip, visibleThreads.length]);

  const markThreadRead = async (rootMsg) => {
    const allInThread = [rootMsg, ...getReplies(rootMsg.id)];
    const myReceiptIds = new Set(allReadReceipts.filter(r => r.reader_email === currentUser?.email).map(r => r.message_id));
    for (const m of allInThread) {
      if (m.sender_email === currentUser?.email) continue;
      // shared read state: mark read for all users
      if (!m.read) {
        databaseClients.Message.update(m.id, { read: true }).catch(() => {});
      }
      // Per-user receipt powers the "Read by" indicator
      if (!myReceiptIds.has(m.id)) {
        markReadMutation.mutate({ messageId: m.id });
      }
    }
    queryClient.invalidateQueries({ queryKey: ['messages'] });
    queryClient.invalidateQueries({ queryKey: ['messages-unread', currentUser?.email] });
  };

  const handleOpenThread = async (msg) => {
    setSelectedThread(msg);
    await markThreadRead(msg);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-start justify-between mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--hendy-blue)' }}>
              MESSAGES
            </h1>
            <p className="text-slate-500">Claim-related communications</p>
          </div>
            <Button onClick={() => setComposeOpen(true)} className="flex items-center gap-2 flex-shrink-0" style={{ backgroundColor: 'var(--hendy-blue)' }}>
              <PenSquare className="h-4 w-4" />
              <span className="hidden sm:inline">New Message</span>
            </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <Filter className="h-4 w-4" />
            <span>Filter:</span>
          </div>
          {isAdmin && availableSites.length > 1 && (
            <Select value={filterSite} onValueChange={setFilterSite}>
              <SelectTrigger className="h-8 w-36 text-xs">
                <SelectValue placeholder="All sites" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All sites</SelectItem>
                {availableSites.map(s => <SelectItem key={s} value={s}>{siteName(s)}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          {availableBrands.length > 0 && (
            <Select value={filterBrand} onValueChange={setFilterBrand}>
              <SelectTrigger className="h-8 w-36 text-xs">
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All brands</SelectItem>
                {availableBrands.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          <button
            onClick={() => setFilterUnread(v => !v)}
            className={`h-8 px-3 rounded-md border text-xs font-medium transition-colors ${filterUnread ? 'bg-red-50 border-red-300 text-red-700' : 'bg-white border-slate-200 text-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Unread only
          </button>
          {activeFilters > 0 && (
            <button
              onClick={() => { setFilterSite(''); setFilterBrand(''); setFilterUnread(false); setFilterWip(''); }}
              className="h-8 px-2 rounded-md text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
            >
              <X className="h-3 w-3" /> Clear
            </button>
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
                {isAdmin ? 'All Threads' : `Messages for ${siteName(userSite) || 'your site'}`}
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
                    <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: unread ? 'var(--hendy-teal)' : 'transparent' }} />
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
              onGoToRepair={() => setSelectedThread(null)}
              onMarkUnread={() => setSelectedThread(null)}
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