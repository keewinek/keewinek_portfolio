import { esc, raw } from "../lib/html.mjs";

/** Single-colour language icon that follows `currentColor` (via CSS mask). */
export function languageIcon(language, className = "h-5 w-5") {
	if (!language) return "";
	return raw(
		`<span role="img" aria-label="${esc(language.name)}" title="${esc(language.name)}" class="icon-mask shrink-0 ${esc(className)}" style="--icon: url(&quot;${esc(language.icon)}&quot;)"></span>`,
	);
}
