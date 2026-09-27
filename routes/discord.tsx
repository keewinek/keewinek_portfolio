import { Head } from "$fresh/runtime.ts";
import Redirect from "../islands/Redirect.tsx";
import { DiscordIcon } from "../components/Icons.tsx";
import Button from "../components/Button.tsx";

const DISCORD_INVITE_URL = "https://discord.gg/VCsGp8xCtf";

export default function Discord() {
	return (
		<>
			<Head>
				<title>Keewinek's Discord Server</title>
			</Head>
			<div class="mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col items-start justify-center px-4 pt-16 md:px-8">
				<h1 class="rise font-display text-6xl font-extrabold tracking-[-0.045em] md:text-8xl">My Discord Server</h1>
				<p class="rise mt-6 max-w-[44ch] text-lg text-muted" style={{ "--d": "120ms" }}>
					Taking you there now. If nothing happens, use the button.
				</p>
				<div class="rise mt-10" style={{ "--d": "220ms" }}>
					<Button href={DISCORD_INVITE_URL} target="_blank" size="lg" icon={<DiscordIcon class="h-5 w-5" />}>
						Join the server
					</Button>
				</div>
				<Redirect url={DISCORD_INVITE_URL} />
			</div>
		</>
	);
}
