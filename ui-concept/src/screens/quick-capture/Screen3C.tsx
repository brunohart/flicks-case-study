import { StatusBar } from "../../components/layout/StatusBar";
import { FlicksTabBar } from "../../components/layout/FlicksTabBar";
import { ViewingDiaryCard } from "../../components/cinema-together/ViewingDiaryCard";
import { DIARY_ENTRIES } from "../../data";

export function Screen3C() {
  return (
    <div
      className="flex flex-col"
      style={{ height: "852px", backgroundColor: "#FFFFFF" }}
    >
      <StatusBar />

      {/* Nav — back (red) + "My Diary" centered + "Filter" right red text */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 16px 12px", position: "relative" }}>
        <button
          style={{
            font: "500 17px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#E8000D",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        <h1
          style={{
            font: "600 17px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#000000",
            margin: 0,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          My Diary
        </h1>
        <button
          style={{
            font: "400 15px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#E8000D",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          Filter
        </button>
      </div>

      {/* Stats bar — 3 columns with vertical separators */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #E8E8E8",
          padding: "16px 0",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ font: "700 24px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000" }}>
            {DIARY_ENTRIES.length}
          </span>
          <span style={{ font: "400 12px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", marginTop: "4px" }}>
            films
          </span>
        </div>
        <div style={{ width: "1px", backgroundColor: "#E8E8E8" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ font: "700 24px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000" }}>
            4.1
          </span>
          <span style={{ font: "400 12px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", marginTop: "4px" }}>
            avg rating
          </span>
        </div>
        <div style={{ width: "1px", backgroundColor: "#E8E8E8" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ font: "700 24px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000" }}>
            {DIARY_ENTRIES.filter((e) => e.watchedWith.length > 0).length}
          </span>
          <span style={{ font: "400 12px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", marginTop: "4px" }}>
            with friends
          </span>
        </div>
      </div>

      {/* Diary entries */}
      <div className="flex-1 overflow-y-auto">
        <p
          style={{
            font: "600 11px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "#8E8E93",
            padding: "16px 16px 8px",
            margin: 0,
          }}
        >
          Recent
        </p>
        {DIARY_ENTRIES.map((entry) => (
          <ViewingDiaryCard key={entry.id} entry={entry} />
        ))}
      </div>

      {/* Footer — Export to Letterboxd as underlined text */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #E8E8E8",
          backgroundColor: "#FFFFFF",
        }}
      >
        <button
          style={{
            display: "block",
            width: "100%",
            background: "transparent",
            border: "none",
            font: "400 15px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#8E8E93",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          Export all to Letterboxd ↗
        </button>
      </div>

      <FlicksTabBar activeTab="more" />
    </div>
  );
}
