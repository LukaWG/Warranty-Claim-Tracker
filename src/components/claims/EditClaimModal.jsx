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
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export default function EditClaimModal({ claim, open, onClose, onSave }) {
  const [useRate2, setUseRate2] = useState(false);
  const { data: sites = [] } = useQuery({
    queryKey: ['sites'],
    queryFn: () => databaseClients.Site.get()
  });
  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const data = await databaseClients.Brand.get();
      return data.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
  });
  const { data: alerts = [] } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => databaseClients.Alert.get()
  });
  const { data: resolutions = [] } = useQuery({
    queryKey: ['resolutions'],
    queryFn: () => databaseClients.AlertResolution.get()
  });
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => databaseClients.User.get()
  });

  const [creditExpanded, setCreditExpanded] = useState(!!(claim?.credit || claim?.credit_parts || claim?.credit_labour || claim?.credit_sub_con));

  const existingParts = (claim?.claim_number || '').split('-').filter(Boolean);
  const [claimNumbers, setClaimNumbers] = useState(existingParts.length > 0 ? existingParts : ['']);
  const [formData, setFormData] = useState({
    wip_number: claim?.wip_number || '',
    expected_hours: claim?.expected_hours || '',
    last_clocking_date: claim?.last_clocking_date ? new Date(claim.last_clocking_date) : null,
    scanned_date: claim?.scanned_date ? new Date(claim.scanned_date) : null,
    scanned_date_original: claim?.scanned_date || null,
    site: claim?.site || '',
    brand: claim?.brand || '',
    invoice_number: claim?.invoice_number || '',
    parts: claim?.parts || 0,
    labour: claim?.labour || 0,
    sub_con: claim?.sub_con || 0,
    total_claim_cost: claim?.total_claim_cost || 0,
    original_parts: (parseFloat(claim?.parts) || 0) + (parseFloat(claim?.credit_parts) || 0),
    original_labour: (parseFloat(claim?.labour) || 0) + (parseFloat(claim?.credit_labour) || 0),
    original_sub_con: (parseFloat(claim?.sub_con) || 0) + (parseFloat(claim?.credit_sub_con) || 0),
    credit_parts: claim?.credit_parts || 0,
    credit_labour: claim?.credit_labour || 0,
    credit_sub_con: claim?.credit_sub_con || 0,
    credit: claim?.credit || 0,
    credit_note: claim?.credit_note || '',
    manufacturer_deadline: claim?.manufacturer_deadline ? new Date(claim.manufacturer_deadline) : null,
    status: claim?.status || 'in_progress',
    claimed: claim?.claimed || false,
    approval_status: claim?.approval_status || null,
    claimed_date: claim?.claimed_date || null,
    claimed_by: claim?.claimed_by || '',
    actual_hours: claim?.actual_hours || '',
    alert: claim?.alert || '',
    alert_resolution: claim?.alert_resolution || '',
  });

  const selectedSite = sites.find(s => s.name === formData.site);

  const updateTotal = (parts, labour, subCon) => {
    const total = (parseFloat(parts) || 0) + (parseFloat(labour) || 0) + (parseFloat(subCon) || 0);
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const claimNumberParts = claimNumbers.filter(Boolean);
    const { scanned_date_original, original_parts, original_labour, original_sub_con, ...rest } = formData;

    const creditVal = (parseFloat(formData.credit_parts) || 0) + (parseFloat(formData.credit_labour) || 0) + (parseFloat(formData.credit_sub_con) || 0);
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
      credit_parts: formData.credit_parts ? parseFloat(formData.credit_parts) : null,
      credit_labour: formData.credit_labour ? parseFloat(formData.credit_labour) : null,
      credit_sub_con: formData.credit_sub_con ? parseFloat(formData.credit_sub_con) : null,
      credit: creditVal || null,
      credit_note: creditVal >= 100 ? formData.credit_note : null,
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
      alert: formData.alert || '',
      alert_resolution: formData.alert_resolution || '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Warranty Repair</DialogTitle>
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
              <div className="space-y-2">
                {claimNumbers.map((num, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      placeholder={`e.g. WR-12345`}
                      value={num}
                      onChange={(e) => {
                        const updated = [...claimNumbers];
                        updated[i] = e.target.value;
                        setClaimNumbers(updated);
                      }}
                    />
                    {claimNumbers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setClaimNumbers(claimNumbers.filter((_, idx) => idx !== i))}
                        className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                {claimNumbers.length < 12 && (
                  <button
                    type="button"
                    onClick={() => setClaimNumbers([...claimNumbers, ''])}
                    className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                  >
                  <Plus className="h-4 w-4" />
                  Add another claim number
                </button>)}
              </div>
            </div>

            <div className="space-y-2 col-span-2">
            <div className="grid grid-cols-3 gap-4">
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
                    const newPartsVal = parseFloat(newParts) || 0;
                    // Recalculate original_parts: new parts value + any existing credit
                    const newOriginalParts = newPartsVal + (parseFloat(formData.credit_parts) || 0);
                    setFormData({ ...formData, parts: newParts, original_parts: newOriginalParts, total_claim_cost: updateTotal(newParts, formData.labour, formData.sub_con) });
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
                    const newLabourVal = parseFloat(newLabour) || 0;
                    const newTotal = updateTotal(formData.parts, newLabour, formData.sub_con);
                    const hourlyRate = selectedSite?.brand_hourly_rates_1?.[formData.brand] || 0;
                    const calculatedHours = hourlyRate > 0 ? Math.round((newLabourVal / hourlyRate) * 100) / 100 : 0;
                    const newOriginalLabour = newLabourVal + (parseFloat(formData.credit_labour) || 0);
                    setFormData({ ...formData, labour: newLabour, original_labour: newOriginalLabour, total_claim_cost: newTotal, actual_hours: calculatedHours > 0 ? calculatedHours : '' });
                  }}
                  className="pl-7"
                />
              </div>
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
                    const newSubConVal = parseFloat(newSubCon) || 0;
                    const newOriginalSubCon = newSubConVal + (parseFloat(formData.credit_sub_con) || 0);
                    setFormData({ ...formData, sub_con: newSubCon, original_sub_con: newOriginalSubCon, total_claim_cost: updateTotal(formData.parts, formData.labour, newSubCon) });
                  }}
                  className="pl-7"
                />
              </div>
            </div>

            </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
              <Label>Actual Hours</Label>
              {!!selectedSite?.brand_hourly_rates_2?.[formData.brand] && (
              <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setUseRate2(false);
                    const labourVal = parseFloat(formData.labour) || 0;
                    const rate1 = selectedSite?.brand_hourly_rates_1?.[formData.brand] || 0;
                    const calculatedHours = rate1 > 0 ? Math.round((labourVal / rate1) * 100) / 100 : 0;
                    setFormData({ ...formData, actual_hours: calculatedHours > 0 ? calculatedHours : '' });
                  }}
                  className={cn(
                    "text-xs px-2 py-0.5 rounded transition-colors", !useRate2 ? "bg-white shadow text-slate-800 font-semibold" : "text-slate-500 hover:text-slate-700")}
                    >
                      Rate 1
                </button>
                <button
                  type="button" disabled={!selectedSite?.brand_hourly_rates_2?.[formData.brand]}
                  onClick={() => {
                    setUseRate2(true);
                    const labourVal = parseFloat(formData.labour) || 0;
                    const rate2 = selectedSite?.brand_hourly_rates_2?.[formData.brand] || 0;
                    const calculatedHours = rate2 > 0 ? Math.round((labourVal / rate2) * 100) / 100 : 0;
                    setFormData({ ...formData, actual_hours: calculatedHours > 0 ? calculatedHours : '' });
                  }}
                  className={cn(
                    "text-xs px-2 py-0.5 rounded transition-colors", useRate2 ? "bg-white shadow text-slate-800 font-semibold" : "text-slate-500 hover:text-slate-700")}
                    >
                      Rate 2
                    </button>
                  </div>
              )}
              </div>
              <Input
                type="number"
                step="0.1"
                min="0"
                value={formData.actual_hours}
                readOnly
                className="bg-slate-50 cursor-not-allowed"
              />
            </div>

            {/* {(parseFloat(formData.credit) || 0) >= 100 && (
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
            )} */}

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

          {/* Mark as Claimed */}
          <div className="col-span-2">
            {(() => {
              const canClaim = formData.invoice_number && claimNumbers.some(n => n.trim()) && parseFloat(formData.total_claim_cost) > 0;
              if (formData.claimed) {
                return (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-teal-50 border border-teal-200">
                      <span className="text-teal-600 text-sm">✓</span>
                      <span className="text-sm font-medium text-teal-700">Claimed</span>
                    </div>
                    <Button type="button" variant="outline" size="sm"
                      onClick={() => setFormData({ ...formData, claimed: false, claimed_by: '' })}
                      className="text-slate-500 hover:text-red-600 hover:border-red-300 text-xs"
                    >
                      Undo
                    </Button>
                  </div>
                );
              }
              return (
                <Button
                  type="button"
                  disabled={!canClaim}
                  onClick={() => {
                    const updatedData = { ...formData, claimed: true, claimed_by: currentUser ? currentUser.email : '' };
                    setFormData(updatedData);
                    const claimNumberParts = claimNumbers.filter(Boolean);
                    const { scanned_date_original, original_parts, original_labour, original_sub_con, ...rest } = updatedData;
                    const creditVal = (parseFloat(updatedData.credit_parts) || 0) + (parseFloat(updatedData.credit_labour) || 0) + (parseFloat(updatedData.credit_sub_con) || 0);
                    const originalCreditVal = parseFloat(claim?.credit) || 0;
                    const needsApproval = creditVal >= 100;
                    const creditChangedAfterApproval = updatedData.approval_status === 'approved' && creditVal !== originalCreditVal && creditVal >= 100;
                    const effectiveApprovalStatus = creditChangedAfterApproval ? 'pending_approval' : (needsApproval ? (updatedData.approval_status || 'pending_approval') : null);
                    
                    let newStatus;
                    if (formData.claimed || claim?.claimed) {
                      newStatus = 'completed';
                    } else {
                      newStatus = rest.status;
                    }
                    
                    onSave({
                      ...rest,
                      status: 'completed',
                      claim_number: claimNumberParts.join('-'),
                      expected_hours: parseFloat(updatedData.expected_hours),
                      actual_hours: updatedData.actual_hours ? parseFloat(updatedData.actual_hours) : null,
                      parts: updatedData.parts ? parseFloat(updatedData.parts) : null,
                      labour: updatedData.labour ? parseFloat(updatedData.labour) : null,
                      sub_con: updatedData.sub_con ? parseFloat(updatedData.sub_con) : null,
                      total_claim_cost: updatedData.total_claim_cost ? parseFloat(updatedData.total_claim_cost) : null,
                      credit_parts: updatedData.credit_parts ? parseFloat(updatedData.credit_parts) : null,
                      credit_labour: updatedData.credit_labour ? parseFloat(updatedData.credit_labour) : null,
                      credit_sub_con: updatedData.credit_sub_con ? parseFloat(updatedData.credit_sub_con) : null,
                      credit: creditVal || null,
                      credit_note: creditVal >= 100 ? updatedData.credit_note : null,
                      approval_status: effectiveApprovalStatus,
                      last_clocking_date: updatedData.last_clocking_date ? format(updatedData.last_clocking_date, 'yyyy-MM-dd') : null,
                      scanned_date: (() => {
                        if (!updatedData.scanned_date) return null;
                        const formatted = format(updatedData.scanned_date, 'yyyy-MM-dd');
                        const originalFormatted = scanned_date_original ? scanned_date_original.substring(0, 10) : null;
                        return formatted === originalFormatted ? scanned_date_original : formatted;
                      })(),
                      manufacturer_deadline: updatedData.manufacturer_deadline ? format(updatedData.manufacturer_deadline, 'yyyy-MM-dd') : null,
                      claimed: true,
                      claimed_date: updatedData.claimed_date || new Date().toISOString(),
                      claimed_by: currentUser ? currentUser.email : '',
                      alert: updatedData.alert || '',
                      alert_resolution: updatedData.alert_resolution || '',
                    });
                  }}
                  className="w-full"
                  style={canClaim ? { backgroundColor: 'var(--hendy-teal)', color: 'white' } : {}}
                  title={!canClaim ? 'Invoice number, claim number and total cost are required before claiming' : ''}
                >
                  Mark as Claimed
                </Button>
              );
            })()}
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