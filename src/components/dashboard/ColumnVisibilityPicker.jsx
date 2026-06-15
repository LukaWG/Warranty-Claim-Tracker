import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings } from "lucide-react";

const DEFAULT_COLUMNS = {
  wip_number: true,
  invoice_number: true,
  claim_number: true,
  site: true,
  brand: true,
  expected_hours: true,
  actual_hours: false,
  parts: true,
  labour: true,
  sub_con: false,
  credit: false,
  total_claim_cost: true,
  last_clocking_date: false,
  scanned_date: false,
  manufacturer_deadline: true,
  status: true,
  approval_status: true,
  claimed_date: false,
  claimed_by: false,
};

const COLUMN_LABELS = {
  wip_number: 'WIP Number',
  invoice_number: 'Invoice #',
  claim_number: 'Claim #',
  site: 'Site',
  brand: 'Brand',
  expected_hours: 'Expected Hours',
  actual_hours: 'Actual Hours',
  parts: 'Parts',
  labour: 'Labour',
  sub_con: 'Sub Con',
  credit: 'Credit',
  total_claim_cost: 'Total Cost',
  last_clocking_date: 'Last Clocking',
  scanned_date: 'Scanned Date',
  manufacturer_deadline: 'Mfr Deadline',
  status: 'Status',
  approval_status: 'Approval Status',
  claimed_date: 'Claimed Date',
  claimed_by: 'Claimed By',
};

export default function ColumnVisibilityPicker({ visibleColumns, onColumnsChange, userRole }) {
  const isProcessor = userRole === 'Processor';

  const availableColumns = Object.entries(COLUMN_LABELS).filter(([key]) => {
    if (isProcessor && key === 'claimed_by') return false;
    return true;
  });

  const toggleColumn = (columnKey) => {
    const updated = { ...visibleColumns, [columnKey]: !visibleColumns[columnKey] };
    onColumnsChange(updated);
  };

  const toggleAll = (show) => {
    const updated = Object.keys(visibleColumns).reduce((acc, key) => {
      acc[key] = show;
      return acc;
    }, {});
    onColumnsChange(updated);
  };

  const visibleCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 h-8"
          title="Customize columns"
        >
          <Settings className="h-4 w-4" />
          Columns ({visibleCount})
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-700">Show Columns</span>
            <span className="text-xs text-slate-500">{visibleCount} visible</span>
          </div>
          <div className="flex gap-2 mb-3">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 flex-1"
              onClick={() => toggleAll(true)}
            >
              All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 flex-1"
              onClick={() => toggleAll(false)}
            >
              None
            </Button>
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {availableColumns.map(([key, label]) => (
            <div
              key={key}
              className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
            >
              <Checkbox
                id={`col-${key}`}
                checked={visibleColumns[key] || false}
                onCheckedChange={() => toggleColumn(key)}
              />
              <label
                htmlFor={`col-${key}`}
                className="text-sm text-slate-700 cursor-pointer flex-1"
              >
                {label}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { DEFAULT_COLUMNS, COLUMN_LABELS };