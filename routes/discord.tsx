import NavBar from "../islands/NavBar.tsx";
import Redirect from "../islands/Redirect.tsx";
import { ArrowRightIcon } from "../components/Icons.tsx";
import Button from "../components/Button.tsx";

export default function Discord() {
	const DISCORD_INVITE_URL = "https://discord.gg/VCsGp8xCtf";

	return (
		<>
			<head>
				<title>Keewinek's Discord Server</title>
			</head>
			<div class="bg-background-black text-white font-Comfortaa overflow-x-hidden px-2 pb-[1rem]">
				<NavBar />

				<h1 class="text-center text-3xl md:text-6xl mb-[4rem] mt-[5rem]">My Discord Server</h1>

				<div class="max-w-md w-full mx-auto flex justify-center">
					<Button href={DISCORD_INVITE_URL} target="_blank" size="lg" icon={<ArrowRightIcon class="h-4 w-4" />}>
						Join my Discord Server
					</Button>
				</div>

				<Redirect url={DISCORD_INVITE_URL} />
			</div>
		</>
	);
}
