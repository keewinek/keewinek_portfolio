// Tiny static server for dist/ that mimics Netlify (pretty URLs, /discord redirect, 404.html).
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const dist = join(import.meta.dirname, "dist");
const port = Number(process.env.PORT ?? 8888);
const TYPES = {
	".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json",
	".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml",
	".woff2": "font/woff2", ".mp4": "video/mp4", ".webm": "video/webm",
};

createServer((req, res) => {
	const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
	if (path === "/discord") {
		res.writeHead(302, { Location: "https://discord.gg/VCsGp8xCtf" }).end();
		return;
	}
	let file = normalize(join(dist, path));
	if (!file.startsWith(dist)) file = join(dist, "404.html");
	if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
	const found = existsSync(file);
	if (!found) file = join(dist, "404.html");
	res.writeHead(found ? 200 : 404, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" });
	res.end(readFileSync(file));
}).listen(port, () => console.log(`http://localhost:${port}`));
