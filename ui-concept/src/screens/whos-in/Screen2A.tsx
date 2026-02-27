import { useState } from "react";
import { StatusBar } from "../../components/layout/StatusBar";
import { FlicksTabBar } from "../../components/layout/FlicksTabBar";
import { GoldButton } from "../../components/cinema-together/GoldButton";
import { SecondaryButton } from "../../components/cinema-together/SecondaryButton";
import { CONCLAVE } from "../../data";

interface Screen2AProps {
  onInviteFriends?: () => void;
}

export function Screen2A({ onInviteFriends }: Screen2AProps) {
  const [ticketClicked, setTicketClicked] = useState(false);

  return (
    <div
      className="flex flex-col"
      style={{ height: "852px", backgroundColor: "#FFFFFF" }}
    >
      <StatusBar />

      {/* Back navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 16px 12px" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: "#E8000D",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ font: "500 17px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif" }}>
            Showtimes
          </span>
        </button>
      </div>

      {/* Session summary card */}
      <div style={{ padding: "0 16px", marginBottom: "24px" }}>
        <div
          style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #E8E8E8" }}
        >
          {/* Backdrop strip */}
          <div className="relative" style={{ height: "100px", overflow: "hidden", backgroundColor: "#000000" }}>
            <img
              src={CONCLAVE.posterUrl}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ filter: "blur(20px) brightness(0.5)", transform: "scale(1.2)" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)" }} />
            <div className="absolute inset-0 flex items-center gap-3 px-4">
              <img
                src={CONCLAVE.posterUrl}
                alt={CONCLAVE.title}
                style={{ width: "48px", height: "68px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div>
                <p style={{ font: "700 20px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#FFFFFF", margin: 0 }}>
                  Conclave
                </p>
                <p style={{ font: "400 13px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "rgba(255,255,255,0.8)", margin: "2px 0 0" }}>
                  M · 2h 0m
                </p>
              </div>
            </div>
          </div>

          {/* Session details */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
            <div>
              <p style={{ font: "600 16px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: 0 }}>
                1:15PM · Wed 18 Feb
              </p>
              <p style={{ font: "400 13px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", margin: "2px 0 0" }}>
                HOYTS Sylvia Park
              </p>
            </div>
            <div
              style={{ padding: "4px 12px", borderRadius: "999px", backgroundColor: "#F5F5F5" }}
            >
              <span style={{ font: "600 12px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000" }}>
                Standard
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Heading */}
      <div style={{ padding: "0 16px 16px" }}>
        <p style={{ font: "600 13px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", textTransform: "uppercase", letterSpacing: "0.5px", color: "#8E8E93", margin: 0 }}>
          What would you like to do?
        </p>
      </div>

      {/* Dual CTA — Buy tickets is PRIMARY (red fill), Who's going is SECONDARY (outline) */}
      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <GoldButton fullWidth onClick={() => setTicketClicked(true)}>
            {ticketClicked ? "✓ Tickets selected" : "🎟  Buy tickets"}
          </GoldButton>
          <p style={{ font: "400 12px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", textAlign: "center", margin: "8px 0 0" }}>
            Opens the HOYTS booking flow
          </p>
        </div>

        <div>
          <SecondaryButton fullWidth onClick={onInviteFriends}>
            👥  Who else is going?
          </SecondaryButton>
          <p style={{ font: "400 12px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", textAlign: "center", margin: "8px 0 0" }}>
            Invite friends & coordinate with Cinema Together
          </p>
        </div>
      </div>

      {/* Info blurb — using social fill colors, not gold */}
      <div
        style={{
          margin: "24px 16px 0",
          padding: "16px",
          borderRadius: "10px",
          backgroundColor: "#FFF8F8",
          border: "1px solid #FFD0D0",
        }}
      >
        <p style={{ font: "600 13px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: "0 0 4px" }}>
          Cinema Together
        </p>
        <p style={{ font: "400 13px/1.5 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", margin: 0 }}>
          See which friends are interested, coordinate your seats, and RSVP together — all inside Flicks.
        </p>
      </div>

      <div className="flex-1" />
      <FlicksTabBar activeTab="cinemas" />
    </div>
  );
}
