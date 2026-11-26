import { site } from "@/content/site";

/** Small live status: pulsing dot + one line. */
export function StatusIndicator({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const { available, label } = site.status;
  return (
    <p className={`meta inline-flex items-center gap-2.5 ${tone === "dark" ? "text-fog" : "text-graphite"} ${className}`}>
      <span className="relative flex size-2" aria-hidden>
        {available ? (
          <span className="absolute inset-0 animate-ping rounded-full bg-vermilion/60 [animation-duration:2.4s]" />
        ) : null}
        <span className={`relative size-2 rounded-full ${available ? "bg-vermilion" : "bg-muted"}`} />
      </span>
      <span>
        <span className="sr-only">Status: </span>
        {label}
      </span>
    </p>
  );
}
