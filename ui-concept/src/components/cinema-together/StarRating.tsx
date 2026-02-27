import { useState } from "react";

interface StarRatingProps {
  value: number; // 0–5, supports 0.5 increments
  onChange?: (value: number) => void;
  size?: number;
  readonly?: boolean;
}

export function StarRating({
  value,
  onChange,
  size = 32,
  readonly = false,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value;

  return (
    <div className="flex items-center" style={{ gap: "8px" }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = display >= star;
        const half = !filled && display >= star - 0.5;

        return (
          <button
            key={star}
            disabled={readonly}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(null)}
            onClick={() => !readonly && onChange?.(star)}
            style={{
              width: size,
              height: size,
              cursor: readonly ? "default" : "pointer",
              border: "none",
              background: "transparent",
              padding: 0,
              transition: "transform 80ms ease",
              transform:
                hovered !== null && hovered >= star ? "scale(1.15)" : "scale(1)",
            }}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
            >
              {half ? (
                <>
                  <defs>
                    <linearGradient id={`half-${star}`} x1="0" x2="1" y1="0" y2="0">
                      <stop offset="50%" stopColor="#FFB800" />
                      <stop offset="50%" stopColor="#E0E0E0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"
                    fill={`url(#half-${star})`}
                  />
                </>
              ) : (
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"
                  fill={filled ? "#FFB800" : "#E0E0E0"}
                />
              )}
            </svg>
          </button>
        );
      })}
    </div>
  );
}
