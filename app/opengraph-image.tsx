import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "BoiBazaar - Used Textbook Exchange";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#1B2A4A",
        color: "#F6F4EF",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 64, fontWeight: 700 }}>BoiBazaar</div>
      <div style={{ fontSize: 32, marginTop: 16, color: "#E8A33D" }}>
        Buy low, sell fast, study smarter
      </div>
      <div style={{ fontSize: 24, marginTop: 24, opacity: 0.7 }}>
        Student-to-student textbooks across Bangladesh
      </div>
    </div>,
    { ...size }
  );
}
