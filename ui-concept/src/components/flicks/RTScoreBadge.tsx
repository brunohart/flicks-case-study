function RTIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M12 2C12 2 14 4 14 5C14 5.5 13 6 12 6C11 6 10 5.5 10 5C10 4 12 2 12 2Z" fill="#4CAF50" />
      {/* Tomato body */}
      <ellipse cx="12" cy="14" rx="9" ry="8.5" fill="#FA320A" />
      {/* Highlight */}
      <ellipse cx="9" cy="12" rx="2.5" ry="3" fill="#FF6347" opacity="0.5" />
    </svg>
  );
}

interface RTScoreBadgeProps {
  score: number;
  size?: "sm" | "lg";
  audienceScore?: number;
}

export function RTScoreBadge({ score, size = "sm", audienceScore }: RTScoreBadgeProps) {
  if (size === "lg") {
    return (
      <div className="flex flex-col gap-4">
        {/* Critics */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <RTIcon size={44} />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[52px] font-black leading-none" style={{ color: "#000000" }}>
                {score}
              </span>
              <span className="text-[24px] font-bold" style={{ color: "#000000" }}>%</span>
            </div>
            <span
              className="text-[12px] underline"
              style={{ color: "#000000" }}
            >
              Rotten Tomatoes &reg; rating
            </span>
          </div>
        </div>

        {/* Audience */}
        {audienceScore !== undefined && (
          <div className="flex items-center gap-3">
            <span className="text-[40px]">🍿</span>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[52px] font-black leading-none" style={{ color: "#000000" }}>
                  {audienceScore}
                </span>
                <span className="text-[24px] font-bold" style={{ color: "#000000" }}>%</span>
              </div>
              <span
                className="text-[12px] underline"
                style={{ color: "#000000" }}
              >
                Audience score rating
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <RTIcon size={16} />
      <span className="text-[13px] font-medium" style={{ color: "#000000" }}>
        {score}%
      </span>
    </div>
  );
}
