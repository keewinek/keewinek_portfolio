import languagesData from "../config/languages.json" with { type: "json" };

export default function ProjectSmall({ project }: { project: any }) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        }).replace(/\//g, '.');
    };

    const getStatusColor = (state: string) => {
        switch (state) {
            case 'finished':
                return 'bg-green-800 text-white';
            case 'working_on':
                return 'bg-orange-800 text-white';
            case 'suspended':
                return 'bg-red text-white';
            default:
                return 'bg-gray-800 text-white';
        }
    };

    const getStatusText = (state: string) => {
        switch (state) {
            case 'finished':
                return 'Finished';
            case 'working_on':
                return 'Working on';
            case 'suspended':
                return 'Suspended';
            default:
                return state;
        }
    };

    const project_url = "./projects/" + project.title.toLowerCase().replace(/ /g, "-");

    return (
        <div class="bg-background-dark border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 group animation-fade-in">
            {/* Project Image/Icon */}
            <div class="w-full h-[10rem] mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {project.images && project.images.length > 0 ? (
                    <img 
                        src={project.images[0]} 
                        alt={project.title}
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span class="text-2xl font-bold text-white">
                            {project.title.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
            </div>

            {/* Project Title */}
            <a href={project_url} target="_blank" rel="noopener noreferrer">
                <h2 class="text-xl text-white mb-3 text-center flex items-center justify-center hover:text-red transition-colors duration-200">
                    <span>{project.title}</span>
                    <span 
                        class={`inline-flex items-center px-3 ml-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.state)}`}
                    >
                        {getStatusText(project.state)}
                    </span>
                </h2>
            </a>

            {/* Project Description */}
            <p class="text-gray-300 text-sm mb-4 text-left leading-relaxed line-clamp-3">
                {project.desc}
            </p>

            <div class="mb-4 text-center">
                <a 
                    href={project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class={`inline-flex items-center text-white hover:text-red transition-colors duration-200 text-sm font-medium justify-between hover:bg-white/10
                            border border-[1px] border-white/10 py-[2px] px-4 rounded-lg w-full hover:border-none`}
                >
                    <span class="flex-1 text-center">Learn more</span>
                    <i class="fa-solid fa-arrow-right ml-2"></i>
                </a>
            </div>

            {/* Bottom Section */}
            <div class="flex items-center justify-between">
                {/* Date */}
                <span class="text-gray-400 text-xs">
                    {formatDate(project.date)}
                </span>

                {/* Technology Tags */}
                <div class="flex gap-1">
                    {project.languages_used.slice(0, 3).map((language: string) => {
                        const langData = languagesData.find((l: any) => l.id === language);
                        return (
                            <div 
                                key={language}
                                class="w-6 h-6 rounded-full flex items-center justify-center  transition-colors duration-200"
                                title={langData?.name || language}
                            >
                                {langData?.icon ? (
                                    <img 
                                        src={langData.icon} 
                                        alt={langData.name} 
                                        class="w-4 h-4"
                                        style="filter: brightness(0) saturate(100%) invert(46%) sepia(47%) saturate(1153%) hue-rotate(318deg) brightness(116%) contrast(100%);"
                                    />
                                ) : (
                                    <span class="text-xs text-gray-300 font-medium">
                                        {language.toUpperCase()}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                    {project.languages_used.length > 3 && (
                        <div class="w-6 h-6 rounded-full  flex items-center justify-center">
                            <span class="text-xs text-gray-400 font-medium">+{project.languages_used.length - 3}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}