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

const RELEVANT_TYPES = new Set(['created', 'status_changed']);
const RELEVANT_FIELDS = new Set(['alert', 'alert_resolution', 'claimed']);

function getEventConfig(audit) {
  if (audit.change_type === 'created') {
    return {
      icon: PlusCircle,
      color: 'bg-green-500 text-green-700 border-green-200',
      label: 'Repair Created',
      detail: null,
    };
  }
  if (audit.field_changed === 'note_added') {
    return {
      icon: MessageSquare,
      color: 'bg-blue-500 text-blue-700 border-blue-200',
      label: 'Note Added',
      detail: audit.new_value ? `"${audit.new_value}${audit.new_value.length >= 60 ? '…' : ''}"` : null,
    };
  }
  if (audit.change_type === 'status_changed') {
    const from = statusLabels[audit.old_value] || audit.old_value;
    const to = statusLabels[audit.new_value] || audit.new_value;
    return {
      icon: ArrowRightLeft,
      color: 'bg-purple-500 text-purple-700 border-purple-200',
      label: 'Status Changed',
      detail: `${from} → ${to}`,
    };
  }
  if (audit.field_changed === 'alert') {
    return {
      icon: AlertCircle,
      color: 'bg-amber-500 text-amber-700 border-amber-200',
      label: audit.new_value ? `Alert Set` : 'Alert Cleared',
      detail: audit.new_value || null,
    };
  }
  if (audit.field_changed === 'alert_resolution') {
    return {
      icon: CheckCircle2,
      color: 'bg-teal-500 text-teal-700 border-teal-200',
      label: 'Resolution Set',
      detail: audit.new_value || null,
    };
  }
  if (audit.field_changed === 'claimed') {
    return {
      icon: CheckCircle2,
      color: 'bg-teal-500 text-teal-700 border-teal-200',
      label: 'Marked as Claimed',
      detail: null,
    };
  }
  return {
    icon: FileEdit,
    color: 'bg-slate-500 text-slate-700 border-slate-200',
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

  const relevant = audits.filter(audit => 
    RELEVANT_TYPES.has(audit.change_type) || RELEVANT_FIELDS.has(audit.field_changed)
  );

  return (
    <tr>
      <td colSpan={colSpan} className="px-4 pb-3 pt-0 bg-slate-50/70 border-b border-slate-100">
        {isLoading ? (
          <div className="flex items-center gap-2 py-2">
            <div className="h-4 w-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
            <span className="text-xs text-slate-400">Loading timeline...</span>
          </div>
        ) : relevant.length === 0 ? (
          <p className="text-xs text-slate-400 py-2 italic">No activity recorded</p>
        ) : (
          <div className="flex items-center gap-0 overflow-x-auto py-2 scrollbar-hide">
            {relevant.map((audit, i) => {
              const config = getEventConfig(audit);
              if (!config) return null;
              const Icon = config.icon;
              const isLast = i === relevant.length - 1;
              return (
                <React.Fragment key={audit.id}>
                  <div className="flex flex-col items-center flex-shrink-0 group/item">
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center ${config.color} shadow-sm`}>
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-[10px] text-slate-600 font-medium mt-1 max-w-[72px] text-center leading-tight">
                      {config.label}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      {format(new Date(audit.created_date), "d MMM")}
                    </span>
                  </div>
                  {!isLast && (
                    <div className="h-px w-8 bg-slate-300 flex-shrink-0 mb-5" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </td>
    </tr>


  );
}