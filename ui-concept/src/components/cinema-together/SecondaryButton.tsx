import { useState } from "react";

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

export function SecondaryButton({
  children,
  onClick,
  fullWidth = false,
}: SecondaryButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={fullWidth ? "w-full" : ""}
      style={{
        padding: "16px 28px",
        borderRadius: "12px",
        backgroundColor: "#FFFFFF",
        color: "#000000",
        fontSize: "16px",
        fontWeight: 600,
        border: "1.5px solid #E0E0E0",
        cursor: "pointer",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transitionDuration: pressed ? "100ms" : "300ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </button>
  );
}
