// Ink Cursor Implementation for Fresh
const amount = 20;
const sineDots = Math.floor(amount * 0.3);
const width = 26;
const idleTimeout = 150;
let lastFrame = 0;
let mousePosition = {x: 0, y: 0};
let dots = [];
let timeoutID;
let idle = false;
let cursor;

class Dot {
    constructor(index = 0) {
        this.index = index;
        this.anglespeed = 0.05;
        this.x = 0;
        this.y = 0;
        this.scale = 1 - 0.05 * index;
        this.range = width / 2 - width / 2 * this.scale + 2;
        this.limit = width * 0.75 * this.scale;
        this.element = document.createElement("span");
        this.element.style.position = "absolute";
        this.element.style.display = "block";
        this.element.style.width = "26px";
        this.element.style.height = "26px";
        this.element.style.borderRadius = "20px";
        this.element.style.backgroundColor = "white";
        this.element.style.transformOrigin = "center center";
        this.element.style.transform = "translate(-50%, -50%)";
        
        // Use GSAP if available, otherwise use basic transform
        if (window.gsap) {
            gsap.set(this.element, {scale: this.scale});
        } else {
            this.element.style.transform = `translate(-50%, -50%) scale(${this.scale})`;
        }
        
        cursor.appendChild(this.element);
    }

    lock() {
        this.lockX = this.x;
        this.lockY = this.y;
        this.angleX = Math.PI * 2 * Math.random();
        this.angleY = Math.PI * 2 * Math.random();
    }

    draw(delta) {
        if (!idle || this.index <= sineDots) {
            if (window.gsap) {
                gsap.set(this.element, {x: this.x, y: this.y});
            } else {
                this.element.style.transform = `translate(${this.x - 13}px, ${this.y - 13}px) scale(${this.scale})`;
            }
        } else {
            this.angleX += this.anglespeed;
            this.angleY += this.anglespeed;
            this.y = this.lockY + Math.sin(this.angleY) * this.range;
            this.x = this.lockX + Math.sin(this.angleX) * this.range;
            
            if (window.gsap) {
                gsap.set(this.element, {x: this.x, y: this.y});
            } else {
                this.element.style.transform = `translate(${this.x - 13}px, ${this.y - 13}px) scale(${this.scale})`;
            }
        }
    }
}

function startIdleTimer() {
    timeoutID = setTimeout(goInactive, idleTimeout);
    idle = false;
}

function resetIdleTimer() {
    clearTimeout(timeoutID);
    startIdleTimer();
}

function goInactive() {
    idle = true;
    for (let dot of dots) {
        dot.lock();
    }
}

function buildDots() {
    for (let i = 0; i < amount; i++) {
        let dot = new Dot(i);
        dots.push(dot);
    }
}

const onMouseMove = event => {
    mousePosition.x = event.clientX - width / 2;
    mousePosition.y = event.clientY - width / 2;
    resetIdleTimer();
};

const onTouchMove = (event) => {
    if (event.touches && event.touches[0]) {
        mousePosition.x = event.touches[0].clientX - width / 2;
        mousePosition.y = event.touches[0].clientY - width / 2;
        resetIdleTimer();
    }
};

const render = timestamp => {
    const delta = timestamp - lastFrame;
    positionCursor(delta);
    lastFrame = timestamp;
    requestAnimationFrame(render);
};

const positionCursor = delta => {
    let x = mousePosition.x;
    let y = mousePosition.y;
    dots.forEach((dot, index, dots) => {
        let nextDot = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.draw(delta);
        if (!idle || index <= sineDots) {
            const dx = (nextDot.x - dot.x) * 0.35;
            const dy = (nextDot.y - dot.y) * 0.35;
            x += dx;
            y += dy;
        }
    });
};

// Check if device is desktop (not mobile/touch)
function isDesktopDevice() {
    // Check for touch capability
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check for hover capability (desktop mice can hover)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    
    // Check for fine pointer (mouse vs touch)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    
    // Check screen size (desktop typically > 768px)
    const isLargeScreen = window.innerWidth > 768;
    
    // Device is desktop if it has hover capability, fine pointer, and large screen
    return hasHover && hasFinePointer && isLargeScreen && !hasTouch;
}

function initInkCursor() {
    // Only initialize on desktop devices
    if (!isDesktopDevice()) {
        console.log('Ink cursor disabled on mobile/touch device');
        return;
    }

    // Create cursor element if it doesn't exist
    cursor = document.getElementById("ink-cursor");
    if (!cursor) {
        cursor = document.createElement("div");
        cursor.id = "ink-cursor";
        cursor.className = "ink-cursor";
        cursor.style.pointerEvents = "none";
        cursor.style.position = "fixed";
        cursor.style.display = "block";
        cursor.style.borderRadius = "0";
        cursor.style.transformOrigin = "center center";
        cursor.style.mixBlendMode = "difference";
        cursor.style.top = "0";
        cursor.style.left = "0";
        cursor.style.zIndex = "1000";
        cursor.style.filter = "url(#goo)";
        document.body.appendChild(cursor);
    }

    // Initialize dots and start animation
    lastFrame = performance.now();
    buildDots();
    render();
    
    // Add event listeners
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    
    console.log('Ink cursor initialized on desktop device');
}

// Handle window resize to re-evaluate device type
function handleResize() {
    if (cursor && cursor.parentNode) {
        // Remove existing cursor if switching to mobile
        if (!isDesktopDevice()) {
            cursor.parentNode.removeChild(cursor);
            cursor = null;
            dots = [];
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            console.log('Ink cursor removed due to device change');
        }
    } else if (isDesktopDevice()) {
        // Initialize cursor if switching to desktop
        initInkCursor();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInkCursor);
} else {
    initInkCursor();
}

// Listen for resize events to handle device orientation changes
window.addEventListener('resize', handleResize);

// Export for potential external use
window.initInkCursor = initInkCursor;
