import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings2, Plus, X } from 'lucide-react';

export default function CustomizeReportingModal({ open, onClose, config, onSave }) {
  const [localConfig, setLocalConfig] = useState(config);

  const handleSave = () => {
    onSave(localConfig);
    onClose();
  };

  const toggleTile = (tileId) => {
    setLocalConfig({
      ...localConfig,
      tiles: {
        ...localConfig.tiles,
        [tileId]: !localConfig.tiles[tileId]
      }
    });
  };

  const toggleChart = (chartId) => {
    setLocalConfig({
      ...localConfig,
      charts: {
        ...localConfig.charts,
        [chartId]: !localConfig.charts[chartId]
      }
    });
  };

  const selectAllTiles = () => {
    const allTiles = {};
    tiles.forEach(tile => {
      allTiles[tile.id] = true;
    });
    setLocalConfig({
      ...localConfig,
      tiles: allTiles
    });
  };

  const deselectAllTiles = () => {
    const allTiles = {};
    tiles.forEach(tile => {
      allTiles[tile.id] = false;
    });
    setLocalConfig({
      ...localConfig,
      tiles: allTiles
    });
  };



  const tiles = [
    { id: 'total', label: 'Total Claims', color: 'blue' },
    { id: 'in_progress', label: 'In Progress', color: 'blue' },
    { id: 'awaiting_review', label: 'Awaiting Review', color: 'orange' },
    { id: 'completed', label: 'Completed', color: 'emerald' },
    { id: 'rejected', label: 'Rejected', color: 'red' },
    { id: 'open_alerts', label: 'Open Alerts', color: 'amber' },
    { id: 'closed_alerts', label: 'Closed Alerts', color: 'purple' },
    { id: 'total_hours', label: 'Total Hours', color: 'purple' },
    { id: 'total_parts', label: 'Total Parts Cost', color: 'teal' },
    { id: 'total_labour', label: 'Total Labour Cost', color: 'indigo' },
    { id: 'total_subcon', label: 'Total Sub Con Cost', color: 'cyan' },
    { id: 'total_cost', label: 'Total Claim Cost', color: 'pink' }
  ];

  const chartTypes = [
    { value: 'pie', label: 'Pie Chart', description: 'Show proportions as slices' },
    { value: 'donut', label: 'Donut Chart', description: 'Pie chart with center hole' },
    { value: 'bar', label: 'Bar Chart', description: 'Vertical bars for comparison' },
    { value: 'horizontalBar', label: 'Horizontal Bar Chart', description: 'Horizontal bars' },
    { value: 'stackedBar', label: 'Stacked Bar Chart', description: 'Layered bars' },
    { value: 'line', label: 'Line Chart', description: 'Trends over time' },
    { value: 'area', label: 'Area Chart', description: 'Filled line chart' }
  ];

  const metricTypes = [
    { value: 'count', label: 'Count', description: 'Number of claims' },
    { value: 'sum', label: 'Sum', description: 'Total value' },
    { value: 'average', label: 'Average', description: 'Mean value' },
    { value: 'percentage', label: 'Percentage', description: 'Completion rate' }
  ];

  const measureFields = [
    { value: 'total_claim_cost', label: 'Total Claim Cost' },
    { value: 'parts', label: 'Parts Cost' },
    { value: 'labour', label: 'Labour Cost' },
    { value: 'sub_con', label: 'Sub-Con Cost' },
    { value: 'expected_hours', label: 'Expected Hours' }
  ];

  const groupByOptions = [
    { value: 'status', label: 'Status' },
    { value: 'site', label: 'Site' },
    { value: 'brand', label: 'Brand' },
    { value: 'user', label: 'User (Created By)' },
    { value: 'alert', label: 'Alert Type' },
    { value: 'alert_resolution', label: 'Alert Resolution' },
    { value: 'daily', label: 'Daily (Last 30 Days)' },
    { value: 'monthly', label: 'Monthly (Last 12 Months)' }
  ];

  const addChart = () => {
    const currentCharts = localConfig.customCharts || [];
    setLocalConfig({
      ...localConfig,
      customCharts: [
        ...currentCharts,
        { 
          id: Date.now().toString(), 
          type: 'bar', 
          metricType: 'count',
          field: null,
          groupBy: 'status',
          groupBy2: null,
          enabled: true 
        }
      ]
    });
  };

  const removeChart = (chartId) => {
    setLocalConfig({
      ...localConfig,
      customCharts: (localConfig.customCharts || []).filter(c => c.id !== chartId)
    });
  };

  const updateChart = (chartId, field, value) => {
    setLocalConfig({
      ...localConfig,
      customCharts: (localConfig.customCharts || []).map(c =>
        c.id === chartId ? { ...c, [field]: value } : c
      )
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Customize Reporting Dashboard
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="tiles" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tiles">Tiles</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
          </TabsList>

          <TabsContent value="tiles" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">Select which metric tiles to display</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAllTiles}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={deselectAllTiles}>
                  Unselect All
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {tiles.map((tile) => (
                <div key={tile.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-slate-50">
                  <Checkbox
                    id={tile.id}
                    checked={localConfig.tiles[tile.id] ?? true}
                    onCheckedChange={() => toggleTile(tile.id)}
                  />
                  <Label htmlFor={tile.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full bg-${tile.color}-500`} />
                      {tile.label}
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="charts" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">Configure charts for your dashboard</p>
              <Button variant="outline" size="sm" onClick={addChart} className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Chart
              </Button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {(localConfig.customCharts || []).map((chart, index) => (
                <div key={chart.id} className="p-4 border rounded-lg bg-slate-50">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={chart.enabled ?? true}
                      onCheckedChange={(checked) => updateChart(chart.id, 'enabled', checked)}
                    />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Chart {index + 1}</Label>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeChart(chart.id)}
                          className="h-6 w-6 text-slate-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs text-slate-600 font-medium">Chart Type</Label>
                          <Select
                            value={chart.type}
                            onValueChange={(value) => updateChart(chart.id, 'type', value)}
                          >
                            <SelectTrigger className="h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-72">
                              {chartTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex flex-col items-start">
                                    <span className="font-medium">{type.label}</span>
                                    <span className="text-xs text-slate-500">{type.description}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-1.5">
                          <Label className="text-xs text-slate-600 font-medium">Metric Type</Label>
                          <Select
                            value={chart.metricType || 'count'}
                            onValueChange={(value) => updateChart(chart.id, 'metricType', value)}
                          >
                            <SelectTrigger className="h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {metricTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex flex-col items-start">
                                    <span className="font-medium">{type.label}</span>
                                    <span className="text-xs text-slate-500">{type.description}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {(chart.metricType === 'sum' || chart.metricType === 'average') && (
                          <div className="space-y-1.5">
                            <Label className="text-xs text-slate-600 font-medium">Field to Measure</Label>
                            <Select
                              value={chart.field || ''}
                              onValueChange={(value) => updateChart(chart.id, 'field', value)}
                            >
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Select field..." />
                              </SelectTrigger>
                              <SelectContent>
                                {measureFields.map((field) => (
                                  <SelectItem key={field.value} value={field.value}>
                                    {field.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <Label className="text-xs text-slate-600 font-medium">Group By</Label>
                          <Select
                            value={chart.groupBy || 'status'}
                            onValueChange={(value) => updateChart(chart.id, 'groupBy', value)}
                          >
                            <SelectTrigger className="h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {groupByOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs text-slate-600 font-medium">Secondary Group By (Optional)</Label>
                          <Select
                            value={chart.groupBy2 || ''}
                            onValueChange={(value) => updateChart(chart.id, 'groupBy2', value || null)}
                          >
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={null}>None</SelectItem>
                              {groupByOptions.filter(option => option.value !== chart.groupBy).map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {(!localConfig.customCharts || localConfig.customCharts.length === 0) && (
                <div className="text-center py-8 text-slate-400 text-sm">
                  No charts configured. Click "Add Chart" to get started.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}