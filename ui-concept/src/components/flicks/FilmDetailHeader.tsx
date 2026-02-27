import { useState } from "react";
import type { Film } from "../../types";

interface FilmDetailHeaderProps {
  film: Film;
  onBack?: () => void;
}

export function FilmDetailHeader({ film, onBack }: FilmDetailHeaderProps) {
  const runtimeH = Math.floor(film.runtime / 60);
  const runtimeM = film.runtime % 60;
  const runtimeStr = runtimeH > 0 ? `${runtimeH}h ${runtimeM}m` : `${runtimeM}m`;
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative" style={{ minHeight: "280px", flexShrink: 0, backgroundColor: "#000000" }}>
      {/* Backdrop image */}
      <img
        src={film.backdropUrl}
        alt=""
        aria-hidden
        onLoad={() => setImgLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: "center top",
          opacity: imgLoaded ? 1 : 0,
          transition: "opacity 400ms ease",
        }}
      />
      {/* Blurred poster fallback shown until backdrop loads */}
      <img
        src={film.posterUrl}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-top"
        style={{
          filter: "blur(24px) brightness(0.55) saturate(1.3)",
          transform: "scale(1.12)",
          opacity: imgLoaded ? 0 : 1,
          transition: "opacity 400ms ease",
        }}
      />
      {/* Flat overlay — rgba(0,0,0,0.55), NOT a gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.55)" }}
      />

      {/* Nav bar — transparent */}
      <div
        className="relative flex items-center justify-between"
        style={{ zIndex: 2, padding: "12px 16px" }}
      >
        <button
          onClick={onBack}
          className="flex items-center justify-center"
          style={{
            width: "36px",
            height: "36px",
            background: "transparent",
            border: "none",
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path
              d="M8 2L2 8l6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span
          style={{
            font: "600 17px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#FFFFFF",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {film.title}
        </span>
        <button
          className="flex items-center justify-center"
          style={{
            width: "36px",
            height: "36px",
            background: "transparent",
            border: "none",
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v8m0 0l3-3m-3 3L9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Hero content */}
      <div className="relative" style={{ zIndex: 1, padding: "8px 16px 20px" }}>
        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "14px" }}>
          {/* Poster — 72×100px, radius 4px */}
          <img
            src={film.posterUrl}
            alt={film.title}
            style={{
              width: "72px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "4px",
              flexShrink: 0,
            }}
          />

          {/* Meta + CTAs */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", paddingTop: "4px" }}>
            {/* Classification badge + year/runtime */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  padding: "2px 6px",
                  border: "1.5px solid rgba(255,255,255,0.7)",
                  borderRadius: "3px",
                  font: "700 11px/1.4 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                  color: "#FFFFFF",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {film.rating}
              </span>
              <span
                style={{
                  font: "400 14px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {film.year} · {runtimeStr}
              </span>
            </div>

            {/* CTA buttons — outline pills, transparent bg */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: "999px",
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  background: "transparent",
                  font: "500 14px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                + Watchlist
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: "999px",
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  background: "transparent",
                  font: "500 14px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                ▶ Trailer
              </button>
            </div>
          </div>
        </div>

        {/* Metadata chips — bg rgba(255,255,255,0.12), radius 999px, no border */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
          {[
            `Directed by ${film.director}`,
            film.rtScore ? `🍅 ${film.rtScore}%` : null,
            ...film.genres.slice(0, 2),
          ]
            .filter(Boolean)
            .map((chip, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "7px 12px",
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "999px",
                  font: "400 13px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                }}
              >
                {chip}
              </span>
            ))}
        </div>

        {/* Synopsis */}
        <p
          style={{
            font: "400 15px/1.5 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "rgba(255,255,255,0.85)",
            margin: 0,
          }}
        >
          {film.synopsis.slice(0, 120)}
          <span style={{ color: "rgba(255,255,255,0.45)", marginLeft: "2px" }}>... More</span>
        </p>
      </div>
    </div>
  );
}
