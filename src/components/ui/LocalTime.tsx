"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: site.timezone,
});

/** Current time in Dhaka, updated every 30s. Renders a stable placeholder on the server. */
export function LocalTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className}>
      <time suppressHydrationWarning>{time ?? "--:--"}</time> GMT+6
    </span>
  );
}
