import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import BrandStatsSection from '@/components/dashboard/BrandStatsSection';
import ClaimsTable from '@/components/dashboard/ClaimsTable';
import DashboardFilters from '@/components/dashboard/DashboardFilters';
import EditClaimModal from '@/components/claims/EditClaimModal';
import AuditHistoryModal from '@/components/claims/AuditHistoryModal';
import ClaimNotesModal from '@/components/claims/ClaimNotesModal';
import CreditOptionsModal from '@/components/claims/CreditOptionsModal';
import ExportButton from '@/components/dashboard/ExportButton';

import { databaseClients } from '@/api/databaseClient';

// Redirect if user not logged in
import { auth } from "@/lib/auth"
// import { GetServerSideProps } from "next"

export const getServerSideProps = async ({ req, res }) => {
  const session = await auth.api.getSession({
    headers: new Headers(req.headers),
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
        default_brands: session.user.defaultBrands ?? session.user.default_brands ?? [],
        mustChangePassword: session.user.mustChangePassword ?? null,
      }
    }
  }
}

export default function Dashboard() {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState({wipNum: '', repairNum: '', site: [], brand: [], user: [], claimedBy: [], status: ['in_progress', 'awaiting_review', 'awaiting_approval', 'approved', 'rejected', 'credit_rejected'], alert: [], resolution: [], dateFrom: '', dateTo: '', hasCredit: false });
    const [editingClaim, setEditingClaim] = useState(null);
    const [viewingHistory, setViewingHistory] = useState(null);
    const [viewingNotes, setViewingNotes] = useState(null);
    const [creditClaim, setCreditClaim] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState(null);
    const [pendingAlert, setPendingAlert] = useState([]);
    const [showClaimed, setShowClaimed] = useState(false);
    const [repairSearch, setRepairSearch] = useState('');
    const [wipSearch, setWipSearch] = useState('');

    const router = useRouter();
    useEffect(() => {
      if (!router.isReady) return;
      const wip = typeof router.query.wip === 'string' ? router.query.wip : '';
      if (wip) setWipSearch(wip);
    }, [router.isReady, router.query.wip]);

  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ['currentUser'],
    // [ ] Sort user logic and get current user here. For now just getting me manually
    queryFn: () => databaseClients.User.me(), // Fetch current user
  });

  const { data: allClaims = [], isLoading } = useQuery({
    queryKey: ['claims'],
    queryFn: () => databaseClients.WarrantyClaim.query(), // Fetch all claims for filtering on frontend
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: () => databaseClients.Brand.query('name') // Fetch brands for stats and filters
  });

  const { data: allSites = [] } = useQuery({
    queryKey: ['sites'],
    queryFn: () => databaseClients.Site.get() // Fetch sites for filters
  });

  const { data: allUsers = [] } = useQuery({
    queryKey: ['allUsers'],
    queryFn: () => databaseClients.User.query('email') // Fetch users for filters
  });

  const adminBrands = (() => {
    const userRole = currentUser?.custom_role || currentUser?.role;
    if (userRole === 'Admin' && currentUser?.default_brands) {
      if (typeof currentUser.default_brands === 'string') {
        try {
          const parsed = JSON.parse(currentUser.default_brands);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
          return null;
        } catch (e) {
          console.warn('Failed to parse admin brands:', currentUser.default_brands);  
          return null;
        }
      } else if (Array.isArray(currentUser.default_brands) && currentUser.default_brands.length > 0) {
        return currentUser.default_brands;
      }
    }
    return null;
  })();

  // Apply filters and role-based access
    const claims = (!isLoadingUser && currentUser) ? allClaims.filter(claim => {
      // Processor role: see all claims from their branch
      const userRole = currentUser?.custom_role || currentUser?.role;
      if (userRole === 'Processor') {
        const processorSite = currentUser?.default_site;
        if (processorSite && claim.site !== processorSite) return false;
      }

      // Site Manager: see only rejected claims for their site (awaiting_review is hidden, like Processor)
      if (userRole === 'Site Manager') {
        const isVisible = claim.status === 'rejected';
        if (!isVisible) return false;
        const managerSite = currentUser?.default_site;
        if (managerSite && claim.site !== managerSite) return false;
      }

      // Admin: hide rejected claims and restrict to their assigned brands only
      if (userRole === 'Admin') {
        if (claim.status === 'rejected') {
          return false;
        }
        if (adminBrands && adminBrands.length > 0 && !adminBrands.includes(claim.brand)) {
          return false;
        }
      }

      const wipNumMatch = !wipSearch || claim.wip_number.toLowerCase().includes(wipSearch.toLowerCase());
      const repairNumMatch = !repairSearch || claim.claim_number?.split('-').some(part => part.toLowerCase().includes(repairSearch.toLowerCase()));
      const siteMatch = !filters.site?.length || filters.site.includes(claim.site);
      const brandMatch = !filters.brand?.length || filters.brand.includes(claim.brand);
      const userMatch = !filters.user?.length || filters.user.includes(claim.created_by) || filters.user.includes(claim.submitted_for);
      const claimedByMatch = !filters.claimedBy?.length || filters.claimedBy.includes(claim.claimed_by);

      // Map filter values to their corresponding status values
      const getStatusMatches = (filterStatuses) => {
        const statusMap = {
          'awaiting_review': ['awaiting_review', 'claimed_info_received'],
          'rejected': ['rejected', 'claimed_info_requested'],
          'in_progress': ['in_progress'],
          'awaiting_approval': ['awaiting_approval'],
          'approved': ['approved'],
          'completed': ['completed'],
          'credit_rejected': ['credit_rejected'],
          'withdrawn': ['withdrawn']
        };
        const matchingStatuses = filterStatuses.flatMap(fs => statusMap[fs] || [fs]);
        return matchingStatuses.includes(claim.status);
      };

      const statusMatch = !filters.status?.length || getStatusMatches(filters.status);
      const alertMatch = !filters.alert?.length || filters.alert.includes(claim.alert);
      const resolutionMatch = !filters.resolution?.length || filters.resolution.includes(claim.alert_resolution);
      const creditMatch = !filters.hasCredit || (claim.credit != null && claim.credit > 0);

      let dateMatch = true;
      if (filters.dateFrom || filters.dateTo) {
        const claimDate = new Date(claim.created_date);
        if (filters.dateFrom) {
          dateMatch = dateMatch && claimDate >= new Date(filters.dateFrom);
        }
        if (filters.dateTo) {
          dateMatch = dateMatch && claimDate <= new Date(filters.dateTo + 'T23:59:59');
        }
      }

      let deadlineStatusMatch = true;
      if (filters.deadlineStatus && filters.deadlineStatus !== 'all') {
        const brand = brands.find(b => b.id === claim.brand);
        if (!claim.manufacturer_deadline) {
          deadlineStatusMatch = false;
        } else {
          const now = new Date();
          const daysRemaining = Math.ceil((new Date(claim.manufacturer_deadline) - now) / (1000 * 60 * 60 * 24));

          if (filters.deadlineStatus === 'Red') {
            deadlineStatusMatch = daysRemaining < 1 || 
              (brand?.red_min_days != null && brand?.red_max_days != null && 
               daysRemaining >= brand.red_min_days && daysRemaining <= brand.red_max_days);
          } else if (filters.deadlineStatus === 'Amber') {
            deadlineStatusMatch = brand?.amber_min_days != null && brand?.amber_max_days != null && 
              daysRemaining >= brand.amber_min_days && daysRemaining <= brand.amber_max_days;
          } else if (filters.deadlineStatus === 'Green') {
            deadlineStatusMatch = (brand?.green_max_days != null && daysRemaining > brand.green_max_days) ||
              (brand?.green_min_days != null && brand?.green_max_days != null && 
               daysRemaining >= brand.green_min_days && daysRemaining <= brand.green_max_days);
          }
        }
      }

      const claimedMatch = showClaimed || !claim.claimed;
      return siteMatch && brandMatch && userMatch && claimedByMatch && statusMatch && alertMatch && resolutionMatch && dateMatch && deadlineStatusMatch && wipNumMatch && repairNumMatch && creditMatch;
    }) : [];

  const createAuditLog = async (claimId, wipNumber, fieldChanged, oldValue, newValue, changeType) => {
    await databaseClients.ClaimAudit.create({
      claim_id: claimId,
      wip_number: wipNumber,
      field_changed: fieldChanged,
      old_value: String(oldValue || ''),
      new_value: String(newValue || ''),
      change_type: changeType
    });
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => databaseClients.WarrantyClaim.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      queryClient.invalidateQueries({ queryKey: ['audits'] });
    }
  });

  const handleStatusChange = async (id, status) => {
    const claim = allClaims.find(c => c.id === id);
    if (claim?.claimed) return; // locked if claimed
    if (claim) {
      await createAuditLog(id, claim.wip_number, 'status', claim.status, status, 'status_changed');
    }
    updateMutation.mutate({ id, data: { status } });
  };

  const handleClaimedChange = async (id, claimed) => {
    const claim = allClaims.find(c => c.id === id);
    if (claim) {
      await createAuditLog(id, claim.wip_number, 'claimed', claim.claimed, claimed, 'updated');
      const newStatus = claimed ? 'completed' : 'in_progress';
      if (claim.status !== newStatus) {
        await createAuditLog(id, claim.wip_number, 'status', claim.status, newStatus, 'status_changed');
      }
    }
    updateMutation.mutate({ 
      id, 
      data: { 
        claimed,
        claimed_date: claimed ? new Date().toISOString() : null,
        status: claimed ? 'completed' : 'in_progress'
      } 
    });
  };

  const handleAlertChange = async (id, alert) => {
    const claim = allClaims.find(c => c.id === id);
    if (claim) {
      await createAuditLog(id, claim.wip_number, 'alert', claim.alert, alert, 'updated');
      const newStatus = claim.claimed ? 'completed' : (alert ? 'rejected' : 'in_progress');
      if (claim.status !== newStatus) {
        await createAuditLog(id, claim.wip_number, 'status', claim.status, newStatus, 'status_changed');
      }
    }
    const alertNewStatus = claim?.claimed ? 'completed' : (alert ? 'rejected' : 'in_progress');
    updateMutation.mutate({ 
      id, 
      data: { 
        alert,
        status: alertNewStatus
      } 
    });
  };

  const handleResolutionChange = async (id, alert_resolution) => {
    const claim = allClaims.find(c => c.id === id);
    if (claim) {
      await createAuditLog(id, claim.wip_number, 'alert_resolution', claim.alert_resolution, alert_resolution, 'updated');
      const newStatus = claim.claimed ? 'completed' : (alert_resolution === 'Non-actionable' ? 'completed' : (alert_resolution ? 'in_progress' : (claim.alert ? 'rejected' : claim.status)));
      if (claim.status !== newStatus) {
        await createAuditLog(id, claim.wip_number, 'status', claim.status, newStatus, 'status_changed');
      }
    }
    const newStatus = claim?.claimed ? 'completed' : (alert_resolution === 'Non-actionable' ? 'completed' : (alert_resolution ? 'in_progress' : (claim?.alert ? 'rejected' : claim?.status)));
    updateMutation.mutate({ 
      id, 
      data: { 
        alert_resolution,
        status: newStatus
      } 
    });
  };

  const handleEditSave = async (data) => {
      const userRole = currentUser?.custom_role || currentUser?.role;
      if (userRole === 'Processor' || userRole === 'Site Manager') {
        setEditingClaim(null);
        return;
      }

      const claim = editingClaim;
      const changes = [];

      Object.keys(data).forEach(key => {
        if (data[key] != claim[key] && (!(!claim[key] && !data[key]))) {
          changes.push({ field: key, oldValue: claim[key], newValue: data[key] });
        }
      });
      
      for (const change of changes) {
          await createAuditLog(
            claim.id, 
            claim.wip_number, 
            change.field, 
            change.oldValue, 
            change.newValue, 
            'updated'
          );
      }

      updateMutation.mutate({ id: claim.id, data });
      setEditingClaim(null);
    };

  const deleteMutation = useMutation({
    mutationFn: (id) => databaseClients.WarrantyClaim.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['claims'] })
  });

  const handleDelete = (id) => {
            const userRole = currentUser?.custom_role || currentUser?.role;
            if (userRole !== 'Service Manager' && userRole !== 'Owner') return;
            deleteMutation.mutate(id);
          };

    const handleResetFilters = () => {
      setFilters({ site: [], brand: [], user: [], claimedBy: [], status: ['in_progress', 'awaiting_review', 'awaiting_approval', 'approved', 'rejected', 'credit_rejected'], alert: [], dateFrom: '', dateTo: '', deadlineStatus: 'all', hasCredit: false });
    };

  const handleBrandTileClick = (brandName) => {
    if (brandName === 'all') {
      setFilters({ ...filters, brand: [], deadlineStatus: 'all' });
    } else {
      const isAlreadyFiltered = filters.brand?.length === 1 && filters.brand[0] === brandName;
      setFilters({
        ...filters,
        brand: isAlreadyFiltered ? [] : [brandName],
        deadlineStatus: 'all'
      });
    }
  };

  const handleDeadlineStatusFilter = (status) => {
    const isAlreadyFiltered = filters.deadlineStatus === status;
    setFilters({
      ...filters,
      deadlineStatus: isAlreadyFiltered ? 'all' : status
    });
  };

  const handleStatusFilter = (statusKey) => {
    const statusMap = {
      'in_progress': ['in_progress'],
      'awaiting_review': ['awaiting_review'],
      'total_active': ['in_progress', 'awaiting_review'],
      'claimed_info_received': ['in_progress', 'awaiting_review'],
      'awaiting_approval': ['awaiting_approval'],
      'approved': ['approved'],
      'rejected': ['rejected'],
      'credit_rejected': ['credit_rejected'],
    };
    const statuses = statusMap[statusKey] || [statusKey];
    setFilters(f => ({ ...f, status: statuses }));
  }

  const handleSaveSelectedBrands = (newSelected) => {
    setSelectedBrands(newSelected);
    localStorage.setItem('selectedBrandTiles', JSON.stringify(newSelected));
  };


  const activeSelectedBrands = selectedBrands ?? (() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedBrandTiles');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {}
      }
    }
    return brands.map(b => b.id);
  })();

  const siteBrandRestriction = (() => {
    const userRole = currentUser?.custom_role || currentUser?.role;
    if (['Processor', 'Site Manager'].includes(userRole) && currentUser?.default_site) {
      const userSite = allSites.find(s => s.id === currentUser.default_site || s.name === currentUser.default_site);
      return userSite?.brands || null;
    }
    return null;
  })();

  const visibleBrands = brands.filter(b => 
    activeSelectedBrands.includes(b.id) &&
    (adminBrands === null || adminBrands.includes(b.id)) &&
    (siteBrandRestriction === null || siteBrandRestriction.includes(b.id))
  );

  // Calculate stats
  const totalClaims = claims.length;
  const inProgressClaims = claims.filter(c => c.status === 'in_progress').length;
  const awaitingReviewClaims = claims.filter(c => c.status === 'awaiting_review').length;
  const completedClaims = claims.filter(c => c.status === 'completed').length;
  const rejectedClaims = claims.filter(c => c.status === 'rejected').length;
  const openAlerts = claims.filter(c => c.alert && !c.alert_resolution).length;
  const closedAlerts = claims.filter(c => c.alert && c.alert_resolution).length;
  const totalClaimed = claims.filter(c => c.claimed).length;
  const nonActionableClaims = claims.filter(c => c.alert_resolution === 'Non-actionable').length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-10">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--hendy-blue)' }}>
                REPAIRS DASHBOARD
              </h1>
              <p className="text-slate-500">
                Monitor and manage all warranty repairs
              </p>
            </div>
            <ExportButton claims={claims} />
          </div>
        </div>

        {/* Filters */}
        <DashboardFilters claims={(() => {
          const userRole = currentUser?.custom_role || currentUser?.role;
          if ((userRole === 'Admin' || userRole === 'Site Manager') && currentUser?.default_site) {
            return allClaims.filter(c => c.site === currentUser.default_site);
          }
          return allClaims;
        })()} onRepairSearchChange={setRepairSearch} repairSearch={repairSearch} onWipSearchChange={setWipSearch} wipSearch={wipSearch} filters={filters} onFilterChange={setFilters} allUsers={allUsers} showClaimed={showClaimed} onShowClaimedChange={setShowClaimed} currentUser={currentUser} allSites={allSites} />

          {/* Brand Stats Section 
              Only show if user is NOT  a Processor or Site Manager */}
          {currentUser?.customRole !== 'Processor' && currentUser?.customRole !== 'Site Manager' && (
            <BrandStatsSection claims={claims} allClaims={claims} brands={visibleBrands} onBrandTileClick={handleBrandTileClick} activeBrandFilter={filters.brand?.length === 1 ? filters.brand[0] : null} onDeadlineStatusFilter={handleDeadlineStatusFilter} onSiteFilter={(site) => setFilters(f => ({ ...f, site: f.site?.includes(site) ? f.site.filter(s => s !== site) : [...(f.site || []), site] }))} onResetFilters={handleResetFilters} onStatusFilter={handleStatusFilter} />
          )}

        {/* Claims Table */}
        <ClaimsTable
          claims={claims}
          onStatusChange={handleStatusChange}
          onClaimedChange={handleClaimedChange}
          onAlertChange={handleAlertChange}
          onResolutionChange={handleResolutionChange}
          onDelete={handleDelete}
          onEdit={setEditingClaim}
          onCreditOptions={setCreditClaim}
          onViewHistory={setViewingHistory}
          onViewNotes={setViewingNotes}
          isLoading={isLoading}
        />

        {/* Edit Modal */}
        {editingClaim && (
          <EditClaimModal
            claim={editingClaim}
            open={!!editingClaim}
            onClose={() => setEditingClaim(null)}
            onSave={handleEditSave}
          />
        )}

        {/* Credit Options Modal */}
        {creditClaim && (
          <CreditOptionsModal
            claim={creditClaim}
            open={!!creditClaim}
            onClose={() => setCreditClaim(null)}
            onSave={async (data) => {
              const claim = creditClaim;
              for (const [key, val] of Object.entries(data)) {
                if (val !== claim[key]) {
                  await createAuditLog(claim.id, claim.wip_number, key, claim[key], val, 'updated');
                }
              }
              updateMutation.mutate({ id: claim.id, data });
              setCreditClaim(null);
            }}
          />
        )}

        {/* Audit History Modal */}
        {viewingHistory && (
          <AuditHistoryModal
            claim={viewingHistory}
            open={!!viewingHistory}
            onClose={() => setViewingHistory(null)}
          />
        )}

        {/* Claim Notes Modal */}
        {viewingNotes && (
          <ClaimNotesModal
            claim={viewingNotes}
            open={!!viewingNotes}
            requireNote={!!pendingAlert}
            onClose={() => setViewingNotes(null)}
            onStatusUpdate={async () => {
              // If there's a pending alert, apply it now that the note has been added
              if (pendingAlert) {
                const { claimId, alert } = pendingAlert;
                const claim = allClaims.find(c => c.id === claimId);
                if (claim) {
                  await createAuditLog(claimId, claim.wip_number, 'alert', claim.alert, alert, 'updated');
                  const newStatus = alert === 'Info - Post Claim' ? 'claimed_info_requested' : (claim.claimed ? 'completed' : 'rejected');
                  if (claim.status !== newStatus) {
                    await createAuditLog(claimId, claim.wip_number, 'status', claim.status, newStatus, 'status_changed');
                  }
                  updateMutation.mutate({ id: claimId, data: { alert, status: newStatus } });
                }
                setPendingAlert(null);
              }
              queryClient.invalidateQueries({ queryKey: ['claims'] });
              setViewingNotes(null);
            }}
          />
        )}


        </div>
        </div>
        );
        }