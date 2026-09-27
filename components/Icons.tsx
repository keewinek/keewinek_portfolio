/** Icons from Phosphor (bold weight, MIT): https://phosphoricons.com */

type IconProps = { class?: string };

export function ArrowRightIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" />
		</svg>
	);
}

export function ArrowUpRightIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
		</svg>
	);
}

export function ChevronLeftIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z" />
		</svg>
	);
}

export function ChevronRightIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z" />
		</svg>
	);
}

export function LinkIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M228,104a12,12,0,0,1-24,0V69l-59.51,59.51a12,12,0,0,1-17-17L187,52H152a12,12,0,0,1,0-24h64a12,12,0,0,1,12,12Zm-44,24a12,12,0,0,0-12,12v64H52V84h64a12,12,0,0,0,0-24H48A20,20,0,0,0,28,80V208a20,20,0,0,0,20,20H176a20,20,0,0,0,20-20V140A12,12,0,0,0,184,128Z" />
		</svg>
	);
}

export function DownloadIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0Zm-108.49,8.49a12,12,0,0,0,17,0l40-40a12,12,0,0,0-17-17L140,115V32a12,12,0,0,0-24,0v83L96.49,95.51a12,12,0,0,0-17,17Z" />
		</svg>
	);
}

export function SearchIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z" />
		</svg>
	);
}

export function SpinnerIcon({ class: className = "w-4 h-4 animate-spin" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M236,128a108,108,0,0,1-216,0c0-42.52,24.73-81.34,63-98.9A12,12,0,1,1,93,50.91C63.24,64.57,44,94.83,44,128a84,84,0,0,0,168,0c0-33.17-19.24-63.43-49-77.09A12,12,0,1,1,173,29.1C211.27,46.66,236,85.48,236,128Z" />
		</svg>
	);
}

export function ExpandIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M220,48V88a12,12,0,0,1-24,0V60H168a12,12,0,0,1,0-24h40A12,12,0,0,1,220,48ZM88,196H60V168a12,12,0,0,0-24,0v40a12,12,0,0,0,12,12H88a12,12,0,0,0,0-24Zm120-40a12,12,0,0,0-12,12v28H168a12,12,0,0,0,0,24h40a12,12,0,0,0,12-12V168A12,12,0,0,0,208,156ZM88,36H48A12,12,0,0,0,36,48V88a12,12,0,0,0,24,0V60H88a12,12,0,0,0,0-24Z" />
		</svg>
	);
}

export function MenuIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM40,76H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24ZM216,180H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z" />
		</svg>
	);
}

export function CloseIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" />
		</svg>
	);
}

export function DiscordIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M108,136a16,16,0,1,1-16-16A16,16,0,0,1,108,136Zm56-16a16,16,0,1,0,16,16A16,16,0,0,0,164,120Zm76.07,76.56-67,29.71A20.15,20.15,0,0,1,146,214.9l-8.54-23.13c-3.13.14-6.27.24-9.45.24s-6.32-.1-9.45-.24L110,214.9a20.19,20.19,0,0,1-27.08,11.37l-67-29.71A19.93,19.93,0,0,1,4.62,173.41L34.15,57A20,20,0,0,1,50.37,42.19l36.06-5.93A20.26,20.26,0,0,1,109.22,51.1l4.41,17.41c4.74-.33,9.52-.51,14.37-.51s9.63.18,14.37.51l4.41-17.41a20.25,20.25,0,0,1,22.79-14.84l36.06,5.93A20,20,0,0,1,221.85,57l29.53,116.38A19.93,19.93,0,0,1,240.07,196.56ZM227.28,176,199.23,65.46l-30.07-4.94-2.84,11.17c2.9.58,5.78,1.2,8.61,1.92a12,12,0,1,1-5.86,23.27A168.43,168.43,0,0,0,128,92a168.43,168.43,0,0,0-41.07,4.88,12,12,0,0,1-5.86-23.27c2.83-.72,5.71-1.34,8.61-1.92L86.85,60.52,56.77,65.46,28.72,176l60.22,26.7,5-13.57c-4.37-.76-8.67-1.65-12.88-2.71a12,12,0,0,1,5.86-23.28A168.43,168.43,0,0,0,128,168a168.43,168.43,0,0,0,41.07-4.88,12,12,0,0,1,5.86,23.28c-4.21,1.06-8.51,1.95-12.88,2.71l5,13.57Z" />
		</svg>
	);
}

export function MailIcon({ class: className = "w-4 h-4" }: IconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class={className} aria-hidden="true">
			<path d="M224,44H32A12,12,0,0,0,20,56V192a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A12,12,0,0,0,224,44ZM193.15,68,128,127.72,62.85,68ZM44,188V83.28l75.89,69.57a12,12,0,0,0,16.22,0L212,83.28V188Z" />
		</svg>
	);
}
