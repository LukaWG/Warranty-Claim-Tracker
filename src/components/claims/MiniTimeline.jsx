import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from "date-fns";
import { databaseClients } from '@/api/databaseClient';
import { TableRow, TableCell } from "@/components/ui/table";
import { 
  CheckCircle2, AlertCircle, MessageSquare, FileEdit, PlusCircle, 
  Clock, ArrowRightLeft, GitCommitHorizontal 
} from "lucide-react";

const statusLabels = {
  in_progress: "In Progress",
  awaiting_review: "Awaiting Review",
  awaiting_approval: "Awaiting Approval",
  approved: "Approved",
  completed: "Claimed",
  rejected: "Queried",
  credit_rejected: "Credit Rejected",
};

function getEventConfig(audit) {
  if (audit.change_type === 'created') {
    return {
      icon: PlusCircle,
      color: 'bg-green-50 text-green-700 border-green-200',
      label: 'Repair Created',
      detail: null,
    };
  }
  if (audit.field_changed === 'note_added') {
    return {
      icon: MessageSquare,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      label: 'Note Added',
      detail: audit.new_value ? `"${audit.new_value}${audit.new_value.length >= 60 ? '…' : ''}"` : null,
    };
  }
  if (audit.change_type === 'status_changed') {
    const from = statusLabels[audit.old_value] || audit.old_value;
    const to = statusLabels[audit.new_value] || audit.new_value;
    return {
      icon: ArrowRightLeft,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      label: 'Status Changed',
      detail: `${from} → ${to}`,
    };
  }
  if (audit.field_changed === 'alert') {
    return {
      icon: AlertCircle,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      label: audit.new_value ? `Alert Set` : 'Alert Cleared',
      detail: audit.new_value || null,
    };
  }
  if (audit.field_changed === 'alert_resolution') {
    return {
      icon: CheckCircle2,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      label: 'Resolution Set',
      detail: audit.new_value || null,
    };
  }
  if (audit.field_changed === 'claimed') {
    return {
      icon: CheckCircle2,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      label: 'Marked as Claimed',
      detail: null,
    };
  }
  return {
    icon: FileEdit,
    color: 'bg-slate-50 text-slate-600 border-slate-200',
    label: `Updated: ${audit.field_changed?.replace(/_/g, ' ')}`,
    detail: audit.new_value ? `→ ${audit.new_value}` : null,
  };
}

export default function MiniTimeline({ claimId, colSpan }) {
  const { data: audits = [], isLoading } = useQuery({
    queryKey: ['audits', claimId],
    queryFn: () => databaseClients.ClaimAudit.filter({ claim_id: claimId }, 'created_date'),
    enabled: !!claimId,
  });

  return (
    <TableRow className="bg-slate-50/20 hover:bg-slate-50/20 border-b border-slate-100">
      <TableCell colSpan={colSpan} className="p-0">
        <div className="px-8 py-6 border-l-4 border-blue-500 bg-gradient-to-r from-slate-50/40 to-transparent overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <GitCommitHorizontal className="h-4 w-4 text-slate-500" />
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Repair History & Timeline
            </h4>
          </div>

          {isLoading ? (
            <div className="flex items-center gap-2 py-4 pl-4 text-slate-400 text-sm">
              <Clock className="h-4 w-4 animate-spin text-blue-500" />
              <span>Loading timeline...</span>
            </div>
          ) : audits.length === 0 ? (
            <div className="py-4 pl-4 text-slate-400 text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-300" />
              <span>No activity recorded yet</span>
            </div>
          ) : (
            <div className="relative w-full">
              {/* Horizontal Scroll Container */}
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <div className="flex flex-row items-stretch gap-6 min-w-max relative px-4 py-2">
                  
                  {/* Connecting Line - absolutely positioned behind items */}
                  {audits.length > 1 && (
                    <div 
                      className="absolute top-[18px] h-0.5 bg-slate-200" 
                      style={{ 
                        left: '116px', // Mathematically centered: padding (16px) + half of item width (100px)
                        right: '116px',
                      }}
                    />
                  )}

                  {audits.map((audit) => {
                    const config = getEventConfig(audit);
                    const Icon = config.icon;
                    const by = audit.changed_by || audit.created_by || '';
                    const shortBy = by.includes('@') ? by.split('@')[0] : by;

                    return (
                      <div key={audit.id} className="flex flex-col items-center w-[200px] text-center relative group">
                        
                        {/* Circle Icon Badge */}
                        <div className={`z-10 h-8 w-8 rounded-full flex items-center justify-center border shadow-sm transition-transform duration-200 group-hover:scale-110 ${config.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>

                        {/* Content Box */}
                        <div className="mt-4 flex-1 w-full bg-white border border-slate-100 rounded-lg p-3 hover:border-slate-200 hover:shadow-sm transition-all duration-150 flex flex-col justify-between">
                          <div className="space-y-1">
                            <span className="text-xs font-semibold text-slate-800 line-clamp-1 block">
                              {config.label}
                            </span>
                            {config.detail && (
                              <p className="text-[10px] text-slate-500 font-mono bg-slate-50 px-1.5 py-0.5 rounded break-words max-h-12 overflow-y-auto block">
                                {config.detail}
                              </p>
                            )}
                          </div>
                          
                          <div className="mt-2 pt-2 border-t border-slate-50 flex flex-col gap-0.5 text-[9px] text-slate-400">
                            <span className="font-medium text-slate-500 line-clamp-1">By {shortBy}</span>
                            <span>{format(new Date(audit.created_date), "d MMM yy, HH:mm")}</span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}