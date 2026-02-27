import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "../../components/layout/StatusBar";
import { FriendAvatarStack } from "../../components/cinema-together/FriendAvatarStack";
import { MOCK_FILM, MOCK_FRIEND_SESSIONS } from "../../data/mockData";
import type { FriendSession } from "../../data/mockData";

const font = (w: number, s: number, lh = 1) =>
  `${w} ${s}px/${lh} -apple-system, system-ui, BlinkMacSystemFont, sans-serif`;

export function FriendsSessionsScreen() {
  const navigate = useNavigate();
  const [joinedIdx, setJoinedIdx] = useState<number | null>(null);
  const film = MOCK_FILM;

  const grouped = MOCK_FRIEND_SESSIONS.reduce<Record<string, FriendSession[]>>((acc, s) => {
    (acc[s.date] ??= []).push(s);
    return acc;
  }, {});
  const sortedDates = Object.keys(grouped).sort();

  const handleJoin = (flatIdx: number) => {
    setJoinedIdx(flatIdx);
  };

  let flatIdx = -1;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StatusBar />

      {/* Nav bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 16px 12px",
          position: "relative",
        }}
      >
        <button
          onClick={() => navigate("/app/1a")}
          style={{
            font: font(500, 17),
            color: "#F23953",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        <h2
          style={{
            font: font(600, 17),
            color: "#000000",
            margin: 0,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Friends' Sessions
        </h2>
        <div style={{ width: "60px" }} />
      </div>

      {/* Film context card */}
      <div style={{ padding: "0 16px 8px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 14px",
            backgroundColor: "#F5F5F5",
            borderRadius: "12px",
          }}
        >
          <img
            src={film.posterUrl}
            alt={film.title}
            style={{
              width: "44px",
              height: "64px",
              borderRadius: "6px",
              objectFit: "cover",
              flexShrink: 0,
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div style={{ flex: 1 }}>
            <p style={{ font: font(600, 15, 1.2), color: "#000000", margin: 0 }}>
              {film.title}
            </p>
            <p style={{ font: font(400, 13, 1.3), color: "#8E8E93", margin: "2px 0 0" }}>
              🍅 {film.rtScore}% · {film.genres.slice(0, 2).join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Sessions list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {sortedDates.map((date) => {
          const sessions = grouped[date];
          return (
            <div key={date}>
              {/* Date header */}
              <div
                style={{
                  padding: "16px 16px 8px",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#FFFFFF",
                  zIndex: 1,
                }}
              >
                <p
                  style={{
                    font: font(600, 13, 1),
                    color: "#8E8E93",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    margin: 0,
                  }}
                >
                  {sessions[0].dateLabel}
                </p>
              </div>

              {/* Session cards */}
              {sessions.map((session) => {
                flatIdx++;
                const idx = flatIdx;
                const isJoined = joinedIdx === idx;

                return (
                  <div
                    key={`${date}-${session.time}-${session.cinemaName}`}
                    style={{
                      margin: "0 16px 12px",
                      borderRadius: "14px",
                      border: isJoined
                        ? "1.5px solid rgba(212,168,83,0.4)"
                        : "1px solid #E8E8E8",
                      backgroundColor: isJoined
                        ? "rgba(212,168,83,0.06)"
                        : "#FFFFFF",
                      overflow: "hidden",
                      transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "14px",
                      }}
                    >
                      {/* Time block */}
                      <div
                        style={{
                          width: "64px",
                          textAlign: "center",
                          flexShrink: 0,
                        }}
                      >
                        <p
                          style={{
                            font: font(700, 16, 1),
                            color: "#000000",
                            margin: 0,
                          }}
                        >
                          {session.time}
                        </p>
                        {session.format && (
                          <span
                            style={{
                              display: "inline-block",
                              marginTop: "4px",
                              padding: "2px 6px",
                              backgroundColor: "#EBEBEB",
                              borderRadius: "4px",
                              font: font(700, 9),
                              color: "#3C3C3C",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {session.format}
                          </span>
                        )}
                      </div>

                      {/* Cinema + friends */}
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            font: font(600, 14, 1.2),
                            color: "#000000",
                            margin: 0,
                          }}
                        >
                          {session.cinemaName}
                        </p>
                        <p
                          style={{
                            font: font(400, 12, 1.3),
                            color: "#8E8E93",
                            margin: "2px 0 0",
                          }}
                        >
                          {session.cinemaSuburb}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginTop: "8px",
                          }}
                        >
                          <FriendAvatarStack
                            friends={session.friends}
                            size={20}
                            maxVisible={3}
                          />
                          <span
                            style={{
                              font: font(400, 12, 1),
                              color: "#666666",
                            }}
                          >
                            {session.friends.map((f) => f.name).join(", ")}
                          </span>
                        </div>
                      </div>

                      {/* Join button */}
                      {isJoined ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "8px 14px",
                            borderRadius: "999px",
                            backgroundColor: "rgba(212,168,83,0.12)",
                            flexShrink: 0,
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M3 8l3.5 3.5L13 5"
                              stroke="#D4A853"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span
                            style={{
                              font: font(600, 13),
                              color: "#D4A853",
                            }}
                          >
                            Joined
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleJoin(idx)}
                          style={{
                            padding: "8px 16px",
                            borderRadius: "999px",
                            backgroundColor: "#D4A853",
                            border: "none",
                            font: font(600, 13),
                            color: "#FFFFFF",
                            cursor: "pointer",
                            flexShrink: 0,
                            transition:
                              "transform 150ms cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                          onMouseDown={(e) =>
                            ((e.target as HTMLElement).style.transform =
                              "scale(0.95)")
                          }
                          onMouseUp={(e) =>
                            ((e.target as HTMLElement).style.transform =
                              "scale(1)")
                          }
                          onMouseLeave={(e) =>
                            ((e.target as HTMLElement).style.transform =
                              "scale(1)")
                          }
                        >
                          Join
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Bottom padding for safe area */}
        <div style={{ height: "32px" }} />
      </div>
    </div>
  );
}
