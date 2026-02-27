interface DateOption {
  id: string;
  dayOfWeek: string; // "FRI"
  day: number; // 21
  month: string; // "FEB"
}

interface DatePickerProps {
  dates: DateOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function DatePicker({ dates, selectedId, onSelect }: DatePickerProps) {
  return (
    <div
      className="flex"
      style={{
        padding: "0 16px",
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      {dates.map((d) => {
        const isSelected = d.id === selectedId;
        return (
          <button
            key={d.id}
            onClick={() => onSelect(d.id)}
            className="flex-1 flex flex-col items-center"
            style={{
              gap: "2px",
              padding: "10px 0 12px",
              background: "transparent",
              border: "none",
              borderBottom: `3px solid ${isSelected ? "#F23953" : "transparent"}`,
              marginBottom: "-1px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                font: "600 11px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: isSelected ? "#F23953" : "#8E8E93",
              }}
            >
              {d.dayOfWeek}
            </span>
            <span
              style={{
                font: "700 18px/1.1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                color: "#000000",
              }}
            >
              {d.day} {d.month}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Helper to build the next 7 days
export function buildDateOptions(fromDate: Date = new Date()): DateOption[] {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(fromDate);
    d.setDate(d.getDate() + i);
    return {
      id: d.toISOString().split("T")[0],
      dayOfWeek: days[d.getDay()],
      day: d.getDate(),
      month: months[d.getMonth()],
    };
  });
}
