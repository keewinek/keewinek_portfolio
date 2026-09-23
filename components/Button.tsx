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
	/** Icon rendered after the label — it slides on hover. */
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
	"group relative inline-flex items-center justify-center gap-2.5 rounded-full font-bold no-underline select-none cursor-pointer " +
	"transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/70 " +
	"focus-visible:ring-offset-2 focus-visible:ring-offset-background-black active:translate-y-0";

const VARIANTS: Record<Variant, string> = {
	primary:
		"bg-red text-background-black border border-red shadow-[0_10px_26px_-12px_rgba(255,108,108,0.9)] " +
		"hover:-translate-y-0.5 hover:bg-red-bright hover:border-red-bright hover:shadow-[0_16px_34px_-12px_rgba(255,108,108,0.95)]",
	secondary:
		"bg-transparent text-red border border-red/50 " +
		"hover:-translate-y-0.5 hover:bg-red hover:text-background-black hover:border-red hover:shadow-[0_14px_30px_-14px_rgba(255,108,108,0.9)]",
	ghost:
		"bg-white/[0.03] text-white/80 border border-white/15 " +
		"hover:-translate-y-0.5 hover:bg-white/[0.07] hover:text-white hover:border-white/35",
};

const SIZES: Record<Size, string> = {
	sm: "text-sm px-4 py-1.5",
	md: "text-base px-6 py-2.5",
	lg: "text-lg px-8 py-3.5",
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
		disabled ? "opacity-50 cursor-not-allowed pointer-events-none hover:translate-y-0 hover:shadow-none" : "",
		className,
	].filter(Boolean).join(" ");

	const content = (
		<>
			<span>{children}</span>
			{icon && (
				<span class="transition-transform duration-200 ease-out group-hover:translate-x-1">{icon}</span>
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
