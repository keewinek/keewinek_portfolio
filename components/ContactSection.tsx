import Contact from "../islands/Contact.tsx";
import { DiscordIcon, MailIcon } from "./Icons.tsx";

export default function ContactSection(
	{ title = "Have a project in mind?", place = "contact" }: { title?: string; place?: string },
) {
	return (
		<section id="contact" class="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-24 md:px-8 md:py-32">
			<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
				<div class="lg:col-span-5">
					<h2
						class={`reveal-on-scroll font-display font-extrabold tracking-[-0.04em] ${
							title.length > 26 ? "text-4xl md:text-6xl" : "text-5xl md:text-7xl"
						}`}
					>
						{title}
					</h2>
					<p class="reveal-on-scroll mt-6 max-w-[42ch] text-lg leading-relaxed text-muted" style={{ "--i": 1 }}>
						Send me a message with this form. For anything formal, email me directly.
					</p>
					<ul class="reveal-on-scroll mt-10 space-y-4" style={{ "--i": 2 }}>
						<li>
							<a href="mailto:keewinek@gmail.com" class="group inline-flex items-center gap-3 text-lg text-fg">
								<MailIcon class="h-5 w-5 text-red" />
								<span class="underline decoration-line decoration-2 underline-offset-4 transition-colors group-hover:decoration-red">
									keewinek@gmail.com
								</span>
							</a>
						</li>
						<li>
							<a href="/discord" target="_blank" class="group inline-flex items-center gap-3 text-lg text-fg">
								<DiscordIcon class="h-5 w-5 text-red" />
								<span class="underline decoration-line decoration-2 underline-offset-4 transition-colors group-hover:decoration-red">
									Discord Server
								</span>
							</a>
						</li>
					</ul>
				</div>

				<div class="reveal-on-scroll rounded-card border border-line bg-surface p-6 md:p-10 lg:col-span-7" style={{ "--i": 1 }}>
					<Contact contact_place={place} />
				</div>
			</div>
		</section>
	);
}
