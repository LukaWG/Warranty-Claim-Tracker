module.exports = [
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/HendyLogo.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HendyLogo
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function HendyLogo({ size = 36, variant = 'full' }) {
    const logoUrl = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942a96650c5da106024b0dd/9d30dbdcc_logo2.png';
    if (variant === 'icon') {
        // Icon variant - just the car illustration part
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "rounded-lg overflow-hidden flex items-center justify-center",
            style: {
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: '#222b57'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                src: logoUrl,
                alt: "Hendy",
                className: "w-full h-full object-contain p-1"
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/HendyLogo.jsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/HendyLogo.jsx",
            lineNumber: 9,
            columnNumber: 7
        }, this);
    }
    // Full logo
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
        src: logoUrl,
        alt: "Hendy Logo",
        style: {
            height: `${size}px`
        },
        className: "object-contain"
    }, void 0, false, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/HendyLogo.jsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>SearchModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/dialog.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/input.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/table.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$badge$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/badge.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/search.js [ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/map-pin.js [ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/circle-alert.js [ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [ssr] (ecmascript) <export default as ArrowUpDown>");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__ = __turbopack_context__.i("[externals]/@tanstack/react-query [external] (@tanstack/react-query, esm_import, [project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/api/base44Client.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/date-fns/format.mjs [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/utils/index.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$badge$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$badge$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
;
const statusConfig = {
    in_progress: {
        label: "In Progress",
        className: "bg-blue-50 border-blue-200",
        style: {
            color: '#222b57'
        }
    },
    completed: {
        label: "Completed",
        className: "bg-teal-50 border-teal-200",
        style: {
            color: '#56C4B7'
        }
    },
    rejected: {
        label: "Rejected",
        className: "bg-red-100 text-red-700 border-red-200"
    }
};
function SearchModal({ open, onClose }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [sortColumn, setSortColumn] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('created_date');
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('desc');
    const { data: claims = [], isLoading } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            'claims'
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["base44"].entities.WarrantyClaim.list('-created_date'),
        enabled: open
    });
    const filteredClaims = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        if (!searchQuery.trim()) return claims;
        const query = searchQuery.toLowerCase();
        return claims.filter((claim)=>{
            const wipMatch = claim.wip_number?.toLowerCase().includes(query);
            const siteMatch = claim.site?.toLowerCase().includes(query);
            const alertMatch = claim.alert?.toLowerCase().includes(query);
            const resolutionMatch = claim.alert_resolution?.toLowerCase().includes(query);
            return wipMatch || siteMatch || alertMatch || resolutionMatch;
        });
    }, [
        claims,
        searchQuery
    ]);
    const sortedClaims = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const sorted = [
            ...filteredClaims
        ];
        sorted.sort((a, b)=>{
            let aVal = a[sortColumn];
            let bVal = b[sortColumn];
            if (sortColumn === 'created_date') {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            }
            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [
        filteredClaims,
        sortColumn,
        sortDirection
    ]);
    const handleSort = (column)=>{
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };
    const handleClaimClick = (claim)=>{
        router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createPageUrl"])('Dashboard'));
        onClose();
    };
    const formatDate = (dateString)=>{
        if (!dateString) return "—";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(dateString), "MMM d, yyyy");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-6xl max-h-[85vh] overflow-hidden flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "text-2xl",
                        children: "Search Claims"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "relative mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Input"], {
                            placeholder: "Search by WIP number, site, alert, or resolution...",
                            value: searchQuery,
                            onChange: (e)=>setSearchQuery(e.target.value),
                            className: "pl-10 h-12",
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-auto",
                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center py-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                            lineNumber: 103,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                        lineNumber: 102,
                        columnNumber: 13
                    }, this) : sortedClaims.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center py-16 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "h-8 w-8 text-slate-400"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                    lineNumber: 108,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                lineNumber: 107,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-slate-600 font-medium",
                                children: searchQuery ? 'No claims found' : 'Start typing to search'
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400 mt-1",
                                children: searchQuery ? 'Try a different search term' : 'Search by WIP number, site, or alert'
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                        lineNumber: 106,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "border rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Table"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHeader"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                        className: "bg-slate-50/50 hover:bg-slate-50/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                className: "font-semibold text-slate-600 cursor-pointer",
                                                onClick: ()=>handleSort('wip_number'),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        "WIP Number",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
                                                            className: "h-3 w-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                            lineNumber: 128,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                    lineNumber: 126,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                lineNumber: 122,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                className: "font-semibold text-slate-600 cursor-pointer",
                                                onClick: ()=>handleSort('site'),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        "Site",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
                                                            className: "h-3 w-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                            lineNumber: 137,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                    lineNumber: 135,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                lineNumber: 131,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                className: "font-semibold text-slate-600",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                lineNumber: 140,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                className: "font-semibold text-slate-600",
                                                children: "Alert"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                lineNumber: 141,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                className: "font-semibold text-slate-600",
                                                children: "Resolution"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                lineNumber: 142,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                className: "font-semibold text-slate-600 cursor-pointer",
                                                onClick: ()=>handleSort('created_date'),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        "Created",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
                                                            className: "h-3 w-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                            lineNumber: 149,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                    lineNumber: 147,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                lineNumber: 143,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                        lineNumber: 121,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                    lineNumber: 120,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                    children: sortedClaims.map((claim)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                            className: "cursor-pointer hover:bg-slate-50/50",
                                            onClick: ()=>handleClaimClick(claim),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    className: "font-medium text-slate-800",
                                                    children: claim.wip_number
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                    lineNumber: 161,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-slate-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                className: "h-4 w-4 text-slate-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                                lineNumber: 166,
                                                                columnNumber: 27
                                                            }, this),
                                                            claim.site
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                        lineNumber: 165,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                    lineNumber: 164,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$badge$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                        variant: "outline",
                                                        className: `${statusConfig[claim.status]?.className} border font-medium`,
                                                        style: statusConfig[claim.status]?.style,
                                                        children: statusConfig[claim.status]?.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                        lineNumber: 171,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                    lineNumber: 170,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    children: claim.alert ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                className: "h-4 w-4 text-amber-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                                lineNumber: 182,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-slate-700",
                                                                children: claim.alert
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                                lineNumber: 183,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                        lineNumber: 181,
                                                        columnNumber: 27
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-400",
                                                        children: "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                        lineNumber: 186,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                    lineNumber: 179,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    className: "text-slate-600",
                                                    children: claim.alert_resolution || "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                    lineNumber: 189,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    className: "text-slate-600",
                                                    children: formatDate(claim.created_date)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                                    lineNumber: 192,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, claim.id, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                            lineNumber: 156,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                                    lineNumber: 154,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                            lineNumber: 119,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                        lineNumber: 118,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "text-sm text-slate-500 mt-4 pt-4 border-t",
                    children: [
                        "Showing ",
                        sortedClaims.length,
                        " of ",
                        claims.length,
                        " claims"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
                    lineNumber: 203,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>EditBrandModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/dialog.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/button.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/input.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/label.jsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function EditBrandModal({ brand, open, onOpenChange, onSave, isPending }) {
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (brand) {
            setFormData({
                name: brand.name,
                manufacturer_deadline_days: brand.manufacturer_deadline_days || '',
                green_max_days: brand.green_max_days || '',
                green_min_days: brand.green_min_days || '',
                amber_max_days: brand.amber_max_days || '',
                amber_min_days: brand.amber_min_days || '',
                red_max_days: brand.red_max_days || '',
                red_min_days: brand.red_min_days || ''
            });
        }
    }, [
        brand
    ]);
    const handleSubmit = (e)=>{
        e.preventDefault();
        onSave(formData);
    };
    const handleChange = (field, value)=>{
        setFormData((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    if (!formData) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        children: [
                            "Edit Brand: ",
                            formData.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-sm",
                                            children: "Brand Name"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                            lineNumber: 49,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            placeholder: "Brand name",
                                            value: formData.name,
                                            onChange: (e)=>handleChange('name', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                            lineNumber: 50,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-sm",
                                            children: "Deadline Days"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "number",
                                            min: "0",
                                            placeholder: "Days until deadline",
                                            value: formData.manufacturer_deadline_days,
                                            onChange: (e)=>handleChange('manufacturer_deadline_days', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                            lineNumber: 58,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-sm mb-3 block",
                                    children: "Traffic Light Ranges (Days remaining)"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs text-black flex items-center gap-1 mb-2",
                                                    children: "🟢 Green"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                                    lineNumber: 72,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "number",
                                                            min: "0",
                                                            placeholder: "Max",
                                                            value: formData.green_max_days,
                                                            onChange: (e)=>handleChange('green_max_days', e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                                            lineNumber: 76,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "number",
                                                            min: "0",
                                                            placeholder: "Min",
                                                            value: formData.green_min_days,
                                                            onChange: (e)=>handleChange('green_min_days', e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                                            lineNumber: 83,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                                    lineNumber: 75,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs text-black flex items-center gap-1 mb-2",
                                                    children: "🟡 Amber"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                                    lineNumber: 93,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "number",
                                                            min: "0",
                                                            placeholder: "Max",
                                                            value: formData.amber_max_days,
                                                            onChange: (e)=>handleChange('amber_max_days', e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                                            lineNumber: 97,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "number",
                                                            min: "0",
                                                            placeholder: "Min",
                                                            value: formData.amber_min_days,
                                                            onChange: (e)=>handleChange('amber_min_days', e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                                            lineNumber: 104,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                                    lineNumber: 96,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs text-black flex items-center gap-1 mb-2",
                                                    children: "🔴 Red"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                                    lineNumber: 114,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "number",
                                                            min: "0",
                                                            placeholder: "Max",
                                                            value: formData.red_max_days,
                                                            onChange: (e)=>handleChange('red_max_days', e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                                            lineNumber: 118,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "number",
                                                            min: "0",
                                                            placeholder: "Min",
                                                            value: formData.red_min_days,
                                                            onChange: (e)=>handleChange('red_min_days', e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                                            lineNumber: 125,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                                    lineNumber: 117,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "outline",
                                    onClick: ()=>onOpenChange(false),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    disabled: isPending,
                                    className: "bg-blue-600 hover:bg-blue-700",
                                    children: isPending ? 'Saving...' : 'Save Changes'
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/configuration/EditBrandModal.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/auth/ApplyPendingUserInfo.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ApplyPendingUserInfo
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/api/base44Client.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__ = __turbopack_context__.i("[externals]/@tanstack/react-query [external] (@tanstack/react-query, esm_import, [project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function ApplyPendingUserInfo() {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQueryClient"])();
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const applyPendingInfo = async ()=>{
            try {
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["base44"].auth.me();
                // Check if there's pending info for this user
                const pendingInvites = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["base44"].entities.PendingUserInvite.filter({
                    email: user.email
                });
                if (pendingInvites.length > 0) {
                    const pendingInfo = pendingInvites[0];
                    // Update user with pending information
                    await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["base44"].auth.updateMe({
                        custom_role: pendingInfo.custom_role,
                        first_name: pendingInfo.first_name,
                        last_name: pendingInfo.last_name,
                        ...pendingInfo.default_site ? {
                            default_site: pendingInfo.default_site
                        } : {}
                    });
                    // Delete the pending invite
                    await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["base44"].entities.PendingUserInvite.delete(pendingInfo.id);
                    console.log('Applied pending user info and refreshing...');
                    // Invalidate queries to refresh user data
                    queryClient.invalidateQueries({
                        queryKey: [
                            'currentUser'
                        ]
                    });
                    queryClient.invalidateQueries({
                        queryKey: [
                            'users'
                        ]
                    });
                    // Reload page to ensure all data is fresh
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error applying pending user info:', error);
            }
        };
        applyPendingInfo();
    }, [
        queryClient
    ]);
    return null;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=Desktop_Dev_Hendy_Warranty-Claim-Tracker_src_components_0sfaf8u._.js.map