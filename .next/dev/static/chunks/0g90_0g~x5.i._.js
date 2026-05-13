(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/scheduler/cjs/scheduler.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
if ("TURBOPACK compile-time truthy", 1) {
    (function() {
        'use strict';
        /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === 'function') {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var enableSchedulerDebugging = false;
        var enableProfiling = false;
        var frameYieldMs = 5;
        function push(heap, node) {
            var index = heap.length;
            heap.push(node);
            siftUp(heap, node, index);
        }
        function peek(heap) {
            return heap.length === 0 ? null : heap[0];
        }
        function pop(heap) {
            if (heap.length === 0) {
                return null;
            }
            var first = heap[0];
            var last = heap.pop();
            if (last !== first) {
                heap[0] = last;
                siftDown(heap, last, 0);
            }
            return first;
        }
        function siftUp(heap, node, i) {
            var index = i;
            while(index > 0){
                var parentIndex = index - 1 >>> 1;
                var parent = heap[parentIndex];
                if (compare(parent, node) > 0) {
                    // The parent is larger. Swap positions.
                    heap[parentIndex] = node;
                    heap[index] = parent;
                    index = parentIndex;
                } else {
                    // The parent is smaller. Exit.
                    return;
                }
            }
        }
        function siftDown(heap, node, i) {
            var index = i;
            var length = heap.length;
            var halfLength = length >>> 1;
            while(index < halfLength){
                var leftIndex = (index + 1) * 2 - 1;
                var left = heap[leftIndex];
                var rightIndex = leftIndex + 1;
                var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.
                if (compare(left, node) < 0) {
                    if (rightIndex < length && compare(right, left) < 0) {
                        heap[index] = right;
                        heap[rightIndex] = node;
                        index = rightIndex;
                    } else {
                        heap[index] = left;
                        heap[leftIndex] = node;
                        index = leftIndex;
                    }
                } else if (rightIndex < length && compare(right, node) < 0) {
                    heap[index] = right;
                    heap[rightIndex] = node;
                    index = rightIndex;
                } else {
                    // Neither child is smaller. Exit.
                    return;
                }
            }
        }
        function compare(a, b) {
            // Compare sort index first, then task id.
            var diff = a.sortIndex - b.sortIndex;
            return diff !== 0 ? diff : a.id - b.id;
        }
        // TODO: Use symbols?
        var ImmediatePriority = 1;
        var UserBlockingPriority = 2;
        var NormalPriority = 3;
        var LowPriority = 4;
        var IdlePriority = 5;
        function markTaskErrored(task, ms) {}
        /* eslint-disable no-var */ var hasPerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';
        if (hasPerformanceNow) {
            var localPerformance = performance;
            exports.unstable_now = function() {
                return localPerformance.now();
            };
        } else {
            var localDate = Date;
            var initialTime = localDate.now();
            exports.unstable_now = function() {
                return localDate.now() - initialTime;
            };
        } // Max 31 bit integer. The max integer size in V8 for 32-bit systems.
        // Math.pow(2, 30) - 1
        // 0b111111111111111111111111111111
        var maxSigned31BitInt = 1073741823; // Times out immediately
        var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out
        var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
        var NORMAL_PRIORITY_TIMEOUT = 5000;
        var LOW_PRIORITY_TIMEOUT = 10000; // Never times out
        var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt; // Tasks are stored on a min heap
        var taskQueue = [];
        var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.
        var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.
        var currentTask = null;
        var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrance.
        var isPerformingWork = false;
        var isHostCallbackScheduled = false;
        var isHostTimeoutScheduled = false; // Capture local references to native APIs, in case a polyfill overrides them.
        var localSetTimeout = typeof setTimeout === 'function' ? setTimeout : null;
        var localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : null;
        var localSetImmediate = typeof setImmediate !== 'undefined' ? setImmediate : null; // IE and Node.js + jsdom
        var isInputPending = typeof navigator !== 'undefined' && navigator.scheduling !== undefined && navigator.scheduling.isInputPending !== undefined ? navigator.scheduling.isInputPending.bind(navigator.scheduling) : null;
        function advanceTimers(currentTime) {
            // Check for tasks that are no longer delayed and add them to the queue.
            var timer = peek(timerQueue);
            while(timer !== null){
                if (timer.callback === null) {
                    // Timer was cancelled.
                    pop(timerQueue);
                } else if (timer.startTime <= currentTime) {
                    // Timer fired. Transfer to the task queue.
                    pop(timerQueue);
                    timer.sortIndex = timer.expirationTime;
                    push(taskQueue, timer);
                } else {
                    // Remaining timers are pending.
                    return;
                }
                timer = peek(timerQueue);
            }
        }
        function handleTimeout(currentTime) {
            isHostTimeoutScheduled = false;
            advanceTimers(currentTime);
            if (!isHostCallbackScheduled) {
                if (peek(taskQueue) !== null) {
                    isHostCallbackScheduled = true;
                    requestHostCallback(flushWork);
                } else {
                    var firstTimer = peek(timerQueue);
                    if (firstTimer !== null) {
                        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                    }
                }
            }
        }
        function flushWork(hasTimeRemaining, initialTime) {
            isHostCallbackScheduled = false;
            if (isHostTimeoutScheduled) {
                // We scheduled a timeout but it's no longer needed. Cancel it.
                isHostTimeoutScheduled = false;
                cancelHostTimeout();
            }
            isPerformingWork = true;
            var previousPriorityLevel = currentPriorityLevel;
            try {
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                {
                    var currentTime;
                } else {
                    // No catch in prod code path.
                    return workLoop(hasTimeRemaining, initialTime);
                }
            } finally{
                currentTask = null;
                currentPriorityLevel = previousPriorityLevel;
                isPerformingWork = false;
            }
        }
        function workLoop(hasTimeRemaining, initialTime) {
            var currentTime = initialTime;
            advanceTimers(currentTime);
            currentTask = peek(taskQueue);
            while(currentTask !== null && !enableSchedulerDebugging){
                if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
                    break;
                }
                var callback = currentTask.callback;
                if (typeof callback === 'function') {
                    currentTask.callback = null;
                    currentPriorityLevel = currentTask.priorityLevel;
                    var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
                    var continuationCallback = callback(didUserCallbackTimeout);
                    currentTime = exports.unstable_now();
                    if (typeof continuationCallback === 'function') {
                        currentTask.callback = continuationCallback;
                    } else {
                        if (currentTask === peek(taskQueue)) {
                            pop(taskQueue);
                        }
                    }
                    advanceTimers(currentTime);
                } else {
                    pop(taskQueue);
                }
                currentTask = peek(taskQueue);
            } // Return whether there's additional work
            if (currentTask !== null) {
                return true;
            } else {
                var firstTimer = peek(timerQueue);
                if (firstTimer !== null) {
                    requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                }
                return false;
            }
        }
        function unstable_runWithPriority(priorityLevel, eventHandler) {
            switch(priorityLevel){
                case ImmediatePriority:
                case UserBlockingPriority:
                case NormalPriority:
                case LowPriority:
                case IdlePriority:
                    break;
                default:
                    priorityLevel = NormalPriority;
            }
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = priorityLevel;
            try {
                return eventHandler();
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        }
        function unstable_next(eventHandler) {
            var priorityLevel;
            switch(currentPriorityLevel){
                case ImmediatePriority:
                case UserBlockingPriority:
                case NormalPriority:
                    // Shift down to normal priority
                    priorityLevel = NormalPriority;
                    break;
                default:
                    // Anything lower than normal priority should remain at the current level.
                    priorityLevel = currentPriorityLevel;
                    break;
            }
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = priorityLevel;
            try {
                return eventHandler();
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        }
        function unstable_wrapCallback(callback) {
            var parentPriorityLevel = currentPriorityLevel;
            return function() {
                // This is a fork of runWithPriority, inlined for performance.
                var previousPriorityLevel = currentPriorityLevel;
                currentPriorityLevel = parentPriorityLevel;
                try {
                    return callback.apply(this, arguments);
                } finally{
                    currentPriorityLevel = previousPriorityLevel;
                }
            };
        }
        function unstable_scheduleCallback(priorityLevel, callback, options) {
            var currentTime = exports.unstable_now();
            var startTime;
            if (typeof options === 'object' && options !== null) {
                var delay = options.delay;
                if (typeof delay === 'number' && delay > 0) {
                    startTime = currentTime + delay;
                } else {
                    startTime = currentTime;
                }
            } else {
                startTime = currentTime;
            }
            var timeout;
            switch(priorityLevel){
                case ImmediatePriority:
                    timeout = IMMEDIATE_PRIORITY_TIMEOUT;
                    break;
                case UserBlockingPriority:
                    timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
                    break;
                case IdlePriority:
                    timeout = IDLE_PRIORITY_TIMEOUT;
                    break;
                case LowPriority:
                    timeout = LOW_PRIORITY_TIMEOUT;
                    break;
                case NormalPriority:
                default:
                    timeout = NORMAL_PRIORITY_TIMEOUT;
                    break;
            }
            var expirationTime = startTime + timeout;
            var newTask = {
                id: taskIdCounter++,
                callback: callback,
                priorityLevel: priorityLevel,
                startTime: startTime,
                expirationTime: expirationTime,
                sortIndex: -1
            };
            if (startTime > currentTime) {
                // This is a delayed task.
                newTask.sortIndex = startTime;
                push(timerQueue, newTask);
                if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
                    // All tasks are delayed, and this is the task with the earliest delay.
                    if (isHostTimeoutScheduled) {
                        // Cancel an existing timeout.
                        cancelHostTimeout();
                    } else {
                        isHostTimeoutScheduled = true;
                    } // Schedule a timeout.
                    requestHostTimeout(handleTimeout, startTime - currentTime);
                }
            } else {
                newTask.sortIndex = expirationTime;
                push(taskQueue, newTask);
                // wait until the next time we yield.
                if (!isHostCallbackScheduled && !isPerformingWork) {
                    isHostCallbackScheduled = true;
                    requestHostCallback(flushWork);
                }
            }
            return newTask;
        }
        function unstable_pauseExecution() {}
        function unstable_continueExecution() {
            if (!isHostCallbackScheduled && !isPerformingWork) {
                isHostCallbackScheduled = true;
                requestHostCallback(flushWork);
            }
        }
        function unstable_getFirstCallbackNode() {
            return peek(taskQueue);
        }
        function unstable_cancelCallback(task) {
            // remove from the queue because you can't remove arbitrary nodes from an
            // array based heap, only the first one.)
            task.callback = null;
        }
        function unstable_getCurrentPriorityLevel() {
            return currentPriorityLevel;
        }
        var isMessageLoopRunning = false;
        var scheduledHostCallback = null;
        var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main
        // thread, like user events. By default, it yields multiple times per frame.
        // It does not attempt to align with frame boundaries, since most tasks don't
        // need to be frame aligned; for those that do, use requestAnimationFrame.
        var frameInterval = frameYieldMs;
        var startTime = -1;
        function shouldYieldToHost() {
            var timeElapsed = exports.unstable_now() - startTime;
            if (timeElapsed < frameInterval) {
                // The main thread has only been blocked for a really short amount of time;
                // smaller than a single frame. Don't yield yet.
                return false;
            } // The main thread has been blocked for a non-negligible amount of time. We
            return true;
        }
        function requestPaint() {}
        function forceFrameRate(fps) {
            if (fps < 0 || fps > 125) {
                // Using console['error'] to evade Babel and ESLint
                console['error']('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing frame rates higher than 125 fps is not supported');
                return;
            }
            if (fps > 0) {
                frameInterval = Math.floor(1000 / fps);
            } else {
                // reset the framerate
                frameInterval = frameYieldMs;
            }
        }
        var performWorkUntilDeadline = function() {
            if (scheduledHostCallback !== null) {
                var currentTime = exports.unstable_now(); // Keep track of the start time so we can measure how long the main thread
                // has been blocked.
                startTime = currentTime;
                var hasTimeRemaining = true; // If a scheduler task throws, exit the current browser task so the
                // error can be observed.
                //
                // Intentionally not using a try-catch, since that makes some debugging
                // techniques harder. Instead, if `scheduledHostCallback` errors, then
                // `hasMoreWork` will remain true, and we'll continue the work loop.
                var hasMoreWork = true;
                try {
                    hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
                } finally{
                    if (hasMoreWork) {
                        // If there's more work, schedule the next message event at the end
                        // of the preceding one.
                        schedulePerformWorkUntilDeadline();
                    } else {
                        isMessageLoopRunning = false;
                        scheduledHostCallback = null;
                    }
                }
            } else {
                isMessageLoopRunning = false;
            } // Yielding to the browser will give it a chance to paint, so we can
        };
        var schedulePerformWorkUntilDeadline;
        if (typeof localSetImmediate === 'function') {
            // Node.js and old IE.
            // There's a few reasons for why we prefer setImmediate.
            //
            // Unlike MessageChannel, it doesn't prevent a Node.js process from exiting.
            // (Even though this is a DOM fork of the Scheduler, you could get here
            // with a mix of Node.js 15+, which has a MessageChannel, and jsdom.)
            // https://github.com/facebook/react/issues/20756
            //
            // But also, it runs earlier which is the semantic we want.
            // If other browsers ever implement it, it's better to use it.
            // Although both of these would be inferior to native scheduling.
            schedulePerformWorkUntilDeadline = function() {
                localSetImmediate(performWorkUntilDeadline);
            };
        } else if (typeof MessageChannel !== 'undefined') {
            // DOM and Worker environments.
            // We prefer MessageChannel because of the 4ms setTimeout clamping.
            var channel = new MessageChannel();
            var port = channel.port2;
            channel.port1.onmessage = performWorkUntilDeadline;
            schedulePerformWorkUntilDeadline = function() {
                port.postMessage(null);
            };
        } else {
            // We should only fallback here in non-browser environments.
            schedulePerformWorkUntilDeadline = function() {
                localSetTimeout(performWorkUntilDeadline, 0);
            };
        }
        function requestHostCallback(callback) {
            scheduledHostCallback = callback;
            if (!isMessageLoopRunning) {
                isMessageLoopRunning = true;
                schedulePerformWorkUntilDeadline();
            }
        }
        function requestHostTimeout(callback, ms) {
            taskTimeoutID = localSetTimeout(function() {
                callback(exports.unstable_now());
            }, ms);
        }
        function cancelHostTimeout() {
            localClearTimeout(taskTimeoutID);
            taskTimeoutID = -1;
        }
        var unstable_requestPaint = requestPaint;
        var unstable_Profiling = null;
        exports.unstable_IdlePriority = IdlePriority;
        exports.unstable_ImmediatePriority = ImmediatePriority;
        exports.unstable_LowPriority = LowPriority;
        exports.unstable_NormalPriority = NormalPriority;
        exports.unstable_Profiling = unstable_Profiling;
        exports.unstable_UserBlockingPriority = UserBlockingPriority;
        exports.unstable_cancelCallback = unstable_cancelCallback;
        exports.unstable_continueExecution = unstable_continueExecution;
        exports.unstable_forceFrameRate = forceFrameRate;
        exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
        exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
        exports.unstable_next = unstable_next;
        exports.unstable_pauseExecution = unstable_pauseExecution;
        exports.unstable_requestPaint = unstable_requestPaint;
        exports.unstable_runWithPriority = unstable_runWithPriority;
        exports.unstable_scheduleCallback = unstable_scheduleCallback;
        exports.unstable_shouldYield = shouldYieldToHost;
        exports.unstable_wrapCallback = unstable_wrapCallback;
        /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === 'function') {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
    })();
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/scheduler/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/scheduler/cjs/scheduler.development.js [client] (ecmascript)");
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/common.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateUuid",
    ()=>generateUuid,
    "isInIFrame",
    ()=>isInIFrame,
    "isNode",
    ()=>isNode
]);
const isNode = typeof window === "undefined";
const isInIFrame = !isNode && window.self !== window.top;
const generateUuid = ()=>{
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/axios-client.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Base44Error",
    ()=>Base44Error,
    "createAxiosClient",
    ()=>createAxiosClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/common.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/v4.js [client] (ecmascript) <export default as v4>");
;
;
;
class Base44Error extends Error {
    /**
     * Creates a new Base44Error instance.
     *
     * @param message - Human-readable error message
     * @param status - HTTP status code
     * @param code - Error code from the API
     * @param data - Full response data from the server
     * @param originalError - Original axios error object
     * @internal
     */ constructor(message, status, code, data, originalError){
        super(message);
        this.name = "Base44Error";
        this.status = status;
        this.code = code;
        this.data = data;
        this.originalError = originalError;
    }
    /**
     * Serializes the error to a JSON-safe object.
     *
     * Useful for logging or sending error information to external services
     * without circular reference issues.
     *
     * @returns JSON-safe representation of the error.
     *
     * @example
     * ```typescript
     * try {
     *   await client.entities.Todo.get('invalid-id');
     * } catch (error) {
     *   if (error instanceof Base44Error) {
     *     const json = error.toJSON();
     *     console.log(json);
     *     // {
     *     //   name: "Base44Error",
     *     //   message: "Not found",
     *     //   status: 404,
     *     //   code: "NOT_FOUND",
     *     //   data: { ... }
     *     // }
     *   }
     * }
     * ```
     */ toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            code: this.code,
            data: this.data
        };
    }
}
/**
 * Safely logs error information without circular references.
 *
 * @param prefix - Prefix for the log message
 * @param error - The error to log
 * @internal
 */ function safeErrorLog(prefix, error) {
    if (error instanceof Base44Error) {
        console.error(`${prefix} ${error.status}: ${error.message}`);
        if (error.data) {
            try {
                console.error("Error data:", JSON.stringify(error.data, null, 2));
            } catch (e) {
                console.error("Error data: [Cannot stringify error data]");
            }
        }
    } else {
        console.error(`${prefix} ${error instanceof Error ? error.message : String(error)}`);
    }
}
function createAxiosClient({ baseURL, headers = {}, token, interceptResponses = true, onError }) {
    const client = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...headers
        }
    });
    // Add token to requests if available
    if (token) {
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    // Add origin URL in browser environment
    client.interceptors.request.use({
        "createAxiosClient.use": (config)=>{
            if (typeof window !== "undefined") {
                config.headers.set("X-Origin-URL", window.location.href);
            }
            const requestId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            config.requestId = requestId;
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isInIFrame"]) {
                try {
                    window.parent.postMessage({
                        type: "api-request-start",
                        requestId,
                        data: {
                            url: baseURL + config.url,
                            method: config.method,
                            body: config.data instanceof FormData ? "[FormData object]" : config.data
                        }
                    }, "*");
                } catch (_a) {
                /* skip the logging */ }
            }
            return config;
        }
    }["createAxiosClient.use"]);
    // Handle responses
    if (interceptResponses) {
        client.interceptors.response.use({
            "createAxiosClient.use": (response)=>{
                var _a;
                const requestId = (_a = response.config) === null || _a === void 0 ? void 0 : _a.requestId;
                try {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isInIFrame"] && requestId) {
                        window.parent.postMessage({
                            type: "api-request-end",
                            requestId,
                            data: {
                                statusCode: response.status,
                                response: response.data
                            }
                        }, "*");
                    }
                } catch (_b) {
                /* do nothing */ }
                return response.data;
            }
        }["createAxiosClient.use"], {
            "createAxiosClient.use": (error)=>{
                var _a, _b, _c, _d, _e, _f, _g, _h;
                const message = ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.detail) || error.message;
                const base44Error = new Base44Error(message, (_e = error.response) === null || _e === void 0 ? void 0 : _e.status, (_g = (_f = error.response) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.code, (_h = error.response) === null || _h === void 0 ? void 0 : _h.data, error);
                // Log errors in development
                if ("TURBOPACK compile-time truthy", 1) {
                    safeErrorLog("[Base44 SDK Error]", base44Error);
                }
                onError === null || onError === void 0 ? void 0 : onError(base44Error);
                return Promise.reject(base44Error);
            }
        }["createAxiosClient.use"]);
    }
    return client;
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/entities.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Creates the entities module for the Base44 SDK.
 *
 * @param config - Configuration object containing axios, appId, and getSocket
 * @returns Entities module with dynamic entity access
 * @internal
 */ __turbopack_context__.s([
    "createEntitiesModule",
    ()=>createEntitiesModule
]);
function createEntitiesModule(config) {
    const { axios, appId, getSocket } = config;
    // Using Proxy to dynamically handle entity names
    return new Proxy({}, {
        get (target, entityName) {
            // Don't create handlers for internal properties
            if (typeof entityName !== "string" || entityName === "then" || entityName.startsWith("_")) {
                return undefined;
            }
            // Create entity handler
            return createEntityHandler(axios, appId, entityName, getSocket);
        }
    });
}
/**
 * Parses the realtime message data and extracts event information.
 * @internal
 */ function parseRealtimeMessage(dataStr) {
    var _a;
    try {
        const parsed = JSON.parse(dataStr);
        return {
            type: parsed.type,
            data: parsed.data,
            id: parsed.id || ((_a = parsed.data) === null || _a === void 0 ? void 0 : _a.id),
            timestamp: parsed.timestamp || new Date().toISOString()
        };
    } catch (error) {
        console.warn("[Base44 SDK] Failed to parse realtime message:", error);
        return null;
    }
}
/**
 * Creates a handler for a specific entity.
 *
 * @param axios - Axios instance
 * @param appId - Application ID
 * @param entityName - Entity name
 * @param getSocket - Function to get the socket instance
 * @returns Entity handler with CRUD methods
 * @internal
 */ function createEntityHandler(axios, appId, entityName, getSocket) {
    const baseURL = `/apps/${appId}/entities/${entityName}`;
    return {
        // List entities with optional pagination and sorting
        async list (sort, limit, skip, fields) {
            const params = {};
            if (sort) params.sort = sort;
            if (limit) params.limit = limit;
            if (skip) params.skip = skip;
            if (fields) params.fields = Array.isArray(fields) ? fields.join(",") : fields;
            return axios.get(baseURL, {
                params
            });
        },
        // Filter entities based on query
        async filter (query, sort, limit, skip, fields) {
            const params = {
                q: JSON.stringify(query)
            };
            if (sort) params.sort = sort;
            if (limit) params.limit = limit;
            if (skip) params.skip = skip;
            if (fields) params.fields = Array.isArray(fields) ? fields.join(",") : fields;
            return axios.get(baseURL, {
                params
            });
        },
        // Get entity by ID
        async get (id) {
            return axios.get(`${baseURL}/${id}`);
        },
        // Create new entity
        async create (data) {
            return axios.post(baseURL, data);
        },
        // Update entity by ID
        async update (id, data) {
            return axios.put(`${baseURL}/${id}`, data);
        },
        // Delete entity by ID
        async delete (id) {
            return axios.delete(`${baseURL}/${id}`);
        },
        // Delete multiple entities based on query
        async deleteMany (query) {
            return axios.delete(baseURL, {
                data: query
            });
        },
        // Create multiple entities in a single request
        async bulkCreate (data) {
            return axios.post(`${baseURL}/bulk`, data);
        },
        // Update multiple entities matching a query using a MongoDB update operator
        async updateMany (query, data) {
            return axios.patch(`${baseURL}/update-many`, {
                query,
                data
            });
        },
        // Update multiple entities by ID, each with its own update data
        async bulkUpdate (data) {
            return axios.put(`${baseURL}/bulk`, data);
        },
        // Import entities from a file
        async importEntities (file) {
            const formData = new FormData();
            formData.append("file", file, file.name);
            return axios.post(`${baseURL}/import`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        },
        // Subscribe to realtime updates
        subscribe (callback) {
            const room = `entities:${appId}:${entityName}`;
            // Get the socket and subscribe to the room
            const socket = getSocket();
            const unsubscribe = socket.subscribeToRoom(room, {
                update_model: (msg)=>{
                    const event = parseRealtimeMessage(msg.data);
                    if (!event) {
                        return;
                    }
                    try {
                        callback(event);
                    } catch (error) {
                        console.error("[Base44 SDK] Subscription callback error:", error);
                    }
                }
            });
            return unsubscribe;
        }
    };
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/custom-integrations.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Creates the custom integrations module for the Base44 SDK.
 *
 * @param axios - Axios instance for making HTTP requests
 * @param appId - Application ID
 * @returns Custom integrations module with `call()` method
 * @internal
 */ __turbopack_context__.s([
    "createCustomIntegrationsModule",
    ()=>createCustomIntegrationsModule
]);
function createCustomIntegrationsModule(axios, appId) {
    return {
        async call (slug, operationId, params) {
            // Validate required parameters
            if (!(slug === null || slug === void 0 ? void 0 : slug.trim())) {
                throw new Error("Integration slug is required and cannot be empty");
            }
            if (!(operationId === null || operationId === void 0 ? void 0 : operationId.trim())) {
                throw new Error("Operation ID is required and cannot be empty");
            }
            // Convert camelCase to snake_case for Python backend
            const { pathParams, queryParams, ...rest } = params !== null && params !== void 0 ? params : {};
            const body = {
                ...rest,
                ...pathParams && {
                    path_params: pathParams
                },
                ...queryParams && {
                    query_params: queryParams
                }
            };
            // Make the API call
            const response = await axios.post(`/apps/${appId}/integrations/custom/${slug}/${operationId}`, body);
            // The axios interceptor extracts response.data, so we get the payload directly
            return response;
        }
    };
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/integrations.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createIntegrationsModule",
    ()=>createIntegrationsModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$custom$2d$integrations$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/custom-integrations.js [client] (ecmascript)");
;
function createIntegrationsModule(axios, appId) {
    // Create the custom integrations module once
    const customModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$custom$2d$integrations$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createCustomIntegrationsModule"])(axios, appId);
    return new Proxy({}, {
        get (target, packageName) {
            // Skip internal properties
            if (typeof packageName !== "string" || packageName === "then" || packageName.startsWith("_")) {
                return undefined;
            }
            // Handle 'custom' specially - return the custom integrations module
            if (packageName === "custom") {
                return customModule;
            }
            // Create a proxy for integration endpoints
            return new Proxy({}, {
                get (target, endpointName) {
                    // Skip internal properties
                    if (typeof endpointName !== "string" || endpointName === "then" || endpointName.startsWith("_")) {
                        return undefined;
                    }
                    // Return a function that calls the integration endpoint
                    // This allows: client.integrations.PackageName.EndpointName(data)
                    return async (data)=>{
                        // Validate input
                        if (typeof data === "string") {
                            throw new Error(`Integration ${endpointName} must receive an object with named parameters, received: ${data}`);
                        }
                        let formData;
                        let contentType;
                        // Handle file uploads with FormData
                        if (data instanceof FormData || data && Object.values(data).some((value)=>value instanceof File)) {
                            formData = new FormData();
                            Object.keys(data).forEach((key)=>{
                                if (data[key] instanceof File) {
                                    formData.append(key, data[key], data[key].name);
                                } else if (typeof data[key] === "object" && data[key] !== null) {
                                    formData.append(key, JSON.stringify(data[key]));
                                } else {
                                    formData.append(key, data[key]);
                                }
                            });
                            contentType = "multipart/form-data";
                        } else {
                            formData = data;
                            contentType = "application/json";
                        }
                        // For Core package
                        if (packageName === "Core") {
                            return axios.post(`/apps/${appId}/integration-endpoints/Core/${endpointName}`, formData || data, {
                                headers: {
                                    "Content-Type": contentType
                                }
                            });
                        }
                        // For other packages
                        return axios.post(`/apps/${appId}/integration-endpoints/installable/${packageName}/integration-endpoints/${endpointName}`, formData || data, {
                            headers: {
                                "Content-Type": contentType
                            }
                        });
                    };
                }
            });
        }
    });
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/auth.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAuthModule",
    ()=>createAuthModule
]);
function isInsideIframe() {
    if (typeof window === "undefined") return false;
    return window !== window.parent;
}
/**
 * Opens a URL in a centered popup and waits for the backend to postMessage
 * the auth result back. On success, redirects the current window to
 * redirectUrl with the token params appended, preserving the same behaviour
 * as a normal full-page redirect flow.
 *
 * @param url - The login URL to open in the popup (should include popup_origin).
 * @param redirectUrl - Where to redirect after auth (the original fromUrl).
 * @param expectedOrigin - The origin we expect the postMessage to come from.
 */ function loginViaPopup(url, redirectUrl, expectedOrigin) {
    const width = 500;
    const height = 600;
    const left = Math.round(window.screenX + (window.outerWidth - width) / 2);
    const top = Math.round(window.screenY + (window.outerHeight - height) / 2);
    const popup = window.open(url, "base44_auth", `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`);
    if (!popup) {
        return;
    }
    const cleanup = ()=>{
        window.removeEventListener("message", onMessage);
        clearInterval(pollTimer);
        if (!popup.closed) popup.close();
    };
    const onMessage = (event)=>{
        var _a;
        if (event.origin !== expectedOrigin) return;
        if (event.source !== popup) return;
        if (!((_a = event.data) === null || _a === void 0 ? void 0 : _a.access_token)) return;
        cleanup();
        const callbackUrl = new URL(redirectUrl);
        const { access_token, is_new_user } = event.data;
        callbackUrl.searchParams.set("access_token", access_token);
        if (is_new_user != null) {
            callbackUrl.searchParams.set("is_new_user", String(is_new_user));
        }
        window.location.href = callbackUrl.toString();
    };
    // Only used to detect the user closing the popup before auth completes
    const pollTimer = setInterval(()=>{
        if (popup.closed) cleanup();
    }, 500);
    window.addEventListener("message", onMessage);
}
function createAuthModule(axios, functionsAxiosClient, appId, options) {
    return {
        // Get current user information
        async me () {
            return axios.get(`/apps/${appId}/entities/User/me`);
        },
        // Update current user data
        async updateMe (data) {
            return axios.put(`/apps/${appId}/entities/User/me`, data);
        },
        // Redirects the user to the app's login page
        redirectToLogin (nextUrl) {
            // This function only works in a browser environment
            if (typeof window === "undefined") {
                throw new Error("Login method can only be used in a browser environment");
            }
            // If nextUrl is not provided, use the current URL
            const redirectUrl = nextUrl ? new URL(nextUrl, window.location.origin).toString() : window.location.href;
            // Build the login URL
            const loginUrl = `${options.appBaseUrl}/login?from_url=${encodeURIComponent(redirectUrl)}`;
            // Redirect to the login page
            window.location.href = loginUrl;
        },
        // Redirects the user to a provider's login page
        loginWithProvider (provider, fromUrl = "/") {
            // Build the full redirect URL
            const redirectUrl = new URL(fromUrl, window.location.origin).toString();
            const queryParams = `app_id=${appId}&from_url=${encodeURIComponent(redirectUrl)}`;
            // SSO uses a different URL structure with appId in the path
            let authPath;
            if (provider === "sso") {
                authPath = `/apps/${appId}/auth/sso/login`;
            } else {
                // Google is the default provider, so no provider path segment needed
                const providerPath = provider === "google" ? "" : `/${provider}`;
                authPath = `/apps/auth${providerPath}/login`;
            }
            const loginUrl = `${options.appBaseUrl}/api${authPath}?${queryParams}`;
            // When running inside an iframe, use a popup to avoid OAuth providers
            // blocking iframe navigation.
            if (isInsideIframe()) {
                const popupLoginUrl = `${loginUrl}&popup_origin=${encodeURIComponent(window.location.origin)}`;
                return loginViaPopup(popupLoginUrl, redirectUrl, window.location.origin);
            }
            // Default: full-page redirect
            window.location.href = loginUrl;
        },
        // Logout the current user
        logout (redirectUrl) {
            // Remove token from axios headers (always do this)
            delete axios.defaults.headers.common["Authorization"];
            // Only do the rest if in a browser environment
            if (typeof window !== "undefined") {
                // Remove token from localStorage
                if (window.localStorage) {
                    try {
                        window.localStorage.removeItem("base44_access_token");
                        // Remove "token" that is set by the built-in SDK of platform version 2
                        window.localStorage.removeItem("token");
                    } catch (e) {
                        console.error("Failed to remove token from localStorage:", e);
                    }
                }
                // Determine the from_url parameter
                const fromUrl = redirectUrl || window.location.href;
                // Redirect to server-side logout endpoint to clear HTTP-only cookies
                const logoutUrl = `${options.appBaseUrl}/api/apps/auth/logout?from_url=${encodeURIComponent(fromUrl)}`;
                window.location.href = logoutUrl;
            }
        },
        // Set authentication token
        setToken (token, saveToStorage = true) {
            if (!token) return;
            // handle token change for axios clients
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            functionsAxiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            // Save token to localStorage if requested
            if (saveToStorage && typeof window !== "undefined" && window.localStorage) {
                try {
                    window.localStorage.setItem("base44_access_token", token);
                    // Set "token" that is set by the built-in SDK of platform version 2
                    window.localStorage.setItem("token", token);
                } catch (e) {
                    console.error("Failed to save token to localStorage:", e);
                }
            }
        },
        // Login using username and password
        async loginViaEmailPassword (email, password, turnstileToken) {
            var _a;
            try {
                const response = await axios.post(`/apps/${appId}/auth/login`, {
                    email,
                    password,
                    ...turnstileToken && {
                        turnstile_token: turnstileToken
                    }
                });
                const { access_token, user } = response;
                if (access_token) {
                    this.setToken(access_token);
                }
                return {
                    access_token,
                    user
                };
            } catch (error) {
                // Handle authentication errors and cleanup
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                    await this.logout();
                }
                throw error;
            }
        },
        // Verify if the current token is valid
        async isAuthenticated () {
            try {
                await this.me();
                return true;
            } catch (error) {
                return false;
            }
        },
        // Invite a user to the app
        inviteUser (userEmail, role) {
            return axios.post(`/apps/${appId}/users/invite-user`, {
                user_email: userEmail,
                role
            });
        },
        // Register a new user account
        register (payload) {
            return axios.post(`/apps/${appId}/auth/register`, payload);
        },
        // Verify an OTP (One-time password) code
        verifyOtp ({ email, otpCode }) {
            return axios.post(`/apps/${appId}/auth/verify-otp`, {
                email,
                otp_code: otpCode
            });
        },
        // Resend an OTP code to the user's email
        resendOtp (email) {
            return axios.post(`/apps/${appId}/auth/resend-otp`, {
                email
            });
        },
        // Request a password reset
        resetPasswordRequest (email) {
            return axios.post(`/apps/${appId}/auth/reset-password-request`, {
                email
            });
        },
        // Reset password using a reset token
        resetPassword ({ resetToken, newPassword }) {
            return axios.post(`/apps/${appId}/auth/reset-password`, {
                reset_token: resetToken,
                new_password: newPassword
            });
        },
        // Change the user's password
        changePassword ({ userId, currentPassword, newPassword }) {
            return axios.post(`/apps/${appId}/auth/change-password`, {
                user_id: userId,
                current_password: currentPassword,
                new_password: newPassword
            });
        }
    };
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/sso.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Creates the SSO module for the Base44 SDK.
 *
 * @param axios - Axios instance
 * @param appId - Application ID
 * @param userToken - User authentication token
 * @returns SSO module with authentication methods
 * @internal
 */ __turbopack_context__.s([
    "createSsoModule",
    ()=>createSsoModule
]);
function createSsoModule(axios, appId) {
    return {
        // Get SSO access token for a specific user
        async getAccessToken (userid) {
            const url = `/apps/${appId}/auth/sso/accesstoken/${userid}`;
            return axios.get(url);
        }
    };
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/connectors.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Creates the Connectors module for the Base44 SDK.
 *
 * @param axios - Axios instance (should be service role client)
 * @param appId - Application ID
 * @returns Connectors module with methods to retrieve OAuth tokens
 * @internal
 */ __turbopack_context__.s([
    "createConnectorsModule",
    ()=>createConnectorsModule,
    "createUserConnectorsModule",
    ()=>createUserConnectorsModule
]);
function createConnectorsModule(axios, appId) {
    return {
        /**
         * Retrieve an OAuth access token for a specific external integration type.
         * @deprecated Use getConnection(integrationType) and use the returned accessToken (and connectionConfig when needed) instead.
         */ // @ts-expect-error Return type mismatch with interface - implementation returns string, interface expects string but implementation is typed as ConnectorAccessTokenResponse
        async getAccessToken (integrationType) {
            if (!integrationType || typeof integrationType !== "string") {
                throw new Error("Integration type is required and must be a string");
            }
            const response = await axios.get(`/apps/${appId}/external-auth/tokens/${integrationType}`);
            // @ts-expect-error
            return response.access_token;
        },
        async getConnection (integrationType) {
            var _a;
            if (!integrationType || typeof integrationType !== "string") {
                throw new Error("Integration type is required and must be a string");
            }
            const response = await axios.get(`/apps/${appId}/external-auth/tokens/${integrationType}`);
            const data = response;
            return {
                accessToken: data.access_token,
                connectionConfig: (_a = data.connection_config) !== null && _a !== void 0 ? _a : null
            };
        },
        /**
         * @deprecated Use getCurrentAppUserConnection(connectorId) and use the returned accessToken (and connectionConfig when needed) instead.
         */ async getCurrentAppUserAccessToken (connectorId) {
            if (!connectorId || typeof connectorId !== "string") {
                throw new Error("Connector ID is required and must be a string");
            }
            const response = await axios.get(`/apps/${appId}/app-user-auth/connectors/${connectorId}/token`);
            const data = response;
            return data.access_token;
        },
        async getCurrentAppUserConnection (connectorId) {
            var _a;
            if (!connectorId || typeof connectorId !== "string") {
                throw new Error("Connector ID is required and must be a string");
            }
            const response = await axios.get(`/apps/${appId}/app-user-auth/connectors/${connectorId}/token`);
            const data = response;
            return {
                accessToken: data.access_token,
                connectionConfig: (_a = data.connection_config) !== null && _a !== void 0 ? _a : null
            };
        }
    };
}
function createUserConnectorsModule(axios, appId) {
    return {
        async connectAppUser (connectorId) {
            if (!connectorId || typeof connectorId !== "string") {
                throw new Error("Connector ID is required and must be a string");
            }
            const response = await axios.post(`/apps/${appId}/app-user-auth/connectors/${connectorId}/initiate`);
            const data = response;
            return data.redirect_url;
        },
        async disconnectAppUser (connectorId) {
            if (!connectorId || typeof connectorId !== "string") {
                throw new Error("Connector ID is required and must be a string");
            }
            await axios.delete(`/apps/${appId}/app-user-auth/connectors/${connectorId}`);
        }
    };
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/auth-utils.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Retrieves an access token from URL parameters or local storage.
 *
 * Low-level utility for manually retrieving tokens. In most cases, the Base44 client handles
 * token management automatically. This function is useful for custom authentication flows or when you need direct access to stored tokens. Requires a browser environment and can't be used in the backend.
 *
 * @internal
 *
 * @param options - Configuration options for token retrieval.
 * @returns The access token string if found, null otherwise.
 *
 * @example
 * ```typescript
 * // Get access token from URL or local storage
 * const token = getAccessToken();
 *
 * if (token) {
 *   console.log('User is authenticated');
 * } else {
 *   console.log('No token found, redirect to login');
 * }
 * ```
 * @example
 * ```typescript
 * // Get access token from custom local storage key
 * const token = getAccessToken({ storageKey: 'my_app_token' });
 * ```
 * @example
 * ```typescript
 * // Get access token from URL but don't save or remove it
 * const token = getAccessToken({
 *   saveToStorage: false,
 *   removeFromUrl: false
 * });
 * ```
 */ __turbopack_context__.s([
    "getAccessToken",
    ()=>getAccessToken,
    "getLoginUrl",
    ()=>getLoginUrl,
    "removeAccessToken",
    ()=>removeAccessToken,
    "saveAccessToken",
    ()=>saveAccessToken
]);
function getAccessToken(options = {}) {
    const { storageKey = "base44_access_token", paramName = "access_token", saveToStorage = true, removeFromUrl = true } = options;
    let token = null;
    // Try to get token from URL parameters
    if (typeof window !== "undefined" && window.location) {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            token = urlParams.get(paramName);
            // If token found in URL
            if (token) {
                // Save token to local storage if requested
                if (saveToStorage) {
                    saveAccessToken(token, {
                        storageKey
                    });
                }
                // Remove token from URL for security if requested
                if (removeFromUrl) {
                    urlParams.delete(paramName);
                    const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}${window.location.hash}`;
                    window.history.replaceState({}, document.title, newUrl);
                }
                return token;
            }
        } catch (e) {
            console.error("Error retrieving token from URL:", e);
        }
    }
    // If no token in URL, try local storage
    if (typeof window !== "undefined" && window.localStorage) {
        try {
            token = window.localStorage.getItem(storageKey);
            return token;
        } catch (e) {
            console.error("Error retrieving token from local storage:", e);
        }
    }
    return null;
}
function saveAccessToken(token, options) {
    const { storageKey = "base44_access_token" } = options;
    if (typeof window === "undefined" || !window.localStorage || !token) {
        return false;
    }
    try {
        window.localStorage.setItem(storageKey, token);
        // Set "token" that is set by the built-in SDK of platform version 2
        window.localStorage.setItem("token", token);
        return true;
    } catch (e) {
        console.error("Error saving token to local storage:", e);
        return false;
    }
}
function removeAccessToken(options) {
    const { storageKey = "base44_access_token" } = options;
    if (typeof window === "undefined" || !window.localStorage) {
        return false;
    }
    try {
        window.localStorage.removeItem(storageKey);
        return true;
    } catch (e) {
        console.error("Error removing token from local storage:", e);
        return false;
    }
}
function getLoginUrl(nextUrl, options) {
    const { serverUrl, appId, loginPath = "/login" } = options;
    if (!serverUrl || !appId) {
        throw new Error("serverUrl and appId are required to construct login URL");
    }
    const encodedRedirectUrl = encodeURIComponent(nextUrl || (typeof window !== "undefined" ? window.location.href : ""));
    return `${serverUrl}${loginPath}?from_url=${encodedRedirectUrl}&app_id=${appId}`;
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/functions.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Creates the functions module for the Base44 SDK.
 *
 * @param axios - Axios instance
 * @param appId - Application ID
 * @param config - Optional configuration for fetch functionality
 * @returns Functions module with methods to invoke custom backend functions
 * @internal
 */ __turbopack_context__.s([
    "createFunctionsModule",
    ()=>createFunctionsModule
]);
function createFunctionsModule(axios, appId, config) {
    const joinBaseUrl = (base, path)=>{
        if (!base) return path;
        return `${String(base).replace(/\/$/, "")}${path}`;
    };
    const toHeaders = (inputHeaders)=>{
        const headers = new Headers();
        // Get auth headers from the getter function if provided
        if (config === null || config === void 0 ? void 0 : config.getAuthHeaders) {
            const authHeaders = config.getAuthHeaders();
            Object.entries(authHeaders).forEach(([key, value])=>{
                if (value !== undefined && value !== null) {
                    headers.set(key, String(value));
                }
            });
        }
        if (inputHeaders) {
            new Headers(inputHeaders).forEach((value, key)=>{
                headers.set(key, value);
            });
        }
        return headers;
    };
    return {
        // Invoke a custom backend function by name
        async invoke (functionName, data) {
            // Validate input
            if (typeof data === "string") {
                throw new Error(`Function ${functionName} must receive an object with named parameters, received: ${data}`);
            }
            let formData;
            let contentType;
            // Handle file uploads with FormData
            if (data instanceof FormData || data && Object.values(data).some((value)=>value instanceof File)) {
                formData = new FormData();
                Object.keys(data).forEach((key)=>{
                    if (data[key] instanceof File) {
                        formData.append(key, data[key], data[key].name);
                    } else if (typeof data[key] === "object" && data[key] !== null) {
                        formData.append(key, JSON.stringify(data[key]));
                    } else {
                        formData.append(key, data[key]);
                    }
                });
                contentType = "multipart/form-data";
            } else {
                formData = data;
                contentType = "application/json";
            }
            return axios.post(`/apps/${appId}/functions/${functionName}`, formData || data, {
                headers: {
                    "Content-Type": contentType
                }
            });
        },
        // Fetch a backend function endpoint directly.
        async fetch (path, init = {}) {
            const normalizedPath = path.startsWith("/") ? path : `/${path}`;
            const primaryPath = `/functions${normalizedPath}`;
            const headers = toHeaders(init.headers);
            const requestInit = {
                ...init,
                headers
            };
            const response = await fetch(joinBaseUrl(config === null || config === void 0 ? void 0 : config.baseURL, primaryPath), requestInit);
            return response;
        }
    };
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/agents.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAgentsModule",
    ()=>createAgentsModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$auth$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/auth-utils.js [client] (ecmascript)");
;
function createAgentsModule({ axios, getSocket, appId, serverUrl, token }) {
    const baseURL = `/apps/${appId}/agents`;
    // Track active conversations
    const currentConversations = {};
    const getConversations = ()=>{
        return axios.get(`${baseURL}/conversations`);
    };
    const getConversation = (conversationId)=>{
        return axios.get(`${baseURL}/conversations/${conversationId}`);
    };
    const listConversations = (filterParams)=>{
        return axios.get(`${baseURL}/conversations`, {
            params: filterParams
        });
    };
    const createConversation = (conversation)=>{
        return axios.post(`${baseURL}/conversations`, conversation);
    };
    const addMessage = async (conversation, message)=>{
        return axios.post(`${baseURL}/conversations/v2/${conversation.id}/messages`, message);
    };
    const subscribeToConversation = (conversationId, onUpdate)=>{
        const room = `/agent-conversations/${conversationId}`;
        const socket = getSocket();
        // Store the promise for initial conversation state
        const conversationPromise = getConversation(conversationId).then((conv)=>{
            currentConversations[conversationId] = conv;
            return conv;
        });
        return socket.subscribeToRoom(room, {
            connect: ()=>{},
            update_model: async ({ data: jsonStr })=>{
                const data = JSON.parse(jsonStr);
                if (data._message) {
                    // Wait for initial conversation to be loaded
                    await conversationPromise;
                    const message = data._message;
                    // Update shared conversation state
                    const currentConversation = currentConversations[conversationId];
                    if (currentConversation) {
                        const messages = currentConversation.messages || [];
                        const existingIndex = messages.findIndex((m)=>m.id === message.id);
                        const updatedMessages = existingIndex !== -1 ? messages.map((m, i)=>i === existingIndex ? message : m) : [
                            ...messages,
                            message
                        ];
                        currentConversations[conversationId] = {
                            ...currentConversation,
                            messages: updatedMessages
                        };
                        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(currentConversations[conversationId]);
                    }
                }
            }
        });
    };
    const getWhatsAppConnectURL = (agentName)=>{
        const baseUrl = `${serverUrl}/api/apps/${appId}/agents/${encodeURIComponent(agentName)}/whatsapp`;
        const accessToken = token !== null && token !== void 0 ? token : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$auth$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAccessToken"])();
        if (accessToken) {
            return `${baseUrl}?token=${accessToken}`;
        } else {
            // No token - URL will redirect to login automatically
            return baseUrl;
        }
    };
    const getTelegramConnectURL = (agentName)=>{
        const baseUrl = `${serverUrl}/api/apps/${appId}/agents/${encodeURIComponent(agentName)}/telegram`;
        const accessToken = token !== null && token !== void 0 ? token : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$auth$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAccessToken"])();
        if (accessToken) {
            return `${baseUrl}?token=${accessToken}`;
        } else {
            // No token - URL will redirect to login automatically
            return baseUrl;
        }
    };
    return {
        getConversations,
        getConversation,
        listConversations,
        createConversation,
        addMessage,
        subscribeToConversation,
        getWhatsAppConnectURL,
        getTelegramConnectURL
    };
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/app-logs.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Creates the app logs module for the Base44 SDK.
 *
 * @param axios - Axios instance
 * @param appId - Application ID
 * @returns App logs module with methods for tracking and analyzing app usage
 * @internal
 */ __turbopack_context__.s([
    "createAppLogsModule",
    ()=>createAppLogsModule
]);
function createAppLogsModule(axios, appId) {
    const baseURL = `/app-logs/${appId}`;
    return {
        // Log user activity in the app
        async logUserInApp (pageName) {
            await axios.post(`${baseURL}/log-user-in-app/${pageName}`);
        },
        // Fetch app logs with optional parameters
        async fetchLogs (params = {}) {
            const response = await axios.get(baseURL, {
                params
            });
            return response;
        },
        // Get app statistics
        async getStats (params = {}) {
            const response = await axios.get(`${baseURL}/stats`, {
                params
            });
            return response;
        }
    };
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/users.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Creates the users module for the Base44 SDK
 * @param {AxiosInstance} axios - Axios instance
 * @param {string} appId - Application ID
 * @returns {Object} Users module
 */ __turbopack_context__.s([
    "createUsersModule",
    ()=>createUsersModule
]);
function createUsersModule(axios, appId) {
    return {
        /**
         * Invite a user to the application
         * @param {string} user_email - User's email address
         * @param {'user'|'admin'} role - User's role (user or admin)
         * @returns {Promise<any>}
         */ async inviteUser (user_email, role) {
            if (role !== "user" && role !== "admin") {
                throw new Error(`Invalid role: "${role}". Role must be either "user" or "admin".`);
            }
            const response = await axios.post(`/apps/${appId}/runtime/users/invite-user`, {
                user_email,
                role
            });
            return response;
        }
    };
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/socket-utils.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RoomsSocket",
    ()=>RoomsSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$auth$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/auth-utils.js [client] (ecmascript)");
;
;
function initializeSocket(config, handlers) {
    var _a;
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(config.serverUrl, {
        path: config.mountPath,
        transports: config.transports,
        query: {
            app_id: config.appId,
            token: (_a = config.token) !== null && _a !== void 0 ? _a : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$auth$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAccessToken"])()
        }
    });
    socket.on("connect", async ()=>{
        var _a;
        console.log("connect", socket.id);
        return (_a = handlers.connect) === null || _a === void 0 ? void 0 : _a.call(handlers);
    });
    socket.on("update_model", async (msg)=>{
        var _a;
        return (_a = handlers.update_model) === null || _a === void 0 ? void 0 : _a.call(handlers, msg);
    });
    socket.on("error", async (error)=>{
        var _a;
        return (_a = handlers.error) === null || _a === void 0 ? void 0 : _a.call(handlers, error);
    });
    socket.on("connect_error", async (error)=>{
        var _a;
        console.error("connect_error", error);
        return (_a = handlers.error) === null || _a === void 0 ? void 0 : _a.call(handlers, error);
    });
    return socket;
}
function RoomsSocket({ config }) {
    let currentConfig = {
        ...config
    };
    const roomsToListeners = {};
    const handlers = {
        connect: async ()=>{
            const promises = [];
            Object.keys(roomsToListeners).forEach((room)=>{
                joinRoom(room);
                const listeners = getListeners(room);
                listeners === null || listeners === void 0 ? void 0 : listeners.forEach(({ connect })=>{
                    const promise = async ()=>connect === null || connect === void 0 ? void 0 : connect();
                    promises.push(promise());
                });
            });
            await Promise.all(promises);
        },
        update_model: async (msg)=>{
            const listeners = getListeners(msg.room);
            const promises = listeners.map((listener)=>{
                var _a;
                return (_a = listener.update_model) === null || _a === void 0 ? void 0 : _a.call(listener, msg);
            });
            await Promise.all(promises);
        },
        error: async (error)=>{
            console.error("error", error);
            const promises = Object.values(roomsToListeners).flat().map((listener)=>{
                var _a;
                return (_a = listener.error) === null || _a === void 0 ? void 0 : _a.call(listener, error);
            });
            await Promise.all(promises);
        }
    };
    let socket = initializeSocket(config, handlers);
    function cleanup() {
        disconnect();
    }
    function disconnect() {
        if (socket) {
            socket.disconnect();
        }
    }
    function updateConfig(config) {
        cleanup();
        currentConfig = {
            ...currentConfig,
            ...config
        };
        socket = initializeSocket(currentConfig, handlers);
    }
    function joinRoom(room) {
        socket.emit("join", room);
    }
    function leaveRoom(room) {
        socket.emit("leave", room);
    }
    async function updateModel(room, data) {
        var _a;
        const dataStr = JSON.stringify(data);
        return (_a = handlers.update_model) === null || _a === void 0 ? void 0 : _a.call(handlers, {
            room,
            data: dataStr
        });
    }
    function getListeners(room) {
        return roomsToListeners[room];
    }
    const subscribeToRoom = (room, handlers)=>{
        if (!roomsToListeners[room]) {
            joinRoom(room);
            roomsToListeners[room] = [];
        }
        roomsToListeners[room].push(handlers);
        return ()=>{
            var _a, _b;
            roomsToListeners[room] = (_b = (_a = roomsToListeners[room]) === null || _a === void 0 ? void 0 : _a.filter((listener)=>listener !== handlers)) !== null && _b !== void 0 ? _b : [];
            if (roomsToListeners[room].length === 0) {
                leaveRoom(room);
            }
        };
    };
    return {
        socket,
        subscribeToRoom,
        updateConfig,
        updateModel,
        disconnect
    };
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/sharedInstance.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSharedInstance",
    ()=>getSharedInstance
]);
const windowObj = typeof window !== "undefined" ? window : {
    base44SharedInstances: {}
};
function getSharedInstance(name, factory) {
    if (!windowObj.base44SharedInstances) {
        windowObj.base44SharedInstances = {};
    }
    if (!windowObj.base44SharedInstances[name]) {
        windowObj.base44SharedInstances[name] = {
            instance: factory()
        };
    }
    return windowObj.base44SharedInstances[name].instance;
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/analytics.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANALYTICS_CONFIG_ENABLE_URL_PARAM_KEY",
    ()=>ANALYTICS_CONFIG_ENABLE_URL_PARAM_KEY,
    "ANALYTICS_INITIALIZATION_EVENT_NAME",
    ()=>ANALYTICS_INITIALIZATION_EVENT_NAME,
    "ANALYTICS_SESSION_DURATION_EVENT_NAME",
    ()=>ANALYTICS_SESSION_DURATION_EVENT_NAME,
    "ANALYTICS_SESSION_ID_LOCAL_STORAGE_KEY",
    ()=>ANALYTICS_SESSION_ID_LOCAL_STORAGE_KEY,
    "USER_HEARTBEAT_EVENT_NAME",
    ()=>USER_HEARTBEAT_EVENT_NAME,
    "createAnalyticsModule",
    ()=>createAnalyticsModule,
    "getAnalyticsConfigFromUrlParams",
    ()=>getAnalyticsConfigFromUrlParams,
    "getAnalyticsSessionId",
    ()=>getAnalyticsSessionId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$sharedInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/sharedInstance.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/common.js [client] (ecmascript)");
;
;
const USER_HEARTBEAT_EVENT_NAME = "__user_heartbeat_event__";
const ANALYTICS_INITIALIZATION_EVENT_NAME = "__initialization_event__";
const ANALYTICS_SESSION_DURATION_EVENT_NAME = "__session_duration_event__";
const ANALYTICS_CONFIG_ENABLE_URL_PARAM_KEY = "analytics-enable";
const ANALYTICS_SESSION_ID_LOCAL_STORAGE_KEY = "base44_analytics_session_id";
const defaultConfiguration = {
    // default to enabled //
    enabled: true,
    maxQueueSize: 1000,
    throttleTime: 1000,
    batchSize: 30,
    heartBeatInterval: 60 * 1000
};
///////////////////////////////////////////////
//// shared queue for analytics events     ////
///////////////////////////////////////////////
const ANALYTICS_SHARED_STATE_NAME = "analytics";
// shared state//
const analyticsSharedState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$sharedInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSharedInstance"])(ANALYTICS_SHARED_STATE_NAME, ()=>({
        requestsQueue: [],
        isProcessing: false,
        isHeartBeatProcessing: false,
        wasInitializationTracked: false,
        sessionContext: null,
        sessionStartTime: null,
        config: {
            ...defaultConfiguration,
            ...getAnalyticsConfigFromUrlParams()
        }
    }));
const createAnalyticsModule = ({ axiosClient, serverUrl, appId, userAuthModule })=>{
    var _a;
    // prevent overflow of events //
    const { maxQueueSize, throttleTime, batchSize } = analyticsSharedState.config;
    if (!((_a = analyticsSharedState.config) === null || _a === void 0 ? void 0 : _a.enabled)) {
        return {
            track: ()=>{},
            cleanup: ()=>{}
        };
    }
    let clearHeartBeatProcessor = undefined;
    const trackBatchUrl = `${serverUrl}/api/apps/${appId}/analytics/track/batch`;
    const batchRequestFallback = async (events)=>{
        await axiosClient.request({
            method: "POST",
            url: `/apps/${appId}/analytics/track/batch`,
            data: {
                events
            }
        });
    };
    // currently disabled, until fully tested  //
    const beaconRequest = (events)=>{
        try {
            const beaconPayload = JSON.stringify({
                events
            });
            const blob = new Blob([
                beaconPayload
            ], {
                type: "application/json"
            });
            return typeof navigator === "undefined" || beaconPayload.length > 60000 || !navigator.sendBeacon(trackBatchUrl, blob);
        } catch (_a) {
            return false;
        }
    };
    const flush = async (eventsData, options = {})=>{
        if (eventsData.length === 0) return;
        const sessionContext_ = await getSessionContext(userAuthModule);
        const events = eventsData.map(transformEventDataToApiRequestData(sessionContext_));
        try {
            if (!options.isBeacon || !beaconRequest(events)) {
                await batchRequestFallback(events);
            }
        } catch (_a) {
        // do nothing
        }
    };
    const startProcessing = ()=>{
        startAnalyticsProcessor(flush, {
            throttleTime,
            batchSize
        });
    };
    const track = (params)=>{
        if (analyticsSharedState.requestsQueue.length >= maxQueueSize) {
            return;
        }
        const intrinsicData = getEventIntrinsicData();
        analyticsSharedState.requestsQueue.push({
            ...params,
            ...intrinsicData
        });
        startProcessing();
    };
    const onDocVisible = ()=>{
        startAnalyticsProcessor(flush, {
            throttleTime,
            batchSize
        });
        clearHeartBeatProcessor = startHeartBeatProcessor(track);
        setSessionDurationTimerStart();
    };
    const onDocHidden = ()=>{
        stopAnalyticsProcessor();
        clearHeartBeatProcessor === null || clearHeartBeatProcessor === void 0 ? void 0 : clearHeartBeatProcessor();
        trackSessionDurationEvent(track);
        //  flush entire queue on visibility change and hope for the best //
        const eventsData = analyticsSharedState.requestsQueue.splice(0);
        flush(eventsData, {
            isBeacon: true
        });
    };
    const onVisibilityChange = ()=>{
        if (typeof window === "undefined") return;
        if (document.visibilityState === "hidden") {
            onDocHidden();
        } else if (document.visibilityState === "visible") {
            onDocVisible();
        }
    };
    const cleanup = ()=>{
        stopAnalyticsProcessor();
        clearHeartBeatProcessor === null || clearHeartBeatProcessor === void 0 ? void 0 : clearHeartBeatProcessor();
        if (typeof window !== "undefined") {
            window.removeEventListener("visibilitychange", onVisibilityChange);
        }
    };
    // start the flusing process ///
    startProcessing();
    // start the heart beat processor //
    clearHeartBeatProcessor = startHeartBeatProcessor(track);
    // track the referrer event //
    trackInitializationEvent(track);
    // start the visibility change listener //
    if (typeof window !== "undefined") {
        window.addEventListener("visibilitychange", onVisibilityChange);
    }
    return {
        track,
        cleanup
    };
};
function stopAnalyticsProcessor() {
    analyticsSharedState.isProcessing = false;
}
async function startAnalyticsProcessor(handleTrack, options) {
    if (analyticsSharedState.isProcessing) {
        // only one instance of the analytics processor can be running at a time //
        return;
    }
    analyticsSharedState.isProcessing = true;
    const { throttleTime = 1000, batchSize = 30 } = options !== null && options !== void 0 ? options : {};
    while(analyticsSharedState.isProcessing && analyticsSharedState.requestsQueue.length > 0){
        const requests = analyticsSharedState.requestsQueue.splice(0, batchSize);
        requests.length && await handleTrack(requests);
        await new Promise((resolve)=>setTimeout(resolve, throttleTime));
    }
    analyticsSharedState.isProcessing = false;
}
function startHeartBeatProcessor(track) {
    var _a;
    if (analyticsSharedState.isHeartBeatProcessing || ((_a = analyticsSharedState.config.heartBeatInterval) !== null && _a !== void 0 ? _a : 0) < 10) {
        return ()=>{};
    }
    analyticsSharedState.isHeartBeatProcessing = true;
    const interval = setInterval(()=>{
        track({
            eventName: USER_HEARTBEAT_EVENT_NAME
        });
    }, analyticsSharedState.config.heartBeatInterval);
    return ()=>{
        clearInterval(interval);
        analyticsSharedState.isHeartBeatProcessing = false;
    };
}
function trackInitializationEvent(track) {
    if (typeof window === "undefined" || analyticsSharedState.wasInitializationTracked) {
        return;
    }
    analyticsSharedState.wasInitializationTracked = true;
    track({
        eventName: ANALYTICS_INITIALIZATION_EVENT_NAME,
        properties: {
            referrer: document === null || document === void 0 ? void 0 : document.referrer
        }
    });
}
function setSessionDurationTimerStart() {
    if (typeof window === "undefined" || analyticsSharedState.sessionStartTime !== null) {
        return;
    }
    analyticsSharedState.sessionStartTime = new Date().toISOString();
}
function trackSessionDurationEvent(track) {
    if (typeof window === "undefined" || analyticsSharedState.sessionStartTime === null) return;
    const sessionDuration = new Date().getTime() - new Date(analyticsSharedState.sessionStartTime).getTime();
    analyticsSharedState.sessionStartTime = null;
    track({
        eventName: ANALYTICS_SESSION_DURATION_EVENT_NAME,
        properties: {
            sessionDuration
        }
    });
}
function getEventIntrinsicData() {
    return {
        timestamp: new Date().toISOString(),
        pageUrl: typeof window !== "undefined" ? window.location.pathname : null
    };
}
function transformEventDataToApiRequestData(sessionContext) {
    return (eventData)=>({
            event_name: eventData.eventName,
            properties: eventData.properties,
            timestamp: eventData.timestamp,
            page_url: eventData.pageUrl,
            ...sessionContext
        });
}
let sessionContextPromise = null;
async function getSessionContext(userAuthModule) {
    if (!analyticsSharedState.sessionContext) {
        if (!sessionContextPromise) {
            const sessionId = getAnalyticsSessionId();
            sessionContextPromise = userAuthModule.me().then((user)=>({
                    user_id: user.id,
                    session_id: sessionId
                })).catch(()=>({
                    user_id: null,
                    session_id: sessionId
                }));
        }
        analyticsSharedState.sessionContext = await sessionContextPromise;
    }
    return analyticsSharedState.sessionContext;
}
function getAnalyticsConfigFromUrlParams() {
    if (typeof window === "undefined") return undefined;
    const urlParams = new URLSearchParams(window.location.search);
    const analyticsEnable = urlParams.get(ANALYTICS_CONFIG_ENABLE_URL_PARAM_KEY);
    // if the url param is not set, return undefined //
    if (analyticsEnable == null || !analyticsEnable.length) return undefined;
    // remove the url param from the url //
    const newUrlParams = new URLSearchParams(window.location.search);
    newUrlParams.delete(ANALYTICS_CONFIG_ENABLE_URL_PARAM_KEY);
    const newUrl = window.location.pathname + (newUrlParams.toString() ? "?" + newUrlParams.toString() : "");
    window.history.replaceState({}, "", newUrl);
    // return the config object //
    return {
        enabled: analyticsEnable === "true"
    };
}
function getAnalyticsSessionId() {
    if (typeof window === "undefined") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["generateUuid"])();
    }
    try {
        const sessionId = localStorage.getItem(ANALYTICS_SESSION_ID_LOCAL_STORAGE_KEY);
        if (!sessionId) {
            const newSessionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["generateUuid"])();
            localStorage.setItem(ANALYTICS_SESSION_ID_LOCAL_STORAGE_KEY, newSessionId);
            return newSessionId;
        }
        return sessionId;
    } catch (_a) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["generateUuid"])();
    }
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/client.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient,
    "createClientFromRequest",
    ()=>createClientFromRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$axios$2d$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/axios-client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$entities$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/entities.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$integrations$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/integrations.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$auth$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/auth.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$sso$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/sso.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$connectors$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/connectors.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$auth$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/auth-utils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$functions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/functions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$agents$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/agents.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$app$2d$logs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/app-logs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$users$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/users.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$socket$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/socket-utils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$analytics$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/analytics.js [client] (ecmascript)");
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
function createClient(config) {
    var _a, _b;
    const { serverUrl = "https://base44.app", appId, token, serviceToken, requiresAuth = false, appBaseUrl, options, functionsVersion, headers: optionalHeaders } = config;
    // Normalize appBaseUrl to always be a string (empty if not provided or invalid)
    const normalizedAppBaseUrl = typeof appBaseUrl === "string" ? appBaseUrl : "";
    const socketConfig = {
        serverUrl,
        mountPath: "/ws-user-apps/socket.io/",
        transports: [
            "websocket"
        ],
        appId,
        token
    };
    let socket = null;
    const getSocket = ()=>{
        if (!socket) {
            socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$socket$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["RoomsSocket"])({
                config: socketConfig
            });
        }
        return socket;
    };
    const headers = {
        ...optionalHeaders,
        "X-App-Id": String(appId)
    };
    const functionHeaders = functionsVersion ? {
        ...headers,
        "Base44-Functions-Version": functionsVersion
    } : headers;
    const axiosClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$axios$2d$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createAxiosClient"])({
        baseURL: `${serverUrl}/api`,
        headers,
        token,
        onError: options === null || options === void 0 ? void 0 : options.onError
    });
    const functionsAxiosClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$axios$2d$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createAxiosClient"])({
        baseURL: `${serverUrl}/api`,
        headers: functionHeaders,
        token,
        interceptResponses: false,
        onError: options === null || options === void 0 ? void 0 : options.onError
    });
    const serviceRoleHeaders = {
        ...headers,
        ...token ? {
            "on-behalf-of": `Bearer ${token}`
        } : {}
    };
    const serviceRoleAxiosClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$axios$2d$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createAxiosClient"])({
        baseURL: `${serverUrl}/api`,
        headers: serviceRoleHeaders,
        token: serviceToken,
        onError: options === null || options === void 0 ? void 0 : options.onError
    });
    const serviceRoleFunctionsAxiosClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$axios$2d$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createAxiosClient"])({
        baseURL: `${serverUrl}/api`,
        headers: functionHeaders,
        token: serviceToken,
        interceptResponses: false
    });
    const userAuthModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$auth$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createAuthModule"])(axiosClient, functionsAxiosClient, appId, {
        appBaseUrl: normalizedAppBaseUrl,
        serverUrl
    });
    const userModules = {
        entities: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$entities$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createEntitiesModule"])({
            axios: axiosClient,
            appId,
            getSocket
        }),
        integrations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$integrations$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createIntegrationsModule"])(axiosClient, appId),
        connectors: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$connectors$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createUserConnectorsModule"])(axiosClient, appId),
        auth: userAuthModule,
        functions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$functions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createFunctionsModule"])(functionsAxiosClient, appId, {
            getAuthHeaders: ()=>{
                const headers = {};
                // Get current token from storage or initial config
                const currentToken = token || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$auth$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAccessToken"])();
                if (currentToken) {
                    headers["Authorization"] = `Bearer ${currentToken}`;
                }
                return headers;
            },
            baseURL: (_a = functionsAxiosClient.defaults) === null || _a === void 0 ? void 0 : _a.baseURL
        }),
        agents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$agents$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createAgentsModule"])({
            axios: axiosClient,
            getSocket,
            appId,
            serverUrl,
            token
        }),
        appLogs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$app$2d$logs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createAppLogsModule"])(axiosClient, appId),
        users: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$users$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createUsersModule"])(axiosClient, appId),
        analytics: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$analytics$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createAnalyticsModule"])({
            axiosClient,
            serverUrl,
            appId,
            userAuthModule
        }),
        cleanup: ()=>{
            userModules.analytics.cleanup();
            if (socket) {
                socket.disconnect();
            }
        }
    };
    const serviceRoleModules = {
        entities: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$entities$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createEntitiesModule"])({
            axios: serviceRoleAxiosClient,
            appId,
            getSocket
        }),
        integrations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$integrations$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createIntegrationsModule"])(serviceRoleAxiosClient, appId),
        sso: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$sso$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createSsoModule"])(serviceRoleAxiosClient, appId),
        connectors: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$connectors$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createConnectorsModule"])(serviceRoleAxiosClient, appId),
        functions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$functions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createFunctionsModule"])(serviceRoleFunctionsAxiosClient, appId, {
            getAuthHeaders: ()=>{
                const headers = {};
                // Use service token for authorization
                if (serviceToken) {
                    headers["Authorization"] = `Bearer ${serviceToken}`;
                }
                return headers;
            },
            baseURL: (_b = serviceRoleFunctionsAxiosClient.defaults) === null || _b === void 0 ? void 0 : _b.baseURL
        }),
        agents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$agents$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createAgentsModule"])({
            axios: serviceRoleAxiosClient,
            getSocket,
            appId,
            serverUrl,
            token
        }),
        appLogs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$app$2d$logs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createAppLogsModule"])(serviceRoleAxiosClient, appId),
        cleanup: ()=>{
            if (socket) {
                socket.disconnect();
            }
        }
    };
    // Always try to get token from localStorage or URL parameters
    if (typeof window !== "undefined") {
        // Get token from URL or localStorage
        const accessToken = token || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$auth$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAccessToken"])();
        if (accessToken) {
            userModules.auth.setToken(accessToken);
        }
    }
    // If authentication is required, verify token and redirect to login if needed
    if (requiresAuth && typeof window !== "undefined") {
        // We perform this check asynchronously to not block client creation
        setTimeout(async ()=>{
            try {
                const isAuthenticated = await userModules.auth.isAuthenticated();
                if (!isAuthenticated) {
                    userModules.auth.redirectToLogin(window.location.href);
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                userModules.auth.redirectToLogin(window.location.href);
            }
        }, 0);
    }
    // Assemble and return the client
    const client = {
        ...userModules,
        /**
         * Sets a new authentication token for all subsequent requests.
         *
         * @param newToken - The new authentication token
         *
         * @example
         * ```typescript
         * // Update token after login
         * const { access_token } = await base44.auth.loginViaEmailPassword(
         *   'user@example.com',
         *   'password'
         * );
         * base44.setToken(access_token);
         * ```
         */ setToken (newToken) {
            userModules.auth.setToken(newToken);
            if (socket) {
                socket.updateConfig({
                    token: newToken
                });
            }
            socketConfig.token = newToken;
        },
        /**
         * Gets the current client configuration.
         *
         * @internal
         */ getConfig () {
            return {
                serverUrl,
                appId,
                requiresAuth
            };
        },
        /**
         * Provides access to service role modules.
         *
         * Service role authentication provides elevated permissions for backend operations. Unlike user authentication, which is scoped to a specific user's permissions, service role authentication has access to the data and operations available to the app's admin.
         *
         * @throws {Error} When accessed without providing a serviceToken during client creation.
         *
         * @example
         * ```typescript
         * const base44 = createClient({
         *   appId: 'my-app-id',
         *   serviceToken: 'service-role-token'
         * });
         *
         * // Also access a module with elevated permissions
         * const allUsers = await base44.asServiceRole.entities.User.list();
         * ```
         */ get asServiceRole () {
            if (!serviceToken) {
                throw new Error("Service token is required to use asServiceRole. Please provide a serviceToken when creating the client.");
            }
            return serviceRoleModules;
        }
    };
    return client;
}
function createClientFromRequest(request) {
    const authHeader = request.headers.get("Authorization");
    const serviceRoleAuthHeader = request.headers.get("Base44-Service-Authorization");
    const appId = request.headers.get("Base44-App-Id");
    const serverUrlHeader = request.headers.get("Base44-Api-Url");
    const functionsVersion = request.headers.get("Base44-Functions-Version");
    const stateHeader = request.headers.get("Base44-State");
    if (!appId) {
        throw new Error("Base44-App-Id header is required, but is was not found on the request");
    }
    // Validate authorization header formats
    let serviceRoleToken;
    let userToken;
    if (serviceRoleAuthHeader !== null) {
        if (serviceRoleAuthHeader === "" || !serviceRoleAuthHeader.startsWith("Bearer ") || serviceRoleAuthHeader.split(" ").length !== 2) {
            throw new Error('Invalid authorization header format. Expected "Bearer <token>"');
        }
        serviceRoleToken = serviceRoleAuthHeader.split(" ")[1];
    }
    if (authHeader !== null) {
        if (authHeader === "" || !authHeader.startsWith("Bearer ") || authHeader.split(" ").length !== 2) {
            throw new Error('Invalid authorization header format. Expected "Bearer <token>"');
        }
        userToken = authHeader.split(" ")[1];
    }
    // Prepare additional headers to propagate
    const additionalHeaders = {};
    if (stateHeader) {
        additionalHeaders["Base44-State"] = stateHeader;
    }
    return createClient({
        serverUrl: serverUrlHeader || "https://base44.app",
        appId,
        token: userToken,
        serviceToken: serviceRoleToken,
        functionsVersion: functionsVersion !== null && functionsVersion !== void 0 ? functionsVersion : undefined,
        headers: additionalHeaders
    });
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/types.js [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/types.js [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$modules$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/modules/types.js [client] (ecmascript) <locals>");
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/index.js [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$axios$2d$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/axios-client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$utils$2f$auth$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/utils/auth-utils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$base44$2f$sdk$2f$dist$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@base44/sdk/dist/types.js [client] (ecmascript) <locals>");
;
;
;
;
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/native.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const __TURBOPACK__default__export__ = {
    randomUUID
};
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/rng.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>rng
]);
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/regex.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/validate.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$regex$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/regex.js [client] (ecmascript)");
;
function validate(uuid) {
    return typeof uuid === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$regex$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].test(uuid);
}
const __TURBOPACK__default__export__ = validate;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/stringify.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "unsafeStringify",
    ()=>unsafeStringify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$validate$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/validate.js [client] (ecmascript)");
;
const byteToHex = [];
for(let i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$validate$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
const __TURBOPACK__default__export__ = stringify;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/v4.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$native$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/native.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$rng$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/rng.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$stringify$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/stringify.js [client] (ecmascript)");
;
;
;
function _v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$rng$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for(let i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$stringify$2e$js__$5b$client$5d$__$28$ecmascript$29$__["unsafeStringify"])(rnds);
}
function v4(options, buf, offset) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$native$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].randomUUID && !buf && !options) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$native$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].randomUUID();
    }
    return _v4(options, buf, offset);
}
const __TURBOPACK__default__export__ = v4;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/v4.js [client] (ecmascript) <export default as v4>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/uuid/dist/v4.js [client] (ecmascript)");
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/commons.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ERROR_PACKET",
    ()=>ERROR_PACKET,
    "PACKET_TYPES",
    ()=>PACKET_TYPES,
    "PACKET_TYPES_REVERSE",
    ()=>PACKET_TYPES_REVERSE
]);
const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach((key)=>{
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = {
    type: "error",
    data: "parser error"
};
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/encodePacket.browser.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodePacket",
    ()=>encodePacket,
    "encodePacketToBinary",
    ()=>encodePacketToBinary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/commons.js [client] (ecmascript)");
;
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = (obj)=>{
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback)=>{
    if (withNativeBlob && data instanceof Blob) {
        if (supportsBinary) {
            return callback(data);
        } else {
            return encodeBlobAsBase64(data, callback);
        }
    } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
        if (supportsBinary) {
            return callback(data);
        } else {
            return encodeBlobAsBase64(new Blob([
                data
            ]), callback);
        }
    }
    // plain string
    return callback(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PACKET_TYPES"][type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback)=>{
    const fileReader = new FileReader();
    fileReader.onload = function() {
        const content = fileReader.result.split(",")[1];
        callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
};
function toArray(data) {
    if (data instanceof Uint8Array) {
        return data;
    } else if (data instanceof ArrayBuffer) {
        return new Uint8Array(data);
    } else {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
}
let TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
    if (withNativeBlob && packet.data instanceof Blob) {
        return packet.data.arrayBuffer().then(toArray).then(callback);
    } else if (withNativeArrayBuffer && (packet.data instanceof ArrayBuffer || isView(packet.data))) {
        return callback(toArray(packet.data));
    }
    encodePacket(packet, false, (encoded)=>{
        if (!TEXT_ENCODER) {
            TEXT_ENCODER = new TextEncoder();
        }
        callback(TEXT_ENCODER.encode(encoded));
    });
}
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decode",
    ()=>decode,
    "encode",
    ()=>encode
]);
// imported from https://github.com/socketio/base64-arraybuffer
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for(let i = 0; i < chars.length; i++){
    lookup[chars.charCodeAt(i)] = i;
}
const encode = (arraybuffer)=>{
    let bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
    for(i = 0; i < len; i += 3){
        base64 += chars[bytes[i] >> 2];
        base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
};
const decode = (base64)=>{
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for(i = 0; i < len; i += 4){
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return arraybuffer;
};
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/decodePacket.browser.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodePacket",
    ()=>decodePacket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/commons.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$contrib$2f$base64$2d$arraybuffer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js [client] (ecmascript)");
;
;
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType)=>{
    if (typeof encodedPacket !== "string") {
        return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
        };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
        return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
        };
    }
    const packetType = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PACKET_TYPES_REVERSE"][type];
    if (!packetType) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ERROR_PACKET"];
    }
    return encodedPacket.length > 1 ? {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PACKET_TYPES_REVERSE"][type],
        data: encodedPacket.substring(1)
    } : {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PACKET_TYPES_REVERSE"][type]
    };
};
const decodeBase64Packet = (data, binaryType)=>{
    if (withNativeArrayBuffer) {
        const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$contrib$2f$base64$2d$arraybuffer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["decode"])(data);
        return mapBinary(decoded, binaryType);
    } else {
        return {
            base64: true,
            data
        }; // fallback for old browsers
    }
};
const mapBinary = (data, binaryType)=>{
    switch(binaryType){
        case "blob":
            if (data instanceof Blob) {
                // from WebSocket + binaryType "blob"
                return data;
            } else {
                // from HTTP long-polling or WebTransport
                return new Blob([
                    data
                ]);
            }
        case "arraybuffer":
        default:
            if (data instanceof ArrayBuffer) {
                // from HTTP long-polling (base64) or WebSocket + binaryType "arraybuffer"
                return data;
            } else {
                // from WebTransport (Uint8Array)
                return data.buffer;
            }
    }
};
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/index.js [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPacketDecoderStream",
    ()=>createPacketDecoderStream,
    "createPacketEncoderStream",
    ()=>createPacketEncoderStream,
    "decodePayload",
    ()=>decodePayload,
    "encodePayload",
    ()=>encodePayload,
    "protocol",
    ()=>protocol
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$encodePacket$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/encodePacket.browser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$decodePacket$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/decodePacket.browser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/commons.js [client] (ecmascript)");
;
;
;
const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback)=>{
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i)=>{
        // force base64 encoding for binary packets
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$encodePacket$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["encodePacket"])(packet, false, (encodedPacket)=>{
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
            }
        });
    });
};
const decodePayload = (encodedPayload, binaryType)=>{
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for(let i = 0; i < encodedPackets.length; i++){
        const decodedPacket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$decodePacket$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["decodePacket"])(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
            break;
        }
    }
    return packets;
};
function createPacketEncoderStream() {
    return new TransformStream({
        transform (packet, controller) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$encodePacket$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["encodePacketToBinary"])(packet, (encodedPacket)=>{
                const payloadLength = encodedPacket.length;
                let header;
                // inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length
                if (payloadLength < 126) {
                    header = new Uint8Array(1);
                    new DataView(header.buffer).setUint8(0, payloadLength);
                } else if (payloadLength < 65536) {
                    header = new Uint8Array(3);
                    const view = new DataView(header.buffer);
                    view.setUint8(0, 126);
                    view.setUint16(1, payloadLength);
                } else {
                    header = new Uint8Array(9);
                    const view = new DataView(header.buffer);
                    view.setUint8(0, 127);
                    view.setBigUint64(1, BigInt(payloadLength));
                }
                // first bit indicates whether the payload is plain text (0) or binary (1)
                if (packet.data && typeof packet.data !== "string") {
                    header[0] |= 0x80;
                }
                controller.enqueue(header);
                controller.enqueue(encodedPacket);
            });
        }
    });
}
let TEXT_DECODER;
function totalLength(chunks) {
    return chunks.reduce((acc, chunk)=>acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
    if (chunks[0].length === size) {
        return chunks.shift();
    }
    const buffer = new Uint8Array(size);
    let j = 0;
    for(let i = 0; i < size; i++){
        buffer[i] = chunks[0][j++];
        if (j === chunks[0].length) {
            chunks.shift();
            j = 0;
        }
    }
    if (chunks.length && j < chunks[0].length) {
        chunks[0] = chunks[0].slice(j);
    }
    return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
    if (!TEXT_DECODER) {
        TEXT_DECODER = new TextDecoder();
    }
    const chunks = [];
    let state = 0 /* State.READ_HEADER */ ;
    let expectedLength = -1;
    let isBinary = false;
    return new TransformStream({
        transform (chunk, controller) {
            chunks.push(chunk);
            while(true){
                if (state === 0 /* State.READ_HEADER */ ) {
                    if (totalLength(chunks) < 1) {
                        break;
                    }
                    const header = concatChunks(chunks, 1);
                    isBinary = (header[0] & 0x80) === 0x80;
                    expectedLength = header[0] & 0x7f;
                    if (expectedLength < 126) {
                        state = 3 /* State.READ_PAYLOAD */ ;
                    } else if (expectedLength === 126) {
                        state = 1 /* State.READ_EXTENDED_LENGTH_16 */ ;
                    } else {
                        state = 2 /* State.READ_EXTENDED_LENGTH_64 */ ;
                    }
                } else if (state === 1 /* State.READ_EXTENDED_LENGTH_16 */ ) {
                    if (totalLength(chunks) < 2) {
                        break;
                    }
                    const headerArray = concatChunks(chunks, 2);
                    expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
                    state = 3 /* State.READ_PAYLOAD */ ;
                } else if (state === 2 /* State.READ_EXTENDED_LENGTH_64 */ ) {
                    if (totalLength(chunks) < 8) {
                        break;
                    }
                    const headerArray = concatChunks(chunks, 8);
                    const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
                    const n = view.getUint32(0);
                    if (n > Math.pow(2, 53 - 32) - 1) {
                        // the maximum safe integer in JavaScript is 2^53 - 1
                        controller.enqueue(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ERROR_PACKET"]);
                        break;
                    }
                    expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
                    state = 3 /* State.READ_PAYLOAD */ ;
                } else {
                    if (totalLength(chunks) < expectedLength) {
                        break;
                    }
                    const data = concatChunks(chunks, expectedLength);
                    controller.enqueue((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$decodePacket$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["decodePacket"])(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
                    state = 0 /* State.READ_HEADER */ ;
                }
                if (expectedLength === 0 || expectedLength > maxPayload) {
                    controller.enqueue(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ERROR_PACKET"]);
                    break;
                }
            }
        }
    });
}
const protocol = 4;
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@socket.io/component-emitter/lib/esm/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */ __turbopack_context__.s([
    "Emitter",
    ()=>Emitter
]);
function Emitter(obj) {
    if (obj) return mixin(obj);
}
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */ function mixin(obj) {
    for(var key in Emitter.prototype){
        obj[key] = Emitter.prototype[key];
    }
    return obj;
}
/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */ Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
    return this;
};
/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */ Emitter.prototype.once = function(event, fn) {
    function on() {
        this.off(event, on);
        fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(event, on);
    return this;
};
/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */ Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    // all
    if (0 == arguments.length) {
        this._callbacks = {};
        return this;
    }
    // specific event
    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this;
    // remove all handlers
    if (1 == arguments.length) {
        delete this._callbacks['$' + event];
        return this;
    }
    // remove specific handler
    var cb;
    for(var i = 0; i < callbacks.length; i++){
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
        }
    }
    // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.
    if (callbacks.length === 0) {
        delete this._callbacks['$' + event];
    }
    return this;
};
/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */ Emitter.prototype.emit = function(event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1), callbacks = this._callbacks['$' + event];
    for(var i = 1; i < arguments.length; i++){
        args[i - 1] = arguments[i];
    }
    if (callbacks) {
        callbacks = callbacks.slice(0);
        for(var i = 0, len = callbacks.length; i < len; ++i){
            callbacks[i].apply(this, args);
        }
    }
    return this;
};
// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;
/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */ Emitter.prototype.listeners = function(event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
};
/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */ Emitter.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
};
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/globals.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCookieJar",
    ()=>createCookieJar,
    "defaultBinaryType",
    ()=>defaultBinaryType,
    "globalThisShim",
    ()=>globalThisShim,
    "nextTick",
    ()=>nextTick
]);
const nextTick = (()=>{
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
        return (cb)=>Promise.resolve().then(cb);
    } else {
        return (cb, setTimeoutFn)=>setTimeoutFn(cb, 0);
    }
})();
const globalThisShim = (()=>{
    if (typeof self !== "undefined") {
        return self;
    } else if (typeof window !== "undefined") {
        return window;
    } else {
        return Function("return this")();
    }
})();
const defaultBinaryType = "arraybuffer";
function createCookieJar() {}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/util.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "byteLength",
    ()=>byteLength,
    "installTimerFunctions",
    ()=>installTimerFunctions,
    "pick",
    ()=>pick,
    "randomString",
    ()=>randomString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/globals.js [client] (ecmascript)");
;
function pick(obj, ...attr) {
    return attr.reduce((acc, k)=>{
        if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalThisShim"].setTimeout;
const NATIVE_CLEAR_TIMEOUT = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalThisShim"].clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalThisShim"]);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalThisShim"]);
    } else {
        obj.setTimeoutFn = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalThisShim"].setTimeout.bind(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalThisShim"]);
        obj.clearTimeoutFn = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalThisShim"].clearTimeout.bind(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalThisShim"]);
    }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
    if (typeof obj === "string") {
        return utf8Length(obj);
    }
    // arraybuffer or blob
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
    let c = 0, length = 0;
    for(let i = 0, l = str.length; i < l; i++){
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        } else if (c < 0x800) {
            length += 2;
        } else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        } else {
            i++;
            length += 4;
        }
    }
    return length;
}
function randomString() {
    return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/contrib/parseqs.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */ __turbopack_context__.s([
    "decode",
    ()=>decode,
    "encode",
    ()=>encode
]);
function encode(obj) {
    let str = '';
    for(let i in obj){
        if (obj.hasOwnProperty(i)) {
            if (str.length) str += '&';
            str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
        }
    }
    return str;
}
function decode(qs) {
    let qry = {};
    let pairs = qs.split('&');
    for(let i = 0, l = pairs.length; i < l; i++){
        let pair = pairs[i].split('=');
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transport.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Transport",
    ()=>Transport,
    "TransportError",
    ()=>TransportError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$decodePacket$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/decodePacket.browser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@socket.io/component-emitter/lib/esm/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/util.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$parseqs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/contrib/parseqs.js [client] (ecmascript)");
;
;
;
;
class TransportError extends Error {
    constructor(reason, description, context){
        super(reason);
        this.description = description;
        this.context = context;
        this.type = "TransportError";
    }
}
class Transport extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Emitter"] {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */ constructor(opts){
        super();
        this.writable = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__["installTimerFunctions"])(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.socket = opts.socket;
        this.supportsBinary = !opts.forceBase64;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */ onError(reason, description, context) {
        super.emitReserved("error", new TransportError(reason, description, context));
        return this;
    }
    /**
     * Opens the transport.
     */ open() {
        this.readyState = "opening";
        this.doOpen();
        return this;
    }
    /**
     * Closes the transport.
     */ close() {
        if (this.readyState === "opening" || this.readyState === "open") {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */ send(packets) {
        if (this.readyState === "open") {
            this.write(packets);
        } else {
        // this might happen if the transport was silently closed in the beforeunload event handler
        }
    }
    /**
     * Called upon open
     *
     * @protected
     */ onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */ onData(data) {
        const packet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$decodePacket$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["decodePacket"])(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */ onPacket(packet) {
        super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */ onClose(details) {
        this.readyState = "closed";
        super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */ pause(onPause) {}
    createUri(schema, query = {}) {
        return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
    }
    _hostname() {
        const hostname = this.opts.hostname;
        return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
    }
    _port() {
        if (this.opts.port && (this.opts.secure && Number(this.opts.port) !== 443 || !this.opts.secure && Number(this.opts.port) !== 80)) {
            return ":" + this.opts.port;
        } else {
            return "";
        }
    }
    _query(query) {
        const encodedQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$parseqs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["encode"])(query);
        return encodedQuery.length ? "?" + encodedQuery : "";
    }
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/polling.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Polling",
    ()=>Polling
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transport$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transport.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/util.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/index.js [client] (ecmascript) <locals>");
;
;
;
class Polling extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transport$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Transport"] {
    constructor(){
        super(...arguments);
        this._polling = false;
    }
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */ doOpen() {
        this._poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */ pause(onPause) {
        this.readyState = "pausing";
        const pause = ()=>{
            this.readyState = "paused";
            onPause();
        };
        if (this._polling || !this.writable) {
            let total = 0;
            if (this._polling) {
                total++;
                this.once("pollComplete", function() {
                    --total || pause();
                });
            }
            if (!this.writable) {
                total++;
                this.once("drain", function() {
                    --total || pause();
                });
            }
        } else {
            pause();
        }
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */ _poll() {
        this._polling = true;
        this.doPoll();
        this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */ onData(data) {
        const callback = (packet)=>{
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
                this.onOpen();
            }
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose({
                    description: "transport closed by the server"
                });
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["decodePayload"])(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this._polling = false;
            this.emitReserved("pollComplete");
            if ("open" === this.readyState) {
                this._poll();
            } else {}
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */ doClose() {
        const close = ()=>{
            this.write([
                {
                    type: "close"
                }
            ]);
        };
        if ("open" === this.readyState) {
            close();
        } else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            this.once("open", close);
        }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */ write(packets) {
        this.writable = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["encodePayload"])(packets, (data)=>{
            this.doWrite(data, ()=>{
                this.writable = true;
                this.emitReserved("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */ uri() {
        const schema = this.opts.secure ? "https" : "http";
        const query = this.query || {};
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__["randomString"])();
        }
        if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
        }
        return this.createUri(schema, query);
    }
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/contrib/has-cors.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasCORS",
    ()=>hasCORS
]);
// imported from https://github.com/component/has-cors
let value = false;
try {
    value = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
} catch (err) {
// if XMLHttp support is disabled in IE then it will throw
// when trying to create
}
const hasCORS = value;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/polling-xhr.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseXHR",
    ()=>BaseXHR,
    "Request",
    ()=>Request,
    "XHR",
    ()=>XHR
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$polling$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/polling.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@socket.io/component-emitter/lib/esm/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/util.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/globals.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$has$2d$cors$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/contrib/has-cors.js [client] (ecmascript)");
;
;
;
;
;
function empty() {}
class BaseXHR extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$polling$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Polling"] {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */ constructor(opts){
        super(opts);
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) {
                port = isSSL ? "443" : "80";
            }
            this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
        }
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @private
     */ doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data
        });
        req.on("success", fn);
        req.on("error", (xhrStatus, context)=>{
            this.onError("xhr post error", xhrStatus, context);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */ doPoll() {
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", (xhrStatus, context)=>{
            this.onError("xhr poll error", xhrStatus, context);
        });
        this.pollXhr = req;
    }
}
class Request extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Emitter"] {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */ constructor(createRequest, uri, opts){
        super();
        this.createRequest = createRequest;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__["installTimerFunctions"])(this, opts);
        this._opts = opts;
        this._method = opts.method || "GET";
        this._uri = uri;
        this._data = undefined !== opts.data ? opts.data : null;
        this._create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */ _create() {
        var _a;
        const opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pick"])(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this._opts.xd;
        const xhr = this._xhr = this.createRequest(opts);
        try {
            xhr.open(this._method, this._uri, true);
            try {
                if (this._opts.extraHeaders) {
                    // @ts-ignore
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for(let i in this._opts.extraHeaders){
                        if (this._opts.extraHeaders.hasOwnProperty(i)) {
                            xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
                        }
                    }
                }
            } catch (e) {}
            if ("POST" === this._method) {
                try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                } catch (e) {}
            }
            try {
                xhr.setRequestHeader("Accept", "*/*");
            } catch (e) {}
            (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
            // ie6 check
            if ("withCredentials" in xhr) {
                xhr.withCredentials = this._opts.withCredentials;
            }
            if (this._opts.requestTimeout) {
                xhr.timeout = this._opts.requestTimeout;
            }
            xhr.onreadystatechange = ()=>{
                var _a;
                if (xhr.readyState === 3) {
                    (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(// @ts-ignore
                    xhr.getResponseHeader("set-cookie"));
                }
                if (4 !== xhr.readyState) return;
                if (200 === xhr.status || 1223 === xhr.status) {
                    this._onLoad();
                } else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    this.setTimeoutFn(()=>{
                        this._onError(typeof xhr.status === "number" ? xhr.status : 0);
                    }, 0);
                }
            };
            xhr.send(this._data);
        } catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(()=>{
                this._onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this._index = Request.requestsCount++;
            Request.requests[this._index] = this;
        }
    }
    /**
     * Called upon error.
     *
     * @private
     */ _onError(err) {
        this.emitReserved("error", err, this._xhr);
        this._cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */ _cleanup(fromError) {
        if ("undefined" === typeof this._xhr || null === this._xhr) {
            return;
        }
        this._xhr.onreadystatechange = empty;
        if (fromError) {
            try {
                this._xhr.abort();
            } catch (e) {}
        }
        if (typeof document !== "undefined") {
            delete Request.requests[this._index];
        }
        this._xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */ _onLoad() {
        const data = this._xhr.responseText;
        if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");
            this._cleanup();
        }
    }
    /**
     * Aborts the request.
     *
     * @package
     */ abort() {
        this._cleanup();
    }
}
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */ if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
        // @ts-ignore
        attachEvent("onunload", unloadHandler);
    } else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalThisShim"] ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for(let i in Request.requests){
        if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
        }
    }
}
const hasXHR2 = function() {
    const xhr = newRequest({
        xdomain: false
    });
    return xhr && xhr.responseType !== null;
}();
class XHR extends BaseXHR {
    constructor(opts){
        super(opts);
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
    }
    request(opts = {}) {
        Object.assign(opts, {
            xd: this.xd
        }, this.opts);
        return new Request(newRequest, this.uri(), opts);
    }
}
function newRequest(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$has$2d$cors$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hasCORS"])) {
            return new XMLHttpRequest();
        }
    } catch (e) {}
    if (!xdomain) {
        try {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalThisShim"][[
                "Active"
            ].concat("Object").join("X")]("Microsoft.XMLHTTP");
        } catch (e) {}
    }
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/websocket.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseWS",
    ()=>BaseWS,
    "WS",
    ()=>WS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transport$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transport.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/util.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$encodePacket$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/encodePacket.browser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/globals.js [client] (ecmascript)");
;
;
;
;
// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
class BaseWS extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transport$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Transport"] {
    get name() {
        return "websocket";
    }
    doOpen() {
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative ? {} : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pick"])(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
        }
        try {
            this.ws = this.createSocket(uri, protocols, opts);
        } catch (err) {
            return this.emitReserved("error", err);
        }
        this.ws.binaryType = this.socket.binaryType;
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */ addEventListeners() {
        this.ws.onopen = ()=>{
            if (this.opts.autoUnref) {
                this.ws._socket.unref();
            }
            this.onOpen();
        };
        this.ws.onclose = (closeEvent)=>this.onClose({
                description: "websocket connection closed",
                context: closeEvent
            });
        this.ws.onmessage = (ev)=>this.onData(ev.data);
        this.ws.onerror = (e)=>this.onError("websocket error", e);
    }
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for(let i = 0; i < packets.length; i++){
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$encodePacket$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["encodePacket"])(packet, this.supportsBinary, (data)=>{
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    this.doWrite(packet, data);
                } catch (e) {}
                if (lastPacket) {
                    // fake drain
                    // defer to next tick to allow Socket to clear writeBuffer
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["nextTick"])(()=>{
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.onerror = ()=>{};
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */ uri() {
        const schema = this.opts.secure ? "wss" : "ws";
        const query = this.query || {};
        // append timestamp to URI
        if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__["randomString"])();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
            query.b64 = 1;
        }
        return this.createUri(schema, query);
    }
}
const WebSocketCtor = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalThisShim"].WebSocket || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalThisShim"].MozWebSocket;
class WS extends BaseWS {
    createSocket(uri, protocols, opts) {
        return !isReactNative ? protocols ? new WebSocketCtor(uri, protocols) : new WebSocketCtor(uri) : new WebSocketCtor(uri, protocols, opts);
    }
    doWrite(_packet, data) {
        this.ws.send(data);
    }
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/webtransport.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WT",
    ()=>WT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transport$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transport.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/globals.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/index.js [client] (ecmascript) <locals>");
;
;
;
class WT extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transport$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Transport"] {
    get name() {
        return "webtransport";
    }
    doOpen() {
        try {
            // @ts-ignore
            this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
        } catch (err) {
            return this.emitReserved("error", err);
        }
        this._transport.closed.then(()=>{
            this.onClose();
        }).catch((err)=>{
            this.onError("webtransport error", err);
        });
        // note: we could have used async/await, but that would require some additional polyfills
        this._transport.ready.then(()=>{
            this._transport.createBidirectionalStream().then((stream)=>{
                const decoderStream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createPacketDecoderStream"])(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
                const reader = stream.readable.pipeThrough(decoderStream).getReader();
                const encoderStream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createPacketEncoderStream"])();
                encoderStream.readable.pipeTo(stream.writable);
                this._writer = encoderStream.writable.getWriter();
                const read = ()=>{
                    reader.read().then(({ done, value })=>{
                        if (done) {
                            return;
                        }
                        this.onPacket(value);
                        read();
                    }).catch((err)=>{});
                };
                read();
                const packet = {
                    type: "open"
                };
                if (this.query.sid) {
                    packet.data = `{"sid":"${this.query.sid}"}`;
                }
                this._writer.write(packet).then(()=>this.onOpen());
            });
        });
    }
    write(packets) {
        this.writable = false;
        for(let i = 0; i < packets.length; i++){
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            this._writer.write(packet).then(()=>{
                if (lastPacket) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["nextTick"])(()=>{
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    doClose() {
        var _a;
        (_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
    }
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transports",
    ()=>transports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$polling$2d$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/polling-xhr.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$websocket$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/websocket.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$webtransport$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/webtransport.js [client] (ecmascript)");
;
;
;
const transports = {
    websocket: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$websocket$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WS"],
    webtransport: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$webtransport$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WT"],
    polling: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$polling$2d$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__["XHR"]
};
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/contrib/parseuri.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parse",
    ()=>parse
]);
// imported from https://github.com/galkn/parseuri
/**
 * Parses a URI
 *
 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
 *
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
 * - https://caniuse.com/url
 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
 *
 * History of the parse() method:
 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */ const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
    'source',
    'protocol',
    'authority',
    'userInfo',
    'user',
    'password',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'anchor'
];
function parse(str) {
    if (str.length > 8000) {
        throw "URI too long";
    }
    const src = str, b = str.indexOf('['), e = str.indexOf(']');
    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }
    let m = re.exec(str || ''), uri = {}, i = 14;
    while(i--){
        uri[parts[i]] = m[i] || '';
    }
    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);
    return uri;
}
function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.slice(-1) == '/') {
        names.splice(names.length - 1, 1);
    }
    return names;
}
function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });
    return data;
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/socket.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Socket",
    ()=>Socket,
    "SocketWithUpgrade",
    ()=>SocketWithUpgrade,
    "SocketWithoutUpgrade",
    ()=>SocketWithoutUpgrade
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/util.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$parseqs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/contrib/parseqs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$parseuri$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/contrib/parseuri.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@socket.io/component-emitter/lib/esm/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-parser/build/esm/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/globals.js [client] (ecmascript)");
;
;
;
;
;
;
;
const withEventListeners = typeof addEventListener === "function" && typeof removeEventListener === "function";
const OFFLINE_EVENT_LISTENERS = [];
if (withEventListeners) {
    // within a ServiceWorker, any event handler for the 'offline' event must be added on the initial evaluation of the
    // script, so we create one single event listener here which will forward the event to the socket instances
    addEventListener("offline", ()=>{
        OFFLINE_EVENT_LISTENERS.forEach((listener)=>listener());
    }, false);
}
class SocketWithoutUpgrade extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Emitter"] {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */ constructor(uri, opts){
        super();
        this.binaryType = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defaultBinaryType"];
        this.writeBuffer = [];
        this._prevBufferLen = 0;
        this._pingInterval = -1;
        this._pingTimeout = -1;
        this._maxPayload = -1;
        /**
         * The expiration timestamp of the {@link _pingTimeoutTimer} object is tracked, in case the timer is throttled and the
         * callback is not fired on time. This can happen for example when a laptop is suspended or when a phone is locked.
         */ this._pingTimeoutTime = Infinity;
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            const parsedUri = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$parseuri$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parse"])(uri);
            opts.hostname = parsedUri.host;
            opts.secure = parsedUri.protocol === "https" || parsedUri.protocol === "wss";
            opts.port = parsedUri.port;
            if (parsedUri.query) opts.query = parsedUri.query;
        } else if (opts.host) {
            opts.hostname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$parseuri$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parse"])(opts.host).host;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__["installTimerFunctions"])(this, opts);
        this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) {
            // if no port is specified manually, use the protocol default
            opts.port = this.secure ? "443" : "80";
        }
        this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
        this.transports = [];
        this._transportsByName = {};
        opts.transports.forEach((t)=>{
            const transportName = t.prototype.name;
            this.transports.push(transportName);
            this._transportsByName[transportName] = t;
        });
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            addTrailingSlash: true,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: false
        }, opts);
        this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
        if (typeof this.opts.query === "string") {
            this.opts.query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$parseqs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["decode"])(this.opts.query);
        }
        if (withEventListeners) {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                this._beforeunloadEventListener = ()=>{
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                };
                addEventListener("beforeunload", this._beforeunloadEventListener, false);
            }
            if (this.hostname !== "localhost") {
                this._offlineEventListener = ()=>{
                    this._onClose("transport close", {
                        description: "network connection lost"
                    });
                };
                OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
            }
        }
        if (this.opts.withCredentials) {
            this._cookieJar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createCookieJar"])();
        }
        this._open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */ createTransport(name) {
        const query = Object.assign({}, this.opts.query);
        // append engine.io protocol identifier
        query.EIO = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["protocol"];
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id) query.sid = this.id;
        const opts = Object.assign({}, this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        }, this.opts.transportOptions[name]);
        return new this._transportsByName[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */ _open() {
        if (this.transports.length === 0) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(()=>{
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        }
        const transportName = this.opts.rememberUpgrade && SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
        this.readyState = "opening";
        const transport = this.createTransport(transportName);
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */ setTransport(transport) {
        if (this.transport) {
            this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (reason)=>this._onClose("transport close", reason));
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */ onOpen() {
        this.readyState = "open";
        SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
    }
    /**
     * Handles a packet.
     *
     * @private
     */ _onPacket(packet) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            switch(packet.type){
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this._sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    this._resetPingTimeout();
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this._onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        } else {}
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */ onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this._pingInterval = data.pingInterval;
        this._pingTimeout = data.pingTimeout;
        this._maxPayload = data.maxPayload;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState) return;
        this._resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */ _resetPingTimeout() {
        this.clearTimeoutFn(this._pingTimeoutTimer);
        const delay = this._pingInterval + this._pingTimeout;
        this._pingTimeoutTime = Date.now() + delay;
        this._pingTimeoutTimer = this.setTimeoutFn(()=>{
            this._onClose("ping timeout");
        }, delay);
        if (this.opts.autoUnref) {
            this._pingTimeoutTimer.unref();
        }
    }
    /**
     * Called on `drain` event
     *
     * @private
     */ _onDrain() {
        this.writeBuffer.splice(0, this._prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this._prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
        } else {
            this.flush();
        }
    }
    /**
     * Flush write buffers.
     *
     * @private
     */ flush() {
        if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
            const packets = this._getWritablePackets();
            this.transport.send(packets);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this._prevBufferLen = packets.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */ _getWritablePackets() {
        const shouldCheckPayloadSize = this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
        if (!shouldCheckPayloadSize) {
            return this.writeBuffer;
        }
        let payloadSize = 1; // first packet type
        for(let i = 0; i < this.writeBuffer.length; i++){
            const data = this.writeBuffer[i].data;
            if (data) {
                payloadSize += (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__["byteLength"])(data);
            }
            if (i > 0 && payloadSize > this._maxPayload) {
                return this.writeBuffer.slice(0, i);
            }
            payloadSize += 2; // separator + packet type
        }
        return this.writeBuffer;
    }
    /**
     * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
     *
     * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
     * `write()` method then the message would not be buffered by the Socket.IO client.
     *
     * @return {boolean}
     * @private
     */ /* private */ _hasPingExpired() {
        if (!this._pingTimeoutTime) return true;
        const hasExpired = Date.now() > this._pingTimeoutTime;
        if (hasExpired) {
            this._pingTimeoutTime = 0;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["nextTick"])(()=>{
                this._onClose("ping timeout");
            }, this.setTimeoutFn);
        }
        return hasExpired;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */ write(msg, options, fn) {
        this._sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a message. Alias of {@link Socket#write}.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */ send(msg, options, fn) {
        this._sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type: packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */ _sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn) this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     */ close() {
        const close = ()=>{
            this._onClose("forced close");
            this.transport.close();
        };
        const cleanupAndClose = ()=>{
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = ()=>{
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
                this.once("drain", ()=>{
                    if (this.upgrading) {
                        waitForUpgrade();
                    } else {
                        close();
                    }
                });
            } else if (this.upgrading) {
                waitForUpgrade();
            } else {
                close();
            }
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */ _onError(err) {
        SocketWithoutUpgrade.priorWebsocketSuccess = false;
        if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") {
            this.transports.shift();
            return this._open();
        }
        this.emitReserved("error", err);
        this._onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */ _onClose(reason, description) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            // clear timers
            this.clearTimeoutFn(this._pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (withEventListeners) {
                if (this._beforeunloadEventListener) {
                    removeEventListener("beforeunload", this._beforeunloadEventListener, false);
                }
                if (this._offlineEventListener) {
                    const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
                    if (i !== -1) {
                        OFFLINE_EVENT_LISTENERS.splice(i, 1);
                    }
                }
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, description);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this._prevBufferLen = 0;
        }
    }
}
SocketWithoutUpgrade.protocol = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["protocol"];
class SocketWithUpgrade extends SocketWithoutUpgrade {
    constructor(){
        super(...arguments);
        this._upgrades = [];
    }
    onOpen() {
        super.onOpen();
        if ("open" === this.readyState && this.opts.upgrade) {
            for(let i = 0; i < this._upgrades.length; i++){
                this._probe(this._upgrades[i]);
            }
        }
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */ _probe(name) {
        let transport = this.createTransport(name);
        let failed = false;
        SocketWithoutUpgrade.priorWebsocketSuccess = false;
        const onTransportOpen = ()=>{
            if (failed) return;
            transport.send([
                {
                    type: "ping",
                    data: "probe"
                }
            ]);
            transport.once("packet", (msg)=>{
                if (failed) return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport) return;
                    SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === transport.name;
                    this.transport.pause(()=>{
                        if (failed) return;
                        if ("closed" === this.readyState) return;
                        cleanup();
                        this.setTransport(transport);
                        transport.send([
                            {
                                type: "upgrade"
                            }
                        ]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                } else {
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed) return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = (err)=>{
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) {
                freezeTransport();
            }
        }
        // Remove all listeners on the transport and on self
        const cleanup = ()=>{
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        if (this._upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
            // favor WebTransport
            this.setTimeoutFn(()=>{
                if (!failed) {
                    transport.open();
                }
            }, 200);
        } else {
            transport.open();
        }
    }
    onHandshake(data) {
        this._upgrades = this._filterUpgrades(data.upgrades);
        super.onHandshake(data);
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */ _filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        for(let i = 0; i < upgrades.length; i++){
            if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
    }
}
class Socket extends SocketWithUpgrade {
    constructor(uri, opts = {}){
        const o = typeof uri === "object" ? uri : opts;
        if (!o.transports || o.transports && typeof o.transports[0] === "string") {
            o.transports = (o.transports || [
                "polling",
                "websocket",
                "webtransport"
            ]).map((transportName)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["transports"][transportName]).filter((t)=>!!t);
        }
        super(uri, o);
    }
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/polling-fetch.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Fetch",
    ()=>Fetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$polling$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/polling.js [client] (ecmascript)");
;
class Fetch extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$polling$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Polling"] {
    doPoll() {
        this._fetch().then((res)=>{
            if (!res.ok) {
                return this.onError("fetch read error", res.status, res);
            }
            res.text().then((data)=>this.onData(data));
        }).catch((err)=>{
            this.onError("fetch read error", err);
        });
    }
    doWrite(data, callback) {
        this._fetch(data).then((res)=>{
            if (!res.ok) {
                return this.onError("fetch write error", res.status, res);
            }
            callback();
        }).catch((err)=>{
            this.onError("fetch write error", err);
        });
    }
    _fetch(data) {
        var _a;
        const isPost = data !== undefined;
        const headers = new Headers(this.opts.extraHeaders);
        if (isPost) {
            headers.set("content-type", "text/plain;charset=UTF-8");
        }
        (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.appendCookies(headers);
        return fetch(this.uri(), {
            method: isPost ? "POST" : "GET",
            body: isPost ? data : null,
            headers,
            credentials: this.opts.withCredentials ? "include" : "omit"
        }).then((res)=>{
            var _a;
            // @ts-ignore getSetCookie() was added in Node.js v19.7.0
            (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(res.headers.getSetCookie());
            return res;
        });
    }
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/index.js [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "protocol",
    ()=>protocol
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$socket$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/socket.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transport$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transport.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/util.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/globals.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$polling$2d$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/polling-fetch.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$polling$2d$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/polling-xhr.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$websocket$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/websocket.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$transports$2f$webtransport$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/transports/webtransport.js [client] (ecmascript)");
;
;
;
const protocol = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$socket$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Socket"].protocol;
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
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/url.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "url",
    ()=>url
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$parseuri$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/contrib/parseuri.js [client] (ecmascript)");
;
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || typeof location !== "undefined" && location;
    if (null == uri) uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            } else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            } else {
                uri = "https://" + uri;
            }
        }
        // parse
        obj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$parseuri$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parse"])(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        } else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/on.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "on",
    ()=>on
]);
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/socket.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Socket",
    ()=>Socket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-parser/build/esm-debug/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/on.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@socket.io/component-emitter/lib/esm/index.js [client] (ecmascript)");
;
;
;
/**
 * Internal events.
 * These events can't be emitted by the user.
 */ const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1
});
class Socket extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Emitter"] {
    /**
     * `Socket` constructor.
     */ constructor(io, nsp, opts){
        super();
        /**
         * Whether the socket is currently connected to the server.
         *
         * @example
         * const socket = io();
         *
         * socket.on("connect", () => {
         *   console.log(socket.connected); // true
         * });
         *
         * socket.on("disconnect", () => {
         *   console.log(socket.connected); // false
         * });
         */ this.connected = false;
        /**
         * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
         * be transmitted by the server.
         */ this.recovered = false;
        /**
         * Buffer for packets received before the CONNECT packet
         */ this.receiveBuffer = [];
        /**
         * Buffer for packets that will be sent once the socket is connected
         */ this.sendBuffer = [];
        /**
         * The queue of packets to be sent with retry in case of failure.
         *
         * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
         * @private
         */ this._queue = [];
        /**
         * A sequence to generate the ID of the {@link QueuedPacket}.
         * @private
         */ this._queueSeq = 0;
        this.ids = 0;
        /**
         * A map containing acknowledgement handlers.
         *
         * The `withError` attribute is used to differentiate handlers that accept an error as first argument:
         *
         * - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
         * - `socket.timeout(5000).emit("test", (err, value) => { ... })`
         * - `const value = await socket.emitWithAck("test")`
         *
         * From those that don't:
         *
         * - `socket.emit("test", (value) => { ... });`
         *
         * In the first case, the handlers will be called with an error when:
         *
         * - the timeout is reached
         * - the socket gets disconnected
         *
         * In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
         * an acknowledgement from the server.
         *
         * @private
         */ this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        this._opts = Object.assign({}, opts);
        if (this.io._autoConnect) this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */ get disconnected() {
        return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */ subEvents() {
        if (this.subs) return;
        const io = this.io;
        this.subs = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__["on"])(io, "open", this.onopen.bind(this)),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__["on"])(io, "packet", this.onpacket.bind(this)),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__["on"])(io, "error", this.onerror.bind(this)),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__["on"])(io, "close", this.onclose.bind(this))
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */ get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */ connect() {
        if (this.connected) return this;
        this.subEvents();
        if (!this.io["_reconnecting"]) this.io.open(); // ensure open
        if ("open" === this.io._readyState) this.onopen();
        return this;
    }
    /**
     * Alias for {@link connect()}.
     */ open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */ send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */ emit(ev, ...args) {
        var _a, _b, _c;
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev.toString() + '" is a reserved event name');
        }
        args.unshift(ev);
        if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
            this._addToQueue(args);
            return this;
        }
        const packet = {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PacketType"].EVENT,
            data: args
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
        const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
        const discardPacket = this.flags.volatile && !isTransportWritable;
        if (discardPacket) {} else if (isConnected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        } else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */ _registerAckCallback(id, ack) {
        var _a;
        const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(()=>{
            delete this.acks[id];
            for(let i = 0; i < this.sendBuffer.length; i++){
                if (this.sendBuffer[i].id === id) {
                    this.sendBuffer.splice(i, 1);
                }
            }
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        const fn = (...args)=>{
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, args);
        };
        fn.withError = true;
        this.acks[id] = fn;
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */ emitWithAck(ev, ...args) {
        return new Promise((resolve, reject)=>{
            const fn = (arg1, arg2)=>{
                return arg1 ? reject(arg1) : resolve(arg2);
            };
            fn.withError = true;
            args.push(fn);
            this.emit(ev, ...args);
        });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */ _addToQueue(args) {
        let ack;
        if (typeof args[args.length - 1] === "function") {
            ack = args.pop();
        }
        const packet = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: false,
            args,
            flags: Object.assign({
                fromQueue: true
            }, this.flags)
        };
        args.push((err, ...responseArgs)=>{
            if (packet !== this._queue[0]) {}
            const hasError = err !== null;
            if (hasError) {
                if (packet.tryCount > this._opts.retries) {
                    this._queue.shift();
                    if (ack) {
                        ack(err);
                    }
                }
            } else {
                this._queue.shift();
                if (ack) {
                    ack(null, ...responseArgs);
                }
            }
            packet.pending = false;
            return this._drainQueue();
        });
        this._queue.push(packet);
        this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */ _drainQueue(force = false) {
        if (!this.connected || this._queue.length === 0) {
            return;
        }
        const packet = this._queue[0];
        if (packet.pending && !force) {
            return;
        }
        packet.pending = true;
        packet.tryCount++;
        this.flags = packet.flags;
        this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */ packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */ onopen() {
        if (typeof this.auth == "function") {
            this.auth((data)=>{
                this._sendConnectPacket(data);
            });
        } else {
            this._sendConnectPacket(this.auth);
        }
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */ _sendConnectPacket(data) {
        this.packet({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PacketType"].CONNECT,
            data: this._pid ? Object.assign({
                pid: this._pid,
                offset: this._lastOffset
            }, data) : data
        });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */ onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */ onclose(reason, description) {
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
        this._clearAcks();
    }
    /**
     * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
     * the server.
     *
     * @private
     */ _clearAcks() {
        Object.keys(this.acks).forEach((id)=>{
            const isBuffered = this.sendBuffer.some((packet)=>String(packet.id) === id);
            if (!isBuffered) {
                // note: handlers that do not accept an error as first argument are ignored here
                const ack = this.acks[id];
                delete this.acks[id];
                if (ack.withError) {
                    ack.call(this, new Error("socket has been disconnected"));
                }
            }
        });
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */ onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace) return;
        switch(packet.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PacketType"].CONNECT:
                if (packet.data && packet.data.sid) {
                    this.onconnect(packet.data.sid, packet.data.pid);
                } else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PacketType"].EVENT:
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PacketType"].BINARY_EVENT:
                this.onevent(packet);
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PacketType"].ACK:
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PacketType"].BINARY_ACK:
                this.onack(packet);
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PacketType"].DISCONNECT:
                this.ondisconnect();
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PacketType"].CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */ onevent(packet) {
        const args = packet.data || [];
        if (null != packet.id) {
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        } else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners){
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
        if (this._pid && args.length && typeof args[args.length - 1] === "string") {
            this._lastOffset = args[args.length - 1];
        }
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */ ack(id) {
        const self = this;
        let sent = false;
        return function(...args) {
            // prevent double callbacks
            if (sent) return;
            sent = true;
            self.packet({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PacketType"].ACK,
                id: id,
                data: args
            });
        };
    }
    /**
     * Called upon a server acknowledgement.
     *
     * @param packet
     * @private
     */ onack(packet) {
        const ack = this.acks[packet.id];
        if (typeof ack !== "function") {
            return;
        }
        delete this.acks[packet.id];
        // @ts-ignore FIXME ack is incorrectly inferred as 'never'
        if (ack.withError) {
            packet.data.unshift(null);
        }
        // @ts-ignore
        ack.apply(this, packet.data);
    }
    /**
     * Called upon server connect.
     *
     * @private
     */ onconnect(id, pid) {
        this.id = id;
        this.recovered = pid && this._pid === pid;
        this._pid = pid; // defined only if connection state recovery is enabled
        this.connected = true;
        this.emitBuffered();
        this._drainQueue(true);
        this.emitReserved("connect");
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */ emitBuffered() {
        this.receiveBuffer.forEach((args)=>this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet)=>{
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        });
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */ ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */ destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy)=>subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */ disconnect() {
        if (this.connected) {
            this.packet({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PacketType"].DISCONNECT
            });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */ close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */ compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */ get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */ timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */ onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */ prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */ offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for(let i = 0; i < listeners.length; i++){
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        } else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */ listenersAny() {
        return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */ onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */ prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */ offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyOutgoingListeners;
            for(let i = 0; i < listeners.length; i++){
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        } else {
            this._anyOutgoingListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */ listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */ notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners){
                listener.apply(this, packet.data);
            }
        }
    }
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/contrib/backo2.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */ __turbopack_context__.s([
    "Backoff",
    ()=>Backoff
]);
function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */ Backoff.prototype.duration = function() {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */ Backoff.prototype.reset = function() {
    this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */ Backoff.prototype.setMin = function(min) {
    this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */ Backoff.prototype.setMax = function(max) {
    this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */ Backoff.prototype.setJitter = function(jitter) {
    this.jitter = jitter;
};
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/manager.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Manager",
    ()=>Manager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$socket$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/socket.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/util.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/globals.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$socket$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/socket.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-parser/build/esm-debug/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/on.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$backo2$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/contrib/backo2.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@socket.io/component-emitter/lib/esm/index.js [client] (ecmascript)");
;
;
;
;
;
;
class Manager extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Emitter"] {
    constructor(uri, opts){
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$util$2e$js__$5b$client$5d$__$28$ecmascript$29$__["installTimerFunctions"])(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$contrib$2f$backo2$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Backoff"]({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect) this.open();
    }
    reconnection(v) {
        if (!arguments.length) return this._reconnection;
        this._reconnection = !!v;
        if (!v) {
            this.skipReconnect = true;
        }
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined) return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined) return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined) return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined) return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length) return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */ maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */ open(fn) {
        if (~this._readyState.indexOf("open")) return this;
        this.engine = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$socket$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Socket"](this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__["on"])(socket, "open", function() {
            self.onopen();
            fn && fn();
        });
        const onError = (err)=>{
            this.cleanup();
            this._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            } else {
                // Only do this if there is no fn to handle the error
                this.maybeReconnectOnOpen();
            }
        };
        // emit `error`
        const errorSub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__["on"])(socket, "error", onError);
        if (false !== this._timeout) {
            const timeout = this._timeout;
            // set timer
            const timer = this.setTimeoutFn(()=>{
                openSubDestroy();
                onError(new Error("timeout"));
                socket.close();
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(()=>{
                this.clearTimeoutFn(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */ connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */ onopen() {
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__["on"])(socket, "ping", this.onping.bind(this)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__["on"])(socket, "data", this.ondata.bind(this)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__["on"])(socket, "error", this.onerror.bind(this)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__["on"])(socket, "close", this.onclose.bind(this)), // @ts-ignore
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$on$2e$js__$5b$client$5d$__$28$ecmascript$29$__["on"])(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */ onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */ ondata(data) {
        try {
            this.decoder.add(data);
        } catch (e) {
            this.onclose("parse error", e);
        }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */ ondecoded(packet) {
        // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$globals$2e$js__$5b$client$5d$__$28$ecmascript$29$__["nextTick"])(()=>{
            this.emitReserved("packet", packet);
        }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */ onerror(err) {
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */ socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$socket$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Socket"](this, nsp, opts);
            this.nsps[nsp] = socket;
        } else if (this._autoConnect && !socket.active) {
            socket.connect();
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */ _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps){
            const socket = this.nsps[nsp];
            if (socket.active) {
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */ _packet(packet) {
        const encodedPackets = this.encoder.encode(packet);
        for(let i = 0; i < encodedPackets.length; i++){
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */ cleanup() {
        this.subs.forEach((subDestroy)=>subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */ _close() {
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
    }
    /**
     * Alias for close()
     *
     * @private
     */ disconnect() {
        return this._close();
    }
    /**
     * Called when:
     *
     * - the low-level engine is closed
     * - the parser encountered a badly formatted packet
     * - all sockets are disconnected
     *
     * @private
     */ onclose(reason, description) {
        var _a;
        this.cleanup();
        (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */ reconnect() {
        if (this._reconnecting || this.skipReconnect) return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        } else {
            const delay = this.backoff.duration();
            this._reconnecting = true;
            const timer = this.setTimeoutFn(()=>{
                if (self.skipReconnect) return;
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect) return;
                self.open((err)=>{
                    if (err) {
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    } else {
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(()=>{
                this.clearTimeoutFn(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */ onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/index.js [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connect",
    ()=>lookup,
    "default",
    ()=>lookup,
    "io",
    ()=>lookup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/url.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$manager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/manager.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$socket$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-client/build/esm/socket.js [client] (ecmascript)");
/**
 * Protocol version.
 *
 * @public
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-parser/build/esm-debug/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/engine.io-client/build/esm/index.js [client] (ecmascript) <locals>");
;
;
;
/**
 * Managers cache.
 */ const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["url"])(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    let io;
    if (newConnection) {
        io = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$manager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Manager"](source, opts);
    } else {
        if (!cache[id]) {
            cache[id] = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$manager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Manager"](source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$manager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Manager"],
    Socket: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$socket$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Socket"],
    io: lookup,
    connect: lookup
});
;
;
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-parser/build/esm-debug/is-binary.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasBinary",
    ()=>hasBinary,
    "isBinary",
    ()=>isBinary
]);
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj)=>{
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
function isBinary(obj) {
    return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for(let i = 0, l = obj.length; i < l; i++){
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for(const key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-parser/build/esm-debug/binary.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deconstructPacket",
    ()=>deconstructPacket,
    "reconstructPacket",
    ()=>reconstructPacket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$is$2d$binary$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-parser/build/esm-debug/is-binary.js [client] (ecmascript)");
;
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return {
        packet: pack,
        buffers: buffers
    };
}
function _deconstructPacket(data, buffers) {
    if (!data) return data;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$is$2d$binary$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isBinary"])(data)) {
        const placeholder = {
            _placeholder: true,
            num: buffers.length
        };
        buffers.push(data);
        return placeholder;
    } else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for(let i = 0; i < data.length; i++){
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for(const key in data){
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments; // no longer useful
    return packet;
}
function _reconstructPacket(data, buffers) {
    if (!data) return data;
    if (data && data._placeholder === true) {
        const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
        if (isIndexValid) {
            return buffers[data.num]; // appropriate buffer (should be natural order anyway)
        } else {
            throw new Error("illegal attachments");
        }
    } else if (Array.isArray(data)) {
        for(let i = 0; i < data.length; i++){
            data[i] = _reconstructPacket(data[i], buffers);
        }
    } else if (typeof data === "object") {
        for(const key in data){
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-parser/build/esm-debug/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Decoder",
    ()=>Decoder,
    "Encoder",
    ()=>Encoder,
    "PacketType",
    ()=>PacketType,
    "isPacketValid",
    ()=>isPacketValid,
    "protocol",
    ()=>protocol
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@socket.io/component-emitter/lib/esm/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$binary$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-parser/build/esm-debug/binary.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$is$2d$binary$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/socket.io-parser/build/esm-debug/is-binary.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$debug$2f$src$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/debug/src/browser.js [client] (ecmascript)"); // debug()
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$debug$2f$src$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("socket.io-parser"); // debug()
/**
 * These strings must not be used as event names, as they have a special meaning.
 */ const RESERVED_EVENTS = [
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener"
];
const protocol = 5;
var PacketType;
(function(PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
class Encoder {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */ constructor(replacer){
        this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */ encode(obj) {
        debug("encoding packet %j", obj);
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$is$2d$binary$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hasBinary"])(obj)) {
                return this.encodeAsBinary({
                    type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
                    nsp: obj.nsp,
                    data: obj.data,
                    id: obj.id
                });
            }
        }
        return [
            this.encodeAsString(obj)
        ];
    }
    /**
     * Encode packet as string.
     */ encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data, this.replacer);
        }
        debug("encoded %j as %s", obj, str);
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */ encodeAsBinary(obj) {
        const deconstruction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$binary$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deconstructPacket"])(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
class Decoder extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Emitter"] {
    /**
     * Decoder constructor
     */ constructor(opts){
        super();
        this.opts = Object.assign({
            reviver: undefined,
            maxAttachments: 10
        }, typeof opts === "function" ? {
            reviver: opts
        } : opts);
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */ add(obj) {
        let packet;
        if (typeof obj === "string") {
            if (this.reconstructor) {
                throw new Error("got plaintext data when reconstructing a packet");
            }
            packet = this.decodeString(obj);
            const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
            if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
                packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emitReserved("decoded", packet);
                }
            } else {
                // non-binary full packet
                super.emitReserved("decoded", packet);
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$is$2d$binary$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isBinary"])(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            } else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        } else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */ decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0))
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while(str.charAt(++i) !== "-" && i != str.length){}
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            const n = Number(buf);
            if (!isInteger(n) || n < 0) {
                throw new Error("Illegal attachments");
            } else if (n > this.opts.maxAttachments) {
                throw new Error("too many attachments");
            }
            p.attachments = n;
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while(++i){
                const c = str.charAt(i);
                if ("," === c) break;
                if (i === str.length) break;
            }
            p.nsp = str.substring(start, i);
        } else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while(++i){
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length) break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = this.tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            } else {
                throw new Error("invalid payload");
            }
        }
        debug("decoded %s as %j", str, p);
        return p;
    }
    tryParse(str) {
        try {
            return JSON.parse(str, this.opts.reviver);
        } catch (e) {
            return false;
        }
    }
    static isPayloadValid(type, payload) {
        switch(type){
            case PacketType.CONNECT:
                return isObject(payload);
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || isObject(payload);
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */ destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
            this.reconstructor = null;
        }
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */ class BinaryReconstructor {
    constructor(packet){
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */ takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$binary$2e$js__$5b$client$5d$__$28$ecmascript$29$__["reconstructPacket"])(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */ finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}
function isNamespaceValid(nsp) {
    return typeof nsp === "string";
}
// see https://caniuse.com/mdn-javascript_builtins_number_isinteger
const isInteger = Number.isInteger || function(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};
function isAckIdValid(id) {
    return id === undefined || isInteger(id);
}
// see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}
function isDataValid(type, payload) {
    switch(type){
        case PacketType.CONNECT:
            return payload === undefined || isObject(payload);
        case PacketType.DISCONNECT:
            return payload === undefined;
        case PacketType.EVENT:
            return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
        case PacketType.ACK:
            return Array.isArray(payload);
        case PacketType.CONNECT_ERROR:
            return typeof payload === "string" || isObject(payload);
        default:
            return false;
    }
}
function isPacketValid(packet) {
    return isNamespaceValid(packet.nsp) && isAckIdValid(packet.id) && isDataValid(packet.type, packet.data);
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/ms/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Helpers.
 */ var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
        return parse(val);
    } else if (type === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function parse(str) {
    str = String(str);
    if (str.length > 100) {
        return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
        return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch(type){
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return n * y;
        case 'weeks':
        case 'week':
        case 'w':
            return n * w;
        case 'days':
        case 'day':
        case 'd':
            return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return n * m;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return n * s;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
        return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
        return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
        return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
}
/**
 * Pluralization helper.
 */ function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/debug/src/common.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = __turbopack_context__.r("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/ms/index.js [client] (ecmascript)");
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key)=>{
        createDebug[key] = env[key];
    });
    /**
	* The currently active debug mode names, and names to skip.
	*/ createDebug.names = [];
    createDebug.skips = [];
    /**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/ createDebug.formatters = {};
    /**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/ function selectColor(namespace) {
        let hash = 0;
        for(let i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/ function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
            // Disabled?
            if (!debug.enabled) {
                return;
            }
            const self = debug;
            // Set `diff` timestamp
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== 'string') {
                // Anything else let's inspect with %O
                args.unshift('%O');
            }
            // Apply any `formatters` transformations
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format)=>{
                // If we encounter an escaped % then don't increase the array index
                if (match === '%%') {
                    return '%';
                }
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === 'function') {
                    const val = args[index];
                    match = formatter.call(self, val);
                    // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.
        Object.defineProperty(debug, 'enabled', {
            enumerable: true,
            configurable: false,
            get: ()=>{
                if (enableOverride !== null) {
                    return enableOverride;
                }
                if (namespacesCache !== createDebug.namespaces) {
                    namespacesCache = createDebug.namespaces;
                    enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
            },
            set: (v)=>{
                enableOverride = v;
            }
        });
        // Env-specific initialization logic for debug instances
        if (typeof createDebug.init === 'function') {
            createDebug.init(debug);
        }
        return debug;
    }
    function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
    }
    /**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === 'string' ? namespaces : '').trim().replace(/\s+/g, ',').split(',').filter(Boolean);
        for (const ns of split){
            if (ns[0] === '-') {
                createDebug.skips.push(ns.slice(1));
            } else {
                createDebug.names.push(ns);
            }
        }
    }
    /**
	 * Checks if the given string matches a namespace template, honoring
	 * asterisks as wildcards.
	 *
	 * @param {String} search
	 * @param {String} template
	 * @return {Boolean}
	 */ function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while(searchIndex < search.length){
            if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
                // Match character or proceed with wildcard
                if (template[templateIndex] === '*') {
                    starIndex = templateIndex;
                    matchIndex = searchIndex;
                    templateIndex++; // Skip the '*'
                } else {
                    searchIndex++;
                    templateIndex++;
                }
            } else if (starIndex !== -1) {
                // Backtrack to the last '*' and try to match more characters
                templateIndex = starIndex + 1;
                matchIndex++;
                searchIndex = matchIndex;
            } else {
                return false; // No match
            }
        }
        // Handle trailing '*' in template
        while(templateIndex < template.length && template[templateIndex] === '*'){
            templateIndex++;
        }
        return templateIndex === template.length;
    }
    /**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/ function disable() {
        const namespaces = [
            ...createDebug.names,
            ...createDebug.skips.map((namespace)=>'-' + namespace)
        ].join(',');
        createDebug.enable('');
        return namespaces;
    }
    /**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/ function enabled(name) {
        for (const skip of createDebug.skips){
            if (matchesTemplate(name, skip)) {
                return false;
            }
        }
        for (const ns of createDebug.names){
            if (matchesTemplate(name, ns)) {
                return true;
            }
        }
        return false;
    }
    /**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/ function coerce(val) {
        if (val instanceof Error) {
            return val.stack || val.message;
        }
        return val;
    }
    /**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/ function destroy() {
        console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = setup;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/debug/src/browser.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (()=>{
    let warned = false;
    return ()=>{
        if (!warned) {
            warned = true;
            console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
        }
    };
})();
/**
 * Colors.
 */ exports.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
        return true;
    }
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
    }
    let m;
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    // eslint-disable-next-line no-return-assign
    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
    if (!this.useColors) {
        return;
    }
    const c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match)=>{
        if (match === '%%') {
            return;
        }
        index++;
        if (match === '%c') {
            // We only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
        }
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */ exports.log = console.debug || console.log || (()=>{});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    try {
        if (namespaces) {
            exports.storage.setItem('debug', namespaces);
        } else {
            exports.storage.removeItem('debug');
        }
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    let r;
    try {
        r = exports.storage.getItem('debug') || exports.storage.getItem('DEBUG');
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && 'env' in __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]) {
        r = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.DEBUG;
    }
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
module.exports = __turbopack_context__.r("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/debug/src/common.js [client] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message;
    }
};
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/subscribable.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Subscribable",
    ()=>Subscribable
]);
// src/subscribable.ts
var Subscribable = class {
    constructor(){
        this.listeners = /* @__PURE__ */ new Set();
        this.subscribe = this.subscribe.bind(this);
    }
    subscribe(listener) {
        this.listeners.add(listener);
        this.onSubscribe();
        return ()=>{
            this.listeners.delete(listener);
            this.onUnsubscribe();
        };
    }
    hasListeners() {
        return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
};
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/focusManager.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FocusManager",
    ()=>FocusManager,
    "focusManager",
    ()=>focusManager
]);
// src/focusManager.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/subscribable.js [client] (ecmascript)");
;
var FocusManager = class extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Subscribable"] {
    #focused;
    #cleanup;
    #setup;
    constructor(){
        super();
        this.#setup = (onFocus)=>{
            if (typeof window !== "undefined" && window.addEventListener) {
                const listener = ()=>onFocus();
                window.addEventListener("visibilitychange", listener, false);
                return ()=>{
                    window.removeEventListener("visibilitychange", listener);
                };
            }
            return;
        };
    }
    onSubscribe() {
        if (!this.#cleanup) {
            this.setEventListener(this.#setup);
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.#cleanup?.();
            this.#cleanup = void 0;
        }
    }
    setEventListener(setup) {
        this.#setup = setup;
        this.#cleanup?.();
        this.#cleanup = setup((focused)=>{
            if (typeof focused === "boolean") {
                this.setFocused(focused);
            } else {
                this.onFocus();
            }
        });
    }
    setFocused(focused) {
        const changed = this.#focused !== focused;
        if (changed) {
            this.#focused = focused;
            this.onFocus();
        }
    }
    onFocus() {
        const isFocused = this.isFocused();
        this.listeners.forEach((listener)=>{
            listener(isFocused);
        });
    }
    isFocused() {
        if (typeof this.#focused === "boolean") {
            return this.#focused;
        }
        return globalThis.document?.visibilityState !== "hidden";
    }
};
var focusManager = new FocusManager();
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/timeoutManager.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimeoutManager",
    ()=>TimeoutManager,
    "defaultTimeoutProvider",
    ()=>defaultTimeoutProvider,
    "systemSetTimeoutZero",
    ()=>systemSetTimeoutZero,
    "timeoutManager",
    ()=>timeoutManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
// src/timeoutManager.ts
var defaultTimeoutProvider = {
    // We need the wrapper function syntax below instead of direct references to
    // global setTimeout etc.
    //
    // BAD: `setTimeout: setTimeout`
    // GOOD: `setTimeout: (cb, delay) => setTimeout(cb, delay)`
    //
    // If we use direct references here, then anything that wants to spy on or
    // replace the global setTimeout (like tests) won't work since we'll already
    // have a hard reference to the original implementation at the time when this
    // file was imported.
    setTimeout: (callback, delay)=>setTimeout(callback, delay),
    clearTimeout: (timeoutId)=>clearTimeout(timeoutId),
    setInterval: (callback, delay)=>setInterval(callback, delay),
    clearInterval: (intervalId)=>clearInterval(intervalId)
};
var TimeoutManager = class {
    // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
    // type at app boot; and if we leave that type, then any new timer provider
    // would need to support the default provider's concrete timer ID, which is
    // infeasible across environments.
    //
    // We settle for type safety for the TimeoutProvider type, and accept that
    // this class is unsafe internally to allow for extension.
    #provider = defaultTimeoutProvider;
    #providerCalled = false;
    setTimeoutProvider(provider) {
        if ("TURBOPACK compile-time truthy", 1) {
            if (this.#providerCalled && provider !== this.#provider) {
                console.error(`[timeoutManager]: Switching provider after calls to previous provider might result in unexpected behavior.`, {
                    previous: this.#provider,
                    provider
                });
            }
        }
        this.#provider = provider;
        if (("TURBOPACK compile-time value", "development") !== "production") {
            this.#providerCalled = false;
        }
    }
    setTimeout(callback, delay) {
        if (("TURBOPACK compile-time value", "development") !== "production") {
            this.#providerCalled = true;
        }
        return this.#provider.setTimeout(callback, delay);
    }
    clearTimeout(timeoutId) {
        this.#provider.clearTimeout(timeoutId);
    }
    setInterval(callback, delay) {
        if (("TURBOPACK compile-time value", "development") !== "production") {
            this.#providerCalled = true;
        }
        return this.#provider.setInterval(callback, delay);
    }
    clearInterval(intervalId) {
        this.#provider.clearInterval(intervalId);
    }
};
var timeoutManager = new TimeoutManager();
function systemSetTimeoutZero(callback) {
    setTimeout(callback, 0);
}
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/utils.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addConsumeAwareSignal",
    ()=>addConsumeAwareSignal,
    "addToEnd",
    ()=>addToEnd,
    "addToStart",
    ()=>addToStart,
    "ensureQueryFn",
    ()=>ensureQueryFn,
    "functionalUpdate",
    ()=>functionalUpdate,
    "hashKey",
    ()=>hashKey,
    "hashQueryKeyByOptions",
    ()=>hashQueryKeyByOptions,
    "isPlainArray",
    ()=>isPlainArray,
    "isPlainObject",
    ()=>isPlainObject,
    "isServer",
    ()=>isServer,
    "isValidTimeout",
    ()=>isValidTimeout,
    "keepPreviousData",
    ()=>keepPreviousData,
    "matchMutation",
    ()=>matchMutation,
    "matchQuery",
    ()=>matchQuery,
    "noop",
    ()=>noop,
    "partialMatchKey",
    ()=>partialMatchKey,
    "replaceData",
    ()=>replaceData,
    "replaceEqualDeep",
    ()=>replaceEqualDeep,
    "resolveQueryBoolean",
    ()=>resolveQueryBoolean,
    "resolveStaleTime",
    ()=>resolveStaleTime,
    "shallowEqualObjects",
    ()=>shallowEqualObjects,
    "shouldThrowError",
    ()=>shouldThrowError,
    "skipToken",
    ()=>skipToken,
    "sleep",
    ()=>sleep,
    "timeUntilStale",
    ()=>timeUntilStale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
// src/utils.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/timeoutManager.js [client] (ecmascript)");
;
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {}
function functionalUpdate(updater, input) {
    return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
    return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
    return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
    return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveQueryBoolean(option, query) {
    return typeof option === "function" ? option(query) : option;
}
function matchQuery(filters, query) {
    const { type = "all", exact, fetchStatus, predicate, queryKey, stale } = filters;
    if (queryKey) {
        if (exact) {
            if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
                return false;
            }
        } else if (!partialMatchKey(query.queryKey, queryKey)) {
            return false;
        }
    }
    if (type !== "all") {
        const isActive = query.isActive();
        if (type === "active" && !isActive) {
            return false;
        }
        if (type === "inactive" && isActive) {
            return false;
        }
    }
    if (typeof stale === "boolean" && query.isStale() !== stale) {
        return false;
    }
    if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
        return false;
    }
    if (predicate && !predicate(query)) {
        return false;
    }
    return true;
}
function matchMutation(filters, mutation) {
    const { exact, status, predicate, mutationKey } = filters;
    if (mutationKey) {
        if (!mutation.options.mutationKey) {
            return false;
        }
        if (exact) {
            if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
                return false;
            }
        } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
            return false;
        }
    }
    if (status && mutation.state.status !== status) {
        return false;
    }
    if (predicate && !predicate(mutation)) {
        return false;
    }
    return true;
}
function hashQueryKeyByOptions(queryKey, options) {
    const hashFn = options?.queryKeyHashFn || hashKey;
    return hashFn(queryKey);
}
function hashKey(queryKey) {
    return JSON.stringify(queryKey, (_, val)=>isPlainObject(val) ? Object.keys(val).sort().reduce((result, key)=>{
            result[key] = val[key];
            return result;
        }, {}) : val);
}
function partialMatchKey(a, b) {
    if (a === b) {
        return true;
    }
    if (typeof a !== typeof b) {
        return false;
    }
    if (a && b && typeof a === "object" && typeof b === "object") {
        return Object.keys(b).every((key)=>partialMatchKey(a[key], b[key]));
    }
    return false;
}
var hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a, b, depth = 0) {
    if (a === b) {
        return a;
    }
    if (depth > 500) return b;
    const array = isPlainArray(a) && isPlainArray(b);
    if (!array && !(isPlainObject(a) && isPlainObject(b))) return b;
    const aItems = array ? a : Object.keys(a);
    const aSize = aItems.length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? new Array(bSize) : {};
    let equalItems = 0;
    for(let i = 0; i < bSize; i++){
        const key = array ? i : bItems[i];
        const aItem = a[key];
        const bItem = b[key];
        if (aItem === bItem) {
            copy[key] = aItem;
            if (array ? i < aSize : hasOwn.call(a, key)) equalItems++;
            continue;
        }
        if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
            copy[key] = bItem;
            continue;
        }
        const v = replaceEqualDeep(aItem, bItem, depth + 1);
        copy[key] = v;
        if (v === aItem) equalItems++;
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
}
function shallowEqualObjects(a, b) {
    if (!b || Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }
    for(const key in a){
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
function isPlainArray(value) {
    return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
    if (!hasObjectPrototype(o)) {
        return false;
    }
    const ctor = o.constructor;
    if (ctor === void 0) {
        return true;
    }
    const prot = ctor.prototype;
    if (!hasObjectPrototype(prot)) {
        return false;
    }
    if (!prot.hasOwnProperty("isPrototypeOf")) {
        return false;
    }
    if (Object.getPrototypeOf(o) !== Object.prototype) {
        return false;
    }
    return true;
}
function hasObjectPrototype(o) {
    return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
    return new Promise((resolve)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timeoutManager"].setTimeout(resolve, timeout);
    });
}
function replaceData(prevData, data, options) {
    if (typeof options.structuralSharing === "function") {
        return options.structuralSharing(prevData, data);
    } else if (options.structuralSharing !== false) {
        if ("TURBOPACK compile-time truthy", 1) {
            try {
                return replaceEqualDeep(prevData, data);
            } catch (error) {
                console.error(`Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`);
                throw error;
            }
        }
        return replaceEqualDeep(prevData, data);
    }
    return data;
}
function keepPreviousData(previousData) {
    return previousData;
}
function addToEnd(items, item, max = 0) {
    const newItems = [
        ...items,
        item
    ];
    return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
    const newItems = [
        item,
        ...items
    ];
    return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = /* @__PURE__ */ Symbol();
function ensureQueryFn(options, fetchOptions) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (options.queryFn === skipToken) {
            console.error(`Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${options.queryHash}'`);
        }
    }
    if (!options.queryFn && fetchOptions?.initialPromise) {
        return ()=>fetchOptions.initialPromise;
    }
    if (!options.queryFn || options.queryFn === skipToken) {
        return ()=>Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
    }
    return options.queryFn;
}
function shouldThrowError(throwOnError, params) {
    if (typeof throwOnError === "function") {
        return throwOnError(...params);
    }
    return !!throwOnError;
}
function addConsumeAwareSignal(object, getSignal, onCancelled) {
    let consumed = false;
    let signal;
    Object.defineProperty(object, "signal", {
        enumerable: true,
        get: ()=>{
            signal ??= getSignal();
            if (consumed) {
                return signal;
            }
            consumed = true;
            if (signal.aborted) {
                onCancelled();
            } else {
                signal.addEventListener("abort", onCancelled, {
                    once: true
                });
            }
            return signal;
        }
    });
    return object;
}
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/environmentManager.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "environmentManager",
    ()=>environmentManager
]);
// src/environmentManager.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/utils.js [client] (ecmascript)");
;
var environmentManager = /* @__PURE__ */ (()=>{
    let isServerFn = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isServer"];
    return {
        /**
     * Returns whether the current runtime should be treated as a server environment.
     */ isServer () {
            return isServerFn();
        },
        /**
     * Overrides the server check globally.
     */ setIsServer (isServerValue) {
            isServerFn = isServerValue;
        }
    };
})();
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/notifyManager.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createNotifyManager",
    ()=>createNotifyManager,
    "defaultScheduler",
    ()=>defaultScheduler,
    "notifyManager",
    ()=>notifyManager
]);
// src/notifyManager.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/timeoutManager.js [client] (ecmascript)");
;
var defaultScheduler = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["systemSetTimeoutZero"];
function createNotifyManager() {
    let queue = [];
    let transactions = 0;
    let notifyFn = (callback)=>{
        callback();
    };
    let batchNotifyFn = (callback)=>{
        callback();
    };
    let scheduleFn = defaultScheduler;
    const schedule = (callback)=>{
        if (transactions) {
            queue.push(callback);
        } else {
            scheduleFn(()=>{
                notifyFn(callback);
            });
        }
    };
    const flush = ()=>{
        const originalQueue = queue;
        queue = [];
        if (originalQueue.length) {
            scheduleFn(()=>{
                batchNotifyFn(()=>{
                    originalQueue.forEach((callback)=>{
                        notifyFn(callback);
                    });
                });
            });
        }
    };
    return {
        batch: (callback)=>{
            let result;
            transactions++;
            try {
                result = callback();
            } finally{
                transactions--;
                if (!transactions) {
                    flush();
                }
            }
            return result;
        },
        /**
     * All calls to the wrapped function will be batched.
     */ batchCalls: (callback)=>{
            return (...args)=>{
                schedule(()=>{
                    callback(...args);
                });
            };
        },
        schedule,
        /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */ setNotifyFunction: (fn)=>{
            notifyFn = fn;
        },
        /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */ setBatchNotifyFunction: (fn)=>{
            batchNotifyFn = fn;
        },
        setScheduler: (fn)=>{
            scheduleFn = fn;
        }
    };
}
var notifyManager = createNotifyManager();
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/onlineManager.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnlineManager",
    ()=>OnlineManager,
    "onlineManager",
    ()=>onlineManager
]);
// src/onlineManager.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/subscribable.js [client] (ecmascript)");
;
var OnlineManager = class extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Subscribable"] {
    #online = true;
    #cleanup;
    #setup;
    constructor(){
        super();
        this.#setup = (onOnline)=>{
            if (typeof window !== "undefined" && window.addEventListener) {
                const onlineListener = ()=>onOnline(true);
                const offlineListener = ()=>onOnline(false);
                window.addEventListener("online", onlineListener, false);
                window.addEventListener("offline", offlineListener, false);
                return ()=>{
                    window.removeEventListener("online", onlineListener);
                    window.removeEventListener("offline", offlineListener);
                };
            }
            return;
        };
    }
    onSubscribe() {
        if (!this.#cleanup) {
            this.setEventListener(this.#setup);
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.#cleanup?.();
            this.#cleanup = void 0;
        }
    }
    setEventListener(setup) {
        this.#setup = setup;
        this.#cleanup?.();
        this.#cleanup = setup(this.setOnline.bind(this));
    }
    setOnline(online) {
        const changed = this.#online !== online;
        if (changed) {
            this.#online = online;
            this.listeners.forEach((listener)=>{
                listener(online);
            });
        }
    }
    isOnline() {
        return this.#online;
    }
};
var onlineManager = new OnlineManager();
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/thenable.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pendingThenable",
    ()=>pendingThenable,
    "tryResolveSync",
    ()=>tryResolveSync
]);
// src/thenable.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/utils.js [client] (ecmascript)");
;
function pendingThenable() {
    let resolve;
    let reject;
    const thenable = new Promise((_resolve, _reject)=>{
        resolve = _resolve;
        reject = _reject;
    });
    thenable.status = "pending";
    thenable.catch(()=>{});
    function finalize(data) {
        Object.assign(thenable, data);
        delete thenable.resolve;
        delete thenable.reject;
    }
    thenable.resolve = (value)=>{
        finalize({
            status: "fulfilled",
            value
        });
        resolve(value);
    };
    thenable.reject = (reason)=>{
        finalize({
            status: "rejected",
            reason
        });
        reject(reason);
    };
    return thenable;
}
function tryResolveSync(promise) {
    let data;
    promise.then((result)=>{
        data = result;
        return result;
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["noop"])?.catch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["noop"]);
    if (data !== void 0) {
        return {
            data
        };
    }
    return void 0;
}
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/retryer.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CancelledError",
    ()=>CancelledError,
    "canFetch",
    ()=>canFetch,
    "createRetryer",
    ()=>createRetryer,
    "isCancelledError",
    ()=>isCancelledError
]);
// src/retryer.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$focusManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/focusManager.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$onlineManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/onlineManager.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/thenable.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/environmentManager.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/utils.js [client] (ecmascript)");
;
;
;
;
;
function defaultRetryDelay(failureCount) {
    return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
    return (networkMode ?? "online") === "online" ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$onlineManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onlineManager"].isOnline() : true;
}
var CancelledError = class extends Error {
    constructor(options){
        super("CancelledError");
        this.revert = options?.revert;
        this.silent = options?.silent;
    }
};
function isCancelledError(value) {
    return value instanceof CancelledError;
}
function createRetryer(config) {
    let isRetryCancelled = false;
    let failureCount = 0;
    let continueFn;
    const thenable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pendingThenable"])();
    const isResolved = ()=>thenable.status !== "pending";
    const cancel = (cancelOptions)=>{
        if (!isResolved()) {
            const error = new CancelledError(cancelOptions);
            reject(error);
            config.onCancel?.(error);
        }
    };
    const cancelRetry = ()=>{
        isRetryCancelled = true;
    };
    const continueRetry = ()=>{
        isRetryCancelled = false;
    };
    const canContinue = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$focusManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["focusManager"].isFocused() && (config.networkMode === "always" || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$onlineManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onlineManager"].isOnline()) && config.canRun();
    const canStart = ()=>canFetch(config.networkMode) && config.canRun();
    const resolve = (value)=>{
        if (!isResolved()) {
            continueFn?.();
            thenable.resolve(value);
        }
    };
    const reject = (value)=>{
        if (!isResolved()) {
            continueFn?.();
            thenable.reject(value);
        }
    };
    const pause = ()=>{
        return new Promise((continueResolve)=>{
            continueFn = (value)=>{
                if (isResolved() || canContinue()) {
                    continueResolve(value);
                }
            };
            config.onPause?.();
        }).then(()=>{
            continueFn = void 0;
            if (!isResolved()) {
                config.onContinue?.();
            }
        });
    };
    const run = ()=>{
        if (isResolved()) {
            return;
        }
        let promiseOrValue;
        const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
        try {
            promiseOrValue = initialPromise ?? config.fn();
        } catch (error) {
            promiseOrValue = Promise.reject(error);
        }
        Promise.resolve(promiseOrValue).then(resolve).catch((error)=>{
            if (isResolved()) {
                return;
            }
            const retry = config.retry ?? (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["environmentManager"].isServer() ? 0 : 3);
            const retryDelay = config.retryDelay ?? defaultRetryDelay;
            const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
            const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
            if (isRetryCancelled || !shouldRetry) {
                reject(error);
                return;
            }
            failureCount++;
            config.onFail?.(failureCount, error);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["sleep"])(delay).then(()=>{
                return canContinue() ? void 0 : pause();
            }).then(()=>{
                if (isRetryCancelled) {
                    reject(error);
                } else {
                    run();
                }
            });
        });
    };
    return {
        promise: thenable,
        status: ()=>thenable.status,
        cancel,
        continue: ()=>{
            continueFn?.();
            return thenable;
        },
        cancelRetry,
        continueRetry,
        canStart,
        start: ()=>{
            if (canStart()) {
                run();
            } else {
                pause().then(run);
            }
            return thenable;
        }
    };
}
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/removable.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Removable",
    ()=>Removable
]);
// src/removable.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/timeoutManager.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/environmentManager.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/utils.js [client] (ecmascript)");
;
;
;
var Removable = class {
    #gcTimeout;
    destroy() {
        this.clearGcTimeout();
    }
    scheduleGc() {
        this.clearGcTimeout();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidTimeout"])(this.gcTime)) {
            this.#gcTimeout = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timeoutManager"].setTimeout(()=>{
                this.optionalRemove();
            }, this.gcTime);
        }
    }
    updateGcTime(newGcTime) {
        this.gcTime = Math.max(this.gcTime || 0, newGcTime ?? (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["environmentManager"].isServer() ? Infinity : 5 * 60 * 1e3));
    }
    clearGcTimeout() {
        if (this.#gcTimeout !== void 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timeoutManager"].clearTimeout(this.#gcTimeout);
            this.#gcTimeout = void 0;
        }
    }
};
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasNextPage",
    ()=>hasNextPage,
    "hasPreviousPage",
    ()=>hasPreviousPage,
    "infiniteQueryBehavior",
    ()=>infiniteQueryBehavior
]);
// src/infiniteQueryBehavior.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/utils.js [client] (ecmascript)");
;
function infiniteQueryBehavior(pages) {
    return {
        onFetch: (context, query)=>{
            const options = context.options;
            const direction = context.fetchOptions?.meta?.fetchMore?.direction;
            const oldPages = context.state.data?.pages || [];
            const oldPageParams = context.state.data?.pageParams || [];
            let result = {
                pages: [],
                pageParams: []
            };
            let currentPage = 0;
            const fetchFn = async ()=>{
                let cancelled = false;
                const addSignalProperty = (object)=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addConsumeAwareSignal"])(object, ()=>context.signal, ()=>cancelled = true);
                };
                const queryFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ensureQueryFn"])(context.options, context.fetchOptions);
                const fetchPage = async (data, param, previous)=>{
                    if (cancelled) {
                        return Promise.reject(context.signal.reason);
                    }
                    if (param == null && data.pages.length) {
                        return Promise.resolve(data);
                    }
                    const createQueryFnContext = ()=>{
                        const queryFnContext2 = {
                            client: context.client,
                            queryKey: context.queryKey,
                            pageParam: param,
                            direction: previous ? "backward" : "forward",
                            meta: context.options.meta
                        };
                        addSignalProperty(queryFnContext2);
                        return queryFnContext2;
                    };
                    const queryFnContext = createQueryFnContext();
                    const page = await queryFn(queryFnContext);
                    const { maxPages } = context.options;
                    const addTo = previous ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addToStart"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addToEnd"];
                    return {
                        pages: addTo(data.pages, page, maxPages),
                        pageParams: addTo(data.pageParams, param, maxPages)
                    };
                };
                if (direction && oldPages.length) {
                    const previous = direction === "backward";
                    const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
                    const oldData = {
                        pages: oldPages,
                        pageParams: oldPageParams
                    };
                    const param = pageParamFn(options, oldData);
                    result = await fetchPage(oldData, param, previous);
                } else {
                    const remainingPages = pages ?? oldPages.length;
                    do {
                        const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
                        if (currentPage > 0 && param == null) {
                            break;
                        }
                        result = await fetchPage(result, param);
                        currentPage++;
                    }while (currentPage < remainingPages)
                }
                return result;
            };
            if (context.options.persister) {
                context.fetchFn = ()=>{
                    return context.options.persister?.(fetchFn, {
                        client: context.client,
                        queryKey: context.queryKey,
                        meta: context.options.meta,
                        signal: context.signal
                    }, query);
                };
            } else {
                context.fetchFn = fetchFn;
            }
        }
    };
}
function getNextPageParam(options, { pages, pageParams }) {
    const lastIndex = pages.length - 1;
    return pages.length > 0 ? options.getNextPageParam(pages[lastIndex], pages, pageParams[lastIndex], pageParams) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
    return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}
