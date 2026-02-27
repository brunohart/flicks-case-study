interface NearYouDropdownProps {
  label?: string;
}

export function NearYouDropdown({ label = "NEAR YOU" }: NearYouDropdownProps) {
  return (
    <button
      className="flex items-center gap-1 flex-shrink-0"
      style={{
        height: "36px",
        padding: "0 14px",
        borderRadius: "999px",
        backgroundColor: "#EBEBEB",
        fontSize: "12px",
        fontWeight: 700,
        color: "#000000",
        letterSpacing: "0.02em",
      }}
    >
      {label}
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M1 1l4 4 4-4" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
