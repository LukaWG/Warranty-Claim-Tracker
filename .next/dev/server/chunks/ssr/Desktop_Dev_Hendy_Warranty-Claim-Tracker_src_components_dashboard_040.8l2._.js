module.exports = [
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/TrafficLightIcon.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TrafficLightIcon
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function TrafficLightIcon({ status = 'green', size = 'md', colorCounts = null }) {
    const sizeMap = {
        sm: {
            width: 32,
            height: 40,
            lightRadius: 4,
            spacing: 6
        },
        md: {
            width: 40,
            height: 50,
            lightRadius: 6,
            spacing: 8
        },
        lg: {
            width: 48,
            height: 60,
            lightRadius: 7,
            spacing: 10
        }
    };
    const dims = sizeMap[size];
    const lightColors = {
        red: '#EF4444',
        amber: '#FBBF24',
        green: '#22C55E'
    };
    // Determine which lights are active based on colorCounts
    const redActive = colorCounts ? colorCounts.redCount > 0 : status === 'red';
    const amberActive = colorCounts ? colorCounts.amberCount > 0 : status === 'amber';
    const greenActive = colorCounts ? colorCounts.greenCount > 0 : status === 'green';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 40 60",
        width: dims.width,
        height: dims.height,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("rect", {
                x: "8",
                y: "4",
                width: "24",
                height: "52",
                rx: "4",
                fill: "#1F2937"
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/TrafficLightIcon.jsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("circle", {
                cx: "20",
                cy: "14",
                r: dims.lightRadius,
                fill: redActive ? lightColors.red : '#374151',
                opacity: redActive ? 1 : 0.3
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/TrafficLightIcon.jsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("circle", {
                cx: "20",
                cy: "30",
                r: dims.lightRadius,
                fill: amberActive ? lightColors.amber : '#374151',
                opacity: amberActive ? 1 : 0.3
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/TrafficLightIcon.jsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("circle", {
                cx: "20",
                cy: "46",
                r: dims.lightRadius,
                fill: greenActive ? lightColors.green : '#374151',
                opacity: greenActive ? 1 : 0.3
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/TrafficLightIcon.jsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/TrafficLightIcon.jsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>BrandStatsSection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/card.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import, [project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/framer-motion)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$dashboard$2f$TrafficLightIcon$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/TrafficLightIcon.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/arrow-left.js [ssr] (ecmascript) <export default as ArrowLeft>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function BrandStatsSection({ claims, allClaims, brands, onBrandTileClick, activeBrandFilter, onDeadlineStatusFilter, onSiteFilter }) {
    const getColorCounts = (brand, claimsForBrand)=>{
        const now = new Date();
        let redCount = 0, amberCount = 0, greenCount = 0;
        claimsForBrand.forEach((claim)=>{
            if (!claim.manufacturer_deadline) return;
            const daysRemaining = Math.ceil((new Date(claim.manufacturer_deadline) - now) / (1000 * 60 * 60 * 24));
            if (daysRemaining < 1) {
                redCount++;
            } else if (brand.green_max_days != null && daysRemaining > brand.green_max_days) {
                greenCount++;
            } else {
                const inGreenRange = brand.green_min_days != null && brand.green_max_days != null && daysRemaining >= brand.green_min_days && daysRemaining <= brand.green_max_days;
                const inAmberRange = brand.amber_min_days != null && brand.amber_max_days != null && daysRemaining >= brand.amber_min_days && daysRemaining <= brand.amber_max_days;
                const inRedRange = brand.red_min_days != null && brand.red_max_days != null && daysRemaining >= brand.red_min_days && daysRemaining <= brand.red_max_days;
                if (inGreenRange) greenCount++;
                else if (inAmberRange) amberCount++;
                else if (inRedRange) redCount++;
            }
        });
        return {
            redCount,
            amberCount,
            greenCount
        };
    };
    const getTrafficLightColor = (brand, claimsForBrand)=>{
        if (claimsForBrand.length === 0) return {
            bg: '#E5E7EB',
            text: '#6B7280',
            label: 'No Claims'
        };
        const { redCount, amberCount } = getColorCounts(brand, claimsForBrand);
        if (redCount > 0) return {
            bg: '#FEE2E2',
            text: '#DC2626',
            label: 'Red'
        };
        if (amberCount > 0) return {
            bg: '#FEF3C7',
            text: '#D97706',
            label: 'Amber'
        };
        return {
            bg: '#D1FAE5',
            text: '#059669',
            label: 'Green'
        };
    };
    const brandStats = brands.map((brand)=>{
        const claimsForBrand = claims.filter((c)=>c.brand === brand.name && c.status !== 'completed');
        const claimedForBrand = allClaims.filter((c)=>c.brand === brand.name && c.claimed).length;
        const totalExpectedHours = claimsForBrand.reduce((sum, c)=>sum + (c.expected_hours || 0), 0);
        return {
            brand,
            count: claimsForBrand.length,
            claimedCount: claimedForBrand,
            totalExpectedHours,
            color: getTrafficLightColor(brand, claimsForBrand),
            colorCounts: getColorCounts(brand, claimsForBrand),
            claims: claimsForBrand
        };
    }).sort((a, b)=>b.count - a.count);
    // Calculate All Brands stats
    const allBrandsClaims = claims.filter((c)=>c.status !== 'completed');
    const totalClaimedCount = allClaims.filter((c)=>c.claimed).length;
    const allBrandsTotalExpectedHours = allBrandsClaims.reduce((sum, c)=>sum + (c.expected_hours || 0), 0);
    const allBrandsColorCounts = brands.reduce((acc, brand)=>{
        const claimsForBrand = claims.filter((c)=>c.brand === brand.name && c.status !== 'completed');
        const counts = getColorCounts(brand, claimsForBrand);
        return {
            redCount: acc.redCount + counts.redCount,
            amberCount: acc.amberCount + counts.amberCount,
            greenCount: acc.greenCount + counts.greenCount
        };
    }, {
        redCount: 0,
        amberCount: 0,
        greenCount: 0
    });
    // Site breakdown when a brand is selected
    if (activeBrandFilter && activeBrandFilter !== 'all') {
        const activeBrandObj = brands.find((b)=>b.name === activeBrandFilter);
        const brandClaims = claims.filter((c)=>c.brand === activeBrandFilter && c.status !== 'completed');
        const sites = [
            ...new Set(brandClaims.map((c)=>c.site).filter(Boolean))
        ].sort();
        const siteStats = sites.map((site)=>{
            const siteClaims = brandClaims.filter((c)=>c.site === site);
            const siteClaimedCount = allClaims.filter((c)=>c.brand === activeBrandFilter && c.site === site && c.claimed).length;
            const siteTotalHours = siteClaims.reduce((sum, c)=>sum + (c.expected_hours || 0), 0);
            const colorCounts = activeBrandObj ? getColorCounts(activeBrandObj, siteClaims) : {
                redCount: 0,
                amberCount: 0,
                greenCount: 0
            };
            return {
                site,
                count: siteClaims.length,
                claimedCount: siteClaimedCount,
                totalExpectedHours: siteTotalHours,
                colorCounts
            };
        });
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "mb-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>onBrandTileClick('all'),
                            className: "flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this),
                                "All Brands"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "text-slate-300",
                            children: "/"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "text-sm font-semibold text-slate-800",
                            children: activeBrandFilter
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6",
                    children: [
                        siteStats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.4,
                                    delay: index * 0.05
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow cursor-pointer",
                                    onClick: ()=>onSiteFilter && onSiteFilter(stat.site),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-slate-500 mb-1",
                                                                children: stat.site
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                                lineNumber: 119,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-3xl font-bold text-slate-800",
                                                                children: stat.count
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                                lineNumber: 120,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-500 mt-1",
                                                                children: [
                                                                    stat.totalExpectedHours.toFixed(1),
                                                                    "h in progress"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                                lineNumber: 121,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                        lineNumber: 118,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$dashboard$2f$TrafficLightIcon$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            size: "md",
                                                            colorCounts: stat.colorCounts
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                            lineNumber: 124,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                        lineNumber: 123,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                lineNumber: 117,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-2 mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            onDeadlineStatusFilter('Red');
                                                        },
                                                        className: "bg-red-50 px-2 py-1 rounded text-center hover:bg-red-100 transition-colors cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-bold text-red-700 pointer-events-none",
                                                                children: stat.colorCounts.redCount
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                                lineNumber: 129,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-red-600 pointer-events-none",
                                                                children: "Red"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                                lineNumber: 130,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                        lineNumber: 128,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            onDeadlineStatusFilter('Amber');
                                                        },
                                                        className: "bg-amber-50 px-2 py-1 rounded text-center hover:bg-amber-100 transition-colors cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-bold text-amber-700 pointer-events-none",
                                                                children: stat.colorCounts.amberCount
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                                lineNumber: 133,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-amber-600 pointer-events-none",
                                                                children: "Amber"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                                lineNumber: 134,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                        lineNumber: 132,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            onDeadlineStatusFilter('Green');
                                                        },
                                                        className: "bg-green-50 px-2 py-1 rounded text-center hover:bg-green-100 transition-colors cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-bold text-green-700 pointer-events-none",
                                                                children: stat.colorCounts.greenCount
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                                lineNumber: 137,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-green-600 pointer-events-none",
                                                                children: "Green"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                                lineNumber: 138,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                        lineNumber: 136,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                lineNumber: 127,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                        lineNumber: 116,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                    lineNumber: 112,
                                    columnNumber: 15
                                }, this)
                            }, stat.site, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this)),
                        siteStats.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col-span-full text-center py-8 text-slate-400 text-sm",
                            children: [
                                "No in-progress claims for ",
                                activeBrandFilter
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                            lineNumber: 146,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
            lineNumber: 92,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 0.5
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Card"], {
                    className: "border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow cursor-pointer",
                    onClick: ()=>onBrandTileClick('all'),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-slate-500 mb-1",
                                                children: "All Brands"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                lineNumber: 168,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-3xl font-bold text-slate-800",
                                                children: allBrandsClaims.length
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                lineNumber: 169,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500 mt-1",
                                                children: [
                                                    allBrandsTotalExpectedHours.toFixed(1),
                                                    "h in progress"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                lineNumber: 170,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                        lineNumber: 167,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$dashboard$2f$TrafficLightIcon$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            size: "md",
                                            colorCounts: allBrandsColorCounts
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                            lineNumber: 173,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-2 mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            onDeadlineStatusFilter('Red');
                                        },
                                        className: "bg-red-50 px-2 py-1 rounded text-center hover:bg-red-100 transition-colors cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-red-700 pointer-events-none",
                                                children: allBrandsColorCounts.redCount
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-red-600 pointer-events-none",
                                                children: "Red"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                lineNumber: 182,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            onDeadlineStatusFilter('Amber');
                                        },
                                        className: "bg-amber-50 px-2 py-1 rounded text-center hover:bg-amber-100 transition-colors cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-amber-700 pointer-events-none",
                                                children: allBrandsColorCounts.amberCount
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                lineNumber: 185,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-amber-600 pointer-events-none",
                                                children: "Amber"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                lineNumber: 186,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            onDeadlineStatusFilter('Green');
                                        },
                                        className: "bg-green-50 px-2 py-1 rounded text-center hover:bg-green-100 transition-colors cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-green-700 pointer-events-none",
                                                children: allBrandsColorCounts.greenCount
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                lineNumber: 189,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-green-600 pointer-events-none",
                                                children: "Green"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                lineNumber: 190,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                        lineNumber: 188,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            brandStats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: 0.5,
                        delay: index * 0.05
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow cursor-pointer",
                        onClick: ()=>onBrandTileClick(stat.brand.name),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-slate-500 mb-1",
                                                    children: stat.brand.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                    lineNumber: 211,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-3xl font-bold text-slate-800",
                                                    children: stat.count
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                    lineNumber: 212,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-500 mt-1",
                                                    children: [
                                                        stat.totalExpectedHours.toFixed(1),
                                                        "h in progress"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                    lineNumber: 213,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                            lineNumber: 210,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$dashboard$2f$TrafficLightIcon$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                size: "md",
                                                colorCounts: stat.colorCounts
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                lineNumber: 216,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-2 mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                onDeadlineStatusFilter('Red');
                                            },
                                            className: "bg-red-50 px-2 py-1 rounded text-center hover:bg-red-100 transition-colors cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-bold text-red-700 pointer-events-none",
                                                    children: stat.colorCounts.redCount
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                    lineNumber: 224,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-red-600 pointer-events-none",
                                                    children: "Red"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                    lineNumber: 225,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                            lineNumber: 223,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                onDeadlineStatusFilter('Amber');
                                            },
                                            className: "bg-amber-50 px-2 py-1 rounded text-center hover:bg-amber-100 transition-colors cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-bold text-amber-700 pointer-events-none",
                                                    children: stat.colorCounts.amberCount
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                    lineNumber: 228,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-amber-600 pointer-events-none",
                                                    children: "Amber"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                    lineNumber: 229,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                            lineNumber: 227,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                onDeadlineStatusFilter('Green');
                                            },
                                            className: "bg-green-50 px-2 py-1 rounded text-center hover:bg-green-100 transition-colors cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-bold text-green-700 pointer-events-none",
                                                    children: stat.colorCounts.greenCount
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                    lineNumber: 232,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-green-600 pointer-events-none",
                                                    children: "Green"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                                    lineNumber: 233,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                            lineNumber: 208,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this)
                }, stat.brand.id, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
                    lineNumber: 198,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/BrandStatsSection.jsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "COLUMN_LABELS",
    ()=>COLUMN_LABELS,
    "DEFAULT_COLUMNS",
    ()=>DEFAULT_COLUMNS,
    "default",
    ()=>ColumnVisibilityPicker
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/button.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/checkbox.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$popover$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/popover.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/settings.js [ssr] (ecmascript) <export default as Settings>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$popover$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$popover$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const DEFAULT_COLUMNS = {
    wip_number: true,
    reg_number: true,
    invoice_number: true,
    claim_number: true,
    site: true,
    brand: true,
    expected_hours: true,
    actual_hours: false,
    parts: true,
    labour: true,
    sub_con: false,
    credit: false,
    total_claim_cost: true,
    last_clocking_date: false,
    scanned_date: false,
    manufacturer_deadline: true,
    status: true,
    approval_status: false,
    claimed_date: false,
    claimed_by: false,
    alert: true,
    resolution: true,
    submitted_by: true
};
const COLUMN_LABELS = {
    wip_number: 'WIP Number',
    reg_number: 'Reg No.',
    invoice_number: 'Invoice #',
    claim_number: 'Claim #',
    site: 'Site',
    brand: 'Brand',
    expected_hours: 'Expected Hours',
    actual_hours: 'Actual Hours',
    parts: 'Parts',
    labour: 'Labour',
    sub_con: 'Sub Con',
    credit: 'Credit',
    total_claim_cost: 'Total Cost',
    last_clocking_date: 'Last Clocking',
    scanned_date: 'Scanned Date',
    manufacturer_deadline: 'Mfr Deadline',
    status: 'Status',
    approval_status: 'Approval Status',
    claimed_date: 'Claimed Date',
    claimed_by: 'Claimed By',
    alert: 'Alert',
    resolution: 'Resolution',
    submitted_by: 'Submitted By'
};
function ColumnVisibilityPicker({ visibleColumns, onColumnsChange }) {
    const toggleColumn = (columnKey)=>{
        const updated = {
            ...visibleColumns,
            [columnKey]: !visibleColumns[columnKey]
        };
        onColumnsChange(updated);
    };
    const toggleAll = (show)=>{
        const updated = Object.keys(visibleColumns).reduce((acc, key)=>{
            acc[key] = show;
            return acc;
        }, {});
        onColumnsChange(updated);
    };
    const visibleCount = Object.values(visibleColumns).filter(Boolean).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$popover$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Popover"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$popover$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    size: "sm",
                    className: "gap-2 h-8",
                    title: "Customize columns",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        "Columns (",
                        visibleCount,
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$popover$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["PopoverContent"], {
                className: "w-56 p-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-slate-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold text-slate-700",
                                        children: "Show Columns"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-500",
                                        children: [
                                            visibleCount,
                                            " visible"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        className: "text-xs h-7 flex-1",
                                        onClick: ()=>toggleAll(true),
                                        children: "All"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        className: "text-xs h-7 flex-1",
                                        onClick: ()=>toggleAll(false),
                                        children: "None"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "max-h-96 overflow-y-auto",
                        children: Object.entries(COLUMN_LABELS).map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 px-4 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-b-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                        id: `col-${key}`,
                                        checked: visibleColumns[key] || false,
                                        onCheckedChange: ()=>toggleColumn(key)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        htmlFor: `col-${key}`,
                                        className: "text-sm text-slate-700 cursor-pointer flex-1",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ClaimsTable
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/card.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/table.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$badge$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/badge.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/select.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/checkbox.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/dialog.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/date-fns/format.mjs [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import, [project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/framer-motion)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/clock.js [ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/file-text.js [ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/circle-alert.js [ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/map-pin.js [ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/user.js [ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/trash-2.js [ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/pencil.js [ssr] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/history.js [ssr] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/message-square.js [ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/maximize-2.js [ssr] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/x.js [ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/button.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__ = __turbopack_context__.i("[externals]/@tanstack/react-query [external] (@tanstack/react-query, esm_import, [project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$AuthContext$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/AuthContext.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$databaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/api/databaseClient.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/utils.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$dashboard$2f$ColumnVisibilityPicker$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ColumnVisibilityPicker.jsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$badge$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$dashboard$2f$ColumnVisibilityPicker$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$badge$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$dashboard$2f$ColumnVisibilityPicker$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
    awaiting_review: {
        label: "Awaiting Review",
        className: "bg-amber-50 border-amber-200 text-amber-700"
    },
    completed: {
        label: "Claimed",
        className: "bg-teal-50 border-teal-200",
        style: {
            color: '#56C4B7'
        }
    },
    rejected: {
        label: "Queried",
        className: "bg-red-100 text-red-700 border-red-200"
    }
};
function ClaimsTable({ claims, onStatusChange, onClaimedChange, onAlertChange, onResolutionChange, onDelete, onEdit, onViewHistory, onViewNotes, isLoading }) {
    const [fullscreenOpen, setFullscreenOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [visibleColumns, setVisibleColumns] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$dashboard$2f$ColumnVisibilityPicker$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["DEFAULT_COLUMNS"]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('claimsTableColumns');
        if (saved) {
            try {
                setVisibleColumns(JSON.parse(saved));
            } catch  {
                setVisibleColumns(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$dashboard$2f$ColumnVisibilityPicker$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["DEFAULT_COLUMNS"]);
            }
        }
    }, []);
    const handleColumnsChange = (newColumns)=>{
        setVisibleColumns(newColumns);
        localStorage.setItem('claimsTableColumns', JSON.stringify(newColumns));
    };
    const col = (key)=>visibleColumns[key];
    const { user: currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$AuthContext$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { data: alerts = [] } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            'alerts'
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$databaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["databaseClients"].Alert.get()
    });
    const { data: resolutions = [] } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            'resolutions'
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$databaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["databaseClients"].AlertResolution.get()
    });
    const { data: brands = [] } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            'brands'
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$databaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["databaseClients"].Brand.get()
    });
    const { data: allUsers = [] } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            'allUsers'
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$databaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["databaseClients"].User.get()
    });
    const isProcessor = currentUser?.custom_role === 'Processor' || currentUser?.role === 'Processor';
    const isSiteManager = currentUser?.custom_role === 'Site Manager' || currentUser?.role === 'Site Manager';
    const isServiceManager = currentUser?.custom_role === 'Service Manager' || currentUser?.role === 'Service Manager' || currentUser?.custom_role === 'Owner' || currentUser?.role === 'Owner';
    const getUserName = (email)=>{
        if (!email) return "—";
        // Try from allUsers list (admins can see all users)
        const user = allUsers.find((u)=>u.email === email);
        if (user) {
            if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
            if (user.first_name) return user.first_name;
            if (user.full_name) return user.full_name;
        }
        // Fallback: if it matches currentUser, use their own data (check both top-level and nested data object)
        if (currentUser && currentUser.email === email) {
            const fn = currentUser.first_name || currentUser.data?.first_name;
            const ln = currentUser.last_name || currentUser.data?.last_name;
            if (fn && ln) return `${fn} ${ln}`;
            if (fn) return fn;
            if (currentUser.full_name) return currentUser.full_name;
        }
        return email;
    };
    const formatDate = (dateString)=>{
        if (!dateString) return "—";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(dateString), "dd/MM/yyyy");
    };
    const formatDateTime = (dateString)=>{
        if (!dateString) return "—";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(dateString), "dd/MM/yyyy HH:mm");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5,
            delay: 0.3
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-0 shadow-xl bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "border-b border-slate-100 pb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                className: "h-5 w-5 text-slate-600"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                lineNumber: 114,
                                                columnNumber: 18
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                            lineNumber: 113,
                                            columnNumber: 16
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    className: "text-xl font-semibold text-slate-800",
                                                    children: "All Warranty Claims"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 117,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-500 mt-0.5",
                                                    children: [
                                                        claims.length,
                                                        " total claims"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 120,
                                                    columnNumber: 18
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                            lineNumber: 116,
                                            columnNumber: 16
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                    lineNumber: 112,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$dashboard$2f$ColumnVisibilityPicker$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            visibleColumns: visibleColumns,
                                            onColumnsChange: handleColumnsChange
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                            lineNumber: 126,
                                            columnNumber: 16
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            onClick: ()=>setFullscreenOpen(true),
                                            className: "h-9 w-9 text-slate-400 hover:text-slate-600 hover:bg-slate-100",
                                            title: "Fullscreen view",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                lineNumber: 134,
                                                columnNumber: 18
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                            lineNumber: 127,
                                            columnNumber: 16
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                    lineNumber: 125,
                                    columnNumber: 14
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                            lineNumber: 111,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                        lineNumber: 110,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "p-0",
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center py-16",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                lineNumber: 142,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, this) : claims.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center py-16 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                        className: "h-8 w-8 text-slate-400"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-slate-600 font-medium",
                                    children: "No claims yet"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-400 mt-1",
                                    children: "Submit your first warranty claim to get started"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Table"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                            className: "bg-slate-50/50 hover:bg-slate-50/50",
                                            children: [
                                                col('wip_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "WIP Number"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 157,
                                                    columnNumber: 45
                                                }, this),
                                                col('reg_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Reg No."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 158,
                                                    columnNumber: 45
                                                }, this),
                                                col('invoice_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Invoice #"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 159,
                                                    columnNumber: 49
                                                }, this),
                                                col('claim_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Claim #"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 160,
                                                    columnNumber: 47
                                                }, this),
                                                col('site') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Site"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 161,
                                                    columnNumber: 39
                                                }, this),
                                                col('brand') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Brand"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 162,
                                                    columnNumber: 40
                                                }, this),
                                                col('expected_hours') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Expected Hours"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 163,
                                                    columnNumber: 49
                                                }, this),
                                                col('actual_hours') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Actual Hours"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 164,
                                                    columnNumber: 47
                                                }, this),
                                                col('parts') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Parts"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 165,
                                                    columnNumber: 40
                                                }, this),
                                                col('labour') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Labour"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 166,
                                                    columnNumber: 41
                                                }, this),
                                                col('sub_con') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Sub Con"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 167,
                                                    columnNumber: 42
                                                }, this),
                                                col('credit') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Credit"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 168,
                                                    columnNumber: 41
                                                }, this),
                                                col('total_claim_cost') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Total Cost"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 169,
                                                    columnNumber: 51
                                                }, this),
                                                col('last_clocking_date') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Last Clocking"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 170,
                                                    columnNumber: 53
                                                }, this),
                                                col('scanned_date') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Scanned Date"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 171,
                                                    columnNumber: 47
                                                }, this),
                                                col('manufacturer_deadline') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Mfr Deadline"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 172,
                                                    columnNumber: 56
                                                }, this),
                                                col('status') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 173,
                                                    columnNumber: 41
                                                }, this),
                                                col('approval_status') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Approval Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 174,
                                                    columnNumber: 50
                                                }, this),
                                                col('claimed_date') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Claimed Date"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 175,
                                                    columnNumber: 47
                                                }, this),
                                                col('claimed_by') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Claimed By"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 176,
                                                    columnNumber: 45
                                                }, this),
                                                col('alert') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Alert"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 177,
                                                    columnNumber: 40
                                                }, this),
                                                col('resolution') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Resolution"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 178,
                                                    columnNumber: 45
                                                }, this),
                                                col('submitted_by') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600",
                                                    children: "Submitted By"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 179,
                                                    columnNumber: 47
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    className: "font-semibold text-slate-600 w-32",
                                                    children: "Actions"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 180,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                            lineNumber: 156,
                                            columnNumber: 20
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                        children: claims.map((claim, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__["motion"].tr, {
                                                initial: {
                                                    opacity: 0,
                                                    x: -10
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    x: 0
                                                },
                                                transition: {
                                                    delay: index * 0.05
                                                },
                                                className: "group hover:bg-slate-50/50 transition-colors",
                                                children: [
                                                    col('wip_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "font-medium text-slate-800",
                                                        children: claim.wip_number
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 193,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('reg_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: claim.reg_number || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 198,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('invoice_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: claim.invoice_number || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 203,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('claim_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: claim.claim_number || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 208,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('site') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-slate-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                    className: "h-4 w-4 text-slate-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 215,
                                                                    columnNumber: 29
                                                                }, this),
                                                                claim.site
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 214,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 213,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('brand') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: claim.brand || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 221,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('expected_hours') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-slate-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                    className: "h-4 w-4 text-slate-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 228,
                                                                    columnNumber: 29
                                                                }, this),
                                                                claim.expected_hours,
                                                                "h"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 227,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 226,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('actual_hours') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: claim.actual_hours ? `${claim.actual_hours.toFixed(2)}h` : "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 234,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('parts') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: claim.parts ? `£${claim.parts.toFixed(2)}` : "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 239,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('labour') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: claim.labour ? `£${claim.labour.toFixed(2)}` : "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 244,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('sub_con') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: claim.sub_con ? `£${claim.sub_con.toFixed(2)}` : "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 249,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('credit') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: claim.credit ? `£${claim.credit.toFixed(2)}` : "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 254,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('total_claim_cost') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600 font-medium",
                                                        children: claim.total_claim_cost ? `£${claim.total_claim_cost.toFixed(2)}` : "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 259,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('last_clocking_date') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: formatDate(claim.last_clocking_date)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 264,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('scanned_date') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: formatDateTime(claim.scanned_date)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 269,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('manufacturer_deadline') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: claim.manufacturer_deadline ? (()=>{
                                                            const brand = brands.find((b)=>b.name === claim.brand);
                                                            const daysRemaining = Math.ceil((new Date(claim.manufacturer_deadline) - new Date()) / (1000 * 60 * 60 * 24));
                                                            let bgColor = 'bg-slate-100';
                                                            let textColor = 'text-slate-700';
                                                            if (brand) {
                                                                // Always red if below 1 day
                                                                if (daysRemaining < 1) {
                                                                    bgColor = 'bg-red-100';
                                                                    textColor = 'text-red-700';
                                                                } else if (brand.green_max_days != null && daysRemaining > brand.green_max_days) {
                                                                    bgColor = 'bg-green-100';
                                                                    textColor = 'text-green-700';
                                                                } else {
                                                                    const inGreenRange = brand.green_min_days != null && brand.green_max_days != null && daysRemaining >= brand.green_min_days && daysRemaining <= brand.green_max_days;
                                                                    const inAmberRange = brand.amber_min_days != null && brand.amber_max_days != null && daysRemaining >= brand.amber_min_days && daysRemaining <= brand.amber_max_days;
                                                                    const inRedRange = brand.red_min_days != null && brand.red_max_days != null && daysRemaining >= brand.red_min_days && daysRemaining <= brand.red_max_days;
                                                                    if (inGreenRange) {
                                                                        bgColor = 'bg-green-100';
                                                                        textColor = 'text-green-700';
                                                                    } else if (inAmberRange) {
                                                                        bgColor = 'bg-amber-100';
                                                                        textColor = 'text-amber-700';
                                                                    } else if (inRedRange) {
                                                                        bgColor = 'bg-red-100';
                                                                        textColor = 'text-red-700';
                                                                    }
                                                                }
                                                            }
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-2 px-3 py-1 rounded-md", bgColor, textColor),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatDate(claim.manufacturer_deadline)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 317,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs",
                                                                        children: [
                                                                            "(",
                                                                            daysRemaining,
                                                                            "d)"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 318,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 316,
                                                                columnNumber: 29
                                                            }, this);
                                                        })() : "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 274,
                                                        columnNumber: 23
                                                    }, this),
                                                    col('status') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$badge$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "outline",
                                                            className: `${statusConfig[claim.status]?.className} border font-medium`,
                                                            style: statusConfig[claim.status]?.style,
                                                            children: statusConfig[claim.status]?.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 326,
                                                            columnNumber: 26
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 325,
                                                        columnNumber: 25
                                                    }, this),
                                                    col('approval_status') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: claim.approval_status ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$badge$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "outline",
                                                            className: `text-xs border font-medium ${claim.approval_status === 'approved' ? 'bg-green-50 border-green-200 text-green-700' : claim.approval_status === 'rejected' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`,
                                                            children: [
                                                                claim.approval_status === 'pending_approval' && 'Pending',
                                                                claim.approval_status === 'approved' && 'Approved',
                                                                claim.approval_status === 'rejected' && 'Rejected'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 339,
                                                            columnNumber: 27
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-slate-400",
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 349,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 337,
                                                        columnNumber: 30
                                                    }, this),
                                                    col('claimed_date') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: claim.claimed_date ? formatDateTime(claim.claimed_date) : "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 355,
                                                        columnNumber: 29
                                                    }, this),
                                                    col('claimed_by') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-slate-600",
                                                        children: claim.claimed_by ? getUserName(claim.claimed_by) : "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 360,
                                                        columnNumber: 29
                                                    }, this),
                                                    col('alert') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: isProcessor ? claim.alert ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                    className: "h-4 w-4 text-amber-500 flex-shrink-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 369,
                                                                    columnNumber: 30
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm text-slate-700",
                                                                    children: claim.alert
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 370,
                                                                    columnNumber: 30
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 368,
                                                            columnNumber: 29
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-slate-400",
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 373,
                                                            columnNumber: 29
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                            value: claim.alert || "none",
                                                            onValueChange: (value)=>onAlertChange(claim.id, value === "none" ? "" : value),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                    className: "w-44 h-8 border-0 bg-transparent p-0 focus:ring-0",
                                                                    children: claim.alert ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                                className: "h-4 w-4 text-amber-500 flex-shrink-0"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                                lineNumber: 383,
                                                                                columnNumber: 34
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm text-slate-700",
                                                                                children: claim.alert
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                                lineNumber: 384,
                                                                                columnNumber: 34
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 382,
                                                                        columnNumber: 32
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-slate-400",
                                                                        children: "Select alert..."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 387,
                                                                        columnNumber: 32
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 380,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                            value: "none",
                                                                            children: "No Alert"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 391,
                                                                            columnNumber: 30
                                                                        }, this),
                                                                        alerts.map((alert)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: alert.name,
                                                                                children: alert.name
                                                                            }, alert.id, false, {
                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                                lineNumber: 393,
                                                                                columnNumber: 32
                                                                            }, this))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 376,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 365,
                                                        columnNumber: 29
                                                    }, this),
                                                    col('resolution') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: isProcessor ? claim.alert_resolution ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-slate-700",
                                                            children: claim.alert_resolution
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 406,
                                                            columnNumber: 29
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-slate-400",
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 408,
                                                            columnNumber: 29
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                            value: claim.alert_resolution || "none",
                                                            onValueChange: (value)=>onResolutionChange(claim.id, value === "none" ? "" : value),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                    className: "w-44 h-8 border-0 bg-transparent p-0 focus:ring-0",
                                                                    children: claim.alert_resolution ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-slate-700",
                                                                        children: claim.alert_resolution
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 417,
                                                                        columnNumber: 32
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-slate-400",
                                                                        children: "Select resolution..."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 419,
                                                                        columnNumber: 32
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 415,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                            value: "none",
                                                                            children: "No Resolution"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 423,
                                                                            columnNumber: 30
                                                                        }, this),
                                                                        resolutions.map((resolution)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: resolution.name,
                                                                                children: resolution.name
                                                                            }, resolution.id, false, {
                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                                lineNumber: 425,
                                                                                columnNumber: 32
                                                                            }, this))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 422,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 411,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 403,
                                                        columnNumber: 29
                                                    }, this),
                                                    col('submitted_by') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-slate-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                    className: "h-4 w-4 text-slate-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 437,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm",
                                                                            children: getUserName(claim.submitted_for || claim.created_by)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 439,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-slate-400",
                                                                            children: formatDate(claim.created_date)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 440,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 438,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 436,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 435,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1",
                                                            children: [
                                                                !isProcessor && !isSiteManager && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: "ghost",
                                                                    size: "icon",
                                                                    onClick: ()=>onEdit(claim),
                                                                    className: "h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50",
                                                                    title: "Edit claim",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 455,
                                                                        columnNumber: 32
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 448,
                                                                    columnNumber: 30
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: "ghost",
                                                                    size: "icon",
                                                                    onClick: ()=>onViewNotes(claim),
                                                                    className: "h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50",
                                                                    title: "View notes",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 465,
                                                                        columnNumber: 30
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 458,
                                                                    columnNumber: 28
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: "ghost",
                                                                    size: "icon",
                                                                    onClick: ()=>onViewHistory(claim),
                                                                    className: "h-8 w-8 text-slate-400 hover:text-purple-600 hover:bg-purple-50",
                                                                    title: "View history",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 474,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 467,
                                                                    columnNumber: 27
                                                                }, this),
                                                                isServiceManager && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: "ghost",
                                                                    size: "icon",
                                                                    onClick: ()=>{
                                                                        if (window.confirm('Are you sure you want to delete this claim?')) {
                                                                            onDelete(claim.id);
                                                                        }
                                                                    },
                                                                    className: "h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50",
                                                                    title: "Delete claim",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 488,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 477,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 446,
                                                            columnNumber: 26
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 445,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, claim.id, true, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                lineNumber: 185,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                        lineNumber: 183,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: fullscreenOpen,
                onOpenChange: setFullscreenOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-full h-screen p-0 bg-white overflow-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            className: "sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$dialog$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                        className: "text-2xl font-bold text-slate-800",
                                        children: "All Warranty Claims"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                        lineNumber: 507,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        onClick: ()=>setFullscreenOpen(false),
                                        className: "h-8 w-8 text-slate-400 hover:text-slate-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                            lineNumber: 516,
                                            columnNumber: 18
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                        lineNumber: 510,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                lineNumber: 506,
                                columnNumber: 14
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                            lineNumber: 505,
                            columnNumber: 12
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "p-6",
                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center py-16",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                    lineNumber: 523,
                                    columnNumber: 18
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                lineNumber: 522,
                                columnNumber: 16
                            }, this) : claims.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center py-16 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                            className: "h-8 w-8 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                            lineNumber: 528,
                                            columnNumber: 20
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                        lineNumber: 527,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-slate-600 font-medium",
                                        children: "No claims yet"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                        lineNumber: 530,
                                        columnNumber: 18
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                lineNumber: 526,
                                columnNumber: 16
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Table"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHeader"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                className: "bg-slate-50/50 hover:bg-slate-50/50",
                                                children: [
                                                    col('wip_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "WIP Number"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 537,
                                                        columnNumber: 46
                                                    }, this),
                                                    col('reg_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Reg No."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 538,
                                                        columnNumber: 46
                                                    }, this),
                                                    col('invoice_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Invoice #"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 539,
                                                        columnNumber: 50
                                                    }, this),
                                                    col('claim_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Claim #"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 540,
                                                        columnNumber: 48
                                                    }, this),
                                                    col('site') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Site"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 541,
                                                        columnNumber: 40
                                                    }, this),
                                                    col('brand') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Brand"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 542,
                                                        columnNumber: 41
                                                    }, this),
                                                    col('expected_hours') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Expected Hours"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 543,
                                                        columnNumber: 50
                                                    }, this),
                                                    col('actual_hours') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Actual Hours"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 544,
                                                        columnNumber: 48
                                                    }, this),
                                                    col('parts') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Parts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 545,
                                                        columnNumber: 41
                                                    }, this),
                                                    col('labour') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Labour"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 546,
                                                        columnNumber: 42
                                                    }, this),
                                                    col('sub_con') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Sub Con"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 547,
                                                        columnNumber: 43
                                                    }, this),
                                                    col('credit') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Credit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 548,
                                                        columnNumber: 42
                                                    }, this),
                                                    col('total_claim_cost') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Total Cost"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 549,
                                                        columnNumber: 52
                                                    }, this),
                                                    col('last_clocking_date') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Last Clocking"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 550,
                                                        columnNumber: 54
                                                    }, this),
                                                    col('scanned_date') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Scanned Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 551,
                                                        columnNumber: 48
                                                    }, this),
                                                    col('manufacturer_deadline') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Mfr Deadline"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 552,
                                                        columnNumber: 57
                                                    }, this),
                                                    col('status') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 553,
                                                        columnNumber: 42
                                                    }, this),
                                                    col('approval_status') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Approval Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 554,
                                                        columnNumber: 51
                                                    }, this),
                                                    col('claimed_date') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Claimed Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 555,
                                                        columnNumber: 48
                                                    }, this),
                                                    col('claimed_by') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Claimed By"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 556,
                                                        columnNumber: 46
                                                    }, this),
                                                    col('alert') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Alert"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 557,
                                                        columnNumber: 41
                                                    }, this),
                                                    col('resolution') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Resolution"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 558,
                                                        columnNumber: 46
                                                    }, this),
                                                    col('submitted_by') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600",
                                                        children: "Submitted By"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 559,
                                                        columnNumber: 48
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        className: "font-semibold text-slate-600 w-32",
                                                        children: "Actions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                        lineNumber: 560,
                                                        columnNumber: 24
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                lineNumber: 536,
                                                columnNumber: 22
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                            lineNumber: 535,
                                            columnNumber: 20
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                            children: claims.map((claim, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__["motion"].tr, {
                                                    initial: {
                                                        opacity: 0,
                                                        x: -10
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        x: 0
                                                    },
                                                    transition: {
                                                        delay: index * 0.05
                                                    },
                                                    className: "group hover:bg-slate-50/50 transition-colors",
                                                    children: [
                                                        col('wip_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "font-medium text-slate-800",
                                                            children: claim.wip_number
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 573,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('reg_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: claim.reg_number || "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 578,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('invoice_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: claim.invoice_number || "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 583,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('claim_number') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: claim.claim_number || "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 588,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('site') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 text-slate-600",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                        className: "h-4 w-4 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 595,
                                                                        columnNumber: 32
                                                                    }, this),
                                                                    claim.site
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 594,
                                                                columnNumber: 30
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 593,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('brand') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: claim.brand || "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 601,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('expected_hours') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 text-slate-600",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                        className: "h-4 w-4 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 608,
                                                                        columnNumber: 32
                                                                    }, this),
                                                                    claim.expected_hours,
                                                                    "h"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 607,
                                                                columnNumber: 30
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 606,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('actual_hours') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: claim.actual_hours ? `${claim.actual_hours.toFixed(2)}h` : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 614,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('parts') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: claim.parts ? `£${claim.parts.toFixed(2)}` : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 619,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('labour') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: claim.labour ? `£${claim.labour.toFixed(2)}` : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 624,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('sub_con') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: claim.sub_con ? `£${claim.sub_con.toFixed(2)}` : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 629,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('credit') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: claim.credit ? `£${claim.credit.toFixed(2)}` : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 634,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('total_claim_cost') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600 font-medium",
                                                            children: claim.total_claim_cost ? `£${claim.total_claim_cost.toFixed(2)}` : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 639,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('last_clocking_date') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: formatDate(claim.last_clocking_date)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 644,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('scanned_date') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: formatDateTime(claim.scanned_date)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 649,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('manufacturer_deadline') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: claim.manufacturer_deadline ? (()=>{
                                                                const brand = brands.find((b)=>b.name === claim.brand);
                                                                const daysRemaining = Math.ceil((new Date(claim.manufacturer_deadline) - new Date()) / (1000 * 60 * 60 * 24));
                                                                let bgColor = 'bg-slate-100';
                                                                let textColor = 'text-slate-700';
                                                                if (brand) {
                                                                    if (daysRemaining < 1) {
                                                                        bgColor = 'bg-red-100';
                                                                        textColor = 'text-red-700';
                                                                    } else if (brand.green_max_days != null && daysRemaining > brand.green_max_days) {
                                                                        bgColor = 'bg-green-100';
                                                                        textColor = 'text-green-700';
                                                                    } else {
                                                                        const inGreenRange = brand.green_min_days != null && brand.green_max_days != null && daysRemaining >= brand.green_min_days && daysRemaining <= brand.green_max_days;
                                                                        const inAmberRange = brand.amber_min_days != null && brand.amber_max_days != null && daysRemaining >= brand.amber_min_days && daysRemaining <= brand.amber_max_days;
                                                                        const inRedRange = brand.red_min_days != null && brand.red_max_days != null && daysRemaining >= brand.red_min_days && daysRemaining <= brand.red_max_days;
                                                                        if (inGreenRange) {
                                                                            bgColor = 'bg-green-100';
                                                                            textColor = 'text-green-700';
                                                                        } else if (inAmberRange) {
                                                                            bgColor = 'bg-amber-100';
                                                                            textColor = 'text-amber-700';
                                                                        } else if (inRedRange) {
                                                                            bgColor = 'bg-red-100';
                                                                            textColor = 'text-red-700';
                                                                        }
                                                                    }
                                                                }
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-2 px-3 py-1 rounded-md", bgColor, textColor),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: formatDate(claim.manufacturer_deadline)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 694,
                                                                            columnNumber: 34
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs",
                                                                            children: [
                                                                                "(",
                                                                                daysRemaining,
                                                                                "d)"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 695,
                                                                            columnNumber: 34
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                    lineNumber: 693,
                                                                    columnNumber: 32
                                                                }, this);
                                                            })() : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 654,
                                                            columnNumber: 26
                                                        }, this),
                                                        col('status') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$badge$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "outline",
                                                                className: `${statusConfig[claim.status]?.className} border font-medium`,
                                                                style: statusConfig[claim.status]?.style,
                                                                children: statusConfig[claim.status]?.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 703,
                                                                columnNumber: 28
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 702,
                                                            columnNumber: 26
                                                        }, this),
                                                        col('approval_status') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: claim.approval_status ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$badge$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "outline",
                                                                className: `text-xs border font-medium ${claim.approval_status === 'approved' ? 'bg-green-50 border-green-200 text-green-700' : claim.approval_status === 'rejected' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`,
                                                                children: [
                                                                    claim.approval_status === 'pending_approval' && 'Pending',
                                                                    claim.approval_status === 'approved' && 'Approved',
                                                                    claim.approval_status === 'rejected' && 'Rejected'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 715,
                                                                columnNumber: 34
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-slate-400",
                                                                children: "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 725,
                                                                columnNumber: 34
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 713,
                                                            columnNumber: 34
                                                        }, this),
                                                        col('claimed') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: isProcessor ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-slate-600",
                                                                children: claim.claimed ? 'Yes' : 'No'
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 732,
                                                                columnNumber: 34
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                        checked: claim.claimed || false,
                                                                        onCheckedChange: (checked)=>onClaimedChange(claim.id, checked),
                                                                        style: {
                                                                            '--tw-ring-color': '#56C4B7'
                                                                        },
                                                                        className: "data-[state=checked]:border-[#56C4B7]",
                                                                        "data-checked": claim.claimed || false
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 735,
                                                                        columnNumber: 32
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                                                                        id: "6025d5cc3fb04787",
                                                                        children: "[data-checked=true].jsx-6025d5cc3fb04787{background-color:#56c4b7!important;border-color:#56c4b7!important}"
                                                                    }, void 0, false, void 0, this)
                                                                ]
                                                            }, void 0, true)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 730,
                                                            columnNumber: 34
                                                        }, this),
                                                        col('claimed_date') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: claim.claimed_date ? formatDateTime(claim.claimed_date) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 755,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('claimed_by') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-slate-600",
                                                            children: claim.claimed_by ? getUserName(claim.claimed_by) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 760,
                                                            columnNumber: 28
                                                        }, this),
                                                        col('alert') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: isProcessor ? claim.alert ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                        className: "h-4 w-4 text-amber-500 flex-shrink-0"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 769,
                                                                        columnNumber: 34
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-slate-700",
                                                                        children: claim.alert
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 770,
                                                                        columnNumber: 34
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 768,
                                                                columnNumber: 32
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-slate-400",
                                                                children: "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 773,
                                                                columnNumber: 32
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                value: claim.alert || "none",
                                                                onValueChange: (value)=>onAlertChange(claim.id, value === "none" ? "" : value),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                        className: "w-44 h-8 border-0 bg-transparent p-0 focus:ring-0",
                                                                        children: claim.alert ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                                    className: "h-4 w-4 text-amber-500 flex-shrink-0"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                                    lineNumber: 783,
                                                                                    columnNumber: 38
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                    className: "text-sm text-slate-700",
                                                                                    children: claim.alert
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                                    lineNumber: 784,
                                                                                    columnNumber: 38
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 782,
                                                                            columnNumber: 36
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm text-slate-400",
                                                                            children: "Select alert..."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 787,
                                                                            columnNumber: 36
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 780,
                                                                        columnNumber: 32
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: "none",
                                                                                children: "No Alert"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                                lineNumber: 791,
                                                                                columnNumber: 34
                                                                            }, this),
                                                                            alerts.map((alert)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                    value: alert.name,
                                                                                    children: alert.name
                                                                                }, alert.id, false, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                                    lineNumber: 793,
                                                                                    columnNumber: 36
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 790,
                                                                        columnNumber: 32
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 776,
                                                                columnNumber: 30
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 765,
                                                            columnNumber: 26
                                                        }, this),
                                                        col('resolution') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: isProcessor ? claim.alert_resolution ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-slate-700",
                                                                children: claim.alert_resolution
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 806,
                                                                columnNumber: 32
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-slate-400",
                                                                children: "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 808,
                                                                columnNumber: 32
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                value: claim.alert_resolution || "none",
                                                                onValueChange: (value)=>onResolutionChange(claim.id, value === "none" ? "" : value),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                        className: "w-44 h-8 border-0 bg-transparent p-0 focus:ring-0",
                                                                        children: claim.alert_resolution ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm text-slate-700",
                                                                            children: claim.alert_resolution
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 817,
                                                                            columnNumber: 36
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm text-slate-400",
                                                                            children: "Select resolution..."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 819,
                                                                            columnNumber: 36
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 815,
                                                                        columnNumber: 32
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: "none",
                                                                                children: "No Resolution"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                                lineNumber: 823,
                                                                                columnNumber: 34
                                                                            }, this),
                                                                            resolutions.map((resolution)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$select$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                    value: resolution.name,
                                                                                    children: resolution.name
                                                                                }, resolution.id, false, {
                                                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                                    lineNumber: 825,
                                                                                    columnNumber: 36
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 822,
                                                                        columnNumber: 32
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 811,
                                                                columnNumber: 30
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 803,
                                                            columnNumber: 26
                                                        }, this),
                                                        col('submitted_by') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 text-slate-600",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                        className: "h-4 w-4 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 837,
                                                                        columnNumber: 30
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-col",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm",
                                                                                children: getUserName(claim.submitted_for || claim.created_by)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                                lineNumber: 839,
                                                                                columnNumber: 32
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-slate-400",
                                                                                children: formatDate(claim.created_date)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                                lineNumber: 840,
                                                                                columnNumber: 32
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 838,
                                                                        columnNumber: 30
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 836,
                                                                columnNumber: 28
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 835,
                                                            columnNumber: 26
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$table$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    !isProcessor && !isSiteManager && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "ghost",
                                                                        size: "icon",
                                                                        onClick: ()=>onEdit(claim),
                                                                        className: "h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50",
                                                                        title: "Edit claim",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                            className: "h-4 w-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 855,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 848,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "ghost",
                                                                        size: "icon",
                                                                        onClick: ()=>onViewNotes(claim),
                                                                        className: "h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50",
                                                                        title: "View notes",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                                            className: "h-4 w-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 865,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 858,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "ghost",
                                                                        size: "icon",
                                                                        onClick: ()=>onViewHistory(claim),
                                                                        className: "h-8 w-8 text-slate-400 hover:text-purple-600 hover:bg-purple-50",
                                                                        title: "View history",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                                                            className: "h-4 w-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 874,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 867,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    isServiceManager && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "ghost",
                                                                        size: "icon",
                                                                        onClick: ()=>{
                                                                            if (window.confirm('Are you sure you want to delete this claim?')) {
                                                                                onDelete(claim.id);
                                                                            }
                                                                        },
                                                                        className: "h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50",
                                                                        title: "Delete claim",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                            className: "h-4 w-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                            lineNumber: 888,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                        lineNumber: 877,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                                lineNumber: 846,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                            lineNumber: 845,
                                                            columnNumber: 26
                                                        }, this)
                                                    ]
                                                }, claim.id, true, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                                    lineNumber: 565,
                                                    columnNumber: 24
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                            lineNumber: 563,
                                            columnNumber: 20
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                    lineNumber: 534,
                                    columnNumber: 18
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                                lineNumber: 533,
                                columnNumber: 16
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                            lineNumber: 520,
                            columnNumber: 12
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                    lineNumber: 504,
                    columnNumber: 10
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
                lineNumber: 503,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ClaimsTable.jsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>DashboardFilters
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/card.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/input.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/label.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/filter.js [ssr] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/x.js [ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/chevron-down.js [ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/check.js [ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/button.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/checkbox.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/utils.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
function MultiSelect({ label, options, selected, onChange, placeholder }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handleClickOutside = (e)=>{
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const toggle = (value)=>{
        if (selected.includes(value)) {
            onChange(selected.filter((v)=>v !== value));
        } else {
            onChange([
                ...selected,
                value
            ]);
        }
    };
    const displayText = selected.length === 0 ? placeholder : selected.length === 1 ? options.find((o)=>o.value === selected[0])?.label || selected[0] : `${selected.length} selected`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: ref,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen((o)=>!o),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring", selected.length > 0 ? "text-foreground" : "text-muted-foreground"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "truncate",
                        children: displayText
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: "h-4 w-4 opacity-50 ml-1 flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute z-50 mt-1 w-full min-w-[160px] rounded-md border bg-popover shadow-md overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "max-h-60 overflow-y-auto p-1",
                        children: [
                            options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    onClick: ()=>toggle(opt.value),
                                    className: "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground select-none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4 rounded-sm border border-primary flex items-center justify-center flex-shrink-0", selected.includes(opt.value) ? "bg-primary text-primary-foreground" : "bg-transparent"),
                                            children: selected.includes(opt.value) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                                lineNumber: 63,
                                                columnNumber: 52
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                            lineNumber: 59,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: opt.label
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                            lineNumber: 65,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, opt.value, true, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this)),
                            options.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "px-2 py-1.5 text-sm text-muted-foreground",
                                children: "No options"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this),
                    selected.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "border-t p-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            onClick: ()=>onChange([]),
                            className: "flex items-center gap-2 px-2 py-1.5 text-xs rounded-sm cursor-pointer hover:bg-accent text-muted-foreground hover:text-accent-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-3 w-3"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                    lineNumber: 78,
                                    columnNumber: 17
                                }, this),
                                " Clear selection"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                            lineNumber: 74,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 73,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                lineNumber: 51,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
