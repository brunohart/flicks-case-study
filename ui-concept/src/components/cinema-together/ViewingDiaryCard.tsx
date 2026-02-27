import type { DiaryEntry } from "../../types";
import { StarRating } from "./StarRating";
import { FriendAvatarStack } from "./FriendAvatarStack";

interface ViewingDiaryCardProps {
  entry: DiaryEntry;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ViewingDiaryCard({ entry }: ViewingDiaryCardProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "12px 16px",
        borderBottom: "1px solid #E8E8E8",
        position: "relative",
      }}
    >
      {/* Poster — 48×68px, radius 6px */}
      <div
        style={{
          width: "48px",
          height: "68px",
          borderRadius: "6px",
          overflow: "hidden",
          flexShrink: 0,
          backgroundColor: "#F5F5F5",
        }}
      >
        <img
          src={entry.film.posterUrl}
          alt={entry.film.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        <span
          style={{
            font: "600 15px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#000000",
          }}
        >
          {entry.film.title}
        </span>

        <span
          style={{
            font: "400 13px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#8E8E93",
          }}
        >
          {formatDate(entry.watchedAt)}
          {entry.cinemaName && ` · ${entry.cinemaName}`}
        </span>

        <StarRating value={entry.starRating} readonly size={16} />

        {entry.watchedWith.length > 0 && (
          <div className="flex items-center gap-2" style={{ marginTop: "2px" }}>
            <FriendAvatarStack
              friends={entry.watchedWith}
              size={16}
              maxVisible={3}
            />
            <span
              style={{
                font: "400 12px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                color: "#8E8E93",
              }}
            >
              with {entry.watchedWith.map((f) => f.name).join(", ")}
            </span>
          </div>
        )}

        {entry.note && (
          <p
            style={{
              font: "400 14px/1.4 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              color: "#000000",
              margin: "2px 0 0",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {entry.note}
          </p>
        )}
      </div>

      {/* Emoji reaction — top-right, 20px */}
      <span
        style={{
          position: "absolute",
          top: "12px",
          right: "16px",
          fontSize: "20px",
          lineHeight: 1,
        }}
      >
        {entry.emoji}
      </span>
    </div>
  );
}
