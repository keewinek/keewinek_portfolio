import { cx, esc, html, raw } from "../lib/html.mjs";

const BASE =
	"group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium no-underline select-none cursor-pointer " +
	"transition-[transform,background-color,border-color,color] duration-300 ease-out-expo active:scale-[0.97]";

const VARIANTS = {
	primary: "bg-red text-ink border border-red hover:bg-red-bright hover:border-red-bright",
	secondary: "bg-transparent text-fg border border-fg/25 hover:border-fg hover:bg-fg hover:text-ink",
	ghost: "bg-surface text-muted border border-line hover:text-fg hover:border-fg/40",
};

const SIZES = {
	sm: "text-sm h-9 px-4",
	md: "text-[15px] h-11 px-6",
	lg: "text-base h-14 px-8",
};

/**
 * Renders an <a> when `href` is set, otherwise a <button>.
 * `icon` is rendered after the label and slides on hover. `attrs` is extra raw attribute markup.
 */
export function button({
	label,
	href,
	variant = "primary",
	size = "md",
	icon,
	target,
	download = false,
	type = "button",
	className = "",
	id,
	attrs = "",
}) {
	const classes = cx(BASE, VARIANTS[variant], SIZES[size], className);
	const content = html`<span>${label}</span>${
		icon && html`<span class="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" data-button-icon>${icon}</span>`
	}`;
	const idAttr = id ? ` id="${esc(id)}"` : "";

	if (href) {
		const rel = target === "_blank" ? ' rel="noopener noreferrer"' : "";
		const tgt = target ? ` target="${esc(target)}"` : "";
		return raw(
			`<a href="${esc(href)}" class="${esc(classes)}"${tgt}${rel}${download ? " download" : ""}${idAttr} ${attrs}>${content}</a>`,
		);
	}
	return raw(`<button type="${type}" class="${esc(classes)}"${idAttr} ${attrs}>${content}</button>`);
}
