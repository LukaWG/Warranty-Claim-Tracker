import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MessageSquare, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import ApprovalChat from '@/components/approvals/ApprovalChat';
import { databaseClients } from '@/api/databaseClient';
import { currentUser as currentUserClient } from '@/api/currentUser';

const STATUS_STYLES = {
  pending_approval: 'bg-amber-100 text-amber-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  credited: 'bg-blue-100 text-blue-700',
};

export default function ApprovalMessages() {
  const [openClaimId, setOpenClaimId] = useState(null);

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => currentUserClient.me(),
  });

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['allApprovalMessages'],
    queryFn: () => databaseClients.ApprovalMessage.list('created_date'),
    refetchInterval: 30000,
  });

  const { data: claims = [] } = useQuery({
    queryKey: ['allClaims'],
    queryFn: () => databaseClients.WarrantyClaim.list('-updated_date'),
  });

  const claimMap = useMemo(() => {
    const m = {};
    claims.forEach(c => { m[c.id] = c; });
    return m;
  }, [claims]);

  const threads = useMemo(() => {
    const byClaim = {};
    messages.forEach(msg => {
      if (!byClaim[msg.claim_id]) byClaim[msg.claim_id] = [];
      byClaim[msg.claim_id].push(msg);
    });
    return Object.entries(byClaim).map(([claimId, msgs]) => {
      const sorted = [...msgs].sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
      const last = sorted[sorted.length - 1];
      const unread = sorted.filter(m => !m.read).length;
      const claim = claimMap[claimId];
      return { claimId, claim, messages: sorted, last, count: sorted.length, unread };
    }).sort((a, b) => new Date(b.last.created_date) - new Date(a.last.created_date));
  }, [messages, claimMap]);

  const openClaim = claimMap[openClaimId];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Approval Messages</h1>
        <p className="text-sm text-slate-500 mt-1">All credit approval conversations across claims</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : threads.length === 0 ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <MessageSquare className="h-10 w-10 text-slate-300 mb-3" />
            <p className="text-slate-600 font-medium">No approval messages</p>
            <p className="text-sm text-slate-400 mt-1">Conversations from the credit approval process will appear here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {threads.map(t => {
            const claim = t.claim;
            const status = claim?.approval_status || 'pending_approval';
            return (
              <Card key={t.claimId} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4" onClick={() => setOpenClaimId(t.claimId)}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-slate-800">{claim?.wip_number || 'Unknown WIP'}</p>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[status] || 'bg-slate-100 text-slate-600'}`}>
                          {status.replace(/_/g, ' ')}
                        </span>
                        {t.unread > 0 && (
                          <span className="text-xs font-bold text-white px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--hendy-teal)' }}>
                            {t.unread} new
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        {claim?.site && (
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{claim.site}</span>
                        )}
                        {claim?.credit != null && (
                          <span className="font-medium text-amber-600">£{claim.credit.toFixed(2)}</span>
                        )}
                        <span>{t.count} message{t.count !== 1 ? 's' : ''}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-2 truncate">
                        <span className="text-slate-400">{t.last.sender_name || t.last.sender_email}:</span> {t.last.body}
                      </p>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="h-3 w-3" />
                        {format(new Date(t.last.created_date), 'dd/MM/yyyy HH:mm')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={!!openClaim} onOpenChange={(o) => !o && setOpenClaimId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Approval Chat — {openClaim?.wip_number || ''}</DialogTitle>
          </DialogHeader>
          {openClaim && currentUser && <ApprovalChat claim={openClaim} currentUser={currentUser} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}