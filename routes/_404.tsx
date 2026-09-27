import { Head } from "$fresh/runtime.ts";
import Button from "../components/Button.tsx";
import { ArrowRightIcon } from "../components/Icons.tsx";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col items-start justify-center px-4 pt-16 md:px-8">
        <h1 class="rise font-display text-[clamp(7rem,28vw,20rem)] font-extrabold leading-[0.85] tracking-[-0.06em]">
          4<span class="text-red">0</span>4
        </h1>
        <p class="rise mt-8 max-w-[40ch] text-xl text-muted" style={{ "--d": "120ms" }}>
          This page doesn't exist. Maybe it was a project that got renamed.
        </p>
        <div class="rise mt-10 flex flex-wrap gap-3" style={{ "--d": "220ms" }}>
          <Button href="/" size="lg" icon={<ArrowRightIcon class="h-4 w-4" />}>Go back home</Button>
          <Button href="/projects" size="lg" variant="secondary">All projects</Button>
        </div>
      </div>
    </>
  );
}
