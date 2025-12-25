import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <title>Hi. I am keewinek.</title>

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/css/ink-cursor.css" />

        <link rel="icon" href="/logo.png"></link>

        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gravitas+One&family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet" />

        <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
        <script src="/js/ink-cursor.js" defer></script>
      </head>
      <body class="overflow-x-hidden max-w-[100vw] bg-background-black">
        {/* SVG filter for ink cursor gooey effect */}
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" style={{ display: 'none' }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
          </defs>
        </svg>
        
        <Component />
      </body>
    </html>
  );
}
