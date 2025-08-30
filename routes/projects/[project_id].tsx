import { PageProps } from "$fresh/server.ts";
import NavBar from "../../islands/NavBar.tsx";
import projectsData from "../../config/projects.json" with { type: "json" };
import Carousel from "../../islands/Carousel.tsx";
import LanguageSkill from "../../components/LanguageSkill.tsx";
import languagesData from "../../config/languages.json" with { type: "json" };
import Contact from "../../islands/Contact.tsx";

export default function ProjectPage(props: PageProps) {
    const project = projectsData.find((project: any) => project.title.toLowerCase() === props.params.project_id.replace(/-/g, " "));

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        }).replace(/\//g, '.');
    };

    return (
        <>
            <head>
                <title>{project?.title} made by keewinek.</title>
            </head>
            <div class="bg-background-black text-white font-Comfortaa overflow-x-hidden px-2 pb-[1rem]">
                <NavBar />

                {!project ? (
                    <h1 class="text-center text-3xl md:text-6xl mb-[4rem] mt-[5rem]">Project not found</h1>
                ) : (
                    <>
                        <h1 class="text-center text-3xl md:text-6xl mb-[4rem] mt-[5rem]">{project?.title}</h1>

                        <div class="max-w-xl w-full mx-auto">
                            <Carousel
                                images={project?.images}
                                autoPlay={true}
                                autoPlayInterval={4000}
                                showDots={true}
                                showArrows={true}
                            />

                            <p class="text-gray-200 text-justify text-sm mb-2 mt-4">{project?.desc}</p>
                            <p class="text-gray-200 text-justify text-sm mb-2 mt-4">
                                Project state: 
                                {project?.state == "finished" ? (
                                    <span class="bg-green-800 ml-2 px-2 py-[2px] rounded-full">Finished</span>
                                ) : project?.state == "working_on" ? (
                                    <span class="bg-yellow-800 ml-2 px-2 py-[2px] rounded-full">Working on</span>
                                ) : (
                                    <span class="bg-red ml-2 px-2 py-[2px] rounded-full">Suspended</span>
                                )}
                            </p>
                            <p class="text-gray-200 text-justify text-sm mb-2 mt-4">
                                Project developement date: 
                                <span class="bg-gray-950 ml-2 px-2 py-[2px] rounded-full">{formatDate(project?.date)}</span>
                            </p>

                            <a 
                                class="mt-8 w-full text-center text-red border border-red px-6 py-3 rounded-full transition-all duration-200 hover:bg-red hover:text-background-black font-bold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                href={project.site_url}
                                target="_blank"
                            >
                                <span class="mx-auto w-full px-6">Go to {project.title}'s website</span>
                                <i class="fa-solid fa-link ml-auto"></i>
                            </a>

                            {project?.downloads && project?.downloads.length > 0 && (
                                <div class="flex flex-wrap gap-2 mb-4">
                                    {project?.downloads.map((download: any) => (
                                        <a 
                                            class="mt-4 w-full text-center text-red border border-red px-6 py-3 rounded-full transition-all duration-200 hover:bg-red hover:text-background-black font-bold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                            href={download.url}
                                            target="_blank" rel="noopener noreferrer" download
                                        >
                                            <span class="mx-auto w-full px-6">Download {download.name}</span>
                                            <i class="fa-solid fa-download ml-auto"></i>
                                        </a>
                                    ))}
                                </div>
                            )}

                            {project?.languages_used && project?.languages_used.length > 0 && (
                                <>
                                    <p class="text-gray-200 text-justify text-sm mb-2 mt-8">Used languages: </p>
                                    <div class="flex flex-wrap gap-2 mb-4">
                                        {project?.languages_used.map((language: any) => (
                                            <LanguageSkill language={languagesData.find((l: any) => l.id === language)} />
                                        ))}
                                    </div>
                                </>
                            )}

                            <h1 class="text-center text-2xl md:text-4xl mb-8 mt-12" id="contact_header">Contact me about {project?.title}<span class="text-code-gray"></span></h1>
                            <Contact contact_place={project?.title} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
