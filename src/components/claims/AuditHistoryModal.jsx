import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';
import { format } from "date-fns";
import { History, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AuditHistoryModal({ claim, open, onClose }) {
  const { data: audits = [], isLoading } = useQuery({
    queryKey: ['audits', claim?.id],
    queryFn: () => databaseClients.ClaimAudit.query('*', `claim_id=${claim?.id}`),
    enabled: open && !!claim
  });

  const { data: notes = [] } = useQuery({
    queryKey: ['claimNotes', claim?.id],
    queryFn: () => claim?.id ? databaseClients.ClaimNote.filter({ claim_id: claim.id }, '-created_date') : [],
    enabled: open && !!claim?.id
  });

  // Filter credit-related audits and notes with credit info
  const creditAudits = audits.filter(a =>
  ['credit_parts', 'credit_labour', 'credit_sub_con', 'credit', 'credit_note'].includes(a.field_changed)
  );

  const changeTypeColors = {
    created: "bg-green-100 text-green-700",
    updated: "bg-blue-100 text-blue-700",
    status_changed: "bg-purple-100 text-purple-700",
    deleted: "bg-red-100 text-red-700",
    credit: "bg-teal-100 text-teal-700"
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Audit History - {claim?.wip_number}
          </DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : audits.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No audit history available
          </div>
        ) : (
          <div className="space-y-3">
            {audits.map((audit, index) => {
              const isCreditRelated = ['credit_parts', 'credit_labour', 'credit_sub_con', 'credit', 'credit_note'].includes(audit.field_changed);
              const badgeClass = isCreditRelated ? changeTypeColors.credit : (changeTypeColors[audit.change_type] || changeTypeColors.updated);
              
              return (
              <div key={audit.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={badgeClass}>
                    {isCreditRelated ? 'CREDIT' : audit.change_type.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(audit.created_date), "MMM d, yyyy 'at' h:mm a")}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-slate-600">{audit.changed_by || audit.created_by}</span>
                  </div>
                  
                  <div className="text-sm mt-2">
                    <span className="font-medium text-slate-700">
                      {isCreditRelated 
                          ? audit.field_changed.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
                          : audit.field_changed
                        }:
                    </span>
                    {audit.old_value && audit.new_value !== 'null' && (
                      <span className="text-red-600 line-through ml-2">{audit.old_value}</span>
                    )}
                    {audit.new_value && (
                      <span className="text-green-600 ml-2 font-medium">{audit.new_value}</span>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}