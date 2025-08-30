import NavBar from "../../islands/NavBar.tsx";
import ProjectsGrid from "../../islands/ProjectsGrid.tsx";
import { PageProps } from "$fresh/server.ts";

export default function Projects(props: PageProps) {
	// Get the q parameter from URL
	const url = new URL(props.url);
	const searchQuery = url.searchParams.get('q') || "";

	return (
		<>
			<head>
				<title>Projects made by keewinek</title>
			</head>
			<div class="bg-background-black text-white font-Comfortaa overflow-x-hidden px-2 pb-[1rem]">
				<NavBar />

				<h1 class="text-center text-3xl md:text-6xl mb-[4rem] mt-[5rem]">Projects</h1>
				
				<ProjectsGrid initialSearchQuery={searchQuery} />
			</div>
		</>
	);
}
