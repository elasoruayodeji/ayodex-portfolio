import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".mp4": "video/mp4",
  ".json": "application/json",
};

http
  .createServer((req, res) => {
    const u = decodeURIComponent((req.url || "/").split("?")[0]);
    const candidates = [path.join(root, u), path.join(root, u + ".html"), path.join(root, u, "index.html")];
    const file = candidates.find((c) => {
      try {
        return fs.statSync(c).isFile();
      } catch {
        return false;
      }
    });
    if (!file) {
      res.writeHead(404, { "content-type": "text/html" });
      const nf = path.join(root, "404.html");
      res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : "not found");
      return;
    }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(3200, () => console.log("up"));
