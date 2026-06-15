import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export default function CreditOptionsModal({ claim, open, onClose, onSave }) {
  const { data: sites = [] } = useQuery({
    queryKey: ['sites'],
    queryFn: () => databaseClients.Site.list('name')
  });

  const CREDIT_APPROVAL_LIMIT = 100;

  const selectedSite = sites.find(s => s.name === claim?.site);

  const originalParts = (parseFloat(claim?.parts) || 0) + (parseFloat(claim?.credit_parts) || 0);
  const originalLabour = (parseFloat(claim?.labour) || 0) + (parseFloat(claim?.credit_labour) || 0);
  const originalSubCon = (parseFloat(claim?.sub_con) || 0) + (parseFloat(claim?.credit_sub_con) || 0);

  const [creditParts, setCreditParts] = useState(claim?.credit_parts || 0);
  const [creditLabour, setCreditLabour] = useState(claim?.credit_labour || 0);
  const [creditSubCon, setCreditSubCon] = useState(claim?.credit_sub_con || 0);
  const [creditNote, setCreditNote] = useState(claim?.credit_note || '');

  const totalCredit = (parseFloat(creditParts) || 0) + (parseFloat(creditLabour) || 0) + (parseFloat(creditSubCon) || 0);

  const updateTotal = (parts, labour, subCon) =>
    (parseFloat(parts) || 0) + (parseFloat(labour) || 0) + (parseFloat(subCon) || 0);

  const handleSave = () => {
    const creditVal = totalCredit;
    const newParts = Math.max(0, originalParts - (parseFloat(creditParts) || 0));
    const newLabour = Math.max(0, originalLabour - (parseFloat(creditLabour) || 0));
    const newSubCon = Math.max(0, originalSubCon - (parseFloat(creditSubCon) || 0));
    const newTotal = updateTotal(newParts, newLabour, newSubCon);

    const hourlyRate = selectedSite?.brand_hourly_rates?.[claim?.brand] || 0;
    const actualHours = hourlyRate > 0 ? Math.round((newLabour / hourlyRate) * 100) / 100 : claim?.actual_hours;

    const originalCreditVal = parseFloat(claim?.credit) || 0;
    const needsApproval = creditVal >= CREDIT_APPROVAL_LIMIT;
    const creditChangedAfterApproval = (claim?.approval_status === 'approved' || claim?.approval_status === 'rejected') && creditVal !== originalCreditVal && creditVal >= CREDIT_APPROVAL_LIMIT;
    const effectiveApprovalStatus = creditChangedAfterApproval
      ? 'pending_approval'
      : (needsApproval ? (claim?.approval_status || 'pending_approval') : (creditVal > 0 && creditVal < CREDIT_APPROVAL_LIMIT) ? 'approved' : null);

    onSave({
      credit_parts: creditVal > 0 ? parseFloat(creditParts) || null : null,
      credit_labour: creditVal > 0 ? parseFloat(creditLabour) || null : null,
      credit_sub_con: creditVal > 0 ? parseFloat(creditSubCon) || null : null,
      credit: creditVal || null,
      credit_note: creditVal > 0 ? creditNote : null,
      approval_status: effectiveApprovalStatus,
      parts: newParts || null,
      labour: newLabour || null,
      sub_con: newSubCon || null,
      total_claim_cost: newTotal || null,
      actual_hours: actualHours || null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Credit Options — {claim?.wip_number}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Parts Credit (£)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                <Input
                  type="number" step="0.01" min="0"
                  max={originalParts > 0 ? originalParts : undefined}
                  value={creditParts}
                  onChange={(e) => setCreditParts(e.target.value)}
                  className="pl-7"
                  disabled={originalParts <= 0}
                />
              </div>
              {originalParts > 0
                ? <p className="text-xs text-slate-400">of £{originalParts.toFixed(2)}</p>
                : <p className="text-xs text-amber-500">No parts cost recorded</p>
              }
            </div>
            <div className="space-y-2">
              <Label>Labour Credit (£)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                <Input
                  type="number" step="0.01" min="0"
                  max={originalLabour > 0 ? originalLabour : undefined}
                  value={creditLabour}
                  onChange={(e) => setCreditLabour(e.target.value)}
                  className="pl-7"
                  disabled={originalLabour <= 0}
                />
              </div>
              {originalLabour > 0
                ? <p className="text-xs text-slate-400">of £{originalLabour.toFixed(2)}</p>
                : <p className="text-xs text-amber-500">No labour cost recorded</p>
              }
            </div>
            <div className="space-y-2">
              <Label>Sub Con Credit (£)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                <Input
                  type="number" step="0.01" min="0"
                  max={originalSubCon > 0 ? originalSubCon : undefined}
                  value={creditSubCon}
                  onChange={(e) => setCreditSubCon(e.target.value)}
                  className="pl-7"
                  disabled={originalSubCon <= 0}
                />
              </div>
              {originalSubCon > 0
                ? <p className="text-xs text-slate-400">of £{originalSubCon.toFixed(2)}</p>
                : <p className="text-xs text-amber-500">No sub con cost recorded</p>
              }
            </div>
          </div>

          {totalCredit > 0 && (
            <p className="text-sm font-medium text-slate-600">Total Credit: £{totalCredit.toFixed(2)}</p>
          )}

          {totalCredit > 0 && (
            <div className="space-y-2">
              <Label>Credit Note <span className="text-red-500">*</span> <span className="text-xs text-slate-400 font-normal">(required for credit {">="} {CREDIT_APPROVAL_LIMIT})</span></Label>
              <Textarea
                placeholder="Please provide justification for this credit amount..."
                value={creditNote}
                onChange={(e) => setCreditNote(e.target.value)}
                required className="resize-none" rows={3}
              />
            </div>
          )}

          {claim?.approval_note && (
            <div className="space-y-2">
              <Label>Approver Note</Label>
              <div className="p-3 rounded-md bg-slate-50 border border-slate-200">
                <p className="text-sm text-slate-700">{claim.approval_note}</p>
              </div>
            </div>
          )}

          {(() => {
            const originalCreditVal = parseFloat(claim?.credit) || 0;
            const creditChangedAfterApproval = claim?.approval_status === 'approved' && totalCredit !== originalCreditVal && totalCredit >= CREDIT_APPROVAL_LIMIT;
            if (creditChangedAfterApproval) {
              return (
                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-200">
                  <span className="text-amber-500 text-sm">⚠</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-amber-700">Re-approval required</span>
                    <span className="text-xs text-amber-600">Credit figure changed — pending re-approval</span>
                  </div>
                </div>
              );
            }
            if (totalCredit >= CREDIT_APPROVAL_LIMIT && claim?.approval_status !== 'approved') {
              return (
                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-200">
                  <span className="text-amber-500 text-sm">⚠</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-amber-700">Credit approval pending</span>
                    <span className="text-xs text-amber-600">
                      Credit ≥ £{CREDIT_APPROVAL_LIMIT}
                      {claim?.approval_status === 'rejected' && ' · Rejected'}
                      {claim?.approval_status === 'pending_approval' && ' · Awaiting approval'}
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          })()}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          {claim?.approval_status === 'approved' || (claim.creditVal > 0 && claim.creditVal < CREDIT_APPROVAL_LIMIT) && (
            <Button
              variant="outline"
              className="bg-teal-50 border-teal-300 text-teal-700 hover:bg-teal-100"
              onClick={() => onSave({ approval_status: 'credited' })}
            >
              Mark as Credited
            </Button>
          )}
          <span title={totalCredit > CREDIT_APPROVAL_LIMIT && !creditNote.trim() ? "Credit note is required to save credit" : undefined}>
          <Button
            onClick={handleSave}
            disabled={totalCredit > CREDIT_APPROVAL_LIMIT && !creditNote.trim()}
          >
            Save Credit
          </Button>
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}