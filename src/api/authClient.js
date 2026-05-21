const BASE = "/api/auth";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let errMsg = "";
    try {
      const parsed = JSON.parse(text);
      errMsg = parsed.message || parsed.error || parsed.error_description || "";
    } catch (e) {
      errMsg = text;
    }
    throw new Error(errMsg || `Auth API error: ${res.status}`);
  }
  return res.json();
}

export const authUsers = {
  list: () =>
    request("/admin/list-users", { method: "GET" })
      .then((r) => {
        const users = r.users ?? [];
        return users.map((u) => ({
          ...u,
          first_name: u.firstName ?? u.first_name ?? "",
          last_name: u.lastName ?? u.last_name ?? "",
          custom_role: u.customRole ?? u.custom_role ?? "Processor",
          default_site: u.defaultSite ?? u.default_site ?? "",
          created_date: u.createdAt ?? u.created_date ?? null,
          must_change_password: u.mustChangePassword ?? u.must_change_password ?? false,
        }));
      }),

  update: (userId, data) => {
    const mappedData = { ...data };
    if (data.first_name !== undefined) {
      mappedData.firstName = data.first_name;
      delete mappedData.first_name;
    }
    if (data.last_name !== undefined) {
      mappedData.lastName = data.last_name;
      delete mappedData.last_name;
    }
    if (data.custom_role !== undefined) {
      mappedData.customRole = data.custom_role;
      delete mappedData.custom_role;

      // Keep platform role in sync
      mappedData.role = ["Owner", "Service Manager", "Admin Manager", "Admin"].includes(data.custom_role)
        ? "admin"
        : "user";
    }
    if (data.default_site !== undefined) {
      mappedData.defaultSite = data.default_site;
      delete mappedData.default_site;
    }
    if (data.must_change_password !== undefined) {
      mappedData.mustChangePassword = data.must_change_password;
      delete mappedData.must_change_password;
    }
    return request("/admin/update-user", {
      method: "POST",
      body: JSON.stringify({ userId, data: mappedData }),
    });
  },

  delete: (userId) =>
    request("/admin/remove-user", {
      method: "POST",
      body: JSON.stringify({ userId }),
    }),

  invite: ({ email, first_name, last_name, custom_role, default_site }) => {
    const platformRole = ["Owner", "Service Manager", "Admin Manager", "Admin"].includes(custom_role)
      ? "admin"
      : "user";

    return request("/admin/create-user", {
      method: "POST",
      body: JSON.stringify({
        email,
        name: `${first_name} ${last_name}`.trim(),
        password: crypto.randomUUID(), // throwaway — user resets via forgot password
        role: platformRole,
        firstName: first_name,
        lastName: last_name,
        customRole: custom_role ?? "Processor",
        defaultSite: default_site ?? null,
      }),
    });
  },

  resetPassword: (userId, newPassword) =>
    request("/admin/set-user-password", {
      method: "POST",
      body: JSON.stringify({ userId, newPassword }),
    }),

  updateMe: (data) => {
    const mappedData = { ...data };
    if (data.must_change_password !== undefined) {
      mappedData.mustChangePassword = data.must_change_password;
      delete mappedData.must_change_password;
    }
    return request("/update-user", {
      method: "POST",
      body: JSON.stringify(mappedData),
    });
  },
};