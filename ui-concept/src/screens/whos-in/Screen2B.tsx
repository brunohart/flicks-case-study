import { useState } from "react";
import { StatusBar } from "../../components/layout/StatusBar";
import { FriendRow } from "../../components/cinema-together/FriendRow";
import { GoldButton } from "../../components/cinema-together/GoldButton";
import { FRIENDS } from "../../data";

interface Screen2BProps {
  onBack?: () => void;
  onDone?: () => void;
}

// Sort friends: watchlisted first, then others
const sortedFriends = [...FRIENDS].sort((a, b) => {
  const aWatchlisted = a.rsvpStatus === "going" || a.rsvpStatus === "maybe";
  const bWatchlisted = b.rsvpStatus === "going" || b.rsvpStatus === "maybe";
  if (aWatchlisted && !bWatchlisted) return -1;
  if (!aWatchlisted && bWatchlisted) return 1;
  return 0;
});

// Pre-select watchlisted friends
const preSelected = new Set(
  sortedFriends.filter((f) => f.rsvpStatus === "going" || f.rsvpStatus === "maybe").map((f) => f.id)
);

export function Screen2B({ onBack, onDone }: Screen2BProps) {
  const [selected, setSelected] = useState<Set<string>>(preSelected);

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
      className="flex flex-col"
      style={{ height: "852px", backgroundColor: "#FFFFFF" }}
    >
      <StatusBar />

      {/* Nav — back (red) + "Who's joining?" centered */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 16px 16px" }}>
        <button
          onClick={onBack}
          style={{
            font: "500 17px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#E8000D",
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
          <span style={{ fontSize: "20px" }}>🎬</span>
          <div>
            <p style={{ font: "600 13px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: 0 }}>
              Conclave · 1:15PM Wed 18 Feb
            </p>
            <p style={{ font: "400 12px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", margin: "2px 0 0" }}>
              HOYTS Sylvia Park
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
      <div className="flex-1 overflow-y-auto">
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
            <GoldButton fullWidth onClick={onDone}>
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
