import { useEffect, useState } from "preact/hooks";
import { CloseIcon, DiscordIcon, MenuIcon } from "../components/Icons.tsx";

const LINKS = [
	{ label: "About Me", href: "/#about_me" },
	{ label: "Skills", href: "/#skills" },
	{ label: "Projects", href: "/projects" },
	{ label: "Contact", href: "/#contact" },
];

export default function NavBar({ currentPath = "/" }: { currentPath?: string }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Lock page scroll and allow Escape while the mobile menu is open.
	useEffect(() => {
		if (!isMenuOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsMenuOpen(false);
		};
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", onKey);
		};
	}, [isMenuOpen]);

	const isActive = (href: string) => href === "/projects" && currentPath.startsWith("/projects");

	return (
		<header class="fixed inset-x-0 top-0 z-nav">
			<div class="border-b border-line/60 bg-ink/75 backdrop-blur-xl">
				<nav class="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8" aria-label="Main">
					<a href="/" class="group flex items-center gap-3 no-underline" aria-label="keewinek, home">
						<img
							src="/logo-128.png"
							alt=""
							width={32}
							height={32}
							class="h-8 w-8 object-contain transition-transform duration-500 ease-out-expo group-hover:-rotate-12"
						/>
						<span class="font-display text-xl font-bold tracking-tight text-fg">keewinek</span>
					</a>

					<div class="hidden items-center gap-1 lg:flex">
						{LINKS.map((link) => (
							<a
								key={link.href}
								href={link.href}
								aria-current={isActive(link.href) ? "page" : undefined}
								class={`rounded-full px-4 py-2 text-[15px] transition-colors duration-200 hover:text-fg ${
									isActive(link.href) ? "text-fg" : "text-muted"
								}`}
							>
								{link.label}
							</a>
						))}
						<a
							href="/discord"
							target="_blank"
							class="ml-3 inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors duration-200 hover:border-fg/40 hover:text-fg"
						>
							<DiscordIcon class="h-4 w-4" />
							Discord Server
						</a>
					</div>

					<button
						type="button"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						class="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface lg:hidden"
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						aria-expanded={isMenuOpen}
						aria-controls="mobile-menu"
					>
						{isMenuOpen ? <CloseIcon class="h-6 w-6" /> : <MenuIcon class="h-6 w-6" />}
					</button>
				</nav>
			</div>

			{/* Mobile menu: full-screen sheet under the bar. */}
			<div
				id="mobile-menu"
				class={`fixed inset-x-0 bottom-0 top-16 z-menu bg-ink transition-opacity duration-300 lg:hidden ${
					isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
				}`}
				hidden={!isMenuOpen}
			>
				<div class="flex h-full flex-col justify-between px-6 pb-10 pt-8">
					<ul class="space-y-1">
						{[...LINKS, { label: "Discord Server", href: "/discord" }].map((link, i) => (
							<li
								key={link.href}
								class={`transition-all duration-500 ease-out-expo ${
									isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
								}`}
								style={{ transitionDelay: `${isMenuOpen ? 60 + i * 50 : 0}ms` }}
							>
								<a
									href={link.href}
									target={link.href === "/discord" ? "_blank" : undefined}
									onClick={() => setIsMenuOpen(false)}
									class="block py-2 font-display text-4xl font-bold tracking-tight text-fg transition-colors hover:text-red"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
					<a href="mailto:keewinek@gmail.com" class="text-muted transition-colors hover:text-fg">
						keewinek@gmail.com
					</a>
				</div>
			</div>
		</header>
	);
}
