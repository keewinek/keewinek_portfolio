import { useState, useRef, useEffect } from "preact/hooks";

export default function RevealOnScroll({ children }: { children: any }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div 
            ref={ref}
            class={`reveal-on-scroll transition-all duration-1000 ease-out ${
                isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
            }`}
        >
            {children}
        </div>
    );
}
