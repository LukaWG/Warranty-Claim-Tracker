export function normalizeUser(rawUser) {
  if (!rawUser) return null;

  const firstName = rawUser.firstName ?? rawUser.first_name ?? rawUser.name?.split(' ')[0] ?? 'User';
  const lastName = rawUser.lastName ?? rawUser.last_name ?? rawUser.name?.split(' ')[1] ?? '';

  return {
    ...rawUser,
    first_name: firstName,
    last_name: lastName,
    full_name: rawUser.name ?? `${firstName} ${lastName}`.trim() ?? 'User',
    custom_role: rawUser.customRole ?? rawUser.custom_role ?? 'Location',
    default_site: rawUser.defaultSite ?? rawUser.default_site ?? null,
    default_brands: rawUser.defaultBrands ?? rawUser.default_brands ?? [],
    must_change_password: rawUser.mustChangePassword ?? rawUser.must_change_password ?? false,
    created_date: rawUser.createdAt ?? rawUser.created_date ?? null,
  };
}
