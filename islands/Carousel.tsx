import { useState, useEffect } from "preact/hooks";
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon } from "../components/Icons.tsx";

interface CarouselProps {
    images: string[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    className?: string;
}

function isVideo(src: string) {
    return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
}

function Media({
    src,
    alt,
    class: className,
    loading,
    onClick,
}: {
    src: string;
    alt: string;
    class?: string;
    loading?: "eager" | "lazy";
    onClick?: () => void;
}) {
    if (isVideo(src)) {
        return (
            <video
                src={src}
                class={className}
                autoPlay
                muted
                loop
                playsInline
                onClick={onClick}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            class={className}
            loading={loading}
            decoding="async"
            onClick={onClick}
        />
    );
}

export default function Carousel({
    images,
    autoPlay = true,
    autoPlayInterval = 5000,
    showDots = true,
    showArrows = true,
    className = "",
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!autoPlay || isHovered) return;

        const interval = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [currentIndex, autoPlay, autoPlayInterval, isHovered]);

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
        globalThis.open(images[currentIndex], "_blank");
    };

    if (!images || images.length === 0) {
        return (
            <div class={`w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
                <p class="text-gray-500">No images available</p>
            </div>
        );
    }

    if (images.length === 1) {
        return (
            <div class={`w-full rounded-lg overflow-hidden ${className}`}>
                <Media
                    src={images[0]}
                    alt="carousel image"
                    class="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={toggleFullscreen}
                />
            </div>
        );
    }

    return (
        <>
            <div
                class={`relative w-full rounded-lg overflow-hidden group ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div class="relative w-full aspect-video overflow-hidden">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            class={`absolute inset-0 transition-all duration-300 ease-in-out ${
                                index === currentIndex
                                    ? "opacity-100 translate-x-0"
                                    : index < currentIndex
                                    ? "-translate-x-full opacity-0"
                                    : "translate-x-full opacity-0"
                            }`}
                        >
                            <Media
                                src={image}
                                alt={`carousel image ${index + 1}`}
                                class="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                                loading={index === 0 ? "eager" : "lazy"}
                                onClick={toggleFullscreen}
                            />
                        </div>
                    ))}
                </div>

                {showArrows && (
                    <>
                        <button
                            onClick={prevSlide}
                            class={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform ${
                                isHovered
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-4"
                            } hover:scale-110 backdrop-blur-sm`}
                            aria-label="Previous image"
                        >
                            <ChevronLeftIcon class="w-5 h-5" />
                        </button>

                        <button
                            onClick={nextSlide}
                            class={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform ${
                                isHovered
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-4"
                            } hover:scale-110 backdrop-blur-sm`}
                            aria-label="Next image"
                        >
                            <ChevronRightIcon class="w-5 h-5" />
                        </button>
                    </>
                )}

                {showDots && images.length > 1 && (
                    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                class={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 ${
                                    index === currentIndex
                                        ? "bg-white scale-125 shadow-lg"
                                        : "bg-white/75"
                                }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                <div class="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentIndex + 1} / {images.length}
                </div>

                <button
                    onClick={toggleFullscreen}
                    class="absolute top-4 left-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 backdrop-blur-sm"
                    aria-label="Toggle fullscreen"
                >
                    <ExpandIcon class="w-4 h-4" />
                </button>
            </div>
        </>
    );
}
