import { useState } from "preact/hooks";

export default function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	};

	const handleNavClick = (sectionId: string) => {
		setIsMenuOpen(false);
		
		// Check if we're on the same page (index page)
		const currentPath = window.location.pathname;
		if (currentPath === '/' || currentPath === '/index.html' || currentPath === '') {
			// On the same page, scroll smoothly
			scrollToSection(sectionId);
		} else {
			// On a different page, navigate to index with hash
			window.location.href = `./#${sectionId}`;
		}
	};

	return (
		<>
			{/* Desktop Navigation */}
			<nav 
				id="main_nav" 
				class="fixed top-0 left-1/2 -translate-x-1/2 z-50 overflow-hidden w-full max-w-fit max-h-[2.5rem] flex-row items-center justify-center mt-2 py-2 px-8 backdrop-blur-lg rounded-full hidden lg:flex"
			>
				<a href="./" class="no-underline text-lg m-0 mr-5 flex items-center justify-center cursor-pointer select-none text-white transition-all duration-200">
					<img id="nav_home_icon" src="./logo.png" class="h-[30px] object-contain"/>
				</a>

				<button onClick={() => handleNavClick('about_me')} class="duration-200 hover:text-red mx-2 text-lg bg-transparent border-none text-white cursor-pointer">About Me</button>
				<button onClick={() => handleNavClick('skills')} class="duration-200 hover:text-red mx-2 text-lg bg-transparent border-none text-white cursor-pointer">Skills</button>
				<a href="./projects" class="duration-200 hover:text-red mx-2 text-lg">Projects</a>
				<button onClick={() => handleNavClick('contact')} class="duration-200 hover:text-red mx-2 text-lg bg-transparent border-none text-white cursor-pointer">Contact</button>
				<a href="discord" target="_blank" id="nav_contact" class="duration-200 hover:text-red mx-2 text-lg max-xl:hidden">Discord Server</a>
			</nav>

			{/* Mobile Navigation */}
			<nav class="fixed top-0 left-0 right-0 z-50 lg:hidden backdrop-blur-lg">
				<div class="flex items-center justify-center px-4 py-3">
					{/* Logo and Title - Centered */}
					<a href="./" class="flex items-center space-x-2 no-underline text-white">
						<img src="./logo.png" class="h-8 w-8 object-contain" alt="Keewinek Logo"/>
						<span class="text-xl font-semibold">Keewinek</span>
					</a>

					{/* Hamburger Menu Button - Positioned absolutely on the right */}
					<button
						onClick={toggleMenu}
						class="absolute right-4 text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
						aria-label="Toggle menu"
					>
						<div class="w-6 h-6 flex flex-col justify-center items-center">
							<span class={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
							<span class={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
							<span class={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
						</div>
					</button>
				</div>

				{/* Mobile Menu */}
				<div class={`overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
					<div class="px-4 pb-4 space-y-3">
						<button 
							onClick={() => handleNavClick('about_me')}
							class="block text-white hover:text-red transition-colors duration-200 py-2 text-lg bg-transparent border-none text-left w-full cursor-pointer"
						>
							About Me
						</button>
						<button 
							onClick={() => handleNavClick('skills')}
							class="block text-white hover:text-red transition-colors duration-200 py-2 text-lg bg-transparent border-none text-left w-full cursor-pointer"
						>
							Skills
						</button>
						<a 
							href="./projects" 
							class="block text-white hover:text-red transition-colors duration-200 py-2 text-lg"
							onClick={() => setIsMenuOpen(false)}
						>
							Projects
						</a>
						<button 
							onClick={() => handleNavClick('contact')}
							class="block text-white hover:text-red transition-colors duration-200 py-2 text-lg bg-transparent border-none text-left w-full cursor-pointer"
						>
							Contact
						</button>
						<a 
							href="discord" 
							target="_blank" 
							class="block text-white hover:text-red transition-colors duration-200 py-2 text-lg"
							onClick={() => setIsMenuOpen(false)}
						>
							Discord Server
						</a>
					</div>
				</div>
			</nav>
		</>
	);
}
