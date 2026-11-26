import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: AI Researcher & Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card in the site's night palette. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "radial-gradient(circle at 80% 20%, #3b1d7a 0%, #060609 55%)",
          color: "#ececf1",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#c4b5fd" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#34d399" }} />
          Open to research collaborations
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, color: "#c4b5fd" }}>Hello! I&apos;m</div>
          <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>Fahim Foysal</div>
          <div style={{ fontSize: 36, marginTop: 24, color: "#a3a3b2" }}>
            Exploring intelligence. Building meaningful technology.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#a3a3b2" }}>
          <span>AI Researcher · ML Engineer · Software Developer</span>
          <span>TriModal AI Lab · NSU</span>
        </div>
      </div>
    ),
    size,
  );
}
