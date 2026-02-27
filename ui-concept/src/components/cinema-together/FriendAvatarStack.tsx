import type { Friend } from "../../types";

interface FriendAvatarStackProps {
  friends: Friend[];
  size?: number;
  maxVisible?: number;
  borderColor?: string;
}

export function FriendAvatarStack({
  friends,
  size = 24,
  maxVisible = 3,
  borderColor = "#FFFFFF",
}: FriendAvatarStackProps) {
  const visible = friends.slice(0, maxVisible);
  const overflow = friends.length - visible.length;

  return (
    <div className="flex items-center" style={{ gap: 0 }}>
      {visible.map((f, i) => (
        <div
          key={f.id}
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            width: size,
            height: size,
            backgroundColor: f.avatarColor,
            border: `1.5px solid ${borderColor}`,
            marginLeft: i === 0 ? 0 : -6,
            fontSize: "10px",
            fontWeight: 700,
            color: "#FFFFFF",
            zIndex: visible.length - i,
            position: "relative",
          }}
        >
          {f.initials}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            width: size,
            height: size,
            backgroundColor: "#E0E0E0",
            border: `1.5px solid ${borderColor}`,
            marginLeft: -6,
            fontSize: size * 0.38,
            fontWeight: 700,
            color: "#8E8E93",
          }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
