import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

// ============================================================================
// SCREEN REGISTRY — each card maps to a real interactive route
// ============================================================================

type ScreenId =
  | "1a" | "1b" | "1c"
  | "2a" | "2b" | "2c"
  | "3a" | "3b" | "3c";

interface ScreenDef {
  id: ScreenId;
  label: string;
  description: string;
  route: string; // the interactive route to navigate to
}

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  screens: ScreenDef[];
}

const FEATURES: Feature[] = [
  {
    id: "social-signals",
    title: "Feature 1",
    subtitle: "Social Signals",
    accentColor: "#F23953",
    screens: [
      {
        id: "1a",
        label: "1A — Showtimes",
        description: "Showtimes with friend interest signals overlaid on session pills",
        route: "/app/1a",
      },
      {
        id: "1b",
        label: "1B — Film Detail",
        description: "Film detail page with social proof and friend interest",
        route: "/app/1b",
      },
      {
        id: "1c",
        label: "1C — Friends' Sessions",
        description: "Stacked list of all sessions friends are attending this week",
        route: "/app/1c",
      },
    ],
  },
  {
    id: "whos-in",
    title: "Feature 2",
    subtitle: "Who's In",
    accentColor: "#D4A853",
    screens: [
      {
        id: "2a",
        label: "2A — Booking",
        description: "Seat selection with friend proximity highlighting",
        route: "/app/2a",
      },
      {
        id: "2b",
        label: "2B — Invite Friends",
        description: "Invite contacts to join a solo session",
        route: "/app/2b",
      },
      {
        id: "2c",
        label: "2C — RSVP Tracking",
        description: "Live RSVP status tracker with inline invite",
        route: "/app/2c",
      },
    ],
  },
  {
    id: "quick-capture",
    title: "Feature 3",
    subtitle: "Quick Capture",
    accentColor: "#D4A853",
    screens: [
      {
        id: "3a",
        label: "3A — Notification",
        description: "iOS lock screen notification prompting a post-film review",
        route: "/app/3a",
      },
      {
        id: "3b",
        label: "3B — Emoji Reaction",
        description: "Emoji-first reaction flow with star rating and quick note",
        route: "/app/3b",
      },
      {
        id: "3c",
        label: "3C — Viewing Diary",
        description: "Personal viewing diary with stats, diary cards, and Letterboxd export",
        route: "/app/3c",
      },
    ],
  },
];

// ============================================================================
// ANIMATED COVERS
// ============================================================================

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

function Cover1A({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(165deg, rgba(242,57,83,0.09) 0%, rgba(242,57,83,0.04) 100%)" }}>
      <div className="flex gap-2 items-center">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ width: hovered ? 36 : 28, height: 28, borderRadius: 14, backgroundColor: i === 1 ? "#F23953" : "#D4A853", opacity: hovered ? 1 : 0.6, transform: hovered ? "scaleY(1.1)" : "scaleY(0.85)", transition: `transform 380ms ${100 + i * 70}ms ${ease}, width 400ms ${ease}, opacity 350ms ${ease}` }} />
        ))}
      </div>
      <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 flex gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#F23953", opacity: hovered ? 0.8 : 0.3, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: `transform 320ms ${200 + i * 60}ms ${ease}, opacity 300ms ${ease}` }} />
        ))}
      </div>
    </div>
  );
}

function Cover1B({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(165deg, rgba(242,57,83,0.08) 0%, rgba(26,26,30,0.05) 100%)" }}>
      <div style={{ position: "relative", width: 140, height: 100 }}>
        <div style={{ position: "absolute", inset: 0, border: "2px solid #F23953", borderRadius: 8, opacity: hovered ? 0.5 : 0.2, transform: hovered ? "scale(1.02)" : "scale(0.95)", transition: `transform 450ms ${ease}, opacity 400ms ${ease}` }} />
        <div style={{ position: "absolute", inset: 8, border: "2px solid #D4A853", borderRadius: 6, opacity: hovered ? 0.7 : 0.3, transform: hovered ? "scale(1)" : "scale(0.92)", transition: `transform 450ms 80ms ${ease}, opacity 400ms ${ease}` }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 24, height: 24, borderRadius: "50%", backgroundColor: "#D4A853", transform: `translate(-50%,-50%) scale(${hovered ? 1.2 : 0.9})`, opacity: hovered ? 0.9 : 0.4, transition: `transform 400ms 150ms ${ease}, opacity 350ms ${ease}` }} />
      </div>
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest uppercase" style={{ color: "#F23953", opacity: hovered ? 1 : 0.5, transition: "opacity 350ms 200ms " + ease }}>3 want to see</div>
    </div>
  );
}

