import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import projectsData from "../config/projects.json" with { type: "json" };
import languagesData from "../config/languages.json" with { type: "json" };
import ProjectSmall from "../components/ProjectSmall.tsx";

interface ProjectsGridProps {
	initialSearchQuery?: string;
}

export default function ProjectsGrid({ initialSearchQuery = "" }: ProjectsGridProps) {
	const filteredProjects = useSignal(projectsData);
	const searchTerm = useSignal(initialSearchQuery);
	const activeFilter = useSignal("all");

	// Initialize search term from prop
	useEffect(() => {
		if (initialSearchQuery) {
			searchTerm.value = initialSearchQuery;
			updateFilteredProjects();
		}
	}, [initialSearchQuery]);

	const sort_projects = () => {
		const sorted = filteredProjects.value;
		sorted.sort((a: any, b: any) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
		filteredProjects.value = sorted;
	}
	
	// Filter and search projects
	const updateFilteredProjects = () => {
		let filtered = projectsData;
		
		// Apply status filter
		if (activeFilter.value !== "all") {
			filtered = filtered.filter((project: any) => project.state === activeFilter.value);
		}
		
		// Apply search filter
		if (searchTerm.value.trim()) {
			const searchLower = searchTerm.value.toLowerCase();
			filtered = filtered.filter((project: any) => {
				// Check if search term matches project title, description, or state
				if (
					project.title.toLowerCase().includes(searchLower) ||
					project.desc.toLowerCase().includes(searchLower) ||
					project.state.toLowerCase().includes(searchLower)
				) {
					return true;
				}
				
				// Check if search term matches any language used (by ID or name)
				return project.languages_used.some((langId: string) => {
					// Check if the language ID matches the search term
					if (langId.toLowerCase().includes(searchLower)) {
						return true;
					}
					
					// Check if the language name matches the search term
					const language = languagesData.find((lang: any) => lang.id === langId);
					if (language && language.name.toLowerCase().includes(searchLower)) {
						return true;
					}
					
					return false;
				});
			});
		}

		// Always sort by newest to oldest
		filtered.sort((a: any, b: any) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
		
		filteredProjects.value = filtered;
	};

	const handleFilterClick = (filter: string) => {
		activeFilter.value = filter;
		updateFilteredProjects();
	};

	const handleSearchChange = (e: any) => {
		searchTerm.value = e.target.value;
		updateFilteredProjects();
		sort_projects();
	};

	// Initialize projects
	useEffect(() => {
		sort_projects();
	}, []);

	return (
		<div class="max-w-[1400px] mx-auto px-2.5">
			{/* Filters and Search Section */}
			<div class="mb-8 flex flex-col md:flex-row gap-4 md:gap-0 border-b border-white/10 pb-4">
				<div class="flex flex-wrap gap-2">
					<button 
						onClick={() => handleFilterClick("all")}
						class={`inline-flex items-center px-3 rounded-full transition-all duration-200 text-center select-none cursor-pointer border ${
							activeFilter.value === "all" 
								? "bg-red text-background-black border-red" 
								: "text-red hover:bg-red border-red hover:text-background-black"
						}`}
					>
						All
					</button>
					<button 
						onClick={() => handleFilterClick("finished")}
						class={`inline-flex items-center px-3 rounded-full transition-all duration-200 text-center select-none cursor-pointer border ${
							activeFilter.value === "finished" 
								? "bg-red text-background-black border-red" 
								: "text-red hover:bg-red border-red hover:text-background-black"
						}`}
					>
						Finished
					</button>
					<button 
						onClick={() => handleFilterClick("working_on")}
						class={`inline-flex items-center px-3 rounded-full transition-all duration-200 text-center select-none cursor-pointer border ${
							activeFilter.value === "working_on" 
								? "bg-red text-background-black border-red" 
								: "text-red hover:bg-red border-red hover:text-background-black"
						}`}
					>
						Working on
					</button>
				</div>

				<div class="md:ml-4">
					{/* Search Input */}
					<div class="relative">
						<i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-[40%] w-5 h-5 text-white/50"></i>
						<input 
							value={searchTerm.value}
							onInput={handleSearchChange}
							placeholder="Search by anything" 
							type="text" 
							class="w-full md:w-80 pl-10 pr-4 py-[2px] bg-background-black rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red transition-colors duration-200"
						/>
					</div>
				</div>
			</div>

			{/* Results Count */}
			<div class="mb-6 text-gray-400 text-sm">
				Showing {filteredProjects.value.length} of {projectsData.length} projects
			</div>

			{/* Projects Grid */}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{filteredProjects.value.map((project: any) => (
					<ProjectSmall key={project.title} project={project} />
				))}
			</div>

			{/* No Results Message */}
			{filteredProjects.value.length === 0 && (
				<div class="text-center py-16">
					<div class="text-6xl mb-4">🔍</div>
					<h3 class="text-xl text-gray-300 mb-2">No projects found</h3>
					<p class="text-gray-500">Try adjusting your search terms or filters</p>
				</div>
			)}
		</div>
	);
}
