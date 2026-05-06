import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ChartsSection from '@/components/dashboard/ChartsSection';
import DynamicChartsSection from '@/components/dashboard/DynamicChartsSection';
import DashboardFilters from '@/components/dashboard/DashboardFilters';
import StatsCard from '@/components/dashboard/StatsCard';
import ExportButton from '@/components/dashboard/ExportButton';
import ExportChartsButton from '@/components/dashboard/ExportChartsButton';
import CustomizeReportingModal from '@/components/reporting/CustomizeReportingModal';
import { BarChart3, FileText, Clock, CheckCircle, XCircle, AlertCircle, Loader, Settings2, Wrench, Package, PoundSterling, HardHat, Search, Gift } from 'lucide-react';
import LagTimeSection from '@/components/reporting/LagTimeSection';
import { Button } from "@/components/ui/button";

export default function Reporting() {
  const [filters, setFilters] = useState({ site: 'all', user: 'all', status: 'all', alert: 'all', resolution: 'all', dateFrom: '', dateTo: '' });
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    tiles: {
      total: true,
      in_progress: true,
      awaiting_review: true,
      completed: true,
      rejected: true,
      open_alerts: true,
      closed_alerts: true,
      total_claimed: true,
      non_actionable: true,
      total_hours: true,
      total_parts: true,
      total_labour: true,
      total_subcon: true,
      total_cost: true
    },
    charts: {
      status: true,
      site: true,
      brand: true,
      timeline: true
    },
    customCharts: []
  });

  // Load config from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('reporting_config');
    if (saved) {
      setReportConfig(JSON.parse(saved));
    }
  }, []);

  const saveConfig = (config) => {
    setReportConfig(config);
    localStorage.setItem('reporting_config', JSON.stringify(config));
  };

  const { data: allClaims = [], isLoading } = useQuery({
    queryKey: ['claims'],
    queryFn: () => base44.entities.WarrantyClaim.list('-created_date')
  });

  // Apply filters
  const claims = allClaims.filter(claim => {
    const siteMatch = filters.site === 'all' || claim.site === filters.site;
    const userMatch = filters.user === 'all' || claim.created_by === filters.user;
    const statusMatch = filters.status === 'all' || claim.status === filters.status;
    const alertMatch = filters.alert === 'all' || (filters.alert === 'any' ? !!claim.alert : claim.alert === filters.alert);
    
    let resolutionMatch = true;
    if (filters.resolution === 'none') {
      resolutionMatch = !claim.alert_resolution;
    } else if (filters.resolution === 'resolved') {
      resolutionMatch = !!claim.alert_resolution;
    } else if (filters.resolution !== 'all') {
      resolutionMatch = claim.alert_resolution === filters.resolution;
    }
    
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
    
    return siteMatch && userMatch && statusMatch && alertMatch && resolutionMatch && dateMatch;
  });

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
  const totalHours = claims.reduce((sum, c) => sum + (c.expected_hours || 0), 0);
  const totalParts = claims.reduce((sum, c) => sum + (c.parts || 0), 0);
  const totalLabour = claims.reduce((sum, c) => sum + (c.labour || 0), 0);
  const totalSubCon = claims.reduce((sum, c) => sum + (c.sub_con || 0), 0);
  const totalClaimCost = claims.reduce((sum, c) => sum + (c.total_claim_cost || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--hendy-blue)' }}>
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--hendy-blue)' }}>
                  REPORTING
                </h1>
              </div>
              <p className="text-slate-500">
                Analytics and insights for warranty claims
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCustomizeModal(true)}
                className="flex items-center gap-2"
              >
                <Settings2 className="h-4 w-4" />
                Customise
              </Button>
              <ExportButton claims={claims} filters={filters} />
              <ExportChartsButton />
            </div>
          </div>
        </div>

        {/* Filters */}
        <DashboardFilters claims={allClaims} filters={filters} onFilterChange={setFilters} />

        <LagTimeSection claims={claims} />

        {/* Customize Modal */}
        <CustomizeReportingModal
          open={showCustomizeModal}
          onClose={() => setShowCustomizeModal(false)}
          config={reportConfig}
          onSave={saveConfig}
        />
      </div>
    </div>
  );
}