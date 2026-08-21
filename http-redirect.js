// Plain-HTTP listener whose only job is redirecting to HTTPS (tls-proxy.js
// on 443). Kept separate from tls-proxy.js since that one is a raw TCP
// passthrough and can't itself speak HTTP to issue a redirect.
import http from "http"

const listenPort = Number(process.env.HTTP_PORT || 80)

const server = http.createServer((req, res) => {
  const host = req.headers.host || "localhost"
  res.writeHead(308, { Location: `https://${host}${req.url}` })
  res.end()
})

server.listen(listenPort, "0.0.0.0", () => {
  console.log(`http-redirect: listening on ${listenPort}, redirecting to https`)
})
