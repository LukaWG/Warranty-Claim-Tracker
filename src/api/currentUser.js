import { authClient } from '../lib/auth-client';
import { normalizeUser } from '../lib/normalizeUser';

class CurrentUserClient {
  async me() {
    const session = await authClient.getSession();
    const authUser = session?.data?.user;

    return normalizeUser(authUser);
  }
}

export const currentUser = new CurrentUserClient();
