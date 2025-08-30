import languagesData from "../config/languages.json" with { type: "json" };
import Carousel from "../islands/Carousel.tsx";

export default function ProjectBig({ project }: { project: any }) {
	return (
		<div class="w-full mb-24 mt-12">
			<h2 class="md:text-4xl text-2xl text-center mb-6">{project.title}</h2>

			{/* Project Images Carousel */}
			{project.images && project.images.length > 0 && (
				<div class="mb-6">
					<Carousel 
						images={project.images} 
						autoPlay={true}
						autoPlayInterval={4000}
						showDots={true}
						showArrows={true}
						className="max-w-2xl mx-auto"
					/>
				</div>
			)}

			<p class="text-gray-200 text-justify">{project.desc}</p>
            <p class="text-gray-400 text-justify text-sm mt-4 mb-2">Used languages: </p>
			<div class="flex flex-wrap">
				{project.languages_used.map((language: any) => (
                    <img 
                    src={languagesData.find((l: any) => l.id === language)?.icon} 
                    alt={languagesData.find((l: any) => l.id === language)?.name} 
                    class="w-6 h-6"
                    style="filter: brightness(0) saturate(100%) invert(46%) sepia(47%) saturate(1153%) hue-rotate(318deg) brightness(116%) contrast(100%);" 
                    />
				))}
			</div>

            <a 
                class="mt-6 w-full text-center text-red border border-red px-6 py-3 rounded-full transition-all duration-200 hover:bg-red hover:text-background-black font-bold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                id="contact_send_button"
                href={project.site_url}
                target="_blank"
            >
                <span class="mx-auto w-full px-6">Check out {project.title}</span>
                <i class="fa-solid fa-link ml-auto"></i>
            </a>
		</div>
	);
}