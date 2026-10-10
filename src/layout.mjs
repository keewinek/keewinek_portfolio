import { html } from "./lib/html.mjs";
import { navbar } from "./components/navbar.mjs";
import { siteFooter } from "./components/footer.mjs";

const DESCRIPTION =
	"keewinek (Wojtek) is a developer from Warsaw building web apps, mobile apps and games. See his projects and get in touch.";

/** Absolute origin for og:image; Netlify exposes it as URL at build time. Falls back to a relative path. */
const ORIGIN = (process.env.URL ?? "").replace(/\/$/, "");

/** Wraps page content in the shared document shell. Returns a full HTML string. */
export function layout({ title, ogTitle, description = DESCRIPTION, ogImage = "/src/thumbnails/studdly/1.jpg", path = "/", body }) {
	return "<!doctype html>\n" + html`
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<script>document.documentElement.classList.add("js")</script>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>${title}</title>
		<meta name="description" content="${description}" />
		<meta name="theme-color" content="#0c0c0e" />
		<meta property="og:type" content="website" />
		<meta property="og:site_name" content="keewinek" />
		<meta property="og:title" content="${ogTitle ?? title}" />
		<meta property="og:description" content="${description}" />
		<meta property="og:image" content="${ORIGIN}${ogImage}" />
		<meta name="twitter:card" content="summary_large_image" />

		<link rel="preload" href="/fonts/bricolage-grotesque-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
		<link rel="preload" href="/fonts/geist-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
		<link rel="stylesheet" href="/styles.css" />

		<link rel="icon" href="/favicon.png" sizes="32x32" />
		<link rel="icon" href="/logo.png" sizes="any" />
		<link rel="apple-touch-icon" href="/logo.png" />
	</head>
	<body class="overflow-x-hidden bg-ink text-fg">
		<a
			href="#main"
			class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-grain focus:rounded-full focus:bg-red focus:px-4 focus:py-2 focus:text-ink"
		>Skip to content</a>
		${navbar(path)}
		<main id="main">${body}</main>
		${siteFooter()}
		<script src="/js/site.js" defer></script>
	</body>
</html>
`.value;
}
