import { html } from "../lib/html.mjs";
import { layout } from "../layout.mjs";
import { button } from "../components/button.mjs";
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon, DownloadIcon, ExpandIcon, LinkIcon } from "../components/icons.mjs";
import { contactSection } from "../components/contact-section.mjs";
import { languageIcon } from "../components/language-icon.mjs";
import {
	absoluteUrl,
	formatDate,
	languageById,
	projectsByDate,
	projectSlug,
	projectSummary,
	STATE_LABEL,
} from "../lib/projects.mjs";

const isVideo = (src) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);

const CONTROL =
	"grid h-11 w-11 place-items-center rounded-full border border-line bg-ink/80 text-fg backdrop-blur transition-[opacity,transform,background-color] duration-300 ease-out-expo hover:bg-fg hover:text-ink active:scale-95";
const REVEAL = "md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100";

/** Slide visibility and dot/thumb styling are toggled by src/client/site.js using data attributes. */
function carousel(images, alt) {
	const many = images.length > 1;
	return html`
		<div data-carousel data-interval="5000">
			<div
				class="group relative overflow-hidden rounded-card border border-line bg-surface"
				${many ? html`tabindex="0"` : ""}
				role="region"
				aria-roledescription="carousel"
				aria-label="${alt}"
			>
				<div class="relative aspect-[16/10] w-full">
					${images.map((image, i) => html`
						<div
							data-slide
							class="absolute inset-0 transition-[opacity,transform] duration-700 ease-out-expo ${
								i === 0 ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-[1.02]"
							}"
							aria-hidden="${String(i !== 0)}"
						>
							${isVideo(image)
								? html`<video src="${image}" class="h-full w-full cursor-zoom-in object-contain" autoplay muted loop playsinline data-open-full></video>`
								: html`<img
									src="${image}"
									alt="${alt} ${i + 1} of ${images.length}"
									class="h-full w-full cursor-zoom-in object-contain"
									loading="${i === 0 ? "eager" : "lazy"}"
									decoding="async"
									data-open-full
								/>`}
						</div>
					`)}
				</div>

				${many && html`
					<div class="pointer-events-none absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
						<button type="button" data-prev class="${CONTROL} pointer-events-auto ${REVEAL}" aria-label="Previous image">${ChevronLeftIcon("h-5 w-5")}</button>
						<button type="button" data-next class="${CONTROL} pointer-events-auto ${REVEAL}" aria-label="Next image">${ChevronRightIcon("h-5 w-5")}</button>
					</div>
				`}

				<button type="button" data-open-full class="${CONTROL} absolute right-4 top-4 h-10 w-10 ${REVEAL}" aria-label="Open image in full size">
					${ExpandIcon("h-4 w-4")}
				</button>

				${many && html`
					<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-ink/70 px-3 py-2 backdrop-blur">
						${images.map((_, i) => html`
							<button
								type="button"
								data-dot
								class="h-1.5 rounded-full transition-all duration-500 ease-out-expo ${i === 0 ? "w-6 bg-red" : "w-1.5 bg-fg/40 hover:bg-fg"}"
								aria-label="Show image ${i + 1}"
								aria-current="${String(i === 0)}"
							></button>
						`)}
					</div>
				`}
			</div>

			${many && html`
				<div class="mt-4 flex gap-3 overflow-x-auto pb-2">
					${images.map((image, i) => html`
						<button
							type="button"
							data-thumb
							class="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-field border transition-[border-color,opacity] duration-300 md:w-36 ${
								i === 0 ? "border-red opacity-100" : "border-line opacity-60 hover:opacity-100"
							}"
							aria-label="Show image ${i + 1}"
						>
							${isVideo(image)
								? html`<video src="${image}" class="h-full w-full object-cover" muted playsinline preload="metadata"></video>`
								: html`<img src="${image}" alt="" class="h-full w-full object-cover" loading="lazy" decoding="async" />`}
						</button>
					`)}
				</div>
			`}
		</div>
	`;
}

