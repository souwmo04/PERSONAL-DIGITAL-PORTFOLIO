import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: AI Researcher & Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card in the site's night palette, with the portrait. */
export default async function OpengraphImage() {
  const photo = await readFile(path.join(process.cwd(), "public/images/fahim-foysal-headshot.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "radial-gradient(circle at 80% 20%, #3b1d7a 0%, #060609 60%)",
          color: "#ececf1",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#a7f3d0" }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#34d399" }} />
            Open to research collaborations
          </div>
          <div style={{ fontSize: 30, color: "#c4b5fd", marginTop: 40 }}>Hello! I&apos;m</div>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Fahim Foysal</div>
          <div style={{ fontSize: 30, marginTop: 24, color: "#a3a3b2" }}>
            Exploring intelligence. Building meaningful technology.
          </div>
          <div style={{ fontSize: 22, marginTop: 40, color: "#a3a3b2" }}>
            AI Researcher · ML Engineer · TriModal AI Lab, NSU
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: 4,
            borderRadius: 999,
            background: "linear-gradient(135deg, #c4b5fd, #7c3aed, #67e8f9)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={300} height={300} alt="" style={{ borderRadius: 999 }} />
        </div>
      </div>
    ),
    size,
  );
}
