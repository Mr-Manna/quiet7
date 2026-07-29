// Lazy motion loader.
//
// GSAP + ScrollTrigger + Lenis are ~130 KB. Statically importing them put all
// of it on the critical path, delaying TTI/LCP. Nothing here is needed to paint
// the page, so we load it once, on demand, AFTER first paint.
//
// Every consumer awaits `loadMotion()`; the promise is memoised so the chunk is
// fetched and the plugin registered exactly once, no matter how many callers.

export interface Motion {
  gsap: typeof import('gsap').gsap;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
  Lenis: typeof import('lenis').default;
}

let pending: Promise<Motion> | null = null;

export function loadMotion(): Promise<Motion> {
  if (!pending) {
    pending = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('lenis'),
    ]).then(([g, st, l]) => {
      const gsap = g.gsap;
      const ScrollTrigger = st.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger, Lenis: l.default } as Motion;
    });
  }
  return pending;
}

/**
 * Run `fn` once the browser is idle after load — or immediately on the first
 * real user intent (scroll / pointer / key), whichever comes first.
 *
 * The "first intent" listeners matter: reveal content is hidden until GSAP
 * runs, so if someone scrolls straight away we must not make them wait for an
 * idle slot.
 */
/**
 * The single entry point for page init.
 *
 * Every script used to hang off `astro:page-load`, which is dispatched by
 * Astro's ClientRouter. That coupling was invisible but total: View Transitions
 * cost ~200 ms of blocking time on desktop and ~600 ms on mobile, and removing
 * ClientRouter to reclaim that would have silently killed the menu, the theme
 * toggle and every animation on the site, because none of them would ever have
 * been told the page was ready.
 *
 * Navigations are ordinary page loads now, so DOMContentLoaded is the one true
 * signal. The `astro:page-load` branch stays wired up so that re-enabling
 * ClientRouter later cannot quietly break re-initialisation on client-side
 * navigation.
 */
export function onReady(fn: () => void): void {
  let ran = false;
  const run = () => {
    if (ran) return;
    ran = true;
    fn();
  };

  // Only fires if ClientRouter is put back. `ran` is reset so each client-side
  // navigation re-inits, which is the whole point of the event.
  document.addEventListener('astro:page-load', () => {
    ran = false;
    run();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}

/**
 * True when the device should get the lightweight experience: no WebGL field,
 * no smooth-scroll hijacking.
 *
 * Both are decorative and both are expensive — together they are what keeps a
 * throttled mid-range phone off a 95+ Lighthouse score. Phones still get the
 * curtain menu, the reveals and the preloader; they just scroll natively over a
 * static hero. It is also the right call for battery and thermals.
 */
export function isLightweight(): boolean {
  return (
    window.matchMedia('(max-width: 767px), (pointer: coarse) and (max-width: 1024px)').matches ||
    // Cheap proxy for a low-end device: few cores, or the OS is asking us to
    // ease off.
    (navigator.hardwareConcurrency ?? 8) <= 4 ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Resolve a design token (`--color-ink` → `rgb(15 24 18)`) against the current
 * theme, for handing to GSAP — which needs a concrete colour, not a `var()`.
 */
export function token(name: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return `rgb(${v})`;
}

/**
 * The word-by-word reveal, as a colour ramp rather than an opacity ramp.
 *
 * It used to fade words in from `opacity: 0.14`, which measures 1.33:1 against
 * the page — a hard WCAG AA failure on real body text, and one that persists for
 * as long as the reader hasn't scrolled that far (or forever, if the scroll
 * animation never runs). Ramping muted → ink instead keeps *both* ends legible
 * (4.88:1 dim, 16.5:1 lit) while reading as a stronger reveal than a fade.
 *
 * On completion the inline colour is dropped and `.is-lit` takes over, so the
 * words follow the theme tokens again after a light/dark toggle.
 */
export function wordRevealColors(): { dim: string; lit: string } {
  return { dim: token('--color-muted'), lit: token('--color-ink') };
}

export function whenIdleOrIntent(fn: () => void): void {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cleanup();
    fn();
  };

  const opts = { once: true, passive: true } as const;
  const intents: Array<[string, EventListenerOptions | typeof opts]> = [
    ['scroll', opts],
    ['pointerdown', opts],
    ['pointermove', opts],
    ['keydown', opts],
    ['touchstart', opts],
  ];
  const cleanup = () => {
    intents.forEach(([ev]) => window.removeEventListener(ev, run as EventListener));
  };
  intents.forEach(([ev, o]) => window.addEventListener(ev, run as EventListener, o as any));

  const idle = () => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(run, { timeout: 1500 });
    } else {
      setTimeout(run, 200);
    }
  };

  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
}
