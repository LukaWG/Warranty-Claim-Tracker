// Raw TCP-level TLS termination in front of the plain-HTTP Next.js server
// (server.js) running in the same container. Deliberately protocol-agnostic
// (net/tls only, no HTTP parsing) so it transparently forwards keep-alive
// and any future websocket traffic, not just single request/response pairs.
import fs from "fs"
import net from "net"
import tls from "tls"

const listenPort = Number(process.env.HTTPS_PORT || 443)
const backendPort = Number(process.env.PORT || 3000)
const certFile = process.env.SSL_CERT_FILE || "/app/certs/cert.pem"
const keyFile = process.env.SSL_KEY_FILE || "/app/certs/key.pem"

const options = {
  cert: fs.readFileSync(certFile),
  key: fs.readFileSync(keyFile),
}

const server = tls.createServer(options, (tlsSocket) => {
  const backend = net.connect(backendPort, "127.0.0.1")
  tlsSocket.pipe(backend)
  backend.pipe(tlsSocket)

  const closeBoth = () => {
    tlsSocket.destroy()
    backend.destroy()
  }
  tlsSocket.on("error", closeBoth)
  backend.on("error", closeBoth)
})

server.listen(listenPort, "0.0.0.0", () => {
  console.log(`tls-proxy: listening on ${listenPort}, forwarding to 127.0.0.1:${backendPort}`)
})
