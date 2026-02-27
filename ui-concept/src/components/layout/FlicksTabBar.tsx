type TabId = "home" | "cinemas" | "streaming" | "search" | "more";

interface FlicksTabBarProps {
  activeTab: TabId;
  onTabChange?: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "cinemas", label: "In Cinemas" },
  { id: "streaming", label: "Streaming" },
  { id: "search", label: "Search" },
  { id: "more", label: "More" },
];

function HomeIcon({ active }: { active: boolean }) {
  const c = active ? "#F23953" : "#8E8E93";
  const sw = active ? "2" : "1.5";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5Z"
        stroke={c}
        strokeWidth={sw}
        fill="none"
      />
      <path
        d="M9 21V12h6v9"
        stroke={c}
        strokeWidth={sw}
      />
    </svg>
  );
}

function CinemasIcon({ active }: { active: boolean }) {
  const c = active ? "#F23953" : "#8E8E93";
  const sw = active ? "2" : "1.5";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke={c} strokeWidth={sw} />
      <line x1="7" y1="4" x2="7" y2="20" stroke={c} strokeWidth={sw} />
      <line x1="17" y1="4" x2="17" y2="20" stroke={c} strokeWidth={sw} />
      <line x1="2" y1="12" x2="22" y2="12" stroke={c} strokeWidth={sw} />
      <line x1="2" y1="8" x2="7" y2="8" stroke={c} strokeWidth={sw} />
      <line x1="2" y1="16" x2="7" y2="16" stroke={c} strokeWidth={sw} />
      <line x1="17" y1="8" x2="22" y2="8" stroke={c} strokeWidth={sw} />
      <line x1="17" y1="16" x2="22" y2="16" stroke={c} strokeWidth={sw} />
    </svg>
  );
}

function StreamingIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#F23953" />
      <path d="M10 8l6 4-6 4V8Z" fill="white" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#8E8E93" strokeWidth="1.5" />
      <path d="M10 8.5l5.5 3.5-5.5 3.5V8.5Z" fill="#8E8E93" />
    </svg>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  const c = active ? "#F23953" : "#8E8E93";
  const sw = active ? "2" : "1.5";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke={c}
        strokeWidth={sw}
      />
      <path
        d="M16.5 16.5L21 21"
        stroke={c}
        strokeWidth={sw}
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoreIcon({ active }: { active: boolean }) {
  const c = active ? "#F23953" : "#8E8E93";
  const sw = active ? "2" : "1.5";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="3" y1="6" x2="21" y2="6" stroke={c} strokeWidth={sw} strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke={c} strokeWidth={sw} strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
}

const iconMap = {
  home: HomeIcon,
  cinemas: CinemasIcon,
  streaming: StreamingIcon,
  search: SearchIcon,
  more: MoreIcon,
};

export function FlicksTabBar({ activeTab, onTabChange }: FlicksTabBarProps) {
  return (
    <div
      className="flex items-end justify-around px-2 pt-2 pb-[28px]"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E8E8E8",
        minHeight: "83px",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = iconMap[tab.id];
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className="flex flex-col items-center gap-[3px]"
            style={{ minWidth: "52px" }}
          >
            <Icon active={isActive} />
            <span
              className="text-[10px] leading-tight"
              style={{
                color: isActive ? "#F23953" : "#8E8E93",
                fontWeight: 500,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