function hasNextPage(options, data) {
    if (!data) return false;
    return getNextPageParam(options, data) != null;
}
function hasPreviousPage(options, data) {
    if (!data || !options.getPreviousPageParam) return false;
    return getPreviousPageParam(options, data) != null;
}
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/query.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Query",
    ()=>Query,
    "fetchState",
    ()=>fetchState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
// src/query.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/utils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/notifyManager.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$retryer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/retryer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$removable$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/removable.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$infiniteQueryBehavior$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js [client] (ecmascript)");
;
;
;
;
;
var Query = class extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$removable$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Removable"] {
    #queryType;
    #initialState;
    #revertState;
    #cache;
    #client;
    #retryer;
    #defaultOptions;
    #abortSignalConsumed;
    constructor(config){
        super();
        this.#abortSignalConsumed = false;
        this.#defaultOptions = config.defaultOptions;
        this.setOptions(config.options);
        this.observers = [];
        this.#client = config.client;
        this.#cache = this.#client.getQueryCache();
        this.queryKey = config.queryKey;
        this.queryHash = config.queryHash;
        this.#initialState = getDefaultState(this.options);
        this.state = config.state ?? this.#initialState;
        this.scheduleGc();
    }
    get meta() {
        return this.options.meta;
    }
    get queryType() {
        return this.#queryType;
    }
    get promise() {
        return this.#retryer?.promise;
    }
    setOptions(options) {
        this.options = {
            ...this.#defaultOptions,
            ...options
        };
        if (options?._type) {
            this.#queryType = options._type;
        }
        this.updateGcTime(this.options.gcTime);
        if (this.state && this.state.data === void 0) {
            const defaultState = getDefaultState(this.options);
            if (defaultState.data !== void 0) {
                this.setState(successState(defaultState.data, defaultState.dataUpdatedAt));
                this.#initialState = defaultState;
            }
        }
    }
    optionalRemove() {
        if (!this.observers.length && this.state.fetchStatus === "idle") {
            this.#cache.remove(this);
        }
    }
    setData(newData, options) {
        const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["replaceData"])(this.state.data, newData, this.options);
        this.#dispatch({
            data,
            type: "success",
            dataUpdatedAt: options?.updatedAt,
            manual: options?.manual
        });
        return data;
    }
    setState(state) {
        this.#dispatch({
            type: "setState",
            state
        });
    }
    cancel(options) {
        const promise = this.#retryer?.promise;
        this.#retryer?.cancel(options);
        return promise ? promise.then(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["noop"]).catch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["noop"]) : Promise.resolve();
    }
    destroy() {
        super.destroy();
        this.cancel({
            silent: true
        });
    }
    get resetState() {
        return this.#initialState;
    }
    reset() {
        this.destroy();
        this.setState(this.resetState);
    }
    isActive() {
        return this.observers.some((observer)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(observer.options.enabled, this) !== false);
    }
    isDisabled() {
        if (this.getObserversCount() > 0) {
            return !this.isActive();
        }
        return this.options.queryFn === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["skipToken"] || !this.isFetched();
    }
    isFetched() {
        return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
    }
    isStatic() {
        if (this.getObserversCount() > 0) {
            return this.observers.some((observer)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(observer.options.staleTime, this) === "static");
        }
        return false;
    }
    isStale() {
        if (this.getObserversCount() > 0) {
            return this.observers.some((observer)=>observer.getCurrentResult().isStale);
        }
        return this.state.data === void 0 || this.state.isInvalidated;
    }
    isStaleByTime(staleTime = 0) {
        if (this.state.data === void 0) {
            return true;
        }
        if (staleTime === "static") {
            return false;
        }
        if (this.state.isInvalidated) {
            return true;
        }
        return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timeUntilStale"])(this.state.dataUpdatedAt, staleTime);
    }
    onFocus() {
        const observer = this.observers.find((x)=>x.shouldFetchOnWindowFocus());
        observer?.refetch({
            cancelRefetch: false
        });
        this.#retryer?.continue();
    }
    onOnline() {
        const observer = this.observers.find((x)=>x.shouldFetchOnReconnect());
        observer?.refetch({
            cancelRefetch: false
        });
        this.#retryer?.continue();
    }
    addObserver(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
            this.clearGcTimeout();
            this.#cache.notify({
                type: "observerAdded",
                query: this,
                observer
            });
        }
    }
    removeObserver(observer) {
        if (this.observers.includes(observer)) {
            this.observers = this.observers.filter((x)=>x !== observer);
            if (!this.observers.length) {
                if (this.#retryer) {
                    if (this.#abortSignalConsumed || this.#isInitialPausedFetch()) {
                        this.#retryer.cancel({
                            revert: true
                        });
                    } else {
                        this.#retryer.cancelRetry();
                    }
                }
                this.scheduleGc();
            }
            this.#cache.notify({
                type: "observerRemoved",
                query: this,
                observer
            });
        }
    }
    getObserversCount() {
        return this.observers.length;
    }
    #isInitialPausedFetch() {
        return this.state.fetchStatus === "paused" && this.state.status === "pending";
    }
    invalidate() {
        if (!this.state.isInvalidated) {
            this.#dispatch({
                type: "invalidate"
            });
        }
    }
    async fetch(options, fetchOptions) {
        if (this.state.fetchStatus !== "idle" && // If the promise in the retryer is already rejected, we have to definitely
        // re-start the fetch; there is a chance that the query is still in a
        // pending state when that happens
        this.#retryer?.status() !== "rejected") {
            if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) {
                this.cancel({
                    silent: true
                });
            } else if (this.#retryer) {
                this.#retryer.continueRetry();
                return this.#retryer.promise;
            }
        }
        if (options) {
            this.setOptions(options);
        }
        if (!this.options.queryFn) {
            const observer = this.observers.find((x)=>x.options.queryFn);
            if (observer) {
                this.setOptions(observer.options);
            }
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (!Array.isArray(this.options.queryKey)) {
                console.error(`As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`);
            }
        }
        const abortController = new AbortController();
        const addSignalProperty = (object)=>{
            Object.defineProperty(object, "signal", {
                enumerable: true,
                get: ()=>{
                    this.#abortSignalConsumed = true;
                    return abortController.signal;
                }
            });
        };
        const fetchFn = ()=>{
            const queryFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ensureQueryFn"])(this.options, fetchOptions);
            const createQueryFnContext = ()=>{
                const queryFnContext2 = {
                    client: this.#client,
                    queryKey: this.queryKey,
                    meta: this.meta
                };
                addSignalProperty(queryFnContext2);
                return queryFnContext2;
            };
            const queryFnContext = createQueryFnContext();
            this.#abortSignalConsumed = false;
            if (this.options.persister) {
                return this.options.persister(queryFn, queryFnContext, this);
            }
            return queryFn(queryFnContext);
        };
        const createFetchContext = ()=>{
            const context2 = {
                fetchOptions,
                options: this.options,
                queryKey: this.queryKey,
                client: this.#client,
                state: this.state,
                fetchFn
            };
            addSignalProperty(context2);
            return context2;
        };
        const context = createFetchContext();
        const behavior = this.#queryType === "infinite" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$infiniteQueryBehavior$2e$js__$5b$client$5d$__$28$ecmascript$29$__["infiniteQueryBehavior"])(this.options.pages) : this.options.behavior;
        behavior?.onFetch(context, this);
        this.#revertState = this.state;
        if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
            this.#dispatch({
                type: "fetch",
                meta: context.fetchOptions?.meta
            });
        }
        this.#retryer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$retryer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createRetryer"])({
            initialPromise: fetchOptions?.initialPromise,
            fn: context.fetchFn,
            onCancel: (error)=>{
                if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$retryer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CancelledError"] && error.revert) {
                    this.setState({
                        ...this.#revertState,
                        fetchStatus: "idle"
                    });
                }
                abortController.abort();
            },
            onFail: (failureCount, error)=>{
                this.#dispatch({
                    type: "failed",
                    failureCount,
                    error
                });
            },
            onPause: ()=>{
                this.#dispatch({
                    type: "pause"
                });
            },
            onContinue: ()=>{
                this.#dispatch({
                    type: "continue"
                });
            },
            retry: context.options.retry,
            retryDelay: context.options.retryDelay,
            networkMode: context.options.networkMode,
            canRun: ()=>true
        });
        try {
            const data = await this.#retryer.start();
            if (data === void 0) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.error(`Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`);
                }
                throw new Error(`${this.queryHash} data is undefined`);
            }
            this.setData(data);
            this.#cache.config.onSuccess?.(data, this);
            this.#cache.config.onSettled?.(data, this.state.error, this);
            return data;
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$retryer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CancelledError"]) {
                if (error.silent) {
                    return this.#retryer.promise;
                } else if (error.revert) {
                    if (this.state.data === void 0) {
                        throw error;
                    }
                    return this.state.data;
                }
            }
            this.#dispatch({
                type: "error",
                error
            });
            this.#cache.config.onError?.(error, this);
            this.#cache.config.onSettled?.(this.state.data, error, this);
            throw error;
        } finally{
            this.scheduleGc();
        }
    }
    #dispatch(action) {
        const reducer = (state)=>{
            switch(action.type){
                case "failed":
                    return {
                        ...state,
                        fetchFailureCount: action.failureCount,
                        fetchFailureReason: action.error
                    };
                case "pause":
                    return {
                        ...state,
                        fetchStatus: "paused"
                    };
                case "continue":
                    return {
                        ...state,
                        fetchStatus: "fetching"
                    };
                case "fetch":
                    return {
                        ...state,
                        ...fetchState(state.data, this.options),
                        fetchMeta: action.meta ?? null
                    };
                case "success":
                    const newState = {
                        ...state,
                        ...successState(action.data, action.dataUpdatedAt),
                        dataUpdateCount: state.dataUpdateCount + 1,
                        ...!action.manual && {
                            fetchStatus: "idle",
                            fetchFailureCount: 0,
                            fetchFailureReason: null
                        }
                    };
                    this.#revertState = action.manual ? newState : void 0;
                    return newState;
                case "error":
                    const error = action.error;
                    return {
                        ...state,
                        error,
                        errorUpdateCount: state.errorUpdateCount + 1,
                        errorUpdatedAt: Date.now(),
                        fetchFailureCount: state.fetchFailureCount + 1,
                        fetchFailureReason: error,
                        fetchStatus: "idle",
                        status: "error",
                        // flag existing data as invalidated if we get a background error
                        // note that "no data" always means stale so we can set unconditionally here
                        isInvalidated: true
                    };
                case "invalidate":
                    return {
                        ...state,
                        isInvalidated: true
                    };
                case "setState":
                    return {
                        ...state,
                        ...action.state
                    };
            }
        };
        this.state = reducer(this.state);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["notifyManager"].batch(()=>{
            this.observers.forEach((observer)=>{
                observer.onQueryUpdate();
            });
            this.#cache.notify({
                query: this,
                type: "updated",
                action
            });
        });
    }
};
function fetchState(data, options) {
    return {
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchStatus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$retryer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["canFetch"])(options.networkMode) ? "fetching" : "paused",
        ...data === void 0 && {
            error: null,
            status: "pending"
        }
    };
}
function successState(data, dataUpdatedAt) {
    return {
        data,
        dataUpdatedAt: dataUpdatedAt ?? Date.now(),
        error: null,
        isInvalidated: false,
        status: "success"
    };
}
function getDefaultState(options) {
    const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
    const hasData = data !== void 0;
    const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
    return {
        data,
        dataUpdateCount: 0,
        dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: false,
        status: hasData ? "success" : "pending",
        fetchStatus: "idle"
    };
}
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/queryObserver.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryObserver",
    ()=>QueryObserver
]);
// src/queryObserver.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$focusManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/focusManager.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/environmentManager.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/notifyManager.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$query$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/query.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/subscribable.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/thenable.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/utils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/timeoutManager.js [client] (ecmascript)");
;
;
;
;
;
;
;
;
var QueryObserver = class extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Subscribable"] {
    constructor(client, options){
        super();
        this.options = options;
        this.#client = client;
        this.#selectError = null;
        this.#currentThenable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pendingThenable"])();
        this.bindMethods();
        this.setOptions(options);
    }
    #client;
    #currentQuery = void 0;
    #currentQueryInitialState = void 0;
    #currentResult = void 0;
    #currentResultState;
    #currentResultOptions;
    #currentThenable;
    #selectError;
    #selectFn;
    #selectResult;
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    #lastQueryWithDefinedData;
    #staleTimeoutId;
    #refetchIntervalId;
    #currentRefetchInterval;
    #trackedProps = /* @__PURE__ */ new Set();
    bindMethods() {
        this.refetch = this.refetch.bind(this);
    }
    onSubscribe() {
        if (this.listeners.size === 1) {
            this.#currentQuery.addObserver(this);
            if (shouldFetchOnMount(this.#currentQuery, this.options)) {
                this.#executeFetch();
            } else {
                this.updateResult();
            }
            this.#updateTimers();
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.destroy();
        }
    }
    shouldFetchOnReconnect() {
        return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnReconnect);
    }
    shouldFetchOnWindowFocus() {
        return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnWindowFocus);
    }
    destroy() {
        this.listeners = /* @__PURE__ */ new Set();
        this.#clearStaleTimeout();
        this.#clearRefetchInterval();
        this.#currentQuery.removeObserver(this);
    }
    setOptions(options) {
        const prevOptions = this.options;
        const prevQuery = this.#currentQuery;
        this.options = this.#client.defaultQueryOptions(options);
        if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(this.options.enabled, this.#currentQuery) !== "boolean") {
            throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
        }
        this.#updateQuery();
        this.#currentQuery.setOptions(this.options);
        if (prevOptions._defaulted && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(this.options, prevOptions)) {
            this.#client.getQueryCache().notify({
                type: "observerOptionsUpdated",
                query: this.#currentQuery,
                observer: this
            });
        }
        const mounted = this.hasListeners();
        if (mounted && shouldFetchOptionally(this.#currentQuery, prevQuery, this.options, prevOptions)) {
            this.#executeFetch();
        }
        this.updateResult();
        if (mounted && (this.#currentQuery !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(this.options.enabled, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(prevOptions.enabled, this.#currentQuery) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(this.options.staleTime, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(prevOptions.staleTime, this.#currentQuery))) {
            this.#updateStaleTimeout();
        }
        const nextRefetchInterval = this.#computeRefetchInterval();
        if (mounted && (this.#currentQuery !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(this.options.enabled, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) {
            this.#updateRefetchInterval(nextRefetchInterval);
        }
    }
    getOptimisticResult(options) {
        const query = this.#client.getQueryCache().build(this.#client, options);
        const result = this.createResult(query, options);
        if (shouldAssignObserverCurrentProperties(this, result)) {
            this.#currentResult = result;
            this.#currentResultOptions = this.options;
            this.#currentResultState = this.#currentQuery.state;
        }
        return result;
    }
    getCurrentResult() {
        return this.#currentResult;
    }
    trackResult(result, onPropTracked) {
        return new Proxy(result, {
            get: (target, key)=>{
                this.trackProp(key);
                onPropTracked?.(key);
                if (key === "promise") {
                    this.trackProp("data");
                    if (!this.options.experimental_prefetchInRender && this.#currentThenable.status === "pending") {
                        this.#currentThenable.reject(new Error("experimental_prefetchInRender feature flag is not enabled"));
                    }
                }
                return Reflect.get(target, key);
            }
        });
    }
    trackProp(key) {
        this.#trackedProps.add(key);
    }
    getCurrentQuery() {
        return this.#currentQuery;
    }
    refetch({ ...options } = {}) {
        return this.fetch({
            ...options
        });
    }
    fetchOptimistic(options) {
        const defaultedOptions = this.#client.defaultQueryOptions(options);
        const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
        return query.fetch().then(()=>this.createResult(query, defaultedOptions));
    }
    fetch(fetchOptions) {
        return this.#executeFetch({
            ...fetchOptions,
            cancelRefetch: fetchOptions.cancelRefetch ?? true
        }).then(()=>{
            this.updateResult();
            return this.#currentResult;
        });
    }
    #executeFetch(fetchOptions) {
        this.#updateQuery();
        let promise = this.#currentQuery.fetch(this.options, fetchOptions);
        if (!fetchOptions?.throwOnError) {
            promise = promise.catch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["noop"]);
        }
        return promise;
    }
    #updateStaleTimeout() {
        this.#clearStaleTimeout();
        const staleTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(this.options.staleTime, this.#currentQuery);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["environmentManager"].isServer() || this.#currentResult.isStale || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidTimeout"])(staleTime)) {
            return;
        }
        const time = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timeUntilStale"])(this.#currentResult.dataUpdatedAt, staleTime);
        const timeout = time + 1;
        this.#staleTimeoutId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timeoutManager"].setTimeout(()=>{
            if (!this.#currentResult.isStale) {
                this.updateResult();
            }
        }, timeout);
    }
    #computeRefetchInterval() {
        return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
    }
    #updateRefetchInterval(nextInterval) {
        this.#clearRefetchInterval();
        this.#currentRefetchInterval = nextInterval;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["environmentManager"].isServer() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(this.options.enabled, this.#currentQuery) === false || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidTimeout"])(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) {
            return;
        }
        this.#refetchIntervalId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timeoutManager"].setInterval(()=>{
            if (this.options.refetchIntervalInBackground || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$focusManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["focusManager"].isFocused()) {
                this.#executeFetch();
            }
        }, this.#currentRefetchInterval);
    }
    #updateTimers() {
        this.#updateStaleTimeout();
        this.#updateRefetchInterval(this.#computeRefetchInterval());
    }
    #clearStaleTimeout() {
        if (this.#staleTimeoutId !== void 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timeoutManager"].clearTimeout(this.#staleTimeoutId);
            this.#staleTimeoutId = void 0;
        }
    }
    #clearRefetchInterval() {
        if (this.#refetchIntervalId !== void 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timeoutManager"].clearInterval(this.#refetchIntervalId);
            this.#refetchIntervalId = void 0;
        }
    }
    createResult(query, options) {
        const prevQuery = this.#currentQuery;
        const prevOptions = this.options;
        const prevResult = this.#currentResult;
        const prevResultState = this.#currentResultState;
        const prevResultOptions = this.#currentResultOptions;
        const queryChange = query !== prevQuery;
        const queryInitialState = queryChange ? query.state : this.#currentQueryInitialState;
        const { state } = query;
        let newState = {
            ...state
        };
        let isPlaceholderData = false;
        let data;
        if (options._optimisticResults) {
            const mounted = this.hasListeners();
            const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
            const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
            if (fetchOnMount || fetchOptionally) {
                newState = {
                    ...newState,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$query$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchState"])(state.data, query.options)
                };
            }
            if (options._optimisticResults === "isRestoring") {
                newState.fetchStatus = "idle";
            }
        }
        let { error, errorUpdatedAt, status } = newState;
        data = newState.data;
        let skipSelect = false;
        if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
            let placeholderData;
            if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
                placeholderData = prevResult.data;
                skipSelect = true;
            } else {
                placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(this.#lastQueryWithDefinedData?.state.data, this.#lastQueryWithDefinedData) : options.placeholderData;
            }
            if (placeholderData !== void 0) {
                status = "success";
                data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["replaceData"])(prevResult?.data, placeholderData, options);
                isPlaceholderData = true;
            }
        }
        if (options.select && data !== void 0 && !skipSelect) {
            if (prevResult && data === prevResultState?.data && options.select === this.#selectFn) {
                data = this.#selectResult;
            } else {
                try {
                    this.#selectFn = options.select;
                    data = options.select(data);
                    data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["replaceData"])(prevResult?.data, data, options);
                    this.#selectResult = data;
                    this.#selectError = null;
                } catch (selectError) {
                    this.#selectError = selectError;
                }
            }
        }
        if (this.#selectError) {
            error = this.#selectError;
            data = this.#selectResult;
            errorUpdatedAt = Date.now();
            status = "error";
        }
        const isFetching = newState.fetchStatus === "fetching";
        const isPending = status === "pending";
        const isError = status === "error";
        const isLoading = isPending && isFetching;
        const hasData = data !== void 0;
        const result = {
            status,
            fetchStatus: newState.fetchStatus,
            isPending,
            isSuccess: status === "success",
            isError,
            isInitialLoading: isLoading,
            isLoading,
            data,
            dataUpdatedAt: newState.dataUpdatedAt,
            error,
            errorUpdatedAt,
            failureCount: newState.fetchFailureCount,
            failureReason: newState.fetchFailureReason,
            errorUpdateCount: newState.errorUpdateCount,
            isFetched: query.isFetched(),
            isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
            isFetching,
            isRefetching: isFetching && !isPending,
            isLoadingError: isError && !hasData,
            isPaused: newState.fetchStatus === "paused",
            isPlaceholderData,
            isRefetchError: isError && hasData,
            isStale: isStale(query, options),
            refetch: this.refetch,
            promise: this.#currentThenable,
            isEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(options.enabled, query) !== false
        };
        const nextResult = result;
        if (this.options.experimental_prefetchInRender) {
            const hasResultData = nextResult.data !== void 0;
            const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
            const finalizeThenableIfPossible = (thenable)=>{
                if (isErrorWithoutData) {
                    thenable.reject(nextResult.error);
                } else if (hasResultData) {
                    thenable.resolve(nextResult.data);
                }
            };
            const recreateThenable = ()=>{
                const pending = this.#currentThenable = nextResult.promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pendingThenable"])();
                finalizeThenableIfPossible(pending);
            };
            const prevThenable = this.#currentThenable;
            switch(prevThenable.status){
                case "pending":
                    if (query.queryHash === prevQuery.queryHash) {
                        finalizeThenableIfPossible(prevThenable);
                    }
                    break;
                case "fulfilled":
                    if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
                        recreateThenable();
                    }
                    break;
                case "rejected":
                    if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
                        recreateThenable();
                    }
                    break;
            }
        }
        return nextResult;
    }
    updateResult() {
        const prevResult = this.#currentResult;
        const nextResult = this.createResult(this.#currentQuery, this.options);
        this.#currentResultState = this.#currentQuery.state;
        this.#currentResultOptions = this.options;
        if (this.#currentResultState.data !== void 0) {
            this.#lastQueryWithDefinedData = this.#currentQuery;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(nextResult, prevResult)) {
            return;
        }
        this.#currentResult = nextResult;
        const shouldNotifyListeners = ()=>{
            if (!prevResult) {
                return true;
            }
            const { notifyOnChangeProps } = this.options;
            const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
            if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) {
                return true;
            }
            const includedProps = new Set(notifyOnChangePropsValue ?? this.#trackedProps);
            if (this.options.throwOnError) {
                includedProps.add("error");
            }
            return Object.keys(this.#currentResult).some((key)=>{
                const typedKey = key;
                const changed = this.#currentResult[typedKey] !== prevResult[typedKey];
                return changed && includedProps.has(typedKey);
            });
        };
        this.#notify({
            listeners: shouldNotifyListeners()
        });
    }
    #updateQuery() {
        const query = this.#client.getQueryCache().build(this.#client, this.options);
        if (query === this.#currentQuery) {
            return;
        }
        const prevQuery = this.#currentQuery;
        this.#currentQuery = query;
        this.#currentQueryInitialState = query.state;
        if (this.hasListeners()) {
            prevQuery?.removeObserver(this);
            query.addObserver(this);
        }
    }
    onQueryUpdate() {
        this.updateResult();
        if (this.hasListeners()) {
            this.#updateTimers();
        }
    }
    #notify(notifyOptions) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["notifyManager"].batch(()=>{
            if (notifyOptions.listeners) {
                this.listeners.forEach((listener)=>{
                    listener(this.#currentResult);
                });
            }
            this.#client.getQueryCache().notify({
                query: this.#currentQuery,
                type: "observerResultsUpdated"
            });
        });
    }
};
function shouldLoadOnMount(query, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(options.retryOnMount, query) === false);
}
function shouldFetchOnMount(query, options) {
    return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(options.enabled, query) !== false && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(options.staleTime, query) !== "static") {
        const value = typeof field === "function" ? field(query) : field;
        return value === "always" || value !== false && isStale(query, options);
    }
    return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
    return (query !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(options.enabled, query) !== false && query.isStaleByTime((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(observer.getCurrentResult(), optimisticResult)) {
        return true;
    }
    return false;
}
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryClientContext",
    ()=>QueryClientContext,
    "QueryClientProvider",
    ()=>QueryClientProvider,
    "useQueryClient",
    ()=>useQueryClient
]);
// src/QueryClientProvider.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/jsx-runtime.js [client] (ecmascript)");
"use client";
;
;
var QueryClientContext = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"](void 0);
var useQueryClient = (queryClient)=>{
    const client = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"](QueryClientContext);
    if (queryClient) {
        return queryClient;
    }
    if (!client) {
        throw new Error("No QueryClient set, use QueryClientProvider to set one");
    }
    return client;
};
var QueryClientProvider = ({ client, children })=>{
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "QueryClientProvider.useEffect": ()=>{
            client.mount();
            return ({
                "QueryClientProvider.useEffect": ()=>{
                    client.unmount();
                }
            })["QueryClientProvider.useEffect"];
        }
    }["QueryClientProvider.useEffect"], [
        client
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsx"])(QueryClientContext.Provider, {
        value: client,
        children
    });
};
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryErrorResetBoundary",
    ()=>QueryErrorResetBoundary,
    "useQueryErrorResetBoundary",
    ()=>useQueryErrorResetBoundary
]);
// src/QueryErrorResetBoundary.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/jsx-runtime.js [client] (ecmascript)");
"use client";
;
;
function createValue() {
    let isReset = false;
    return {
        clearReset: ()=>{
            isReset = false;
        },
        reset: ()=>{
            isReset = true;
        },
        isReset: ()=>{
            return isReset;
        }
    };
}
var QueryErrorResetBoundaryContext = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"](createValue());
var useQueryErrorResetBoundary = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"](QueryErrorResetBoundaryContext);
var QueryErrorResetBoundary = ({ children })=>{
    const [value] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"]({
        "QueryErrorResetBoundary.useState": ()=>createValue()
    }["QueryErrorResetBoundary.useState"]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$jsx$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsx"])(QueryErrorResetBoundaryContext.Provider, {
        value,
        children: typeof children === "function" ? children(value) : children
    });
};
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensurePreventErrorBoundaryRetry",
    ()=>ensurePreventErrorBoundaryRetry,
    "getHasError",
    ()=>getHasError,
    "useClearResetErrorBoundary",
    ()=>useClearResetErrorBoundary
]);
// src/errorBoundaryUtils.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/utils.js [client] (ecmascript)");
"use client";
;
;
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query)=>{
    const throwOnError = query?.state.error && typeof options.throwOnError === "function" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["shouldThrowError"])(options.throwOnError, [
        query.state.error,
        query
    ]) : options.throwOnError;
    if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
        if (!errorResetBoundary.isReset()) {
            options.retryOnMount = false;
        }
    }
};
var useClearResetErrorBoundary = (errorResetBoundary)=>{
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useClearResetErrorBoundary.useEffect": ()=>{
            errorResetBoundary.clearReset();
        }
    }["useClearResetErrorBoundary.useEffect"], [
        errorResetBoundary
    ]);
};
var getHasError = ({ result, errorResetBoundary, throwOnError, query, suspense })=>{
    return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["shouldThrowError"])(throwOnError, [
        result.error,
        query
    ]));
};
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IsRestoringProvider",
    ()=>IsRestoringProvider,
    "useIsRestoring",
    ()=>useIsRestoring
]);
// src/IsRestoringProvider.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/index.js [client] (ecmascript)");
"use client";
;
var IsRestoringContext = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"](false);
var useIsRestoring = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"](IsRestoringContext);
var IsRestoringProvider = IsRestoringContext.Provider;
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/suspense.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultThrowOnError",
    ()=>defaultThrowOnError,
    "ensureSuspenseTimers",
    ()=>ensureSuspenseTimers,
    "fetchOptimistic",
    ()=>fetchOptimistic,
    "shouldSuspend",
    ()=>shouldSuspend,
    "willFetch",
    ()=>willFetch
]);
// src/suspense.ts
var defaultThrowOnError = (_error, query)=>query.state.data === void 0;
var ensureSuspenseTimers = (defaultedOptions)=>{
    if (defaultedOptions.suspense) {
        const MIN_SUSPENSE_TIME_MS = 1e3;
        const clamp = (value)=>value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
        const originalStaleTime = defaultedOptions.staleTime;
        defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args)=>clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
        if (typeof defaultedOptions.gcTime === "number") {
            defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, MIN_SUSPENSE_TIME_MS);
        }
    }
};
var willFetch = (result, isRestoring)=>result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result)=>defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary)=>observer.fetchOptimistic(defaultedOptions).catch(()=>{
        errorResetBoundary.clearReset();
    });
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBaseQuery",
    ()=>useBaseQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
