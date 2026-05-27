import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle, Clock, MapPin, User } from "lucide-react";
import { format } from "date-fns";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { base44 } from '@/api/base44Client';
import { databaseClients, getData } from '@/api/databaseClient';

// Redirect if user not logged in
import { auth } from "@/lib/auth"
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await auth.api.getSession({
    headers: new Headers(req.headers as Record<string, string>),
  })

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } }
  }

  // return { props: { user: session.user } }
  return {
    props: {
      user: {
        ...session.user,
        // Ensure dates are serialized properly
        createdAt: session.user.createdAt instanceof Date ? session.user.createdAt.toISOString() : (session.user.createdAt ?? null),
        updatedAt: session.user.updatedAt instanceof Date ? session.user.updatedAt.toISOString() : (session.user.updatedAt ?? null),
        role: session.user.role ?? null,
        banned: session.user.banned ?? null,
        banReason: session.user.banReason ?? null,
        banExpires: session.user.banExpires instanceof Date ? session.user.banExpires.toISOString() : (session.user.banExpires ?? null),
        first_name: session.user.firstName ?? session.user.first_name ?? null,
        last_name: session.user.lastName ?? session.user.last_name ?? null,
        custom_role: session.user.customRole ?? session.user.custom_role ?? null,
        default_site: session.user.defaultSite ?? session.user.default_site ?? null,
      }
    }
  }
}

