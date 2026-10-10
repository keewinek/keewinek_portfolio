import { html } from "../lib/html.mjs";
import { layout } from "../layout.mjs";
import { button } from "../components/button.mjs";
import { ArrowRightIcon, ArrowUpRightIcon } from "../components/icons.mjs";
import { contactSection } from "../components/contact-section.mjs";
import { languageIcon } from "../components/language-icon.mjs";
import {
	ageToday,
	featuredProjects,
	firstProjectYear,
	languages,
	projectBySlug,
	projects,
	projectsByDate,
	projectSlug,
	projectsUsing,
	projectSummary,
	projectYear,
} from "../lib/projects.mjs";

// ---------------------------------------------------------------- Hero

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
		src: "/src/thumbnails/newear/1.jpg",
		alt: "Newear online store",
		pos: "right-[2%] bottom-[2%] w-[50%]",
		rotate: "6deg",
		drift: "-190px",
		delay: 500,
		z: "z-[3]",
	},
];

function hero() {
	return html`
		<section class="relative overflow-hidden">
			<div class="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-14 px-4 pb-16 pt-24 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-10">
				<div class="lg:col-span-7">
					<h1 class="font-display text-[clamp(3.4rem,10vw,7.75rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
						<span class="rise block" style="--d: 80ms">I build</span>
						<span class="rise block text-red" style="--d: 200ms">
							<span class="word-rotator" aria-hidden="true">
								<span>${[...WORDS, WORDS[0]].map((word) => html`<span>${word}</span>`)}</span>
							</span>
							<span class="sr-only">web apps, mobile apps, games and AI tools.</span>
						</span>
					</h1>

					<p class="rise mt-8 max-w-[34rem] text-lg leading-relaxed text-muted md:text-xl" style="--d: 380ms">
						I'm Wojtek, a <span data-age>${ageToday()}</span>-year-old developer from Warsaw. ${projects.length} projects so far, from AI
						study apps to an online clothing store.
					</p>

					<div class="rise mt-10 flex flex-wrap items-center gap-3" style="--d: 500ms">
						${button({ href: "#projects", size: "lg", label: "See my work", icon: ArrowRightIcon("h-4 w-4") })}
						${button({ href: "#contact", size: "lg", variant: "secondary", label: "Contact" })}
					</div>
				</div>

				<div class="relative mx-auto aspect-[1/0.92] w-full max-w-[560px] lg:col-span-5 lg:max-w-none">
					${COLLAGE.map((item) => {
						const project = projectBySlug(item.slug);
						return html`
							<div class="drift absolute ${item.pos} ${item.z}" style="--drift: ${item.drift}">
								<a
									href="${project ? `/projects/${projectSlug(project)}` : "/projects"}"
									class="settle block overflow-hidden rounded-card border border-line bg-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] transition-[scale] duration-500 ease-out-expo hover:[scale:1.04]"
									style="--r: ${item.rotate}; --r-from: 0deg; --d: ${item.delay}ms"
								>
									<img src="${item.src}" alt="${item.alt}" class="block h-auto w-full" loading="eager" decoding="async" />
								</a>
							</div>
						`;
					})}
				</div>
			</div>
		</section>
	`;
}

// ---------------------------------------------------------------- Marquee

/** Every project name scrolling past: shows the breadth of work at a glance. */
function projectMarquee() {
	const list = projectsByDate();
	const row = (hidden) => html`
		<ul class="flex shrink-0 items-center" ${hidden ? html`aria-hidden="true"` : ""}>
			${list.map((project, i) => html`
				<li class="flex items-center">
					<a
						href="/projects/${projectSlug(project)}"
						${hidden ? html`tabindex="-1"` : ""}
						class="whitespace-nowrap px-6 font-display text-5xl font-extrabold tracking-[-0.04em] transition-colors duration-300 hover:text-red md:px-8 md:text-7xl ${
							i % 2 === 0 ? "text-fg" : "text-outline hover:[-webkit-text-stroke-color:transparent]"
						}"
					>${project.title}</a>
					<img src="/logo-128.png" alt="" width="40" height="40" class="h-8 w-8 opacity-80 md:h-10 md:w-10" loading="lazy" />
				</li>
			`)}
		</ul>
	`;

	return html`
		<section aria-label="All project names" class="marquee-wrap overflow-hidden border-y border-line/60 py-8 md:py-10">
			<div class="marquee">${row(false)}${row(true)}</div>
		</section>
	`;
}

// ---------------------------------------------------------------- Featured bento

