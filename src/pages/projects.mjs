import { html } from "../lib/html.mjs";
import { layout } from "../layout.mjs";
import { button } from "../components/button.mjs";
import { SearchIcon } from "../components/icons.mjs";
import { projectCard } from "../components/project-card.mjs";
import { firstProjectYear, projects, projectsByDate } from "../lib/projects.mjs";

const FILTERS = [
	{ id: "all", label: "All" },
	{ id: "finished", label: "Finished" },
	{ id: "working_on", label: "Working on" },
	{ id: "suspended", label: "Suspended" },
];

const filterClass = (active) =>
	active ? "border-fg bg-fg text-ink" : "border-line text-muted hover:border-fg/40 hover:text-fg";

function projectsGrid() {
	const sorted = projectsByDate();
	const count = (id) => id === "all" ? sorted.length : sorted.filter((p) => p.state === id).length;

	return html`
		<div data-projects-grid>
			<div class="flex flex-col gap-4 border-b border-line/60 pb-6 md:flex-row md:items-center md:justify-between">
				<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by state">
					${FILTERS.map((f) => html`
						<button
							type="button"
							data-filter="${f.id}"
							aria-pressed="${String(f.id === "all")}"
							class="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200 active:scale-[0.97] ${filterClass(f.id === "all")}"
						>
							${f.label}
							<span data-filter-count class="tabular-nums ${f.id === "all" ? "text-ink/60" : "text-subtle"}">${count(f.id)}</span>
						</button>
					`)}
				</div>

				<div class="relative md:w-80">
					<label for="project_search" class="sr-only">Search projects</label>
					${SearchIcon("pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle")}
					<input
						id="project_search"
						type="search"
						placeholder="Search by name, language..."
						class="h-10 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-fg placeholder:text-subtle transition-colors hover:border-fg/30 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/30"
					/>
				</div>
			</div>

			<p class="mt-6 text-sm text-subtle" aria-live="polite">
				Showing <span data-visible-count>${sorted.length}</span> of ${projects.length} projects
			</p>

			<div data-cards class="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
				${sorted.map((project, i) => projectCard(project, i))}
			</div>

			<div data-empty hidden class="mt-8 rounded-card border border-dashed border-line px-6 py-20 text-center">
				<p class="font-display text-3xl font-bold tracking-tight">Nothing matches that.</p>
				<p class="mx-auto mt-3 max-w-[40ch] text-muted">
					Try a project name or a language like TypeScript or Lua, or clear the filters.
				</p>
				<div class="mt-8">${button({ variant: "secondary", label: "Clear filters", attrs: "data-clear-filters" })}</div>
			</div>
		</div>
	`;
}

export function projectsPage() {
	return layout({
		title: "Projects made by keewinek",
		path: "/projects",
		body: html`
			<div class="mx-auto max-w-[1400px] px-4 pb-24 pt-28 md:px-8 md:pt-36">
				<h1 class="rise font-display text-6xl font-extrabold tracking-[-0.045em] md:text-8xl">Projects</h1>
				<p class="rise mt-6 max-w-[48ch] text-lg text-muted md:text-xl" style="--d: 120ms">
					Everything I've built since ${firstProjectYear()}: web apps, mobile apps, games and the odd experiment.
				</p>
				<div class="rise mt-14" style="--d: 220ms">${projectsGrid()}</div>
			</div>
		`,
	});
}
