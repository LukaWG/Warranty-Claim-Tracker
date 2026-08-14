import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from '@tanstack/react-query';
import { format } from "date-fns";
import { databaseClients } from '@/api/databaseClient';
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
      color: 'bg-green-100 text-green-700',
      dot: 'bg-green-500',
      label: 'Repair Created',
      detail: null,
    };
  }
  if (audit.field_changed === 'note_added') {
    return {
      icon: MessageSquare,
      color: 'bg-blue-100 text-blue-700',
      dot: 'bg-blue-500',
      label: 'Note Added',
      detail: audit.new_value ? `"${audit.new_value}${audit.new_value.length >= 100 ? '…' : ''}"` : null,
    };
  }
  if (audit.change_type === 'status_changed') {
    const from = statusLabels[audit.old_value] || audit.old_value;
    const to = statusLabels[audit.new_value] || audit.new_value;
    return {
      icon: ArrowRightLeft,
      color: 'bg-purple-100 text-purple-700',
      dot: 'bg-purple-500',
      label: 'Status Changed',
      detail: `${from} → ${to}`,
    };
  }
  if (audit.field_changed === 'alert') {
    return {
      icon: AlertCircle,
      color: 'bg-amber-100 text-amber-700',
      dot: 'bg-amber-500',
      label: audit.new_value ? `Alert Set` : 'Alert Cleared',
      detail: audit.new_value || null,
    };
  }
  if (audit.field_changed === 'alert_resolution') {
    return {
      icon: CheckCircle2,
      color: 'bg-teal-100 text-teal-700',
      dot: 'bg-teal-500',
      label: 'Resolution Set',
      detail: audit.new_value || null,
    };
  }
  if (audit.field_changed === 'claimed') {
    const isClaimed = audit.new_value === 'true' || audit.new_value === true;
    return {
      icon: CheckCircle2,
      color: 'bg-teal-100 text-teal-700',
      dot: 'bg-teal-500',
      label: isClaimed ? 'Marked as Claimed' : 'Claim Undone',
      detail: null,
    };
  }
  return {
    icon: FileEdit,
    color: 'bg-slate-100 text-slate-600',
    dot: 'bg-slate-400',
    label: `Updated: ${audit.field_changed?.replace(/_/g, ' ')}`,
    detail: audit.new_value ? `→ ${audit.new_value}` : null,
  };
}

function TimelineItem({ audit, isLast }) {
  const config = getEventConfig(audit);
  const Icon = config.icon;
  const by = audit.changed_by || audit.created_by || '';
  const shortBy = by.includes('@') ? by.split('@')[0] : by;

  return (
    <div className="flex gap-3">
      {/* Stem */}
      <div className="flex flex-col items-center">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${config.color}`}>
          <Icon className="h-4 w-4" />
        </div>
        {!isLast && <div className="w-px flex-1 bg-slate-200 my-1" />}
      </div>

      {/* Content */}
      <div className="pb-5 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-slate-800">{config.label}</p>
            {config.detail && (
              <p className="text-xs text-slate-500 mt-0.5 break-words">{config.detail}</p>
            )}
            <p className="text-xs text-slate-400 mt-0.5">{shortBy}</p>
          </div>
          <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
            {format(new Date(audit.created_date), "d MMM yy, HH:mm")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ClaimTimeline({ claim, open, onClose }) {
  const { data: audits = [], isLoading } = useQuery({
    queryKey: ['audits', claim?.id],
    queryFn: () => {
      const audit = databaseClients.ClaimAudit.filter({ claim_id: claim?.id }, 'created_date');
      // Reverse order to show most recent first
      return audit.then(results => results.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)));
    },
    enabled: open && !!claim,
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-800">
            <GitCommitHorizontal className="h-5 w-5" />
            Timeline — {claim?.wip_number}
            {claim?.reg_number && (
              <span className="text-sm font-normal text-slate-500">({claim.reg_number})</span>
            )}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-7 w-7 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : audits.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <Clock className="h-8 w-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm">No activity recorded yet</p>
          </div>
        ) : (
          <div className="pt-2">
            {audits.filter(a => a.field_changed !== 'note_added').map((audit, i, arr) => (
              <TimelineItem key={audit.id} audit={audit} isLast={i === arr.length - 1} />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}