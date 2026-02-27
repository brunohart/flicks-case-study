import type { Friend } from "../../types";
import { FriendAvatarStack } from "./FriendAvatarStack";

interface FriendNudgeProps {
  friends: Friend[];
  filmTitle: string;
  sessionTime?: string;
  cinemaName?: string;
  onJoin?: () => void;
}

export function FriendNudge({
  friends,
  filmTitle,
  sessionTime,
  cinemaName,
  onJoin,
}: FriendNudgeProps) {
  const goingFriends = friends.filter((f) => f.rsvpStatus === "going");
  const interestedFriends = friends.filter((f) => f.rsvpStatus !== "going");
  const displayFriends = goingFriends.length > 0 ? goingFriends : interestedFriends;

  if (displayFriends.length === 0) return null;

  const names = displayFriends.slice(0, 2).map((f) => f.name);
  const overflow = displayFriends.length - names.length;
  let nameStr = names[0];
  if (names.length === 2) nameStr = `${names[0]} & ${names[1]}`;
  if (overflow > 0) nameStr += ` +${overflow}`;

  const isGoing = goingFriends.length > 0;

  return (
    <div
      style={{
        margin: "0 16px",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#FFF8F8",
        border: "1px solid #FFD0D0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px" }}>
        <FriendAvatarStack friends={displayFriends} size={24} maxVisible={3} borderColor="#FFF8F8" />
        <div style={{ flex: 1 }}>
          <p
            style={{
              font: "500 14px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              color: "#000000",
              margin: 0,
            }}
          >
            {isGoing
              ? `${nameStr} ${displayFriends.length === 1 ? "is" : "are"} going!`
              : `${nameStr} want${displayFriends.length === 1 ? "s" : ""} to see ${filmTitle}`}
          </p>
          {sessionTime && cinemaName && (
            <p
              style={{
                font: "400 13px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                color: "#8E8E93",
                margin: "2px 0 0",
              }}
            >
              {sessionTime} · {cinemaName}
            </p>
          )}
        </div>
        {onJoin && (
          <button
            onClick={onJoin}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              backgroundColor: "#F23953",
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
    </div>
  );
}