// src/useBaseQuery.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/environmentManager.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/utils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/notifyManager.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryErrorResetBoundary$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$IsRestoringProvider$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/suspense.js [client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function useBaseQuery(options, Observer, queryClient) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (typeof options !== "object" || Array.isArray(options)) {
            throw new Error('Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object');
        }
    }
    const isRestoring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$IsRestoringProvider$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useIsRestoring"])();
    const errorResetBoundary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryErrorResetBoundary$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useQueryErrorResetBoundary"])();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useQueryClient"])(queryClient);
    const defaultedOptions = client.defaultQueryOptions(options);
    client.getDefaultOptions().queries?._experimental_beforeQuery?.(defaultedOptions);
    const query = client.getQueryCache().get(defaultedOptions.queryHash);
    if ("TURBOPACK compile-time truthy", 1) {
        if (!defaultedOptions.queryFn) {
            console.error(`[${defaultedOptions.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`);
        }
    }
    defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ensureSuspenseTimers"])(defaultedOptions);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ensurePreventErrorBoundaryRetry"])(defaultedOptions, errorResetBoundary, query);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useClearResetErrorBoundary"])(errorResetBoundary);
    const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
    const [observer] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"]({
        "useBaseQuery.useState": ()=>new Observer(client, defaultedOptions)
    }["useBaseQuery.useState"]);
    const result = observer.getOptimisticResult(defaultedOptions);
    const shouldSubscribe = !isRestoring && options.subscribed !== false;
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useBaseQuery.useSyncExternalStore.useCallback": (onStoreChange)=>{
            const unsubscribe = shouldSubscribe ? observer.subscribe(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["notifyManager"].batchCalls(onStoreChange)) : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["noop"];
            observer.updateResult();
            return unsubscribe;
        }
    }["useBaseQuery.useSyncExternalStore.useCallback"], [
        observer,
        shouldSubscribe
    ]), {
        "useBaseQuery.useSyncExternalStore": ()=>observer.getCurrentResult()
    }["useBaseQuery.useSyncExternalStore"], {
        "useBaseQuery.useSyncExternalStore": ()=>observer.getCurrentResult()
    }["useBaseQuery.useSyncExternalStore"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useBaseQuery.useEffect": ()=>{
            observer.setOptions(defaultedOptions);
        }
    }["useBaseQuery.useEffect"], [
        defaultedOptions,
        observer
    ]);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$client$5d$__$28$ecmascript$29$__["shouldSuspend"])(defaultedOptions, result)) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchOptimistic"])(defaultedOptions, observer, errorResetBoundary);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getHasError"])({
        result,
        errorResetBoundary,
        throwOnError: defaultedOptions.throwOnError,
        query,
        suspense: defaultedOptions.suspense
    })) {
        throw result.error;
    }
    ;
    client.getDefaultOptions().queries?._experimental_afterQuery?.(defaultedOptions, result);
    if (defaultedOptions.experimental_prefetchInRender && !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$client$5d$__$28$ecmascript$29$__["environmentManager"].isServer() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$client$5d$__$28$ecmascript$29$__["willFetch"])(result, isRestoring)) {
        const promise = isNewCacheEntry ? // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchOptimistic"])(defaultedOptions, observer, errorResetBoundary) : // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
        query?.promise;
        promise?.catch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["noop"]).finally(()=>{
            observer.updateResult();
        });
    }
    return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
;
}),
"[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/useQuery.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useQuery",
    ()=>useQuery
]);
// src/useQuery.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/query-core/build/modern/queryObserver.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dev/Hendy/Warranty-Claim-Tracker/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js [client] (ecmascript)");
"use client";
;
;
function useQuery(options, queryClient) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useBaseQuery"])(options, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dev$2f$Hendy$2f$Warranty$2d$Claim$2d$Tracker$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$client$5d$__$28$ecmascript$29$__["QueryObserver"], queryClient);
}
;
}),
]);

//# sourceMappingURL=0g90_0g~x5.i._.js.map