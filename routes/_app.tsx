import { type PageProps } from "$fresh/server.ts";
import NavBar from "../islands/NavBar.tsx";
import SiteFooter from "../components/SiteFooter.tsx";

const DESCRIPTION =
	"keewinek (Wojtek) is a developer from Warsaw building web apps, mobile apps and games. See his projects and get in touch.";

export default function App({ Component, url }: PageProps) {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content={DESCRIPTION} />
				<meta name="theme-color" content="#0c0c0e" />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="keewinek" />
				<meta property="og:description" content={DESCRIPTION} />
				<meta property="og:image" content={`${url.origin}/src/thumbnails/studdly/1.jpg`} />
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
				>
					Skip to content
				</a>
				<NavBar currentPath={url.pathname} />
				<main id="main">
					<Component />
				</main>
				<SiteFooter />
				<script src="/js/reveal-on-scroll.js" defer></script>
			</body>
		</html>
	);
}
