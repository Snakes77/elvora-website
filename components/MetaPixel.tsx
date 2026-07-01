"use client";

import { useEffect } from "react";
import { loadMetaPixel, trackEvent, hasCookieConsent } from "@/lib/metaPixel";

/* Loads the Meta Pixel only after cookie consent, reacts to the consent banner,
   and auto-tracks phone/email clicks as Contact events. */
export default function MetaPixel() {
  useEffect(() => {
    if (hasCookieConsent()) loadMetaPixel();

    const onConsent = () => loadMetaPixel();
    window.addEventListener("cookie-consent-changed", onConsent);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:") || href.startsWith("mailto:")) trackEvent("Contact");
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("cookie-consent-changed", onConsent);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
