"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="meta inline-flex items-center gap-2 bg-ink px-5 py-3 text-paper transition-colors hover:bg-vermilion"
    >
      <Printer aria-hidden className="size-3.5" />
      Save as PDF
    </button>
  );
}
