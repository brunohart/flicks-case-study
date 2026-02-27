import type { Friend } from "../../types";

interface SessionTimePillProps {
  time: string;
  format?: string;
  friendsAttending?: Friend[];
  selected?: boolean;
  onClick?: () => void;
}

export function SessionTimePill({
  time,
  format,
  friendsAttending = [],
  selected = false,
  onClick,
}: SessionTimePillProps) {
  const hasFriends = friendsAttending.length > 0;

  let bg = "#EBEBEB";
  let borderStyle = "1.5px solid transparent";

  if (selected) {
    bg = "#D6D6D6";
  }
  if (hasFriends && !selected) {
    borderStyle = "1.5px solid #F23953";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <button
        onClick={onClick}
        style={{
          minWidth: "88px",
          padding: "12px 14px",
          borderRadius: "10px",
          backgroundColor: bg,
          border: borderStyle,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          overflow: "hidden",
          transition: "border-color 0.15s",
        }}
      >
        <span
          style={{
            font: "500 15px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#000000",
            paddingBottom: format ? "8px" : 0,
            whiteSpace: "nowrap",
          }}
        >
          {time}
        </span>
        {format && (
          <span
            style={{
              display: "block",
              width: "calc(100% + 28px)",
              margin: "0 -14px -12px",
              padding: "4px 0",
              textAlign: "center",
              backgroundColor: "#C8C8C8",
              font: "700 9px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#3C3C3C",
            }}
          >
            {format}
          </span>
        )}
      </button>

      {/* Friend avatars — BELOW tile, NOT inside */}
      {hasFriends && !selected && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {friendsAttending.slice(0, 3).map((f) => (
            <span
              key={f.id}
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#F23953",
                font: "700 7px/16px -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                color: "#FFFFFF",
                textAlign: "center",
                margin: "0 -3px",
                border: "1.5px solid #FFFFFF",
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {f.initials}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
