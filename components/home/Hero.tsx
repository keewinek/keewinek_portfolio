import Button from "../Button.tsx";
import { ArrowRightIcon } from "../Icons.tsx";
import { ageToday, projects, projectSlug, projectBySlug } from "../../lib/projects.ts";

const WORDS = ["web apps.", "mobile apps.", "games.", "AI tools."];

/** Real screenshots stacked as a loose collage. Each one links to its project. */
const COLLAGE = [
	{
		slug: "nuve",
		src: "/src/thumbnails/nuve/1.jpg",
		alt: "NUVE agency website",
		pos: "right-0 top-[4%] w-[60%]",
		rotate: "4deg",
		drift: "-40px",
		delay: 350,
		z: "z-[1]",
	},
	{
		slug: "studdly",
		src: "/src/thumbnails/studdly/1.jpg",
		alt: "Studdly app landing page",
		pos: "left-0 top-[24%] w-[84%]",
		rotate: "-3deg",
		drift: "-110px",
		delay: 200,
		z: "z-[2]",
	},
	{
		slug: "newear",
		src: "/src/thumbnails/newear/3.jpg",
		alt: "Newear hoodie and sweatpants set",
		pos: "right-[6%] bottom-[-2%] w-[32%]",
		rotate: "6deg",
		drift: "-190px",
		delay: 500,
		z: "z-[3]",
	},
];

export default function Hero() {
	return (
		<section class="relative overflow-hidden">
			<div class="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-14 px-4 pb-16 pt-24 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-10">
				<div class="lg:col-span-7">
					<h1 class="font-display text-[clamp(3.4rem,10vw,7.75rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
						<span class="rise block" style={{ "--d": "80ms" }}>I build</span>
						<span class="rise block text-red" style={{ "--d": "200ms" }}>
							<span class="word-rotator" aria-hidden="true">
								<span>
									{[...WORDS, WORDS[0]].map((word, i) => <span key={i}>{word}</span>)}
								</span>
							</span>
							<span class="sr-only">web apps, mobile apps, games and AI tools.</span>
						</span>
					</h1>

					<p class="rise mt-8 max-w-[34rem] text-lg leading-relaxed text-muted md:text-xl" style={{ "--d": "380ms" }}>
						I'm Wojtek, a {ageToday()}-year-old developer from Warsaw. {projects.length} projects so far, from AI
						study apps to an online clothing store.
					</p>

					<div class="rise mt-10 flex flex-wrap items-center gap-3" style={{ "--d": "500ms" }}>
						<Button href="#projects" size="lg" icon={<ArrowRightIcon class="h-4 w-4" />}>
							See my work
						</Button>
						<Button href="#contact" size="lg" variant="secondary">
							Contact
						</Button>
					</div>
				</div>

				<div class="relative mx-auto aspect-[1/0.92] w-full max-w-[560px] lg:col-span-5 lg:max-w-none">
					{COLLAGE.map((item) => {
						const project = projectBySlug(item.slug);
						return (
							<div key={item.slug} class={`drift absolute ${item.pos} ${item.z}`} style={{ "--drift": item.drift }}>
								<a
									href={project ? `/projects/${projectSlug(project)}` : "/projects"}
									class="settle block overflow-hidden rounded-card border border-line bg-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] transition-[scale] duration-500 ease-out-expo hover:[scale:1.04]"
									style={{ "--r": item.rotate, "--r-from": "0deg", "--d": `${item.delay}ms` }}
								>
									<img
										src={item.src}
										alt={item.alt}
										class="block h-auto w-full"
										loading="eager"
										decoding="async"
									/>
								</a>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