function Cover1C({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(165deg, rgba(212,168,83,0.1) 0%, rgba(26,26,30,0.04) 100%)" }}>
      <div style={{ position: "absolute", width: 90, height: 90, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,83,0.2) 0%, transparent 65%)", opacity: hovered ? 1 : 0.4, transition: `opacity 400ms ${ease}` }} />
      <svg width="52" height="52" viewBox="0 0 56 56" fill="none" style={{ position: "relative", transform: hovered ? "scale(1.08)" : "scale(0.9)", transition: `transform 420ms ${ease}` }}>
        <circle cx="28" cy="28" r="26" stroke="#D4A853" strokeWidth="2" fill="none" style={{ strokeDasharray: 163, strokeDashoffset: hovered ? 0 : 163, transition: `stroke-dashoffset 400ms ${ease}` }} />
        <path d="M16 28 L24 36 L40 20" stroke="#D4A853" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="44" strokeDashoffset={hovered ? 0 : 44} style={{ transition: `stroke-dashoffset 350ms 180ms ${ease}` }} />
      </svg>
      <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-16 h-1 rounded-full" style={{ backgroundColor: "rgba(212,168,83,0.3)", transform: `scaleX(${hovered ? 1 : 0.4})`, transformOrigin: "center", transition: `transform 350ms 250ms ${ease}` }} />
    </div>
  );
}

function Cover2A({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(165deg, rgba(212,168,83,0.08) 0%, rgba(26,26,30,0.05) 100%)" }}>
      <svg width="120" height="72" viewBox="0 0 120 72" fill="none" style={{ position: "relative" }}>
        <path d="M60 10 L60 30 M60 30 L30 56 M60 30 L90 56" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="120" strokeDashoffset={hovered ? 0 : 120} style={{ transition: `stroke-dashoffset 500ms ${ease}` }} />
        <circle cx="60" cy="10" r="6" fill="#D4A853" style={{ opacity: hovered ? 1 : 0.5, transform: hovered ? "scale(1.1)" : "scale(0.9)", transformOrigin: "60px 10px", transition: `transform 350ms ${ease}, opacity 300ms ${ease}` }} />
        <circle cx="30" cy="56" r="6" fill="#D4A853" style={{ opacity: hovered ? 1 : 0.3, transform: hovered ? "scale(1.15)" : "scale(0)", transformOrigin: "30px 56px", transition: `transform 380ms 200ms ${ease}, opacity 300ms ${ease}` }} />
        <circle cx="90" cy="56" r="6" fill="#D4A853" style={{ opacity: hovered ? 1 : 0.3, transform: hovered ? "scale(1.15)" : "scale(0)", transformOrigin: "90px 56px", transition: `transform 380ms 280ms ${ease}, opacity 300ms ${ease}` }} />
      </svg>
    </div>
  );
}