/**
 * Cell spans for the 6-item layout (4 columns on desktop):
 *   [ A A B B ]
 *   [ A A C D ]
 *   [ E E F F ]
 * On tablets the first and last cells span both columns.
 * Any other count falls back to an even grid so there are never empty cells.
 */
const SPANS_6 = [
	"md:col-span-2 lg:col-span-2 lg:row-span-2",
	"lg:col-span-2",
	"",
	"",
	"lg:col-span-2",
	"md:col-span-2 lg:col-span-2",
];

function bentoCell(project, span, big, index) {
	return html`
		<a
			href="/projects/${projectSlug(project)}"
			class="reveal-on-scroll group relative isolate block min-h-[300px] overflow-hidden rounded-card border border-line bg-surface md:min-h-[320px] lg:min-h-0 ${span}"
			style="--i: ${index}"
		>
			<img
				src="${project.images[0]}"
				alt="${project.title} screenshot"
				class="absolute inset-0 -z-10 h-full w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
				loading="lazy"
				decoding="async"
			/>
			<div class="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-15% via-ink/85 via-45% to-ink/0 to-80%"></div>

			<div class="flex h-full flex-col justify-end p-6 md:p-7">
				<div class="flex items-end justify-between gap-6">
					<div>
						<h3 class="font-display font-bold tracking-tight text-fg ${big ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}">
							${project.title}
						</h3>
						<p class="mt-2 max-w-[42ch] text-muted ${big ? "text-base md:text-lg" : "text-sm"}">
							${projectSummary(project)}
						</p>
						<p class="mt-3 text-sm text-subtle">
							${projectYear(project)}${project.state === "working_on" && html`<span class="text-red">, in progress</span>`}
						</p>
					</div>
					<span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-fg text-ink transition-[transform,background-color] duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-red">
						${ArrowUpRightIcon("h-5 w-5")}
					</span>
				</div>
			</div>
		</a>
	`;
}

function featuredBento() {
	const featured = featuredProjects();
	const exact = featured.length === 6;

	return html`
		<section id="projects" class="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-24 md:px-8 md:py-32">
			<h2 class="reveal-on-scroll font-display text-5xl font-extrabold tracking-[-0.04em] md:text-7xl">Proud of these.</h2>

			<div
				class="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 ${
					exact ? "lg:grid-cols-4 lg:auto-rows-[280px]" : "lg:grid-cols-3 lg:auto-rows-[320px]"
				}"
			>
				${featured.map((project, i) => bentoCell(project, exact ? SPANS_6[i] : "", exact && i === 0, i))}
			</div>

			<div class="reveal-on-scroll mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-8">
				<p class="text-muted">These are ${featured.length} of ${projects.length}. The rest are games, tools and older experiments.</p>
				${button({ href: "/projects", variant: "secondary", label: "All projects", icon: ArrowRightIcon("h-4 w-4") })}
			</div>
		</section>
	`;
}

// ---------------------------------------------------------------- About (code card)

// Syntax colours stay inside the brand family: red for keywords, neutrals for the rest.
const K = (s) => html`<span class="text-red">${s}</span>`;
const T = (s) => html`<span class="font-medium text-fg">${s}</span>`;
const S = (s) => html`<span class="text-[#f4b4b4]">"${s}"</span>`;
const N = (s) => html`<span class="text-red-bright">${s}</span>`;
const C = (s) => html`<span class="text-subtle">${s}</span>`;
const strings = (values) => values.map((v, i) => html`${S(v)}${i < values.length - 1 && ", "}`);

