import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <title>Hi. I am keewinek.</title>

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />

        <link rel="icon" href="/logo.png"></link>

        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="overflow-x-hidden bg-background-black">
        <Component />
      </body>
    </html>
  );
}
