const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";

// crypto.getRandomValues works in any context (unlike crypto.randomUUID, which
// requires HTTPS) — this app is often reached over plain HTTP on the LAN.
export function generatePassword(length = 12) {
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, (n) => CHARS[n % CHARS.length]).join("");
}
