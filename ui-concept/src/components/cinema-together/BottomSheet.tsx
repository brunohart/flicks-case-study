import { type ReactNode, useEffect, useState } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
}: BottomSheetProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          opacity: visible ? 1 : 0,
          transition: "opacity 280ms ease",
          zIndex: 40,
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#FFFFFF",
          borderRadius: "20px 20px 0 0",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 350ms cubic-bezier(0.32, 0.72, 0, 1)",
          zIndex: 50,
          paddingBottom: "34px",
        }}
      >
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "4px",
              borderRadius: "2px",
              backgroundColor: "#D1D1D6",
            }}
          />
        </div>

        {title && (
          <div style={{ padding: "8px 16px 4px" }}>
            <h2
              style={{
                font: "700 20px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                color: "#000000",
                margin: 0,
              }}
            >
              {title}
            </h2>
          </div>
        )}

        {children}
      </div>
    </>
  );
}
