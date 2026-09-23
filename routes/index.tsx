import NavBar from "../islands/NavBar.tsx";
import Contact from "../islands/Contact.tsx";
import projectsData from "../config/projects.json" with { type: "json" };
import languagesData from "../config/languages.json" with { type: "json" };
import ProjectBig from "../components/ProjectBig.tsx";
import LanguageSkill from "../components/LanguageSkill.tsx";
import RevealOnScroll from "../components/RevealOnScroll.tsx";
import { ArrowRightIcon } from "../components/Icons.tsx";
import Button from "../components/Button.tsx";

export default function Home() {
	// get projects that are proud of
	let proud_projects = projectsData.filter((project: any) => project.proud);
	proud_projects.sort((a: any, b: any) => b.proud - a.proud);

	return (
		<div class="bg-background-black text-white font-Comfortaa overflow-x-hidden max-w-[100vw]">
			<NavBar />

			<section class="relative flex min-h-screen w-full flex-col items-center justify-center px-6 text-center">
				<h1 class="animation-fade-in m-0 p-0 text-4xl font-bold leading-tight md:text-7xl" style="font-family: 'Gravitas One', cursive;">
					Nice to <span class="text-red">meet</span> you.
				</h1>
				<h2 class="animation-fade-in m-0 mt-4 text-xl md:text-3xl" style="font-family: 'Caveat', cursive;">
					- I am <span class="text-red">keewinek</span>.
				</h2>
				<p class="animation-fade-in mt-6 max-w-xl text-sm text-white/60 md:text-base">
					Developer from Warsaw building web apps, mobile apps and games.
				</p>
				<div class="animation-fade-in mt-10 flex flex-col items-center gap-3 sm:flex-row">
					<Button href="/projects" size="lg" icon={<ArrowRightIcon class="h-4 w-4" />}>
						See my work
					</Button>
					<Button href="#contact" variant="ghost" size="lg">
						Get in touch
					</Button>
				</div>
			</section>

			<div class="px-2">
				<div class="mb-12 max-w-3xl w-full mx-auto scroll-mt-28" id="about_me">
					<RevealOnScroll>
						<h1 class="text-center text-2xl md:text-4xl mb-6" style="font-family: 'Gravitas One', cursive;">About me</h1>
					</RevealOnScroll>
					<RevealOnScroll>
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
							<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-8">9</span><span class="text-code-blue">int</span> age = <span class="text-code-green" id="age_value">{(() => {
								const today = new Date();
								const birthDate = new Date(2010, 0, 8); // January 8, 2010 (month is 0-indexed)
								let age = today.getFullYear() - birthDate.getFullYear();
								const monthDiff = today.getMonth() - birthDate.getMonth();
								if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
									age--;
								}
								return age;
							})()}</span><span class="text-code-gray">;</span></p>
							<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-6">10</span><span class="text-code-green">city</span> location = Poland.Cities.<span class="text-code-gray">Warsaw</span><span class="text-code-gray">;</span></p>
							<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-6">11</span><span class="text-code-green">vector&lt;string&gt;</span> hobbies = <span class="text-code-gray">&#123;</span>
								<span class="text-code-orange">"Music"</span>, <span class="text-code-orange">"Coding"</span>, <span class="text-code-orange">"Python"</span>, <span class="text-code-orange">"Movie Making"</span> &#125;;</p>
							<p class="text-xs md:text-sm mb-1"><span class="text-code-gray mr-4">12</span><span class="text-code-gray">&#125;;</span></p>
						</div>
					</RevealOnScroll>
				</div>

				<div class="max-w-md w-full mx-auto scroll-mt-28" id="projects">
					<RevealOnScroll>
						<h1 class="text-center text-2xl md:text-4xl mb-8 mt-24" style="font-family: 'Gravitas One', cursive;">Proud of theese</h1>
					</RevealOnScroll>
					<div class="">
						{proud_projects.map((project: any) => (
							<>
								<RevealOnScroll>
									<ProjectBig project={project} />
								</RevealOnScroll>
							</>
						))}
					</div>
					<RevealOnScroll>
						<div class="text-center my-8">
							<Button href="/projects" variant="secondary" icon={<ArrowRightIcon class="h-4 w-4" />}>
								See all projects
							</Button>
						</div>
					</RevealOnScroll>
				</div>

				<div class="mb-12 mt-24 max-w-md w-full mx-auto scroll-mt-28" id="skills">
					<RevealOnScroll>
						<h1 class="text-center text-2xl md:text-4xl mb-8" style="font-family: 'Gravitas One', cursive;">Coding Skills</h1>
					</RevealOnScroll>
					<div class="languages_list w-full mx-auto">
						<RevealOnScroll>
							<p class="text-left text-gray-400 text-sm mb-2 mt-4">Back-end</p>
						</RevealOnScroll>
						{languagesData.filter((language: any) => language.type === "back-end").map((language: any) => (
							<>
								<RevealOnScroll>
									<LanguageSkill language={language} />
								</RevealOnScroll>
							</>
						))}
						<RevealOnScroll>
							<p class="text-left text-gray-400 text-sm mb-2 mt-4">Front-end</p>
						</RevealOnScroll>
						{languagesData.filter((language: any) => language.type === "front-end").map((language: any) => (
							<>
								<RevealOnScroll>
									<LanguageSkill language={language} />
								</RevealOnScroll>
							</>
						))}
						<RevealOnScroll>
							<p class="text-left text-gray-400 text-sm mb-2 mt-4">Games</p>
						</RevealOnScroll>
						{languagesData.filter((language: any) => language.type === "games").map((language: any) => (
							<>
								<RevealOnScroll>
									<LanguageSkill language={language} />
								</RevealOnScroll>
							</>
						))}
						<RevealOnScroll>
							<p class="text-left text-gray-400 text-sm mb-2 mt-4">Games Assets</p>
						</RevealOnScroll>
						{languagesData.filter((language: any) => language.type === "games-assets").map((language: any) => (
							<>
								<RevealOnScroll>
									<LanguageSkill language={language} />
								</RevealOnScroll>
							</>
						))}
					</div>
				</div>

				<div class="mb-12 max-w-md w-full mx-auto scroll-mt-28" id="contact">
					<RevealOnScroll>
						<h1 class="text-center text-2xl md:text-4xl mb-8 mt-24" id="contact_header" style="font-family: 'Gravitas One', cursive;">Contact<span class="text-code-gray">*</span></h1>
					</RevealOnScroll>
					<RevealOnScroll>
						<Contact />
					</RevealOnScroll>
					<p class="text-left mt-6">
						* For more formal contact, email me: <a href="mailto:keewinek@gmail.com" class="text-red hover:underline">keewinek@gmail.com</a>.
					</p>
				</div>
			</div>
		</div>
	);
}
