import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function ChartsSection({ claims, allClaims, chartConfig = {} }) {
  const claimsForAlertAnalysis = (allClaims || claims).filter(c => c.alert && !c.alert_resolution);
  
  // Default all charts to visible if not specified
  const config = {
    status: chartConfig.status ?? true,
    site: chartConfig.site ?? true,
    brand: chartConfig.brand ?? true,
    timeline: chartConfig.timeline ?? true,
    ...chartConfig
  };
  // Status distribution
  const statusData = [
    { name: 'In Progress', value: claims.filter(c => c.status === 'in_progress').length, color: '#222b57' },
    { name: 'Completed', value: claims.filter(c => c.status === 'completed').length, color: '#56C4B7' },
    { name: 'Rejected', value: claims.filter(c => c.status === 'rejected').length, color: '#EF4444' }
  ];

  // Claims by site
  const siteCounts = {};
  claims.forEach(claim => {
    siteCounts[claim.site] = (siteCounts[claim.site] || 0) + 1;
  });
  const siteData = Object.entries(siteCounts).map(([site, count]) => ({
    site,
    count
  })).sort((a, b) => b.count - a.count).slice(0, 10);

  // Claims by brand
  const brandCounts = {};
  claims.forEach(claim => {
    if (claim.brand) {
      brandCounts[claim.brand] = (brandCounts[claim.brand] || 0) + 1;
    }
  });
  const brandData = Object.entries(brandCounts).map(([brand, count]) => ({
    brand,
    count
  })).sort((a, b) => b.count - a.count).slice(0, 10);

  // Claims over time (last 30 days)
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  const claimsByDate = {};
  claims.forEach(claim => {
    const date = claim.created_date.split('T')[0];
    if (last30Days.includes(date)) {
      claimsByDate[date] = (claimsByDate[date] || 0) + 1;
    }
  });

  const timelineData = last30Days.map(date => ({
    date: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    claims: claimsByDate[date] || 0
  }));

  // Top 10 sites by alerts - exclude Non-actionable
  const siteAlerts = {};
  claimsForAlertAnalysis.forEach(claim => {
    if (claim.alert) {
      siteAlerts[claim.site] = (siteAlerts[claim.site] || 0) + 1;
    }
  });
  const siteAlertsData = Object.entries(siteAlerts).map(([site, count]) => ({
    site,
    alerts: count
  })).sort((a, b) => b.alerts - a.alerts).slice(0, 10);

  // Alert types distribution - exclude Non-actionable
  const alertTypes = {};
  claimsForAlertAnalysis.forEach(claim => {
    if (claim.alert) {
      alertTypes[claim.alert] = (alertTypes[claim.alert] || 0) + 1;
    }
  });
  const alertTypesData = Object.entries(alertTypes).map(([alert, count]) => ({
    name: alert,
    value: count,
    color: '#F59E0B'
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Status Distribution */}
      {config.status && (
        <Card className="border-0 shadow-lg bg-white chart-export-card">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-slate-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-slate-800">Claims by Status</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Claims by Site */}
      {config.site && (
        <Card className="border-0 shadow-lg bg-white chart-export-card">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-semibold text-slate-800">Claims by Site</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={siteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="site" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#222b57" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Claims by Brand */}
      {config.brand && (
        <Card className="border-0 shadow-lg bg-white chart-export-card">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-semibold text-slate-800">Claims by Brand</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={brandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="brand" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#56C4B7" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Claims Timeline */}
      {config.timeline && (
        <Card className="border-0 shadow-lg bg-white chart-export-card">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-semibold text-slate-800">Claims Timeline</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="claims" stroke="#222b57" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}