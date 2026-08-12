// Server-side authorization for the /api/data/* proxy (src/pages/api/data/[...path].ts).
//
// Everything here previously existed only as UI gating (hidden buttons, page
// redirects) — a valid session cookie was enough to call any method on any
// collection directly. This module is the single source of truth the proxy
// consults *before* forwarding a request to the external data API.

export type CustomRole = "Location" | "Administrator" | "Group Manager" | "Owner"

const MANAGER_ROLES: CustomRole[] = ["Group Manager", "Owner"]

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"
type RoleRule = "all" | CustomRole[]

interface CollectionRules {
  GET: RoleRule
  POST: RoleRule
  PUT: RoleRule
  DELETE: RoleRule
}

// Every collection the browser may reach through /api/data/*. A collection
// not listed here is rejected outright — the proxy no longer forwards to
// arbitrary upstream paths just because a client asked for them.
const COLLECTION_RULES: Record<string, CollectionRules> = {
  // Read is unrestricted because every role's UI resolves claims broadly
  // (Dashboard/Approvals scope visibility client-side); writes/deletes are
  // the privileged part.
  WarrantyClaim: { GET: "all", POST: "all", PUT: "all", DELETE: MANAGER_ROLES },

  // Read stays open — getUserName() lookups on Dashboard/ClaimsTable/Approvals
  // run for every role. Only Owner/Group Manager may create/edit/delete users
  // (this is also the endpoint that a self-promotion attempt would use:
  // PUT /api/data/User/<ownId> with a raised customRole).
  User: { GET: "all", POST: MANAGER_ROLES, PUT: MANAGER_ROLES, DELETE: MANAGER_ROLES },

  Brand: { GET: "all", POST: MANAGER_ROLES, PUT: MANAGER_ROLES, DELETE: MANAGER_ROLES },
  Site: { GET: "all", POST: MANAGER_ROLES, PUT: MANAGER_ROLES, DELETE: MANAGER_ROLES },
  Alert: { GET: "all", POST: MANAGER_ROLES, PUT: MANAGER_ROLES, DELETE: MANAGER_ROLES },
  AlertResolution: { GET: "all", POST: MANAGER_ROLES, PUT: MANAGER_ROLES, DELETE: MANAGER_ROLES },

  // Audit trail: every role writes entries for its own actions; nobody edits
  // or deletes one once written.
  ClaimAudit: { GET: "all", POST: "all", PUT: [], DELETE: [] },

  // Notes/messages: no delete flow exists in the UI for any of these, so
  // deletion is denied outright rather than left ungated.
  ClaimNote: { GET: "all", POST: "all", PUT: "all", DELETE: [] },
  Message: { GET: "all", POST: "all", PUT: "all", DELETE: [] },
  MessageRead: { GET: "all", POST: "all", PUT: "all", DELETE: [] },
  ApprovalMessage: { GET: "all", POST: "all", PUT: "all", DELETE: [] },

  // Only ever read/written from the Configuration page's Users tab, which is
  // already Owner/Group-Manager-only.
  PendingUserInvite: { GET: MANAGER_ROLES, POST: MANAGER_ROLES, PUT: MANAGER_ROLES, DELETE: MANAGER_ROLES },
}

// Fields that only Owner/Group Manager may set on a WarrantyClaim, regardless
// of whether the general PUT is otherwise allowed — approving/rejecting a
// claim is a distinct privileged action layered on top of ordinary edit
// access (Administrator can edit a claim's details but not its outcome).
const MANAGER_ONLY_CLAIM_FIELDS = ["approval_status"]

// Identity fields the client currently sets from its own session state
// (src/api/databaseClient.js, ComposeMessageModal.jsx, ApprovalChat.jsx).
// They're trivially spoofable in a raw request body, so the proxy overwrites
// them from the verified session before forwarding — only when the caller's
// body already includes the field, so collections that don't use it are
// untouched.
export const IDENTITY_FIELDS: Record<string, "email" | "id" | "name"> = {
  created_by: "email",
  created_by_id: "id",
  sender_email: "email",
  sender_name: "name",
}

export function isKnownCollection(collection: string): collection is keyof typeof COLLECTION_RULES {
  return Object.prototype.hasOwnProperty.call(COLLECTION_RULES, collection)
}

export function isManagerRole(role: string | null | undefined): boolean {
  return MANAGER_ROLES.includes(role as CustomRole)
}

function roleAllowed(rule: RoleRule, role: string | null | undefined): boolean {
  if (rule === "all") return true
  return rule.includes(role as CustomRole)
}

export interface AccessCheckInput {
  role: string | null | undefined
  method: string | undefined
  collection: string
  body: unknown
}

export interface AccessVerdict {
  allowed: boolean
  status: number
  reason?: string
}

export function checkAccess({ role, method, collection, body }: AccessCheckInput): AccessVerdict {
  const rules = COLLECTION_RULES[collection]
  if (!rules) {
    return { allowed: false, status: 404, reason: `Unknown collection "${collection}"` }
  }

  const rule = method ? rules[method as HttpMethod] : undefined
  if (!rule) {
    return { allowed: false, status: 405, reason: `Method ${method} is not supported for ${collection}` }
  }

  if (!roleAllowed(rule, role)) {
    return { allowed: false, status: 403, reason: `Role "${role}" may not ${method} ${collection}` }
  }

  if (
    collection === "WarrantyClaim" &&
    method === "PUT" &&
    body &&
    typeof body === "object" &&
    !isManagerRole(role) &&
    MANAGER_ONLY_CLAIM_FIELDS.some((field) => field in (body as Record<string, unknown>))
  ) {
    return { allowed: false, status: 403, reason: "Only Owner/Group Manager may change approval_status" }
  }

  return { allowed: true, status: 200 }
}
