/* Meta Pixel + consent-gated tracking for Elvora (dataset 1546630560246377).
   Loads ONLY after the visitor accepts cookies (localStorage "cookie-consent" = "accepted"). */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const META_PIXEL_ID = "1546630560246377";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    __elvoraPixelLoaded?: boolean;
  }
}

export function hasCookieConsent(): boolean {
  if (typeof window === "undefined") return false;
  try { return localStorage.getItem("cookie-consent") === "accepted"; }
  catch { return false; }
}

export function loadMetaPixel(): void {
  if (typeof window === "undefined" || window.__elvoraPixelLoaded) return;
  if (!hasCookieConsent()) return;
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true; t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode!.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  window.__elvoraPixelLoaded = true;
  window.fbq!("init", META_PIXEL_ID);
  window.fbq!("track", "PageView");
}

export function trackEvent(event: string, params?: Record<string, unknown>, eventID?: string): void {
  if (typeof window === "undefined" || !hasCookieConsent()) return;
  if (!window.__elvoraPixelLoaded) loadMetaPixel();
  if (window.fbq) window.fbq("track", event, params || {}, eventID ? { eventID } : undefined);
}

export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
