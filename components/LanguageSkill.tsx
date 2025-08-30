import languagesData from "../config/languages.json" with { type: "json" };
import projectsData from "../config/projects.json" with { type: "json" };

export default function LanguageSkill({ language }: { language: any }) {
    return (
        <div class="p-4 rounded-lg my-2 text-center border-white/10 border-[1px] w-full flex flex-row items-center">
            <img
                class="w-12 h-12 mx-auto mb-3 filter language_icon translate-y-[5px]"
                style="filter: brightness(0) saturate(100%) invert(46%) sepia(47%) saturate(1153%) hue-rotate(318deg) brightness(116%) contrast(100%);"
                src={language.icon || ""}
                alt={language.name}
            />
            <div class="flex flex-col items-start justify-center w-full ml-4">
                <a
                    class="block text-lg font-bold text-white hover:text-red transition-colors duration-200 mb-2 language_name"
                    target="_blank"
                    href={language.url || "#"}
                    rel="noopener noreferrer"
                >
                    {language.name}
                </a>
                <p class="text-sm text-white/75 total_projects flex flex-row items-center">
                    <span class="inline">Used in </span>
                    <a href={`/projects?q=` + language.name} class="font-bold value hover:text-red duration-200 inline ml-1">
                        <span class="text-red font-bold value">{projectsData.filter((project: any) => project.languages_used.includes(language.id)).length ?? "?"}</span> 
                        {projectsData.filter((project: any) => project.languages_used.includes(language.id)).length === 1 ? " project" : " projects"}.
                    </a>
                </p>
            </div>
        </div>
    );
}