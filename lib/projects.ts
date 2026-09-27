import projectsData from "../config/projects.json" with { type: "json" };
import languagesData from "../config/languages.json" with { type: "json" };

export type ProjectState = "finished" | "working_on" | "suspended";

export interface Download {
	name: string;
	url: string;
}

export interface Project {
	title: string;
	desc: string;
	tagline?: string;
	images: string[];
	site_url: string;
	date: string;
	state: ProjectState | string;
	languages_used: string[];
	proud?: number;
	downloads?: Download[];
}

export interface Language {
	id: string;
	name: string;
	icon: string;
	url: string;
	type: string;
}

export const projects = projectsData as Project[];
export const languages = languagesData as Language[];

/** Projects sorted newest first. Returns a new array; never mutates the source. */
export function projectsByDate(list: Project[] = projects): Project[] {
	return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Featured projects, highest `proud` score first. */
export function featuredProjects(): Project[] {
	return projects.filter((p) => p.proud).sort((a, b) => (b.proud ?? 0) - (a.proud ?? 0));
}

/** URL slug used by /projects/[project_id]. Must stay stable: existing links depend on it. */
export function projectSlug(project: Project): string {
	return project.title.toLowerCase().replace(/ /g, "-");
}

export function projectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.title.toLowerCase() === slug.replace(/-/g, " "));
}

export function languageById(id: string): Language | undefined {
	return languages.find((l) => l.id === id);
}

export function projectsUsing(languageId: string): number {
	return projects.filter((p) => p.languages_used.includes(languageId)).length;
}

export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).replace(/\//g, ".");
}

export function projectYear(project: Project): number {
	return new Date(project.date).getFullYear();
}

export const STATE_LABEL: Record<string, string> = {
	finished: "Finished",
	working_on: "Working on",
	suspended: "Suspended",
};

/** Short one-liner for cards: the explicit tagline, or the first sentence of the description. */
export function projectSummary(project: Project): string {
	if (project.tagline) return project.tagline;
	const first = project.desc.split(/(?<=[.!?])\s/)[0];
	return first.length > 140 ? first.slice(0, 137).trimEnd() + "..." : first;
}

/** Download URLs in the data are sometimes relative; make them absolute so they work from nested routes. */
export function absoluteUrl(url: string): string {
	return /^(https?:)?\/\//.test(url) || url.startsWith("/") ? url : "/" + url;
}

export function ageToday(birth = new Date(2010, 0, 8)): number {
	const today = new Date();
	let age = today.getFullYear() - birth.getFullYear();
	const monthDiff = today.getMonth() - birth.getMonth();
	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
	return age;
}
