import { useState, useEffect } from "preact/hooks";
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon } from "../components/Icons.tsx";

interface CarouselProps {
    images: string[];
    alt?: string;
    showThumbs?: boolean;
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
    alt = "Project screenshot",
    autoPlay = true,
    autoPlayInterval = 5000,
    showDots = true,
    showArrows = true,
    showThumbs = false,
    className = "",
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        setReduceMotion(globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
    }, []);

    useEffect(() => {
        if (!autoPlay || isPaused || reduceMotion || images.length < 2) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, autoPlayInterval);
        return () => clearInterval(interval);
    }, [currentIndex, autoPlay, autoPlayInterval, isPaused, reduceMotion, images.length]);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    const openFull = () => globalThis.open(images[currentIndex], "_blank");

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
    };

    if (!images || images.length === 0) return null;

    const control =
        "grid h-11 w-11 place-items-center rounded-full border border-line bg-ink/80 text-fg backdrop-blur transition-[opacity,transform,background-color] duration-300 ease-out-expo hover:bg-fg hover:text-ink active:scale-95";

    return (
        <div class={className}>
            <div
                class="group relative overflow-hidden rounded-card border border-line bg-surface"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocusIn={() => setIsPaused(true)}
                onFocusOut={() => setIsPaused(false)}
                onKeyDown={onKeyDown}
                tabIndex={images.length > 1 ? 0 : undefined}
                role="region"
                aria-roledescription="carousel"
                aria-label={alt}
            >
                <div class="relative aspect-[16/10] w-full">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            class={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out-expo ${
                                index === currentIndex ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-[1.02]"
                            }`}
                            aria-hidden={index !== currentIndex}
                        >
                            <Media
                                src={image}
                                alt={`${alt} ${index + 1} of ${images.length}`}
                                class="h-full w-full cursor-zoom-in object-contain"
                                loading={index === 0 ? "eager" : "lazy"}
                                onClick={openFull}
                            />
                        </div>
                    ))}
                </div>

                {showArrows && images.length > 1 && (
                    <div class="pointer-events-none absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
                        <button type="button" onClick={prevSlide} class={`${control} pointer-events-auto md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100`} aria-label="Previous image">
                            <ChevronLeftIcon class="h-5 w-5" />
                        </button>
                        <button type="button" onClick={nextSlide} class={`${control} pointer-events-auto md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100`} aria-label="Next image">
                            <ChevronRightIcon class="h-5 w-5" />
                        </button>
                    </div>
                )}

                <button type="button" onClick={openFull} class={`${control} absolute right-4 top-4 h-10 w-10 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100`} aria-label="Open image in full size">
                    <ExpandIcon class="h-4 w-4" />
                </button>

                {showDots && images.length > 1 && (
                    <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-ink/70 px-3 py-2 backdrop-blur">
                        {images.map((_, index) => (
                            <button
                                type="button"
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                class={`h-1.5 rounded-full transition-all duration-500 ease-out-expo ${
                                    index === currentIndex ? "w-6 bg-red" : "w-1.5 bg-fg/40 hover:bg-fg"
                                }`}
                                aria-label={`Show image ${index + 1}`}
                                aria-current={index === currentIndex}
                            />
                        ))}
                    </div>
                )}
            </div>

            {showThumbs && images.length > 1 && (
                <div class="mt-4 flex gap-3 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <button
                            type="button"
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            class={`relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-field border transition-[border-color,opacity] duration-300 md:w-36 ${
                                index === currentIndex ? "border-red opacity-100" : "border-line opacity-60 hover:opacity-100"
                            }`}
                            aria-label={`Show image ${index + 1}`}
                        >
                            {isVideo(image)
                                ? <video src={image} class="h-full w-full object-cover" muted playsInline preload="metadata" />
                                : <img src={image} alt="" class="h-full w-full object-cover" loading="lazy" decoding="async" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
