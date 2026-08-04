import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Clock, FileText, MapPin, Trash2, Pencil, MessageSquare, Maximize2, X, ArrowUp, ArrowDown, ArrowUpDown, GitCommitHorizontal, CreditCard, Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '@/lib/AuthContext';
import { databaseClients } from '@/api/databaseClient';
import { currentUser as currentUserClient } from '@/api/currentUser';
import { useAllUsers } from '@/hooks/useAllUsers';
import { cn } from "@/lib/utils";
import ColumnVisibilityPicker, { DEFAULT_COLUMNS, SITE_DEFAULT_COLUMNS } from './ColumnVisibilityPicker';
import ClaimTimeline from '@/components/claims/ClaimTimeline';
import MiniTimeline from '@/components/claims/MiniTimeline';
import { createPageUrl } from '@/utils';
import { useRouter } from 'next/router';

const statusConfig = {
  in_progress: { label: "In Progress", className: "bg-blue-50 border-blue-200", style: { color: '#222b57' } },
  awaiting_review: { label: "Awaiting Review", className: "bg-amber-50 border-amber-200 text-amber-700" },
  completed: { label: "Claimed", className: "bg-teal-50 border-teal-200", style: { color: '#56C4B7' } },
  rejected: { label: "Queried", className: "bg-red-100 text-red-700 border-red-200" },
  claimed_info_requested: { label: "Queried", className: "bg-purple-50 border-purple-200 text-purple-700" },
  claimed_info_received: { label: "Awaiting Review", className: "bg-orange-50 border-orange-200 text-orange-700" },
  withdrawn: { label: "Withdrawn", className: "bg-orange-50 border-orange-200 text-orange-700" ,}
};

