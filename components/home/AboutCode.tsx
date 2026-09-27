import { type ComponentChildren, Fragment } from "preact";
import { ageToday, languages, projects } from "../../lib/projects.ts";

// Syntax colours stay inside the brand family: red for keywords, neutrals for the rest.
const K = ({ children }: { children: ComponentChildren }) => <span class="text-red">{children}</span>;
const T = ({ children }: { children: ComponentChildren }) => <span class="font-medium text-fg">{children}</span>;
const S = ({ children }: { children: ComponentChildren }) => <span class="text-[#f4b4b4]">"{children}"</span>;
const N = ({ children }: { children: ComponentChildren }) => <span class="text-red-bright">{children}</span>;
const C = ({ children }: { children: ComponentChildren }) => <span class="text-subtle">{children}</span>;

const FILE_COMMENT = "// about-keewinek.cpp";

function strings(values: string[]) {
	return values.map((v, i) => (
		<Fragment key={v}>
			<S>{v}</S>
			{i < values.length - 1 && ", "}
		</Fragment>
	));
}

export default function AboutCode() {
	const firstYear = Math.min(...projects.map((p) => new Date(p.date).getFullYear()));

	// [indent level, content]
	const line = (indent: number, content: ComponentChildren): [number, ComponentChildren] => [indent, content];
	const lines = [
		line(0, <C>{FILE_COMMENT}</C>),
		line(0, <><K>class</K> <T>keewinek</T> {"{"}</>),
		line(0, <K>public:</K>),
		line(1, <><T>string</T> name = <S>Wojtek</S>;</>),
		line(1, <><T>string</T> email = <S>keewinek@gmail.com</S>;</>),
		line(1, <><T>vector&lt;string&gt;</T> known_languages = {"{"}</>),
		line(2, <>{strings(["C++", "Python", "C#", "Lua"])},</>),
		line(2, <>{strings(["js", "ts", "HTML"])}</>),
		line(1, <>{"};"}</>),
		line(1, <><K>int</K> total_projects = <N>{projects.length}</N>;</>),
		line(0, <K>private:</K>),
		line(1, <><K>int</K> age = <N>{ageToday()}</N>;</>),
		line(1, <><T>city</T> location = Poland.Cities.Warsaw;</>),
		line(1, <><T>vector&lt;string&gt;</T> hobbies = {"{"}</>),
		line(2, <>{strings(["Music", "Coding", "Python", "Movie Making"])}</>),
		line(1, <>{"};"}</>),
		line(0, <>{"};"}</>),
	];

	const stats = [
		{ value: projects.length, label: "projects" },
		{ value: languages.length, label: "languages & tools" },
		{ value: firstYear, label: "first project" },
	];

	return (
		<section id="about_me" class="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-24 md:px-8 md:py-32">
			<div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
				<div class="lg:col-span-5">
					<h2 class="reveal-on-scroll font-display text-5xl font-extrabold tracking-[-0.04em] md:text-7xl">
						About me
					</h2>
					<div class="reveal-on-scroll mt-8 max-w-[52ch] space-y-5 text-lg leading-relaxed text-muted" style={{ "--i": 1 }}>
						<p>
							I'm Wojtek, known online as keewinek. I started with Roblox games and Python tools, and today I build
							web apps, mobile apps and games from start to finish.
						</p>
						<p>
							I like owning the whole thing: the design, the frontend, the backend and getting it live. Right now
							I'm working on <a href="/projects/studdly" class="text-fg underline decoration-red decoration-2 underline-offset-4 hover:text-red">Studdly</a>.
						</p>
					</div>

					<dl class="reveal-on-scroll mt-12 grid grid-cols-3 gap-6" style={{ "--i": 2 }}>
						{stats.map((stat) => (
							<div key={stat.label} class="flex flex-col">
								<dt class="order-2 mt-1 text-sm text-subtle">{stat.label}</dt>
								<dd class="font-display text-4xl font-bold tracking-tight text-fg md:text-5xl">{stat.value}</dd>
							</div>
						))}
					</dl>
				</div>

				<figure class="reveal-on-scroll self-start overflow-hidden rounded-card border border-line bg-surface lg:col-span-7" style={{ "--i": 1 }}>
					<figcaption class="flex h-12 items-center gap-3 border-b border-line px-5 font-mono text-xs text-muted">
						<img src="/logo-128.png" alt="" width={16} height={16} class="h-4 w-4" loading="lazy" />
						about-keewinek.cpp
					</figcaption>
					<pre class="overflow-x-auto py-6 font-mono text-[13px] leading-7 text-muted md:py-8 md:text-[15px] md:leading-8">
						<code>
							{lines.map(([indent, content], i) => (
								<span key={i} class="code-line flex" style={{ "--i": i }}>
									<span class="w-12 shrink-0 select-none pr-5 text-right text-subtle/50 md:w-16">{i + 1}</span>
									<span class="whitespace-pre pr-6" style={{ paddingLeft: `${indent * 2}ch` }}>{content}</span>
								</span>
							))}
						</code>
					</pre>
				</figure>
			</div>
		</section>
	);
}
