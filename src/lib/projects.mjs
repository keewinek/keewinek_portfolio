import { readFileSync } from "node:fs";

const load = (name) => JSON.parse(readFileSync(new URL(`../../config/${name}`, import.meta.url), "utf8"));

export const projects = load("projects.json");
export const languages = load("languages.json");

/** Projects sorted newest first. Returns a new array; never mutates the source. */
export function projectsByDate(list = projects) {
	return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Featured projects, highest `proud` score first. */
export function featuredProjects() {
	return projects.filter((p) => p.proud).sort((a, b) => (b.proud ?? 0) - (a.proud ?? 0));
}

/** URL slug used by /projects/<slug>/. Must stay stable: existing links depend on it. */
export function projectSlug(project) {
	return project.title.toLowerCase().replace(/ /g, "-");
}

export function projectBySlug(slug) {
	return projects.find((p) => p.title.toLowerCase() === slug.replace(/-/g, " "));
}

export function languageById(id) {
	return languages.find((l) => l.id === id);
}

export function projectsUsing(languageId) {
	return projects.filter((p) => p.languages_used.includes(languageId)).length;
}

export function formatDate(dateString) {
	return new Date(dateString).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).replace(/\//g, ".");
}

export function projectYear(project) {
	return new Date(project.date).getFullYear();
}

export const STATE_LABEL = {
	finished: "Finished",
	working_on: "Working on",
	suspended: "Suspended",
};

/** Short one-liner for cards: the explicit tagline, or the first sentence of the description. */
export function projectSummary(project) {
	if (project.tagline) return project.tagline;
	const first = project.desc.split(/(?<=[.!?])\s/)[0];
	return first.length > 140 ? first.slice(0, 137).trimEnd() + "..." : first;
}

/** Download URLs in the data are sometimes relative; make them absolute so they work from nested routes. */
export function absoluteUrl(url) {
	return /^(https?:)?\/\//.test(url) || url.startsWith("/") ? url : "/" + url;
}

export const BIRTHDAY = new Date(2010, 0, 8);

export function ageToday(birth = BIRTHDAY) {
	const today = new Date();
	let age = today.getFullYear() - birth.getFullYear();
	const monthDiff = today.getMonth() - birth.getMonth();
	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
	return age;
}

export const firstProjectYear = () => Math.min(...projects.map(projectYear));
