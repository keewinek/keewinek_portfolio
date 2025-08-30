import NavBar from "../islands/NavBar.tsx";
import Redirect from "../islands/Redirect.tsx";

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

				<div class="max-w-md w-full mx-auto">
					<a href={DISCORD_INVITE_URL} target="_blank" class="text-center text-lg md:text-xl text-red border border-red px-6 py-3 rounded-full transition-all duration-200 hover:bg-red hover:text-background-black font-bold flex items-center">
						<span class="mx-auto w-full px-6">Join my Discord Server</span>
						<i class="fa-solid fa-arrow-right ml-auto"></i>
					</a>
				</div>

				<Redirect url={DISCORD_INVITE_URL} />
			</div>
		</>
	);
}
