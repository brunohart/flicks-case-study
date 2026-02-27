import { useState } from "react";
import { StatusBar } from "../../components/layout/StatusBar";
import { FriendAvatarStack } from "../../components/cinema-together/FriendAvatarStack";
import { MOCK_FILM, MOCK_SOCIAL, MOCK_FRIENDS } from "../../data/mockData";

const font = (w: number, s: number, lh = 1) =>
  `${w} ${s}px/${lh} -apple-system, system-ui, BlinkMacSystemFont, sans-serif`;

export function FilmDetailSocialScreen() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const film = MOCK_FILM;
  const runtimeH = Math.floor(film.runtime / 60);
  const runtimeM = film.runtime % 60;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
        <StatusBar light />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Hero — taller than 1A, backdrop fills ~45% of screen */}
        <div
          className="relative"
          style={{ height: "380px", flexShrink: 0, backgroundColor: "#000000" }}
        >
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
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)" }}
          />

          {/* Nav overlay */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between"
            style={{ zIndex: 2, padding: "54px 16px 0" }}
          >
            <div style={{ width: "36px" }} />
            <span style={{ font: font(600, 17), color: "#FFFFFF" }}>{film.title}</span>
            <div style={{ width: "36px" }} />
          </div>

          {/* Hero content */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ zIndex: 1, padding: "0 16px 20px" }}
          >
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-end" }}>
              <img
                src={film.posterUrl}
                alt={film.title}
                style={{
                  width: "90px",
                  height: "132px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  flexShrink: 0,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                }}
              />
              <div style={{ flex: 1, paddingBottom: "4px" }}>
                <h1 style={{ font: font(700, 24, 1.15), color: "#FFFFFF", margin: 0 }}>
                  {film.title}
                </h1>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      padding: "2px 6px",
                      border: "1.5px solid rgba(255,255,255,0.6)",
                      borderRadius: "3px",
                      font: font(700, 11, 1.4),
                      color: "#FFFFFF",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {film.rating}
                  </span>
                  <span style={{ font: font(400, 13), color: "rgba(255,255,255,0.8)" }}>
                    {film.year} · {runtimeH}h {runtimeM}m
                  </span>
                </div>
                <div style={{ display: "flex", gap: "6px", marginTop: "10px", flexWrap: "wrap" }}>
                  {film.genres.map((g) => (
                    <span
                      key={g}
                      style={{
                        padding: "5px 10px",
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: "999px",
                        font: font(500, 12),
                        color: "#FFFFFF",
                      }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scores row */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            padding: "16px",
            borderBottom: "1px solid #E8E8E8",
          }}
        >
          <ScoreBadge icon="🍅" label="Tomatometer" score={`${film.rtScore}%`} />
          <ScoreBadge icon="🍿" label="Audience" score={`${film.audienceScore}%`} />
          <ScoreBadge icon="⭐" label="IMDb" score="7.6" />
        </div>

        {/* Friends who want to see this */}
        <div style={{ padding: "16px" }}>
          <p
            style={{
              font: font(600, 11),
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "#8E8E93",
              margin: "0 0 12px",
            }}
          >
            FRIENDS INTERESTED
          </p>
          <div
            style={{
              backgroundColor: "#FFF8F8",
              border: "1px solid #FFD0D0",
              borderRadius: "12px",
              padding: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FriendAvatarStack
                friends={MOCK_SOCIAL.watchlistFriends}
                size={32}
                maxVisible={4}
                borderColor="#FFF8F8"
              />
              <div style={{ flex: 1 }}>
                <p style={{ font: font(600, 14, 1.2), color: "#000000", margin: 0 }}>
                  {MOCK_SOCIAL.watchlistFriends.length} friends want to see this
                </p>
                <p
                  style={{
                    font: font(400, 13, 1.3),
                    color: "#8E8E93",
                    margin: "2px 0 0",
                  }}
                >
                  Sarah & Tom are going Wed 1:15PM
                </p>
              </div>
            </div>

            {/* Individual friend statuses */}
            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {MOCK_FRIENDS.filter((f) => f.hasWatchlisted).map((friend) => (
                <div key={friend.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: friend.avatarColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ font: font(700, 10), color: "#FFFFFF" }}>
                      {friend.initials}
                    </span>
                  </div>
                  <span style={{ font: font(500, 14), color: "#000000", flex: 1 }}>
                    {friend.name}
                  </span>
                  <span
                    style={{
                      font: font(500, 12),
                      color:
                        friend.rsvpStatus === "going"
                          ? "#1A7340"
                          : friend.rsvpStatus === "maybe"
                            ? "#8E8E93"
                            : "#D4A853",
                      backgroundColor:
                        friend.rsvpStatus === "going"
                          ? "#E6F9F0"
                          : friend.rsvpStatus === "maybe"
                            ? "#F0F0F0"
                            : "rgba(212,168,83,0.12)",
                      padding: "4px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    {friend.rsvpStatus === "going"
                      ? "Going"
                      : friend.rsvpStatus === "maybe"
                        ? "Interested"
                        : "Watchlisted"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div style={{ padding: "0 16px 16px" }}>
          <p
            style={{
              font: font(600, 11),
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "#8E8E93",
              margin: "0 0 8px",
            }}
          >
            SYNOPSIS
          </p>
          <p style={{ font: font(400, 15, 1.6), color: "#1A1A1E", margin: 0 }}>
            {film.synopsis}
          </p>
        </div>

        {/* Director + Cast */}
        <div style={{ padding: "0 16px 16px" }}>
          <p
            style={{
              font: font(600, 11),
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "#8E8E93",
              margin: "0 0 8px",
            }}
          >
            DIRECTOR
          </p>
          <p style={{ font: font(600, 15, 1.2), color: "#000000", margin: "0 0 16px" }}>
            {film.director}
          </p>

          <p
            style={{
              font: font(600, 11),
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "#8E8E93",
              margin: "0 0 8px",
            }}
          >
            CAST
          </p>
          <p style={{ font: font(400, 15, 1.5), color: "#1A1A1E", margin: 0 }}>
            {film.cast.join(", ")}
          </p>
        </div>

        {/* View Showtimes CTA */}
        <div style={{ padding: "8px 16px 32px" }}>
          <button
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: "#F23953",
              border: "none",
              font: font(600, 16),
              color: "#FFFFFF",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            View Showtimes
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreBadge({ icon, label, score }: { icon: string; label: string; score: string }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span style={{ fontSize: "16px" }}>{icon}</span>
        <span
          style={{
            font: `700 18px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif`,
            color: "#000000",
          }}
        >
          {score}
        </span>
      </div>
      <span
        style={{
          font: `400 11px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif`,
          color: "#8E8E93",
        }}
      >
        {label}
      </span>
    </div>
  );
}
