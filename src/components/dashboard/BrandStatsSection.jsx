import React from 'react';
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import TrafficLightIcon from './TrafficLightIcon';
import { ArrowLeft } from 'lucide-react';

export default function BrandStatsSection({ claims, allClaims, brands, onBrandTileClick, activeBrandFilter, onDeadlineStatusFilter, onSiteFilter }) {
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

  const getTrafficLightColor = (brand, claimsForBrand) => {
    if (claimsForBrand.length === 0) return { bg: '#E5E7EB', text: '#6B7280', label: 'No Claims' };
    const { redCount, amberCount } = getColorCounts(brand, claimsForBrand);
    if (redCount > 0) return { bg: '#FEE2E2', text: '#DC2626', label: 'Red' };
    if (amberCount > 0) return { bg: '#FEF3C7', text: '#D97706', label: 'Amber' };
    return { bg: '#D1FAE5', text: '#059669', label: 'Green' };
  };

  const brandStats = brands
    .map(brand => {
      const claimsForBrand = claims.filter(c => c.brand === brand.name && c.status !== 'completed');
      const claimedForBrand = allClaims.filter(c => c.brand === brand.name && c.claimed).length;
      const totalExpectedHours = claimsForBrand.reduce((sum, c) => sum + (c.expected_hours || 0), 0);
      const totalInProgress = claimsForBrand.filter(c => c.status === 'in_progress').length;
      const totalAwaitingReview = claimsForBrand.filter(c => c.status === 'awaiting_review').length;
      const totalRejected = claimsForBrand.filter(c => c.status === 'rejected').length;
      return {
        brand,
        count: claimsForBrand.length,
        claimedCount: claimedForBrand,
        totalExpectedHours,
        totalInProgress,
        totalAwaitingReview,
        totalRejected,
        color: getTrafficLightColor(brand, claimsForBrand),
        colorCounts: getColorCounts(brand, claimsForBrand),
        claims: claimsForBrand
      };
    })
    .sort((a, b) => b.count - a.count);

  // Calculate All Brands stats
  const allBrandsClaims = claims.filter(c => c.status !== 'completed');
  const totalClaimedCount = allClaims.filter(c => c.claimed).length;
  const allBrandsTotalExpectedHours = allBrandsClaims.reduce((sum, c) => sum + (c.expected_hours || 0), 0);
  const allBrandsTotalInProgress = allBrandsClaims.filter(c => c.status === 'in_progress').length;
  const allBrandsTotalAwaitingReview = allBrandsClaims.filter(c => c.status === 'awaiting_review').length;
  const allBrandsTotalRejected = allBrandsClaims.filter(c => c.status === 'rejected').length;
  const allBrandsColorCounts = brands.reduce((acc, brand) => {
    const claimsForBrand = claims.filter(c => c.brand === brand.name && c.status !== 'completed');
    const counts = getColorCounts(brand, claimsForBrand);
    return {
      redCount: acc.redCount + counts.redCount,
      amberCount: acc.amberCount + counts.amberCount,
      greenCount: acc.greenCount + counts.greenCount
    };
  }, { redCount: 0, amberCount: 0, greenCount: 0 });

  // Site breakdown when a brand is selected
  if (activeBrandFilter && activeBrandFilter !== 'all') {
    const activeBrandObj = brands.find(b => b.name === activeBrandFilter);
    const brandClaims = claims.filter(c => c.brand === activeBrandFilter && c.status !== 'completed');
    const sites = [...new Set(brandClaims.map(c => c.site).filter(Boolean))].sort();

    const siteStats = sites.map(site => {
      const siteClaims = brandClaims.filter(c => c.site === site);
      const siteClaimedCount = allClaims.filter(c => c.brand === activeBrandFilter && c.site === site && c.claimed).length;
      const siteTotalHours = siteClaims.reduce((sum, c) => sum + (c.expected_hours || 0), 0);
      const colorCounts = activeBrandObj ? getColorCounts(activeBrandObj, siteClaims) : { redCount: 0, amberCount: 0, greenCount: 0 };
      return { site, count: siteClaims.length, claimedCount: siteClaimedCount, totalExpectedHours: siteTotalHours, colorCounts };
    });

    return (
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onBrandTileClick('all')}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Brands
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-semibold text-slate-800">{activeBrandFilter}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {siteStats.map((stat, index) => (
            <motion.div
              key={stat.site}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card
                className="border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => onSiteFilter && onSiteFilter(stat.site)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">{stat.site}</p>
                      <p className="text-3xl font-bold text-slate-800">{stat.count}</p>
                      <p className="text-xs text-slate-500 mt-1">{stat.totalExpectedHours.toFixed(1)}h in progress</p>
                    </div>
                    <div className="flex justify-center">
                      <TrafficLightIcon size="md" colorCounts={stat.colorCounts} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div onClick={(e) => { e.stopPropagation(); onDeadlineStatusFilter('Red'); }} className="bg-red-50 px-2 py-1 rounded text-center hover:bg-red-100 transition-colors cursor-pointer">
                      <p className="text-xs font-bold text-red-700 pointer-events-none">{stat.colorCounts.redCount}</p>
                      <p className="text-xs text-red-600 pointer-events-none">Red</p>
                    </div>
                    <div onClick={(e) => { e.stopPropagation(); onDeadlineStatusFilter('Amber'); }} className="bg-amber-50 px-2 py-1 rounded text-center hover:bg-amber-100 transition-colors cursor-pointer">
                      <p className="text-xs font-bold text-amber-700 pointer-events-none">{stat.colorCounts.amberCount}</p>
                      <p className="text-xs text-amber-600 pointer-events-none">Amber</p>
                    </div>
                    <div onClick={(e) => { e.stopPropagation(); onDeadlineStatusFilter('Green'); }} className="bg-green-50 px-2 py-1 rounded text-center hover:bg-green-100 transition-colors cursor-pointer">
                      <p className="text-xs font-bold text-green-700 pointer-events-none">{stat.colorCounts.greenCount}</p>
                      <p className="text-xs text-green-600 pointer-events-none">Green</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          {siteStats.length === 0 && (
            <div className="col-span-full text-center py-8 text-slate-400 text-sm">No in-progress claims for {activeBrandFilter}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
      {/* All Brands Tile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card 
          className="border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => onBrandTileClick('all')}
        >
          <div className="p-6">
          <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">All Brands</p>
            <p className="text-3xl font-bold text-slate-800">{allBrandsClaims.length}</p>
            <p className="text-xs text-slate-500 mt-1">{allBrandsTotalExpectedHours.toFixed(1)}h in progress</p>
            {allBrandsTotalInProgress > 0 && (
              <p className="text-xs text-slate-500 mt-1">{allBrandsTotalInProgress} in progress</p>
            )}
            {allBrandsTotalAwaitingReview > 0 && (
              <p className="text-xs text-slate-500 mt-1">{allBrandsTotalAwaitingReview} awaiting review</p>
            )}
            {allBrandsTotalRejected > 0 && (
              <p className="text-xs text-slate-500 mt-1">{allBrandsTotalRejected} rejected</p>
            )}
          </div>
            <div className="flex justify-center">
              <TrafficLightIcon 
                size="md"
                colorCounts={allBrandsColorCounts}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
              <div onClick={(e) => { e.stopPropagation(); onDeadlineStatusFilter('Red'); }} className="bg-red-50 px-2 py-1 rounded text-center hover:bg-red-100 transition-colors cursor-pointer">
                <p className="text-xs font-bold text-red-700 pointer-events-none">{allBrandsColorCounts.redCount}</p>
                <p className="text-xs text-red-600 pointer-events-none">Red</p>
              </div>
              <div onClick={(e) => { e.stopPropagation(); onDeadlineStatusFilter('Amber'); }} className="bg-amber-50 px-2 py-1 rounded text-center hover:bg-amber-100 transition-colors cursor-pointer">
                <p className="text-xs font-bold text-amber-700 pointer-events-none">{allBrandsColorCounts.amberCount}</p>
                <p className="text-xs text-amber-600 pointer-events-none">Amber</p>
              </div>
              <div onClick={(e) => { e.stopPropagation(); onDeadlineStatusFilter('Green'); }} className="bg-green-50 px-2 py-1 rounded text-center hover:bg-green-100 transition-colors cursor-pointer">
                <p className="text-xs font-bold text-green-700 pointer-events-none">{allBrandsColorCounts.greenCount}</p>
                <p className="text-xs text-green-600 pointer-events-none">Green</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {brandStats.map((stat, index) => (
        <motion.div
          key={stat.brand.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <Card 
            className="border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => onBrandTileClick(stat.brand.name)}
          >
            <div className="p-6">
            <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.brand.name}</p>
              <p className="text-3xl font-bold text-slate-800">{stat.count}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.totalExpectedHours.toFixed(1)}h in progress</p>
              {stat.totalInProgress > 0 && (
                <p className="text-xs text-slate-500 mt-1">{stat.totalInProgress} in progress</p>
              )}
              {stat.totalAwaitingReview > 0 && (
                <p className="text-xs text-slate-500 mt-1">{stat.totalAwaitingReview} awaiting review</p>
              )}
              {stat.totalRejected > 0 && (
                <p className="text-xs text-slate-500 mt-1">{stat.totalRejected} rejected</p>
              )}
            </div>
                <div className="flex justify-center">
                  <TrafficLightIcon 
                    size="md"
                    colorCounts={stat.colorCounts}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div onClick={(e) => { e.stopPropagation(); onDeadlineStatusFilter('Red'); }} className="bg-red-50 px-2 py-1 rounded text-center hover:bg-red-100 transition-colors cursor-pointer">
                  <p className="text-xs font-bold text-red-700 pointer-events-none">{stat.colorCounts.redCount}</p>
                  <p className="text-xs text-red-600 pointer-events-none">Red</p>
                </div>
                <div onClick={(e) => { e.stopPropagation(); onDeadlineStatusFilter('Amber'); }} className="bg-amber-50 px-2 py-1 rounded text-center hover:bg-amber-100 transition-colors cursor-pointer">
                  <p className="text-xs font-bold text-amber-700 pointer-events-none">{stat.colorCounts.amberCount}</p>
                  <p className="text-xs text-amber-600 pointer-events-none">Amber</p>
                </div>
                <div onClick={(e) => { e.stopPropagation(); onDeadlineStatusFilter('Green'); }} className="bg-green-50 px-2 py-1 rounded text-center hover:bg-green-100 transition-colors cursor-pointer">
                  <p className="text-xs font-bold text-green-700 pointer-events-none">{stat.colorCounts.greenCount}</p>
                  <p className="text-xs text-green-600 pointer-events-none">Green</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}