export function projectPage(project) {
	const ordered = projectsByDate();
	const next = ordered[(ordered.indexOf(project) + 1) % ordered.length];
	const summary = projectSummary(project);

	const body = html`
		<article class="mx-auto max-w-[1400px] px-4 pb-8 pt-28 md:px-8 md:pt-36">
			<a href="/projects" class="rise group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
				${ArrowRightIcon("h-4 w-4 rotate-180 transition-transform duration-300 ease-out-expo group-hover:-translate-x-1")}
				All projects
			</a>

			<h1
				class="rise mt-6 font-display text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.045em]"
				style="--d: 80ms"
			>${project.title}</h1>
			<p class="rise mt-6 max-w-[44ch] text-xl text-muted md:text-2xl" style="--d: 160ms">${summary}</p>

			<div class="rise mt-10 flex flex-wrap gap-3" style="--d: 240ms">
				${button({ href: project.site_url, target: "_blank", size: "lg", label: `Visit ${project.title}`, icon: LinkIcon("h-4 w-4") })}
				${(project.downloads ?? []).map((download) =>
					button({
						href: absoluteUrl(download.url),
						download: true,
						size: "lg",
						variant: "secondary",
						label: download.name,
						icon: DownloadIcon("h-4 w-4"),
					})
				)}
			</div>

			${project.images.length > 0 && html`
				<div class="rise mt-14 md:mt-20" style="--d: 320ms">${carousel(project.images, `${project.title} screenshot`)}</div>
			`}

			<div class="mt-20 grid grid-cols-1 gap-14 md:mt-28 lg:grid-cols-12">
				<div class="reveal-on-scroll lg:col-span-7">
					<h2 class="font-display text-3xl font-bold tracking-tight md:text-4xl">About the project</h2>
					<p class="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted">${project.desc}</p>
				</div>

				<dl class="reveal-on-scroll grid grid-cols-2 content-start gap-x-8 gap-y-8 lg:col-span-4 lg:col-start-9" style="--i: 1">
					<div>
						<dt class="text-sm text-subtle">State</dt>
						<dd class="mt-1 text-lg ${project.state === "working_on" ? "text-red" : "text-fg"}">${STATE_LABEL[project.state] ?? project.state}</dd>
					</div>
					<div>
						<dt class="text-sm text-subtle">Date</dt>
						<dd class="mt-1 text-lg tabular-nums text-fg">${formatDate(project.date)}</dd>
					</div>
					<div class="col-span-2">
						<dt class="text-sm text-subtle">Built with</dt>
						<dd class="mt-3 flex flex-wrap gap-2">
							${project.languages_used.map((id) => {
								const language = languageById(id);
								if (!language) return "";
								return html`
									<a
										href="/projects?q=${encodeURIComponent(language.name)}"
										class="group inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-fg/40 hover:text-fg"
									>
										${languageIcon(language, "h-4 w-4 transition-colors group-hover:text-red")}
										${language.name}
									</a>
								`;
							})}
						</dd>
					</div>
				</dl>
			</div>

			${next && next !== project && html`
				<a
					href="/projects/${projectSlug(next)}"
					class="reveal-on-scroll group mt-24 flex items-end justify-between gap-6 border-t border-line/60 pt-10 md:mt-32"
				>
					<div>
						<p class="text-sm text-subtle">Next project</p>
						<p class="mt-2 font-display text-4xl font-extrabold tracking-[-0.04em] transition-colors duration-300 group-hover:text-red md:text-6xl">${next.title}</p>
					</div>
					<span class="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-fg text-ink transition-[transform,background-color] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:bg-red">
						${ArrowRightIcon("h-5 w-5")}
					</span>
				</a>
			`}
		</article>

		${contactSection({ title: `Contact me about ${project.title}`, place: project.title })}
	`;

	return layout({
		title: `${project.title} made by keewinek.`,
		ogTitle: `${project.title} made by keewinek`,
		description: summary,
		ogImage: project.images[0],
		path: `/projects/${projectSlug(project)}`,
		body,
	});
}
