import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "../../components/cinema-together/BottomSheet";
import { EmojiReactionPill } from "../../components/cinema-together/EmojiReactionPill";
import { StarRating } from "../../components/cinema-together/StarRating";
import { GoldButton } from "../../components/cinema-together/GoldButton";
import { MOCK_FILM, EMOJI_OPTIONS } from "../../data/mockData";

interface NotificationPreviewProps {
  initialSheet?: boolean;
}

export function NotificationPreview({ initialSheet }: NotificationPreviewProps) {
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(!!initialSheet);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [starRating, setStarRating] = useState(0);
  const [note, setNote] = useState("");

  const handleEmojiSelect = (opt: (typeof EMOJI_OPTIONS)[number]) => {
    setSelectedEmoji(opt.emoji);
    setStarRating(opt.stars);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0A0A14",
      }}
    >
      {/* Blurred cinema background */}
      <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "blur(24px) brightness(0.45)", transform: "scale(1.1)" }}
      />

      {/* Lock screen content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-[14px] pb-2">
          <span style={{ font: "600 15px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#FFFFFF" }}>
            10:48
          </span>
          <div className="flex items-center gap-[6px]">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="7" width="3" height="5" rx="0.5" fill="white" />
              <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="white" />
              <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" fill="white" />
              <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="white" opacity="0.4" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" fill="white" />
              <path d="M8 6a5 5 0 0 0-3.36 1.86l1.42 1.42A3 3 0 0 1 8 8.5a3 3 0 0 1 1.94.78L11.36 7.86A5 5 0 0 0 8 6Z" fill="white" />
              <path d="M8 2.5A9.5 9.5 0 0 0 2 7l1.42 1.42A7.5 7.5 0 0 1 8 5.5a7.5 7.5 0 0 1 4.58 1.92L14 5.99A9.5 9.5 0 0 0 8 2.5Z" fill="white" />
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.4" />
              <rect x="2" y="2" width="16" height="8" rx="2" fill="white" />
              <path d="M23 4v4a2 2 0 0 0 0-4Z" fill="white" fillOpacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Time + date */}
        <div className="flex flex-col items-center mt-10 mb-2">
          <p style={{ font: "100 80px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#FFFFFF", margin: 0 }}>
            10:48
          </p>
          <p style={{ font: "400 18px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "rgba(255,255,255,0.8)", margin: "4px 0 0" }}>
            Wednesday, 18 February
          </p>
        </div>

        <div className="flex-1" />

        {/* Notification card */}
        <div style={{ margin: "0 16px 16px" }}>
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "4px",
                    backgroundColor: "#F23953",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ font: "700 8px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#FFFFFF" }}>F</span>
                </div>
                <span style={{ font: "700 13px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000" }}>
                  FLICKS
                </span>
              </div>
              <span style={{ font: "400 12px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93" }}>
                2h ago
              </span>
            </div>

            {/* Body */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "4px 16px 16px" }}>
              <img
                src={MOCK_FILM.posterUrl}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                alt={MOCK_FILM.title}
                style={{ width: "48px", height: "68px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ font: "600 15px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: 0 }}>
                  How was {MOCK_FILM.title}?
                </p>
                <p style={{ font: "400 13px/1.4 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", margin: "4px 0 0" }}>
                  You just watched it at HOYTS Sylvia Park. Rate it and add it to your diary.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "12px" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"
                        fill={s <= 4 ? "#FFB800" : "#E0E0E0"}
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", borderTop: "1px solid #E8E8E8" }}>
              <button
                onClick={() => setSheetOpen(true)}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  font: "600 15px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                  color: "#F23953",
                  background: "transparent",
                  border: "none",
                  borderRight: "1px solid #E8E8E8",
                  cursor: "pointer",
                }}
              >
                Rate it
              </button>
              <button
                onClick={() => navigate("/")}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  font: "400 15px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                  color: "#8E8E93",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Later
              </button>
            </div>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-4">
          <div
            style={{
              width: "134px",
              height: "5px",
              borderRadius: "999px",
              backgroundColor: "rgba(255,255,255,0.4)",
            }}
          />
        </div>
      </div>

      {/* Quick Capture Bottom Sheet */}
      <BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div style={{ padding: "0 16px 16px" }}>
          {/* Film context row */}
          <div style={{ display: "flex", gap: "12px", padding: "16px 0", borderBottom: "1px solid #E8E8E8" }}>
            <img
              src={MOCK_FILM.posterUrl}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              alt={MOCK_FILM.title}
              style={{ width: "48px", height: "68px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
            />
            <div>
              <p style={{ font: "600 15px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: 0 }}>
                {MOCK_FILM.title}
              </p>
              <p style={{ font: "400 13px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", margin: "4px 0 0" }}>
                HOYTS Sylvia Park · 18 Feb 2026
              </p>
              <span style={{ font: "400 13px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93" }}>
                🍅 {MOCK_FILM.rtScore}%
              </span>
            </div>
          </div>

          {/* How was it? */}
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
            onFocus={(e) => { e.target.style.border = "1.5px solid #F23953"; }}
            onBlur={(e) => { e.target.style.border = "none"; }}
          />

          {/* Save CTA */}
          <div style={{ marginTop: "20px" }}>
            <GoldButton fullWidth onClick={() => navigate("/app/3c")}>
              Save to diary 📽
            </GoldButton>
          </div>
          <button
            onClick={() => setSheetOpen(false)}
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
      </BottomSheet>
    </div>
  );
}
