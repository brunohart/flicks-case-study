type DualTabId = "times" | "streaming";

interface DualTabProps {
  activeTab: DualTabId;
  onTabChange: (tab: DualTabId) => void;
}

export function DualTab({ activeTab, onTabChange }: DualTabProps) {
  const tabs: { id: DualTabId; label: string }[] = [
    { id: "times", label: "CINEMA" },
    { id: "streaming", label: "STREAMING" },
  ];

  return (
    <div
      style={{
        display: "flex",
        margin: "16px 16px 0",
        background: "#EFEFEF",
        borderRadius: "10px",
        padding: "2px",
        gap: "2px",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 8px",
              borderRadius: "8px",
              border: "none",
              background: isActive ? "#FFFFFF" : "transparent",
              boxShadow: isActive
                ? "0 1px 4px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.06)"
                : "none",
              cursor: "pointer",
              minHeight: "52px",
              gap: "3px",
              transition: "background 0.15s, box-shadow 0.15s",
            }}
          >
            <span
              style={{
                font: "700 13px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: isActive ? "#000000" : "#8E8E93",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {isActive && tab.id === "times" && (
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#F23953",
                    flexShrink: 0,
                  }}
                />
              )}
              {tab.label}
            </span>
            {isActive && tab.id === "times" && (
              <span
                style={{
                  font: "400 11px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                  color: "#F23953",
                }}
              >
                ● Now playing
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