function aboutCode() {
	// [indent level, content]
	const lines = [
		[0, C("// about-keewinek.cpp")],
		[0, html`${K("class")} ${T("keewinek")} {`],
		[0, K("public:")],
		[1, html`${T("string")} name = ${S("Wojtek")};`],
		[1, html`${T("string")} email = ${S("keewinek@gmail.com")};`],
		[1, html`${T("vector<string>")} known_languages = {`],
		[2, html`${strings(["C++", "Python", "C#", "Lua"])},`],
		[2, strings(["js", "ts", "HTML"])],
		[1, "};"],
		[1, html`${K("int")} total_projects = ${N(projects.length)};`],
		[0, K("private:")],
		[1, html`${K("int")} age = <span class="text-red-bright" data-age>${ageToday()}</span>;`],
		[1, html`${T("city")} location = Poland.Cities.Warsaw;`],
		[1, html`${T("vector<string>")} hobbies = {`],
		[2, strings(["Music", "Coding", "Python", "Movie Making"])],
		[1, "};"],
		[0, "};"],
	];

	const stats = [
		{ value: projects.length, label: "projects" },
		{ value: languages.length, label: "languages & tools" },
		{ value: firstProjectYear(), label: "first project" },
	];

	return html`
		<section id="about_me" class="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-24 md:px-8 md:py-32">
			<div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
				<div class="lg:col-span-5">
					<h2 class="reveal-on-scroll font-display text-5xl font-extrabold tracking-[-0.04em] md:text-7xl">About me</h2>
					<div class="reveal-on-scroll mt-8 max-w-[52ch] space-y-5 text-lg leading-relaxed text-muted" style="--i: 1">
						<p>
							I'm Wojtek, known online as keewinek. I started with Roblox games and Python tools, and today I build
							web apps, mobile apps and games from start to finish.
						</p>
						<p>
							I like owning the whole thing: the design, the frontend, the backend and getting it live. Right now
							I'm working on <a href="/projects/studdly" class="text-fg underline decoration-red decoration-2 underline-offset-4 hover:text-red">Studdly</a>.
						</p>
					</div>

					<dl class="reveal-on-scroll mt-12 grid grid-cols-3 gap-6" style="--i: 2">
						${stats.map((stat) => html`
							<div class="flex flex-col">
								<dt class="order-2 mt-1 text-sm text-subtle">${stat.label}</dt>
								<dd class="font-display text-4xl font-bold tracking-tight text-fg md:text-5xl">${stat.value}</dd>
							</div>
						`)}
					</dl>
				</div>

				<figure class="reveal-on-scroll self-start overflow-hidden rounded-card border border-line bg-surface lg:col-span-7" style="--i: 1">
					<figcaption class="flex h-12 items-center gap-3 border-b border-line px-5 font-mono text-xs text-muted">
						<img src="/logo-128.png" alt="" width="16" height="16" class="h-4 w-4" loading="lazy" />
						about-keewinek.cpp
					</figcaption>
					<pre class="overflow-x-auto py-6 font-mono text-[13px] leading-7 text-muted md:py-8 md:text-[15px] md:leading-8"><code>${
						lines.map(([indent, content], i) => html`<span class="code-line flex" style="--i: ${i}"><span class="w-12 shrink-0 select-none pr-5 text-right text-subtle/50 md:w-16">${i + 1}</span><span class="whitespace-pre pr-6" style="padding-left: ${indent * 2}ch">${content}</span></span>`)
					}</code></pre>
				</figure>
			</div>
		</section>
	`;
}

// ---------------------------------------------------------------- Skills

const GROUPS = [
	{ type: "back-end", title: "Back-end" },
	{ type: "front-end", title: "Front-end" },
	{ type: "games", title: "Games" },
	{ type: "games-assets", title: "Game assets" },
];

function skills() {
	return html`
		<section id="skills" class="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-24 md:px-8 md:py-32">
			<h2 class="reveal-on-scroll font-display text-5xl font-extrabold tracking-[-0.04em] md:text-7xl">Coding skills</h2>

			<div class="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:mt-16 md:grid-cols-2 xl:grid-cols-4">
				${GROUPS.map((group, gi) => {
					const items = languages
						.filter((l) => l.type === group.type)
						.map((l) => ({ language: l, count: projectsUsing(l.id) }))
						.sort((a, b) => b.count - a.count);
					if (!items.length) return "";

					return html`
						<div class="reveal-on-scroll border-t border-line pt-6" style="--i: ${gi}">
							<h3 class="font-display text-2xl font-bold tracking-tight">${group.title}</h3>
							<ul class="mt-6 space-y-5">
								${items.map(({ language, count }) => html`
									<li class="group flex items-center gap-4">
										<span class="grid h-12 w-12 shrink-0 place-items-center rounded-field bg-surface text-muted transition-colors duration-300 group-hover:text-red">
											${languageIcon(language, "h-6 w-6")}
										</span>
										<div class="min-w-0">
											<a
												href="${language.url}"
												target="_blank"
												rel="noopener noreferrer"
												class="block truncate font-medium text-fg transition-colors hover:text-red"
											>${language.name}</a>
											<a
												href="/projects?q=${encodeURIComponent(language.name)}"
												class="text-sm text-subtle transition-colors hover:text-fg"
											>Used in ${count} ${count === 1 ? "project" : "projects"}</a>
										</div>
									</li>
								`)}
							</ul>
						</div>
					`;
				})}
			</div>
		</section>
	`;
}

export function homePage() {
	return layout({
		title: "Hi. I am keewinek.",
		path: "/",
		body: html`${hero()}${projectMarquee()}${featuredBento()}${aboutCode()}${skills()}${contactSection()}`,
	});
}
