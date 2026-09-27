import LanguageIcon from "./LanguageIcon.tsx";
import {
	languageById,
	type Project,
	projectSlug,
	projectSummary,
	projectYear,
	STATE_LABEL,
} from "../lib/projects.ts";

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
	const cover = project.images[0];

	return (
		<a
			href={`/projects/${projectSlug(project)}`}
			class="rise group block"
			style={{ "--d": `${Math.min(index, 8) * 50}ms` }}
		>
			<div class="relative aspect-[16/10] overflow-hidden rounded-card border border-line bg-surface">
				{cover
					? (
						<img
							src={cover}
							alt={`${project.title} screenshot`}
							class="h-full w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
							loading={index < 6 ? "eager" : "lazy"}
							decoding="async"
						/>
					)
					: (
						<div class="grid h-full w-full place-items-center">
							<span class="text-outline font-display text-8xl font-extrabold">{project.title.charAt(0)}</span>
						</div>
					)}
			</div>

			<div class="mt-5 flex items-baseline justify-between gap-4">
				<h2 class="font-display text-2xl font-bold tracking-tight text-fg transition-colors duration-300 group-hover:text-red">
					{project.title}
				</h2>
				<span class="shrink-0 text-sm tabular-nums text-subtle">{projectYear(project)}</span>
			</div>
			<p class="mt-2 line-clamp-2 text-muted">{projectSummary(project)}</p>

			<div class="mt-4 flex items-center justify-between gap-4">
				<span
					class={`rounded-full border px-3 py-1 text-xs ${
						project.state === "working_on"
							? "border-red/40 text-red"
							: project.state === "finished"
							? "border-line text-muted"
							: "border-line text-subtle"
					}`}
				>
					{STATE_LABEL[project.state] ?? project.state}
				</span>
				<div class="flex items-center gap-2.5 text-subtle">
					{project.languages_used.slice(0, 5).map((id) => (
						<LanguageIcon key={id} language={languageById(id)} class="h-4 w-4" />
					))}
					{project.languages_used.length > 5 && (
						<span class="text-xs">+{project.languages_used.length - 5}</span>
					)}
				</div>
			</div>
		</a>
	);
}
