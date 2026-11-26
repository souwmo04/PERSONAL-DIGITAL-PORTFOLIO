"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

/** Copies text to the clipboard and confirms inline, with a polite live region. */
export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  className = "",
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`inline-flex items-center gap-1.5 text-xs text-dim transition-colors hover:text-iris ${className}`}
    >
      {copied ? <Check aria-hidden className="size-3.5 text-emerald-400" /> : <Copy aria-hidden className="size-3.5" />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
