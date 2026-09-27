import { Head } from "$fresh/runtime.ts";
import Hero from "../components/home/Hero.tsx";
import ProjectMarquee from "../components/home/ProjectMarquee.tsx";
import FeaturedBento from "../components/home/FeaturedBento.tsx";
import AboutCode from "../components/home/AboutCode.tsx";
import Skills from "../components/home/Skills.tsx";
import ContactSection from "../components/ContactSection.tsx";

export default function Home() {
	return (
		<>
			<Head>
				<title>Hi. I am keewinek.</title>
				<meta property="og:title" content="Hi. I am keewinek." />
			</Head>
			<Hero />
			<ProjectMarquee />
			<FeaturedBento />
			<AboutCode />
			<Skills />
			<ContactSection />
		</>
	);
}
