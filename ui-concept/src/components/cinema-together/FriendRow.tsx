import type { Friend } from "../../types";
import { GoldCheckbox } from "./GoldCheckbox";
import { RSVPBadge } from "./RSVPBadge";

interface FriendRowProps {
  friend: Friend;
  selected?: boolean;
  onToggle?: (id: string) => void;
  showRSVP?: boolean;
  showCheckbox?: boolean;
}

export function FriendRow({
  friend,
  selected = false,
  onToggle,
  showRSVP = false,
  showCheckbox = false,
}: FriendRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "0 16px",
        minHeight: "56px",
        borderBottom: "1px solid #E8E8E8",
        backgroundColor: "transparent",
        transition: "background-color 180ms ease",
        cursor: onToggle ? "pointer" : "default",
      }}
      onClick={() => onToggle?.(friend.id)}
    >
      {/* Avatar — 40px */}
      <div
        className="rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          width: 40,
          height: 40,
          backgroundColor: friend.avatarColor,
          fontSize: "14px",
          fontWeight: 700,
          color: "#FFFFFF",
        }}
      >
        {friend.initials}
      </div>

      {/* Name */}
      <div className="flex-1">
        <p
          style={{
            font: "400 17px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#000000",
            margin: 0,
          }}
        >
          {friend.name}
        </p>
        {showRSVP && friend.rsvpStatus && (
          <p
            style={{
              font: "400 13px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              color: "#8E8E93",
              margin: "1px 0 0",
            }}
          >
            {friend.rsvpStatus === "going"
              ? "Confirmed"
              : friend.rsvpStatus === "maybe"
              ? "Maybe"
              : friend.rsvpStatus === "invited"
              ? "Invite sent"
              : "Can't make it"}
          </p>
        )}
      </div>

      {/* Right side */}
      {showCheckbox && (
        <GoldCheckbox
          checked={selected}
          onChange={() => onToggle?.(friend.id)}
        />
      )}
      {showRSVP && friend.rsvpStatus && !showCheckbox && (
        <RSVPBadge status={friend.rsvpStatus} />
      )}
    </div>
  );
}
