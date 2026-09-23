import { Head } from "$fresh/runtime.ts";
import Button from "../components/Button.tsx";
import { ArrowRightIcon } from "../components/Icons.tsx";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="bg-background-black text-white font-Comfortaa min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <img class="mb-8 h-20 w-20 object-contain" src="/logo.png" alt="keewinek logo" />
        <h1 class="text-4xl md:text-6xl font-bold" style="font-family: 'Gravitas One', cursive;">
          4<span class="text-red">0</span>4
        </h1>
        <p class="mt-4 text-white/60">The page you were looking for doesn't exist.</p>
        <div class="mt-10">
          <Button href="/" size="lg" icon={<ArrowRightIcon class="h-4 w-4" />}>Go back home</Button>
        </div>
      </div>
    </>
  );
}
