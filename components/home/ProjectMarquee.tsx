import { projectsByDate, projectSlug } from "../../lib/projects.ts";

/** Every project name scrolling past: shows the breadth of work at a glance. */
export default function ProjectMarquee() {
	const list = projectsByDate();

	const row = (hidden: boolean) => (
		<ul class="flex shrink-0 items-center" aria-hidden={hidden ? "true" : undefined}>
			{list.map((project, i) => (
				<li key={project.title} class="flex items-center">
					<a
						href={`/projects/${projectSlug(project)}`}
						tabIndex={hidden ? -1 : undefined}
						class={`whitespace-nowrap px-6 font-display text-5xl font-extrabold tracking-[-0.04em] transition-colors duration-300 hover:text-red md:px-8 md:text-7xl ${
							i % 2 === 0 ? "text-fg" : "text-outline hover:[-webkit-text-stroke-color:transparent]"
						}`}
					>
						{project.title}
					</a>
					<img src="/logo-128.png" alt="" width={40} height={40} class="h-8 w-8 opacity-80 md:h-10 md:w-10" loading="lazy" />
				</li>
			))}
		</ul>
	);

	return (
		<section aria-label="All project names" class="marquee-wrap overflow-hidden border-y border-line/60 py-8 md:py-10">
			<div class="marquee">
				{row(false)}
				{row(true)}
			</div>
		</section>
	);
}
