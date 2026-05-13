import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, AlertCircle, ArrowUpDown } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';
import { format } from "date-fns";
import { useRouter } from 'next/router';
import { createPageUrl } from '@/utils';

const statusConfig = {
  in_progress: { label: "In Progress", className: "bg-blue-50 border-blue-200", style: { color: '#222b57' } },
  completed: { label: "Completed", className: "bg-teal-50 border-teal-200", style: { color: '#56C4B7' } },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700 border-red-200" }
};

export default function SearchModal({ open, onClose }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('created_date');
  const [sortDirection, setSortDirection] = useState('desc');

  const { data: claims = [], isLoading } = useQuery({
    queryKey: ['claims'],
    queryFn: () => databaseClients.WarrantyClaim.get(),
    enabled: open
  });

  const filteredClaims = useMemo(() => {
    if (!searchQuery.trim()) return claims;

    const query = searchQuery.toLowerCase();
    return claims.filter(claim => {
      const wipMatch = claim.wip_number?.toLowerCase().includes(query);
      const siteMatch = claim.site?.toLowerCase().includes(query);
      const alertMatch = claim.alert?.toLowerCase().includes(query);
      const resolutionMatch = claim.alert_resolution?.toLowerCase().includes(query);
      
      return wipMatch || siteMatch || alertMatch || resolutionMatch;
    });
  }, [claims, searchQuery]);

  const sortedClaims = useMemo(() => {
    const sorted = [...filteredClaims];
    sorted.sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];

      if (sortColumn === 'created_date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredClaims, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleClaimClick = (claim) => {
    router.push(createPageUrl('Dashboard'));
    onClose();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Search Claims</DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by WIP number, site, alert, or resolution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : sortedClaims.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">
                {searchQuery ? 'No claims found' : 'Start typing to search'}
              </p>
              <p className="text-sm text-slate-400 mt-1">
                {searchQuery ? 'Try a different search term' : 'Search by WIP number, site, or alert'}
              </p>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                    <TableHead 
                      className="font-semibold text-slate-600 cursor-pointer"
                      onClick={() => handleSort('wip_number')}
                    >
                      <div className="flex items-center gap-2">
                        WIP Number
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold text-slate-600 cursor-pointer"
                      onClick={() => handleSort('site')}
                    >
                      <div className="flex items-center gap-2">
                        Site
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-slate-600">Status</TableHead>
                    <TableHead className="font-semibold text-slate-600">Alert</TableHead>
                    <TableHead className="font-semibold text-slate-600">Resolution</TableHead>
                    <TableHead 
                      className="font-semibold text-slate-600 cursor-pointer"
                      onClick={() => handleSort('created_date')}
                    >
                      <div className="flex items-center gap-2">
                        Created
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedClaims.map((claim) => (
                    <TableRow 
                      key={claim.id}
                      className="cursor-pointer hover:bg-slate-50/50"
                      onClick={() => handleClaimClick(claim)}
                    >
                      <TableCell className="font-medium text-slate-800">
                        {claim.wip_number}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          {claim.site}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${statusConfig[claim.status]?.className} border font-medium`}
                          style={statusConfig[claim.status]?.style}
                        >
                          {statusConfig[claim.status]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {claim.alert ? (
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <span className="text-sm text-slate-700">{claim.alert}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {claim.alert_resolution || "—"}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {formatDate(claim.created_date)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div className="text-sm text-slate-500 mt-4 pt-4 border-t">
          Showing {sortedClaims.length} of {claims.length} claims
        </div>
      </DialogContent>
    </Dialog>
  );
}