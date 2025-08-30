import NavBar from "../islands/NavBar.tsx";
import Contact from "../islands/Contact.tsx";
import projectsData from "../config/projects.json" with { type: "json" };
import languagesData from "../config/languages.json" with { type: "json" };
import ProjectBig from "../components/ProjectBig.tsx";
import LanguageSkill from "../components/LanguageSkill.tsx";

export default function Projects() {
	return (
		<div class="bg-background-black text-white font-Comfortaa overflow-x-hidden px-2">
			<NavBar />

			<h1 class="text-center text-3xl md:text-6xl mb-[4rem] mt-[5rem]">Projects</h1>
			<div class="max-w-[1400px] mx-auto px-2.5">
				<div class="mb-8 flex flex-col md:flex-row gap-4 md:gap-0">
					<div class="flex flex-wrap gap-2">
						<a 
							class="inline-block text-red border border-red px-2.5 py-1.5 rounded-full transition-all duration-200 text-center select-none cursor-pointer hover:bg-red hover:text-background-black font-bold" 
							id="all_filter_button"
						>
							All
						</a>
						<a 
							class="inline-block text-background-black bg-red border border-red px-2.5 py-1.5 rounded-full transition-all duration-200 text-center select-none cursor-pointer font-bold" 
							id="finished_filter_button"
						>
							Finished
						</a>
						<a 
							class="inline-block text-red border border-red px-2.5 py-1.5 rounded-full transition-all duration-200 text-center select-none cursor-pointer hover:bg-red hover:text-background-black font-bold" 
							id="working_on_filter_button"
						>
							Working on
						</a>
					</div>

					<div class="relative md:ml-8">
						<img id="search_button" alt="Search" src="src/search.svg" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 filter invert"/>
						<input id="search_input" placeholder="Search by anything" type="text" class="w-full md:w-auto pl-10 pr-4 py-2 bg-background-dark border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red transition-all duration-200"/>
					</div>
				</div>
				<div class="projects_list"></div>
			</div>
		</div>
	);
}
