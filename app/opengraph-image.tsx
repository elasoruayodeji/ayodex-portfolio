import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt =
  "AYODEX Labs. — I build. I design. I experiment. Independent developer in Nigeria.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#fbfaf6",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
          color: "#1a1916",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#6d685d",
          }}
        >
          <span>AYODEX Labs.</span>
          <span>Nigeria · Independent</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 104,
              lineHeight: 1.02,
              letterSpacing: -3,
              maxWidth: 900,
            }}
          >
            <span>I build. I design.</span>
            <span>I experiment.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 26,
              fontFamily: "Helvetica, Arial, sans-serif",
              color: "#6d685d",
              maxWidth: 720,
              lineHeight: 1.4,
            }}
          >
            Websites, storefronts and web applications — designed carefully,
            shipped, and described honestly.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 18,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#6d685d",
            borderTop: "1px solid #e3ded2",
            paddingTop: 22,
          }}
        >
          <span>{site.name}</span>
          <span>ayodex-portfolio.vercel.app</span>
        </div>

        <div
          style={{
            position: "absolute",
            right: -60,
            bottom: -120,
            width: 420,
            height: 420,
            borderRadius: 420,
            border: "1px solid #e3ded2",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
