/** Small inline SVG icons — replaces Font Awesome CDN. */

type IconProps = { class?: string };

export function ArrowRightIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
			<path d="M5 12h14" />
			<path d="M13 6l6 6-6 6" />
		</svg>
	);
}

export function ChevronLeftIcon({ class: className = "w-5 h-5" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
			<path d="M15 18l-6-6 6-6" />
		</svg>
	);
}

export function ChevronRightIcon({ class: className = "w-5 h-5" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
			<path d="M9 18l6-6-6-6" />
		</svg>
	);
}

export function LinkIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
			<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
			<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
		</svg>
	);
}

export function DownloadIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<path d="M7 10l5 5 5-5" />
			<path d="M12 15V3" />
		</svg>
	);
}

export function SearchIcon({ class: className = "w-5 h-5" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
			<circle cx="11" cy="11" r="8" />
			<path d="M21 21l-4.3-4.3" />
		</svg>
	);
}

export function ExpandIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
			<path d="M15 3h6v6" />
			<path d="M9 21H3v-6" />
			<path d="M21 3l-7 7" />
			<path d="M3 21l7-7" />
		</svg>
	);
}

export function SpinnerIcon({ class: className = "w-4 h-4 animate-spin" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	);
}
