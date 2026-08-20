#!/bin/sh
# Generates a self-signed TLS cert/key into $SSL_CERT_DIR (a Docker volume)
# on first boot, so it persists across container restarts and browsers only
# see one cert-trust warning per SSL_CERT_HOSTS change. Re-run by removing
# the ssl_certs volume.
set -eu

CERT_DIR="${SSL_CERT_DIR:-/app/certs}"
CERT_FILE="${SSL_CERT_FILE:-$CERT_DIR/cert.pem}"
KEY_FILE="${SSL_KEY_FILE:-$CERT_DIR/key.pem}"
HOSTS="${SSL_CERT_HOSTS:-localhost,127.0.0.1,192.168.1.144,lukas-mbp.local}"

if [ -f "$CERT_FILE" ] && [ -f "$KEY_FILE" ]; then
  echo "gen-self-signed-cert: reusing existing cert at $CERT_FILE"
  exit 0
fi

mkdir -p "$CERT_DIR"

SAN=$(echo "$HOSTS" | awk -F',' '{
  out = ""
  for (i = 1; i <= NF; i++) {
    h = $i
    gsub(/^[ \t]+|[ \t]+$/, "", h)
    if (h == "") continue
    if (h ~ /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/) {
      out = out (out == "" ? "" : ",") "IP:" h
    } else {
      out = out (out == "" ? "" : ",") "DNS:" h
    }
  }
  print out
}')

openssl req -x509 -newkey rsa:2048 -nodes -days 3650 \
  -keyout "$KEY_FILE" -out "$CERT_FILE" \
  -subj "/CN=warranty-claim-tracker" \
  -addext "subjectAltName=$SAN"

echo "gen-self-signed-cert: generated cert at $CERT_FILE (SAN=$SAN)"
