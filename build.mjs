// Static site build: renders every page to dist/, copies assets, then runs Tailwind over the output.
import { cpSync, existsSync, mkdirSync, rmSync, watch, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");

function write(path, content) {
	const file = join(dist, path);
	mkdirSync(dirname(file), { recursive: true });
	writeFileSync(file, content);
}

async function build() {
	// Bust the module cache so --watch picks up edits.
	const v = `?v=${Date.now()}`;
	const load = (p) => import(pathToFileURL(join(root, p)).href + v);
	const { projects, projectSlug } = await load("src/lib/projects.mjs");
	const { homePage } = await load("src/pages/home.mjs");
	const { projectsPage } = await load("src/pages/projects.mjs");
	const { projectPage } = await load("src/pages/project.mjs");
	const { notFoundPage } = await load("src/pages/not-found.mjs");

	rmSync(dist, { recursive: true, force: true });
	mkdirSync(dist, { recursive: true });

	cpSync(join(root, "public"), dist, { recursive: true });
	cpSync(join(root, "src/client"), join(dist, "js"), { recursive: true });

	write("index.html", homePage());
	write("projects/index.html", projectsPage());
	for (const project of projects) write(`projects/${projectSlug(project)}/index.html`, projectPage(project));
	write("404.html", notFoundPage());

	const tailwind = join(root, "node_modules/.bin/tailwindcss");
	if (!existsSync(tailwind)) throw new Error("tailwindcss is missing; run `npm install` first.");
	execFileSync(
		tailwind,
		["-c", join(root, "tailwind.config.js"), "-i", join(root, "src/styles.css"), "-o", join(dist, "styles.css"), "--minify"],
		{ stdio: ["ignore", "ignore", "inherit"], cwd: root },
	);
	// The client scripts were only copied so Tailwind could scan them in src/; dist/js is what ships.
	console.log(`Built ${projects.length + 3} pages into dist/`);
}

await build();

if (process.argv.includes("--watch")) {
	let timer;
	for (const dir of ["src", "public", "config"]) {
		watch(join(root, dir), { recursive: true }, () => {
			clearTimeout(timer);
			timer = setTimeout(() => build().catch((e) => console.error(e)), 150);
		});
	}
	console.log("Watching for changes...");
}
