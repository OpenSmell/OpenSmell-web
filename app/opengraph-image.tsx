import { ImageResponse } from "next/og"

export const alt = "Osmograph — the software for smell | OpenSmell"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

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
          backgroundColor: "#08090a",
          color: "#fafafa",
          padding: 64,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 16,
                height: 16,
                border: "2px solid #fafafa",
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 5,
                textTransform: "uppercase",
              }}
            >
              OpenSmell
            </div>
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: 4,
              color: "#6b7280",
              textTransform: "uppercase",
            }}
          >
            Σ // Digital Olfaction
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            Osmograph
          </div>
          <div
            style={{
              fontSize: 40,
              color: "#9ca3af",
              marginTop: 14,
              letterSpacing: -0.5,
            }}
          >
            — the software for smell
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#d1d5db",
              marginTop: 30,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            Open data, open firmware, and every number sourced. Detect chemical
            change against your own baseline.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <div style={{ height: 1, backgroundColor: "#1f2937", marginBottom: 22 }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 22, letterSpacing: 1 }}>www.opensmell.xyz</div>
            <div style={{ fontSize: 20, color: "#6b7280", letterSpacing: 1 }}>
              MIT · Python &amp; Rust SDKs
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
