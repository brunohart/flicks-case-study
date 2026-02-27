type RSVPStatus = "going" | "maybe" | "invited" | "declined";

interface RSVPBadgeProps {
  status: RSVPStatus;
}

const config: Record<
  RSVPStatus,
  { label: string; bg: string; color: string; border?: string; strikethrough?: boolean }
> = {
  going: {
    label: "Going",
    bg: "#E6F9F0",
    color: "#1A7340",
  },
  maybe: {
    label: "Maybe",
    bg: "#F5F5F5",
    color: "#8E8E93",
  },
  invited: {
    label: "Invited",
    bg: "transparent",
    color: "#8E8E93",
    border: "1px solid #C7C7CC",
  },
  declined: {
    label: "Can't make it",
    bg: "transparent",
    color: "#8E8E93",
    strikethrough: true,
  },
};

export function RSVPBadge({ status }: RSVPBadgeProps) {
  const { label, bg, color, border, strikethrough } = config[status];
  return (
    <div
      className="flex items-center gap-1 px-3 py-1 rounded-full"
      style={{
        backgroundColor: bg,
        border: border ?? "none",
      }}
    >
      <span
        style={{
          font: "600 12px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
          color,
          textDecoration: strikethrough ? "line-through" : "none",
        }}
      >
        {label}
      </span>
    </div>
  );
}