function Cover2B({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(165deg, rgba(212,168,83,0.07) 0%, rgba(26,26,30,0.05) 100%)" }}>
      <div className="flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3" style={{ transform: hovered ? "translateX(0)" : "translateX(-12px)", opacity: hovered ? 1 : 0.6, transition: `transform 350ms ${150 + i * 80}ms ${ease}, opacity 300ms ${ease}` }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#D4A853", flexShrink: 0 }} />
            <div style={{ width: 48, height: 6, borderRadius: 3, backgroundColor: "rgba(212,168,83,0.4)" }} />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.5)", transition: `opacity 250ms ${250 + i * 60}ms ${ease}, transform 300ms ${ease}` }}>
              <path d="M3 9l4 4 8-8" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cover2C({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(165deg, rgba(212,168,83,0.08) 0%, rgba(26,26,30,0.04) 100%)" }}>
      <div className="flex gap-4 items-end" style={{ height: 56 }}>
        {["G", "M", "I"].map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div style={{ width: 20, height: hovered ? 24 + i * 8 : 12, borderRadius: 4, backgroundColor: "#D4A853", transition: `height 400ms ${150 + i * 80}ms ${ease}` }} />
            <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "#000000", opacity: hovered ? 0.8 : 0.4 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cover3A({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(165deg, rgba(212,168,83,0.06) 0%, rgba(26,26,30,0.06) 100%)" }}>
      <div style={{ width: 100, height: 32, borderRadius: 16, backgroundColor: "rgba(26,26,30,0.12)", border: "1px solid rgba(212,168,83,0.3)", transform: hovered ? "scale(1.05)" : "scale(0.95)", transition: `transform 400ms ${ease}` }} />
      <div className="absolute top-[32%] left-1/2 -translate-x-1/2 flex gap-1">
        {[0, 1, 2].map((j) => (
          <div key={j} style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#D4A853", opacity: hovered ? 0.9 : 0.3, transform: hovered ? "scale(1.2)" : "scale(0.8)", transition: `transform 320ms ${200 + j * 50}ms ${ease}, opacity 300ms ${ease}` }} />
        ))}
      </div>
    </div>
  );
}

function Cover3B({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(165deg, rgba(212,168,83,0.07) 0%, rgba(26,26,30,0.05) 100%)" }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ position: "absolute", width: 3, height: 22, borderRadius: 2, backgroundColor: "#D4A853", opacity: hovered ? 0.4 : 0, transform: `rotate(${i * 60}deg) scaleY(${hovered ? 1 : 0.2})`, transformOrigin: "center 28px", transition: `transform 400ms ${80 + i * 35}ms ${ease}, opacity 300ms ${ease}` }} />
      ))}
      <svg width="44" height="44" viewBox="0 0 24 24" fill="#D4A853" style={{ position: "relative", transform: hovered ? "scale(1.12) rotate(10deg)" : "scale(0.88) rotate(0deg)", filter: hovered ? "drop-shadow(0 2px 8px rgba(212,168,83,0.5))" : "none", transition: `transform 380ms ${ease}, filter 350ms ${ease}` }}>
        <path d="M12 2l2.09 6.26L20.18 9l-5.09 3.74L16.18 19 12 15.77 7.82 19l1.09-6.26L3.82 9l6.09-.74z" />
      </svg>
      <div className="absolute bottom-[24%] left-1/2 -translate-x-1/2 flex gap-1">
        {["😊", "🔥", "👍"].map((emoji, j) => (
          <span key={j} className="text-lg" style={{ opacity: hovered ? 1 : 0.2, transform: hovered ? "scale(1.1)" : "scale(0.7)", transition: `transform 320ms ${220 + j * 60}ms ${ease}, opacity 300ms ${ease}` }}>{emoji}</span>
        ))}
      </div>
    </div>
  );
}

function Cover3C({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(165deg, rgba(212,168,83,0.06) 0%, rgba(26,26,30,0.05) 100%)" }}>
      <div style={{ position: "relative", width: 100, height: 72 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 70, height: 48, marginLeft: -35, marginTop: -24, borderRadius: 8, backgroundColor: i === 0 ? "#D4A853" : "rgba(212,168,83,0.25)", border: "1px solid rgba(212,168,83,0.4)", transform: hovered ? `translateY(${-8 + i * 4}px) rotate(${-4 + i * 2}deg) scale(1)` : `translateY(${i * 6}px) rotate(${i * 3}deg) scale(0.9)`, opacity: hovered ? 1 : 0.5 + i * 0.15, transition: `transform 420ms ${100 + i * 70}ms ${ease}, opacity 350ms ${ease}` }} />
        ))}
      </div>
    </div>
  );
}

