import { DiscordIcon, InstagramIcon, LinkedinIcon, SoundcloudIcon } from "../components/icons.mjs";

/** Profiles shown in the footer and the contact section. Discord goes through the /discord redirect. */
export const SOCIALS = [
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/keewinek/", icon: LinkedinIcon },
	{ label: "Instagram", href: "https://www.instagram.com/keewinek/", icon: InstagramIcon },
	{ label: "SoundCloud", href: "https://soundcloud.com/keewinek", icon: SoundcloudIcon },
	{ label: "Discord Server", href: "/discord", icon: DiscordIcon },
];
