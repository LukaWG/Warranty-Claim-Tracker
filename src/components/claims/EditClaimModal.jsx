import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export default function EditClaimModal({ claim, open, onClose, onSave }) {
  const { data: sites = [] } = useQuery({
    queryKey: ['sites'],
    queryFn: () => databaseClients.Site.get()
  });
  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: () => base44.entities.Brand.list('name')
  });
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const claimParts = (claim?.claim_number || '').split('-');
  const [formData, setFormData] = useState({
    wip_number: claim?.wip_number || '',
    reg_number: claim?.reg_number || '',
    expected_hours: claim?.expected_hours || '',
    last_clocking_date: claim?.last_clocking_date ? new Date(claim.last_clocking_date) : null,
    scanned_date: claim?.scanned_date ? new Date(claim.scanned_date) : null,
    scanned_date_original: claim?.scanned_date || null,
    site: claim?.site || '',
    brand: claim?.brand || '',
    invoice_number: claim?.invoice_number || '',
    claim_number_1: claimParts[0] || '',
    claim_number_2: claimParts[1] || '',
    claim_number_3: claimParts[2] || '',
    parts: claim?.parts || 0,
    labour: claim?.labour || 0,
    sub_con: claim?.sub_con || 0,
    total_claim_cost: claim?.total_claim_cost || 0,
    credit: claim?.credit || 0,
    credit_note: claim?.credit_note || '',
    manufacturer_deadline: claim?.manufacturer_deadline ? new Date(claim.manufacturer_deadline) : null,
    status: claim?.status || 'in_progress',
    claimed: claim?.claimed || false,
    approval_status: claim?.approval_status || null,
    claimed_date: claim?.claimed_date || null,
    claimed_by: claim?.claimed_by || '',
    actual_hours: claim?.actual_hours || ''
  });

  const selectedSite = sites.find(s => s.name === formData.site);

  const updateTotal = (parts, labour, subCon) => {
    const total = (parseFloat(parts) || 0) + (parseFloat(labour) || 0) + (parseFloat(subCon) || 0);
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const claimNumberParts = [formData.claim_number_1, formData.claim_number_2, formData.claim_number_3].filter(Boolean);
    const { claim_number_1, claim_number_2, claim_number_3, scanned_date_original, ...rest } = formData;

    const creditVal = parseFloat(formData.credit) || 0;
    const originalCreditVal = parseFloat(claim?.credit) || 0;
    const needsApproval = creditVal >= 100;

    // If previously approved but credit has been changed and still >= 100, reset to pending
    const creditChangedAfterApproval = formData.approval_status === 'approved' && creditVal !== originalCreditVal && creditVal >= 100;
    const effectiveApprovalStatus = creditChangedAfterApproval ? 'pending_approval' : (needsApproval ? (formData.approval_status || 'pending_approval') : null);

    // Status is independent of credit approval — preserve it
    let newStatus;
    if (formData.claimed || claim?.claimed) {
      newStatus = 'completed';
    } else {
      newStatus = rest.status;
    }

    onSave({
      ...rest,
      status: newStatus,
      claim_number: claimNumberParts.join('-'),
      expected_hours: parseFloat(formData.expected_hours),
      actual_hours: formData.actual_hours ? parseFloat(formData.actual_hours) : null,
      parts: formData.parts ? parseFloat(formData.parts) : null,
      labour: formData.labour ? parseFloat(formData.labour) : null,
      sub_con: formData.sub_con ? parseFloat(formData.sub_con) : null,
      total_claim_cost: formData.total_claim_cost ? parseFloat(formData.total_claim_cost) : null,
      credit: formData.credit ? parseFloat(formData.credit) : null,
      credit_note: (parseFloat(formData.credit) || 0) >= 100 ? formData.credit_note : null,
      approval_status: effectiveApprovalStatus,
      last_clocking_date: formData.last_clocking_date ? format(formData.last_clocking_date, 'yyyy-MM-dd') : null,
      scanned_date: (() => {
        if (!formData.scanned_date) return null;
        // If the date hasn't changed (same day), preserve the original value with its time
        const formatted = format(formData.scanned_date, 'yyyy-MM-dd');
        const originalFormatted = formData.scanned_date_original ? formData.scanned_date_original.substring(0, 10) : null;
        return formatted === originalFormatted ? formData.scanned_date_original : formatted;
      })(),
      manufacturer_deadline: formData.manufacturer_deadline ? format(formData.manufacturer_deadline, 'yyyy-MM-dd') : null,
      claimed: formData.claimed,
      claimed_date: formData.claimed ? (formData.claimed_date || new Date().toISOString()) : null,
      claimed_by: formData.claimed ? formData.claimed_by : null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Warranty Claim</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>WIP Number *</Label>
              <Input
                value={formData.wip_number}
                onChange={(e) => setFormData({ ...formData, wip_number: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Reg Number *</Label>
              <Input
                value={formData.reg_number}
                onChange={(e) => setFormData({ ...formData, reg_number: e.target.value.toUpperCase() })}
                placeholder="e.g. AB12 CDE"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Expected Hours *</Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                value={formData.expected_hours}
                onChange={(e) => setFormData({ ...formData, expected_hours: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Site *</Label>
              <Select 
                value={formData.site} 
                onValueChange={(value) => setFormData({ ...formData, site: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select site" />
                </SelectTrigger>
                <SelectContent>
                  {sites.map((site) => (
                    <SelectItem key={site.id} value={site.name}>
                      {site.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Brand</Label>
              <Select 
                value={formData.brand} 
                onValueChange={(value) => {
                  const selectedBrand = brands.find(b => b.name === value);
                  const deadlineDays = selectedBrand?.manufacturer_deadline_days;
                  const deadline = deadlineDays ? (() => {
                    const date = new Date();
                    date.setDate(date.getDate() + deadlineDays);
                    return date;
                  })() : formData.manufacturer_deadline;
                  setFormData({ ...formData, brand: value, manufacturer_deadline: deadline });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {(() => {
                    const selectedSite = sites.find(s => s.name === formData.site);
                    const siteBrands = selectedSite?.brands?.length > 0
                      ? brands.filter(b => selectedSite.brands.includes(b.name))
                      : brands;
                    return siteBrands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.name}>
                        {brand.name}
                      </SelectItem>
                    ));
                  })()}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Invoice Number</Label>
              <Input
                value={formData.invoice_number}
                onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Claim Number</Label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Part 1"
                  value={formData.claim_number_1}
                  onChange={(e) => setFormData({ ...formData, claim_number_1: e.target.value })}
                />
                <span className="text-slate-400 font-medium">-</span>
                <Input
                  placeholder="Part 2"
                  value={formData.claim_number_2}
                  onChange={(e) => setFormData({ ...formData, claim_number_2: e.target.value })}
                />
                <span className="text-slate-400 font-medium">-</span>
                <Input
                  placeholder="Part 3"
                  value={formData.claim_number_3}
                  onChange={(e) => setFormData({ ...formData, claim_number_3: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Parts (£)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.parts}
                  onChange={(e) => {
                    const newParts = e.target.value;
                    const newTotal = updateTotal(newParts, formData.labour, formData.sub_con);
                    setFormData({ ...formData, parts: newParts, total_claim_cost: newTotal });
                  }}
                  className="pl-7"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Labour (£)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.labour}
                  onChange={(e) => {
                    const newLabour = e.target.value;
                    const newTotal = updateTotal(formData.parts, newLabour, formData.sub_con);
                    const labourVal = parseFloat(newLabour) || 0;
                    const hourlyRate = selectedSite?.brand_hourly_rates?.[formData.brand] || 0;
                    const calculatedHours = hourlyRate > 0 ? labourVal / hourlyRate : 0;
                    setFormData({ ...formData, labour: newLabour, total_claim_cost: newTotal, actual_hours: calculatedHours > 0 ? calculatedHours : '' });
                  }}
                  className="pl-7"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Actual Hours</Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                value={formData.actual_hours}
                readOnly
                className="bg-slate-50 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <Label>Sub Con (£)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.sub_con}
                  onChange={(e) => {
                    const newSubCon = e.target.value;
                    const newTotal = updateTotal(formData.parts, formData.labour, newSubCon);
                    setFormData({ ...formData, sub_con: newSubCon, total_claim_cost: newTotal });
                  }}
                  className="pl-7"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Credit (£)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.credit}
                onChange={(e) => setFormData({ ...formData, credit: e.target.value })}
                className="pl-7"
                disabled={!formData.reg_number?.trim()}
                title={!formData.reg_number?.trim() ? 'Enter a Reg Number before adding credit' : ''}
                />
              </div>
            </div>

            {(parseFloat(formData.credit) || 0) >= 100 && (
              <div className="space-y-2 col-span-2">
                <Label>
                  Credit Note <span className="text-red-500">*</span>
                  <span className="text-xs text-slate-400 font-normal ml-1">(required when credit ≥ £100)</span>
                </Label>
                <Textarea
                  placeholder="Please provide justification for this credit amount..."
                  value={formData.credit_note}
                  onChange={(e) => setFormData({ ...formData, credit_note: e.target.value })}
                  required
                  className="resize-none"
                  rows={3}
                />
              </div>
            )}

            {claim?.approval_note && (
              <div className="space-y-2 col-span-2">
                <Label>Approver Note</Label>
                <div className="p-3 rounded-md bg-slate-50 border border-slate-200">
                  <p className="text-sm text-slate-700">{claim.approval_note}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Total Claim Cost (£)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.total_claim_cost}
                  readOnly
                  className="pl-7 bg-slate-50 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Last Clocking Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.last_clocking_date && "text-slate-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.last_clocking_date ? format(formData.last_clocking_date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.last_clocking_date}
                    onSelect={(date) => setFormData({ ...formData, last_clocking_date: date })}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Scanned Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.scanned_date && "text-slate-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.scanned_date ? format(formData.scanned_date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.scanned_date}
                    onSelect={(date) => setFormData({ ...formData, scanned_date: date })}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Manufacturer Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.manufacturer_deadline && "text-slate-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.manufacturer_deadline ? format(formData.manufacturer_deadline, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.manufacturer_deadline}
                    onSelect={(date) => setFormData({ ...formData, manufacturer_deadline: date })}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2 flex items-end pb-1">
            <div className="flex flex-col gap-1">
            {(() => {
              const creditVal = parseFloat(formData.credit) || 0;
              const originalCreditVal = parseFloat(claim?.credit) || 0;
              const creditChangedAfterApproval = formData.approval_status === 'approved' && creditVal !== originalCreditVal && creditVal >= 100;
              if (creditChangedAfterApproval) {
                return (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-200 mb-1">
                    <span className="text-amber-500 text-sm">⚠</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-amber-700">Re-approval required</span>
                      <span className="text-xs text-amber-600">Credit figure changed — pending re-approval</span>
                    </div>
                  </div>
                );
              }
              if (creditVal >= 100 && formData.approval_status !== 'approved') {
              return (
                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-200 mb-1">
                  <span className="text-amber-500 text-sm">⚠</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-amber-700">Credit approval pending</span>
                    <span className="text-xs text-amber-600">Credit ≥ £100
                      {formData.approval_status === 'rejected' && ' · Rejected'}
                      {formData.approval_status === 'pending_approval' && ' · Awaiting approval'}
                    </span>
                  </div>
                </div>
              );
              }
              return null;
            })()}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="claimed"
                    checked={formData.claimed}
                    disabled={!formData.invoice_number || !formData.claim_number_1 || !(parseFloat(formData.total_claim_cost) > 0)}
                    onCheckedChange={(checked) => setFormData({ ...formData, claimed: checked, claimed_by: checked && currentUser ? currentUser.email : '' })}
                  />
                  <Label htmlFor="claimed" className={`font-medium ${(!formData.invoice_number || !formData.claim_number_1 || !(parseFloat(formData.total_claim_cost) > 0)) ? 'text-slate-400 cursor-not-allowed' : 'cursor-pointer'}`}>Claimed</Label>
                </div>

              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}