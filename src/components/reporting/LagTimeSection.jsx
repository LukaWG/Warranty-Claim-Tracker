import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Clock, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { differenceInDays, startOfWeek, startOfMonth, format, parseISO, isValid } from 'date-fns';

const HENDY_BLUE = '#222b57';
const HENDY_TEAL = '#56C4B7';
const COLORS = [HENDY_BLUE, HENDY_TEAL, '#f59e0b', '#ef4444', '#8b5cf6'];

function avgDays(arr) {
  const valid = arr.filter(v => v != null && !isNaN(v) && v >= 0);
  if (!valid.length) return null;
  return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
}

function getLagBuckets(claims, dateKey1, dateKey2) {
  const daily = {}, weekly = {}, monthly = {};
  claims.forEach(c => {
    if (!c[dateKey1] || !c[dateKey2]) return;
    const d1 = new Date(c[dateKey1]);
    const d2 = new Date(c[dateKey2]);
    if (!isValid(d1) || !isValid(d2)) return;
    const diff = differenceInDays(d2, d1);
    if (diff < 0) return;
    const dayKey = format(d2, 'dd/MM');
    const weekKey = format(startOfWeek(d2, { weekStartsOn: 1 }), 'dd/MM');
    const monthKey = format(startOfMonth(d2), 'MMM yy');
    if (!daily[dayKey]) daily[dayKey] = [];
    if (!weekly[weekKey]) weekly[weekKey] = [];
    if (!monthly[monthKey]) monthly[monthKey] = [];
    daily[dayKey].push(diff);
    weekly[weekKey].push(diff);
    monthly[monthKey].push(diff);
  });
  const toArr = (obj) => Object.entries(obj).slice(-12).map(([k, v]) => ({ period: k, avgDays: parseFloat(avgDays(v)) || 0, count: v.length }));
  return { daily: toArr(daily), weekly: toArr(weekly), monthly: toArr(monthly) };
}

