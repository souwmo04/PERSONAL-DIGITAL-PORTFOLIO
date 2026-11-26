"use client";

import { useEffect, useState } from "react";

type Theme = "violet" | "gold";
const KEY = "ff-theme";

/**
 * Switches between the violet "Nocturne" palette and the gold "Aurum" one.
 * The choice is saved, and an inline script in the layout applies it before
 * the first paint, so the page never flashes the wrong colours.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("violet");

  useEffect(() => {
    // The saved theme only exists in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.getAttribute("data-theme") === "gold" ? "gold" : "violet");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "gold" ? "violet" : "gold";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  };

  const gold = theme === "gold";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={gold}
      aria-label={gold ? "Switch to violet theme" : "Switch to gold theme"}
      title={gold ? "Violet theme" : "Gold theme"}
      className={`group relative flex h-9 w-16 items-center rounded-full border border-line bg-white/[0.03] px-1 transition-colors hover:border-violet/50 ${className}`}
    >
      <span
        aria-hidden
        className={`absolute left-1 top-1 size-7 rounded-full shadow-[0_0_14px_color-mix(in_oklab,_var(--color-violet)_70%,_transparent)] transition-transform duration-500 ease-out-expo ${
          gold ? "translate-x-7 bg-gradient-to-br from-[#f6e3a1] via-[#d4af37] to-[#8c6a1a]" : "translate-x-0 bg-gradient-to-br from-[#c4b5fd] via-[#a78bfa] to-[#7c3aed]"
        }`}
      />
      <span aria-hidden className="relative flex w-full justify-between px-1.5 text-[0.55rem] font-semibold uppercase tracking-wider text-faint">
        <span className={gold ? "opacity-100" : "opacity-0"}>Vi</span>
        <span className={gold ? "opacity-0" : "opacity-100"}>Au</span>
      </span>
    </button>
  );
}
