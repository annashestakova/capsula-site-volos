"use client";

import { useEffect, useState } from "react";
import { Cookie, ShieldCheck } from "lucide-react";

const STORAGE_KEY = "volos_capsula_cookie_consent";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAccepted(window.localStorage.getItem(STORAGE_KEY) === "accepted");
  }, []);

  function acceptCookies() {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    document.cookie = `${STORAGE_KEY}=accepted; Max-Age=31536000; Path=/; SameSite=Lax`;
    setAccepted(true);
  }

  if (!mounted || accepted) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-espresso/35 backdrop-blur-[1px]" aria-hidden="true" />
      <div className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-3xl rounded-4xl border border-sand/70 bg-cream/95 p-5 shadow-2xl backdrop-blur md:bottom-6 md:flex md:items-center md:gap-5 md:p-6">
        <div className="mb-4 flex items-center gap-3 md:mb-0">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush text-espresso">
            <Cookie size={22} />
          </span>
          <div>
            <p className="font-display text-2xl font-semibold leading-none text-espresso">
              Cookies
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-mink">
              Мы используем cookies, чтобы сайт работал стабильнее, запоминал согласие и помогал
              улучшать запись на услуги.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={acceptCookies}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3 font-body text-sm font-medium text-cream transition hover:bg-rose md:w-auto md:shrink-0"
        >
          <ShieldCheck size={16} />
          Согласен
        </button>
      </div>
    </>
  );
}
