// Resolves a display name for a user's email, falling back through allUsers,
// then currentUser (in case the email belongs to the logged-in user), then the email itself.
export function getUserName(email, allUsers, currentUser) {
  if (!email) return "—";

  const user = allUsers.find(u => u.email === email);
  if (user) {
    if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
    if (user.first_name) return user.first_name;
    if (user.full_name) return user.full_name;
  }

  if (currentUser && currentUser.email === email) {
    const fn = currentUser.first_name || currentUser.data?.first_name;
    const ln = currentUser.last_name || currentUser.data?.last_name;
    if (fn && ln) return `${fn} ${ln}`;
    if (fn) return fn;
    if (currentUser.full_name) return currentUser.full_name;
  }

  return email;
}