type CoverComponent = (props: { hovered: boolean }) => ReactElement;
const COVER_MAP: Record<ScreenId, CoverComponent> = {
  "1a": Cover1A, "1b": Cover1B, "1c": Cover1C,
  "2a": Cover2A, "2b": Cover2B, "2c": Cover2C,
  "3a": Cover3A, "3b": Cover3B, "3c": Cover3C,
};

// ============================================================================
// SCREEN CARD — clicking navigates to the interactive route
// ============================================================================

interface ScreenCardProps {
  screen: ScreenDef;
  onClick: () => void;
}

function ScreenCard({ screen, onClick }: ScreenCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col text-left border-0 bg-transparent p-0 cursor-pointer"
      style={{
        width: "280px",
        flexShrink: 0,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: `transform 300ms ${ease}`,
        outline: "none",
      }}
    >
      <div
        style={{
          width: "280px",
          height: "430px",
          borderRadius: "24px",
          boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.06)",
          transition: `box-shadow 300ms ${ease}`,
          position: "relative",
        }}
      >
        <div
          className="overflow-hidden"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "24px",
            backgroundColor: "#F5F5F5",
            position: "relative",
          }}
        >
          {(() => {
            const Cover = COVER_MAP[screen.id];
            return Cover ? <Cover hovered={hovered} /> : null;
          })()}
        </div>
      </div>

      <div className="mt-3 px-1">
        <p className="text-[14px] font-bold" style={{ color: "#000000" }}>{screen.label}</p>
        <p className="text-[12px] mt-1 leading-relaxed" style={{ color: "#8E8E93" }}>{screen.description}</p>
      </div>
    </button>
  );
}

// ============================================================================
// GALLERY PAGE
// ============================================================================

export function GalleryPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      {/* Hero header */}
      <div
        className="px-8 pt-16 pb-12"
        style={{
          background: "linear-gradient(135deg, #F23953 0%, #D42D45 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{ width: "52px", height: "52px", backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <span className="text-[28px] font-black" style={{ color: "#FFFFFF" }}>F</span>
            </div>
            <div>
              <h1 className="text-[32px] font-black leading-none" style={{ color: "#FFFFFF" }}>
                Flicks
              </h1>
              <p className="text-[14px] mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>
                Cinema Together
              </p>
            </div>
          </div>
          <h2
            className="text-[22px] font-bold leading-snug mb-3"
            style={{ color: "#FFFFFF" }}
          >
            Product Strategy Case Study
          </h2>
          <p
            className="text-[16px] leading-relaxed max-w-2xl"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            9 interactive screens across 3 proposed features — making cinema attendance
            communal by layering friend-based social signals over Flicks showtimes.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {["Social Signals", "Who's In", "Quick Capture"].map((f, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full text-[13px] font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Feature sections */}
      <div className="max-w-5xl mx-auto px-8 py-12 space-y-16">
        {FEATURES.map((feature) => (
          <section key={feature.id}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-1 rounded-full"
                style={{ height: "40px", backgroundColor: feature.accentColor }}
              />
              <div>
                <p
                  className="text-[12px] font-bold uppercase tracking-widest"
                  style={{ color: feature.accentColor }}
                >
                  {feature.title}
                </p>
                <h3
                  className="text-[24px] font-black"
                  style={{ color: "#000000" }}
                >
                  {feature.subtitle}
                </h3>
              </div>
            </div>

            <div className="flex gap-8 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
              {feature.screens.map((screen) => (
                <ScreenCard
                  key={screen.id}
                  screen={screen}
                  onClick={() => navigate(screen.route)}
                />
              ))}
            </div>
          </section>
        ))}

        <footer className="pt-8 pb-16 border-t" style={{ borderColor: "#E8E8E8" }}>
          <p className="text-[13px]" style={{ color: "#AEAEB2" }}>
            Built with React 19, React Router 7, TypeScript 5.7, Vite 6, and Tailwind CSS 4, using the real Flicks
            design system (F23953 / D4A853) inside an iPhone 15 Pro (393×852) frame.
          </p>
        </footer>
      </div>
    </div>
  );
}
