import { authClient } from '../lib/auth-client';

class CurrentUserClient {
  async me() {
    const session = await authClient.getSession();
    const authUser = session?.data?.user;

    if (!authUser) return null;

    return {
      id:                  authUser.id,
      email:               authUser.email,
      first_name:          authUser.firstName  ?? authUser.name?.split(' ')[0] ?? 'User',
      last_name:           authUser.lastName   ?? authUser.name?.split(' ')[1] ?? '',
      full_name:           authUser.name       ?? `${authUser.firstName ?? ''} ${authUser.lastName ?? ''}`.trim() ?? 'User',
      custom_role:         authUser.customRole ?? 'Location',
      role:                authUser.role       ?? 'user',
      must_change_password: authUser.mustChangePassword ?? authUser.must_change_password ?? false,
      default_brands:      authUser.defaultBrands ?? authUser.default_brands ?? [],
      default_site:        authUser.defaultSite  ?? authUser.default_site  ?? null,
    };
  }
}

export const currentUser = new CurrentUserClient();
