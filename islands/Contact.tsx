import { useState } from "preact/hooks";
import { ArrowRightIcon, SpinnerIcon } from "../components/Icons.tsx";
import Button from "../components/Button.tsx";

const WEBHOOK_URL =
	"https://discord.com/api/webhooks/1292491295042048010/eaIjIrqefDTWtxOdw38yN6a_kNAknPm1s1QldWOFgI0OgOcZ-xFFuk8HypZk-kAj2Moy";

const MIN_LENGTH = 10;
const MAX_LENGTH = 3000;

type Status = "idle" | "sending" | "sent" | "failed";

const FIELD =
	"w-full rounded-field border border-line bg-ink px-4 py-3 text-fg placeholder:text-subtle transition-colors duration-200 " +
	"hover:border-fg/30 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/30";

export default function Contact({ contact_place = "contact" }: { contact_place?: string }) {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [emailError, setEmailError] = useState("");
	const [messageError, setMessageError] = useState("");
	const [status, setStatus] = useState<Status>("idle");

	const validate = () => {
		let ok = true;
		setEmailError("");
		setMessageError("");

		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setEmailError("This doesn't look like an email address.");
			ok = false;
		}
		if (message.trim().length < MIN_LENGTH) {
			setMessageError(`Message is too short. Write at least ${MIN_LENGTH} characters.`);
			ok = false;
		} else if (message.length > MAX_LENGTH) {
			setMessageError(`Message is too long. Keep it under ${MAX_LENGTH} characters.`);
			ok = false;
		}
		return ok;
	};

	const sendMessage = async (e: Event) => {
		e.preventDefault();
		if (status === "sending" || !validate()) return;

		setStatus("sending");
		try {
			const response = await fetch(WEBHOOK_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					embeds: [
						{
							title: `New message at ${contact_place}`,
							description: message,
							fields: [{ name: "Email left:", value: email || "No email provided", inline: true }],
							color: 0xff6c6c,
							timestamp: new Date().toISOString(),
							footer: { text: "Contact Form Submission" },
						},
					],
				}),
			});
			if (!response.ok) throw new Error(`Discord webhook failed: ${response.status} ${response.statusText}`);

			setEmail("");
			setMessage("");
			setStatus("sent");
		} catch (error) {
			console.error("Error sending message:", error);
			setStatus("failed");
		}
	};

	return (
		<form onSubmit={sendMessage} noValidate class="space-y-6">
			<div class="flex flex-col gap-2">
				<label for="contact_email" class="text-sm font-medium text-fg">
					Your email <span class="font-normal text-subtle">(optional)</span>
				</label>
				<input
					id="contact_email"
					type="email"
					autocomplete="email"
					value={email}
					onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
					placeholder="name.surname@gmail.com"
					aria-invalid={emailError ? "true" : undefined}
					aria-describedby={emailError ? "contact_email_error" : "contact_email_help"}
					class={FIELD}
				/>
				{emailError
					? <p id="contact_email_error" class="text-sm text-red">{emailError}</p>
					: <p id="contact_email_help" class="text-sm text-subtle">Leave it if you want a reply.</p>}
			</div>

			<div class="flex flex-col gap-2">
				<div class="flex items-baseline justify-between">
					<label for="contact_message" class="text-sm font-medium text-fg">Message</label>
					<span class={`text-xs tabular-nums ${message.length > MAX_LENGTH ? "text-red" : "text-subtle"}`}>
						{message.length} / {MAX_LENGTH}
					</span>
				</div>
				<textarea
					id="contact_message"
					value={message}
					onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
					placeholder="Hi keewinek, I have an idea for..."
					rows={6}
					aria-invalid={messageError ? "true" : undefined}
					aria-describedby={messageError ? "contact_message_error" : undefined}
					class={`${FIELD} resize-y`}
				/>
				{messageError && <p id="contact_message_error" class="text-sm text-red">{messageError}</p>}
			</div>

			<div class="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
				<p role="status" aria-live="polite" class="text-sm">
					{status === "sent" && <span class="text-fg">Message sent. Thanks, I'll read it soon.</span>}
					{status === "failed" && (
						<span class="text-red">
							Couldn't send the message. Try again, or email{" "}
							<a href="mailto:keewinek@gmail.com" class="underline">keewinek@gmail.com</a>.
						</span>
					)}
				</p>
				<Button
					type="submit"
					id="contact_send_button"
					disabled={status === "sending"}
					icon={status === "sending" ? <SpinnerIcon class="h-4 w-4 animate-spin" /> : <ArrowRightIcon class="h-4 w-4" />}
				>
					{status === "sending" ? "Sending" : "Send message"}
				</Button>
			</div>
		</form>
	);
}
