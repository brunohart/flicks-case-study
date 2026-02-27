import { useState } from "react";

interface EmojiReactionPillProps {
  emoji: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function EmojiReactionPill({
  emoji,
  label,
  selected,
  onSelect,
}: EmojiReactionPillProps) {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    if (!selected) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 400);
    }
    onSelect();
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center"
      style={{
        flex: 1,
        padding: "10px 4px",
        borderRadius: "12px",
        backgroundColor: "transparent",
        border: `1.5px solid ${selected ? "#F23953" : "#E0E0E0"}`,
        cursor: "pointer",
        transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        gap: "6px",
      }}
    >
      <span
        style={{
          fontSize: "28px",
          lineHeight: 1,
          display: "block",
          transform: animating
            ? "scale(1.4)"
            : selected
            ? "scale(1.1)"
            : "scale(1)",
          transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {emoji}
      </span>
      <span
        style={{
          font: "500 10px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
          color: selected ? "#F23953" : "#8E8E93",
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </button>
  );
}
