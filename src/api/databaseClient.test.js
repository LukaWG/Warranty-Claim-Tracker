import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("./currentUser", () => ({
  currentUser: { me: vi.fn() },
}))

const { currentUser } = await import("./currentUser")
const { databaseClients } = await import("./databaseClient")

function fakeResponse({ ok = true, status = 200, body = null, statusText = "" } = {}) {
  const text = body === null ? "" : JSON.stringify(body)
  return {
    ok,
    status,
    statusText,
    headers: { get: () => "application/json" },
    text: async () => text,
    json: async () => JSON.parse(text || "null"),
  }
}

beforeEach(() => {
  vi.restoreAllMocks()
  global.fetch = vi.fn()
})

describe("databaseClients registry", () => {
  const expected = [
    "Alert", "AlertResolution", "ApprovalMessage", "Brand", "ClaimAudit", "ClaimNote",
    "PendingUserInvite", "User", "WarrantyClaim", "Site", "Message", "MessageRead",
  ]

  it("registers every collection the API exposes, each with the full CRUD interface", () => {
    for (const name of expected) {
      const client = databaseClients[name]
      expect(client.fileName).toBe(name)
      for (const method of ["create", "get", "list", "update", "delete", "query", "filter"]) {
        expect(typeof client[method]).toBe("function")
      }
    }
  })

  it("gives each collection its own independent client instance", () => {
    expect(databaseClients.WarrantyClaim).not.toBe(databaseClients.Brand)
  })
})

describe("DatabaseClient#create", () => {
  it("stamps created_by/created_by_id from the current session and POSTs to the collection", async () => {
    currentUser.me.mockResolvedValue({ email: "alice@hendy-group.com", id: "user-1" })
    global.fetch.mockResolvedValue(fakeResponse({ body: { id: "claim-1" } }))

    const result = await databaseClients.WarrantyClaim.create({ site: "Site A" })

    expect(global.fetch).toHaveBeenCalledTimes(1)
    const [url, init] = global.fetch.mock.calls[0]
    expect(url).toBe("/api/data/WarrantyClaim")
    expect(init.method).toBe("POST")
    expect(JSON.parse(init.body)).toEqual({
      site: "Site A",
      created_by: "alice@hendy-group.com",
      created_by_id: "user-1",
    })
    expect(result).toEqual({ id: "claim-1" })
  })

  it("never trusts a caller-supplied created_by/created_by_id — always overwrites them", async () => {
    currentUser.me.mockResolvedValue({ email: "real-user@hendy-group.com", id: "real-id" })
    global.fetch.mockResolvedValue(fakeResponse({ body: {} }))

    await databaseClients.WarrantyClaim.create({
      created_by: "spoofed@attacker.com",
      created_by_id: "someone-elses-id",
    })

    const [, init] = global.fetch.mock.calls[0]
    const body = JSON.parse(init.body)
    expect(body.created_by).toBe("real-user@hendy-group.com")
    expect(body.created_by_id).toBe("real-id")
  })

  it("falls back to 'Unknown'/null when no session user is available", async () => {
    currentUser.me.mockResolvedValue(null)
    global.fetch.mockResolvedValue(fakeResponse({ body: {} }))

    await databaseClients.Message.create({ text: "hi" })

    const [, init] = global.fetch.mock.calls[0]
    const body = JSON.parse(init.body)
    expect(body.created_by).toBe("Unknown")
    expect(body.created_by_id).toBeNull()
  })
})

