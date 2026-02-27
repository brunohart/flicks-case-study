interface GoldCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: number;
}

export function GoldCheckbox({
  checked,
  onChange,
  size = 22,
}: GoldCheckboxProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: checked ? "#D4A853" : "transparent",
        border: `2px solid ${checked ? "#D4A853" : "#C7C7CC"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "all 180ms cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "pointer",
      }}
    >
      {checked && (
        <svg
          width={size * 0.55}
          height={size * 0.55}
          viewBox="0 0 12 10"
          fill="none"
        >
          <path
            d="M1.5 5.5L4.5 8.5L10.5 1.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
