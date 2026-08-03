import { currentUser } from './currentUser';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001';
const DEFAULT_TIMEOUT_MS = 15000;

// Internal fetch helper
async function apiFetch(path, { timeoutMs = DEFAULT_TIMEOUT_MS, ...options } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
      signal: controller.signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection and try again.');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `API error ${res.status}`);
  }
  // DELETE returns 204 with an empty body; res.json() would throw on it
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// DatabaseClient
class DatabaseClient {
  constructor(fileName) {
    this.fileName = fileName;
  }

  // POST /<collection>
  async create(data) {
    const userData = await currentUser.me();
    data.created_by       = userData?.email ?? 'Unknown';
    data.created_by_id    = userData?.id    ?? null;
    // created_date / updated_date / id are set by the API
    return apiFetch(`/${this.fileName}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // GET /<collection>
  async get() {
    return apiFetch(`/${this.fileName}`);
  }

  // GET /<collection> sorted by a field, limited to `limit` records.
  // orderBy: "field" for ascending, "-field" for descending (e.g. "-created_date")
  async list(orderBy = '', limit) {
    const data = await apiFetch(`/${this.fileName}`);
    if (orderBy) {
      const desc = orderBy.startsWith('-');
      const field = desc ? orderBy.slice(1) : orderBy;
      data.sort((a, b) => {
        const av = a[field], bv = b[field];
        if (av == null) return 1;
        if (bv == null) return -1;
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return desc ? -cmp : cmp;
      });
    }
    return Number.isInteger(limit) && limit > 0 ? data.slice(0, limit) : data;
  }

  // PUT /<collection>/<id>
  async update(id, data) {
    return apiFetch(`/${this.fileName}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE /<collection>/<id>
  async delete(id) {
    return apiFetch(`/${this.fileName}/${id}`, { method: 'DELETE' });
  }

  // GET /<collection>?select=...&where=...
  async query(select = '*', where = '') {
    const params = new URLSearchParams();
    if (select !== '*') params.set('select', select);
    if (where)          params.set('where', where);
    const qs = params.toString() ? `?${params}` : '';
    return apiFetch(`/${this.fileName}${qs}`);
  }

  // GET /<collection>?where=key=value&order_by=field  (multi-field filter)
  async filter(filterBy, orderBy = '') {
    // The API supports a single `where` param, so we fetch all and filter
    // client-side for multi-field cases.  For single-field callers this still
    // hits the server-side filter first, reducing payload.
    const entries = Object.entries(filterBy).filter(
      ([, v]) => v !== undefined && v !== null
    );

    let url = `/${this.fileName}`;
    const params = new URLSearchParams();

    if (entries.length === 1) {
      params.set('where', `${entries[0][0]}=${entries[0][1]}`);
    }

    // Check to see if order by has a - in front. If it does, reverse the list
    const reversed = orderBy.startsWith('-');
    const orderField = reversed ? orderBy.slice(1) : orderBy;

    if (orderBy) params.set('order_by', orderField);

    const qs = params.toString() ? `?${params}` : '';
    let data = await apiFetch(`${url}${qs}`);

    // Client-side pass for remaining fields when more than one filter
    if (entries.length > 1) {
      data = data.filter((item) =>
        entries.every(([k, v]) => String(item[k] ?? '') === String(v))
      );
      if (orderBy) {
        data.sort((a, b) => {
          const av = a[orderField], bv = b[orderField];
          if (av == null) return 1;
          if (bv == null) return -1;
          return av < bv ? -1 : av > bv ? 1 : 0;
        });
      }
    }

    return reversed ? data.reverse() : data;
  }
}

// DatabaseClients registry — same shape as before
class DatabaseClients {
  /** @type {DatabaseClient} */ Alert;
  /** @type {DatabaseClient} */ AlertResolution;
  /** @type {DatabaseClient} */ Brand;
  /** @type {DatabaseClient} */ ClaimAudit;
  /** @type {DatabaseClient} */ ClaimNote;
  /** @type {DatabaseClient} */ PendingUserInvite;
  /** @type {DatabaseClient} */ User;
  /** @type {DatabaseClient} */ WarrantyClaim;
  /** @type {DatabaseClient} */ Site;
  /** @type {DatabaseClient} */ Message;
  /** @type {DatabaseClient} */ MessageRead;

  constructor() {
    const fileNames = [
      'Alert', 'AlertResolution', 'Brand', 'ClaimAudit', 'ClaimNote',
      'PendingUserInvite', 'User', 'WarrantyClaim', 'Site', 'Message', 'MessageRead',
    ];
    fileNames.forEach((name) => {
      this[name] = new DatabaseClient(name);
    });
  }
}

export const databaseClients = new DatabaseClients();