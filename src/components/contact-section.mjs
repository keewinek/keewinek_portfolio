import { html } from "../lib/html.mjs";
import { button } from "./button.mjs";
import { ArrowRightIcon, MailIcon, SpinnerIcon } from "./icons.mjs";
import { SOCIALS } from "../lib/socials.mjs";

const FIELD =
	"w-full rounded-field border border-line bg-ink px-4 py-3 text-fg placeholder:text-subtle transition-colors duration-200 " +
	"hover:border-fg/30 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/30";

export const MAX_LENGTH = 3000;

function contactForm(place) {
	return html`
		<form data-contact-form data-place="${place}" novalidate class="space-y-6">
			<div class="flex flex-col gap-2">
				<label for="contact_email" class="text-sm font-medium text-fg">
					Your email <span class="font-normal text-subtle">(optional)</span>
				</label>
				<input
					id="contact_email"
					type="email"
					autocomplete="email"
					placeholder="name.surname@gmail.com"
					aria-describedby="contact_email_help"
					class="${FIELD}"
				/>
				<p id="contact_email_help" class="text-sm text-subtle" data-email-help>Leave it if you want a reply.</p>
				<p id="contact_email_error" class="text-sm text-red" data-email-error hidden></p>
			</div>

			<div class="flex flex-col gap-2">
				<div class="flex items-baseline justify-between">
					<label for="contact_message" class="text-sm font-medium text-fg">Message</label>
					<span class="text-xs tabular-nums text-subtle" data-counter>0 / ${MAX_LENGTH}</span>
				</div>
				<textarea
					id="contact_message"
					placeholder="Hi keewinek, I have an idea for..."
					rows="6"
					class="${FIELD} resize-y"
				></textarea>
				<p id="contact_message_error" class="text-sm text-red" data-message-error hidden></p>
			</div>

			<div class="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
				<p role="status" aria-live="polite" class="text-sm" data-status>
					<span class="text-fg" data-status-sent hidden>Message sent. Thanks, I'll read it soon.</span>
					<span class="text-red" data-status-failed hidden>
						Couldn't send the message. Try again, or email
						<a href="mailto:keewinek@gmail.com" class="underline">keewinek@gmail.com</a>.
					</span>
				</p>
				${button({
					type: "submit",
					id: "contact_send_button",
					label: html`<span data-send-label>Send message</span>`,
					icon: html`<span data-icon-idle>${ArrowRightIcon("h-4 w-4")}</span><span data-icon-busy hidden>${SpinnerIcon("h-4 w-4 animate-spin")}</span>`,
				})}
			</div>
		</form>
	`;
}

const linkClass =
	"underline decoration-line decoration-2 underline-offset-4 transition-colors group-hover:decoration-red";

export function contactSection({ title = "Have a project in mind?", place = "contact" } = {}) {
	return html`
		<section id="contact" class="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-24 md:px-8 md:py-32">
			<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
				<div class="lg:col-span-5">
					<h2
						class="reveal-on-scroll font-display font-extrabold tracking-[-0.04em] ${
							title.length > 26 ? "text-4xl md:text-6xl" : "text-5xl md:text-7xl"
						}"
					>
						${title}
					</h2>
					<p class="reveal-on-scroll mt-6 max-w-[42ch] text-lg leading-relaxed text-muted" style="--i: 1">
						Send me a message with this form. For anything formal, email me directly.
					</p>
					<ul class="reveal-on-scroll mt-10 space-y-4" style="--i: 2">
						<li>
							<a href="mailto:keewinek@gmail.com" class="group inline-flex items-center gap-3 text-lg text-fg">
								${MailIcon("h-5 w-5 text-red")}
								<span class="${linkClass}">keewinek@gmail.com</span>
							</a>
						</li>
						${SOCIALS.map((s) => html`
							<li>
								<a href="${s.href}" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-3 text-lg text-fg">
									${s.icon("h-5 w-5 text-red")}
									<span class="${linkClass}">${s.label}</span>
								</a>
							</li>
						`)}
					</ul>
				</div>

				<div class="reveal-on-scroll rounded-card border border-line bg-surface p-6 md:p-10 lg:col-span-7" style="--i: 1">
					${contactForm(place)}
				</div>
			</div>
		</section>
	`;
}