function LagChart({ data, title, color }) {
  if (!data.length) return <p className="text-sm text-slate-400 text-center py-4">No data available</p>;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="period" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} unit="d" />
        <Tooltip formatter={(v) => [`${v} days`, 'Avg Lag']} />
        <Bar dataKey="avgDays" fill={color} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function LagTimeSection({ claims }) {
  const [siteLagView, setSiteLagView] = React.useState('monthly');
  const [claimLagView, setClaimLagView] = React.useState('monthly');

  // Site lag: last_clocking_date (completion) → scanned_date (upload)
  const siteLagBuckets = useMemo(() => getLagBuckets(claims, 'last_clocking_date', 'scanned_date'), [claims]);
  // Claim lag: scanned_date (upload) → claimed_date (claiming)
  const claimLagBuckets = useMemo(() => getLagBuckets(claims, 'scanned_date', 'claimed_date'), [claims]);

  // Site lag by site
  const siteLagBySite = useMemo(() => {
    const map = {};
    claims.forEach(c => {
      if (!c.last_clocking_date || !c.scanned_date) return;
      const d1 = new Date(c.last_clocking_date), d2 = new Date(c.scanned_date);
      if (!isValid(d1) || !isValid(d2)) return;
      const diff = differenceInDays(d2, d1);
      if (diff < 0) return;
      if (!map[c.site]) map[c.site] = [];
      map[c.site].push(diff);
    });
    return Object.entries(map).map(([site, vals]) => ({ site, avgDays: parseFloat(avgDays(vals)) || 0, count: vals.length }));
  }, [claims]);

  // RFT error rates
  const rftStats = useMemo(() => {
    const total = claims.length;
    const withAlert = claims.filter(c => c.alert).length;
    const actioned = claims.filter(c => c.alert && c.alert_resolution && c.alert_resolution !== 'Non-actionable').length;
    const notActioned = claims.filter(c => c.alert && (!c.alert_resolution || c.alert_resolution === 'Non-actionable')).length;
    const claimed = claims.filter(c => c.alert && c.claimed).length;
    const lost = claims.filter(c => c.alert && c.status === 'rejected').length;
    return [
      { name: 'No Alert', value: total - withAlert },
      { name: 'Actioned/Claimed', value: actioned },
      { name: 'Not Actioned', value: notActioned },
      { name: 'Lost/Rejected', value: lost },
    ].filter(d => d.value > 0);
  }, [claims]);

  // Admin throughput by user/site
  const throughputBySite = useMemo(() => {
    const map = {};
    claims.forEach(c => {
      const key = c.site || 'Unknown';
      if (!map[key]) map[key] = 0;
      map[key]++;
    });
    return Object.entries(map).map(([site, count]) => ({ site, count })).sort((a, b) => b.count - a.count);
  }, [claims]);

  const ViewToggle = ({ value, onChange }) => (
    <div className="flex gap-1 text-xs">
      {['daily', 'weekly', 'monthly'].map(v => (
        <button key={v} onClick={() => onChange(v)}
          className={`px-2 py-1 rounded capitalize transition-colors ${value === v ? 'text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          style={value === v ? { backgroundColor: HENDY_BLUE } : {}}>
          {v}
        </button>
      ))}
    </div>
  );

  const overallSiteLag = avgDays(claims.filter(c => c.last_clocking_date && c.scanned_date).map(c => {
    const d = differenceInDays(new Date(c.scanned_date), new Date(c.last_clocking_date));
    return d >= 0 ? d : null;
  }));

  const overallClaimLag = avgDays(claims.filter(c => c.scanned_date && c.claimed_date).map(c => {
    const d = differenceInDays(new Date(c.claimed_date), new Date(c.scanned_date));
    return d >= 0 ? d : null;
  }));

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: HENDY_BLUE }}>
          <TrendingUp className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-xl font-bold" style={{ color: HENDY_BLUE }}>Availability & Performance</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Lag Time */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" style={{ color: HENDY_TEAL }} />
                <CardTitle className="text-base">Site Lag Time</CardTitle>
                <span className="text-xs text-slate-400">(Completion → Upload)</span>
              </div>
              <ViewToggle value={siteLagView} onChange={setSiteLagView} />
            </div>
            {overallSiteLag && (
              <p className="text-sm text-slate-500">Overall avg: <span className="font-semibold" style={{ color: HENDY_BLUE }}>{overallSiteLag} days</span></p>
            )}
          </CardHeader>
          <CardContent>
            <LagChart data={siteLagBuckets[siteLagView]} color={HENDY_TEAL} />
            {siteLagBySite.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-500 mb-2">By Site</p>
                <div className="space-y-1">
                  {siteLagBySite.map(({ site, avgDays, count }) => (
                    <div key={site} className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 truncate max-w-[160px]">{site}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">{count} claims</span>
                        <span className="font-semibold w-16 text-right" style={{ color: HENDY_BLUE }}>{avgDays}d avg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Claim Lag Time */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" style={{ color: HENDY_BLUE }} />
                <CardTitle className="text-base">Claim Lag Time</CardTitle>
                <span className="text-xs text-slate-400">(Upload → Claiming)</span>
              </div>
              <ViewToggle value={claimLagView} onChange={setClaimLagView} />
            </div>
            {overallClaimLag && (
              <p className="text-sm text-slate-500">Overall avg: <span className="font-semibold" style={{ color: HENDY_BLUE }}>{overallClaimLag} days</span></p>
            )}
          </CardHeader>
          <CardContent>
            <LagChart data={claimLagBuckets[claimLagView]} color={HENDY_BLUE} />
          </CardContent>
        </Card>

        {/* RFT Error Rates */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <CardTitle className="text-base">RFT Error Rates</CardTitle>
            </div>
            <p className="text-xs text-slate-400">Actioned/claimed vs not represented/lost</p>
          </CardHeader>
          <CardContent>
            {rftStats.length > 0 ? (
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={rftStats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {rftStats.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">No alert data available</p>
            )}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {rftStats.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between bg-slate-50 rounded px-3 py-2">
                  <span className="text-xs text-slate-600">{d.name}</span>
                  <span className="text-sm font-bold" style={{ color: COLORS[i % COLORS.length] }}>{d.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Admin Throughput */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" style={{ color: HENDY_TEAL }} />
              <CardTitle className="text-base">Administration Throughput</CardTitle>
            </div>
            <p className="text-xs text-slate-400">Claims loaded per site</p>
          </CardHeader>
          <CardContent>
            {throughputBySite.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={throughputBySite} layout="vertical" margin={{ top: 4, right: 16, left: 40, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="site" tick={{ fontSize: 10 }} width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill={HENDY_TEAL} radius={[0, 3, 3, 0]} label={{ position: 'right', fontSize: 10 }} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">No data</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}