export default function Approvals() {
  const queryClient = useQueryClient();
  const [approvalNotes, setApprovalNotes] = useState({});
  
  
    // const [claims, setPendingApprovals] = useState([]);
    // const [isLoading, setisLoading] = useState(true);
    // React.useEffect(() => {
    //   async function fetchPendingApprovals() {
    //     setisLoading(true);
    //     try {
    //       const data = await getData('PendingApprovals', '*');
    //       setPendingApprovals(data);
    //     } catch (error) {
    //       console.error('Failed to fetch pending Approvals:', error);
    //       alert('Failed to fetch pending Approvals. Please check the console for more details.');
    //     } finally {
    //       setisLoading(false);
    //     }
    //   }
    //   fetchPendingApprovals();
    // }, []);

  const { data: claims = [], isLoading } = useQuery({
    queryKey: ['pendingApprovals'],
    queryFn: () => databaseClients.clients['WarrantyClaim'].query('*', 'approval_status=pending_approval')
  });
  
  
    // const [allUsers, setAllUsers] = useState([]);
    // React.useEffect(() => {
    //   async function fetchPendingApprovals() {
    //     try {
    //       const data = await getData('User', '*');
    //       setAllUsers(data);
    //     } catch (error) {
    //       console.error('Failed to fetch pending Approvals:', error);
    //       alert('Failed to fetch users. Please check the console for more details.');
    //     }
    //   }
    //   fetchPendingApprovals();
    // }, []);

  const { data: allUsers = [] } = useQuery({
    queryKey: ['allUsers'],
    queryFn: () => databaseClients.clients['User'].get()
  });

  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const claim = claims.find(c => c.id === id);
      await databaseClients.clients['WarrantyClaim'].update(id, {
        approval_status: 'approved',
        reg_number: claim?.reg_number || 'UNKNOWN',
        approval_note: approvalNotes[id] || ''
      });
      if (claim) {
        await databaseClients.clients['ClaimAudit'].create({
          claim_id: id,
          wip_number: claim.wip_number,
          field_changed: 'approval_status',
          old_value: 'pending_approval',
          new_value: 'approved',
          change_type: 'updated'
        });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pendingApprovals'] })
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const claim = claims.find(c => c.id === id);
      await databaseClients.clients['WarrantyClaim'].update(id, { 
        approval_status: 'rejected',
        reg_number: claim?.reg_number || 'UNKNOWN',
        approval_note: approvalNotes[id] || ''
      });
      if (claim) {
        await databaseClients.clients['ClaimAudit'].create({
          claim_id: id,
          wip_number: claim.wip_number,
          field_changed: 'approval_status',
          old_value: 'pending_approval',
          new_value: 'rejected',
          change_type: 'updated'
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingApprovals'] });
      setApprovalNotes({});
    }
    });

    const getUserName = (email) => {
    const user = allUsers.find(u => u.email === email);
    if (user?.first_name && user?.last_name) return `${user.first_name} ${user.last_name}`;
    return user?.full_name || email;
  };

  const Field = ({ label, value, className = '' }) => (
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wide">{label}</p>
      <p className={`font-medium text-slate-700 mt-0.5 ${className}`}>{value || '—'}</p>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Pending Approvals</h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : claims.length === 0 ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-slate-600 font-medium">No pending approvals</p>
            <p className="text-sm text-slate-400 mt-1">All claims are up to date</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <Card key={claim.id} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">WIP Number</p>
                        <p className="font-semibold text-slate-800 mt-0.5">{claim.wip_number}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Reg No.</p>
                        <p className="font-semibold text-slate-800 mt-0.5">{claim.reg_number || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Credit Amount</p>
                        <p className="font-semibold text-amber-600 mt-0.5">£{(claim.credit || 0).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Parts</p>
                        <p className="font-medium text-slate-700 mt-0.5">{claim.parts ? `£${claim.parts.toFixed(2)}` : '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Labour</p>
                        <p className="font-medium text-slate-700 mt-0.5">{claim.labour ? `£${claim.labour.toFixed(2)}` : '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Sub Con</p>
                        <p className="font-medium text-slate-700 mt-0.5">{claim.sub_con ? `£${claim.sub_con.toFixed(2)}` : '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Total Claim Cost</p>
                        <p className="font-semibold text-slate-800 mt-0.5">
                          {claim.total_claim_cost ? `£${claim.total_claim_cost.toFixed(2)}` : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Site</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          <p className="font-medium text-slate-700">{claim.site}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Brand</p>
                        <p className="font-medium text-slate-700 mt-0.5">{claim.brand || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Invoice #</p>
                        <p className="font-medium text-slate-700 mt-0.5">{claim.invoice_number || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Repair #</p>
                        <p className="font-medium text-slate-700 mt-0.5">{claim.claim_number || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Expected Hours</p>
                        <p className="font-medium text-slate-700 mt-0.5">{claim.expected_hours ? `${claim.expected_hours}h` : '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Last Clocking</p>
                        <p className="font-medium text-slate-700 mt-0.5">
                          {claim.last_clocking_date ? format(new Date(claim.last_clocking_date), 'dd/MM/yyyy') : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Scanned Date</p>
                        <p className="font-medium text-slate-700 mt-0.5">
                          {claim.scanned_date ? format(new Date(claim.scanned_date), 'dd/MM/yyyy') : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Mfr Deadline</p>
                        <p className="font-medium text-slate-700 mt-0.5">
                          {claim.manufacturer_deadline ? format(new Date(claim.manufacturer_deadline), 'dd/MM/yyyy') : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Status</p>
                        <p className="font-medium text-slate-700 mt-0.5 capitalize">{claim.status?.replace('_', ' ') || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Submitted By</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <User className="h-3.5 w-3.5 text-slate-400" />
                          <p className="font-medium text-slate-700">{getUserName(claim.submitted_for || claim.created_by)}</p>
                        </div>
                      </div>
                      {claim.credit_note && (
                        <div className="col-span-2 lg:col-span-4">
                          <p className="text-xs text-slate-400 uppercase tracking-wide">Credit Note</p>
                          <p className="font-medium text-slate-700 mt-0.5 text-sm bg-amber-50 border border-amber-100 rounded-md px-3 py-2">{claim.credit_note}</p>
                        </div>
                      )}
                      {claim.alert && (
                        <div className="col-span-2">
                          <p className="text-xs text-slate-400 uppercase tracking-wide">Alert</p>
                          <p className="font-medium text-amber-600 mt-0.5">{claim.alert}</p>
                        </div>
                      )}
                      {claim.alert_resolution && (
                        <div className="col-span-2">
                          <p className="text-xs text-slate-400 uppercase tracking-wide">Resolution</p>
                          <p className="font-medium text-slate-700 mt-0.5">{claim.alert_resolution}</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wide block mb-2">Approval Note (Optional)</label>
                        <Textarea
                          placeholder="Add any notes for this approval..."
                          value={approvalNotes[claim.id] || ''}
                          onChange={(e) => setApprovalNotes(prev => ({ ...prev, [claim.id]: e.target.value }))}
                          className="resize-none text-sm"
                          rows={3}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <p className="text-xs text-slate-400">
                          Submitted {format(new Date(claim.created_date), 'dd/MM/yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white gap-2"
                      onClick={() => approveMutation.mutate(claim.id)}
                      disabled={approveMutation.isPending}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50 gap-2"
                      onClick={() => rejectMutation.mutate(claim.id)}
                      disabled={rejectMutation.isPending}
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}