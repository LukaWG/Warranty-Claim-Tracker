import { describe, it, expect } from "vitest"
import { checkAccess, isManagerRole, isKnownCollection } from "./dataAccessPolicy"

describe("checkAccess — the critical exploits this policy exists to close", () => {
  it("blocks a Location user from self-promoting via PUT /User/<id>", () => {
    const verdict = checkAccess({
      role: "Location",
      method: "PUT",
      collection: "User",
      body: { customRole: "Owner", role: "admin" },
    })
    expect(verdict.allowed).toBe(false)
    expect(verdict.status).toBe(403)
  })

  it("blocks a Location user from deleting a claim", () => {
    const verdict = checkAccess({ role: "Location", method: "DELETE", collection: "WarrantyClaim", body: {} })
    expect(verdict.allowed).toBe(false)
  })

  it("blocks Location and Administrator from approving/rejecting a claim", () => {
    for (const role of ["Location", "Administrator"]) {
      const verdict = checkAccess({
        role,
        method: "PUT",
        collection: "WarrantyClaim",
        body: { approval_status: "approved" },
      })
      expect(verdict.allowed).toBe(false)
      expect(verdict.reason).toMatch(/approval_status/)
    }
  })

  it("rejects a path segment that isn't a real collection, instead of forwarding it upstream", () => {
    const verdict = checkAccess({ role: "Owner", method: "GET", collection: "../../internal-admin", body: undefined })
    expect(verdict.allowed).toBe(false)
    expect(verdict.status).toBe(404)
  })
})

describe("checkAccess — Owner/Group Manager have full access", () => {
  const managers = ["Owner", "Group Manager"]
  const collections = [
    "WarrantyClaim", "User", "Brand", "Site", "Alert", "AlertResolution",
    "ClaimAudit", "ClaimNote", "Message", "MessageRead", "PendingUserInvite", "ApprovalMessage",
  ]

  it.each(managers)("%s may GET every known collection", (role) => {
    for (const collection of collections) {
      expect(checkAccess({ role, method: "GET", collection, body: undefined }).allowed).toBe(true)
    }
  })

  it.each(managers)("%s may set approval_status on a claim", (role) => {
    expect(
      checkAccess({ role, method: "PUT", collection: "WarrantyClaim", body: { approval_status: "approved" } })
        .allowed
    ).toBe(true)
  })

  it.each(managers)("%s may delete users, sites, brands, alerts and claims", (role) => {
    for (const collection of ["User", "Site", "Brand", "Alert", "AlertResolution", "WarrantyClaim"]) {
      expect(checkAccess({ role, method: "DELETE", collection, body: {} }).allowed).toBe(true)
    }
  })
})

describe("checkAccess — Administrator", () => {
  it("may read and create/edit claims, but not delete or approve them", () => {
    expect(checkAccess({ role: "Administrator", method: "GET", collection: "WarrantyClaim", body: undefined }).allowed).toBe(true)
    expect(checkAccess({ role: "Administrator", method: "POST", collection: "WarrantyClaim", body: {} }).allowed).toBe(true)
    expect(checkAccess({ role: "Administrator", method: "PUT", collection: "WarrantyClaim", body: { status: "in_progress" } }).allowed).toBe(true)
    expect(checkAccess({ role: "Administrator", method: "DELETE", collection: "WarrantyClaim", body: {} }).allowed).toBe(false)
  })

  it("may read, but not write, Brand/Site/Alert/AlertResolution", () => {
    for (const collection of ["Brand", "Site", "Alert", "AlertResolution"]) {
      expect(checkAccess({ role: "Administrator", method: "GET", collection, body: undefined }).allowed).toBe(true)
      expect(checkAccess({ role: "Administrator", method: "POST", collection, body: {} }).allowed).toBe(false)
      expect(checkAccess({ role: "Administrator", method: "PUT", collection, body: {} }).allowed).toBe(false)
      expect(checkAccess({ role: "Administrator", method: "DELETE", collection, body: {} }).allowed).toBe(false)
    }
  })

  it("has no access to User management or pending invites", () => {
    for (const method of ["POST", "PUT", "DELETE"]) {
      expect(checkAccess({ role: "Administrator", method, collection: "User", body: {} }).allowed).toBe(false)
    }
    for (const method of ["GET", "POST", "PUT", "DELETE"]) {
      expect(checkAccess({ role: "Administrator", method, collection: "PendingUserInvite", body: {} }).allowed).toBe(false)
    }
  })
})

