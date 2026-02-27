import { type ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className = "" }: PhoneFrameProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: "393px",
        height: "852px",
        borderRadius: "50px",
        boxShadow:
          "0 0 0 1px rgba(0,0,0,0.08), 0 0 0 10px #1A1A1E, 0 0 0 11px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.5)",
        backgroundColor: "#FFFFFF",
        flexShrink: 0,
      }}
    >
      {/* Dynamic island */}
      <div
        className="absolute top-[12px] left-1/2 -translate-x-1/2 z-50"
        style={{
          width: "120px",
          height: "36px",
          backgroundColor: "#000000",
          borderRadius: "20px",
        }}
      />
      {children}
    </div>
  );
}