export default function ClaimsTable({ claims, onStatusChange, onClaimedChange, onAlertChange, onResolutionChange, onDelete, deletingClaimId, onEdit, onViewHistory, onCreditOptions, onViewNotes, isLoading }) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);
  const [mounted, setMounted] = useState(false);
  const [timelineClaim, setTimelineClaim] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [roleDefaultApplied, setRoleDefaultApplied] = useState(false);

  const router = useRouter();

    const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => currentUserClient.me(),
    staleTime: 30000,
  });

  const { data: alerts = [] } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => databaseClients.Alert.get()
  });

  const { data: resolutions = [] } = useQuery({
    queryKey: ['resolutions'],
    queryFn: () => databaseClients.AlertResolution.get()
  });

  const { data: brands = [], isLoading: brandsLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const data = await databaseClients.Brand.get();
      const sorted = data.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      return sorted;
    }
  });

  const { data: allSites = [] } = useQuery({
    queryKey: ['allSites'],
    queryFn: () => databaseClients.Site.get()
  });

  const { data: allUsers = [] } = useAllUsers();

  const userRole = currentUser?.custom_role || currentUser?.role;
  const isAdminRole = ['Group Manager', 'Owner'].includes(userRole);
  const userSite = currentUser?.default_site;

  const { data: allMessages = [] } = useQuery({
    queryKey: ['messages-unread', currentUser?.email],
    queryFn: () => databaseClients.Message.list('-created_date', 200),
    enabled: !!currentUser?.email,
    refetchInterval: 30000
  });

  // Build set of claim IDs that have unread messages (shared read state)
  const unreadClaimIds = useMemo(() => {
    if (!currentUser?.email) return new Set();
    const claimIds = new Set();
    allMessages.forEach(m => {
      if (m.sender_email === currentUser.email) return;
      if (!isAdminRole && m.target_site !== userSite) return;
      if (!m.read) {
        claimIds.add(m.claim_id);
      }
    });
    return claimIds;
  }, [allMessages, currentUser, isAdminRole, userSite]);

  const { data: approvalMessages = [] } = useQuery({
    queryKey: ['approvalMessages-unread', currentUser?.email],
    queryFn: () => databaseClients.ApprovalMessage.list('-created_date', 200),
    enabled: !!currentUser?.email,
    refetchInterval: 30000
  });

  const unreadApprovalClaimIds = useMemo(() => {
    if (!!currentUser?.email) return new Set();
    const claimIds = new Set();
    approvalMessages.forEach(m => {
      if (!m.read) claimIds.add(m.claim_id);
    });
    return claimIds;
  }, [approvalMessages, currentUser]);

  const toggleRow = (id) => setExpandedRows(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const [expandedRowsFs, setExpandedRowsFs] = useState(new Set());
  const toggleRowFs = (id) => setExpandedRowsFs(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const handleSort = (key) => {
    setSortConfig(prev =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const QUERIED_STATUSES = ['rejected', 'claimed_info_requested'];

  const sortedClaims = React.useMemo(() => {
    const isSiteRole = currentUser?.custom_role === 'Location' || currentUser?.role === 'Location';

    const baseList = (isSiteRole && !sortConfig.key) ? [...claims].sort((a, b) => {
      const aQueried = QUERIED_STATUSES.includes(a.status) ? 0 : 1;
      const bQueried = QUERIED_STATUSES.includes(b.status) ? 0 : 1;
      return aQueried - bQueried
    })
    : claims;

    if (!sortConfig.key) return baseList;
    return [...claims].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [claims, sortConfig, currentUser]);

  useEffect(() => {
    const saved = localStorage.getItem('claimsTableColumns');
    if (saved) {
      try {
        setVisibleColumns(JSON.parse(saved));
      } catch {
        setVisibleColumns(DEFAULT_COLUMNS);
      }
    }
    setMounted(true);
  }, []);

  const handleColumnsChange = (newColumns) => {
    setVisibleColumns(newColumns);
    localStorage.setItem('claimsTableColumns', JSON.stringify(newColumns));
  };

  const col = (key) => visibleColumns[key];

  // Apply role-specific default columns once user loads (only if no saved preference)
  useEffect(() => {
    if (!currentUser || roleDefaultApplied) return;
    setRoleDefaultApplied(true);
    const saved = localStorage.getItem('claimsTableColumns');
    if (saved) return; // user has a saved preference, don't override
    const role = currentUser.custom_role || currentUser.role;
    if (role === 'Location') {
      setVisibleColumns(SITE_DEFAULT_COLUMNS);
    }
  }, [currentUser, roleDefaultApplied])

  const isProcessor = currentUser?.custom_role === 'Location' || currentUser?.role === 'Location';
  const isManager = ['Group Manager', 'Owner'].some(role => [currentUser?.custom_role, currentUser?.role].includes(role));

  const SortableHead = ({ colKey, children }) => {
    const active = sortConfig.key === colKey;
    return (
      <TableHead
        className="font-semibold text-slate-600 cursor-pointer select-none hover:bg-slate-100 transition-colors"
        onClick={() => handleSort(colKey)}
      >
        <div className="flex items-center gap-1">
          {children}
          {active ? (
            sortConfig.direction === 'asc' ? <ArrowUp className="h-3 w-3 text-slate-500" /> : <ArrowDown className="h-3 w-3 text-slate-500" />
          ) : (
            <ArrowUpDown className="h-3 w-3 text-slate-300" />
          )}
        </div>
      </TableHead>
    );
  };

  const getUserName = (email) => {
    if (!email) return "—";
    // Try from allUsers list (admins can see all users)
    const user = allUsers.find(u => u.email === email);
    if (user) {
      if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
      if (user.first_name) return user.first_name;
      if (user.full_name) return user.full_name;
    }
    // Fallback: if it matches currentUser, use their own data (check both top-level and nested data object)
    if (currentUser && currentUser.email === email) {
      const fn = currentUser.first_name || currentUser.data?.first_name;
      const ln = currentUser.last_name || currentUser.data?.last_name;
      if (fn && ln) return `${fn} ${ln}`;
      if (fn) return fn;
      if (currentUser.full_name) return currentUser.full_name;
    }
    return email;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "—";
    return format(new Date(dateString), "dd/MM/yyyy HH:mm");
  };

  const getStatusDays = (claim) => {
    const trackStatuses = [...QUERIED_STATUSES, 'awaiting_review', 'claimed_info_received'];
    if (!trackStatuses.includes(claim.status)) return null;
    const since = claim.updated_date || claim.created_date;
    if (!since) return null;
    return Math.floor((new Date() - new Date(since)) / (1000 * 60 * 60 * 24));
  };

  const StatusBadge = ({ claim }) => {
    const days = getStatusDays(claim);
    return (
      <div className="flex items-center gap-1.5">
        <Badge
          variant="outline"
          className={`${statusConfig[claim.status]?.className} border font-medium whitespace-nowrap min-w-[120px] justify-center`}
          style={statusConfig[claim.status]?.style}
        >
          {statusConfig[claim.status]?.label}
          {days !== null && (
            <span className="ml-1 opacity-75">· {days}d</span>
          )}
        </Badge>
        {claim.site_responded && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-amber-400 text-white text-[9px] font-bold cursor-default flex-shrink-0">!</span>
              </TooltipTrigger>
              <TooltipContent className="text-xs">Note has been added to this claim</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-0 shadow-xl bg-white">
         <CardHeader className="border-b border-slate-100 pb-4">
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                 <FileText className="h-5 w-5 text-slate-600" />
               </div>
               <div>
                 <CardTitle className="text-xl font-semibold text-slate-800">
                   All Warranty Repairs
                 </CardTitle>
                 <p className="text-sm text-slate-500 mt-0.5">
                   {claims.length} total repairs
                 </p>
               </div>
             </div>
             <div className="flex items-center gap-2">
               <ColumnVisibilityPicker visibleColumns={mounted ? visibleColumns : DEFAULT_COLUMNS} onColumnsChange={handleColumnsChange} userRole={currentUser?.custom_role || currentUser?.role} />
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={() => setFullscreenOpen(true)}
                 className="h-9 w-9 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                 title="Fullscreen view"
               >
                 <Maximize2 className="h-5 w-5" />
               </Button>
             </div>
           </div>
         </CardHeader>
        <CardContent className="p-0">
          {(isLoading || brandsLoading) ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : claims.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No repairs yet</p>
              <p className="text-sm text-slate-400 mt-1">Submit your first warranty repair to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                   <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                      {col('wip_number') && <SortableHead colKey="wip_number">WIP Number</SortableHead>}
                      {col('invoice_number') && <SortableHead colKey="invoice_number">Invoice #</SortableHead>}
                      {col('claim_number') && <SortableHead colKey="claim_number">Claim #</SortableHead>}
                      {col('site') && <SortableHead colKey="site">Site</SortableHead>}
                      {col('brand') && <SortableHead colKey="brand">Brand</SortableHead>}
                      {col('expected_hours') && <SortableHead colKey="expected_hours">Expected Hours</SortableHead>}
                      {col('actual_hours') && <SortableHead colKey="actual_hours">Actual Hours</SortableHead>}
                      {col('parts') && <SortableHead colKey="parts">Parts</SortableHead>}
                      {col('labour') && <SortableHead colKey="labour">Labour</SortableHead>}
                      {col('sub_con') && <SortableHead colKey="sub_con">Sub Con</SortableHead>}
                      {col('credit') && <SortableHead colKey="credit">Credit</SortableHead>}
                      {col('total_claim_cost') && <SortableHead colKey="total_claim_cost">Total</SortableHead>}
                      {col('last_clocking_date') && <SortableHead colKey="last_clocking_date">Last Clocking</SortableHead>}
                      {col('scanned_date') && <SortableHead colKey="scanned_date">Scanned Date</SortableHead>}
                      {col('manufacturer_deadline') && <SortableHead colKey="manufacturer_deadline">Mfr Deadline</SortableHead>}
                      {col('status') && <SortableHead colKey="status">Status</SortableHead>}
                      {col('approval_status') && <SortableHead colKey="approval_status">Approval Status</SortableHead>}
                      {col('claimed_date') && <SortableHead colKey="claimed_date">Claimed Date</SortableHead>}
                      {col('claimed_by') && <SortableHead colKey="claimed_by">Claimed By</SortableHead>}
                      {col('is_campaign') && <TableHead className="font-semibold text-slate-600">Campaign</TableHead>}
                      <TableHead className="font-semibold text-slate-600 min-w-[200px]">Actions</TableHead>
                      </TableRow>
                 </TableHeader>
                <TableBody>
                  {sortedClaims.map((claim, index) => (
                    <React.Fragment key={claim.id}>
                    <motion.tr
                      key={claim.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                      onClick={() => toggleRow(claim.id)}
                    >
                      {col('wip_number') && (
                        <TableCell className="font-medium text-slate-800">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-slate-300 transition-transform duration-150 ${expandedRows.has(claim.id) ? 'rotate-90' : ''}`}>›</span>
                            {claim.wip_number}
                          </div>
                        </TableCell>
                      )}
                      {col('invoice_number') && (
                        <TableCell className="text-slate-600">
                          {claim.invoice_number || "—"}
                        </TableCell>
                      )}
                      {col('claim_number') && (
                        <TableCell className="text-slate-600">
                          {claim.claim_number || "—"}
                        </TableCell>
                      )}
                      {col('site') && (
                        <TableCell>
                          <div className="flex items-center gap-2 text-slate-600">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            {allSites.find(site => site.id === claim.site)?.name}
                          </div>
                        </TableCell>
                      )}
                      {col('brand') && (
                        <TableCell className="text-slate-600">
                          {brands.find(b => b.id === claim.brand)?.name || "—"}
                        </TableCell>
                      )}
                      {col('expected_hours') && (
                        <TableCell>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Clock className="h-4 w-4 text-slate-400" />
                            {claim.expected_hours}h
                          </div>
                        </TableCell>
                      )}
                      {col('actual_hours') && (
                        <TableCell className={cn("text-slate-600", claim.actual_hours && claim.expected_hours && claim.actual_hours > claim.expected_hours ? "text-green-600 rounded px-2" : claim.actual_hours && claim.expected_hours && claim.actual_hours < claim.expected_hours ? "text-red-600 rounded px-2" : "")}>
                          {claim.actual_hours ? `${claim.actual_hours.toFixed(2)}h` : "—"}
                        </TableCell>
                      )}
                      {col('parts') && (
                        <TableCell className="text-slate-600">
                           {claim.parts ? `£${claim.parts.toFixed(2)}` : "—"}
                        </TableCell>
                      )}
                      {col('labour') && (
                        <TableCell className="text-slate-600">
                          {claim.labour ? `£${claim.labour.toFixed(2)}` : "—"}
                        </TableCell>
                      )}
                      {col('sub_con') && (
                        <TableCell className="text-slate-600">
                          {claim.sub_con ? `£${claim.sub_con.toFixed(2)}` : "—"}
                        </TableCell>
                      )}
                      {col('credit') && (
                        <TableCell className="text-slate-600">
                          {claim.credit && claim.approval_status === 'credited' ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="underline decoration-dotted cursor-help">£{claim.credit.toFixed(2)}</span>
                                </TooltipTrigger>
                                <TooltipContent className="text-xs space-y-1">
                                  {claim.credit_parts > 0 && <div>Parts: £{claim.credit_parts.toFixed(2)}</div>}
                                  {claim.credit_labour > 0 && <div>Labour: £{claim.credit_labour.toFixed(2)}</div>}
                                  {claim.credit_sub_con > 0 && <div>Sub Con: £{claim.credit_sub_con.toFixed(2)}</div>}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : "—"}
                        </TableCell>
                      )}
                      {col('total_claim_cost') && (
                        <TableCell className="text-slate-600 font-medium">
                          {claim.total_claim_cost ? `£${claim.total_claim_cost.toFixed(2)}` : "—"}
                        </TableCell>
                      )}
                      {col('last_clocking_date') && (
                        <TableCell className="text-slate-600">
                          {formatDate(claim.last_clocking_date)}
                        </TableCell>
                      )}
                      {col('scanned_date') && (
                        <TableCell className="text-slate-600">
                          {formatDateTime(claim.scanned_date)}
                        </TableCell>
                      )}
                      {col('manufacturer_deadline') && (
                      <TableCell>
                        {claim.manufacturer_deadline ? (() => {
                          const brand = brands.find(b => b.id === claim.brand);
                          const daysRemaining = Math.ceil((new Date(claim.manufacturer_deadline) - new Date()) / (1000 * 60 * 60 * 24));

                          let bgColor = 'bg-slate-100';
                          let textColor = 'text-slate-700';

                          if (brand) {
                            // Always red if below 1 day
                            if (daysRemaining < 1) {
                              bgColor = 'bg-red-100';
                              textColor = 'text-red-700';
                            }
                            // Always green if above max threshold
                            else if (brand.green_max_days != null && daysRemaining > brand.green_max_days) {
                              bgColor = 'bg-green-100';
                              textColor = 'text-green-700';
                            }
                            // Use range logic for values in between
                            else {
                              const inGreenRange = brand.green_min_days != null && brand.green_max_days != null && 
                                daysRemaining >= brand.green_min_days && daysRemaining <= brand.green_max_days;
                              const inAmberRange = brand.amber_min_days != null && brand.amber_max_days != null && 
                                daysRemaining >= brand.amber_min_days && daysRemaining <= brand.amber_max_days;
                              const inRedRange = brand.red_min_days != null && brand.red_max_days != null && 
                                daysRemaining >= brand.red_min_days && daysRemaining <= brand.red_max_days;
                              
                              if (inGreenRange) {
                                bgColor = 'bg-green-100';
                                textColor = 'text-green-700';
                              } else if (inAmberRange) {
                                bgColor = 'bg-amber-100';
                                textColor = 'text-amber-700';
                              } else if (inRedRange) {
                                bgColor = 'bg-red-100';
                                textColor = 'text-red-700';
                              }
                            }
                          }

                          return (
                            <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-md", bgColor, textColor)}>
                              <span className="font-medium">{formatDate(claim.manufacturer_deadline)}</span>
                              <span className="text-xs">({daysRemaining}d)</span>
                            </div>
                          );
                        })() : "—"}
                        </TableCell>
                        )}
                        {col('status') && (
                        <TableCell>
                          <StatusBadge claim={claim} />
                        </TableCell>
                        )}

                             {col('approval_status') && (
                             <TableCell>
                        {claim.approval_status ? (
                          <Badge variant="outline" className={`text-xs border font-medium ${
                            claim.approval_status === 'approved' ? 'bg-green-50 border-green-200 text-green-700' :
                            claim.approval_status === 'rejected' ? 'bg-red-50 border-red-200 text-red-700' :
                            claim.approval_status === 'credited' ? 'bg-teal-50 border-teal-200 text-teal-700' :
                            'bg-amber-50 border-amber-200 text-amber-700'
                          }`}>
                            {claim.approval_status === 'pending_approval' && 'Pending'}
                            {claim.approval_status === 'approved' && 'Approved'}
                            {claim.approval_status === 'rejected' && 'Rejected'}
                            {claim.approval_status === 'credited' && 'Credited'}
                          </Badge>
                        ) : (
                          <span className="text-sm text-slate-400">—</span>
                        )}
                        </TableCell>
                        )}

                            {col('claimed_date') && (
                            <TableCell className="text-slate-600">
                            {claim.claimed_date ? formatDateTime(claim.claimed_date) : "—"}
                            </TableCell>
                            )}
                            {col('claimed_by') && !isProcessor && (
                            <TableCell className="text-slate-600">
                            {claim.claimed_by ? getUserName(claim.claimed_by) : "—"}
                            </TableCell>
                            )}
                           {col('is_campaign') && (
                            <TableCell className="text-slate-600">
                              {claim.is_campaign
                              ? <span className="font-medium" style={{ color: 'var(--hendy-blue)' }}>Yes</span>
                              : <span className="text-slate-400">No</span>
                              }
                            </TableCell>
                           )}
                      <TableCell onClick={(e) => e.stopPropagation()} className="whitespace-nowrap">
                         <div className="flex items-center gap-1">
                           {!isProcessor && (
                             <Button
                               variant="ghost"
                               size="icon"
                               onClick={() => onEdit(claim)}
                               className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                               title="Claim"
                             >
                               <Pencil className="h-4 w-4" />
                             </Button>
                           )}
                           {!isProcessor && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onCreditOptions(claim)}
                              className="h-8 w-8 text-slate-400 hover:text-green-600 hover:bg-green-50 relative"
                              title="Credit"
                            >
                              <CreditCard className="h-4 w-4" />
                              {unreadApprovalClaimIds.has(claim.id) && 
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--hendy-teal)' }}
                              />}
                            </Button>
                           )}
                           
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => onViewNotes(claim)}
                             className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                             title="Message Centre"
                           >
                             <MessageSquare className="h-4 w-4" />
                           </Button>
                           
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTimelineClaim(claim)}
                            className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                            title="View timeline"
                          >
                            <GitCommitHorizontal className="h-4 w-4" />
                          </Button>

                          {isManager && (
                            <Button
                              variant="ghosst"
                              size="icon"
                              onClick={() => onDelete(claim.id)}
                              disabled={deletingClaimId === claim.id}
                              className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                              title="Delete claim"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                          
                          {unreadClaimIds.has(claim.id) && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                              <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-teal-50"
                                  style={{ color: 'var(--hendy-teal)' }}
                                  onClick={() => router.push(`${createPageUrl('Messages')}?wip=${encodeURIComponent(claim.wip_number)}`)}
                                >
                                  <Mail className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                                <TooltipContent className="text-xs">Unread message - click to view</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          </div>
                          </TableCell>
                          </motion.tr>
                          {expandedRows.has(claim.id) && (
                            <MiniTimeline
                              claimId={claim.id}
                              colSpan={Object.values(visibleColumns).filter(Boolean).length + 1}
                            />
                          )}
                          </React.Fragment>
                          ))}
                          </TableBody>
                          </Table>
            </div>
          )}
        </CardContent>
        </Card>

        {/* Fullscreen Modal */}
        <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
         <DialogContent className="max-w-full h-screen p-0 bg-white overflow-auto" onInteractOutside={(e) => e.preventDefault()}>
           <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
             <h2 className="text-2xl font-bold text-slate-800">All Warranty Repairs</h2>
             <Button
               variant="outline"
               size="sm"
               onClick={() => setFullscreenOpen(false)}
               className="flex items-center gap-2 text-slate-600"
             >
               <X className="h-4 w-4" />
               Exit Fullscreen
             </Button>
           </div>
           <div className="p-6">
             {(isLoading || brandsLoading) ? (
               <div className="flex items-center justify-center py-16">
                 <div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
               </div>
             ) : claims.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-16 text-center">
                 <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                   <FileText className="h-8 w-8 text-slate-400" />
                 </div>
                 <p className="text-slate-600 font-medium">No repairs yet</p>
                 </div>
             ) : (
               <div className="overflow-x-auto">
                 <Table>
                   <TableHeader>
                     <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                       {col('wip_number') && <TableHead className="font-semibold text-slate-600">WIP Number</TableHead>}
                       {col('invoice_number') && <TableHead className="font-semibold text-slate-600">Invoice #</TableHead>}
                       {col('claim_number') && <TableHead className="font-semibold text-slate-600">Claim #</TableHead>}
                       {col('site') && <TableHead className="font-semibold text-slate-600">Site</TableHead>}
                       {col('brand') && <TableHead className="font-semibold text-slate-600">Brand</TableHead>}
                       {col('expected_hours') && <TableHead className="font-semibold text-slate-600">Expected Hours</TableHead>}
                       {col('actual_hours') && <TableHead className="font-semibold text-slate-600">Actual Hours</TableHead>}
                       {col('parts') && <TableHead className="font-semibold text-slate-600">Parts</TableHead>}
                       {col('labour') && <TableHead className="font-semibold text-slate-600">Labour</TableHead>}
                       {col('sub_con') && <TableHead className="font-semibold text-slate-600">Sub Con</TableHead>}
                       {col('credit') && <TableHead className="font-semibold text-slate-600">Credit</TableHead>}
                       {col('total_claim_cost') && <TableHead className="font-semibold text-slate-600">Total</TableHead>}
                       {col('last_clocking_date') && <TableHead className="font-semibold text-slate-600">Last Clocking</TableHead>}
                       {col('scanned_date') && <TableHead className="font-semibold text-slate-600">Scanned Date</TableHead>}
                       {col('manufacturer_deadline') && <TableHead className="font-semibold text-slate-600">Mfr Deadline</TableHead>}
                       {col('status') && <TableHead className="font-semibold text-slate-600">Status</TableHead>}
                       {col('approval_status') && <TableHead className="font-semibold text-slate-600">Approval Status</TableHead>}
                       {col('claimed_date') && <TableHead className="font-semibold text-slate-600">Claimed Date</TableHead>}
                       {col('claimed_by') && !isProcessor && <TableHead className="font-semibold text-slate-600">Claimed By</TableHead>}
                       {col('is_campaign') && <TableHead className="font-semibold text-slate-600">Campaign</TableHead>}
                       <TableHead className="font-semibold text-slate-600 min-w-[200px]">Actions</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {sortedClaims.map((claim, index) => (
                       <React.Fragment key={claim.id}>
                       <motion.tr
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: index * 0.05 }}
                         className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                         onClick={() => toggleRowFs(claim.id)}
                       >
                         {col('wip_number') && (
                           <TableCell className="font-medium text-slate-800">
                             <div className="flex items-center gap-1.5">
                               <span className={`text-slate-300 transition-transform duration-150 ${expandedRowsFs.has(claim.id) ? 'rotate-90' : ''}`}>›</span>
                                {claim.wip_number}
                              </div>
                            </TableCell>
                          )}
                         {col('invoice_number') && (
                           <TableCell className="text-slate-600">
                             {claim.invoice_number || "—"}
                           </TableCell>
                         )}
                         {col('claim_number') && (
                           <TableCell className="text-slate-600">
                             {claim.claim_number || "—"}
                           </TableCell>
                         )}
                         {col('site') && (
                           <TableCell>
                             <div className="flex items-center gap-2 text-slate-600">
                               <MapPin className="h-4 w-4 text-slate-400" />
                               {claim.site}
                             </div>
                           </TableCell>
                         )}
                         {col('brand') && (
                           <TableCell className="text-slate-600">
                             {brands.find(b => b.id === claim.brand)?.name || "—"}
                           </TableCell>
                         )}
                         {col('expected_hours') && (
                           <TableCell>
                             <div className="flex items-center gap-2 text-slate-600">
                               <Clock className="h-4 w-4 text-slate-400" />
                               {claim.expected_hours}h
                             </div>
                           </TableCell>
                         )}
                         {col('actual_hours') && (
                          <TableCell className={cn("text-slate-600", claim.actual_hours && claim.expected_hours && claim.actual_hours > claim.expected_hours ? "bg-green-100 text-green-700 rounded px-2" : claim.actual_hours && claim.expected_hours && claim.actual_hours < claim.expected_hours ? "bg-red-100 text-red-700 rounded px-2" : "")}>
                            {claim.actual_hours ? `${claim.actual_hours.toFixed(2)}h` : "—"}
                          </TableCell>
                         )}
                         {col('parts') && (
                           <TableCell className="text-slate-600">
                             {claim.parts ? `£${claim.parts.toFixed(2)}` : "—"}
                           </TableCell>
                         )}
                         {col('labour') && (
                           <TableCell className="text-slate-600">
                             {claim.labour ? `£${claim.labour.toFixed(2)}` : "—"}
                           </TableCell>
                         )}
                         {col('sub_con') && (
                           <TableCell className="text-slate-600">
                             {claim.sub_con ? `£${claim.sub_con.toFixed(2)}` : "—"}
                           </TableCell>
                         )}
                         {col('credit') && (
                           <TableCell className="text-slate-600">
                            {claim.credit && claim.approval_status === 'credited' ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="underline decoration-dotted cursor-help">£{claim.credit.toFixed(2)}</span>
                                </TooltipTrigger>
                                <TooltipContent className="text-xs space-y-1">
                                  {claim.credit_parts > 0 && <div>Parts: £{claim.credit_parts.toFixed(2)}</div>}
                                  {claim.credit_labour > 0 && <div>Labour: £{claim.credit_labour.toFixed(2)}</div>}
                                  {claim.credit_sub_con > 0 && <div>Sub Con: £{claim.credit_sub_con.toFixed(2)}</div>}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : "—"}
                           </TableCell>
                         )}
                         {col('total_claim_cost') && (
                           <TableCell className="text-slate-600 font-medium">
                             {claim.total_claim_cost ? `£${claim.total_claim_cost.toFixed(2)}` : "—"}
                           </TableCell>
                         )}
                         {col('last_clocking_date') && (
                           <TableCell className="text-slate-600">
                             {formatDate(claim.last_clocking_date)}
                           </TableCell>
                         )}
                         {col('scanned_date') && (
                           <TableCell className="text-slate-600">
                             {formatDateTime(claim.scanned_date)}
                           </TableCell>
                         )}
                         {col('manufacturer_deadline') && (
                         <TableCell>
                           {claim.manufacturer_deadline ? (() => {
                             const brand = brands.find(b => b.id === claim.brand);
                             const daysRemaining = Math.ceil((new Date(claim.manufacturer_deadline) - new Date()) / (1000 * 60 * 60 * 24));

                             let bgColor = 'bg-slate-100';
                             let textColor = 'text-slate-700';

                             if (brand) {
                               if (daysRemaining < 1) {
                                 bgColor = 'bg-red-100';
                                 textColor = 'text-red-700';
                               }
                               else if (brand.green_max_days != null && daysRemaining > brand.green_max_days) {
                                 bgColor = 'bg-green-100';
                                 textColor = 'text-green-700';
                               }
                               else {
                                 const inGreenRange = brand.green_min_days != null && brand.green_max_days != null && 
                                   daysRemaining >= brand.green_min_days && daysRemaining <= brand.green_max_days;
                                 const inAmberRange = brand.amber_min_days != null && brand.amber_max_days != null && 
                                   daysRemaining >= brand.amber_min_days && daysRemaining <= brand.amber_max_days;
                                 const inRedRange = brand.red_min_days != null && brand.red_max_days != null && 
                                   daysRemaining >= brand.red_min_days && daysRemaining <= brand.red_max_days;

                                 if (inGreenRange) {
                                   bgColor = 'bg-green-100';
                                   textColor = 'text-green-700';
                                 } else if (inAmberRange) {
                                   bgColor = 'bg-amber-100';
                                   textColor = 'text-amber-700';
                                 } else if (inRedRange) {
                                   bgColor = 'bg-red-100';
                                   textColor = 'text-red-700';
                                 }
                               }
                             }

                             return (
                               <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-md", bgColor, textColor)}>
                                 <span className="font-medium">{formatDate(claim.manufacturer_deadline)}</span>
                                 <span className="text-xs">({daysRemaining}d)</span>
                               </div>
                             );
                           })() : "—"}
                         </TableCell>
                         )}
                         {col('status') && (
                          <TableCell>
                            <StatusBadge claim={claim} />
                          </TableCell>
                         )}
                         {col('approval_status') && (
                                 <TableCell>
                                 {claim.approval_status ? (
                                 <Badge variant="outline" className={`text-xs border font-medium ${
                                   claim.approval_status === 'approved' ? 'bg-green-50 border-green-200 text-green-700' :
                                   claim.approval_status === 'rejected' ? 'bg-red-50 border-red-200 text-red-700' :
                                   claim.approval_status === 'credited' ? 'bg-teal-50 border-teal-200 text-teal-700' :
                                   'bg-amber-50 border-amber-200 text-amber-700'
                                 }`}>
                                 {claim.approval_status === 'pending_approval' && 'Pending'}
                                 {claim.approval_status === 'approved' && 'Approved'}
                                 {claim.approval_status === 'rejected' && 'Rejected'}
                                 {claim.approval_status === 'credited' && 'Credited'}
                                 </Badge>
                                 ) : (
                                 <span className="text-sm text-slate-400">—</span>
                                 )}
                                 </TableCell>
                                 )}
                                 {col('claimed') && (
                                 <TableCell>
                                 {isProcessor ? (
                                 <span className="text-sm text-slate-600">{claim.claimed ? 'Yes' : 'No'}</span>
                                 ) : (
                             <>
                               <Checkbox
                                 checked={claim.claimed || false}
                                 onCheckedChange={(checked) => onClaimedChange(claim.id, checked)}
                                 style={{
                                   '--tw-ring-color': '#56C4B7'
                                 }}
                                 className="data-[state=checked]:border-[#56C4B7]"
                                 data-checked={claim.claimed || false}
                               />
                               <style jsx>{`
                                 [data-checked="true"] {
                                   background-color: #56C4B7 !important;
                                   border-color: #56C4B7 !important;
                                 }
                               `}</style>
                             </>
                           )}
                           </TableCell>
                           )}
                           {col('claimed_date') && (
                           <TableCell className="text-slate-600">
                           {claim.claimed_date ? formatDateTime(claim.claimed_date) : "—"}
                           </TableCell>
                           )}
                           {col('claimed_by') && !isProcessor && (
                           <TableCell className="text-slate-600">
                           {claim.claimed_by ? getUserName(claim.claimed_by) : "—"}
                           </TableCell>
                           )}
                           {col('is_campaign') && (
                            <TableCell className="text-slate-600">
                              {claim.is_campaign
                              ? <span className="font-medium" style={{ color: 'var(--hendy-blue)' }}>Yes</span>
                              : <span className="text-slate-400">No</span>
                              }
                            </TableCell>
                           )}
                         <TableCell onClick={e => e.stopPropagation()} className="whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              {!isProcessor && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => onEdit(claim)}
                                  className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                  title="Claim"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              )}
                              {!isProcessor && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => onCreditOptions(claim)}
                                  className="h-8 w-8 text-slate-400 hover:text-green-600 hover:bg-green-50 relative"
                                  title="Credit"
                                >
                                  <CreditCard className="h-4 w-4" />
                                  {unreadApprovalClaimIds.has(claim.id) && 
                                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--hendy-teal)' }}
                                  />}
                                </Button>
                              )}
                              
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onViewNotes(claim)}
                                className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                                title="Message Centre"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                                
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setTimelineClaim(claim)}
                                  className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                  title="View timeline"
                              >
                                <GitCommitHorizontal className="h-4 w-4" />
                              </Button>

                              {isManager && (
                                <Button
                                  variant="ghosst"
                                  size="icon"
                                  onClick={() => onDelete(claim.id)}
                                  disabled={deletingClaimId === claim.id}
                                  className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                  title="Delete claim"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}

                              {unreadClaimIds.has(claim.id) && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                  <Button
                                     variant="ghost"
                                     size="icon"
                                     className="h-8 w-8 hover:bg-teal-50"
                                     style={{ color: 'var(--hendy-teal)' }}
                                     onClick={() => router.push(`${createPageUrl('Messages')}?wip=${encodeURIComponent(claim.wip_number)}`)}
                                   >
                                     <Mail className="h-4 w-4" />
                                   </Button>
                                </TooltipTrigger>
                                    <TooltipContent className="text-xs">Unread message - click to view</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </TableCell>
                         </motion.tr>
                         {expandedRowsFs.has(claim.id) && (
                           <MiniTimeline
                             claimId={claim.id}
                             colSpan={Object.values(visibleColumns).filter(Boolean).length + 1}
                           />
                         )}
                         </React.Fragment>
                         ))}
                         </TableBody>
                 </Table>
               </div>
             )}
           </div>
         </DialogContent>
        </Dialog>

        {timelineClaim && (
          <ClaimTimeline
            claim={timelineClaim}
            open={!!timelineClaim}
            onClose={() => setTimelineClaim(null)}
          />
        )}
        </motion.div>
        );
        }