const STATUS_OPTIONS = [
    {
        value: 'in_progress',
        label: 'In Progress'
    },
    {
        value: 'awaiting_review',
        label: 'Awaiting Review'
    },
    {
        value: 'completed',
        label: 'Claimed'
    },
    {
        value: 'rejected',
        label: 'Queried'
    }
];
function DashboardFilters({ claims, filters, onFilterChange, allUsers = [], showClaimed, onShowClaimedChange, currentUser, allSites = [] }) {
    const userRole = currentUser?.custom_role || currentUser?.role;
    const isAdmin = userRole === 'Admin';
    const adminSite = currentUser?.default_site;
    const sites = isAdmin && adminSite ? [
        adminSite
    ] : [
        ...new Set(claims.map((c)=>c.site).filter(Boolean))
    ];
    const userSite = currentUser?.default_site ? allSites.find((s)=>s.name === currentUser.default_site) : null;
    const allBrandsInClaims = [
        ...new Set(claims.map((c)=>c.brand).filter(Boolean))
    ];
    const brands = userSite?.brands?.length > 0 ? allBrandsInClaims.filter((b)=>userSite.brands.includes(b)) : allBrandsInClaims;
    const userEmails = [
        ...new Set(claims.map((c)=>c.submitted_for || c.created_by).filter(Boolean))
    ];
    const claimedByEmails = [
        ...new Set(claims.map((c)=>c.claimed_by).filter(Boolean))
    ];
    const alerts = [
        ...new Set(claims.map((c)=>c.alert).filter(Boolean))
    ];
    const resolutions = [
        ...new Set(claims.map((c)=>c.alert_resolution).filter(Boolean))
    ];
    const getUserName = (email)=>{
        if (!email) return email;
        const user = allUsers.find((u)=>u.email === email);
        if (!user) return email;
        if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
        if (user.first_name) return user.first_name;
        if (user.full_name) return user.full_name;
        return email;
    };
    const handleClearFilters = ()=>{
        onFilterChange({
            site: [],
            brand: [],
            user: [],
            claimedBy: [],
            status: [],
            alert: [],
            resolution: [],
            dateFrom: '',
            dateTo: ''
        });
    };
    const hasActiveFilters = filters.site?.length > 0 || filters.brand?.length > 0 || filters.user?.length > 0 || filters.claimedBy?.length > 0 || filters.status?.length > 0 || filters.alert?.length > 0 || filters.resolution?.length > 0 || filters.dateFrom || filters.dateTo;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Card"], {
        className: "border-0 shadow-lg bg-white p-4 mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                className: "h-4 w-4 text-slate-600"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-slate-700",
                                children: "Filters"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    hasActiveFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "sm",
                        onClick: handleClearFilters,
                        className: "text-slate-500 hover:text-slate-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4 mr-1"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            "Clear"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xs text-slate-600",
                                children: "Site"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MultiSelect, {
                                placeholder: "All Sites",
                                options: sites.map((s)=>({
                                        value: s,
                                        label: s
                                    })),
                                selected: filters.site || [],
                                onChange: (val)=>onFilterChange({
                                        ...filters,
                                        site: val
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xs text-slate-600",
                                children: "Brand"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MultiSelect, {
                                placeholder: "All Brands",
                                options: brands.map((b)=>({
                                        value: b,
                                        label: b
                                    })),
                                selected: filters.brand || [],
                                onChange: (val)=>onFilterChange({
                                        ...filters,
                                        brand: val
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xs text-slate-600",
                                children: "Submitted By"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MultiSelect, {
                                placeholder: "All Users",
                                options: userEmails.map((e)=>({
                                        value: e,
                                        label: getUserName(e)
                                    })),
                                selected: filters.user || [],
                                onChange: (val)=>onFilterChange({
                                        ...filters,
                                        user: val
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xs text-slate-600",
                                children: "Claimed By"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MultiSelect, {
                                placeholder: "All Users",
                                options: claimedByEmails.map((e)=>({
                                        value: e,
                                        label: getUserName(e)
                                    })),
                                selected: filters.claimedBy || [],
                                onChange: (val)=>onFilterChange({
                                        ...filters,
                                        claimedBy: val
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xs text-slate-600",
                                children: "Status"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MultiSelect, {
                                placeholder: "All Statuses",
                                options: STATUS_OPTIONS,
                                selected: filters.status || [],
                                onChange: (val)=>onFilterChange({
                                        ...filters,
                                        status: val
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xs text-slate-600",
                                children: "Alert"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MultiSelect, {
                                placeholder: "All Alerts",
                                options: alerts.map((a)=>({
                                        value: a,
                                        label: a
                                    })),
                                selected: filters.alert || [],
                                onChange: (val)=>onFilterChange({
                                        ...filters,
                                        alert: val
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xs text-slate-600",
                                children: "Resolution"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MultiSelect, {
                                placeholder: "All Resolutions",
                                options: resolutions.map((r)=>({
                                        value: r,
                                        label: r
                                    })),
                                selected: filters.resolution || [],
                                onChange: (val)=>onFilterChange({
                                        ...filters,
                                        resolution: val
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xs text-slate-600",
                                children: "Date From"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                type: "date",
                                value: filters.dateFrom,
                                onChange: (e)=>onFilterChange({
                                        ...filters,
                                        dateFrom: e.target.value
                                    }),
                                className: "h-9"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xs text-slate-600",
                                children: "Date To"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                type: "date",
                                value: filters.dateTo,
                                onChange: (e)=>onFilterChange({
                                        ...filters,
                                        dateTo: e.target.value
                                    }),
                                className: "h-9"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "space-y-2 flex flex-col justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 h-9",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                    id: "show-claimed-filter",
                                    checked: showClaimed,
                                    onCheckedChange: onShowClaimedChange
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    htmlFor: "show-claimed-filter",
                                    className: "text-xs text-slate-600 cursor-pointer whitespace-nowrap",
                                    children: "Show Claimed"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                                    lineNumber: 246,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
                lineNumber: 148,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DashboardFilters.jsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ExportButton.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ExportButton
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/button.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/download.js [ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/date-fns/format.mjs [ssr] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function ExportButton({ claims, filters }) {
    const handleExport = ()=>{
        // Prepare CSV data
        const headers = [
            'WIP Number',
            'Site',
            'Expected Hours',
            'Last Clocking Date',
            'Scanned Date',
            'Status',
            'Claimed',
            'Claimed Date',
            'Alert',
            'Alert Resolution',
            'Submitted By',
            'Submitted Date'
        ];
        const rows = claims.map((claim)=>[
                claim.wip_number,
                claim.site,
                claim.expected_hours,
                claim.last_clocking_date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(claim.last_clocking_date), 'yyyy-MM-dd') : '',
                claim.scanned_date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(claim.scanned_date), 'yyyy-MM-dd') : '',
                claim.status,
                claim.claimed ? 'Yes' : 'No',
                claim.claimed_date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(claim.claimed_date), 'yyyy-MM-dd') : '',
                claim.alert || '',
                claim.alert_resolution || '',
                claim.created_by,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(claim.created_date), 'yyyy-MM-dd HH:mm')
            ]);
        // Create CSV content
        const csvContent = [
            headers.join(','),
            ...rows.map((row)=>row.map((cell)=>`"${cell}"`).join(','))
        ].join('\n');
        // Create blob and download
        const blob = new Blob([
            csvContent
        ], {
            type: 'text/csv;charset=utf-8;'
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `hendy-warranty-claims-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), 'yyyy-MM-dd')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
        onClick: handleExport,
        className: "gap-2",
        style: {
            backgroundColor: 'var(--hendy-blue)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ExportButton.jsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            "Export to CSV"
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ExportButton.jsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ChartsSection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/card.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/chart/BarChart.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/Bar.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/chart/PieChart.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/polar/Pie.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/component/Cell.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/chart/LineChart.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/Line.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/XAxis.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/YAxis.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/CartesianGrid.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/component/Tooltip.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/component/ResponsiveContainer.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/trending-up.js [ssr] (ecmascript) <export default as TrendingUp>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function ChartsSection({ claims, allClaims, chartConfig = {} }) {
    const claimsForAlertAnalysis = (allClaims || claims).filter((c)=>c.alert && !c.alert_resolution);
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
        {
            name: 'In Progress',
            value: claims.filter((c)=>c.status === 'in_progress').length,
            color: '#222b57'
        },
        {
            name: 'Completed',
            value: claims.filter((c)=>c.status === 'completed').length,
            color: '#56C4B7'
        },
        {
            name: 'Rejected',
            value: claims.filter((c)=>c.status === 'rejected').length,
            color: '#EF4444'
        }
    ];
    // Claims by site
    const siteCounts = {};
    claims.forEach((claim)=>{
        siteCounts[claim.site] = (siteCounts[claim.site] || 0) + 1;
    });
    const siteData = Object.entries(siteCounts).map(([site, count])=>({
            site,
            count
        })).sort((a, b)=>b.count - a.count).slice(0, 10);
    // Claims by brand
    const brandCounts = {};
    claims.forEach((claim)=>{
        if (claim.brand) {
            brandCounts[claim.brand] = (brandCounts[claim.brand] || 0) + 1;
        }
    });
    const brandData = Object.entries(brandCounts).map(([brand, count])=>({
            brand,
            count
        })).sort((a, b)=>b.count - a.count).slice(0, 10);
    // Claims over time (last 30 days)
    const last30Days = Array.from({
        length: 30
    }, (_, i)=>{
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return date.toISOString().split('T')[0];
    });
    const claimsByDate = {};
    claims.forEach((claim)=>{
        const date = claim.created_date.split('T')[0];
        if (last30Days.includes(date)) {
            claimsByDate[date] = (claimsByDate[date] || 0) + 1;
        }
    });
    const timelineData = last30Days.map((date)=>({
            date: new Date(date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short'
            }),
            claims: claimsByDate[date] || 0
        }));
    // Top 10 sites by alerts - exclude Non-actionable
    const siteAlerts = {};
    claimsForAlertAnalysis.forEach((claim)=>{
        if (claim.alert) {
            siteAlerts[claim.site] = (siteAlerts[claim.site] || 0) + 1;
        }
    });
    const siteAlertsData = Object.entries(siteAlerts).map(([site, count])=>({
            site,
            alerts: count
        })).sort((a, b)=>b.alerts - a.alerts).slice(0, 10);
    // Alert types distribution - exclude Non-actionable
    const alertTypes = {};
    claimsForAlertAnalysis.forEach((claim)=>{
        if (claim.alert) {
            alertTypes[claim.alert] = (alertTypes[claim.alert] || 0) + 1;
        }
    });
    const alertTypesData = Object.entries(alertTypes).map(([alert, count])=>({
            name: alert,
            value: count,
            color: '#F59E0B'
        })).sort((a, b)=>b.value - a.value);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8",
        children: [
            config.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-0 shadow-lg bg-white chart-export-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "border-b border-slate-100 pb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "h-5 w-5 text-slate-600"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-lg font-semibold text-slate-800",
                                    children: "Claims by Status"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "pt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: 300,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["PieChart"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Pie"], {
                                        data: statusData,
                                        cx: "50%",
                                        cy: "50%",
                                        labelLine: false,
                                        label: ({ name, percent })=>`${name}: ${(percent * 100).toFixed(0)}%`,
                                        outerRadius: 100,
                                        fill: "#8884d8",
                                        dataKey: "value",
                                        children: statusData.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Cell"], {
                                                fill: entry.color
                                            }, `cell-${index}`, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                                lineNumber: 118,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 107,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 121,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                            lineNumber: 105,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                lineNumber: 95,
                columnNumber: 9
            }, this),
            config.site && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-0 shadow-lg bg-white chart-export-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "border-b border-slate-100 pb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg font-semibold text-slate-800",
                            children: "Claims by Site"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "pt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: 300,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                                data: siteData,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        strokeDasharray: "3 3",
                                        stroke: "#e2e8f0"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 137,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                        dataKey: "site",
                                        tick: {
                                            fontSize: 12
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 138,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 139,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 140,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                        dataKey: "count",
                                        fill: "#222b57"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                lineNumber: 130,
                columnNumber: 9
            }, this),
            config.brand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-0 shadow-lg bg-white chart-export-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "border-b border-slate-100 pb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg font-semibold text-slate-800",
                            children: "Claims by Brand"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                            lineNumber: 152,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "pt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: 300,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                                data: brandData,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        strokeDasharray: "3 3",
                                        stroke: "#e2e8f0"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                        dataKey: "brand",
                                        tick: {
                                            fontSize: 12
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 160,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                        dataKey: "count",
                                        fill: "#56C4B7"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                lineNumber: 156,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                lineNumber: 150,
                columnNumber: 9
            }, this),
            config.timeline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-0 shadow-lg bg-white chart-export-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "border-b border-slate-100 pb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg font-semibold text-slate-800",
                            children: "Claims Timeline"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                            lineNumber: 172,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "pt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: 300,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["LineChart"], {
                                data: timelineData,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        strokeDasharray: "3 3",
                                        stroke: "#e2e8f0"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                        dataKey: "date",
                                        tick: {
                                            fontSize: 12
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 180,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Line"], {
                                        type: "monotone",
                                        dataKey: "claims",
                                        stroke: "#222b57",
                                        strokeWidth: 2
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                        lineNumber: 181,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                                lineNumber: 176,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
                lineNumber: 170,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ChartsSection.jsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>DynamicChartsSection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/card.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/chart/BarChart.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/Bar.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/chart/PieChart.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/polar/Pie.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/component/Cell.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/chart/LineChart.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/Line.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/chart/AreaChart.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/Area.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/XAxis.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/YAxis.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/cartesian/CartesianGrid.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/component/Tooltip.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/recharts/es6/component/ResponsiveContainer.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/trending-up.js [ssr] (ecmascript) <export default as TrendingUp>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function DynamicChartsSection({ claims, allClaims, customCharts = [] }) {
    const enabledCharts = customCharts.filter((chart)=>chart.enabled !== false);
    const getChartData = (chartConfig)=>{
        const { metricType, field, groupBy, groupBy2 } = chartConfig;
        // Handle time-based grouping
        if (groupBy === 'daily') {
            const last30Days = Array.from({
                length: 30
            }, (_, i)=>{
                const date = new Date();
                date.setDate(date.getDate() - (29 - i));
                return date.toISOString().split('T')[0];
            });
            const dataByDate = {};
            claims.forEach((claim)=>{
                const date = claim.created_date?.split('T')[0];
                if (last30Days.includes(date)) {
                    if (!dataByDate[date]) dataByDate[date] = {
                        count: 0,
                        sum: 0
                    };
                    dataByDate[date].count += 1;
                    if (field && claim[field]) {
                        dataByDate[date].sum += claim[field];
                    }
                }
            });
            const data = last30Days.map((date)=>{
                const dateData = dataByDate[date] || {
                    count: 0,
                    sum: 0
                };
                let value = 0;
                if (metricType === 'count') value = dateData.count;
                else if (metricType === 'sum') value = Math.round(dateData.sum);
                else if (metricType === 'average') value = dateData.count > 0 ? Math.round(dateData.sum / dateData.count) : 0;
                else if (metricType === 'percentage') {
                    const completed = claims.filter((c)=>c.created_date?.split('T')[0] === date && c.status === 'completed').length;
                    value = dateData.count > 0 ? Math.round(completed / dateData.count * 100) : 0;
                }
                return {
                    name: new Date(date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short'
                    }),
                    value
                };
            });
            return {
                title: `${metricType === 'count' ? 'Claims' : metricType === 'percentage' ? 'Completion Rate' : field ? field.replace(/_/g, ' ').replace(/\b\w/g, (l)=>l.toUpperCase()) : 'Value'} Over Time`,
                data,
                dataKey: 'value',
                nameKey: 'name'
            };
        }
        if (groupBy === 'monthly') {
            const last12Months = Array.from({
                length: 12
            }, (_, i)=>{
                const date = new Date();
                date.setMonth(date.getMonth() - (11 - i));
                return date.toISOString().slice(0, 7);
            });
            const dataByMonth = {};
            claims.forEach((claim)=>{
                const month = claim.created_date?.slice(0, 7);
                if (last12Months.includes(month)) {
                    if (!dataByMonth[month]) dataByMonth[month] = {
                        count: 0,
                        sum: 0
                    };
                    dataByMonth[month].count += 1;
                    if (field && claim[field]) {
                        dataByMonth[month].sum += claim[field];
                    }
                }
            });
            const data = last12Months.map((month)=>{
                const monthData = dataByMonth[month] || {
                    count: 0,
                    sum: 0
                };
                let value = 0;
                if (metricType === 'count') value = monthData.count;
                else if (metricType === 'sum') value = Math.round(monthData.sum);
                else if (metricType === 'average') value = monthData.count > 0 ? Math.round(monthData.sum / monthData.count) : 0;
                return {
                    name: new Date(month + '-01').toLocaleDateString('en-GB', {
                        month: 'short',
                        year: '2-digit'
                    }),
                    value
                };
            });
            return {
                title: `${metricType === 'count' ? 'Claims' : field ? field.replace(/_/g, ' ').replace(/\b\w/g, (l)=>l.toUpperCase()) : 'Value'} by Month`,
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
            claims.forEach((claim)=>{
                const key1 = claim[groupByField1] || 'Unknown';
                const key2 = claim[groupByField2] || 'Unknown';
                const compositeKey = `${key1} - ${key2}`;
                if (!grouped[compositeKey]) grouped[compositeKey] = {
                    count: 0,
                    sum: 0,
                    primary: key1,
                    secondary: key2
                };
                grouped[compositeKey].count += 1;
                if (field && claim[field]) {
                    grouped[compositeKey].sum += claim[field];
                }
            });
            const data = Object.entries(grouped).map(([name, data])=>{
                let value = 0;
                if (metricType === 'count') value = data.count;
                else if (metricType === 'sum') value = Math.round(data.sum);
                else if (metricType === 'average') value = data.count > 0 ? Math.round(data.sum / data.count) : 0;
                return {
                    name,
                    value,
                    primary: data.primary,
                    secondary: data.secondary
                };
            }).sort((a, b)=>b.value - a.value).slice(0, 20);
            const metricLabel = metricType === 'count' ? 'Claims' : field ? field.replace(/_/g, ' ').replace(/\b\w/g, (l)=>l.toUpperCase()) : 'Value';
            const group1Label = groupBy.replace(/_/g, ' ').replace(/\b\w/g, (l)=>l.toUpperCase());
            const group2Label = groupBy2.replace(/_/g, ' ').replace(/\b\w/g, (l)=>l.toUpperCase());
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
        claims.forEach((claim)=>{
            const key = claim[groupByField] || 'Unknown';
            if (!grouped[key]) grouped[key] = {
                count: 0,
                sum: 0
            };
            grouped[key].count += 1;
            if (field && claim[field]) {
                grouped[key].sum += claim[field];
            }
        });
        const data = Object.entries(grouped).map(([name, data])=>{
            let value = 0;
            if (metricType === 'count') value = data.count;
            else if (metricType === 'sum') value = Math.round(data.sum);
            else if (metricType === 'average') value = data.count > 0 ? Math.round(data.sum / data.count) : 0;
            else if (metricType === 'percentage') {
                const completed = claims.filter((c)=>c[groupByField] === name && c.status === 'completed').length;
                value = data.count > 0 ? Math.round(completed / data.count * 100) : 0;
            }
            return {
                name,
                value
            };
        }).sort((a, b)=>b.value - a.value).slice(0, 15);
        const metricLabel = metricType === 'count' ? 'Claims' : metricType === 'percentage' ? 'Completion Rate' : field ? field.replace(/_/g, ' ').replace(/\b\w/g, (l)=>l.toUpperCase()) : 'Value';
        const groupLabel = groupBy.replace(/_/g, ' ').replace(/\b\w/g, (l)=>l.toUpperCase());
        return {
            title: `${metricLabel} by ${groupLabel}`,
            data,
            dataKey: 'value',
            nameKey: 'name'
        };
    };
    // Legacy support for old chart format
    const getLegacyChartData = (metric)=>{
        switch(metric){
            case 'status':
                return {
                    title: 'Claims by Status',
                    data: [
                        {
                            name: 'In Progress',
                            value: claims.filter((c)=>c.status === 'in_progress').length,
                            color: '#222b57'
                        },
                        {
                            name: 'Awaiting Review',
                            value: claims.filter((c)=>c.status === 'awaiting_review').length,
                            color: '#F59E0B'
                        },
                        {
                            name: 'Completed',
                            value: claims.filter((c)=>c.status === 'completed').length,
                            color: '#56C4B7'
                        },
                        {
                            name: 'Rejected',
                            value: claims.filter((c)=>c.status === 'rejected').length,
                            color: '#EF4444'
                        }
                    ],
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'user':
                const userCounts = {};
                claims.forEach((claim)=>{
                    const user = claim.created_by || 'Unknown';
                    userCounts[user] = (userCounts[user] || 0) + 1;
                });
                return {
                    title: 'Claims by User',
                    data: Object.entries(userCounts).map(([user, count])=>({
                            name: user,
                            value: count
                        })).sort((a, b)=>b.value - a.value).slice(0, 10),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'alert':
                const alertCounts = {};
                claims.forEach((claim)=>{
                    if (claim.alert) {
                        alertCounts[claim.alert] = (alertCounts[claim.alert] || 0) + 1;
                    }
                });
                return {
                    title: 'Claims by Alert Type',
                    data: Object.entries(alertCounts).map(([alert, count])=>({
                            name: alert,
                            value: count
                        })).sort((a, b)=>b.value - a.value),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'site':
                const siteCounts = {};
                claims.forEach((claim)=>{
                    siteCounts[claim.site] = (siteCounts[claim.site] || 0) + 1;
                });
                return {
                    title: 'Claims by Site',
                    data: Object.entries(siteCounts).map(([site, count])=>({
                            name: site,
                            value: count
                        })).sort((a, b)=>b.value - a.value).slice(0, 10),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'brand':
                const brandCounts = {};
                claims.forEach((claim)=>{
                    if (claim.brand) {
                        brandCounts[claim.brand] = (brandCounts[claim.brand] || 0) + 1;
                    }
                });
                return {
                    title: 'Claims by Brand',
                    data: Object.entries(brandCounts).map(([brand, count])=>({
                            name: brand,
                            value: count
                        })).sort((a, b)=>b.value - a.value).slice(0, 10),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'timeline':
                const last30Days = Array.from({
                    length: 30
                }, (_, i)=>{
                    const date = new Date();
                    date.setDate(date.getDate() - (29 - i));
                    return date.toISOString().split('T')[0];
                });
                const claimsByDate = {};
                claims.forEach((claim)=>{
                    const date = claim.created_date.split('T')[0];
                    if (last30Days.includes(date)) {
                        claimsByDate[date] = (claimsByDate[date] || 0) + 1;
                    }
                });
                return {
                    title: 'Claims Timeline (Last 30 Days)',
                    data: last30Days.map((date)=>({
                            name: new Date(date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short'
                            }),
                            value: claimsByDate[date] || 0
                        })),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'cost':
                const last30DaysCost = Array.from({
                    length: 30
                }, (_, i)=>{
                    const date = new Date();
                    date.setDate(date.getDate() - (29 - i));
                    return date.toISOString().split('T')[0];
                });
                const costByDate = {};
                claims.forEach((claim)=>{
                    const date = claim.created_date.split('T')[0];
                    if (last30DaysCost.includes(date)) {
                        costByDate[date] = (costByDate[date] || 0) + (claim.total_claim_cost || 0);
                    }
                });
                return {
                    title: 'Total Cost Over Time',
                    data: last30DaysCost.map((date)=>({
                            name: new Date(date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short'
                            }),
                            value: Math.round(costByDate[date] || 0)
                        })),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'hours':
                const last30DaysHours = Array.from({
                    length: 30
                }, (_, i)=>{
                    const date = new Date();
                    date.setDate(date.getDate() - (29 - i));
                    return date.toISOString().split('T')[0];
                });
                const hoursByDate = {};
                claims.forEach((claim)=>{
                    const date = claim.created_date.split('T')[0];
                    if (last30DaysHours.includes(date)) {
                        hoursByDate[date] = (hoursByDate[date] || 0) + (claim.expected_hours || 0);
                    }
                });
                return {
                    title: 'Total Hours Over Time',
                    data: last30DaysHours.map((date)=>({
                            name: new Date(date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short'
                            }),
                            value: Math.round(hoursByDate[date] || 0)
                        })),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'monthly':
                const last12Months = Array.from({
                    length: 12
                }, (_, i)=>{
                    const date = new Date();
                    date.setMonth(date.getMonth() - (11 - i));
                    return date.toISOString().slice(0, 7);
                });
                const claimsByMonth = {};
                claims.forEach((claim)=>{
                    const month = claim.created_date.slice(0, 7);
                    if (last12Months.includes(month)) {
                        claimsByMonth[month] = (claimsByMonth[month] || 0) + 1;
                    }
                });
                return {
                    title: 'Claims by Month (12 Months)',
                    data: last12Months.map((month)=>({
                            name: new Date(month + '-01').toLocaleDateString('en-GB', {
                                month: 'short',
                                year: '2-digit'
                            }),
                            value: claimsByMonth[month] || 0
                        })),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'avgCostSite':
                const siteCostTotals = {};
                const siteCostCounts = {};
                claims.forEach((claim)=>{
                    if (claim.site) {
                        siteCostTotals[claim.site] = (siteCostTotals[claim.site] || 0) + (claim.total_claim_cost || 0);
                        siteCostCounts[claim.site] = (siteCostCounts[claim.site] || 0) + 1;
                    }
                });
                return {
                    title: 'Average Cost by Site',
                    data: Object.entries(siteCostTotals).map(([site, total])=>({
                            name: site,
                            value: Math.round(total / siteCostCounts[site])
                        })).sort((a, b)=>b.value - a.value).slice(0, 10),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'avgCostBrand':
                const brandCostTotals = {};
                const brandCostCounts = {};
                claims.forEach((claim)=>{
                    if (claim.brand) {
                        brandCostTotals[claim.brand] = (brandCostTotals[claim.brand] || 0) + (claim.total_claim_cost || 0);
                        brandCostCounts[claim.brand] = (brandCostCounts[claim.brand] || 0) + 1;
                    }
                });
                return {
                    title: 'Average Cost by Brand',
                    data: Object.entries(brandCostTotals).map(([brand, total])=>({
                            name: brand,
                            value: Math.round(total / brandCostCounts[brand])
                        })).sort((a, b)=>b.value - a.value).slice(0, 10),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'partsCost':
                const last30DaysParts = Array.from({
                    length: 30
                }, (_, i)=>{
                    const date = new Date();
                    date.setDate(date.getDate() - (29 - i));
                    return date.toISOString().split('T')[0];
                });
                const partsByDate = {};
                claims.forEach((claim)=>{
                    const date = claim.created_date.split('T')[0];
                    if (last30DaysParts.includes(date)) {
                        partsByDate[date] = (partsByDate[date] || 0) + (claim.parts || 0);
                    }
                });
                return {
                    title: 'Parts Cost Over Time',
                    data: last30DaysParts.map((date)=>({
                            name: new Date(date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short'
                            }),
                            value: Math.round(partsByDate[date] || 0)
                        })),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'labourCost':
                const last30DaysLabour = Array.from({
                    length: 30
                }, (_, i)=>{
                    const date = new Date();
                    date.setDate(date.getDate() - (29 - i));
                    return date.toISOString().split('T')[0];
                });
                const labourByDate = {};
                claims.forEach((claim)=>{
                    const date = claim.created_date.split('T')[0];
                    if (last30DaysLabour.includes(date)) {
                        labourByDate[date] = (labourByDate[date] || 0) + (claim.labour || 0);
                    }
                });
                return {
                    title: 'Labour Cost Over Time',
                    data: last30DaysLabour.map((date)=>({
                            name: new Date(date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short'
                            }),
                            value: Math.round(labourByDate[date] || 0)
                        })),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'subconCost':
                const last30DaysSubcon = Array.from({
                    length: 30
                }, (_, i)=>{
                    const date = new Date();
                    date.setDate(date.getDate() - (29 - i));
                    return date.toISOString().split('T')[0];
                });
                const subconByDate = {};
                claims.forEach((claim)=>{
                    const date = claim.created_date.split('T')[0];
                    if (last30DaysSubcon.includes(date)) {
                        subconByDate[date] = (subconByDate[date] || 0) + (claim.sub_con || 0);
                    }
                });
                return {
                    title: 'Sub-Con Cost Over Time',
                    data: last30DaysSubcon.map((date)=>({
                            name: new Date(date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short'
                            }),
                            value: Math.round(subconByDate[date] || 0)
                        })),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'avgHoursSite':
                const siteHoursTotals = {};
                const siteHoursCounts = {};
                claims.forEach((claim)=>{
                    if (claim.site) {
                        siteHoursTotals[claim.site] = (siteHoursTotals[claim.site] || 0) + (claim.expected_hours || 0);
                        siteHoursCounts[claim.site] = (siteHoursCounts[claim.site] || 0) + 1;
                    }
                });
                return {
                    title: 'Average Hours by Site',
                    data: Object.entries(siteHoursTotals).map(([site, total])=>({
                            name: site,
                            value: Math.round(total / siteHoursCounts[site] * 10) / 10
                        })).sort((a, b)=>b.value - a.value).slice(0, 10),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'completionRate':
                const last30DaysCompletion = Array.from({
                    length: 30
                }, (_, i)=>{
                    const date = new Date();
                    date.setDate(date.getDate() - (29 - i));
                    return date.toISOString().split('T')[0];
                });
                const completionByDate = {};
                claims.forEach((claim)=>{
                    const date = claim.created_date.split('T')[0];
                    if (last30DaysCompletion.includes(date)) {
                        if (!completionByDate[date]) completionByDate[date] = {
                            total: 0,
                            completed: 0
                        };
                        completionByDate[date].total += 1;
                        if (claim.status === 'completed') completionByDate[date].completed += 1;
                    }
                });
                return {
                    title: 'Completion Rate Over Time',
                    data: last30DaysCompletion.map((date)=>({
                            name: new Date(date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short'
                            }),
                            value: completionByDate[date] ? Math.round(completionByDate[date].completed / completionByDate[date].total * 100) : 0
                        })),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            case 'topAlerts':
                const topAlertCounts = {};
                claims.forEach((claim)=>{
                    if (claim.alert && !claim.alert_resolution) {
                        topAlertCounts[claim.alert] = (topAlertCounts[claim.alert] || 0) + 1;
                    }
                });
                return {
                    title: 'Top 10 Open Alerts',
                    data: Object.entries(topAlertCounts).map(([alert, count])=>({
                            name: alert,
                            value: count
                        })).sort((a, b)=>b.value - a.value).slice(0, 10),
                    dataKey: 'value',
                    nameKey: 'name'
                };
            default:
                return {
                    title: 'Chart',
                    data: [],
                    dataKey: 'value',
                    nameKey: 'name'
                };
        }
    };
    const renderChart = (chart)=>{
        // Use new format if metricType exists, otherwise use legacy format
        const chartData = chart.metricType ? getChartData(chart) : getLegacyChartData(chart.metric);
        const colors = [
            '#222b57',
            '#56C4B7',
            '#F59E0B',
            '#EF4444',
            '#8B5CF6',
            '#14B8A6',
            '#F97316',
            '#6366F1'
        ];
        switch(chart.type){
            case 'pie':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["PieChart"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Pie"], {
                                data: chartData.data,
                                cx: "50%",
                                cy: "50%",
                                labelLine: false,
                                label: ({ name, percent })=>`${name}: ${(percent * 100).toFixed(0)}%`,
                                outerRadius: 100,
                                fill: "#8884d8",
                                dataKey: chartData.dataKey,
                                children: chartData.data.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Cell"], {
                                        fill: entry.color || colors[index % colors.length]
                                    }, `cell-${index}`, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                        lineNumber: 548,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 537,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 551,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                        lineNumber: 536,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                    lineNumber: 535,
                    columnNumber: 11
                }, this);
            case 'donut':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["PieChart"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Pie"], {
                                data: chartData.data,
                                cx: "50%",
                                cy: "50%",
                                labelLine: false,
                                label: ({ name, percent })=>`${name}: ${(percent * 100).toFixed(0)}%`,
                                innerRadius: 60,
                                outerRadius: 100,
                                fill: "#8884d8",
                                dataKey: chartData.dataKey,
                                children: chartData.data.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Cell"], {
                                        fill: entry.color || colors[index % colors.length]
                                    }, `cell-${index}`, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                        lineNumber: 572,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 560,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 575,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                        lineNumber: 559,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                    lineNumber: 558,
                    columnNumber: 11
                }, this);
            case 'bar':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                        data: chartData.data,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: "#e2e8f0"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 584,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: chartData.nameKey,
                                tick: {
                                    fontSize: 12
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 585,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 586,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 587,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: chartData.dataKey,
                                fill: "#222b57"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 588,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                        lineNumber: 583,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                    lineNumber: 582,
                    columnNumber: 11
                }, this);
            case 'horizontalBar':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                        data: chartData.data,
                        layout: "vertical",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: "#e2e8f0"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 597,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                type: "number"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 598,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                dataKey: chartData.nameKey,
                                type: "category",
                                tick: {
                                    fontSize: 12
                                },
                                width: 100
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 599,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 600,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: chartData.dataKey,
                                fill: "#56C4B7"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 601,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                        lineNumber: 596,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                    lineNumber: 595,
                    columnNumber: 11
                }, this);
            case 'stackedBar':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                        data: chartData.data,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: "#e2e8f0"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 610,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: chartData.nameKey,
                                tick: {
                                    fontSize: 12
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 611,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 612,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 613,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: chartData.dataKey,
                                stackId: "a",
                                fill: "#222b57"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 614,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                        lineNumber: 609,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                    lineNumber: 608,
                    columnNumber: 11
                }, this);
            case 'line':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["LineChart"], {
                        data: chartData.data,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: "#e2e8f0"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 623,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: chartData.nameKey,
                                tick: {
                                    fontSize: 12
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 624,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 625,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 626,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Line"], {
                                type: "monotone",
                                dataKey: chartData.dataKey,
                                stroke: "#222b57",
                                strokeWidth: 2
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 627,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                        lineNumber: 622,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                    lineNumber: 621,
                    columnNumber: 11
                }, this);
            case 'area':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["AreaChart"], {
                        data: chartData.data,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: "#e2e8f0"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 636,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: chartData.nameKey,
                                tick: {
                                    fontSize: 12
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 637,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 638,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 639,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Area"], {
                                type: "monotone",
                                dataKey: chartData.dataKey,
                                stroke: "#222b57",
                                fill: "#222b57",
                                fillOpacity: 0.3
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                lineNumber: 640,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                        lineNumber: 635,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                    lineNumber: 634,
                    columnNumber: 11
                }, this);
            default:
                return null;
        }
    };
    if (enabledCharts.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "text-center py-16 text-slate-400",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: "text-lg mb-2",
                    children: "No charts configured"
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                    lineNumber: 653,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: "text-sm",
                    children: 'Click "Customize" to add charts to your dashboard'
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                    lineNumber: 654,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
            lineNumber: 652,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8",
        children: enabledCharts.map((chart)=>{
            const chartData = chart.metricType ? getChartData(chart) : getLegacyChartData(chart.metric);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-0 shadow-lg bg-white chart-export-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "border-b border-slate-100 pb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "h-5 w-5 text-slate-600"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                        lineNumber: 668,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                    lineNumber: 667,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-lg font-semibold text-slate-800",
                                    children: chartData.title
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                                    lineNumber: 670,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                            lineNumber: 666,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                        lineNumber: 665,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "pt-6",
                        children: renderChart(chart)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                        lineNumber: 673,
                        columnNumber: 13
                    }, this)
                ]
            }, chart.id, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
                lineNumber: 664,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/DynamicChartsSection.jsx",
        lineNumber: 660,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/StatsCard.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>StatsCard
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/card.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import, [project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/framer-motion)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function StatsCard({ title, value, icon: Icon, color, delay = 0, onClick, isActive }) {
    const colorStyles = {
        blue: {
            background: '#222b57',
            shadow: 'rgba(34, 43, 87, 0.25)'
        },
        emerald: {
            background: '#56C4B7',
            shadow: 'rgba(86, 196, 183, 0.25)'
        },
        amber: {
            background: '#F59E0B',
            shadow: 'rgba(245, 158, 11, 0.25)'
        },
        purple: {
            background: '#8B5CF6',
            shadow: 'rgba(139, 92, 246, 0.25)'
        },
        red: {
            background: '#EF4444',
            shadow: 'rgba(239, 68, 68, 0.25)'
        },
        orange: {
            background: '#F97316',
            shadow: 'rgba(249, 115, 22, 0.25)'
        },
        teal: {
            background: '#14B8A6',
            shadow: 'rgba(20, 184, 166, 0.25)'
        },
        indigo: {
            background: '#6366F1',
            shadow: 'rgba(99, 102, 241, 0.25)'
        },
        cyan: {
            background: '#06B6D4',
            shadow: 'rgba(6, 182, 212, 0.25)'
        },
        pink: {
            background: '#EC4899',
            shadow: 'rgba(236, 72, 153, 0.25)'
        },
        slate: {
            background: '#64748B',
            shadow: 'rgba(100, 116, 139, 0.25)'
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5,
            delay
        },
        className: "h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$card$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Card"], {
            className: `border-0 shadow-lg bg-white overflow-hidden transition-all h-full ${onClick ? 'cursor-pointer hover:shadow-xl hover:scale-105' : ''} ${isActive ? 'ring-2 ring-offset-2' : ''}`,
            style: isActive ? {
                ringColor: colorStyles[color].background
            } : {},
            onClick: onClick,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-slate-500 mb-1",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/StatsCard.jsx",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-3xl font-bold text-slate-800",
                                    children: value
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/StatsCard.jsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/StatsCard.jsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "h-12 w-12 rounded-xl shadow-lg flex items-center justify-center",
                            style: {
                                background: colorStyles[color].background,
                                boxShadow: `0 10px 15px -3px ${colorStyles[color].shadow}`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Icon, {
                                className: "h-6 w-6 text-white"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/StatsCard.jsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/StatsCard.jsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/StatsCard.jsx",
                    lineNumber: 33,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/StatsCard.jsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/StatsCard.jsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/StatsCard.jsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ExportChartsButton.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ExportChartsButton
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/button.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/download.js [ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/loader-circle.js [ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$html2canvas__$5b$external$5d$__$28$html2canvas$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$html2canvas$29$__ = __turbopack_context__.i("[externals]/html2canvas [external] (html2canvas, cjs, [project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/html2canvas)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$jspdf__$5b$external$5d$__$28$jspdf$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$jspdf$29$__ = __turbopack_context__.i("[externals]/jspdf [external] (jspdf, cjs, [project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/jspdf)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function ExportChartsButton() {
    const [isExporting, setIsExporting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const handleExport = async ()=>{
        setIsExporting(true);
        try {
            // Find all chart cards
            const chartCards = document.querySelectorAll('.chart-export-card');
            const pdf = new __TURBOPACK__imported__module__$5b$externals$5d2f$jspdf__$5b$external$5d$__$28$jspdf$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$jspdf$29$__["default"]('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;
            let yPosition = margin;
            // Add title
            pdf.setFontSize(16);
            pdf.text('Warranty Claims Report', margin, yPosition);
            yPosition += 10;
            // Add date
            pdf.setFontSize(10);
            pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, yPosition);
            yPosition += 10;
            for(let i = 0; i < chartCards.length; i++){
                const card = chartCards[i];
                // Capture the chart card as canvas
                const canvas = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$html2canvas__$5b$external$5d$__$28$html2canvas$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$html2canvas$29$__["default"])(card, {
                    scale: 2,
                    logging: false,
                    useCORS: true
                });
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pageWidth - margin * 2;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                // Add new page if needed (except for first chart)
                if (i > 0 && yPosition + imgHeight > pageHeight - margin) {
                    pdf.addPage();
                    yPosition = margin;
                }
                // Add chart to PDF
                pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
                yPosition += imgHeight + 10;
                // Add page break if we're running out of space
                if (yPosition > pageHeight - margin - 50 && i < chartCards.length - 1) {
                    pdf.addPage();
                    yPosition = margin;
                }
            }
            // Save the PDF
            pdf.save(`warranty-claims-report-${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error('Error exporting charts:', error);
            alert('Failed to export charts. Please try again.');
        } finally{
            setIsExporting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
        onClick: handleExport,
        disabled: isExporting,
        className: "text-white",
        style: {
            backgroundColor: 'var(--hendy-blue)'
        },
        children: isExporting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "mr-2 h-4 w-4 animate-spin"
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ExportChartsButton.jsx",
                    lineNumber: 81,
                    columnNumber: 11
                }, this),
                "Exporting..."
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                    className: "mr-2 h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ExportChartsButton.jsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this),
                "Export Charts"
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/dashboard/ExportChartsButton.jsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=Desktop_Dev_Hendy_Warranty-Claim-Tracker_src_components_dashboard_040.8l2._.js.map