const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const MISTRAL_API_KEY = (process.env.MISTRAL_API_KEY || "psSBMGycU85IpFADHsRD3ULbH2e1wUYR")
  .trim()
  .replace(/[\u200B-\u200D\uFEFF]/g, ""); // strip zero-width space/joiner/BOM artifacts from copy-paste
const MISTRAL_MODEL = (process.env.MISTRAL_MODEL || "mistral-large-latest").trim();
const PORT = 3000;

if (!MISTRAL_API_KEY || MISTRAL_API_KEY === "YOUR_MISTRAL_API_KEY_HERE") {
  console.warn("⚠️  MISTRAL_API_KEY is not set. Requests to /api/analyze will fail until you set it.");
} else {
  const badChars = [...MISTRAL_API_KEY]
    .map((ch, i) => ({ i, code: ch.codePointAt(0) }))
    .filter(c => (c.code < 0x20 && c.code !== 0x09) || c.code === 0x7f || c.code > 0xff);
  if (badChars.length) {
    console.warn(
      `⚠️  MISTRAL_API_KEY (length ${MISTRAL_API_KEY.length}) contains ${badChars.length} character(s) ` +
      `that are invalid in HTTP headers, at position(s): ${badChars.map(c => `${c.i} (code ${c.code})`).join(", ")}. ` +
      `Re-copy the key directly from console.mistral.ai without retyping or pasting through a rich-text editor.`
    );
  }
}

process.on("uncaughtException", err => {
  console.error("Uncaught exception (server kept running):", err);
});

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    const file = fs.readFileSync(path.join(__dirname, "index.html"));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(file);
    return;
  }

  if (req.method === "POST" && req.url === "/api/analyze") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      let payload;
      try {
        payload = JSON.parse(body);
      } catch (err) {
        console.error("Failed to parse request body:", err.message);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: { message: "Invalid JSON in request body" } }));
        return;
      }

      // Build Mistral chat completions request body.
      // `payload.messages` is built client-side as [{role, content}, ...]
      // where content can be a string or an array of {type:"text"|"document_url", ...} parts.
      const mistralBody = JSON.stringify({
        model: MISTRAL_MODEL,
        messages: payload.messages,
        temperature: 0.4,
        max_tokens: 2048,
        response_format: { type: "json_object" },
      });

      const options = {
        hostname: "api.mistral.ai",
        path: "/v1/chat/completions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${MISTRAL_API_KEY}`,
          "Content-Length": Buffer.byteLength(mistralBody),
        },
      };

      let proxyReq;
      try {
        proxyReq = https.request(options, proxyRes => {
          let responseBody = "";
          proxyRes.on("data", chunk => (responseBody += chunk));
          proxyRes.on("end", () => {
            res.writeHead(proxyRes.statusCode, { "Content-Type": "application/json" });
            res.end(responseBody);
          });
        });
      } catch (err) {
        // Thrown synchronously, e.g. ERR_INVALID_CHAR if MISTRAL_API_KEY has
        // a stray newline/whitespace or other invalid header character.
        console.error("Failed to build request to Mistral API:", err.message);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          error: { message: `Could not send request to Mistral API: ${err.message}. Check that MISTRAL_API_KEY has no extra whitespace/newlines.` }
        }));
        return;
      }

      proxyReq.on("error", err => {
        console.error("Error contacting Mistral API:", err.message);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: { message: err.message } }));
      });

      proxyReq.write(mistralBody);
      proxyReq.end();
    });
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`\n✅ Pitch Deck Evaluator running at http://localhost:${PORT}\n`);
});
