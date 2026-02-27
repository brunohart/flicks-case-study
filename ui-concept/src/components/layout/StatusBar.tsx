interface StatusBarProps {
  light?: boolean; // true = white icons (for dark backgrounds)
  time?: string;
}

export function StatusBar({ light = false, time }: StatusBarProps) {
  const displayTime =
    time ??
    new Date().toLocaleTimeString("en-NZ", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });

  const colour = light ? "#FFFFFF" : "#1A1A1E";

  return (
    <div className="flex items-center justify-between px-4 pt-[14px] pb-[6px]">
      <span className="text-[15px] font-semibold" style={{ color: colour }}>
        {displayTime}
      </span>
      <div className="flex items-center gap-[6px]">
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill={colour} />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill={colour} />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" fill={colour} />
          <rect
            x="13.5"
            y="0"
            width="3"
            height="12"
            rx="0.5"
            fill={colour}
            opacity="0.3"
          />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
            fill={colour}
          />
          <path
            d="M8 6C6.14 6 4.46 6.74 3.22 7.94L4.64 9.36A5 5 0 0 1 8 7.5a5 5 0 0 1 3.36 1.86l1.42-1.42A7 7 0 0 0 8 6Z"
            fill={colour}
          />
          <path
            d="M8 2.5C5.07 2.5 2.43 3.67.58 5.58L2 7A9.5 9.5 0 0 1 8 4.5 9.5 9.5 0 0 1 14 7l1.42-1.42C13.57 3.67 10.93 2.5 8 2.5Z"
            fill={colour}
          />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="3.5"
            stroke={colour}
            strokeOpacity="0.35"
          />
          <rect x="2" y="2" width="16" height="8" rx="2" fill={colour} />
          <path
            d="M23 4v4a2 2 0 0 0 0-4Z"
            fill={colour}
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}
