import type { Friend } from "../../types";
import { FriendAvatarStack } from "./FriendAvatarStack";

interface SocialSignalBadgeProps {
  friends: Friend[];
  message?: string;
  secondaryMessage?: string;
  onJoin?: () => void;
  hasCommittedSession?: boolean;
}

export function SocialSignalBadge({
  friends,
  message,
  secondaryMessage,
  onJoin,
  hasCommittedSession = false,
}: SocialSignalBadgeProps) {
  if (friends.length === 0) return null;

  const names = friends.slice(0, 2).map((f) => f.name);
  const remainder = friends.length - names.length;
  let nameStr = names[0];
  if (names.length === 2) nameStr = `${names[0]} & ${names[1]}`;
  if (remainder > 0) nameStr += ` +${remainder}`;

  const defaultMsg = message ?? `${nameStr} want${friends.length === 1 ? "s" : ""} to see this`;

  return (
    <div
      style={{
        margin: "12px 16px 0",
        padding: "12px 14px",
        backgroundColor: "#FFF8F8",
        border: "1px solid #FFD0D0",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <FriendAvatarStack friends={friends} size={24} maxVisible={3} borderColor="#FFF8F8" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
        <span
          style={{
            font: "500 14px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#000000",
          }}
        >
          {defaultMsg}
        </span>
        {secondaryMessage && (
          <span
            style={{
              font: "400 13px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              color: "#8E8E93",
            }}
          >
            {secondaryMessage}
          </span>
        )}
      </div>
      {hasCommittedSession && onJoin && (
        <button
          onClick={onJoin}
          style={{
            marginLeft: "auto",
            padding: "6px 14px",
            backgroundColor: "#F23953",
            borderRadius: "999px",
            border: "none",
            font: "600 13px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#FFFFFF",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Join
        </button>
      )}
    </div>
  );
}
