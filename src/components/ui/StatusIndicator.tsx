import { site } from "@/content/site";

/** Small live status pill with a pulsing dot. */
export function StatusIndicator({ className = "" }: { className?: string }) {
  const { available, label } = site.status;
  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-xs text-emerald-200/90 ${className}`}
    >
      <span className="relative flex size-2" aria-hidden>
        {available ? <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70 [animation-duration:2.2s]" /> : null}
        <span className={`relative size-2 rounded-full ${available ? "bg-emerald-400" : "bg-faint"}`} />
      </span>
      <span>
        <span className="sr-only">Status: </span>
        {label}
      </span>
    </p>
  );
}
