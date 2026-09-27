import LanguageIcon from "../LanguageIcon.tsx";
import { languages, projectsUsing } from "../../lib/projects.ts";

const GROUPS = [
	{ type: "back-end", title: "Back-end" },
	{ type: "front-end", title: "Front-end" },
	{ type: "games", title: "Games" },
	{ type: "games-assets", title: "Game assets" },
];

export default function Skills() {
	return (
		<section id="skills" class="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-24 md:px-8 md:py-32">
			<h2 class="reveal-on-scroll font-display text-5xl font-extrabold tracking-[-0.04em] md:text-7xl">
				Coding skills
			</h2>

			<div class="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:mt-16 md:grid-cols-2 xl:grid-cols-4">
				{GROUPS.map((group, gi) => {
					const items = languages
						.filter((l) => l.type === group.type)
						.map((l) => ({ language: l, count: projectsUsing(l.id) }))
						.sort((a, b) => b.count - a.count);
					if (!items.length) return null;

					return (
						<div key={group.type} class="reveal-on-scroll border-t border-line pt-6" style={{ "--i": gi }}>
							<h3 class="font-display text-2xl font-bold tracking-tight">{group.title}</h3>
							<ul class="mt-6 space-y-5">
								{items.map(({ language, count }) => (
									<li key={language.id} class="group flex items-center gap-4">
										<span class="grid h-12 w-12 shrink-0 place-items-center rounded-field bg-surface text-muted transition-colors duration-300 group-hover:text-red">
											<LanguageIcon language={language} class="h-6 w-6" />
										</span>
										<div class="min-w-0">
											<a
												href={language.url}
												target="_blank"
												rel="noopener noreferrer"
												class="block truncate font-medium text-fg transition-colors hover:text-red"
											>
												{language.name}
											</a>
											<a
												href={`/projects?q=${encodeURIComponent(language.name)}`}
												class="text-sm text-subtle transition-colors hover:text-fg"
											>
												Used in {count} {count === 1 ? "project" : "projects"}
											</a>
										</div>
									</li>
								))}
							</ul>
						</div>
					);
				})}
			</div>
		</section>
	);
}
