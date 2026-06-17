import React from 'react';
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import TrafficLightIcon from './TrafficLightIcon';
import { ArrowLeft } from 'lucide-react';
import { databaseClients } from '@/api/databaseClient';
import { useQuery } from '@tanstack/react-query';

export default function BrandStatsSection({ claims, allClaims, brands, onBrandTileClick, activeBrandFilter, onDeadlineStatusFilter, onSiteFilter, onResetFilters }) {

  const {data: allBrands = [] } = useQuery({
    queryKey: ['allBrands'],
    queryFn: () => databaseClients.Brand.get()
  })

  const { data: allSites = [] } = useQuery({
    queryKey: ['allSites'],
    queryFn: () => databaseClients.Site.get()
  })

  const getColorCounts = (brand, claimsForBrand) => {
    const now = new Date();
    let redCount = 0, amberCount = 0, greenCount = 0;

    claimsForBrand.forEach(claim => {
      if (!claim.manufacturer_deadline) return;
      const daysRemaining = Math.ceil((new Date(claim.manufacturer_deadline) - now) / (1000 * 60 * 60 * 24));

      if (daysRemaining < 1) {
        redCount++;
      } else if (brand.green_max_days != null && daysRemaining > brand.green_max_days) {
        greenCount++;
      } else {
        const inGreenRange = brand.green_min_days != null && brand.green_max_days != null && 
          daysRemaining >= brand.green_min_days && daysRemaining <= brand.green_max_days;
        const inAmberRange = brand.amber_min_days != null && brand.amber_max_days != null && 
          daysRemaining >= brand.amber_min_days && daysRemaining <= brand.amber_max_days;
        const inRedRange = brand.red_min_days != null && brand.red_max_days != null && 
          daysRemaining >= brand.red_min_days && daysRemaining <= brand.red_max_days;

        if (inGreenRange) greenCount++;
        else if (inAmberRange) amberCount++;
        else if (inRedRange) redCount++;
      }
    });

    return { redCount, amberCount, greenCount };
  };
  
  const getStatusCounts = (claimsForBrand) => ({
    in_progress: claimsForBrand.filter(c => c.status === 'in_progress').length,
    awaiting_review: claimsForBrand.filter(c => c.status === 'awaiting_review').length,
    total_active: claimsForBrand.filter(c => c.status === 'in_progress').length + claimsForBrand.filter(c => c.status === 'awaiting_review').length,
    awaiting_approval: claimsForBrand.filter(c => c.status === 'awaiting_approval').length,
    approved: claimsForBrand.filter(c => c.status === 'approved').length,
    // queried: claimsForBrand.filter(c => c.status === 'queried').length,
    rejected: claimsForBrand.filter(c => c.status === 'rejected').length + claimsForBrand.filter(c => c.status === 'claimed_info_requested').length,
    credit_rejected: claimsForBrand.filter(c => c.status === 'credit_rejected').length,
    claimed_info_requested: claimsForBrand.filter(c => c.status === 'claimed_info_requested').length,
    claimed_info_received: claimsForBrand.filter(c => c.status === 'claimed_info_received').length,
  });

  const brandStats = brands
    .map(brand => {
      const claimsForBrand = claims.filter(c => c.brand === brand.id && !['completed', 'claimed_info_requested', 'claimed_info_received', ].includes(c.status));
      const claimsForBrandCount = claims.filter(c => c.brand === brand.id && !['ccompleted', 'claimed_info_requested', 'claimed_info_received'].includes(c.status));
      const claimsForBrandsAllStatuses = claims.filter(c => c.brand === brand.id && !['completed'].includes(c.status));
      const claimsForHours = claims.filter(c => c.brand === brand.id && ['in_progress', 'awaiting_review'].includes(c.status));
      const totalExpectedHours = claimsForHours.reduce((sum, c) => sum + (c.expected_hours || 0), 0);
      return {
        brand,
        count: claimsForBrandCount.length,
        totalExpectedHours,
        colorCounts: getColorCounts(brand, claimsForBrand),
        statusCounts: getStatusCounts(claimsForBrandsAllStatuses),
        claims: claimsForBrand
      };
    })
    .sort((a, b) => b.count - a.count);

  // Calculate All Brands stats
  const allBrandsClaims = claims.filter(c => !['completed', 'claimed_info_received', 'claimed_info_requested'].includes(c.status));
  const allBrandsClaimsCount = allClaims.filter(c => !['complted'].includes(c.status));
  const allBrandsClaimsForHours = claims.filter(c => ['in_progress', 'awaiting_review'].includes(c.status));
  const allBrandsTotalExpectedHours = allBrandsClaimsForHours.reduce((sum, c) => sum + (c.expected_hours || 0), 0);
  const allBrandsStatusCounts = getStatusCounts(allClaims.filter(c => !['completed'].includes(c.status)));
  const allBrandsColorCounts = brands.reduce((acc, brand) => {
    const claimsForBrand = allClaims.filter(c => c.brand === brand.id && !['completed'].includes(c.status));
    const counts = getColorCounts(brand, claimsForBrand);
    return {
      redCount: acc.redCount + counts.redCount,
      amberCount: acc.amberCount + counts.amberCount,
      greenCount: acc.greenCount + counts.greenCount
    };
  }, { redCount: 0, amberCount: 0, greenCount: 0 });

  const otherStatusLabels = [
    // { key: 'in_progress', label: 'In Progress'},
    // { key: 'awaiting_review', label: 'Awaiting Review'},
    { key: 'claimed_info_received', label: 'Info Received'},
    { key: 'awaiting_approval', label: 'Awaiting Approval' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Queried' },
    { key: 'credit_rejected', label: 'Credit Rejected' },
  ];

  const TileContent = ({ title, count, totalExpectedHours, statusCounts, colorCounts, onTileClick, onDeadlineClick }) => (
    <Card
      className="border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onTileClick}
    >
      <div className="p-5">
        {/* Header */}
        <p className="text-sm font-medium text-slate-500 mb-3">{title}</p>

        {/* Prominent: Hours + Total Active */}
        <div className="flex items-end gap-3 mb-3">
          <div>
            <p className="text-4xl font-extrabold leading-none" style={{ color: 'var(--hendy-blue)' }}>
              {totalExpectedHours.toFixed(1)}<span className="text-xl font-semibold text-slate-400">h</span>
            </p>
            <p className="text-xs font-medium text-slate-400 mt-0.5">hours in progress</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-2xl font-bold text-slate-700">{statusCounts.in_progress}</p>
            <p className="text-xs text-slate-400">total active</p>
          </div>
        </div>

        {/* Total count
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
          <span className="text-xs text-slate-500">Total active</span>
          <span className="text-sm font-bold text-slate-700">{count}</span>
        </div> */}

        {/* Other statuses */}
        <div className="space-y-1 mb-3">
          {otherStatusLabels.map(({ key, label }) =>
            statusCounts[key] > 0 ? (
              <div key={key} className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{label}</span>
                <span className="text-xs font-semibold text-slate-600">{statusCounts[key]}</span>
              </div>
            ) : null
          )}
        </div>

        {/* Traffic light counts */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div onClick={(e) => { e.stopPropagation(); onDeadlineClick('Red'); }} className="bg-red-50 px-2 py-1.5 rounded text-center hover:bg-red-100 transition-colors cursor-pointer">
            <p className="text-sm font-bold text-red-700">{colorCounts.redCount}</p>
            <p className="text-xs text-red-500">Red</p>
          </div>
          <div onClick={(e) => { e.stopPropagation(); onDeadlineClick('Amber'); }} className="bg-amber-50 px-2 py-1.5 rounded text-center hover:bg-amber-100 transition-colors cursor-pointer">
            <p className="text-sm font-bold text-amber-700">{colorCounts.amberCount}</p>
            <p className="text-xs text-amber-500">Amber</p>
          </div>
          <div onClick={(e) => { e.stopPropagation(); onDeadlineClick('Green'); }} className="bg-green-50 px-2 py-1.5 rounded text-center hover:bg-green-100 transition-colors cursor-pointer">
            <p className="text-sm font-bold text-green-700">{colorCounts.greenCount}</p>
            <p className="text-xs text-green-500">Green</p>
          </div>
        </div>
      </div>
    </Card>
  );

  // Site breakdown when a brand is selected
  if (activeBrandFilter && activeBrandFilter !== 'all') {
    const activeBrandObj = brands.find(b => b.id === activeBrandFilter);
    const brandClaims = claims.filter(c => c.brand === activeBrandFilter && !['completed', 'claimed_info_requested', 'claimed_info_received'].includes(c.status));
    const brandClaimsCount = allClaims.filter(c => c.brand === activeBrandFilter && !['completed'].includes(c.status));
    const sites = [...new Set(brandClaims.map(c => c.site).filter(Boolean))].sort();

    const siteStats = sites.map(site => {
      const siteClaims = brandClaims.filter(c => c.site === site);
      const siteClaimsCount = brandClaimsCount.filter(c => c.site === site);
      const siteClaimsAllStatuses = brandClaimsCount.filter(c => c.site === site);
      const siteClaimsForHours = siteClaims.filter(c => ['in_progress', 'awaiting_review'].includes(c.status));
      const siteTotalHours = siteClaimsForHours.reduce((sum, c) => sum + (c.expected_hours || 0), 0);
      const colorCounts = activeBrandObj ? getColorCounts(activeBrandObj, siteClaims) : { redCount: 0, amberCount: 0, greenCount: 0 };
      return { site, count: siteClaimsCount.length, totalExpectedHours: siteTotalHours, colorCounts, statusCounts: getStatusCounts(siteClaimsAllStatuses) };
    });

    return (
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => { onBrandTileClick('all'); onResetFilters && onResetFilters(); }}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Brands
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-semibold text-slate-800">{allBrands.find(b => b.id === activeBrandFilter)?.name}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {siteStats.map((stat, index) => (
            <motion.div
              key={stat.site}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <TileContent
                title={allSites.find(site => site.id === stat.site)?.name}
                count={stat.count}
                totalExpectedHours={stat.totalExpectedHours}
                statusCounts={stat.statusCounts}
                colorCounts={stat.colorCounts}
                onTileClick={() => onSiteFilter && onSiteFilter(stat.site)}
                onDeadlineClick={onDeadlineStatusFilter}
              />
            </motion.div>
          ))}
          {siteStats.length === 0 && (
            <div className="col-span-full text-center py-8 text-slate-400 text-sm">No in-progress claims for {allBrands.find(brand => brand.id === activeBrandFilter)?.name}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TileContent
          title="All Brands"
          count={allBrandsClaimsCount.length}
          totalExpectedHours={allBrandsTotalExpectedHours}
          statusCounts={allBrandsStatusCounts}
          colorCounts={allBrandsColorCounts}
          onTileClick={() => onBrandTileClick('all')}
          onDeadlineClick={onDeadlineStatusFilter}
        />
              
      </motion.div>
      
      {brandStats.map((stat, index) => (
        <motion.div
          key={stat.brand.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
        <TileContent
          title={stat.brand.name}
          count={stat.count}
          totalExpectedHours={stat.totalExpectedHours}
          statusCounts={stat.statusCounts}
          colorCounts={stat.colorCounts}
          onTileClick={() => onBrandTileClick(stat.brand.id)}
          onDeadlineClick={onDeadlineStatusFilter}
        />

        </motion.div>
      ))}
    </div>
  );
}