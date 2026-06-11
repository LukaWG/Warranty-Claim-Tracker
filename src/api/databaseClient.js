import { authClient } from '../lib/auth-client';

// ---------------------------------------------------------------------------
// Config — set NEXT_PUBLIC_API_URL in your .env.local
// ---------------------------------------------------------------------------
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const ACTING_USER_STORAGE_KEY = 'actingUserId';

function loadActingUserId() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTING_USER_STORAGE_KEY);
}

function saveActingUserId(userId) {
  if (typeof window === 'undefined') return;
  if (userId === null || typeof userId === 'undefined') {
    localStorage.removeItem(ACTING_USER_STORAGE_KEY);
  } else {
    localStorage.setItem(ACTING_USER_STORAGE_KEY, String(userId));
  }
  window.dispatchEvent(new Event('acting-user-changed'));
}

let actingUserId = loadActingUserId();

// ---------------------------------------------------------------------------
// Internal fetch helper
// ---------------------------------------------------------------------------
async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `API error ${res.status}`);
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// DatabaseClient
// ---------------------------------------------------------------------------
class DatabaseClient {
  constructor(fileName) {
    this.fileName = fileName;
  }

  // POST /<collection>
  async create(data) {
    const userData = await databaseClients.User.me();
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
    if (orderBy) params.set('order_by', orderBy);

    const qs = params.toString() ? `?${params}` : '';
    let data = await apiFetch(`${url}${qs}`);

    // Client-side pass for remaining fields when more than one filter
    if (entries.length > 1) {
      data = data.filter((item) =>
        entries.every(([k, v]) => String(item[k] ?? '') === String(v))
      );
      if (orderBy) {
        data.sort((a, b) => {
          const av = a[orderBy], bv = b[orderBy];
          if (av == null) return 1;
          if (bv == null) return -1;
          return av < bv ? -1 : av > bv ? 1 : 0;
        });
      }
    }

    return data;
  }

  // --- User-only helpers ---

  async me() {
    if (this.fileName !== 'User') throw new Error('me() is only available on the User client');
    const session = await authClient.getSession();
    const authUser = session?.data?.user;
    if (!authUser) return null;
    return {
      id:                  authUser.id,
      email:               authUser.email,
      first_name:          authUser.firstName  ?? authUser.name?.split(' ')[0] ?? 'User',
      last_name:           authUser.lastName   ?? authUser.name?.split(' ')[1] ?? '',
      full_name:           authUser.name       ?? `${authUser.firstName ?? ''} ${authUser.lastName ?? ''}`.trim() ?? 'User',
      custom_role:         authUser.customRole ?? 'Processor',
      role:                authUser.role       ?? 'user',
      must_change_password: authUser.mustChangePassword ?? authUser.must_change_password ?? false,
      default_brands:      authUser.defaultBrands ?? authUser.default_brands ?? [],
      default_site:        authUser.defaultSite  ?? authUser.default_site  ?? null,
    };
  }

  setTestingUser(userId) {
    if (this.fileName !== 'User') throw new Error('setTestingUser() is only available on the User client');
    actingUserId = userId;
    saveActingUserId(userId);
  }

  clearTestingUser() {
    if (this.fileName !== 'User') throw new Error('clearTestingUser() is only available on the User client');
    actingUserId = null;
    saveActingUserId(null);
  }

  getActingUserId() {
    if (this.fileName !== 'User') throw new Error('getActingUserId() is only available on the User client');
    return actingUserId;
  }
}

// ---------------------------------------------------------------------------
// DatabaseClients registry — same shape as before
// ---------------------------------------------------------------------------
class DatabaseClients {
  constructor() {
    const fileNames = [
      'Alert', 'AlertResolution', 'Brand', 'ClaimAudit', 'ClaimNote',
      'PendingUserInvite', 'User', 'WarrantyClaim', 'Site',
    ];
    fileNames.forEach((name) => {
      this[name] = new DatabaseClient(name);
    });
  }
}

export const databaseClients = new DatabaseClients();