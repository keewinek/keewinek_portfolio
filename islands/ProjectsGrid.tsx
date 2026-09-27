import { useEffect, useMemo, useState } from "preact/hooks";
import ProjectCard from "../components/ProjectCard.tsx";
import Button from "../components/Button.tsx";
import { SearchIcon } from "../components/Icons.tsx";
import { languageById, projects, projectsByDate } from "../lib/projects.ts";

const FILTERS = [
	{ id: "all", label: "All" },
	{ id: "finished", label: "Finished" },
	{ id: "working_on", label: "Working on" },
	{ id: "suspended", label: "Suspended" },
];

const sorted = projectsByDate(projects);

function matches(project: (typeof projects)[number], query: string) {
	const q = query.trim().toLowerCase();
	if (!q) return true;
	if (
		project.title.toLowerCase().includes(q) ||
		project.desc.toLowerCase().includes(q) ||
		project.state.toLowerCase().includes(q)
	) return true;
	return project.languages_used.some((id) =>
		id.toLowerCase().includes(q) || (languageById(id)?.name.toLowerCase().includes(q) ?? false)
	);
}

export default function ProjectsGrid({ initialSearchQuery = "" }: { initialSearchQuery?: string }) {
	const [query, setQuery] = useState(initialSearchQuery);
	const [filter, setFilter] = useState("all");

	const searched = useMemo(() => sorted.filter((p) => matches(p, query)), [query]);
	const visible = filter === "all" ? searched : searched.filter((p) => p.state === filter);

	// Keep ?q= in the URL so a search can be shared or reloaded.
	useEffect(() => {
		const url = new URL(globalThis.location.href);
		if (query.trim()) url.searchParams.set("q", query.trim());
		else url.searchParams.delete("q");
		globalThis.history.replaceState(null, "", url);
	}, [query]);

	const countFor = (id: string) => id === "all" ? searched.length : searched.filter((p) => p.state === id).length;

	return (
		<div>
			<div class="flex flex-col gap-4 border-b border-line/60 pb-6 md:flex-row md:items-center md:justify-between">
				<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by state">
					{FILTERS.map((f) => (
						<button
							key={f.id}
							type="button"
							onClick={() => setFilter(f.id)}
							aria-pressed={filter === f.id}
							class={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200 active:scale-[0.97] ${
								filter === f.id
									? "border-fg bg-fg text-ink"
									: "border-line text-muted hover:border-fg/40 hover:text-fg"
							}`}
						>
							{f.label}
							<span class={`tabular-nums ${filter === f.id ? "text-ink/60" : "text-subtle"}`}>{countFor(f.id)}</span>
						</button>
					))}
				</div>

				<div class="relative md:w-80">
					<label for="project_search" class="sr-only">Search projects</label>
					<SearchIcon class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
					<input
						id="project_search"
						type="search"
						value={query}
						onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
						placeholder="Search by name, language..."
						class="h-10 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-fg placeholder:text-subtle transition-colors hover:border-fg/30 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/30"
					/>
				</div>
			</div>

			<p class="mt-6 text-sm text-subtle" aria-live="polite">
				Showing {visible.length} of {projects.length} projects
			</p>

			{visible.length > 0
				? (
					<div class="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
						{visible.map((project, i) => <ProjectCard key={project.title} project={project} index={i} />)}
					</div>
				)
				: (
					<div class="mt-8 rounded-card border border-dashed border-line px-6 py-20 text-center">
						<p class="font-display text-3xl font-bold tracking-tight">Nothing matches that.</p>
						<p class="mx-auto mt-3 max-w-[40ch] text-muted">
							Try a project name or a language like TypeScript or Lua, or clear the filters.
						</p>
						<div class="mt-8">
							<Button
								variant="secondary"
								onClick={() => {
									setQuery("");
									setFilter("all");
								}}
							>
								Clear filters
							</Button>
						</div>
					</div>
				)}
		</div>
	);
}
