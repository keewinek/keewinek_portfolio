import { ComponentChildren, JSX } from "preact";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
	children: ComponentChildren;
	/** Renders an <a> instead of a <button> when set. */
	href?: string;
	onClick?: () => void;
	variant?: Variant;
	size?: Size;
	/** Icon rendered after the label; it slides on hover. */
	icon?: ComponentChildren;
	fullWidth?: boolean;
	disabled?: boolean;
	target?: string;
	rel?: string;
	download?: boolean;
	type?: "button" | "submit";
	class?: string;
	id?: string;
}

const BASE =
	"group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium no-underline select-none cursor-pointer " +
	"transition-[transform,background-color,border-color,color] duration-300 ease-out-expo active:scale-[0.97]";

const VARIANTS: Record<Variant, string> = {
	primary: "bg-red text-ink border border-red hover:bg-red-bright hover:border-red-bright",
	secondary: "bg-transparent text-fg border border-fg/25 hover:border-fg hover:bg-fg hover:text-ink",
	ghost: "bg-surface text-muted border border-line hover:text-fg hover:border-fg/40",
};

const SIZES: Record<Size, string> = {
	sm: "text-sm h-9 px-4",
	md: "text-[15px] h-11 px-6",
	lg: "text-base h-14 px-8",
};

export default function Button({
	children,
	href,
	onClick,
	variant = "primary",
	size = "md",
	icon,
	fullWidth = false,
	disabled = false,
	target,
	rel,
	download,
	type = "button",
	class: className = "",
	id,
}: ButtonProps) {
	const classes = [
		BASE,
		VARIANTS[variant],
		SIZES[size],
		fullWidth ? "w-full" : "",
		disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "",
		className,
	].filter(Boolean).join(" ");

	const content = (
		<>
			<span>{children}</span>
			{icon && (
				<span class="transition-transform duration-300 ease-out-expo group-hover:translate-x-1">{icon}</span>
			)}
		</>
	);

	if (href) {
		const anchorProps: JSX.HTMLAttributes<HTMLAnchorElement> = {
			href,
			class: classes,
			target,
			rel: rel ?? (target === "_blank" ? "noopener noreferrer" : undefined),
			id,
		};
		if (download) anchorProps.download = true;
		return <a {...anchorProps}>{content}</a>;
	}

	return (
		<button type={type} class={classes} onClick={onClick} disabled={disabled} id={id}>
			{content}
		</button>
	);
}