describe("checkAccess — Location", () => {
  it("may create and read claims, and make ordinary edits (e.g. withdraw), but not approve or delete", () => {
    expect(checkAccess({ role: "Location", method: "GET", collection: "WarrantyClaim", body: undefined }).allowed).toBe(true)
    expect(checkAccess({ role: "Location", method: "POST", collection: "WarrantyClaim", body: {} }).allowed).toBe(true)
    expect(checkAccess({ role: "Location", method: "PUT", collection: "WarrantyClaim", body: { status: "withdrawn" } }).allowed).toBe(true)
    expect(checkAccess({ role: "Location", method: "PUT", collection: "WarrantyClaim", body: { approval_status: "approved" } }).allowed).toBe(false)
    expect(checkAccess({ role: "Location", method: "DELETE", collection: "WarrantyClaim", body: {} }).allowed).toBe(false)
  })

  it("has read-only access to Brand/Site/Alert/AlertResolution and no access to Configuration-only collections", () => {
    for (const collection of ["Brand", "Site", "Alert", "AlertResolution"]) {
      expect(checkAccess({ role: "Location", method: "GET", collection, body: undefined }).allowed).toBe(true)
      expect(checkAccess({ role: "Location", method: "POST", collection, body: {} }).allowed).toBe(false)
    }
    expect(checkAccess({ role: "Location", method: "GET", collection: "PendingUserInvite", body: undefined }).allowed).toBe(false)
  })

  it("can still read the User collection (needed for name lookups across the app)", () => {
    expect(checkAccess({ role: "Location", method: "GET", collection: "User", body: undefined }).allowed).toBe(true)
  })
})

describe("checkAccess — collections with no legitimate delete flow reject DELETE for every role", () => {
  const noDeleteCollections = ["ClaimAudit", "ClaimNote", "Message", "MessageRead", "ApprovalMessage"]
  const allRoles = ["Location", "Administrator", "Group Manager", "Owner"]

  it.each(noDeleteCollections)("%s can never be deleted, even by Owner", (collection) => {
    for (const role of allRoles) {
      expect(checkAccess({ role, method: "DELETE", collection, body: {} }).allowed).toBe(false)
    }
  })
})

describe("checkAccess — unsupported method / missing role", () => {
  it("returns 405 for a method the collection doesn't support (e.g. PATCH)", () => {
    const verdict = checkAccess({ role: "Owner", method: "PATCH", collection: "WarrantyClaim", body: {} })
    expect(verdict.allowed).toBe(false)
    expect(verdict.status).toBe(405)
  })

  it("denies a request with no role rather than defaulting open", () => {
    const verdict = checkAccess({ role: undefined, method: "DELETE", collection: "WarrantyClaim", body: {} })
    expect(verdict.allowed).toBe(false)
  })
})

describe("isManagerRole", () => {
  it("is true only for Owner and Group Manager", () => {
    expect(isManagerRole("Owner")).toBe(true)
    expect(isManagerRole("Group Manager")).toBe(true)
    expect(isManagerRole("Administrator")).toBe(false)
    expect(isManagerRole("Location")).toBe(false)
    expect(isManagerRole(undefined)).toBe(false)
    expect(isManagerRole(null)).toBe(false)
  })
})

describe("isKnownCollection", () => {
  it("accepts every collection the frontend actually uses", () => {
    const collections = [
      "WarrantyClaim", "User", "Brand", "Site", "Alert", "AlertResolution",
      "ClaimAudit", "ClaimNote", "Message", "MessageRead", "PendingUserInvite", "ApprovalMessage",
    ]
    for (const collection of collections) {
      expect(isKnownCollection(collection)).toBe(true)
    }
  })

  it("rejects anything not on the allow-list", () => {
    expect(isKnownCollection("../../etc/passwd")).toBe(false)
    expect(isKnownCollection("Session")).toBe(false)
    expect(isKnownCollection("")).toBe(false)
  })
})
