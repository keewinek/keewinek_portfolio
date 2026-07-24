import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <title>Hi. I am keewinek.</title>

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />

        <link rel="icon" href="/favicon.png" sizes="32x32" />
        <link rel="icon" href="/logo.png" sizes="any" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gravitas+One&family=Caveat:wght@500&display=swap" rel="stylesheet" />
      </head>
      <body class="overflow-x-hidden max-w-[100vw] bg-background-black">
        <Component />
        <script src="/js/reveal-on-scroll.js" defer></script>
      </body>
    </html>
  );
}
