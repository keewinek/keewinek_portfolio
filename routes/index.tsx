import NavBar from "../islands/NavBar.tsx";
import Contact from "../islands/Contact.tsx";
import projectsData from "../config/projects.json" with { type: "json" };
import languagesData from "../config/languages.json" with { type: "json" };
import ProjectBig from "../components/ProjectBig.tsx";
import LanguageSkill from "../components/LanguageSkill.tsx";

export default function Home() {
	// get projects that are proud of
	let proud_projects = projectsData.filter((project: any) => project.proud);
	proud_projects.sort((a: any, b: any) => b.proud - a.proud);

	return (
		<div class="bg-background-black text-white font-Comfortaa overflow-x-hidden px-2">
			<NavBar />

			<canvas id="main_page_background" class="w-full h-[calc(100vh-70px)] absolute top-10 bg-background-dark"></canvas>
			<script src="./js/main_page_effect.js"></script>
			
			<div class="w-fit mx-auto max-w-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 max-md:w-full">
				<h1 class="text-4xl md:text-6xl font-bold m-0 w-fit p-0">Nice to <span class="text-red">meet</span> you.</h1>
				<h2 class="text-xl md:text-3xl m-0 mt-3">- I am <span class="text-red">keewinek</span>.</h2>
				<a 
					class="mt-8 md:mt-12 w-full text-center text-lg md:text-xl text-red border border-red px-6 py-3 rounded-full
						transition-all duration-200 hover:bg-red hover:text-background-black font-bold flex items-center" 
					href="projects"
				>
					<span class="mx-auto w-full px-6">See my work</span>
					<i class="fa-solid fa-arrow-right ml-auto"></i>
				</a>
			</div>

			<div class="mt-[100vh]"></div>
			
			<div class="mb-12 max-w-3xl w-full mx-auto" id="about_me">
				<h1 class="text-center text-2xl md:text-4xl mb-6">About me</h1>
				<div class="border-[1px] border-white/10 p-4 md:p-6 rounded-lg font-mono overflow-x-auto">
					<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-4">1</span><span class="text-code-gray">// about-keewinek.cpp</span></p>
					<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-4">2</span><span class="text-code-blue">class</span> <span class="text-code-green">keewinek</span> <span class="text-code-gray">&#123;</span></p>
					<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-4">3</span><span class="text-code-blue">public:</span></p>
					<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-8">4</span><span class="text-code-green">string</span> name = <span class="text-code-orange">"Wojtek"</span><span class="text-code-gray">;</span></p>
					<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-8">5</span><span class="text-code-green">string</span> email = <span class="text-code-orange">"keewinek@gmail.com"</span><span class="text-code-gray">;</span></p>
					<p class="text-xs md:text-sm mb-1">
						<span class="text-code-gray mr-8">6</span><span class="text-code-green">vector&lt;string&gt;</span> known_languages = <span class="text-code-gray">&#123;
						<span class="text-code-orange">"C++"</span>, <span class="text-code-orange">"Python"</span>, <span class="text-code-orange">"C#"</span>, <span class="text-code-orange">"Lua"</span>, <span class="text-code-orange">"js"</span>, <span class="text-code-orange">"ts"</span>, <span class="text-code-orange">"HTML"</span> &#125;;</span>
					</p>
					<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-8">7</span><span class="text-code-blue">int</span> total_projects = <span class="text-code-green" id="total_projects_value">{projectsData.length}</span><span class="text-code-gray">;</span></p>
					<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-4">8</span><span class="text-code-blue">private:</span></p>
					<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-8">9</span><span class="text-code-blue">int</span> age = <span class="text-code-green" id="age_value">{new Date().getFullYear() - 2010}</span><span class="text-code-gray">;</span></p>
					<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-6">10</span><span class="text-code-green">city</span> location = Poland.Cities.<span class="text-code-gray">Warsaw</span><span class="text-code-gray">;</span></p>
					<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-6">11</span><span class="text-code-green">vector&lt;string&gt;</span> hobbies = <span class="text-code-gray">&#123;</span>
						<span class="text-code-orange">"Music"</span>, <span class="text-code-orange">"Coding"</span>, <span class="text-code-orange">"Python"</span>, <span class="text-code-orange">"Movie Making"</span> &#125;;</p>
					<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-4">12</span><span class="text-code-gray">&#125;;</span></p>
				</div>
			</div>

			<div class="max-w-md w-full mx-auto" id="projects">
				<h1 class="text-center text-2xl md:text-4xl mb-8">Proud of theese</h1>
				<div class="">
					{proud_projects.map((project: any) => (
						<ProjectBig project={project} />
					))}
				</div>
				<div class="text-center my-8">
					<a 
						class="mt-4 w-full text-center text-red border border-red px-6 py-3 rounded-full transition-all duration-200 hover:bg-red hover:text-background-black font-bold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
						href="./projects"
						target="_blank"
					>
						<span class="mx-auto w-full px-6">See all projects</span>
						<i class="fa-solid fa-arrow-right ml-auto"></i>
					</a>
				</div>
			</div>

			<div class="mb-12 max-w-md w-full mx-auto" id="skills">
				<h1 class="text-center text-2xl md:text-4xl mb-8">Coding Skills</h1>
				<div class="languages_list w-full mx-auto">
					<p class="text-left text-gray-400 text-sm mb-2 mt-4">Back-end</p>
					{languagesData.filter((language: any) => language.type === "back-end").map((language: any) => (
						<LanguageSkill language={language} />
					))}
					<p class="text-left text-gray-400 text-sm mb-2 mt-4">Front-end</p>
					{languagesData.filter((language: any) => language.type === "front-end").map((language: any) => (
						<LanguageSkill language={language} />
					))}
					<p class="text-left text-gray-400 text-sm mb-2 mt-4">Games</p>
					{languagesData.filter((language: any) => language.type === "games").map((language: any) => (
						<LanguageSkill language={language} />
					))}
					<p class="text-left text-gray-400 text-sm mb-2 mt-4">Games Assets</p>
					{languagesData.filter((language: any) => language.type === "games-assets").map((language: any) => (
						<LanguageSkill language={language} />
					))}
				</div>
			</div>

			<div class="mb-12 max-w-md w-full mx-auto" id="contact">
				<h1 class="text-center text-2xl md:text-4xl mb-8" id="contact_header">Contact<span class="text-code-gray">*</span></h1>
				<Contact />

				<p class="text-left mt-6">
					* For more formal contact, email me: <a href="mailto:keewinek@gmail.com" class="text-red hover:underline">keewinek@gmail.com</a>.
				</p>
			</div>
		</div>
	);
}
