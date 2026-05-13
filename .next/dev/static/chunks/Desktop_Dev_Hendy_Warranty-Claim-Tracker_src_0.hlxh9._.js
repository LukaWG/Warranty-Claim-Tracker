(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/query-client.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "queryClientInstance",
    ()=>queryClientInstance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/queryClient.js [client] (ecmascript)");
;
const queryClientInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1
        }
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/VisualEditAgent.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VisualEditAgent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/tailwind-merge/dist/bundle-mjs.mjs [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function VisualEditAgent() {
    _s();
    // this functions job is to receive first a message from the parent window, to set or unset visual edits mode. 
    // once in visual edits mode, every hover over an elelmnt that has linenumbers should show an overlay, when clicked - it should stick the overlay and send a message to the parent window with the selected element
    // then, the parent window will have an editor, allow for changes to the tailwind css classes of the selected element, and send the updated css classes back to the iframe. 
    // the iframe will then update the css classes of the selected element.
    // State and refs
    const [isVisualEditMode, setIsVisualEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isVisualEditModeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [isPopoverDragging, setIsPopoverDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isPopoverDraggingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [isDropdownOpen, setIsDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isDropdownOpenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const hoverOverlaysRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])([]); // Multiple overlays for hover
    const selectedOverlaysRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])([]); // Multiple overlays for selection
    const currentHighlightedElementsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])([]); // Multiple elements for hover
    const selectedElementIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null); // Store the visual selector ID
    // Create overlay element
    const createOverlay = (isSelected = false)=>{
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.pointerEvents = 'none';
        overlay.style.transition = 'all 0.1s ease-in-out';
        overlay.style.zIndex = '9999';
        // Use different styles for hover vs selected
        if (isSelected) {
            overlay.style.border = '2px solid #2563EB';
        } else {
            overlay.style.border = '2px solid #95a5fc';
            overlay.style.backgroundColor = 'rgba(99, 102, 241, 0.05)';
        }
        return overlay;
    };
    // Position overlay relative to element
    const positionOverlay = (overlay, element, isSelected = false)=>{
        if (!element || !isVisualEditModeRef.current) return;
        // Force layout recalculation
        void element.offsetWidth;
        const rect = element.getBoundingClientRect();
        overlay.style.top = `${rect.top + window.scrollY}px`;
        overlay.style.left = `${rect.left + window.scrollX}px`; // weird bug with the offset
        overlay.style.width = `${rect.width}px`;
        overlay.style.height = `${rect.height}px`;
        // Check if label already exists in overlay
        let label = overlay.querySelector('div');
        if (!label) {
            // Create new label if it doesn't exist
            label = document.createElement('div');
            label.textContent = element.tagName.toLowerCase();
            label.style.position = 'absolute';
            label.style.top = '-27px';
            label.style.left = '-2px';
            label.style.padding = '2px 8px';
            label.style.fontSize = '11px';
            label.style.fontWeight = isSelected ? '500' : '400';
            label.style.color = isSelected ? '#ffffff' : '#526cff';
            label.style.backgroundColor = isSelected ? '#526cff' : '#DBEAFE';
            label.style.borderRadius = '3px';
            label.style.boxShadow = isSelected ? 'none' : 'none';
            label.style.minWidth = '24px';
            label.style.textAlign = 'center';
            overlay.appendChild(label);
        }
    // If label exists, we preserve its existing styling (don't recreate or modify)
    };
    // Find elements by ID - first try data-source-location, fallback to data-visual-selector-id
    const findElementsById = (id)=>{
        if (!id) return [];
        const sourceElements = [
            ...document.querySelectorAll(`[data-source-location="${id}"]`)
        ];
        if (sourceElements.length > 0) {
            return sourceElements;
        }
        return [
            ...document.querySelectorAll(`[data-visual-selector-id="${id}"]`)
        ];
    };
    // Clear hover overlays
    const clearHoverOverlays = ()=>{
        hoverOverlaysRef.current.forEach((overlay)=>{
            if (overlay && overlay.parentNode) {
                overlay.remove();
            }
        });
        hoverOverlaysRef.current = [];
        currentHighlightedElementsRef.current = [];
    };
    // Handle mouse over event
    const handleMouseOver = (e)=>{
        if (!isVisualEditModeRef.current || isPopoverDraggingRef.current) return;
        // Prevent hover effects when a dropdown is open
        if (isDropdownOpenRef.current) {
            clearHoverOverlays();
            return;
        }
        // Prevent hover effects on SVG path elements
        if (e.target.tagName.toLowerCase() === 'path') {
            clearHoverOverlays();
            return;
        }
        // Support both data-source-location and data-visual-selector-id
        const element = e.target.closest('[data-source-location], [data-visual-selector-id]');
        if (!element) {
            clearHoverOverlays();
            return;
        }
        // Prefer data-source-location, fallback to data-visual-selector-id  
        const selectorId = element.dataset.sourceLocation || element.dataset.visualSelectorId;
        const useSourceLocation = !!element.dataset.sourceLocation;
        // Skip if this element is already selected
        if (selectedElementIdRef.current === selectorId) {
            clearHoverOverlays();
            return;
        }
        // Find all elements with the same ID
        const elements = findElementsById(selectorId, useSourceLocation);
        // Clear previous hover overlays
        clearHoverOverlays();
        // Create overlays for all matching elements
        elements.forEach((el)=>{
            const overlay = createOverlay(false);
            document.body.appendChild(overlay);
            hoverOverlaysRef.current.push(overlay);
            positionOverlay(overlay, el);
        });
        currentHighlightedElementsRef.current = elements;
    };
    // Handle mouse out event
    const handleMouseOut = ()=>{
        if (isPopoverDraggingRef.current) return;
        clearHoverOverlays();
    };
    // Handle element click
    const handleElementClick = (e)=>{
        if (!isVisualEditModeRef.current) return;
        // Close dropdowns when clicking anywhere in iframe if a dropdown is open
        if (isDropdownOpenRef.current) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            // Send message to parent to close all dropdowns
            window.parent.postMessage({
                type: 'close-dropdowns'
            }, '*');
            return;
        }
        // Prevent clicking on SVG path elements
        if (e.target.tagName.toLowerCase() === 'path') {
            return;
        }
        // Prevent default behavior immediately when in visual edit mode
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        // Support both data-source-location and data-visual-selector-id
        const element = e.target.closest('[data-source-location], [data-visual-selector-id]');
        if (!element) {
            return;
        }
        // Prefer data-source-location, fallback to data-visual-selector-id
        const visualSelectorId = element.dataset.sourceLocation || element.dataset.visualSelectorId;
        const useSourceLocation = !!element.dataset.sourceLocation;
        // Clear any existing selected overlays
        selectedOverlaysRef.current.forEach((overlay)=>{
            if (overlay && overlay.parentNode) {
                overlay.remove();
            }
        });
        selectedOverlaysRef.current = [];
        // Find all elements with the same ID
        const elements = findElementsById(visualSelectorId, useSourceLocation);
        // Create selected overlays for all matching elements
        elements.forEach((el)=>{
            const overlay = createOverlay(true);
            document.body.appendChild(overlay);
            selectedOverlaysRef.current.push(overlay);
            positionOverlay(overlay, el, true);
        });
        selectedElementIdRef.current = visualSelectorId;
        // Clear hover overlays
        clearHoverOverlays();
        // Calculate element position for popover positioning
        const rect = element.getBoundingClientRect();
        const elementPosition = {
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height,
            centerX: rect.left + rect.width / 2,
            centerY: rect.top + rect.height / 2
        };
        // Send message to parent window with element info including position
        const elementData = {
            type: 'element-selected',
            tagName: element.tagName,
            classes: element.className?.baseVal || element.className || '',
            visualSelectorId: visualSelectorId,
            content: element.innerText,
            dataSourceLocation: element.dataset.sourceLocation,
            isDynamicContent: element.dataset.dynamicContent === 'true',
            linenumber: element.dataset.linenumber,
            filename: element.dataset.filename,
            position: elementPosition // Add position data for popover
        };
        window.parent.postMessage(elementData, '*');
    };
    // Unselect the current element
    const unselectElement = ()=>{
        // Clear selected overlays
        selectedOverlaysRef.current.forEach((overlay)=>{
            if (overlay && overlay.parentNode) {
                overlay.remove();
            }
        });
        selectedOverlaysRef.current = [];
        selectedElementIdRef.current = null;
    };
    // Update element classes by visual selector ID
    const updateElementClasses = (visualSelectorId, classes, replace = false)=>{
        // Find all elements with the same visual selector ID
        const elements = findElementsById(visualSelectorId);
        if (elements.length === 0) {
            return;
        }
        // Update classes for all matching elements
        elements.forEach((element)=>{
            if (replace) {
                // For reverts, replace classes completely
                element.className = classes;
            } else {
                // For normal updates, merge with existing classes
                const currentClasses = element.className?.baseVal || element.className || '';
                element.className = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["twMerge"])(currentClasses, classes);
            }
        });
        // Use a small delay to allow the browser to recalculate layout before repositioning
        setTimeout(()=>{
            // Reposition selected overlays
            if (selectedElementIdRef.current === visualSelectorId) {
                selectedOverlaysRef.current.forEach((overlay, index)=>{
                    if (index < elements.length) {
                        positionOverlay(overlay, elements[index]);
                    }
                });
            }
            // Reposition hover overlays if needed
            if (currentHighlightedElementsRef.current.length > 0) {
                const hoveredId = currentHighlightedElementsRef.current[0]?.dataset?.visualSelectorId;
                if (hoveredId === visualSelectorId) {
                    hoverOverlaysRef.current.forEach((overlay, index)=>{
                        if (index < currentHighlightedElementsRef.current.length) {
                            positionOverlay(overlay, currentHighlightedElementsRef.current[index]);
                        }
                    });
                }
            }
        }, 50); // Small delay to ensure the browser has time to recalculate layout
    };
    // Update element content by visual selector ID
    const updateElementContent = (visualSelectorId, content)=>{
        // Find all elements with the same visual selector ID
        const elements = findElementsById(visualSelectorId);
        if (elements.length === 0) {
            return;
        }
        // Update content for all matching elements
        elements.forEach((element)=>{
            element.innerText = content;
        });
        // Use a small delay to allow the browser to recalculate layout before repositioning
        setTimeout(()=>{
            // Reposition selected overlays
            if (selectedElementIdRef.current === visualSelectorId) {
                selectedOverlaysRef.current.forEach((overlay, index)=>{
                    if (index < elements.length) {
                        positionOverlay(overlay, elements[index]);
                    }
                });
            }
        }, 50); // Small delay to ensure the browser has time to recalculate layout
    };
    // Toggle visual edit mode
    const toggleVisualEditMode = (isEnabled)=>{
        setIsVisualEditMode(isEnabled);
        isVisualEditModeRef.current = isEnabled;
        if (!isEnabled) {
            // Clear hover overlays
            clearHoverOverlays();
            // Clear selected overlays
            selectedOverlaysRef.current.forEach((overlay)=>{
                if (overlay && overlay.parentNode) {
                    overlay.remove();
                }
            });
            selectedOverlaysRef.current = [];
            currentHighlightedElementsRef.current = [];
            selectedElementIdRef.current = null;
            document.body.style.cursor = 'default';
            // Remove event listeners
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('click', handleElementClick, true);
        } else {
            // Set cursor and add event listeners
            document.body.style.cursor = 'crosshair';
            document.addEventListener('mouseover', handleMouseOver);
            document.addEventListener('mouseout', handleMouseOut);
            document.addEventListener('click', handleElementClick, true); // Use capture mode
        }
    };
    // Listen for messages from parent window
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VisualEditAgent.useEffect": ()=>{
            // Add IDs to elements that don't have them but have linenumbers
            const elementsWithLineNumber = document.querySelectorAll('[data-linenumber]:not([data-visual-selector-id])');
            elementsWithLineNumber.forEach({
                "VisualEditAgent.useEffect": (el, index)=>{
                    const id = `visual-id-${el.dataset.filename}-${el.dataset.linenumber}-${index}`;
                    el.dataset.visualSelectorId = id;
                }
            }["VisualEditAgent.useEffect"]);
            // Handle scroll events to update popover position
            const handleScroll = {
                "VisualEditAgent.useEffect.handleScroll": ()=>{
                    if (selectedElementIdRef.current) {
                        // Find the element using the stored ID
                        const elements = findElementsById(selectedElementIdRef.current);
                        if (elements.length > 0) {
                            const element = elements[0];
                            const rect = element.getBoundingClientRect();
                            // Check if element is in viewport
                            const viewportHeight = window.innerHeight;
                            const viewportWidth = window.innerWidth;
                            const isInViewport = rect.top < viewportHeight && rect.bottom > 0 && rect.left < viewportWidth && rect.right > 0;
                            const elementPosition = {
                                top: rect.top,
                                left: rect.left,
                                right: rect.right,
                                bottom: rect.bottom,
                                width: rect.width,
                                height: rect.height,
                                centerX: rect.left + rect.width / 2,
                                centerY: rect.top + rect.height / 2
                            };
                            window.parent.postMessage({
                                type: 'element-position-update',
                                position: elementPosition,
                                isInViewport: isInViewport,
                                visualSelectorId: selectedElementIdRef.current
                            }, '*');
                        }
                    }
                }
            }["VisualEditAgent.useEffect.handleScroll"];
            const handleMessage = {
                "VisualEditAgent.useEffect.handleMessage": (event)=>{
                    // Check origin if desired
                    //if (event.origin !== 'parent-origin') return;
                    const message = event.data;
                    switch(message.type){
                        case 'toggle-visual-edit-mode':
                            toggleVisualEditMode(message.data.enabled);
                            break;
                        case 'update-classes':
                            if (message.data && message.data.classes !== undefined) {
                                // Update with the visual selector ID
                                // Pass replace flag if provided (used for reverts)
                                updateElementClasses(message.data.visualSelectorId, message.data.classes, message.data.replace || false);
                            } else {
                                console.warn('[Agent] Invalid update-classes message:', message);
                            }
                            break;
                        case 'unselect-element':
                            unselectElement();
                            break;
                        case 'refresh-page':
                            window.location.reload();
                            break;
                        case 'update-content':
                            if (message.data && message.data.content !== undefined) {
                                updateElementContent(message.data.visualSelectorId, message.data.content);
                            } else {
                                console.warn('[Agent] Invalid update-content message:', message);
                            }
                            break;
                        case 'request-element-position':
                            // Send current position of selected element for popover repositioning
                            if (selectedElementIdRef.current) {
                                // Find the element using the stored ID
                                const elements = findElementsById(selectedElementIdRef.current);
                                if (elements.length > 0) {
                                    const element = elements[0];
                                    const rect = element.getBoundingClientRect();
                                    // Check if element is in viewport
                                    const viewportHeight = window.innerHeight;
                                    const viewportWidth = window.innerWidth;
                                    const isInViewport = rect.top < viewportHeight && rect.bottom > 0 && rect.left < viewportWidth && rect.right > 0;
                                    const elementPosition = {
                                        top: rect.top,
                                        left: rect.left,
                                        right: rect.right,
                                        bottom: rect.bottom,
                                        width: rect.width,
                                        height: rect.height,
                                        centerX: rect.left + rect.width / 2,
                                        centerY: rect.top + rect.height / 2
                                    };
                                    window.parent.postMessage({
                                        type: 'element-position-update',
                                        position: elementPosition,
                                        isInViewport: isInViewport,
                                        visualSelectorId: selectedElementIdRef.current
                                    }, '*');
                                }
                            }
                            break;
                        case 'popover-drag-state':
                            // Handle popover drag state to prevent mouseover conflicts
                            if (message.data && message.data.isDragging !== undefined) {
                                setIsPopoverDragging(message.data.isDragging);
                                isPopoverDraggingRef.current = message.data.isDragging;
                                // Clear hover overlays when dragging starts
                                if (message.data.isDragging) {
                                    clearHoverOverlays();
                                }
                            }
                            break;
                        case 'dropdown-state':
                            // Handle dropdown open/close state
                            if (message.data && message.data.isOpen !== undefined) {
                                setIsDropdownOpen(message.data.isOpen);
                                isDropdownOpenRef.current = message.data.isOpen;
                                // Clear hover overlays when dropdown opens
                                if (message.data.isOpen) {
                                    clearHoverOverlays();
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }["VisualEditAgent.useEffect.handleMessage"];
            window.addEventListener('message', handleMessage);
            window.addEventListener('scroll', handleScroll, true); // Use capture to catch all scroll events
            document.addEventListener('scroll', handleScroll, true); // Also listen on document
            // Send ready message to parent
            window.parent.postMessage({
                type: 'visual-edit-agent-ready'
            }, '*');
            return ({
                "VisualEditAgent.useEffect": ()=>{
                    window.removeEventListener('message', handleMessage);
                    window.removeEventListener('scroll', handleScroll, true);
                    document.removeEventListener('scroll', handleScroll, true);
                    document.removeEventListener('mouseover', handleMouseOver);
                    document.removeEventListener('mouseout', handleMouseOut);
                    document.removeEventListener('click', handleElementClick, true);
                    // Clean up all overlays
                    clearHoverOverlays();
                    selectedOverlaysRef.current.forEach({
                        "VisualEditAgent.useEffect": (overlay)=>{
                            if (overlay && overlay.parentNode) {
                                overlay.remove();
                            }
                        }
                    }["VisualEditAgent.useEffect"]);
                }
            })["VisualEditAgent.useEffect"];
        }
    }["VisualEditAgent.useEffect"], []);
    // Keep the refs in sync with state changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VisualEditAgent.useEffect": ()=>{
            isVisualEditModeRef.current = isVisualEditMode;
        }
    }["VisualEditAgent.useEffect"], [
        isVisualEditMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VisualEditAgent.useEffect": ()=>{
            isPopoverDraggingRef.current = isPopoverDragging;
        }
    }["VisualEditAgent.useEffect"], [
        isPopoverDragging
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VisualEditAgent.useEffect": ()=>{
            isDropdownOpenRef.current = isDropdownOpen;
        }
    }["VisualEditAgent.useEffect"], [
        isDropdownOpen
    ]);
    // Handle window resize and scroll to reposition overlays
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VisualEditAgent.useEffect": ()=>{
            const handleResize = {
                "VisualEditAgent.useEffect.handleResize": ()=>{
                    // Reposition selected overlays
                    if (selectedElementIdRef.current) {
                        const elements = findElementsById(selectedElementIdRef.current);
                        selectedOverlaysRef.current.forEach({
                            "VisualEditAgent.useEffect.handleResize": (overlay, index)=>{
                                if (index < elements.length) {
                                    positionOverlay(overlay, elements[index]);
                                }
                            }
                        }["VisualEditAgent.useEffect.handleResize"]);
                    }
                    // Reposition hover overlays
                    if (currentHighlightedElementsRef.current.length > 0) {
                        hoverOverlaysRef.current.forEach({
                            "VisualEditAgent.useEffect.handleResize": (overlay, index)=>{
                                if (index < currentHighlightedElementsRef.current.length) {
                                    positionOverlay(overlay, currentHighlightedElementsRef.current[index]);
                                }
                            }
                        }["VisualEditAgent.useEffect.handleResize"]);
                    }
                }
            }["VisualEditAgent.useEffect.handleResize"];
            // Create a mutation observer to detect changes in the DOM
            const mutationObserver = new MutationObserver({
                "VisualEditAgent.useEffect": (mutations)=>{
                    // Check if mutations affect relevant elements
                    const needsUpdate = mutations.some({
                        "VisualEditAgent.useEffect.needsUpdate": (mutation)=>{
                            // Check if the target or its children have data-visual-selector-id
                            const hasVisualId = {
                                "VisualEditAgent.useEffect.needsUpdate.hasVisualId": (node)=>{
                                    if (node.nodeType === Node.ELEMENT_NODE) {
                                        if (node.dataset && node.dataset.visualSelectorId) {
                                            return true;
                                        }
                                        // Check children
                                        for(let i = 0; i < node.children.length; i++){
                                            if (hasVisualId(node.children[i])) {
                                                return true;
                                            }
                                        }
                                    }
                                    return false;
                                }
                            }["VisualEditAgent.useEffect.needsUpdate.hasVisualId"];
                            // Check if this is a style or attribute mutation that might affect layout
                            const isLayoutChange = mutation.type === 'attributes' && (mutation.attributeName === 'style' || mutation.attributeName === 'class' || mutation.attributeName === 'width' || mutation.attributeName === 'height');
                            // Check if target is or contains an element with visual selector ID
                            return isLayoutChange && hasVisualId(mutation.target);
                        }
                    }["VisualEditAgent.useEffect.needsUpdate"]);
                    if (needsUpdate) {
                        // Use timeout to let browser calculate layout
                        setTimeout(handleResize, 50);
                    }
                }
            }["VisualEditAgent.useEffect"]);
            // Start observing
            mutationObserver.observe(document.body, {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: [
                    'style',
                    'class',
                    'width',
                    'height'
                ]
            });
            window.addEventListener('resize', handleResize);
            window.addEventListener('scroll', handleResize);
            return ({
                "VisualEditAgent.useEffect": ()=>{
                    window.removeEventListener('resize', handleResize);
                    window.removeEventListener('scroll', handleResize);
                    mutationObserver.disconnect();
                }
            })["VisualEditAgent.useEffect"];
        }
    }["VisualEditAgent.useEffect"], []);
    // No visible UI - all functionality is handled through event listeners and message passing
    return null;
}
_s(VisualEditAgent, "84MW9pHTJU+YyNRddCZkXd2FtUE=");
_c = VisualEditAgent;
var _c;
__turbopack_context__.k.register(_c, "VisualEditAgent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/app-params.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appParams",
    ()=>appParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
const isNode = ("TURBOPACK compile-time value", "object") === 'undefined';
const windowObj = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window;
const storage = windowObj.localStorage;
const toSnakeCase = (str)=>{
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};
const getEnvValue = (key)=>{
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env[key] !== undefined) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env[key];
    }
    return undefined;
};
const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {})=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const storageKey = `base44_${toSnakeCase(paramName)}`;
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get(paramName);
    if (removeFromUrl) {
        urlParams.delete(paramName);
        const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}${window.location.hash}`;
        window.history.replaceState({}, document.title, newUrl);
    }
    if (searchParam) {
        storage.setItem(storageKey, searchParam);
        return searchParam;
    }
    if (defaultValue) {
        storage.setItem(storageKey, defaultValue);
        return defaultValue;
    }
    const storedValue = storage.getItem(storageKey);
    if (storedValue) {
        return storedValue;
    }
    return null;
};
const getAppParams = ()=>{
    if (getAppParamValue("clear_access_token") === 'true') {
        storage.removeItem('base44_access_token');
        storage.removeItem('token');
    }
    return {
        appId: getAppParamValue("app_id", {
            defaultValue: getEnvValue('NEXT_PUBLIC_BASE44_APP_ID') ?? getEnvValue('VITE_BASE44_APP_ID')
        }),
        serverUrl: getAppParamValue("server_url", {
            defaultValue: getEnvValue('NEXT_PUBLIC_BASE44_BACKEND_URL') ?? getEnvValue('VITE_BASE44_BACKEND_URL')
        }),
        token: getAppParamValue("access_token", {
            removeFromUrl: true
        }),
        fromUrl: getAppParamValue("from_url", {
            defaultValue: ("TURBOPACK compile-time truthy", 1) ? window.location.href : "TURBOPACK unreachable"
        }),
        functionsVersion: getAppParamValue("functions_version", {
            defaultValue: getEnvValue('NEXT_PUBLIC_BASE44_FUNCTIONS_VERSION') ?? getEnvValue('VITE_BASE44_FUNCTIONS_VERSION')
        })
    };
};
const appParams = {
    ...getAppParams()
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/AuthContext.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/api/base44Client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$app$2d$params$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/app-params.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$axios$2d$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/axios-client.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])();
const AuthProvider = ({ children })=>{
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingAuth, setIsLoadingAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isLoadingPublicSettings, setIsLoadingPublicSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [authError, setAuthError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [appPublicSettings, setAppPublicSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null); // Contains only { id, public_settings }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            checkAppState();
        }
    }["AuthProvider.useEffect"], []);
    const checkAppState = async ()=>{
        try {
            setIsLoadingPublicSettings(true);
            setAuthError(null);
            // First, check app public settings (with token if available)
            // This will tell us if auth is required, user not registered, etc.
            const appClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$axios$2d$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createAxiosClient"])({
                baseURL: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$app$2d$params$2e$js__$5b$client$5d$__$28$ecmascript$29$__["appParams"].serverUrl}/api/apps/public`,
                headers: {
                    'X-App-Id': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$app$2d$params$2e$js__$5b$client$5d$__$28$ecmascript$29$__["appParams"].appId
                },
                token: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$app$2d$params$2e$js__$5b$client$5d$__$28$ecmascript$29$__["appParams"].token,
                interceptResponses: true
            });
            try {
                const publicSettings = await appClient.get(`/prod/public-settings/by-id/${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$app$2d$params$2e$js__$5b$client$5d$__$28$ecmascript$29$__["appParams"].appId}`);
                setAppPublicSettings(publicSettings);
                // If we got the app public settings successfully, check if user is authenticated
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$app$2d$params$2e$js__$5b$client$5d$__$28$ecmascript$29$__["appParams"].token) {
                    await checkUserAuth();
                } else {
                    setIsLoadingAuth(false);
                    setIsAuthenticated(false);
                }
                setIsLoadingPublicSettings(false);
            } catch (appError) {
                console.error('App state check failed:', appError);
                // Handle app-level errors
                if (appError.status === 403 && appError.data?.extra_data?.reason) {
                    const reason = appError.data.extra_data.reason;
                    if (reason === 'auth_required') {
                        setAuthError({
                            type: 'auth_required',
                            message: 'Authentication required'
                        });
                    } else if (reason === 'user_not_registered') {
                        setAuthError({
                            type: 'user_not_registered',
                            message: 'User not registered for this app'
                        });
                    } else {
                        setAuthError({
                            type: reason,
                            message: appError.message
                        });
                    }
                } else {
                    setAuthError({
                        type: 'unknown',
                        message: appError.message || 'Failed to load app'
                    });
                }
                setIsLoadingPublicSettings(false);
                setIsLoadingAuth(false);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setAuthError({
                type: 'unknown',
                message: error.message || 'An unexpected error occurred'
            });
            setIsLoadingPublicSettings(false);
            setIsLoadingAuth(false);
        }
    };
    const checkUserAuth = async ()=>{
        try {
            // Now check if the user is authenticated
            setIsLoadingAuth(true);
            const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["base44"].auth.me();
            setUser(currentUser);
            setIsAuthenticated(true);
            setIsLoadingAuth(false);
        } catch (error) {
            console.error('User auth check failed:', error);
            setIsLoadingAuth(false);
            setIsAuthenticated(false);
            // If user auth fails, it might be an expired token
            if (error.status === 401 || error.status === 403) {
                setAuthError({
                    type: 'auth_required',
                    message: 'Authentication required'
                });
            }
        }
    };
    const logout = (shouldRedirect = true)=>{
        setUser(null);
        setIsAuthenticated(false);
        if (shouldRedirect) {
            // Use the SDK's logout method which handles token cleanup and redirect
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["base44"].auth.logout(window.location.href);
        } else {
            // Just remove the token without redirect
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["base44"].auth.logout();
        }
    };
    const navigateToLogin = ()=>{
        // Use the SDK's redirectToLogin method
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["base44"].auth.redirectToLogin(window.location.href);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isAuthenticated,
            isLoadingAuth,
            isLoadingPublicSettings,
            authError,
            appPublicSettings,
            logout,
            navigateToLogin,
            checkAppState
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/AuthContext.jsx",
        lineNumber: 132,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "18qXjxcC3+N6YL62sXiNWGI7Vw4=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/utils.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "isIframe",
    ()=>isIframe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/clsx/dist/clsx.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/tailwind-merge/dist/bundle-mjs.mjs [client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const isIframe = ("TURBOPACK compile-time value", "object") !== 'undefined' && window.self !== window.top;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/NavigationTracker.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NavigationTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$AuthContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/AuthContext.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/api/base44Client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2e$config$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/pages.config.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function NavigationTracker() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$AuthContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { Pages, mainPage } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2e$config$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pagesConfig"];
    const mainPageKey = mainPage ?? Object.keys(Pages)[0];
    // Post navigation changes to parent window
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavigationTracker.useEffect": ()=>{
            window.parent?.postMessage({
                type: 'app_changed_url',
                url: window.location.href
            }, '*');
        }
    }["NavigationTracker.useEffect"], [
        router.asPath
    ]);
    // Log user activity when navigating to a page
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavigationTracker.useEffect": ()=>{
            const rawPathname = router.asPath || '/';
            const normalizedPathname = rawPathname.replace(/^\/Warranty-Claim-Tracker/, '') || '/';
            let pageName;
            if (normalizedPathname === '/' || normalizedPathname === '') {
                pageName = mainPageKey;
            } else {
                const pathSegment = normalizedPathname.replace(/^\//, '').split('/')[0];
                const pageKeys = Object.keys(Pages);
                const matchedKey = pageKeys.find({
                    "NavigationTracker.useEffect.matchedKey": (key)=>key.toLowerCase() === pathSegment.toLowerCase()
                }["NavigationTracker.useEffect.matchedKey"]);
                pageName = matchedKey || null;
            }
            if (isAuthenticated && pageName) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$base44Client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["base44"].appLogs.logUserInApp(pageName).catch({
                    "NavigationTracker.useEffect": ()=>{
                    // Silently fail - logging shouldn't break the app
                    }
                }["NavigationTracker.useEffect"]);
            }
        }
    }["NavigationTracker.useEffect"], [
        router.asPath,
        isAuthenticated,
        Pages,
        mainPageKey
    ]);
    return null;
}
_s(NavigationTracker, "WAuBMp+TMi+q3vs56DA8CDS3krI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$AuthContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = NavigationTracker;
var _c;
__turbopack_context__.k.register(_c, "NavigationTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/api/base44Client.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base44",
    ()=>base44
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$app$2d$params$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/app-params.js [client] (ecmascript)");
;
;
const { appId, serverUrl, token, functionsVersion } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$app$2d$params$2e$js__$5b$client$5d$__$28$ecmascript$29$__["appParams"];
const base44 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createClient"])({
    appId,
    serverUrl,
    token,
    functionsVersion,
    requiresAuth: false
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/api/databaseClient.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "databaseClients",
    ()=>databaseClients,
    "getData",
    ()=>getData,
    "updateSite",
    ()=>updateSite
]);
// TODO
// [x] Change implementation to be class based with create, update, delete, and get functions.
// [x] Instantiate for each json file and export instance. For example, export const siteClient = new DatabaseClient('Site');
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/data/data.js [client] (ecmascript)");
;
const ACTING_USER_STORAGE_KEY = 'actingUserId';
function loadActingUserId() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem(ACTING_USER_STORAGE_KEY);
}
function saveActingUserId(userId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (userId === null || typeof userId === 'undefined') {
        localStorage.removeItem(ACTING_USER_STORAGE_KEY);
    } else {
        localStorage.setItem(ACTING_USER_STORAGE_KEY, String(userId));
    }
    window.dispatchEvent(new Event('acting-user-changed'));
}
let actingUserId = loadActingUserId();
class DatabaseClient {
    constructor(fileName){
        this.fileName = fileName;
        this.fetch();
    }
    async create(data) {
        // Create a new entry
        await this.fetch();
        this.data.push(data);
        await this.save();
    }
    async fetch() {
        // Fetch data from the source
        this.data = readJsonFile(this.fileName);
    }
    async get() {
        // Get all entries or a specific entry by id
        // [ ] Rewrite this so that it fetches data here. Will be needed when data is changed to fetch new data from the soruce
        //     Means that the constructor should call this.get instead of readJsonFile directly
        await this.fetch();
        return this.data;
    }
    async update(id, data) {
        // Implementation for updating data
        await this.fetch();
        const index = this.data.findIndex((item)=>item.id === id);
        if (index === -1) {
            throw new Error(`Item with id ${id} not found`);
        }
        this.data[index] = {
            ...this.data[index],
            ...data
        };
        await this.save();
    }
    async delete(id) {
        // Implementation for deleting data
        await this.fetch();
        this.data = this.data.filter((item)=>item.id !== id);
        await this.save();
    }
    async me() {
        if (this.fileName !== 'User') {
            throw new Error('me() is only available on the User client');
        }
        if (actingUserId) {
            const result = await this.query('*', `id=${actingUserId}`);
            return Array.isArray(result) ? result[0] : result;
        }
        const defaultUser = await this.query('*', 'email=lwilson-green@hendy-group.com');
        return Array.isArray(defaultUser) ? defaultUser[0] : defaultUser;
    }
    setTestingUser(userId) {
        if (this.fileName !== 'User') {
            throw new Error('setTestingUser() is only available on the User client');
        }
        actingUserId = userId;
        saveActingUserId(userId);
    }
    clearTestingUser() {
        if (this.fileName !== 'User') {
            throw new Error('clearTestingUser() is only available on the User client');
        }
        actingUserId = null;
        saveActingUserId(null);
    }
    getActingUserId() {
        if (this.fileName !== 'User') {
            throw new Error('getActingUserId() is only available on the User client');
        }
        return actingUserId;
    }
    async save() {
        // Implementation for saving data back to the source
        // For now, replace the variable in this file. In the future, we can write to the JSON file or use a real database.
        if (this.fileName === 'Site') {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["siteData"][0] = this.data;
        } else if (this.fileName === 'Alert') {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["alertData"][0] = this.data;
        } else if (this.fileName === 'AlertResolution') {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["alertResolutionData"][0] = this.data;
        } else if (this.fileName === 'Brand') {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["brandData"][0] = this.data;
        } else if (this.fileName === 'ClaimAudit') {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["claimAuditData"][0] = this.data;
        } else if (this.fileName === 'ClaimNote') {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["claimNoteData"][0] = this.data;
        } else if (this.fileName === 'PendingUserInvite') {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pendingUserInviteData"][0] = this.data;
        } else if (this.fileName === 'User') {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["userData"][0] = this.data;
        } else if (this.fileName === 'WarrantyClaim') {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["warrantyClaimData"][0] = this.data;
        }
    }
    async query(select = '*', where = "") {
        // Implementation for querying data with select and where clauses
        await this.fetch();
        let data = this.data;
        if (where) {
            const [key, value] = where.split('=');
            if (key && typeof value !== 'undefined') {
                const filterKey = key.trim();
                const filterValue = value.trim();
                data = data.filter((item)=>{
                    const itemValue = item[filterKey];
                    if (itemValue === undefined || itemValue === null) {
                        return false;
                    }
                    return String(itemValue) === filterValue;
                });
            }
        }
        if (select === '*') {
            return data;
        }
        return data.map((item)=>{
            const selected = {};
            select.split(',').forEach((key)=>{
                selected[key.trim()] = item[key.trim()];
            });
            return selected;
        });
    }
}
class SiteClient extends DatabaseClient {
    constructor(){
        super('Site');
    // format data in brands and brand rates to be stored into an array
    }
}
class DatabaseClients {
    constructor(){
        this.clients = {};
        const fileNames = [
            'Alert',
            'AlertResolution',
            'Brand',
            'ClaimAudit',
            'ClaimNote',
            'PendingUserInvite',
            'User',
            'WarrantyClaim',
            'Site'
        ];
        fileNames.forEach((fileName)=>{
            const client = fileName === 'Site' ? new SiteClient() : new DatabaseClient(fileName);
            this.clients[fileName] = client;
            this[fileName] = client;
        });
    }
}
const databaseClients = new DatabaseClients();
const dataFolder = '/data';
function getJsonFilePath(fileName) {
    const path = `${dataFolder}/${fileName}.json`;
    alert(path);
    return path;
}
function readJsonFile(fileName) {
    if (fileName === 'Site') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["siteData"][0];
    } else if (fileName === 'Alert') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["alertData"][0];
    } else if (fileName === 'AlertResolution') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["alertResolutionData"][0];
    } else if (fileName === 'Brand') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["brandData"][0];
    } else if (fileName === 'ClaimAudit') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["claimAuditData"][0];
    } else if (fileName === 'ClaimNote') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["claimNoteData"][0];
    } else if (fileName === 'PendingUserInvite') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pendingUserInviteData"][0];
    } else if (fileName === 'WarrantyClaim') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["warrantyClaimData"][0];
    } else if (fileName === 'PendingApprovals') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["warrantyClaimData"][0].filter((claim)=>claim.approval_status === 'pending_approval');
    } else if (fileName === 'User') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["userData"][0];
    } else {
        throw new Error(`Unknown file name: ${fileName}`);
    }
}
async function addData(fileName, data) {
    // Get current data
    const currentData = await readJsonFile(fileName);
    // Append new data
    const updatedData = [
        ...currentData,
        ...data
    ];
}
/**
 * 
 * @param {string} fileName 
 * @param {string} where - format: "key=value"
 * @param {Array<string>} data - format: [{key: value}, ...]
 */ async function updateData(fileName, where, data) {
    const currentData = await readJsonFile(fileName);
    // split where clause
    const [key, value] = where.split('=');
    if (!key || typeof value === 'undefined') {
        throw new Error(`Invalid where clause: ${where}`);
    }
    // Get data that matches where clause but do not update yet
    const matchingData = currentData.filter((item)=>{
        const itemValue = item[key.trim()];
        if (itemValue === undefined || itemValue === null) {
            return false;
        }
        return String(itemValue) === value.trim();
    });
    // Update data in matching data with data in fomat [{key: value}, ...]
    const updatedData = matchingData.map((item)=>{
        const updatedItem = {
            ...item
        };
        data.forEach((field)=>{
            updatedItem[field.key] = field.value;
        });
        return updatedItem;
    });
}
async function updateSite(siteId, data) {
    // For now, just update the variable in this file. In the future, we can write to the JSON file or use a real database.
    const siteIndex = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["siteData"][0].findIndex((site)=>site.id === siteId);
    if (siteIndex === -1) {
        throw new Error(`Site with id ${siteId} not found`);
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["siteData"][0][siteIndex] = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["siteData"][0][siteIndex],
        ...data
    };
}
async function getData(fileName, select = '*', where = "") {
    let data = await readJsonFile(fileName);
    if (where) {
        const [key, value] = where.split('=');
        if (key && typeof value !== 'undefined') {
            const filterKey = key.trim();
            const filterValue = value.trim();
            data = data.filter((item)=>{
                const itemValue = item[filterKey];
                if (itemValue === undefined || itemValue === null) {
                    return false;
                }
                return String(itemValue) === filterValue;
            });
        }
    }
    if (select === '*') {
        return data;
    }
    return data.map((item)=>{
        const selected = {};
        select.split(',').forEach((key)=>{
            selected[key.trim()] = item[key.trim()];
        });
        return selected;
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/utils/index.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE_PATH",
    ()=>BASE_PATH,
    "createPageUrl",
    ()=>createPageUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
const BASE_PATH = ("TURBOPACK compile-time value", "/Warranty-Claim-Tracker") || '/Warranty-Claim-Tracker';
function createPageUrl(pageName) {
    if (!pageName || pageName === '/') {
        return `${BASE_PATH}`;
    }
    return `${BASE_PATH}/${pageName.replace(/ /g, '-')}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Layout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/utils/index.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/settings.js [client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$pen$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileEdit$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/file-pen.js [client] (ecmascript) <export default as FileEdit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/search.js [client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/chart-column.js [client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/log-out.js [client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/menu.js [client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/lucide-react/dist/esm/icons/shield-check.js [client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/lib/utils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/ui/button.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$layout$2f$SearchModal$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/SearchModal.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$layout$2f$HendyLogo$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/layout/HendyLogo.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$auth$2f$ApplyPendingUserInfo$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/components/auth/ApplyPendingUserInfo.jsx [client] (ecmascript)");
// import { base44 } from '@/api/base44Client';
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/useQuery.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$databaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/api/databaseClient.js [client] (ecmascript)");
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
;
;
;
function Layout({ children, currentPageName }) {
    _s();
    const [searchOpen, setSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [roleOverride, setRoleOverride] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // CHANGING USER
    const [actingUserId, setActingUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        "Layout.useState": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$databaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["databaseClients"].User.getActingUserId()
    }["Layout.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Layout.useEffect": ()=>{
            const handleActingUserChanged = {
                "Layout.useEffect.handleActingUserChanged": ()=>{
                    setActingUserId(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$databaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["databaseClients"].User.getActingUserId());
                }
            }["Layout.useEffect.handleActingUserChanged"];
            window.addEventListener('acting-user-changed', handleActingUserChanged);
            return ({
                "Layout.useEffect": ()=>window.removeEventListener('acting-user-changed', handleActingUserChanged)
            })["Layout.useEffect"];
        }
    }["Layout.useEffect"], []);
    // END CHANGING USER
    const { data: currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'currentUser',
            actingUserId
        ],
        // [ ] Sort user logic and get current user here. For now just getting me manually
        queryFn: {
            "Layout.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$api$2f$databaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["databaseClients"].User.me()
        }["Layout.useQuery"],
        staleTime: 30000
    });
    const allNavItems = [
        {
            name: 'ClaimForm',
            label: 'Submit Repair',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$pen$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileEdit$3e$__["FileEdit"],
            roles: [
                'Processor',
                'Site Manager',
                'Service Manager',
                'Owner'
            ]
        },
        {
            name: 'Dashboard',
            label: 'Dashboard',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
            roles: [
                'Processor',
                'Site Manager',
                'Admin Manager',
                'Admin',
                'Service Manager',
                'Owner'
            ]
        },
        {
            name: 'Reporting',
            label: 'Reporting',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
            roles: [
                'Admin Manager',
                'Service Manager',
                'Owner'
            ]
        },
        {
            name: 'Approvals',
            label: 'Approvals',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"],
            roles: [
                'Admin Manager',
                'Service Manager',
                'Owner'
            ]
        },
        {
            name: 'Configuration',
            label: 'Configuration',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
            roles: [
                'Service Manager',
                'Owner'
            ]
        },
        {
            name: 'ChangeUser',
            label: 'Change User',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
            roles: [
                'Processor',
                'Site Manager',
                'Admin Manager',
                'Admin',
                'Service Manager',
                'Owner'
            ]
        }
    ];
    const displayRole = roleOverride || currentUser?.custom_role || currentUser?.role;
    const navItems = currentUser ? allNavItems.filter((item)=>item.roles.includes(displayRole)) : allNavItems;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-50 flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$auth$2f$ApplyPendingUserInfo$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        :root {
          --hendy-blue: #222b57;
          --hendy-teal: #56C4B7;
          --hendy-grey: #575756;
        }
      `
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-40 lg:hidden",
                onClick: ()=>setSidebarOpen(false)
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                lineNumber: 67,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["cn"])("fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:translate-x-0", sidebarOpen ? "translate-x-0" : "-translate-x-full"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border-b border-slate-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 83,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "lg:hidden",
                                        onClick: ()=>setSidebarOpen(false),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl font-bold tracking-wider",
                                        style: {
                                            color: 'var(--hendy-blue)'
                                        },
                                        children: "HENDY"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-slate-500 mb-1",
                                        children: "EST. 1859"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-medium",
                                        style: {
                                            color: 'var(--hendy-teal)'
                                        },
                                        children: "Warranty Repair Manager"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 p-4 overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3",
                                children: "MENU"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    displayRole !== 'Processor' && displayRole !== 'Site Manager' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setSearchOpen(true);
                                            setSidebarOpen(false);
                                        },
                                        className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "h-5 w-5 text-slate-500"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                                lineNumber: 118,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium",
                                                children: "Search Repairs"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this),
                                    navItems.map((item)=>{
                                        const Icon = item.icon;
                                        const isActive = currentPageName === item.name;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["createPageUrl"])(item.name),
                                            onClick: ()=>setSidebarOpen(false),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "text-white" : "text-slate-700 hover:bg-slate-100"),
                                            style: isActive ? {
                                                backgroundColor: 'var(--hendy-blue)'
                                            } : {},
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$lib$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["cn"])("h-5 w-5", isActive ? "text-white" : "text-slate-500")
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                                    lineNumber: 138,
                                                    columnNumber: 19
                                                }, this),
                                                item.label
                                            ]
                                        }, item.name, true, {
                                            fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                            lineNumber: 126,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-t border-slate-200",
                        children: [
                            currentUser && ("TURBOPACK compile-time value", "development") === 'development' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: roleOverride || currentUser.custom_role || currentUser.role || '',
                                onChange: (e)=>setRoleOverride(e.target.value || null),
                                className: "w-full mb-3 px-3 py-2 rounded-lg text-xs bg-slate-100 text-slate-600 border-0 hover:bg-slate-200 cursor-pointer",
                                title: "Preview as role",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Processor",
                                        children: "View as: Processor"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Site Manager",
                                        children: "View as: Site Manager"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Admin Manager",
                                        children: "View as: Admin Manager"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 157,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Admin",
                                        children: "View as: Admin"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Service Manager",
                                        children: "View as: Service Manager"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Owner",
                                        children: "View as: Owner"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    // [ ] Implement log out logic
                                    // localStorage.removeItem('base44_access_token');
                                    // localStorage.removeItem('base44_token');
                                    // localStorage.removeItem('token');
                                    // base44.auth.redirectToLogin();
                                    alert("Logged out");
                                },
                                className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                        className: "h-5 w-5 text-slate-500"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium",
                                        children: "Logout"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this),
                            currentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm",
                                        style: {
                                            backgroundColor: 'var(--hendy-blue)'
                                        },
                                        children: currentUser.full_name?.charAt(0).toUpperCase() || currentUser.email?.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-medium text-slate-900 truncate",
                                                children: currentUser.full_name || 'User'
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                                lineNumber: 186,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-500 truncate",
                                                children: currentUser.email
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                                lineNumber: 189,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                onClick: ()=>setSidebarOpen(true),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$layout$2f$HendyLogo$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: 24,
                                        variant: "icon"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold",
                                        style: {
                                            color: 'var(--hendy-blue)'
                                        },
                                        children: "HENDY"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$components$2f$layout$2f$SearchModal$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                open: searchOpen,
                onClose: ()=>setSearchOpen(false)
            }, void 0, false, {
                fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
                lineNumber: 222,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(Layout, "sy5zC6V44tOL3cji/h0vq+uEq1I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = Layout;
var _c;
__turbopack_context__.k.register(_c, "Layout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/pages.config.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PAGES",
    ()=>PAGES,
    "pagesConfig",
    ()=>pagesConfig
]);
/**
 * pages.config.js - Page routing configuration
 * 
 * mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2f$ClaimForm$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/pages/ClaimForm.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2f$Dashboard$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/pages/Dashboard.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2f$Home$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/pages/Home.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2f$Reporting$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/pages/Reporting.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2f$Configuration$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/pages/Configuration.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2f$ChangeUser$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/pages/ChangeUser.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$Layout$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/src/Layout.jsx [client] (ecmascript)");
;
;
;
;
;
;
;
const PAGES = {
    "ClaimForm": __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2f$ClaimForm$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"],
    "Dashboard": __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2f$Dashboard$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"],
    "Home": __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2f$Home$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"],
    "Reporting": __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2f$Reporting$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"],
    "Configuration": __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2f$Configuration$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"],
    "ChangeUser": __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$pages$2f$ChangeUser$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"]
};
const pagesConfig = {
    mainPage: "ClaimForm",
    Pages: PAGES,
    Layout: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$src$2f$Layout$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_Dev_Hendy_Warranty-Claim-Tracker_src_0.hlxh9._.js.map