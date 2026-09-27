import Button from "../Button.tsx";
import { ArrowRightIcon, ArrowUpRightIcon } from "../Icons.tsx";
import {
	featuredProjects,
	type Project,
	projects,
	projectSlug,
	projectSummary,
	projectYear,
} from "../../lib/projects.ts";

/**
 * Cell spans for the 6-item layout (4 columns on desktop):
 *   [ A A B B ]
 *   [ A A C D ]
 *   [ E E F F ]
 * On tablets the first and last cells span both columns.
 * Any other count falls back to an even grid so there are never empty cells.
 */
const SPANS_6 = [
	"md:col-span-2 lg:col-span-2 lg:row-span-2",
	"lg:col-span-2",
	"",
	"",
	"lg:col-span-2",
	"md:col-span-2 lg:col-span-2",
];

function BentoCell({ project, span, big, index }: { project: Project; span: string; big: boolean; index: number }) {
	return (
		<a
			href={`/projects/${projectSlug(project)}`}
			class={`reveal-on-scroll group relative isolate block min-h-[300px] overflow-hidden rounded-card border border-line bg-surface md:min-h-[320px] lg:min-h-0 ${span}`}
			style={{ "--i": index }}
		>
			<img
				src={project.images[0]}
				alt={`${project.title} screenshot`}
				class="absolute inset-0 -z-10 h-full w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
				loading="lazy"
				decoding="async"
			/>
			<div class="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-15% via-ink/85 via-45% to-ink/0 to-80%" />

			<div class="flex h-full flex-col justify-end p-6 md:p-7">
				<div class="flex items-end justify-between gap-6">
					<div>
						<h3
							class={`font-display font-bold tracking-tight text-fg ${
								big ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
							}`}
						>
							{project.title}
						</h3>
						<p class={`mt-2 max-w-[42ch] text-muted ${big ? "text-base md:text-lg" : "text-sm"}`}>
							{projectSummary(project)}
						</p>
						<p class="mt-3 text-sm text-subtle">
							{projectYear(project)}
							{project.state === "working_on" && <span class="text-red">, in progress</span>}
						</p>
					</div>
					<span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-fg text-ink transition-[transform,background-color] duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-red">
						<ArrowUpRightIcon class="h-5 w-5" />
					</span>
				</div>
			</div>
		</a>
	);
}

export default function FeaturedBento() {
	const featured = featuredProjects();
	const exact = featured.length === 6;

	return (
		<section id="projects" class="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-24 md:px-8 md:py-32">
			<h2 class="reveal-on-scroll font-display text-5xl font-extrabold tracking-[-0.04em] md:text-7xl">
				Proud of these.
			</h2>

			<div
				class={`mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 ${
					exact ? "lg:grid-cols-4 lg:auto-rows-[280px]" : "lg:grid-cols-3 lg:auto-rows-[320px]"
				}`}
			>
				{featured.map((project, i) => (
					<BentoCell
						key={project.title}
						project={project}
						span={exact ? SPANS_6[i] : ""}
						big={exact && i === 0}
						index={i}
					/>
				))}
			</div>

			<div class="reveal-on-scroll mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-8">
				<p class="text-muted">
					These are {featured.length} of {projects.length}. The rest are games, tools and older experiments.
				</p>
				<Button href="/projects" variant="secondary" icon={<ArrowRightIcon class="h-4 w-4" />}>
					All projects
				</Button>
			</div>
		</section>
	);
}
