import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "../../components/layout/StatusBar";
import { GoldButton } from "../../components/cinema-together/GoldButton";
import { MOCK_FILM, MOCK_CONTACTS } from "../../data/mockData";
import type { Contact } from "../../data/mockData";

const font = (w: number, s: number, lh = 1) =>
  `${w} ${s}px/${lh} -apple-system, system-ui, BlinkMacSystemFont, sans-serif`;

export function InviteFriendsScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [invited, setInvited] = useState<Set<string>>(new Set());
  const [sent, setSent] = useState(false);

  const filtered = MOCK_CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: string) => {
    setInvited((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const count = invited.size;

  if (sent) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "32px",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "rgba(212,168,83,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M8 18l7 7L28 11"
              stroke="#D4A853"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2
          style={{
            font: font(700, 22, 1.2),
            color: "#000000",
            margin: 0,
            textAlign: "center",
          }}
        >
          Invites Sent!
        </h2>
        <p
          style={{
            font: font(400, 15, 1.4),
            color: "#8E8E93",
            margin: 0,
            textAlign: "center",
            maxWidth: "280px",
          }}
        >
          {count} friend{count !== 1 ? "s" : ""} will receive a link to join
          you for {MOCK_FILM.title}.
        </p>
        <button
          onClick={() => navigate("/app/2c")}
          style={{
            marginTop: "16px",
            padding: "14px 28px",
            borderRadius: "12px",
            backgroundColor: "#F23953",
            border: "none",
            font: font(600, 15),
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          View RSVP Tracker
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StatusBar />

      {/* Nav bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 16px 12px",
          position: "relative",
        }}
      >
        <button
          onClick={() => navigate("/app/2a")}
          style={{
            font: font(500, 17),
            color: "#F23953",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        <h2
          style={{
            font: font(600, 17),
            color: "#000000",
            margin: 0,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Invite Friends
        </h2>
        <div style={{ width: "60px" }} />
      </div>

      {/* Session context card */}
      <div style={{ padding: "0 16px 12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 14px",
            backgroundColor: "#F5F5F5",
            borderRadius: "12px",
          }}
        >
          <img
            src={MOCK_FILM.posterUrl}
            alt=""
            style={{
              width: "36px",
              height: "52px",
              borderRadius: "4px",
              objectFit: "cover",
              flexShrink: 0,
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div>
            <p
              style={{
                font: font(600, 13, 1.2),
                color: "#000000",
                margin: 0,
              }}
            >
              {MOCK_FILM.title} · 4:40PM Wed 18 Feb
            </p>
            <p
              style={{
                font: font(400, 12, 1.2),
                color: "#8E8E93",
                margin: "2px 0 0",
              }}
            >
              HOYTS Sylvia Park
            </p>
          </div>
        </div>
      </div>

      {/* Empty state banner */}
      <div
        style={{
          margin: "0 16px 12px",
          padding: "14px",
          backgroundColor: "rgba(212,168,83,0.06)",
          border: "1px solid rgba(212,168,83,0.2)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "20px" }}>👋</span>
        <p
          style={{
            font: font(400, 14, 1.4),
            color: "#666666",
            margin: 0,
          }}
        >
          No friends are going to this session yet. Invite someone to join you!
        </p>
      </div>

      {/* Search bar */}
      <div style={{ padding: "0 16px 8px" }}>
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#F0F0F0",
            font: font(400, 15),
            color: "#000000",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Contact list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filtered.map((contact) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            selected={invited.has(contact.id)}
            onToggle={() => toggle(contact.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p
            style={{
              font: font(400, 14, 1.4),
              color: "#8E8E93",
              textAlign: "center",
              padding: "24px 16px",
            }}
          >
            No contacts match "{search}"
          </p>
        )}
      </div>

      {/* Footer CTA */}
      <div
        style={{
          padding: "12px 16px 24px",
          borderTop: "1px solid #E8E8E8",
          backgroundColor: "#FFFFFF",
        }}
      >
        {count > 0 ? (
          <>
            <GoldButton fullWidth onClick={() => setSent(true)}>
              Send {count} Invite{count !== 1 ? "s" : ""} →
            </GoldButton>
            <p
              style={{
                font: font(400, 12, 1.3),
                color: "#8E8E93",
                textAlign: "center",
                margin: "8px 0 0",
              }}
            >
              They'll get a link to join you on Flicks
            </p>
          </>
        ) : (
          <button
            disabled
            style={{
              width: "100%",
              padding: "16px",
              font: font(600, 16),
              borderRadius: "12px",
              backgroundColor: "#EBEBEB",
              color: "#8E8E93",
              cursor: "not-allowed",
              border: "none",
            }}
          >
            Select contacts to invite
          </button>
        )}
      </div>
    </div>
  );
}

function ContactRow({
  contact,
  selected,
  onToggle,
}: {
  contact: Contact;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        padding: "12px 16px",
        background: "transparent",
        border: "none",
        borderBottom: "1px solid #F0F0F0",
        cursor: "pointer",
        textAlign: "left",
        transition: "background-color 150ms",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: contact.avatarColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            font: `700 13px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif`,
            color: "#FFFFFF",
          }}
        >
          {contact.initials}
        </span>
      </div>
      <div style={{ flex: 1 }}>
        <p
          style={{
            font: `500 15px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif`,
            color: "#000000",
            margin: 0,
          }}
        >
          {contact.name}
        </p>
        <p
          style={{
            font: `400 13px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif`,
            color: "#8E8E93",
            margin: "2px 0 0",
          }}
        >
          {contact.phone}
        </p>
      </div>
      {/* Invite toggle */}
      {selected ? (
        <span
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            backgroundColor: "#D4A853",
            font: `600 13px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif`,
            color: "#FFFFFF",
            flexShrink: 0,
          }}
        >
          Invited
        </span>
      ) : (
        <span
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            border: "1.5px solid #D4A853",
            background: "transparent",
            font: `600 13px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif`,
            color: "#D4A853",
            flexShrink: 0,
          }}
        >
          Invite
        </span>
      )}
    </button>
  );
}
