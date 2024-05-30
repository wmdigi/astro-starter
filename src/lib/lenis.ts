import Lenis from "@studio-freight/lenis";

if (window.innerWidth > 1024) {
  const lenis = new Lenis();

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  window.addEventListener("stopLenis", () => {
    lenis.stop();
  });

  window.addEventListener("resumeLenis", () => {
    lenis.start();
  });
}

document.addEventListener("astro:page-load", () => {
  window.scrollTo({ left: 0, top: 0, behavior: "instant" });
});
