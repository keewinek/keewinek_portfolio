import type { Language } from "../lib/projects.ts";

/** Single-colour language icon that follows `currentColor` (via CSS mask). */
export default function LanguageIcon({ language, class: className = "h-5 w-5" }: { language?: Language; class?: string }) {
	if (!language) return null;
	return (
		<span
			role="img"
			aria-label={language.name}
			title={language.name}
			class={`icon-mask shrink-0 ${className}`}
			style={{ "--icon": `url("${language.icon}")` }}
		/>
	);
}
