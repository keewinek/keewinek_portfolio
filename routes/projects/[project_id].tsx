import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Carousel from "../../islands/Carousel.tsx";
import Button from "../../components/Button.tsx";
import LanguageIcon from "../../components/LanguageIcon.tsx";
import ContactSection from "../../components/ContactSection.tsx";
import { ArrowRightIcon, DownloadIcon, LinkIcon } from "../../components/Icons.tsx";
import {
	absoluteUrl,
	formatDate,
	languageById,
	projectBySlug,
	projectsByDate,
	projectSlug,
	projectSummary,
	STATE_LABEL,
} from "../../lib/projects.ts";

export default function ProjectPage(props: PageProps) {
	const project = projectBySlug(props.params.project_id);

	if (!project) {
		return (
			<>
				<Head>
					<title>Project not found</title>
				</Head>
				<div class="mx-auto flex min-h-[80dvh] max-w-[1400px] flex-col items-start justify-center px-4 pt-24 md:px-8">
					<h1 class="font-display text-6xl font-extrabold tracking-[-0.045em] md:text-8xl">Project not found</h1>
					<p class="mt-6 max-w-[48ch] text-lg text-muted">There's no project at this address. It may have been renamed.</p>
					<div class="mt-10">
						<Button href="/projects" icon={<ArrowRightIcon class="h-4 w-4" />}>All projects</Button>
					</div>
				</div>
			</>
		);
	}

	const ordered = projectsByDate();
	const next = ordered[(ordered.indexOf(project) + 1) % ordered.length];
	const summary = projectSummary(project);

	return (
		<>
			<Head>
				<title>{project.title} made by keewinek.</title>
				<meta name="description" content={summary} />
				<meta property="og:title" content={`${project.title} made by keewinek`} />
				{project.images[0] && <meta property="og:image" content={`${props.url.origin}${project.images[0]}`} />}
			</Head>

			<article class="mx-auto max-w-[1400px] px-4 pb-8 pt-28 md:px-8 md:pt-36">
				<a href="/projects" class="rise group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
					<ArrowRightIcon class="h-4 w-4 rotate-180 transition-transform duration-300 ease-out-expo group-hover:-translate-x-1" />
					All projects
				</a>

				<h1
					class="rise mt-6 font-display text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.045em]"
					style={{ "--d": "80ms" }}
				>
					{project.title}
				</h1>
				<p class="rise mt-6 max-w-[44ch] text-xl text-muted md:text-2xl" style={{ "--d": "160ms" }}>
					{summary}
				</p>

				<div class="rise mt-10 flex flex-wrap gap-3" style={{ "--d": "240ms" }}>
					<Button href={project.site_url} target="_blank" size="lg" icon={<LinkIcon class="h-4 w-4" />}>
						Visit {project.title}
					</Button>
					{project.downloads?.map((download) => (
						<Button
							key={download.url}
							href={absoluteUrl(download.url)}
							download
							size="lg"
							variant="secondary"
							icon={<DownloadIcon class="h-4 w-4" />}
						>
							{download.name}
						</Button>
					))}
				</div>

				{project.images.length > 0 && (
					<div class="rise mt-14 md:mt-20" style={{ "--d": "320ms" }}>
						<Carousel images={project.images} alt={`${project.title} screenshot`} autoPlayInterval={5000} showThumbs />
					</div>
				)}

				<div class="mt-20 grid grid-cols-1 gap-14 md:mt-28 lg:grid-cols-12">
					<div class="reveal-on-scroll lg:col-span-7">
						<h2 class="font-display text-3xl font-bold tracking-tight md:text-4xl">About the project</h2>
						<p class="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted">{project.desc}</p>
					</div>

					<dl class="reveal-on-scroll grid grid-cols-2 content-start gap-x-8 gap-y-8 lg:col-span-4 lg:col-start-9" style={{ "--i": 1 }}>
						<div>
							<dt class="text-sm text-subtle">State</dt>
							<dd class={`mt-1 text-lg ${project.state === "working_on" ? "text-red" : "text-fg"}`}>
								{STATE_LABEL[project.state] ?? project.state}
							</dd>
						</div>
						<div>
							<dt class="text-sm text-subtle">Date</dt>
							<dd class="mt-1 text-lg tabular-nums text-fg">{formatDate(project.date)}</dd>
						</div>
						<div class="col-span-2">
							<dt class="text-sm text-subtle">Built with</dt>
							<dd class="mt-3 flex flex-wrap gap-2">
								{project.languages_used.map((id) => {
									const language = languageById(id);
									if (!language) return null;
									return (
										<a
											key={id}
											href={`/projects?q=${encodeURIComponent(language.name)}`}
											class="group inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-fg/40 hover:text-fg"
										>
											<LanguageIcon language={language} class="h-4 w-4 transition-colors group-hover:text-red" />
											{language.name}
										</a>
									);
								})}
							</dd>
						</div>
					</dl>
				</div>

				{next && next !== project && (
					<a
						href={`/projects/${projectSlug(next)}`}
						class="reveal-on-scroll group mt-24 flex items-end justify-between gap-6 border-t border-line/60 pt-10 md:mt-32"
					>
						<div>
							<p class="text-sm text-subtle">Next project</p>
							<p class="mt-2 font-display text-4xl font-extrabold tracking-[-0.04em] transition-colors duration-300 group-hover:text-red md:text-6xl">
								{next.title}
							</p>
						</div>
						<span class="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-fg text-ink transition-[transform,background-color] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:bg-red">
							<ArrowRightIcon class="h-5 w-5" />
						</span>
					</a>
				)}
			</article>

			<ContactSection title={`Contact me about ${project.title}`} place={project.title} />
		</>
	);
}
