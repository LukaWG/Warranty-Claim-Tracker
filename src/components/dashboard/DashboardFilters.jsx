import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, X, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

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
  { value: 'completed', label: 'Claimed' },
  { value: 'rejected', label: 'Queried' },
];

export default function DashboardFilters({ claims, filters, onFilterChange, allUsers = [], showClaimed, onShowClaimedChange, currentUser, allSites = [] }) {
  const userRole = currentUser?.custom_role || currentUser?.role;
  const isAdmin = userRole === 'Admin';
  const adminSite = currentUser?.default_site;

  const sites = isAdmin && adminSite
    ? [adminSite]
    : [...new Set(claims.map(c => c.site).filter(Boolean))];

  const userSite = currentUser?.default_site ? allSites.find(s => s.name === currentUser.default_site) : null;
  const allBrandsInClaims = [...new Set(claims.map(c => c.brand).filter(Boolean))];
  const brands = (userSite?.brands?.length > 0)
    ? allBrandsInClaims.filter(b => userSite.brands.includes(b))
    : allBrandsInClaims;

  const userEmails = [...new Set(claims.map(c => c.submitted_for || c.created_by).filter(Boolean))];
  const claimedByEmails = [...new Set(claims.map(c => c.claimed_by).filter(Boolean))];
  const alerts = [...new Set(claims.map(c => c.alert).filter(Boolean))];
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

  const handleClearFilters = () => {
    onFilterChange({wipNum: '', repairNum: '', site: [], brand: [], user: [], claimedBy: [], status: [], alert: [], resolution: [], dateFrom: '', dateTo: '' });
  };

  const hasActiveFilters = filters.wipNum || filters.repairNum || filters.site?.length > 0 || filters.brand?.length > 0 || filters.user?.length > 0 ||
    filters.claimedBy?.length > 0 || filters.status?.length > 0 || filters.alert?.length > 0 ||
    filters.resolution?.length > 0 || filters.dateFrom || filters.dateTo;

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
            placeholder="Enter WIP number"
            value={filters.wipNum}
            onChange={(e) => onFilterChange({ ...filters, wipNum: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-slate-600">Repair Number</Label>
          <Input
            placeholder="Enter repair number"
            value={filters.repairNum}
            onChange={(e) => onFilterChange({ ...filters, repairNum: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-slate-600">Site</Label>
          <MultiSelect
            placeholder="All Sites"
            options={sites.map(s => ({ value: s, label: s }))}
            selected={filters.site || []}
            onChange={(val) => onFilterChange({ ...filters, site: val })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-slate-600">Brand</Label>
          <MultiSelect
            placeholder="All Brands"
            options={brands.map(b => ({ value: b, label: b }))}
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
          <Label className="text-xs text-slate-600">Claimed By</Label>
          <MultiSelect
            placeholder="All Users"
            options={claimedByEmails.map(e => ({ value: e, label: getUserName(e) }))}
            selected={filters.claimedBy || []}
            onChange={(val) => onFilterChange({ ...filters, claimedBy: val })}
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
          <Label className="text-xs text-slate-600">Alert</Label>
          <MultiSelect
            placeholder="All Alerts"
            options={alerts.map(a => ({ value: a, label: a }))}
            selected={filters.alert || []}
            onChange={(val) => onFilterChange({ ...filters, alert: val })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-slate-600">Resolution</Label>
          <MultiSelect
            placeholder="All Resolutions"
            options={resolutions.map(r => ({ value: r, label: r }))}
            selected={filters.resolution || []}
            onChange={(val) => onFilterChange({ ...filters, resolution: val })}
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