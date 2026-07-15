import { useQuery } from '@tanstack/react-query';
import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, X, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { databaseClients } from "@/api/databaseClient"

function MultiSelect({ label, options, selected, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const displayText = selected.length === 0
    ? placeholder
    : selected.length === 1
      ? (options.find(o => o.value === selected[0])?.label || selected[0])
      : `${selected.length} selected`;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={cn(
          "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
          selected.length > 0 ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown className="h-4 w-4 opacity-50 ml-1 flex-shrink-0" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[160px] rounded-md border bg-popover shadow-md overflow-hidden">
          <div className="max-h-60 overflow-y-auto p-1">
            {options.map(opt => (
              <div
                key={opt.value}
                onClick={() => toggle(opt.value)}
                className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground select-none"
              >
                <div className={cn(
                  "h-4 w-4 rounded-sm border border-primary flex items-center justify-center flex-shrink-0",
                  selected.includes(opt.value) ? "bg-primary text-primary-foreground" : "bg-transparent"
                )}>
                  {selected.includes(opt.value) && <Check className="h-3 w-3" />}
                </div>
                <span>{opt.label}</span>
              </div>
            ))}
            {options.length === 0 && (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">No options</div>
            )}
          </div>
          {selected.length > 0 && (
            <div className="border-t p-1">
              <div
                onClick={() => onChange([])}
                className="flex items-center gap-2 px-2 py-1.5 text-xs rounded-sm cursor-pointer hover:bg-accent text-muted-foreground hover:text-accent-foreground"
              >
                <X className="h-3 w-3" /> Clear selection
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const STATUS_OPTIONS = [
  { value: 'in_progress', label: 'In Progress' },
  { value: 'awaiting_review', label: 'Awaiting Review' },
  // { value: 'awaiting_approval', label: 'Awaiting Approval' },
  // { value: 'approved', label: 'Approved' },
  { value: 'completed', label: 'Claimed' },
  { value: 'rejected', label: 'Queried' },
  // { value: 'credit_rejected', label: 'Credit Rejected' },
  // { value: 'claimed_info_requested', label: 'Awaiting Review' },
  // { value: 'claimed_info_received', label: 'Info Received' },
  { value: 'withdrawn', label: 'Withdrawn' },
];

export default function DashboardFilters({ claims, filters, onFilterChange, allUsers = [], showClaimed, onShowClaimedChange, currentUser, allSites = [], allBrands = [], wipSearch, repairSearch, onRepairSearchChange, onWipSearchChange }) {
  const userRole = currentUser?.custom_role || currentUser?.role;
  const isAdmin = userRole === 'Administrator';
  const adminSite = currentUser?.default_site;

  const sitesShuffled = isAdmin && adminSite
    ? [adminSite]
    : [...new Set(claims.map(c => c.site).filter(Boolean))];
  
  const sites = [...sitesShuffled].sort((a, b) => (allSites.find(site => site.id === a)?.name ?? "").localeCompare((allSites.find(site => site.id === b)?.name ?? "")));

  const { data: completeAllBrands = [] } = useQuery({
    queryKey: ['completeAllBrands'],
    queryFn: () => databaseClients.Brand.get()
  })

  const userSite = currentUser?.default_site ? allSites.find(s => s.id === currentUser.default_site) : null;
  // const allBrandsInClaims = [...new Set(completeAllBrands.filter(b => b.id === claims.map(c => c.brand).filter(Boolean)).name)];
  const allBrandIdsInClaims = [...new Set(claims.map(c => c.brand).filter(Boolean))];
  const allBrandsInClaims = allBrandIdsInClaims.map(id => completeAllBrands.find(b => b.id === id));
  // const allBrandsInClaims = [...new Set(claims.map(c => c.brand).filter(Boolean))];
  const brands = (userSite?.brands?.length > 0)
    ? allBrandsInClaims.filter(b => userSite.brands.includes(b.id)).sort((a, b) => (a.name).localeCompare(b.name))
    : allBrandsInClaims.sort((a, b) => (a.name).localeCompare(b.name));

  const userEmails = [...new Set(claims.map(c => c.submitted_for || c.created_by).filter(Boolean))];
  const claimedByEmails = [...new Set(claims.map(c => c.claimed_by).filter(Boolean))];
  const resolutions = [...new Set(claims.map(c => c.alert_resolution).filter(Boolean))];

  const getUserName = (email) => {
    if (!email) return email;
    const user = allUsers.find(u => u.email === email);
    if (!user) return email;
    if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
    if (user.first_name) return user.first_name;
    if (user.full_name) return user.full_name;
    return email;
  };

  const DEFAULT_STATUSES = ['in_progress', 'awaiting_review', 'rejected'];

  const handleClearFilters = () => {
    onFilterChange({wipNum: '', repairNum: '', site: [], brand: [], user: [], claimedBy: [], status: DEFAULT_STATUSES, resolution: [], dateFrom: '', dateTo: '', hasCredit: false });
    onRepairSearchChange('');
    onWipSearchChange('');
  };

  const isDefaultStatuses = filters.status?.length === DEFAULT_STATUSES.length && DEFAULT_STATUSES.every(s => filters.status.includes(s));
  const hasActiveFilters = filters.site?.length > 0 || filters.brand?.length > 0 || filters.user?.length > 0 ||
    filters.claimedBy?.length > 0 || !isDefaultStatuses ||
    filters.resolution?.length > 0 || filters.dateFrom || filters.dateTo || wipSearch || repairSearch || filters.hasCredit;

  return (
    <Card className="border-0 shadow-lg bg-white p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-600" />
          <h3 className="font-semibold text-slate-700">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-slate-500 hover:text-slate-700">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-4">
        <div className="space-y-2">
          <Label className="text-xs text-slate-600">WIP Number</Label>
          <Input
            placeholder="Search WIP"
            value={wipSearch || ''}
            onChange={(e) => onWipSearchChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-slate-600">Claim Number</Label>
          <Input
            placeholder="Search claim"
            value={repairSearch || ''}
            onChange={(e) => onRepairSearchChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-slate-600">Site</Label>
          <MultiSelect
            placeholder="All Sites"
            options={sites.map(s => ({ value: s, label: allSites.find(site => site.id === s)?.name }))}
            selected={filters.site || []}
            onChange={(val) => onFilterChange({ ...filters, site: val })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-slate-600">Brand</Label>
          <MultiSelect
            placeholder="All Brands"
            options={brands.map(b => ({ value: b?.id, label: b?.name }))}
            selected={filters.brand || []}
            onChange={(val) => onFilterChange({ ...filters, brand: val })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-slate-600">Submitted By</Label>
          <MultiSelect
            placeholder="All Users"
            options={userEmails.map(e => ({ value: e, label: getUserName(e) }))}
            selected={filters.user || []}
            onChange={(val) => onFilterChange({ ...filters, user: val })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-slate-600">Status</Label>
          <MultiSelect
            placeholder="All Statuses"
            options={STATUS_OPTIONS}
            selected={filters.status || []}
            onChange={(val) => onFilterChange({ ...filters, status: val })}
          />
        </div>        

        <div className="space-y-2">
          <Label className="text-xs text-slate-600">Date From</Label>
          <Input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value })}
            className="h-9"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-slate-600">Date To</Label>
          <Input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value })}
            className="h-9"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-slate-600">Credit</Label>
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, hasCredit: !filters.hasCredit })}
            className={cn(
              "flex h-9 w-full items-center justify-center rounded-md border text-sm shadow-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-ring",
              filters.hasCredit
                ? "bg-green-600 border-green-600 text-white hover:bg-green-700"
                : "border-input bg-transaprent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {filters.hasCredit ? "Has credit ✓" : "Has Credit"}
          </button>
        </div>

        {/* <div className="space-y-2 flex flex-col justify-end">
          <div className="flex items-center gap-2 h-9">
            <Checkbox
              id="show-claimed-filter"
              checked={showClaimed}
              onCheckedChange={onShowClaimedChange}
            />
            <label htmlFor="show-claimed-filter" className="text-xs text-slate-600 cursor-pointer whitespace-nowrap">
              Show Claimed
            </label>
          </div>
        </div> */}
      </div>
    </Card>
  );
}