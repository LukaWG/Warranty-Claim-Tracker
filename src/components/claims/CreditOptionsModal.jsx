import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';
import { currentUser as currentUserClient } from '@/api/currentUser';
import ApprovalChat from '@/components/approvals/ApprovalChat';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function CreditOptionsModal({ claim, open, onClose, onSave, isSaving = false }) {
  const { data: sites = [] } = useQuery({
    queryKey: ['sites'],
    queryFn: () => databaseClients.Site.list('name')
  });

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => currentUserClient.me()
  });

  const [activeTab, setActiveTab] = useState('credit');

  const CREDIT_APPROVAL_LIMIT = 100;

  const selectedSite = sites.find(s => s.name === claim?.site);

  // Current values in the database (before credit reduction is applied)
  const currentParts = parseFloat(claim?.parts) || 0;
  const currentLabour = parseFloat(claim?.labour) || 0;
  const currentSubCon = parseFloat(claim?.sub_con) || 0;

  const [creditParts, setCreditParts] = useState(claim?.credit_parts || 0);
  const [creditLabour, setCreditLabour] = useState(claim?.credit_labour || 0);
  const [creditSubCon, setCreditSubCon] = useState(claim?.credit_sub_con || 0);
  const [creditNote, setCreditNote] = useState(claim?.credit_note || '');

  useEffect(() => {
    if (claim?.approval_status === 'rejected') {
      setCreditParts(0);
      setCreditLabour(0);
      setCreditSubCon(0);
      setCreditNote('');
    }
  }, [claim?.approval_status, open])

  const totalCredit = (parseFloat(creditParts) || 0) + (parseFloat(creditLabour) || 0) + (parseFloat(creditSubCon) || 0);

  const updateTotal = (parts, labour, subCon) =>
    (parseFloat(parts) || 0) + (parseFloat(labour) || 0) + (parseFloat(subCon) || 0);

  const handleSave = () => {
    const creditVal = totalCredit;

    const originalCreditVal = parseFloat(claim?.credit) || 0;
    const needsApproval = creditVal >= CREDIT_APPROVAL_LIMIT;
    const creditChangedAfterApproval = (claim?.approval_status === 'approved' || claim?.approval_status === 'rejected') && creditVal !== originalCreditVal && creditVal >= CREDIT_APPROVAL_LIMIT;
    const effectiveApprovalStatus = creditChangedAfterApproval
      ? 'pending_approval'
      : (needsApproval ? (claim?.approval_status || 'pending_approval') : (creditVal > 0 && creditVal < CREDIT_APPROVAL_LIMIT) ? 'approved' : null);

    // Only update the actual figures when status is set to 'credited'
    // Otherwise, just store the credit values without reducing parts/labour/sub_con
    const shouldUpdateFigures = effectiveApprovalStatus === 'credited';
    
    const newParts = shouldUpdateFigures ? Math.max(0, currentParts - (parseFloat(creditParts) || 0)) : currentParts;
    const newLabour = shouldUpdateFigures ? Math.max(0, currentLabour - (parseFloat(creditLabour) || 0)) : currentLabour;
    const newSubCon = shouldUpdateFigures ? Math.max(0, currentSubCon - (parseFloat(creditSubCon) || 0)) : currentSubCon;
    const newTotal = shouldUpdateFigures ? updateTotal(newParts, newLabour, newSubCon) : updateTotal(currentParts, currentLabour, currentSubCon);
    const hourlyRate = selectedSite?.brand_hourly_rates?.[claim?.brand] || 0;
    const actualHours = hourlyRate > 0 && shouldUpdateFigures ? Math.round((newLabour / hourlyRate) * 100) / 100 : claim?.actual_hours;

    onSave({
      credit_parts: creditVal > 0 ? parseFloat(creditParts) || null : null,
      credit_labour: creditVal > 0 ? parseFloat(creditLabour) || null : null,
      credit_sub_con: creditVal > 0 ? parseFloat(creditSubCon) || null : null,
      credit: creditVal || null,
      credit_note: creditVal > 0 ? creditNote : null,
      approval_status: effectiveApprovalStatus,
      parts: (shouldUpdateFigures && newParts > 0) ? newParts : (currentParts > 0 ? currentParts : null),
      labour: (shouldUpdateFigures && newLabour > 0) ? newLabour : (currentLabour > 0 ? currentLabour : null),
      sub_con: (shouldUpdateFigures && newSubCon > 0) ? newSubCon : (currentSubCon > 0 ? currentSubCon : null),
      total_claim_cost: (shouldUpdateFigures && newTotal > 0) ? newTotal : (updateTotal(currentParts, currentLabour, currentSubCon) > 0 ? updateTotal(currentParts, currentLabour, currentSubCon) : null),
      actual_hours: actualHours || null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Credit Options — {claim?.wip_number}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-2">
            <TabsTrigger value="credit">Credit</TabsTrigger>
            <TabsTrigger value="chat">Approval Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="credit" className="space-y-4 pt-2">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Parts Credit (£)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                  <Input
                    type="number" step="0.01" min="0"
                    max={currentParts > 0 ? currentParts : undefined}
                    value={creditParts}
                    onChange={(e) => setCreditParts(e.target.value)}
                    className="pl-7"
                    disabled={currentParts <= 0}
                  />
                </div>
                {currentParts > 0
                  ? <p className="text-xs text-slate-400">of £{currentParts.toFixed(2)}</p>
                  : <p className="text-xs text-amber-500">No parts cost recorded</p>
                }
              </div>
              <div className="space-y-2">
                <Label>Labour Credit (£)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                  <Input
                    type="number" step="0.01" min="0"
                    max={currentLabour > 0 ? currentLabour : undefined}
                    value={creditLabour}
                    onChange={(e) => setCreditLabour(e.target.value)}
                    className="pl-7"
                    disabled={currentLabour <= 0}
                  />
                </div>
                {currentLabour > 0
                  ? <p className="text-xs text-slate-400">of £{currentLabour.toFixed(2)}</p>
                  : <p className="text-xs text-amber-500">No labour cost recorded</p>
                }
              </div>
              <div className="space-y-2">
                <Label>Sub Con Credit (£)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                  <Input
                    type="number" step="0.01" min="0"
                    max={currentSubCon > 0 ? currentSubCon : undefined}
                    value={creditSubCon}
                    onChange={(e) => setCreditSubCon(e.target.value)}
                    className="pl-7"
                    disabled={currentSubCon <= 0}
                  />
                </div>
                {currentSubCon > 0
                  ? <p className="text-xs text-slate-400">of £{currentSubCon.toFixed(2)}</p>
                  : <p className="text-xs text-amber-500">No sub con cost recorded</p>
                }
              </div>
            </div>

            {totalCredit > 0 && (
              <p className="text-sm font-medium text-slate-600">Total Credit: £{totalCredit.toFixed(2)}</p>
            )}

            {totalCredit > 0 && (
              <div className="space-y-2">
                <Label>Credit Note <span className="text-red-500">*</span> <span className="text-xs text-slate-400 font-normal"></span></Label>
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
          </TabsContent>
          <TabsContent value="chat">

            {claim?.id && (
                <ApprovalChat claim={claim} currentUser={currentUser} />
            )}
          </TabsContent>
        </Tabs>
        
        {activeTab === 'credit' && (
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            {(claim?.approval_status === 'approved' || claim?.approval_status === 'pending_approval') && totalCredit > 0 && (
              <Button
                variant="outline"
                disabled={isSaving || claim?.approval_status !== 'approved' }
                className="bg-teal-50 border-teal-300 text-teal-700 hover:bg-teal-100 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  const creditVal = totalCredit;
                  const newParts = Math.max(0, currentParts - (parseFloat(creditParts) || 0));
                  const newLabour = Math.max(0, currentLabour - (parseFloat(creditLabour) || 0));
                  const newSubCon = Math.max(0, currentSubCon - (parseFloat(creditSubCon) || 0));
                  const newTotal = updateTotal(newParts, newLabour, newSubCon);
                  const hourlyRate = selectedSite?.brand_hourly_rates?.[claim?.brand] || 0;
                  const actualHours = hourlyRate > 0 ? Math.round((newLabour / hourlyRate) * 100) / 100 : claim?.actual_hours;
                  onSave({
                    approval_status: 'credited',
                    credit_parts: creditVal > 0 ? parseFloat(creditParts) || null : null,
                    credit_labour: creditVal > 0 ? parseFloat(creditLabour) || null : null,
                    credit_sub_con: creditVal > 0 ? parseFloat(creditSubCon) || null : null,
                    credit: creditVal || null,
                    parts: newParts > 0 ? newParts : null,
                    labour: newLabour > 0 ? newLabour : null,
                    sub_con: newSubCon > 0 ? newSubCon : null,
                    total_claim_cost: newTotal > 0 ? newTotal : null,
                    actual_hours: actualHours || null,
                  });
                }
              }
              >
                {isSaving ? 'Applying...' : `Apply Credit (£${totalCredit.toFixed(2)})`}
              </Button>
            )}
            <span title={!creditNote.trim() ? "Credit note is required to request credit" : undefined}>
            <Button
              onClick={handleSave}
              disabled={!creditNote.trim() || isSaving}
            >
              {isSaving ? 'Submitting...' : 'Submit'}
            </Button>
            </span>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}