import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import ProjectsGrid from "../../islands/ProjectsGrid.tsx";
import { projects } from "../../lib/projects.ts";

export default function Projects(props: PageProps) {
	const searchQuery = props.url.searchParams.get("q") || "";
	const firstYear = Math.min(...projects.map((p) => new Date(p.date).getFullYear()));

	return (
		<>
			<Head>
				<title>Projects made by keewinek</title>
				<meta property="og:title" content="Projects made by keewinek" />
			</Head>
			<div class="mx-auto max-w-[1400px] px-4 pb-24 pt-28 md:px-8 md:pt-36">
				<h1 class="rise font-display text-6xl font-extrabold tracking-[-0.045em] md:text-8xl">Projects</h1>
				<p class="rise mt-6 max-w-[48ch] text-lg text-muted md:text-xl" style={{ "--d": "120ms" }}>
					Everything I've built since {firstYear}: web apps, mobile apps, games and the odd experiment.
				</p>
				<div class="rise mt-14" style={{ "--d": "220ms" }}>
					<ProjectsGrid initialSearchQuery={searchQuery} />
				</div>
			</div>
		</>
	);
}
