import { DiscordIcon, MailIcon } from "./Icons.tsx";

export default function SiteFooter() {
	return (
		<footer class="border-t border-line/60">
			<div class="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
				<a href="/" class="flex items-center gap-3">
					<img src="/logo-128.png" alt="" width={28} height={28} class="h-7 w-7 object-contain" loading="lazy" />
					<span class="font-display text-lg font-bold tracking-tight">keewinek</span>
				</a>
				<div class="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
					<a href="/projects" class="transition-colors hover:text-fg">Projects</a>
					<a href="mailto:keewinek@gmail.com" class="inline-flex items-center gap-2 transition-colors hover:text-fg">
						<MailIcon class="h-4 w-4" />
						keewinek@gmail.com
					</a>
					<a href="/discord" target="_blank" class="inline-flex items-center gap-2 transition-colors hover:text-fg">
						<DiscordIcon class="h-4 w-4" />
						Discord Server
					</a>
					<span class="text-subtle">&copy; {new Date().getFullYear()} keewinek</span>
				</div>
			</div>
		</footer>
	);
}
