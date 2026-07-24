import type { ComponentChildren } from "preact";

export default function RevealOnScroll({ children }: { children: ComponentChildren }) {
  return <div class="reveal-on-scroll">{children}</div>;
}
