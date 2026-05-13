(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomizeReportingModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/dialog.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/button.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/label.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/checkbox.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$tabs$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/tabs.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/select.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/settings-2.js [client] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/plus.js [client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
function CustomizeReportingModal({ open, onClose, config, onSave }) {
    _s();
    const [localConfig, setLocalConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(config);
    const handleSave = ()=>{
        onSave(localConfig);
        onClose();
    };
    const toggleTile = (tileId)=>{
        setLocalConfig({
            ...localConfig,
            tiles: {
                ...localConfig.tiles,
                [tileId]: !localConfig.tiles[tileId]
            }
        });
    };
    const toggleChart = (chartId)=>{
        setLocalConfig({
            ...localConfig,
            charts: {
                ...localConfig.charts,
                [chartId]: !localConfig.charts[chartId]
            }
        });
    };
    const selectAllTiles = ()=>{
        const allTiles = {};
        tiles.forEach((tile)=>{
            allTiles[tile.id] = true;
        });
        setLocalConfig({
            ...localConfig,
            tiles: allTiles
        });
    };
    const deselectAllTiles = ()=>{
        const allTiles = {};
        tiles.forEach((tile)=>{
            allTiles[tile.id] = false;
        });
        setLocalConfig({
            ...localConfig,
            tiles: allTiles
        });
    };
    const tiles = [
        {
            id: 'total',
            label: 'Total Claims',
            color: 'blue'
        },
        {
            id: 'in_progress',
            label: 'In Progress',
            color: 'blue'
        },
        {
            id: 'awaiting_review',
            label: 'Awaiting Review',
            color: 'orange'
        },
        {
            id: 'completed',
            label: 'Completed',
            color: 'emerald'
        },
        {
            id: 'rejected',
            label: 'Rejected',
            color: 'red'
        },
        {
            id: 'open_alerts',
            label: 'Open Alerts',
            color: 'amber'
        },
        {
            id: 'closed_alerts',
            label: 'Closed Alerts',
            color: 'purple'
        },
        {
            id: 'total_hours',
            label: 'Total Hours',
            color: 'purple'
        },
        {
            id: 'total_parts',
            label: 'Total Parts Cost',
            color: 'teal'
        },
        {
            id: 'total_labour',
            label: 'Total Labour Cost',
            color: 'indigo'
        },
        {
            id: 'total_subcon',
            label: 'Total Sub Con Cost',
            color: 'cyan'
        },
        {
            id: 'total_cost',
            label: 'Total Claim Cost',
            color: 'pink'
        }
    ];
    const chartTypes = [
        {
            value: 'pie',
            label: 'Pie Chart',
            description: 'Show proportions as slices'
        },
        {
            value: 'donut',
            label: 'Donut Chart',
            description: 'Pie chart with center hole'
        },
        {
            value: 'bar',
            label: 'Bar Chart',
            description: 'Vertical bars for comparison'
        },
        {
            value: 'horizontalBar',
            label: 'Horizontal Bar Chart',
            description: 'Horizontal bars'
        },
        {
            value: 'stackedBar',
            label: 'Stacked Bar Chart',
            description: 'Layered bars'
        },
        {
            value: 'line',
            label: 'Line Chart',
            description: 'Trends over time'
        },
        {
            value: 'area',
            label: 'Area Chart',
            description: 'Filled line chart'
        }
    ];
    const metricTypes = [
        {
            value: 'count',
            label: 'Count',
            description: 'Number of claims'
        },
        {
            value: 'sum',
            label: 'Sum',
            description: 'Total value'
        },
        {
            value: 'average',
            label: 'Average',
            description: 'Mean value'
        },
        {
            value: 'percentage',
            label: 'Percentage',
            description: 'Completion rate'
        }
    ];
    const measureFields = [
        {
            value: 'total_claim_cost',
            label: 'Total Claim Cost'
        },
        {
            value: 'parts',
            label: 'Parts Cost'
        },
        {
            value: 'labour',
            label: 'Labour Cost'
        },
        {
            value: 'sub_con',
            label: 'Sub-Con Cost'
        },
        {
            value: 'expected_hours',
            label: 'Expected Hours'
        }
    ];
    const groupByOptions = [
        {
            value: 'status',
            label: 'Status'
        },
        {
            value: 'site',
            label: 'Site'
        },
        {
            value: 'brand',
            label: 'Brand'
        },
        {
            value: 'user',
            label: 'User (Created By)'
        },
        {
            value: 'alert',
            label: 'Alert Type'
        },
        {
            value: 'alert_resolution',
            label: 'Alert Resolution'
        },
        {
            value: 'daily',
            label: 'Daily (Last 30 Days)'
        },
        {
            value: 'monthly',
            label: 'Monthly (Last 12 Months)'
        }
    ];
    const addChart = ()=>{
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
    const removeChart = (chartId)=>{
        setLocalConfig({
            ...localConfig,
            customCharts: (localConfig.customCharts || []).filter((c)=>c.id !== chartId)
        });
    };
    const updateChart = (chartId, field, value)=>{
        setLocalConfig({
            ...localConfig,
            customCharts: (localConfig.customCharts || []).map((c)=>c.id === chartId ? {
                    ...c,
                    [field]: value
                } : c)
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this),
                            "Customize Reporting Dashboard"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$tabs$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Tabs"], {
                    defaultValue: "tiles",
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$tabs$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["TabsList"], {
                            className: "grid w-full grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$tabs$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                    value: "tiles",
                                    children: "Tiles"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$tabs$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                    value: "charts",
                                    children: "Charts"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$tabs$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                            value: "tiles",
                            className: "space-y-4 mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-600",
                                            children: "Select which metric tiles to display"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                            lineNumber: 166,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    size: "sm",
                                                    onClick: selectAllTiles,
                                                    children: "Select All"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                    lineNumber: 168,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    size: "sm",
                                                    onClick: deselectAllTiles,
                                                    children: "Unselect All"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                    lineNumber: 171,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto",
                                    children: tiles.map((tile)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-2 p-3 border rounded-lg hover:bg-slate-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                    id: tile.id,
                                                    checked: localConfig.tiles[tile.id] ?? true,
                                                    onCheckedChange: ()=>toggleTile(tile.id)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                    lineNumber: 179,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: tile.id,
                                                    className: "flex-1 cursor-pointer",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `h-3 w-3 rounded-full bg-${tile.color}-500`
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                lineNumber: 186,
                                                                columnNumber: 23
                                                            }, this),
                                                            tile.label
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                        lineNumber: 185,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                    lineNumber: 184,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, tile.id, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$tabs$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                            value: "charts",
                            className: "space-y-4 mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-600",
                                            children: "Configure charts for your dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                            lineNumber: 197,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            onClick: addChart,
                                            className: "flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                    lineNumber: 199,
                                                    columnNumber: 17
                                                }, this),
                                                "Add Chart"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                            lineNumber: 198,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                    lineNumber: 196,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 max-h-96 overflow-y-auto",
                                    children: [
                                        (localConfig.customCharts || []).map((chart, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border rounded-lg bg-slate-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                            checked: chart.enabled ?? true,
                                                            onCheckedChange: (checked)=>updateChart(chart.id, 'enabled', checked)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                            lineNumber: 207,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 space-y-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                            className: "text-sm font-medium",
                                                                            children: [
                                                                                "Chart ",
                                                                                index + 1
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                            lineNumber: 213,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "ghost",
                                                                            size: "icon",
                                                                            onClick: ()=>removeChart(chart.id),
                                                                            className: "h-6 w-6 text-slate-400 hover:text-red-500",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                lineNumber: 220,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                            lineNumber: 214,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                    lineNumber: 212,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-1.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                                    className: "text-xs text-slate-600 font-medium",
                                                                                    children: "Chart Type"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                    lineNumber: 225,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                                    value: chart.type,
                                                                                    onValueChange: (value)=>updateChart(chart.id, 'type', value),
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                            className: "h-10",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                lineNumber: 231,
                                                                                                columnNumber: 31
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                            lineNumber: 230,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                            className: "max-h-72",
                                                                                            children: chartTypes.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                    value: type.value,
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "flex flex-col items-start",
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                className: "font-medium",
                                                                                                                children: type.label
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                                lineNumber: 237,
                                                                                                                columnNumber: 37
                                                                                                            }, this),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                className: "text-xs text-slate-500",
                                                                                                                children: type.description
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                                lineNumber: 238,
                                                                                                                columnNumber: 37
                                                                                                            }, this)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                        lineNumber: 236,
                                                                                                        columnNumber: 35
                                                                                                    }, this)
                                                                                                }, type.value, false, {
                                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                    lineNumber: 235,
                                                                                                    columnNumber: 33
                                                                                                }, this))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                            lineNumber: 233,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                    lineNumber: 226,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                            lineNumber: 224,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-1.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                                    className: "text-xs text-slate-600 font-medium",
                                                                                    children: "Metric Type"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                    lineNumber: 247,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                                    value: chart.metricType || 'count',
                                                                                    onValueChange: (value)=>updateChart(chart.id, 'metricType', value),
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                            className: "h-10",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                lineNumber: 253,
                                                                                                columnNumber: 31
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                            lineNumber: 252,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                            children: metricTypes.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                    value: type.value,
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "flex flex-col items-start",
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                className: "font-medium",
                                                                                                                children: type.label
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                                lineNumber: 259,
                                                                                                                columnNumber: 37
                                                                                                            }, this),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                className: "text-xs text-slate-500",
                                                                                                                children: type.description
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                                lineNumber: 260,
                                                                                                                columnNumber: 37
                                                                                                            }, this)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                        lineNumber: 258,
                                                                                                        columnNumber: 35
                                                                                                    }, this)
                                                                                                }, type.value, false, {
                                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                    lineNumber: 257,
                                                                                                    columnNumber: 33
                                                                                                }, this))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                            lineNumber: 255,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                    lineNumber: 248,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                            lineNumber: 246,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        (chart.metricType === 'sum' || chart.metricType === 'average') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-1.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                                    className: "text-xs text-slate-600 font-medium",
                                                                                    children: "Field to Measure"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                    lineNumber: 270,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                                    value: chart.field || '',
                                                                                    onValueChange: (value)=>updateChart(chart.id, 'field', value),
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                            className: "h-10",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                                placeholder: "Select field..."
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                lineNumber: 276,
                                                                                                columnNumber: 33
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                            lineNumber: 275,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                            children: measureFields.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                    value: field.value,
                                                                                                    children: field.label
                                                                                                }, field.value, false, {
                                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                    lineNumber: 280,
                                                                                                    columnNumber: 35
                                                                                                }, this))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                            lineNumber: 278,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                    lineNumber: 271,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                            lineNumber: 269,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-1.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                                    className: "text-xs text-slate-600 font-medium",
                                                                                    children: "Group By"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                    lineNumber: 290,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                                    value: chart.groupBy || 'status',
                                                                                    onValueChange: (value)=>updateChart(chart.id, 'groupBy', value),
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                            className: "h-10",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                lineNumber: 296,
                                                                                                columnNumber: 31
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                            lineNumber: 295,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                            children: groupByOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                    value: option.value,
                                                                                                    children: option.label
                                                                                                }, option.value, false, {
                                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                    lineNumber: 300,
                                                                                                    columnNumber: 33
                                                                                                }, this))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                            lineNumber: 298,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                    lineNumber: 291,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                            lineNumber: 289,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-1.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                                    className: "text-xs text-slate-600 font-medium",
                                                                                    children: "Secondary Group By (Optional)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                    lineNumber: 309,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                                    value: chart.groupBy2 || '',
                                                                                    onValueChange: (value)=>updateChart(chart.id, 'groupBy2', value || null),
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                            className: "h-10",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                                placeholder: "None"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                lineNumber: 315,
                                                                                                columnNumber: 31
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                            lineNumber: 314,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                    value: null,
                                                                                                    children: "None"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                    lineNumber: 318,
                                                                                                    columnNumber: 31
                                                                                                }, this),
                                                                                                groupByOptions.filter((option)=>option.value !== chart.groupBy).map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                        value: option.value,
                                                                                                        children: option.label
                                                                                                    }, option.value, false, {
                                                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                                        lineNumber: 320,
                                                                                                        columnNumber: 33
                                                                                                    }, this))
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                            lineNumber: 317,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                                    lineNumber: 310,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                            lineNumber: 308,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                                    lineNumber: 223,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                            lineNumber: 211,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                    lineNumber: 206,
                                                    columnNumber: 19
                                                }, this)
                                            }, chart.id, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                                lineNumber: 205,
                                                columnNumber: 17
                                            }, this)),
                                        (!localConfig.customCharts || localConfig.customCharts.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-8 text-slate-400 text-sm",
                                            children: 'No charts configured. Click "Add Chart" to get started.'
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                            lineNumber: 333,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                            lineNumber: 195,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: onClose,
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleSave,
                            className: "bg-blue-600 hover:bg-blue-700",
                            children: "Save Changes"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                            lineNumber: 345,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
                    lineNumber: 341,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
            lineNumber: 150,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/CustomizeReportingModal.jsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_s(CustomizeReportingModal, "F+tll1s5wBYlBr0keEtyzOpgjnU=");
_c = CustomizeReportingModal;
var _c;
__turbopack_context__.k.register(_c, "CustomizeReportingModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LagTimeSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/card.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/chart/BarChart.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/Bar.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/XAxis.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/YAxis.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/CartesianGrid.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/component/Tooltip.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/component/ResponsiveContainer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/chart/PieChart.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/polar/Pie.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/component/Cell.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/component/Legend.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/clock.js [client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/trending-up.js [client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/users.js [client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$differenceInDays$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/date-fns/differenceInDays.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/date-fns/startOfWeek.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/date-fns/startOfMonth.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/date-fns/format.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/date-fns/isValid.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const HENDY_BLUE = '#222b57';
const HENDY_TEAL = '#56C4B7';
const COLORS = [
    HENDY_BLUE,
    HENDY_TEAL,
    '#f59e0b',
    '#ef4444',
    '#8b5cf6'
];
function avgDays(arr) {
    const valid = arr.filter((v)=>v != null && !isNaN(v) && v >= 0);
    if (!valid.length) return null;
    return (valid.reduce((a, b)=>a + b, 0) / valid.length).toFixed(1);
}
function getLagBuckets(claims, dateKey1, dateKey2) {
    const daily = {}, weekly = {}, monthly = {};
    claims.forEach((c)=>{
        if (!c[dateKey1] || !c[dateKey2]) return;
        const d1 = new Date(c[dateKey1]);
        const d2 = new Date(c[dateKey2]);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["isValid"])(d1) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["isValid"])(d2)) return;
        const diff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$differenceInDays$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["differenceInDays"])(d2, d1);
        if (diff < 0) return;
        const dayKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(d2, 'dd/MM');
        const weekKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["startOfWeek"])(d2, {
            weekStartsOn: 1
        }), 'dd/MM');
        const monthKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["startOfMonth"])(d2), 'MMM yy');
        if (!daily[dayKey]) daily[dayKey] = [];
        if (!weekly[weekKey]) weekly[weekKey] = [];
        if (!monthly[monthKey]) monthly[monthKey] = [];
        daily[dayKey].push(diff);
        weekly[weekKey].push(diff);
        monthly[monthKey].push(diff);
    });
    const toArr = (obj)=>Object.entries(obj).slice(-12).map(([k, v])=>({
                period: k,
                avgDays: parseFloat(avgDays(v)) || 0,
                count: v.length
            }));
    return {
        daily: toArr(daily),
        weekly: toArr(weekly),
        monthly: toArr(monthly)
    };
}
function LagChart({ data, title, color }) {
    if (!data.length) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "text-sm text-slate-400 text-center py-4",
        children: "No data available"
    }, void 0, false, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
        lineNumber: 41,
        columnNumber: 28
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
        width: "100%",
        height: 200,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BarChart"], {
            data: data,
            margin: {
                top: 4,
                right: 8,
                left: -10,
                bottom: 4
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                    strokeDasharray: "3 3",
                    stroke: "#f0f0f0"
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$client$5d$__$28$ecmascript$29$__["XAxis"], {
                    dataKey: "period",
                    tick: {
                        fontSize: 10
                    }
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$client$5d$__$28$ecmascript$29$__["YAxis"], {
                    tick: {
                        fontSize: 10
                    },
                    unit: "d"
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                    formatter: (v)=>[
                            `${v} days`,
                            'Avg Lag'
                        ]
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Bar"], {
                    dataKey: "avgDays",
                    fill: color,
                    radius: [
                        3,
                        3,
                        0,
                        0
                    ]
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
            lineNumber: 44,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = LagChart;
function LagTimeSection({ claims }) {
    _s();
    const [siteLagView, setSiteLagView] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState('monthly');
    const [claimLagView, setClaimLagView] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState('monthly');
    // Site lag: last_clocking_date (completion) → scanned_date (upload)
    const siteLagBuckets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LagTimeSection.useMemo[siteLagBuckets]": ()=>getLagBuckets(claims, 'last_clocking_date', 'scanned_date')
    }["LagTimeSection.useMemo[siteLagBuckets]"], [
        claims
    ]);
    // Claim lag: scanned_date (upload) → claimed_date (claiming)
    const claimLagBuckets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LagTimeSection.useMemo[claimLagBuckets]": ()=>getLagBuckets(claims, 'scanned_date', 'claimed_date')
    }["LagTimeSection.useMemo[claimLagBuckets]"], [
        claims
    ]);
    // Site lag by site
    const siteLagBySite = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LagTimeSection.useMemo[siteLagBySite]": ()=>{
            const map = {};
            claims.forEach({
                "LagTimeSection.useMemo[siteLagBySite]": (c)=>{
                    if (!c.last_clocking_date || !c.scanned_date) return;
                    const d1 = new Date(c.last_clocking_date), d2 = new Date(c.scanned_date);
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["isValid"])(d1) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["isValid"])(d2)) return;
                    const diff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$differenceInDays$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["differenceInDays"])(d2, d1);
                    if (diff < 0) return;
                    if (!map[c.site]) map[c.site] = [];
                    map[c.site].push(diff);
                }
            }["LagTimeSection.useMemo[siteLagBySite]"]);
            return Object.entries(map).map({
                "LagTimeSection.useMemo[siteLagBySite]": ([site, vals])=>({
                        site,
                        avgDays: parseFloat(avgDays(vals)) || 0,
                        count: vals.length
                    })
            }["LagTimeSection.useMemo[siteLagBySite]"]);
        }
    }["LagTimeSection.useMemo[siteLagBySite]"], [
        claims
    ]);
    // RFT error rates
    const rftStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LagTimeSection.useMemo[rftStats]": ()=>{
            const total = claims.length;
            const withAlert = claims.filter({
                "LagTimeSection.useMemo[rftStats]": (c)=>c.alert
            }["LagTimeSection.useMemo[rftStats]"]).length;
            const actioned = claims.filter({
                "LagTimeSection.useMemo[rftStats]": (c)=>c.alert && c.alert_resolution && c.alert_resolution !== 'Non-actionable'
            }["LagTimeSection.useMemo[rftStats]"]).length;
            const notActioned = claims.filter({
                "LagTimeSection.useMemo[rftStats]": (c)=>c.alert && (!c.alert_resolution || c.alert_resolution === 'Non-actionable')
            }["LagTimeSection.useMemo[rftStats]"]).length;
            const claimed = claims.filter({
                "LagTimeSection.useMemo[rftStats]": (c)=>c.alert && c.claimed
            }["LagTimeSection.useMemo[rftStats]"]).length;
            const lost = claims.filter({
                "LagTimeSection.useMemo[rftStats]": (c)=>c.alert && c.status === 'rejected'
            }["LagTimeSection.useMemo[rftStats]"]).length;
            return [
                {
                    name: 'No Alert',
                    value: total - withAlert
                },
                {
                    name: 'Actioned/Claimed',
                    value: actioned
                },
                {
                    name: 'Not Actioned',
                    value: notActioned
                },
                {
                    name: 'Lost/Rejected',
                    value: lost
                }
            ].filter({
                "LagTimeSection.useMemo[rftStats]": (d)=>d.value > 0
            }["LagTimeSection.useMemo[rftStats]"]);
        }
    }["LagTimeSection.useMemo[rftStats]"], [
        claims
    ]);
    // Admin throughput by user/site
    const throughputBySite = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LagTimeSection.useMemo[throughputBySite]": ()=>{
            const map = {};
            claims.forEach({
                "LagTimeSection.useMemo[throughputBySite]": (c)=>{
                    const key = c.site || 'Unknown';
                    if (!map[key]) map[key] = 0;
                    map[key]++;
                }
            }["LagTimeSection.useMemo[throughputBySite]"]);
            return Object.entries(map).map({
                "LagTimeSection.useMemo[throughputBySite]": ([site, count])=>({
                        site,
                        count
                    })
            }["LagTimeSection.useMemo[throughputBySite]"]).sort({
                "LagTimeSection.useMemo[throughputBySite]": (a, b)=>b.count - a.count
            }["LagTimeSection.useMemo[throughputBySite]"]);
        }
    }["LagTimeSection.useMemo[throughputBySite]"], [
        claims
    ]);
    const ViewToggle = ({ value, onChange })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-1 text-xs",
            children: [
                'daily',
                'weekly',
                'monthly'
            ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onChange(v),
                    className: `px-2 py-1 rounded capitalize transition-colors ${value === v ? 'text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`,
                    style: value === v ? {
                        backgroundColor: HENDY_BLUE
                    } : {},
                    children: v
                }, v, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this))
        }, void 0, false, {
            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
            lineNumber: 107,
            columnNumber: 5
        }, this);
    const overallSiteLag = avgDays(claims.filter((c)=>c.last_clocking_date && c.scanned_date).map((c)=>{
        const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$differenceInDays$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["differenceInDays"])(new Date(c.scanned_date), new Date(c.last_clocking_date));
        return d >= 0 ? d : null;
    }));
    const overallClaimLag = avgDays(claims.filter((c)=>c.scanned_date && c.claimed_date).map((c)=>{
        const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$differenceInDays$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["differenceInDays"])(new Date(c.claimed_date), new Date(c.scanned_date));
        return d >= 0 ? d : null;
    }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 mt-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-8 w-8 rounded-lg flex items-center justify-center",
                        style: {
                            backgroundColor: HENDY_BLUE
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                            className: "h-4 w-4 text-white"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold",
                        style: {
                            color: HENDY_BLUE
                        },
                        children: "Availability & Performance"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-0 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "pb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        className: "h-4 w-4",
                                                        style: {
                                                            color: HENDY_TEAL
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                        lineNumber: 143,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                        className: "text-base",
                                                        children: "Site Lag Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                        lineNumber: 144,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-slate-400",
                                                        children: "(Completion → Upload)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                        lineNumber: 145,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 142,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ViewToggle, {
                                                value: siteLagView,
                                                onChange: setSiteLagView
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 147,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    overallSiteLag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-500",
                                        children: [
                                            "Overall avg: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                style: {
                                                    color: HENDY_BLUE
                                                },
                                                children: [
                                                    overallSiteLag,
                                                    " days"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 150,
                                                columnNumber: 66
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LagChart, {
                                        data: siteLagBuckets[siteLagView],
                                        color: HENDY_TEAL
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this),
                                    siteLagBySite.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold text-slate-500 mb-2",
                                                children: "By Site"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 157,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: siteLagBySite.map(({ site, avgDays, count })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-600 truncate max-w-[160px]",
                                                                children: site
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                                lineNumber: 161,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-slate-400",
                                                                        children: [
                                                                            count,
                                                                            " claims"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                                        lineNumber: 163,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold w-16 text-right",
                                                                        style: {
                                                                            color: HENDY_BLUE
                                                                        },
                                                                        children: [
                                                                            avgDays,
                                                                            "d avg"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                                        lineNumber: 164,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                                lineNumber: 162,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, site, true, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                        lineNumber: 160,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 158,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-0 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "pb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        className: "h-4 w-4",
                                                        style: {
                                                            color: HENDY_BLUE
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                        lineNumber: 179,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                        className: "text-base",
                                                        children: "Claim Lag Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                        lineNumber: 180,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-slate-400",
                                                        children: "(Upload → Claiming)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                        lineNumber: 181,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 178,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ViewToggle, {
                                                value: claimLagView,
                                                onChange: setClaimLagView
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 183,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this),
                                    overallClaimLag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-500",
                                        children: [
                                            "Overall avg: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                style: {
                                                    color: HENDY_BLUE
                                                },
                                                children: [
                                                    overallClaimLag,
                                                    " days"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 186,
                                                columnNumber: 66
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LagChart, {
                                    data: claimLagBuckets[claimLagView],
                                    color: HENDY_BLUE
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                    lineNumber: 190,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-0 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "pb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                className: "h-4 w-4 text-amber-500"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 198,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-base",
                                                children: "RFT Error Rates"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 199,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-400",
                                        children: "Actioned/claimed vs not represented/lost"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: [
                                    rftStats.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: 180,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PieChart"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Pie"], {
                                                        data: rftStats,
                                                        dataKey: "value",
                                                        nameKey: "name",
                                                        cx: "50%",
                                                        cy: "50%",
                                                        outerRadius: 70,
                                                        label: ({ name, percent })=>`${(percent * 100).toFixed(0)}%`,
                                                        labelLine: false,
                                                        children: rftStats.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                                fill: COLORS[i % COLORS.length]
                                                            }, i, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                                lineNumber: 209,
                                                                columnNumber: 47
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                        lineNumber: 208,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                        lineNumber: 211,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                        iconSize: 10,
                                                        wrapperStyle: {
                                                            fontSize: 11
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                        lineNumber: 212,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 207,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                            lineNumber: 206,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 205,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-400 text-center py-8",
                                        children: "No alert data available"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2 mt-2",
                                        children: rftStats.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between bg-slate-50 rounded px-3 py-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-slate-600",
                                                        children: d.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                        lineNumber: 222,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-bold",
                                                        style: {
                                                            color: COLORS[i % COLORS.length]
                                                        },
                                                        children: d.value
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                        lineNumber: 223,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, d.name, true, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 221,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-0 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "pb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                className: "h-4 w-4",
                                                style: {
                                                    color: HENDY_TEAL
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 234,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-base",
                                                children: "Administration Throughput"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 235,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-400",
                                        children: "Claims loaded per site"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: throughputBySite.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: 200,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                        data: throughputBySite,
                                        layout: "vertical",
                                        margin: {
                                            top: 4,
                                            right: 16,
                                            left: 40,
                                            bottom: 4
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                strokeDasharray: "3 3",
                                                stroke: "#f0f0f0",
                                                horizontal: false
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 243,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                type: "number",
                                                tick: {
                                                    fontSize: 10
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 244,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                type: "category",
                                                dataKey: "site",
                                                tick: {
                                                    fontSize: 10
                                                },
                                                width: 80
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 245,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 246,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                dataKey: "count",
                                                fill: HENDY_TEAL,
                                                radius: [
                                                    0,
                                                    3,
                                                    3,
                                                    0
                                                ],
                                                label: {
                                                    position: 'right',
                                                    fontSize: 10
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                                lineNumber: 247,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                        lineNumber: 242,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                    lineNumber: 241,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-400 text-center py-8",
                                    children: "No data"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                    lineNumber: 251,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/reporting/LagTimeSection.jsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s(LagTimeSection, "PWMTVGlmgVLorBIp2qI2nU0JN1c=");
_c1 = LagTimeSection;
var _c, _c1;
__turbopack_context__.k.register(_c, "LagChart");
__turbopack_context__.k.register(_c1, "LagTimeSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_Dev_Hendy_Warranty-Claim-Tracker_src_components_reporting_0spngfe._.js.map