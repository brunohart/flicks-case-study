import { useState } from "react";

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

export function GoldButton({
  children,
  onClick,
  fullWidth = false,
  disabled = false,
}: GoldButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={fullWidth ? "w-full" : ""}
      style={{
        padding: "16px 28px",
        borderRadius: "12px",
        backgroundColor: disabled ? "#E0E0E0" : "#D4A853",
        color: disabled ? "#8E8E93" : "#FFFFFF",
        fontSize: "16px",
        fontWeight: 600,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transitionDuration: pressed ? "100ms" : "300ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </button>
  );
}
