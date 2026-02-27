import type { Cinema, Session } from "../../types";
import { SessionTimePill } from "./SessionTimePill";

interface CinemaListingProps {
  cinema: Cinema;
  onSessionClick?: (cinema: Cinema, session: Session) => void;
  selectedSessionId?: string;
}

export function CinemaListing({
  cinema,
  onSessionClick,
  selectedSessionId,
}: CinemaListingProps) {
  return (
    <div style={{ padding: "16px 16px 20px", borderBottom: "1px solid #E8E8E8" }}>
      {/* Cinema header row */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
        {/* Cinema logo tile */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "8px",
            backgroundColor: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <span
            style={{
              font: "700 14px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              color: "#FFFFFF",
              letterSpacing: "0.5px",
            }}
          >
            {cinema.name.charAt(0)}
          </span>
        </div>

        {/* Cinema info */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ font: "700 15px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000" }}>
            {cinema.name}
          </span>
          <span style={{ font: "400 13px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93" }}>
            {cinema.suburb} · {cinema.distance}
          </span>
        </div>

        {/* Expand button */}
        <button
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1.5px solid #C8C8C8",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="2" x2="7" y2="12" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="7" x2="12" y2="7" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Session tiles */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {cinema.sessions.map((session) => (
          <SessionTimePill
            key={session.id}
            time={session.time}
            format={session.format}
            friendsAttending={session.friendsAttending}
            selected={selectedSessionId === session.id}
            onClick={() => onSessionClick?.(cinema, session)}
          />
        ))}
      </div>
    </div>
  );
}
