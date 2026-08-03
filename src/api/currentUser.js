import { authClient } from '../lib/auth-client';
import { normalizeUser } from '../lib/normalizeUser';

const SESSION_TIMEOUT_MS = 15000;

class CurrentUserClient {
  async me() {
    const session = await Promise.race([
      authClient.getSession(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out. Please check your connection and try again.')), SESSION_TIMEOUT_MS)
      ),
    ]);
    const authUser = session?.data?.user;

    return normalizeUser(authUser);
  }
}

export const currentUser = new CurrentUserClient();
