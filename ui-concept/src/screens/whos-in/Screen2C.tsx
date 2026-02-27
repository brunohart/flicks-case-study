import { StatusBar } from "../../components/layout/StatusBar";
import { FlicksTabBar } from "../../components/layout/FlicksTabBar";
import { FriendRow } from "../../components/cinema-together/FriendRow";
import { FriendAvatarStack } from "../../components/cinema-together/FriendAvatarStack";
import { FRIENDS, CINEMAS, CONCLAVE } from "../../data";

interface Screen2CProps {
  onBack?: () => void;
}

const SESSION_FRIENDS = FRIENDS.slice(0, 4);

export function Screen2C({ onBack }: Screen2CProps) {
  const going = SESSION_FRIENDS.filter((f) => f.rsvpStatus === "going");
  const cinema = CINEMAS[0];

  return (
    <div
      className="flex flex-col"
      style={{ height: "852px", backgroundColor: "#FFFFFF" }}
    >
      <StatusBar />

      {/* Nav — back (red) + "Who's In?" centered + share */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 16px 12px", position: "relative" }}>
        <button
          onClick={onBack}
          style={{
            font: "500 17px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#E8000D",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        <h2
          style={{
            font: "600 17px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#000000",
            margin: 0,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Who's In?
        </h2>
        <button
          style={{
            font: "400 15px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#E8000D",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          Share
        </button>
      </div>

      {/* Session summary card */}
      <div style={{ padding: "0 16px", marginBottom: "16px" }}>
        <div
          style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #E8E8E8" }}
        >
          <div className="relative" style={{ height: "80px", overflow: "hidden", backgroundColor: "#000000" }}>
            <img
              src={CONCLAVE.posterUrl}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ filter: "blur(20px) brightness(0.5)", transform: "scale(1.2)" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
            <div className="absolute inset-0 flex items-center px-4 gap-3">
              <img
                src={CONCLAVE.posterUrl}
                alt={CONCLAVE.title}
                style={{ width: "40px", height: "60px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div>
                <p style={{ font: "700 18px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#FFFFFF", margin: 0 }}>
                  Conclave
                </p>
                <p style={{ font: "400 13px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "rgba(255,255,255,0.75)", margin: "2px 0 0" }}>
                  1:15PM · Wed 18 Feb · {cinema.name}
                </p>
                <p style={{ font: "400 13px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "rgba(255,255,255,0.6)", margin: "2px 0 0" }}>
                  {going.length} confirmed · {SESSION_FRIENDS.length - going.length} awaiting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar row + invite */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 16px 12px" }}>
        <FriendAvatarStack friends={going} size={32} maxVisible={4} />
        <button
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            border: "1.5px solid #E8000D",
            background: "transparent",
            font: "600 13px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#E8000D",
            cursor: "pointer",
          }}
        >
          + Invite
        </button>
      </div>

      {/* Section label */}
      <div style={{ padding: "0 16px 8px", borderBottom: "1px solid #E8E8E8" }}>
        <p
          style={{
            font: "600 11px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "#8E8E93",
            margin: "0 0 8px",
          }}
        >
          Invited ({SESSION_FRIENDS.length})
        </p>
      </div>

      {/* RSVP friend list */}
      <div className="flex-1 overflow-y-auto">
        {SESSION_FRIENDS.map((friend) => (
          <FriendRow
            key={friend.id}
            friend={friend}
            showRSVP
          />
        ))}
      </div>

      {/* Footer — Export to Letterboxd as underlined text */}
      <div
        style={{ padding: "16px", borderTop: "1px solid #E8E8E8" }}
      >
        <button
          style={{
            display: "block",
            width: "100%",
            background: "transparent",
            border: "none",
            font: "400 15px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
            color: "#8E8E93",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          Export to Letterboxd ↗
        </button>
      </div>

      <FlicksTabBar activeTab="cinemas" />
    </div>
  );
}