describe("DatabaseClient#get / #list / #query / #update / #delete", () => {
  it("get() issues a plain GET to the collection", async () => {
    global.fetch.mockResolvedValue(fakeResponse({ body: [{ id: 1 }, { id: 2 }] }))

    const result = await databaseClients.Brand.get()

    expect(global.fetch).toHaveBeenCalledWith("/api/data/Brand", expect.objectContaining({ }))
    expect(result).toEqual([{ id: 1 }, { id: 2 }])
  })

  it("list() sorts ascending by the given field, nulls last", async () => {
    global.fetch.mockResolvedValue(
      fakeResponse({ body: [{ name: "C" }, { name: null }, { name: "A" }] })
    )

    const result = await databaseClients.Brand.list("name")

    expect(result.map((r) => r.name)).toEqual(["A", "C", null])
  })

  it("list() sorts descending when the field is prefixed with '-'", async () => {
    global.fetch.mockResolvedValue(
      fakeResponse({ body: [{ created_date: "2026-01-01" }, { created_date: "2026-03-01" }] })
    )

    const result = await databaseClients.WarrantyClaim.list("-created_date")

    expect(result.map((r) => r.created_date)).toEqual(["2026-03-01", "2026-01-01"])
  })

  it("list() applies limit only when it's a positive integer", async () => {
    global.fetch.mockResolvedValue(fakeResponse({ body: [{ id: 1 }, { id: 2 }, { id: 3 }] }))

    const limited = await databaseClients.Message.list("", 2)
    expect(limited).toHaveLength(2)

    global.fetch.mockResolvedValue(fakeResponse({ body: [{ id: 1 }, { id: 2 }, { id: 3 }] }))
    const unlimited = await databaseClients.Message.list("", 0)
    expect(unlimited).toHaveLength(3)
  })

  it("query() omits the select param for '*' and includes where when given", async () => {
    global.fetch.mockResolvedValue(fakeResponse({ body: [] }))

    await databaseClients.WarrantyClaim.query("*", "approval_status=pending_approval")

    const [url] = global.fetch.mock.calls[0]
    expect(url).toBe("/api/data/WarrantyClaim?where=approval_status%3Dpending_approval")
  })

  it("update() PUTs to the collection/id path with the given body", async () => {
    global.fetch.mockResolvedValue(fakeResponse({ body: { id: "5", status: "withdrawn" } }))

    await databaseClients.WarrantyClaim.update("5", { status: "withdrawn" })

    const [url, init] = global.fetch.mock.calls[0]
    expect(url).toBe("/api/data/WarrantyClaim/5")
    expect(init.method).toBe("PUT")
    expect(JSON.parse(init.body)).toEqual({ status: "withdrawn" })
  })

  it("delete() DELETEs to the collection/id path and handles a 204 response", async () => {
    global.fetch.mockResolvedValue(fakeResponse({ status: 204 }))

    const result = await databaseClients.WarrantyClaim.delete("5")

    const [url, init] = global.fetch.mock.calls[0]
    expect(url).toBe("/api/data/WarrantyClaim/5")
    expect(init.method).toBe("DELETE")
    expect(result).toBeNull()
  })
})

describe("DatabaseClient#filter", () => {
  it("pushes a single filter down as a server-side 'where' param", async () => {
    global.fetch.mockResolvedValue(fakeResponse({ body: [{ site: "Site A" }] }))

    await databaseClients.WarrantyClaim.filter({ site: "Site A" })

    const [url] = global.fetch.mock.calls[0]
    expect(url).toBe("/api/data/WarrantyClaim?where=site%3DSite+A")
  })

  it("drops undefined/null filter values before deciding single vs multi-field", async () => {
    global.fetch.mockResolvedValue(fakeResponse({ body: [{ site: "Site A" }] }))

    await databaseClients.WarrantyClaim.filter({ site: "Site A", brand: undefined, resolution: null })

    const [url] = global.fetch.mock.calls[0]
    expect(url).toBe("/api/data/WarrantyClaim?where=site%3DSite+A")
  })

  it("filters client-side (AND across all fields) when more than one field is given", async () => {
    global.fetch.mockResolvedValue(
      fakeResponse({
        body: [
          { site: "Site A", brand: "Ford" },
          { site: "Site A", brand: "VW" },
          { site: "Site B", brand: "Ford" },
        ],
      })
    )

    const result = await databaseClients.WarrantyClaim.filter({ site: "Site A", brand: "Ford" })

    expect(result).toEqual([{ site: "Site A", brand: "Ford" }])
  })

  it("sorts multi-field results by orderBy and reverses when prefixed with '-'", async () => {
    global.fetch.mockResolvedValue(
      fakeResponse({
        body: [
          { site: "Site A", brand: "Ford", claimed_date: "2026-02-01" },
          { site: "Site A", brand: "Ford", claimed_date: "2026-05-01" },
          { site: "Site A", brand: "Ford", claimed_date: "2026-01-01" },
          { site: "Site A", brand: "VW", claimed_date: "2026-09-01" }, // excluded: wrong brand
        ],
      })
    )

    const result = await databaseClients.WarrantyClaim.filter(
      { site: "Site A", brand: "Ford" },
      "-claimed_date"
    )

    expect(result.map((r) => r.claimed_date)).toEqual(["2026-05-01", "2026-02-01", "2026-01-01"])
  })
})

describe("apiFetch error handling (exercised via public methods)", () => {
  it("throws the upstream error message on a non-ok response", async () => {
    global.fetch.mockResolvedValue(
      fakeResponse({ ok: false, status: 403, body: { error: "Forbidden" } })
    )

    await expect(databaseClients.User.get()).rejects.toThrow("Forbidden")
  })

  it("falls back to statusText when the error body isn't valid JSON", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      headers: { get: () => "text/plain" },
      text: async () => "not json",
      json: async () => {
        throw new Error("not json")
      },
    })

    await expect(databaseClients.User.get()).rejects.toThrow("Internal Server Error")
  })

  it("converts an AbortError into a clear timeout message", async () => {
    global.fetch.mockRejectedValue(Object.assign(new Error("aborted"), { name: "AbortError" }))

    await expect(databaseClients.WarrantyClaim.get()).rejects.toThrow(
      "Request timed out. Please check your connection and try again."
    )
  })

  it("returns null for an empty body instead of throwing on JSON.parse", async () => {
    global.fetch.mockResolvedValue(fakeResponse({ status: 200, body: null }))

    const result = await databaseClients.WarrantyClaim.get()

    expect(result).toBeNull()
  })
})
