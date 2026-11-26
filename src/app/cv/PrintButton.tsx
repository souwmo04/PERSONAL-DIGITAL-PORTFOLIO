"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet to-iris px-5 py-2.5 text-sm font-medium text-void transition-shadow hover:shadow-[0_0_30px_-4px_color-mix(in_oklab,_var(--color-violet)_90%,_transparent)]"
    >
      <Printer aria-hidden className="size-4" />
      Save as PDF
    </button>
  );
}
