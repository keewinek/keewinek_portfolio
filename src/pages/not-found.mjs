import { html } from "../lib/html.mjs";
import { layout } from "../layout.mjs";
import { button } from "../components/button.mjs";
import { ArrowRightIcon } from "../components/icons.mjs";

export function notFoundPage() {
	return layout({
		title: "404 - Page not found",
		path: "/404",
		body: html`
			<div class="mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col items-start justify-center px-4 pt-16 md:px-8">
				<h1 class="rise font-display text-[clamp(7rem,28vw,20rem)] font-extrabold leading-[0.85] tracking-[-0.06em]">
					4<span class="text-red">0</span>4
				</h1>
				<p class="rise mt-8 max-w-[40ch] text-xl text-muted" style="--d: 120ms">
					This page doesn't exist. Maybe it was a project that got renamed.
				</p>
				<div class="rise mt-10 flex flex-wrap gap-3" style="--d: 220ms">
					${button({ href: "/", size: "lg", label: "Go back home", icon: ArrowRightIcon("h-4 w-4") })}
					${button({ href: "/projects", size: "lg", variant: "secondary", label: "All projects" })}
				</div>
			</div>
		`,
	});
}
