import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Clock, FileText, AlertCircle, MapPin, User, Trash2, Pencil, History, MessageSquare, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '@/lib/AuthContext';
import { databaseClients } from '@/api/databaseClient';
import { cn } from "@/lib/utils";
import ColumnVisibilityPicker, { DEFAULT_COLUMNS } from './ColumnVisibilityPicker';

const statusConfig = {
  in_progress: { label: "In Progress", className: "bg-blue-50 border-blue-200", style: { color: '#222b57' } },
  awaiting_review: { label: "Awaiting Review", className: "bg-amber-50 border-amber-200 text-amber-700" },
  completed: { label: "Claimed", className: "bg-teal-50 border-teal-200", style: { color: '#56C4B7' } },
  rejected: { label: "Queried", className: "bg-red-100 text-red-700 border-red-200" },
};

export default function ClaimsTable({ claims, onStatusChange, onClaimedChange, onAlertChange, onResolutionChange, onDelete, onEdit, onViewHistory, onViewNotes, isLoading }) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);

  useEffect(() => {
    const saved = localStorage.getItem('claimsTableColumns');
    if (saved) {
      try {
        setVisibleColumns(JSON.parse(saved));
      } catch {
        setVisibleColumns(DEFAULT_COLUMNS);
      }
    }
  }, []);

  const handleColumnsChange = (newColumns) => {
    setVisibleColumns(newColumns);
    localStorage.setItem('claimsTableColumns', JSON.stringify(newColumns));
  };

  const col = (key) => visibleColumns[key];

  // const { user: currentUser } = useAuth();
    const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => databaseClients.User.me(),
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

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: () => databaseClients.Brand.get()
  });

  const { data: allUsers = [] } = useQuery({
    queryKey: ['allUsers'],
    queryFn: () => databaseClients.User.get()
  });

  const isProcessor = currentUser?.custom_role === 'Processor' || currentUser?.role === 'Processor';
  const isSiteManager = currentUser?.custom_role === 'Site Manager' || currentUser?.role === 'Site Manager';
  const isServiceManager = currentUser?.custom_role === 'Service Manager' || currentUser?.role === 'Service Manager' || currentUser?.custom_role === 'Owner' || currentUser?.role === 'Owner';

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
                   All Warranty Claims
                 </CardTitle>
                 <p className="text-sm text-slate-500 mt-0.5">
                   {claims.length} total claims
                 </p>
               </div>
             </div>
             <div className="flex items-center gap-2">
               <ColumnVisibilityPicker visibleColumns={visibleColumns} onColumnsChange={handleColumnsChange} />
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
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : claims.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No claims yet</p>
              <p className="text-sm text-slate-400 mt-1">Submit your first warranty claim to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                   <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                      {col('wip_number') && <TableHead className="font-semibold text-slate-600">WIP Number</TableHead>}
                      {col('reg_number') && <TableHead className="font-semibold text-slate-600">Reg No.</TableHead>}
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
                      {col('total_claim_cost') && <TableHead className="font-semibold text-slate-600">Total Cost</TableHead>}
                      {col('last_clocking_date') && <TableHead className="font-semibold text-slate-600">Last Clocking</TableHead>}
                      {col('scanned_date') && <TableHead className="font-semibold text-slate-600">Scanned Date</TableHead>}
                      {col('manufacturer_deadline') && <TableHead className="font-semibold text-slate-600">Mfr Deadline</TableHead>}
                      {col('status') && <TableHead className="font-semibold text-slate-600">Status</TableHead>}
                      {col('approval_status') && <TableHead className="font-semibold text-slate-600">Approval Status</TableHead>}
                      {col('claimed_date') && <TableHead className="font-semibold text-slate-600">Claimed Date</TableHead>}
                      {col('claimed_by') && <TableHead className="font-semibold text-slate-600">Claimed By</TableHead>}
                      {col('alert') && <TableHead className="font-semibold text-slate-600">Alert</TableHead>}
                      {col('resolution') && <TableHead className="font-semibold text-slate-600">Resolution</TableHead>}
                      {col('submitted_by') && <TableHead className="font-semibold text-slate-600">Submitted By</TableHead>}
                      <TableHead className="font-semibold text-slate-600 w-32">Actions</TableHead>
                      </TableRow>
                 </TableHeader>
                <TableBody>
                  {claims.map((claim, index) => (
                    <motion.tr
                      key={claim.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      {col('wip_number') && (
                        <TableCell className="font-medium text-slate-800">
                          {claim.wip_number}
                        </TableCell>
                      )}
                      {col('reg_number') && (
                        <TableCell className="text-slate-600">
                          {claim.reg_number || "—"}
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
                          {claim.brand || "—"}
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
                        <TableCell className="text-slate-600">
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
                          {claim.credit ? `£${claim.credit.toFixed(2)}` : "—"}
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
                          const brand = brands.find(b => b.name === claim.brand);
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
                         <Badge 
                           variant="outline" 
                           className={`${statusConfig[claim.status]?.className} border font-medium`}
                           style={statusConfig[claim.status]?.style}
                         >
                           {statusConfig[claim.status]?.label}
                         </Badge>
                        </TableCell>
                        )}

                             {col('approval_status') && (
                             <TableCell>
                        {claim.approval_status ? (
                          <Badge variant="outline" className={`text-xs border font-medium ${
                            claim.approval_status === 'approved' ? 'bg-green-50 border-green-200 text-green-700' :
                            claim.approval_status === 'rejected' ? 'bg-red-50 border-red-200 text-red-700' :
                            'bg-amber-50 border-amber-200 text-amber-700'
                          }`}>
                            {claim.approval_status === 'pending_approval' && 'Pending'}
                            {claim.approval_status === 'approved' && 'Approved'}
                            {claim.approval_status === 'rejected' && 'Rejected'}
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
                            {col('claimed_by') && (
                            <TableCell className="text-slate-600">
                            {claim.claimed_by ? getUserName(claim.claimed_by) : "—"}
                            </TableCell>
                            )}
                            {col('alert') && (
                            <TableCell>
                            {isProcessor ? (
                            claim.alert ? (
                            <div className="flex items-center gap-2">
                             <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                             <span className="text-sm text-slate-700">{claim.alert}</span>
                            </div>
                            ) : (
                            <span className="text-sm text-slate-400">—</span>
                            )
                            ) : (
                            <Select
                            value={claim.alert || "none"}
                            onValueChange={(value) => onAlertChange(claim.id, value === "none" ? "" : value)}
                            >
                            <SelectTrigger className="w-44 h-8 border-0 bg-transparent p-0 focus:ring-0">
                             {claim.alert ? (
                               <div className="flex items-center gap-2">
                                 <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                                 <span className="text-sm text-slate-700">{claim.alert}</span>
                               </div>
                             ) : (
                               <span className="text-sm text-slate-400">Select alert...</span>
                             )}
                            </SelectTrigger>
                            <SelectContent>
                             <SelectItem value="none">No Alert</SelectItem>
                             {alerts.map((alert) => (
                               <SelectItem key={alert.id} value={alert.name}>
                                 {alert.name}
                               </SelectItem>
                             ))}
                            </SelectContent>
                            </Select>
                            )}
                            </TableCell>
                            )}
                            {col('resolution') && (
                            <TableCell>
                            {isProcessor ? (
                            claim.alert_resolution ? (
                            <span className="text-sm text-slate-700">{claim.alert_resolution}</span>
                            ) : (
                            <span className="text-sm text-slate-400">—</span>
                            )
                            ) : (
                            <Select
                            value={claim.alert_resolution || "none"}
                            onValueChange={(value) => onResolutionChange(claim.id, value === "none" ? "" : value)}
                            >
                            <SelectTrigger className="w-44 h-8 border-0 bg-transparent p-0 focus:ring-0">
                             {claim.alert_resolution ? (
                               <span className="text-sm text-slate-700">{claim.alert_resolution}</span>
                             ) : (
                               <span className="text-sm text-slate-400">Select resolution...</span>
                             )}
                            </SelectTrigger>
                            <SelectContent>
                             <SelectItem value="none">No Resolution</SelectItem>
                             {resolutions.map((resolution) => (
                               <SelectItem key={resolution.id} value={resolution.name}>
                                 {resolution.name}
                               </SelectItem>
                             ))}
                            </SelectContent>
                            </Select>
                            )}
                            </TableCell>
                            )}
                            {col('submitted_by') && (
                            <TableCell>
                        <div className="flex items-center gap-2 text-slate-600">
                          <User className="h-4 w-4 text-slate-400" />
                          <div className="flex flex-col">
                            <span className="text-sm">{getUserName(claim.submitted_for || claim.created_by)}</span>
                            <span className="text-xs text-slate-400">{formatDate(claim.created_date)}</span>
                          </div>
                        </div>
                      </TableCell>
                      )}
                      <TableCell>
                         <div className="flex items-center gap-1">
                           {!isProcessor && !isSiteManager && (
                             <Button
                               variant="ghost"
                               size="icon"
                               onClick={() => onEdit(claim)}
                               className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                               title="Edit claim"
                             >
                               <Pencil className="h-4 w-4" />
                             </Button>
                           )}
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => onViewNotes(claim)}
                             className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                             title="View notes"
                           >
                             <MessageSquare className="h-4 w-4" />
                           </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onViewHistory(claim)}
                            className="h-8 w-8 text-slate-400 hover:text-purple-600 hover:bg-purple-50"
                            title="View history"
                          >
                            <History className="h-4 w-4" />
                          </Button>
                          {isServiceManager && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this claim?')) {
                                  onDelete(claim.id);
                                }
                              }}
                              className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                              title="Delete claim"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                          </div>
                          </TableCell>
                          </motion.tr>
                          ))}
                          </TableBody>
                          </Table>
            </div>
          )}
        </CardContent>
        </Card>

        {/* Fullscreen Modal */}
        <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
         <DialogContent className="max-w-full h-screen p-0 bg-white overflow-auto">
           <DialogHeader className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4">
             <div className="flex items-center justify-between">
               <DialogTitle className="text-2xl font-bold text-slate-800">
                 All Warranty Claims
               </DialogTitle>
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={() => setFullscreenOpen(false)}
                 className="h-8 w-8 text-slate-400 hover:text-slate-600"
               >
                 <X className="h-5 w-5" />
               </Button>
             </div>
           </DialogHeader>
           <div className="p-6">
             {isLoading ? (
               <div className="flex items-center justify-center py-16">
                 <div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
               </div>
             ) : claims.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-16 text-center">
                 <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                   <FileText className="h-8 w-8 text-slate-400" />
                 </div>
                 <p className="text-slate-600 font-medium">No claims yet</p>
               </div>
             ) : (
               <div className="overflow-x-auto">
                 <Table>
                   <TableHeader>
                     <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                       {col('wip_number') && <TableHead className="font-semibold text-slate-600">WIP Number</TableHead>}
                       {col('reg_number') && <TableHead className="font-semibold text-slate-600">Reg No.</TableHead>}
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
                       {col('total_claim_cost') && <TableHead className="font-semibold text-slate-600">Total Cost</TableHead>}
                       {col('last_clocking_date') && <TableHead className="font-semibold text-slate-600">Last Clocking</TableHead>}
                       {col('scanned_date') && <TableHead className="font-semibold text-slate-600">Scanned Date</TableHead>}
                       {col('manufacturer_deadline') && <TableHead className="font-semibold text-slate-600">Mfr Deadline</TableHead>}
                       {col('status') && <TableHead className="font-semibold text-slate-600">Status</TableHead>}
                       {col('approval_status') && <TableHead className="font-semibold text-slate-600">Approval Status</TableHead>}
                       {col('claimed_date') && <TableHead className="font-semibold text-slate-600">Claimed Date</TableHead>}
                       {col('claimed_by') && <TableHead className="font-semibold text-slate-600">Claimed By</TableHead>}
                       {col('alert') && <TableHead className="font-semibold text-slate-600">Alert</TableHead>}
                       {col('resolution') && <TableHead className="font-semibold text-slate-600">Resolution</TableHead>}
                       {col('submitted_by') && <TableHead className="font-semibold text-slate-600">Submitted By</TableHead>}
                       <TableHead className="font-semibold text-slate-600 w-32">Actions</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {claims.map((claim, index) => (
                       <motion.tr
                         key={claim.id}
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: index * 0.05 }}
                         className="group hover:bg-slate-50/50 transition-colors"
                       >
                         {col('wip_number') && (
                           <TableCell className="font-medium text-slate-800">
                             {claim.wip_number}
                           </TableCell>
                         )}
                         {col('reg_number') && (
                           <TableCell className="text-slate-600">
                             {claim.reg_number || "—"}
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
                             {claim.brand || "—"}
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
                           <TableCell className="text-slate-600">
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
                             {claim.credit ? `£${claim.credit.toFixed(2)}` : "—"}
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
                             const brand = brands.find(b => b.name === claim.brand);
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
                           <Badge 
                             variant="outline" 
                             className={`${statusConfig[claim.status]?.className} border font-medium`}
                             style={statusConfig[claim.status]?.style}
                           >
                             {statusConfig[claim.status]?.label}
                           </Badge>
                         </TableCell>
                         )}
                         {col('approval_status') && (
                                 <TableCell>
                                 {claim.approval_status ? (
                                 <Badge variant="outline" className={`text-xs border font-medium ${
                                   claim.approval_status === 'approved' ? 'bg-green-50 border-green-200 text-green-700' :
                                   claim.approval_status === 'rejected' ? 'bg-red-50 border-red-200 text-red-700' :
                                   'bg-amber-50 border-amber-200 text-amber-700'
                                 }`}>
                                 {claim.approval_status === 'pending_approval' && 'Pending'}
                                 {claim.approval_status === 'approved' && 'Approved'}
                                 {claim.approval_status === 'rejected' && 'Rejected'}
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
                           {col('claimed_by') && (
                           <TableCell className="text-slate-600">
                           {claim.claimed_by ? getUserName(claim.claimed_by) : "—"}
                           </TableCell>
                           )}
                         {col('alert') && (
                         <TableCell>
                           {isProcessor ? (
                             claim.alert ? (
                               <div className="flex items-center gap-2">
                                 <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                                 <span className="text-sm text-slate-700">{claim.alert}</span>
                               </div>
                             ) : (
                               <span className="text-sm text-slate-400">—</span>
                             )
                           ) : (
                             <Select
                               value={claim.alert || "none"}
                               onValueChange={(value) => onAlertChange(claim.id, value === "none" ? "" : value)}
                             >
                               <SelectTrigger className="w-44 h-8 border-0 bg-transparent p-0 focus:ring-0">
                                 {claim.alert ? (
                                   <div className="flex items-center gap-2">
                                     <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                                     <span className="text-sm text-slate-700">{claim.alert}</span>
                                   </div>
                                 ) : (
                                   <span className="text-sm text-slate-400">Select alert...</span>
                                 )}
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="none">No Alert</SelectItem>
                                 {alerts.map((alert) => (
                                   <SelectItem key={alert.id} value={alert.name}>
                                     {alert.name}
                                   </SelectItem>
                                 ))}
                               </SelectContent>
                             </Select>
                           )}
                         </TableCell>
                         )}
                         {col('resolution') && (
                         <TableCell>
                           {isProcessor ? (
                             claim.alert_resolution ? (
                               <span className="text-sm text-slate-700">{claim.alert_resolution}</span>
                             ) : (
                               <span className="text-sm text-slate-400">—</span>
                             )
                           ) : (
                             <Select
                               value={claim.alert_resolution || "none"}
                               onValueChange={(value) => onResolutionChange(claim.id, value === "none" ? "" : value)}
                             >
                               <SelectTrigger className="w-44 h-8 border-0 bg-transparent p-0 focus:ring-0">
                                 {claim.alert_resolution ? (
                                   <span className="text-sm text-slate-700">{claim.alert_resolution}</span>
                                 ) : (
                                   <span className="text-sm text-slate-400">Select resolution...</span>
                                 )}
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="none">No Resolution</SelectItem>
                                 {resolutions.map((resolution) => (
                                   <SelectItem key={resolution.id} value={resolution.name}>
                                     {resolution.name}
                                   </SelectItem>
                                 ))}
                               </SelectContent>
                             </Select>
                           )}
                         </TableCell>
                         )}
                         {col('submitted_by') && (
                         <TableCell>
                           <div className="flex items-center gap-2 text-slate-600">
                             <User className="h-4 w-4 text-slate-400" />
                             <div className="flex flex-col">
                               <span className="text-sm">{getUserName(claim.submitted_for || claim.created_by)}</span>
                               <span className="text-xs text-slate-400">{formatDate(claim.created_date)}</span>
                             </div>
                           </div>
                         </TableCell>
                         )}
                         <TableCell>
                            <div className="flex items-center gap-1">
                              {!isProcessor && !isSiteManager && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => onEdit(claim)}
                                  className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                  title="Edit claim"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onViewNotes(claim)}
                                className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                                title="View notes"
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onViewHistory(claim)}
                                className="h-8 w-8 text-slate-400 hover:text-purple-600 hover:bg-purple-50"
                                title="View history"
                              >
                                <History className="h-4 w-4" />
                              </Button>
                              {isServiceManager && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this claim?')) {
                                      onDelete(claim.id);
                                    }
                                  }}
                                  className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                  title="Delete claim"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                       </motion.tr>
                     ))}
                   </TableBody>
                 </Table>
               </div>
             )}
           </div>
         </DialogContent>
        </Dialog>
        </motion.div>
        );
        }