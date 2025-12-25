import { JSX } from "preact";

interface Button3DProps {
	href?: string;
	target?: string;
	children: JSX.Element | JSX.Element[] | string;
	className?: string;
	class?: string; // Also accept 'class' for Preact compatibility
	// Color customization
	backgroundColor?: string; // Main button color (default: bg-red)
	textColor?: string; // Text color (default: text-white)
	shadow1Color?: string; // 3D edge color - the visible edge at the bottom (default: #a34545)
	shadow2Color?: string; // Soft shadow underneath for depth (default: #454ca3)
	focusColor?: string; // Focus outline color - hex or Tailwind class (default: red)
	// Size customization
	padding?: string; // Padding for the front layer (default: px-6 py-3)
	fontSize?: string; // Font size (default: text-lg md:text-xl)
	borderRadius?: string; // Border radius (default: rounded-[1rem])
}

export default function Button3D({
	href,
	target,
	children,
	className = "",
	class: classProp = "",
	backgroundColor = "bg-red",
	textColor = "text-white",
	shadow1Color = "#b34d4d",
	shadow2Color = "#b34d4d",
	focusColor = "red",
	padding = "px-6 py-3",
	fontSize = "text-lg md:text-xl",
	borderRadius = "rounded-[1rem]",
}: Button3DProps) {
	// Determine if shadow1Color (3D edge) is a hex (needs inline style) or Tailwind class
	const isShadow1Hex = shadow1Color.startsWith("#") || shadow1Color.startsWith("hsl(") || shadow1Color.startsWith("rgb(");
	const shadow1Style = isShadow1Hex ? { backgroundColor: shadow1Color } : {};
	const shadow1Class = isShadow1Hex ? "" : shadow1Color;
	
	// Determine if shadow2Color (soft shadow) is a hex (needs inline style) or Tailwind class
	const isShadow2Hex = shadow2Color.startsWith("#") || shadow2Color.startsWith("hsl(") || shadow2Color.startsWith("rgb(");
	const shadow2Style = isShadow2Hex ? { backgroundColor: shadow2Color } : {};
	const shadow2Class = isShadow2Hex ? "" : shadow2Color;
	
	// Focus outline - use Tailwind class or arbitrary value for hex
	const focusOutlineClass = focusColor.startsWith("#") 
		? `focus-visible:outline-[${focusColor}]`
		: `focus-visible:outline-${focusColor}`;

	const baseClasses = `relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-[filter] duration-[250ms] [-webkit-tap-highlight-color:transparent] select-none hover:brightness-110 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ${focusOutlineClass}`;

	// Shadow 2: soft shadow underneath for depth
	const shadow2Classes = `absolute top-0 left-0 w-full h-full ${borderRadius} ${shadow2Class}
		will-change-transform translate-y-[2px]
		transition-transform duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)]
		group-hover:translate-y-[4px] group-hover:transition-transform group-hover:duration-[250ms] group-hover:ease-[cubic-bezier(0.3,0.7,0.4,1.5)]
		group-active:translate-y-[1px] group-active:transition-transform group-active:duration-[34ms]`;

	// Shadow 1: 3D edge visible at the bottom
	const shadow1Classes = `absolute top-0 left-0 w-full h-full ${borderRadius} ${shadow1Class}`;

	const frontClasses = `block relative ${padding} ${borderRadius} ${fontSize} ${textColor} ${backgroundColor}
		will-change-transform -translate-y-[4px]
		transition-transform duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)]
		group-hover:-translate-y-[6px] group-hover:transition-transform group-hover:duration-[250ms] group-hover:ease-[cubic-bezier(0.3,0.7,0.4,1.5)]
		group-active:-translate-y-[2px] group-active:transition-transform group-active:duration-[34ms]`;

	const content = (
		<>
			<span class={shadow2Classes} style={shadow2Style}></span>
			<span class={shadow1Classes} style={shadow1Style}></span>
			<span class={frontClasses}>
				{children}
			</span>
		</>
	);

	// Combine className and class props (class takes precedence if both provided)
	const customClasses = classProp || className;
	const allClasses = customClasses 
		? `${baseClasses} ${customClasses} group`
		: `${baseClasses} group`;

	if (href) {
		return (
			<a
				href={href}
				target={target}
				class={allClasses}
			>
				{content}
			</a>
		);
	}

	return (
		<button
			type="button"
			class={allClasses}
		>
			{content}
		</button>
	);
}
