import { useEffect, useState } from "react";
import { StatusBar } from "../layout/StatusBar";
import { GoldButton } from "../cinema-together/GoldButton";
import { FriendAvatarStack } from "../cinema-together/FriendAvatarStack";
import { CINEMAS, FRIENDS } from "../../data";

interface CinemaPersonalityPageProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
}

export function CinemaPersonalityPage({ isOpen, onClose, onJoin }: CinemaPersonalityPageProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 380);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!mounted) return null;

  const cinema = CINEMAS[0]; // HOYTS Sylvia Park
  const goingFriends = FRIENDS.filter((f) => f.rsvpStatus === "going");

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 100,
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 380ms cubic-bezier(0.16, 1, 0.3, 1)",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <StatusBar light />

      {/* Dark cinematic hero */}
      <div style={{ position: "relative", height: 210, flexShrink: 0 }}>
        {/* Base dark bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(145deg, #130820 0%, #0D0D1A 55%, #1C060A 100%)",
          }}
        />
        {/* Colour atmosphere — gold bottom-left, red top-right */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 10% 90%, rgba(232,0,13,0.14) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(232,0,13,0.14) 0%, transparent 50%)",
          }}
        />
        {/* Faint horizontal scan lines for film texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
          }}
        />

        {/* Back button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            left: 16,
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "rgba(255,255,255,0.9)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path
              d="M8 2L2 8l6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: 17, fontWeight: 500 }}>Back</span>
        </button>

        {/* HOYTS badge */}
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            backgroundColor: "#E50000",
            borderRadius: 6,
            padding: "4px 10px",
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.06em",
            }}
          >
            HOYTS
          </span>
        </div>

        {/* Hero copy */}
        <div style={{ position: "absolute", bottom: 20, left: 16, right: 16 }}>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Cinema Personality
          </p>
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 4,
            }}
          >
            Sylvia Park
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
            Mt Wellington · 1.8km away
          </p>
          <p
            style={{
              color: "#F23953",
              fontSize: 14,
              fontWeight: 600,
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            "Made for the big moment"
          </p>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* Best for */}
        <div style={{ padding: "18px 16px 0" }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8E8E93",
              marginBottom: 10,
            }}
          >
            Best for
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "VMAX Experience",
              "Blockbusters",
              "Group nights out",
              "Late-night sessions",
              "Action & Sci-Fi",
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#000000",
                  backgroundColor: "#F0F0F0",
                  borderRadius: 9999,
                  padding: "6px 13px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* What makes it special */}
        <div style={{ padding: "18px 16px 0" }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8E8E93",
              marginBottom: 10,
            }}
          >
            What makes it special
          </p>
          <div
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: 16,
              padding: "4px 0",
            }}
          >
            {[
              { icon: "🎬", text: "NZ's largest VMAX screen — six-storey immersive sound" },
              { icon: "💺", text: "Full recliner seating across all screens" },
              { icon: "🅿️", text: "Free parking directly in Sylvia Park mall" },
              { icon: "🌙", text: "Late sessions Fri & Sat until midnight" },
            ].map(({ icon, text }, i, arr) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 14px",
                  borderBottom: i < arr.length - 1 ? "1px solid #EBEBEB" : "none",
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0, width: 28, textAlign: "center" }}>{icon}</span>
                <span style={{ fontSize: 14, color: "#000000", lineHeight: 1.4 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Friends signal */}
        <div style={{ padding: "18px 16px 0" }}>
          <div
            style={{
              backgroundColor: "#FFF8F8",
              border: "1px solid #FFD0D0",
              borderRadius: 10,
              padding: "13px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <FriendAvatarStack friends={goingFriends} size={24} maxVisible={3} borderColor="#FFF8F8" />
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#000000", lineHeight: 1.3 }}>
                {goingFriends.map((f) => f.name).join(" & ")} go here regularly
              </p>
              <p style={{ fontSize: 12, color: "#8E8E93", marginTop: 3 }}>
                It's their go-to for big nights out
              </p>
            </div>
          </div>
        </div>

        {/* Sessions for Conclave */}
        <div style={{ padding: "18px 16px 0" }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8E8E93",
              marginBottom: 10,
            }}
          >
            Conclave · Wed 18 Feb
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "flex-start" }}>
            {cinema.sessions.map((session) => {
              const hasFriends = session.friendsAttending.length > 0;
              return (
                <div
                  key={session.id}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}
                >
                  <button
                    style={{
                      padding: "8px 15px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 500,
                      border: hasFriends
                        ? "1.5px solid #F23953"
                        : "1.5px solid transparent",
                      backgroundColor: "#EBEBEB",
                      color: "#000000",
                      boxShadow: "none",
                      cursor: "pointer",
                    }}
                  >
                    {session.time}
                  </button>
                  {hasFriends && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <FriendAvatarStack
                        friends={session.friendsAttending}
                        size={18}
                        maxVisible={3}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ height: 28 }} />
      </div>

      {/* Sticky CTA */}
      <div
        style={{
          padding: "12px 16px 28px",
          borderTop: "1px solid #E8E8E8",
          backgroundColor: "#FFFFFF",
          flexShrink: 0,
        }}
      >
        <GoldButton fullWidth onClick={onJoin}>
          Join Sarah & Tom — 1:15 PM 🎬
        </GoldButton>
      </div>
    </div>
  );
}
