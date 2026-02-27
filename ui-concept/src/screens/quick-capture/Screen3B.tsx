import { useState } from "react";
import { EmojiReactionPill } from "../../components/cinema-together/EmojiReactionPill";
import { StarRating } from "../../components/cinema-together/StarRating";
import { GoldButton } from "../../components/cinema-together/GoldButton";
import type { EmojiOption } from "../../types";
import { CONCLAVE } from "../../data";

// Correct emoji set per spec
const EMOJI_OPTIONS: (EmojiOption & { stars: number })[] = [
  { emoji: "😍", label: "Loved it", stars: 5 },
  { emoji: "😀", label: "Liked it", stars: 4 },
  { emoji: "🤔", label: "It was ok", stars: 3 },
  { emoji: "😴", label: "Boring", stars: 2 },
  { emoji: "😤", label: "Hated it", stars: 1 },
];

interface Screen3BProps {
  onDone?: () => void;
}

export function Screen3B({ onDone }: Screen3BProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>("😍");
  const [starRating, setStarRating] = useState(5);
  const [note, setNote] = useState("");

  const handleEmojiSelect = (opt: (typeof EMOJI_OPTIONS)[number]) => {
    setSelectedEmoji(opt.emoji);
    setStarRating(opt.stars); // Intelligence: emoji pre-fills stars
  };

  return (
    <div
      className="flex flex-col"
      style={{
        height: "852px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0A0A14",
      }}
    >
      {/* Lock screen background (same as 3A) */}
      <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "blur(24px) brightness(0.35)", transform: "scale(1.1)" }}
      />

      {/* Spacer pushes sheet down */}
      <div className="flex-1" />

      {/* Quick Capture Sheet — bottom sheet over lock screen */}
      <div
        className="relative"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "20px 20px 0 0",
          zIndex: 10,
        }}
      >
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px" }}>
          <div style={{ width: "36px", height: "4px", borderRadius: "2px", backgroundColor: "#D1D1D6" }} />
        </div>

        <div style={{ padding: "0 16px 32px" }}>
          {/* Film context row */}
          <div style={{ display: "flex", gap: "12px", padding: "16px 0", borderBottom: "1px solid #E8E8E8" }}>
            <img
              src={CONCLAVE.posterUrl}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              alt="Conclave"
              style={{ width: "48px", height: "68px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
            />
            <div>
              <p style={{ font: "600 15px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: 0 }}>
                Conclave
              </p>
              <p style={{ font: "400 13px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", margin: "4px 0 0" }}>
                HOYTS Sylvia Park · 18 Feb 2026
              </p>
              <span style={{ font: "400 13px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93" }}>
                🍅 {CONCLAVE.rtScore}%
              </span>
            </div>
          </div>

          {/* "How was it?" */}
          <h2 style={{ font: "700 20px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: "20px 0 16px" }}>
            How was it?
          </h2>

          {/* Emoji selector */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: "4px" }}>
            {EMOJI_OPTIONS.map((option) => (
              <EmojiReactionPill
                key={option.emoji}
                emoji={option.emoji}
                label={option.label}
                selected={selectedEmoji === option.emoji}
                onSelect={() => handleEmojiSelect(option)}
              />
            ))}
          </div>

          {/* Star rating */}
          <p style={{ font: "600 11px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", textTransform: "uppercase", letterSpacing: "0.5px", color: "#8E8E93", margin: "20px 0 10px" }}>
            ADD YOUR RATING
          </p>
          <StarRating value={starRating} onChange={setStarRating} size={32} />

          {/* Note field */}
          <p style={{ font: "600 11px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", textTransform: "uppercase", letterSpacing: "0.5px", color: "#8E8E93", margin: "16px 0 10px" }}>
            ADD A NOTE (OPTIONAL)
          </p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What did you think?"
            rows={3}
            style={{
              width: "100%",
              backgroundColor: "#F5F5F5",
              borderRadius: "10px",
              border: "none",
              padding: "12px",
              font: "400 15px/1.5 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              color: "#000000",
              resize: "none",
              boxSizing: "border-box",
              outline: "none",
            }}
            onFocus={(e) => { e.target.style.border = "1.5px solid #E8000D"; }}
            onBlur={(e) => { e.target.style.border = "none"; }}
          />

          {/* Save CTA */}
          <div style={{ marginTop: "20px" }}>
            <GoldButton fullWidth onClick={onDone}>
              Save to diary 📽
            </GoldButton>
          </div>
          <button
            style={{
              display: "block",
              width: "100%",
              marginTop: "12px",
              background: "transparent",
              border: "none",
              font: "400 15px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              color: "#8E8E93",
              cursor: "pointer",
              textAlign: "center",
              padding: "8px",
            }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
