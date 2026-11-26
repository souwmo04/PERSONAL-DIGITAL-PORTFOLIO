import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: AI Researcher & Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card: the editorial system, reduced to type and a rule. */
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
          background: "#f1ede4",
          color: "#151513",
          padding: "64px 72px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 2, color: "#6e6b63", fontFamily: "monospace" }}>
          <span>§ 00 — INDEX</span>
          <span>BANGLADESH</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, lineHeight: 0.95, letterSpacing: -5 }}>Fahim Foysal</div>
          <div style={{ fontSize: 44, marginTop: 28, fontStyle: "italic", color: "#57554f" }}>
            Exploring intelligence. Building meaningful technology.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #151513", paddingTop: 20, fontSize: 20, letterSpacing: 2, fontFamily: "monospace" }}>
          <span>AI RESEARCHER · ML ENGINEER · SOFTWARE DEVELOPER</span>
          <span style={{ display: "flex", alignItems: "center", gap: 10, color: "#c2410c" }}>
            <span style={{ width: 12, height: 12, borderRadius: 6, background: "#c2410c" }} />
            TRIMODAL AI LAB · NSU
          </span>
        </div>
      </div>
    ),
    size,
  );
}
