import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "../../components/layout/StatusBar";
import { FriendRow } from "../../components/cinema-together/FriendRow";
import { GoldButton } from "../../components/cinema-together/GoldButton";
import { MOCK_FRIENDS, MOCK_FILM } from "../../data/mockData";

export function WhosJoiningScreen() {
  const navigate = useNavigate();
  const state = null as {
    filmTitle?: string;
    sessionTime?: string;
    cinemaName?: string;
    posterUrl?: string;
  } | null;

  // Sort: watchlisted first
  const sortedFriends = [...MOCK_FRIENDS].sort((a, b) => {
    if (a.hasWatchlisted && !b.hasWatchlisted) return -1;
    if (!a.hasWatchlisted && b.hasWatchlisted) return 1;
    return 0;
  });

  // Pre-select watchlisted friends
  const [selected, setSelected] = useState<Set<string>>(
    new Set(sortedFriends.filter((f) => f.hasWatchlisted).map((f) => f.id))
  );

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const count = selected.size;

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 16px 16px", position: "relative" }}>
        <button
          onClick={() => navigate("/app/2a")}
          style={{
            font: "500 17px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
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
            font: "600 17px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#000000",
            margin: 0,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Who's joining?
        </h2>
        <div style={{ width: "60px" }} />
      </div>

      {/* Session context card */}
      <div style={{ padding: "0 16px", marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 16px",
            backgroundColor: "#F5F5F5",
            borderRadius: "10px",
          }}
        >
          {state?.posterUrl ? (
            <img
              src={state.posterUrl}
              alt=""
              style={{ width: "36px", height: "52px", borderRadius: "4px", objectFit: "cover", flexShrink: 0 }}
            />
          ) : (
            <span style={{ fontSize: "20px" }}>🎬</span>
          )}
          <div>
            <p style={{ font: "600 13px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: 0 }}>
              {state?.filmTitle ?? MOCK_FILM.title} · {state?.sessionTime ?? "1:15PM Wed 18 Feb"}
            </p>
            <p style={{ font: "400 12px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", margin: "2px 0 0" }}>
              {state?.cinemaName ?? "HOYTS Sylvia Park"}
            </p>
          </div>
        </div>
      </div>

      {/* Section label */}
      <div style={{ padding: "0 16px 8px" }}>
        <p
          style={{
            font: "600 11px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "#8E8E93",
            margin: 0,
          }}
        >
          INVITE FRIENDS
        </p>
      </div>

      {/* Friend list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {sortedFriends.map((friend) => (
          <FriendRow
            key={friend.id}
            friend={friend}
            selected={selected.has(friend.id)}
            onToggle={toggle}
            showCheckbox
          />
        ))}
      </div>

      {/* Footer CTA */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #E8E8E8",
          backgroundColor: "#FFFFFF",
        }}
      >
        {count > 0 ? (
          <>
            <GoldButton
              fullWidth
              onClick={() => navigate("/app/2c")}
            >
              Invite {count} friend{count !== 1 ? "s" : ""} →
            </GoldButton>
            <p style={{ font: "400 12px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", textAlign: "center", margin: "8px 0 0" }}>
              They'll get a notification to join you
            </p>
          </>
        ) : (
          <button
            style={{
              width: "100%",
              padding: "16px",
              font: "600 16px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              borderRadius: "12px",
              backgroundColor: "#EBEBEB",
              color: "#8E8E93",
              cursor: "not-allowed",
              border: "none",
            }}
            disabled
          >
            Select at least one friend
          </button>
        )}
      </div>
    </div>
  );
}
