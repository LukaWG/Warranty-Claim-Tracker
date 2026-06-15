import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function DynamicChartsSection({ claims, allClaims, customCharts = [] }) {
  const enabledCharts = customCharts.filter(chart => chart.enabled !== false);

  const getChartData = (chartConfig) => {
    const { metricType, field, groupBy, groupBy2 } = chartConfig;

    // Handle time-based grouping
    if (groupBy === 'daily') {
      const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return date.toISOString().split('T')[0];
      });

      const dataByDate = {};
      claims.forEach(claim => {
        const date = claim.created_date?.split('T')[0];
        if (last30Days.includes(date)) {
          if (!dataByDate[date]) dataByDate[date] = { count: 0, sum: 0 };
          dataByDate[date].count += 1;
          if (field && claim[field]) {
            dataByDate[date].sum += claim[field];
          }
        }
      });

      const data = last30Days.map(date => {
        const dateData = dataByDate[date] || { count: 0, sum: 0 };
        let value = 0;
        if (metricType === 'count') value = dateData.count;
        else if (metricType === 'sum') value = Math.round(dateData.sum);
        else if (metricType === 'average') value = dateData.count > 0 ? Math.round(dateData.sum / dateData.count) : 0;
        else if (metricType === 'percentage') {
          const completed = claims.filter(c => c.created_date?.split('T')[0] === date && c.status === 'completed').length;
          value = dateData.count > 0 ? Math.round((completed / dateData.count) * 100) : 0;
        }
        return {
          name: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
          value
        };
      });

      return {
        title: `${metricType === 'count' ? 'Claims' : metricType === 'percentage' ? 'Completion Rate' : field ? field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Value'} Over Time`,
        data,
        dataKey: 'value',
        nameKey: 'name'
      };
    }

    if (groupBy === 'monthly') {
      const last12Months = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (11 - i));
        return date.toISOString().slice(0, 7);
      });

      const dataByMonth = {};
      claims.forEach(claim => {
        const month = claim.created_date?.slice(0, 7);
        if (last12Months.includes(month)) {
          if (!dataByMonth[month]) dataByMonth[month] = { count: 0, sum: 0 };
          dataByMonth[month].count += 1;
          if (field && claim[field]) {
            dataByMonth[month].sum += claim[field];
          }
        }
      });

      const data = last12Months.map(month => {
        const monthData = dataByMonth[month] || { count: 0, sum: 0 };
        let value = 0;
        if (metricType === 'count') value = monthData.count;
        else if (metricType === 'sum') value = Math.round(monthData.sum);
        else if (metricType === 'average') value = monthData.count > 0 ? Math.round(monthData.sum / monthData.count) : 0;
        return {
          name: new Date(month + '-01').toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }),
          value
        };
      });

      return {
        title: `${metricType === 'count' ? 'Claims' : field ? field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Value'} by Month`,
        data,
        dataKey: 'value',
        nameKey: 'name'
      };
    }

    // Handle categorical grouping with optional secondary grouping
    if (groupBy2) {
      // Nested grouping: group by primary, then secondary
      const groupByField1 = groupBy === 'user' ? 'created_by' : groupBy;
      const groupByField2 = groupBy2 === 'user' ? 'created_by' : groupBy2;
      const grouped = {};

      claims.forEach(claim => {
        const key1 = claim[groupByField1] || 'Unknown';
        const key2 = claim[groupByField2] || 'Unknown';
        const compositeKey = `${key1} - ${key2}`;

        if (!grouped[compositeKey]) grouped[compositeKey] = { count: 0, sum: 0, primary: key1, secondary: key2 };
        grouped[compositeKey].count += 1;
        if (field && claim[field]) {
          grouped[compositeKey].sum += claim[field];
        }
      });

      const data = Object.entries(grouped).map(([name, data]) => {
        let value = 0;
        if (metricType === 'count') value = data.count;
        else if (metricType === 'sum') value = Math.round(data.sum);
        else if (metricType === 'average') value = data.count > 0 ? Math.round(data.sum / data.count) : 0;
        return { name, value, primary: data.primary, secondary: data.secondary };
      }).sort((a, b) => b.value - a.value).slice(0, 20);

      const metricLabel = metricType === 'count' ? 'Claims' : 
                         field ? field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Value';
      const group1Label = groupBy.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const group2Label = groupBy2.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      return {
        title: `${metricLabel} by ${group1Label} & ${group2Label}`,
        data,
        dataKey: 'value',
        nameKey: 'name'
      };
    }

    // Single grouping
    const groupByField = groupBy === 'user' ? 'created_by' : groupBy;
    const grouped = {};
    
    claims.forEach(claim => {
      const key = claim[groupByField] || 'Unknown';
      if (!grouped[key]) grouped[key] = { count: 0, sum: 0 };
      grouped[key].count += 1;
      if (field && claim[field]) {
        grouped[key].sum += claim[field];
      }
    });

    const data = Object.entries(grouped).map(([name, data]) => {
      let value = 0;
      if (metricType === 'count') value = data.count;
      else if (metricType === 'sum') value = Math.round(data.sum);
      else if (metricType === 'average') value = data.count > 0 ? Math.round(data.sum / data.count) : 0;
      else if (metricType === 'percentage') {
        const completed = claims.filter(c => c[groupByField] === name && c.status === 'completed').length;
        value = data.count > 0 ? Math.round((completed / data.count) * 100) : 0;
      }
      return { name, value };
    }).sort((a, b) => b.value - a.value).slice(0, 15);

    const metricLabel = metricType === 'count' ? 'Claims' : 
                       metricType === 'percentage' ? 'Completion Rate' :
                       field ? field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Value';
    const groupLabel = groupBy.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return {
      title: `${metricLabel} by ${groupLabel}`,
      data,
      dataKey: 'value',
      nameKey: 'name'
    };
  };

  // Legacy support for old chart format
  const getLegacyChartData = (metric) => {
    switch (metric) {
      case 'status':
        return {
          title: 'Claims by Status',
          data: [
            { name: 'In Progress', value: claims.filter(c => c.status === 'in_progress').length, color: '#222b57' },
            { name: 'Awaiting Review', value: claims.filter(c => c.status === 'awaiting_review').length, color: '#F59E0B' },
            { name: 'Completed', value: claims.filter(c => c.status === 'completed').length, color: '#56C4B7' },
            { name: 'Rejected', value: claims.filter(c => c.status === 'rejected').length, color: '#EF4444' }
          ],
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'user':
        const userCounts = {};
        claims.forEach(claim => {
          const user = claim.created_by || 'Unknown';
          userCounts[user] = (userCounts[user] || 0) + 1;
        });
        return {
          title: 'Claims by User',
          data: Object.entries(userCounts).map(([user, count]) => ({
            name: user,
            value: count
          })).sort((a, b) => b.value - a.value).slice(0, 10),
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'alert':
        const alertCounts = {};
        claims.forEach(claim => {
          if (claim.alert) {
            alertCounts[claim.alert] = (alertCounts[claim.alert] || 0) + 1;
          }
        });
        return {
          title: 'Claims by Alert Type',
          data: Object.entries(alertCounts).map(([alert, count]) => ({
            name: alert,
            value: count
          })).sort((a, b) => b.value - a.value),
          dataKey: 'value',
          nameKey: 'name'
        };
      
      case 'site':
        const siteCounts = {};
        claims.forEach(claim => {
          siteCounts[claim.site] = (siteCounts[claim.site] || 0) + 1;
        });
        return {
          title: 'Claims by Site',
          data: Object.entries(siteCounts).map(([site, count]) => ({
            name: site,
            value: count
          })).sort((a, b) => b.value - a.value).slice(0, 10),
          dataKey: 'value',
          nameKey: 'name'
        };
      
      case 'brand':
        const brandCounts = {};
        claims.forEach(claim => {
          if (claim.brand) {
            brandCounts[claim.brand] = (brandCounts[claim.brand] || 0) + 1;
          }
        });
        return {
          title: 'Claims by Brand',
          data: Object.entries(brandCounts).map(([brand, count]) => ({
            name: brand,
            value: count
          })).sort((a, b) => b.value - a.value).slice(0, 10),
          dataKey: 'value',
          nameKey: 'name'
        };
      
      case 'timeline':
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

        return {
          title: 'Claims Timeline (Last 30 Days)',
          data: last30Days.map(date => ({
            name: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
            value: claimsByDate[date] || 0
          })),
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'cost':
        const last30DaysCost = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return date.toISOString().split('T')[0];
        });

        const costByDate = {};
        claims.forEach(claim => {
          const date = claim.created_date.split('T')[0];
          if (last30DaysCost.includes(date) && claim.approval_status !== 'pending_approval') {
            costByDate[date] = (costByDate[date] || 0) + (claim.total_claim_cost || 0);
          }
        });

        return {
          title: 'Total Cost Over Time',
          data: last30DaysCost.map(date => ({
            name: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
            value: Math.round(costByDate[date] || 0)
          })),
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'hours':
        const last30DaysHours = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return date.toISOString().split('T')[0];
        });

        const hoursByDate = {};
        claims.forEach(claim => {
          const date = claim.created_date.split('T')[0];
          if (last30DaysHours.includes(date)) {
            hoursByDate[date] = (hoursByDate[date] || 0) + (claim.expected_hours || 0);
          }
        });

        return {
          title: 'Total Hours Over Time',
          data: last30DaysHours.map(date => ({
            name: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
            value: Math.round(hoursByDate[date] || 0)
          })),
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'monthly':
        const last12Months = Array.from({ length: 12 }, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - (11 - i));
          return date.toISOString().slice(0, 7);
        });

        const claimsByMonth = {};
        claims.forEach(claim => {
          const month = claim.created_date.slice(0, 7);
          if (last12Months.includes(month)) {
            claimsByMonth[month] = (claimsByMonth[month] || 0) + 1;
          }
        });

        return {
          title: 'Claims by Month (12 Months)',
          data: last12Months.map(month => ({
            name: new Date(month + '-01').toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }),
            value: claimsByMonth[month] || 0
          })),
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'avgCostSite':
        const siteCostTotals = {};
        const siteCostCounts = {};
        claims.forEach(claim => {
          if (claim.site && claim.approval_status !== 'pending_approval') {
            siteCostTotals[claim.site] = (siteCostTotals[claim.site] || 0) + (claim.total_claim_cost || 0);
            siteCostCounts[claim.site] = (siteCostCounts[claim.site] || 0) + 1;
          }
        });
        return {
          title: 'Average Cost by Site',
          data: Object.entries(siteCostTotals).map(([site, total]) => ({
            name: site,
            value: Math.round(total / siteCostCounts[site])
          })).sort((a, b) => b.value - a.value).slice(0, 10),
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'avgCostBrand':
        const brandCostTotals = {};
        const brandCostCounts = {};
        claims.forEach(claim => {
          if (claim.brand && claim.approval_status !== 'pending_approval') {
            brandCostTotals[claim.brand] = (brandCostTotals[claim.brand] || 0) + (claim.total_claim_cost || 0);
            brandCostCounts[claim.brand] = (brandCostCounts[claim.brand] || 0) + 1;
          }
        });
        return {
          title: 'Average Cost by Brand',
          data: Object.entries(brandCostTotals).map(([brand, total]) => ({
            name: brand,
            value: Math.round(total / brandCostCounts[brand])
          })).sort((a, b) => b.value - a.value).slice(0, 10),
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'partsCost':
        const last30DaysParts = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return date.toISOString().split('T')[0];
        });
        const partsByDate = {};
        claims.forEach(claim => {
          const date = claim.created_date.split('T')[0];
          if (last30DaysParts.includes(date) && claim.approval_status !== 'pending_approval') {
            partsByDate[date] = (partsByDate[date] || 0) + (claim.parts || 0);
          }
        });
        return {
          title: 'Parts Cost Over Time',
          data: last30DaysParts.map(date => ({
            name: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
            value: Math.round(partsByDate[date] || 0)
          })),
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'labourCost':
        const last30DaysLabour = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return date.toISOString().split('T')[0];
        });
        const labourByDate = {};
        claims.forEach(claim => {
          const date = claim.created_date.split('T')[0];
          if (last30DaysLabour.includes(date) && claim.approval_status !== 'pending_approval') {
            labourByDate[date] = (labourByDate[date] || 0) + (claim.labour || 0);
          }
        });
        return {
          title: 'Labour Cost Over Time',
          data: last30DaysLabour.map(date => ({
            name: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
            value: Math.round(labourByDate[date] || 0)
          })),
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'subconCost':
        const last30DaysSubcon = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return date.toISOString().split('T')[0];
        });
        const subconByDate = {};
        claims.forEach(claim => {
          const date = claim.created_date.split('T')[0];
          if (last30DaysSubcon.includes(date) && claim.approval_status !== 'pending_approval') {
            subconByDate[date] = (subconByDate[date] || 0) + (claim.sub_con || 0);
          }
        });
        return {
          title: 'Sub-Con Cost Over Time',
          data: last30DaysSubcon.map(date => ({
            name: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
            value: Math.round(subconByDate[date] || 0)
          })),
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'avgHoursSite':
        const siteHoursTotals = {};
        const siteHoursCounts = {};
        claims.forEach(claim => {
          if (claim.site) {
            siteHoursTotals[claim.site] = (siteHoursTotals[claim.site] || 0) + (claim.expected_hours || 0);
            siteHoursCounts[claim.site] = (siteHoursCounts[claim.site] || 0) + 1;
          }
        });
        return {
          title: 'Average Hours by Site',
          data: Object.entries(siteHoursTotals).map(([site, total]) => ({
            name: site,
            value: Math.round((total / siteHoursCounts[site]) * 10) / 10
          })).sort((a, b) => b.value - a.value).slice(0, 10),
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'completionRate':
        const last30DaysCompletion = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return date.toISOString().split('T')[0];
        });
        const completionByDate = {};
        claims.forEach(claim => {
          const date = claim.created_date.split('T')[0];
          if (last30DaysCompletion.includes(date)) {
            if (!completionByDate[date]) completionByDate[date] = { total: 0, completed: 0 };
            completionByDate[date].total += 1;
            if (claim.status === 'completed') completionByDate[date].completed += 1;
          }
        });
        return {
          title: 'Completion Rate Over Time',
          data: last30DaysCompletion.map(date => ({
            name: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
            value: completionByDate[date] ? Math.round((completionByDate[date].completed / completionByDate[date].total) * 100) : 0
          })),
          dataKey: 'value',
          nameKey: 'name'
        };

      case 'topAlerts':
        const topAlertCounts = {};
        claims.forEach(claim => {
          if (claim.alert && !claim.alert_resolution) {
            topAlertCounts[claim.alert] = (topAlertCounts[claim.alert] || 0) + 1;
          }
        });
        return {
          title: 'Top 10 Open Alerts',
          data: Object.entries(topAlertCounts).map(([alert, count]) => ({
            name: alert,
            value: count
          })).sort((a, b) => b.value - a.value).slice(0, 10),
          dataKey: 'value',
          nameKey: 'name'
        };

      default:
        return { title: 'Chart', data: [], dataKey: 'value', nameKey: 'name' };
    }
  };

  const renderChart = (chart) => {
    // Use new format if metricType exists, otherwise use legacy format
    const chartData = chart.metricType ? getChartData(chart) : getLegacyChartData(chart.metric);
    const colors = ['#222b57', '#56C4B7', '#F59E0B', '#EF4444', '#8B5CF6', '#14B8A6', '#F97316', '#6366F1'];

    switch (chart.type) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey={chartData.dataKey}
              >
                {chartData.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'donut':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey={chartData.dataKey}
              >
                {chartData.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={chartData.nameKey} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={chartData.dataKey} fill="#222b57" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'horizontalBar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" />
              <YAxis dataKey={chartData.nameKey} type="category" tick={{ fontSize: 12 }} width={100} />
              <Tooltip />
              <Bar dataKey={chartData.dataKey} fill="#56C4B7" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'stackedBar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={chartData.nameKey} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={chartData.dataKey} stackId="a" fill="#222b57" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={chartData.nameKey} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={chartData.dataKey} stroke="#222b57" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={chartData.nameKey} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey={chartData.dataKey} stroke="#222b57" fill="#222b57" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  if (enabledCharts.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="text-lg mb-2">No charts configured</p>
        <p className="text-sm">Click "Customize" to add charts to your dashboard</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {enabledCharts.map((chart) => {
        const chartData = chart.metricType ? getChartData(chart) : getLegacyChartData(chart.metric);
        return (
          <Card key={chart.id} className="border-0 shadow-lg bg-white chart-export-card">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-slate-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-slate-800">{chartData.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {renderChart(chart)}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}