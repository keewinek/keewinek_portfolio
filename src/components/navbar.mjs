import { html } from "../lib/html.mjs";
import { CloseIcon, DiscordIcon, MenuIcon } from "./icons.mjs";

const LINKS = [
	{ label: "About Me", href: "/#about_me" },
	{ label: "Skills", href: "/#skills" },
	{ label: "Projects", href: "/projects" },
	{ label: "Contact", href: "/#contact" },
];

export function navbar(currentPath = "/") {
	const isActive = (href) => href === "/projects" && currentPath.startsWith("/projects");
	const mobileLinks = [...LINKS, { label: "Discord Server", href: "/discord" }];

	return html`
		<header class="group/nav fixed inset-x-0 top-0 z-nav" data-nav data-open="false">
			<div class="border-b border-line/60 bg-ink/75 backdrop-blur-xl">
				<nav class="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8" aria-label="Main">
					<a href="/" class="group flex items-center gap-3 no-underline" aria-label="keewinek, home">
						<img
							src="/logo-128.png"
							alt=""
							width="32"
							height="32"
							class="h-8 w-8 object-contain transition-transform duration-500 ease-out-expo group-hover:-rotate-12"
						/>
						<span class="font-display text-xl font-bold tracking-tight text-fg">keewinek</span>
					</a>

					<div class="hidden items-center gap-1 lg:flex">
						${LINKS.map((link) => html`
							<a
								href="${link.href}"
								${isActive(link.href) ? html`aria-current="page"` : ""}
								class="rounded-full px-4 py-2 text-[15px] transition-colors duration-200 hover:text-fg ${isActive(link.href) ? "text-fg" : "text-muted"}"
							>${link.label}</a>
						`)}
						<a
							href="/discord"
							target="_blank"
							class="ml-3 inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors duration-200 hover:border-fg/40 hover:text-fg"
						>
							${DiscordIcon("h-4 w-4")}
							Discord Server
						</a>
					</div>

					<button
						type="button"
						data-menu-toggle
						class="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface lg:hidden"
						aria-label="Open menu"
						aria-expanded="false"
						aria-controls="mobile-menu"
					>
						<span class="group-data-[open=true]/nav:hidden">${MenuIcon("h-6 w-6")}</span>
						<span class="hidden group-data-[open=true]/nav:inline">${CloseIcon("h-6 w-6")}</span>
					</button>
				</nav>
			</div>

			<!-- Mobile menu: full-screen sheet under the bar. -->
			<div
				id="mobile-menu"
				class="invisible pointer-events-none fixed inset-x-0 bottom-0 top-16 z-menu bg-ink opacity-0 transition-[opacity,visibility] duration-300 group-data-[open=true]/nav:visible group-data-[open=true]/nav:pointer-events-auto group-data-[open=true]/nav:opacity-100 lg:hidden"
			>
				<div class="flex h-full flex-col justify-between px-6 pb-10 pt-8">
					<ul class="space-y-1">
						${mobileLinks.map((link, i) => html`
							<li
								class="translate-y-4 opacity-0 transition-all duration-500 ease-out-expo group-data-[open=true]/nav:translate-y-0 group-data-[open=true]/nav:opacity-100"
								style="--i: ${i}"
							>
								<a
									href="${link.href}"
									${link.href === "/discord" ? html`target="_blank"` : ""}
									data-menu-link
									class="block py-2 font-display text-4xl font-bold tracking-tight text-fg transition-colors hover:text-red"
								>${link.label}</a>
							</li>
						`)}
					</ul>
					<a href="mailto:keewinek@gmail.com" class="text-muted transition-colors hover:text-fg">keewinek@gmail.com</a>
				</div>
			</div>
		</header>
	`;
}
