import { useState, useEffect } from "preact/hooks";

interface CarouselProps {
    images: string[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    className?: string;
}

export default function Carousel({ 
    images, 
    autoPlay = true, 
    autoPlayInterval = 5000, 
    showDots = true, 
    showArrows = true,
    className = ""
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Auto-play functionality
    useEffect(() => {
        if (!autoPlay || isHovered || isFullscreen) return;
        
        const interval = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);
        
        return () => clearInterval(interval);
    }, [currentIndex, autoPlay, autoPlayInterval, isHovered, isFullscreen]);

    // Handle escape key for fullscreen
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };

        if (isFullscreen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            // Ensure overflow is reset when component unmounts or fullscreen changes
            if (!isFullscreen) {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        };
    }, [isFullscreen]);

    // Additional cleanup effect for when fullscreen is closed
    useEffect(() => {
        if (!isFullscreen) {
            // Reset overflow when fullscreen is closed
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    }, [isFullscreen]);

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const goToSlide = (index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    if (!images || images.length === 0) {
        return (
            <div className={`w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
                <p className="text-gray-500">No images available</p>
            </div>
        );
    }

    if (images.length === 1) {
        return (
            <div className={`w-full rounded-lg overflow-hidden ${className}`}>
                <img 
                    src={images[0]} 
                    alt="carousel image" 
                    className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={toggleFullscreen}
                />
            </div>
        );
    }

    return (
        <>
            {/* Main Carousel */}
            <div 
                className={`relative w-full rounded-lg overflow-hidden group ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Main Image Container */}
                <div className="relative w-full aspect-video overflow-hidden">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                                index === currentIndex 
                                    ? 'opacity-100 translate-x-0' 
                                    : index < currentIndex 
                                        ? '-translate-x-full opacity-0' 
                                        : 'translate-x-full opacity-0'
                            }`}
                        >
                            <img 
                                src={image} 
                                alt={`carousel image ${index + 1}`} 
                                className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                                loading={index === 0 ? "eager" : "lazy"}
                                onClick={toggleFullscreen}
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows - Only visible on hover */}
                {showArrows && (
                    <>
                        {/* Left Arrow */}
                        <button
                            onClick={prevSlide}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform ${
                                isHovered 
                                    ? 'opacity-100 translate-x-0' 
                                    : 'opacity-0 -translate-x-4'
                            } hover:scale-110 backdrop-blur-sm`}
                            aria-label="Previous image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={nextSlide}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform ${
                                isHovered 
                                    ? 'opacity-100 translate-x-0' 
                                    : 'opacity-0 translate-x-4'
                            } hover:scale-110 backdrop-blur-sm`}
                            aria-label="Next image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Dots Navigation */}
                {showDots && images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 ${
                                    index === currentIndex 
                                        ? 'bg-white scale-125 shadow-lg' 
                                        : 'bg-white/50 hover:bg-white/75'
                                }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentIndex + 1} / {images.length}
                </div>

                {/* Fullscreen Button */}
                <button
                    onClick={toggleFullscreen}
                    className="absolute top-4 left-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 backdrop-blur-sm"
                    aria-label="Toggle fullscreen"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                </button>
            </div>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div 
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={toggleFullscreen}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        {/* Fullscreen Image */}
                        <img 
                            src={images[currentIndex]} 
                            alt={`Fullscreen image ${currentIndex + 1}`} 
                            className="max-w-full max-h-full object-contain cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                            style={{ maxWidth: '100vw', maxHeight: '100vh' }}
                        />

                        {/* Fullscreen Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                                    className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 backdrop-blur-sm"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                                    className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 backdrop-blur-sm"
                                    aria-label="Next image"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Fullscreen Dots */}
                        {showDots && images.length > 1 && (
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
                                        className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 ${
                                            index === currentIndex 
                                                ? 'bg-white scale-125 shadow-lg' 
                                                : 'bg-white/50 hover:bg-white/75'
                                        }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Fullscreen Counter */}
                        <div className="absolute top-8 right-8 bg-black/50 text-white px-4 py-2 rounded-full text-lg font-medium backdrop-blur-sm">
                            {currentIndex + 1} / {images.length}
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={toggleFullscreen}
                            className="absolute top-8 left-8 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 backdrop-blur-sm"
                            aria-label="Close fullscreen"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}