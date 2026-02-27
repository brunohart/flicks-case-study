import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "../../components/layout/StatusBar";
import { FriendRow } from "../../components/cinema-together/FriendRow";
import { FriendAvatarStack } from "../../components/cinema-together/FriendAvatarStack";
import { BottomSheet } from "../../components/cinema-together/BottomSheet";
import { GoldButton } from "../../components/cinema-together/GoldButton";
import { MOCK_RSVP, MOCK_FILM, MOCK_CONTACTS } from "../../data/mockData";
import type { Friend } from "../../types";

const font = (w: number, s: number, lh = 1) =>
  `${w} ${s}px/${lh} -apple-system, system-ui, BlinkMacSystemFont, sans-serif`;

export function WhosInTrackerScreen() {
  const navigate = useNavigate();
  const [inviteSheetOpen, setInviteSheetOpen] = useState(false);
  const [invitedContacts, setInvitedContacts] = useState<Set<string>>(new Set());
  const [rsvpList, setRsvpList] = useState<Friend[]>(MOCK_RSVP);
  const [reminderSent, setReminderSent] = useState<Set<string>>(new Set());

  const going = rsvpList.filter((f) => f.rsvpStatus === "going");

  const handleInviteContact = (contactId: string) => {
    const contact = MOCK_CONTACTS.find((c) => c.id === contactId);
    if (!contact) return;

    setInvitedContacts((prev) => new Set(prev).add(contactId));

    const newFriend: Friend = {
      id: contact.id,
      name: contact.name,
      initials: contact.initials,
      avatarColor: contact.avatarColor,
      rsvpStatus: "invited",
    };
    setRsvpList((prev) => [...prev, newFriend]);
  };

  const handleRsvpTap = (friendId: string) => {
    const friend = rsvpList.find((f) => f.id === friendId);
    if (friend?.rsvpStatus === "invited" && !reminderSent.has(friendId)) {
      setReminderSent((prev) => new Set(prev).add(friendId));
    }
  };

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

      {/* Nav bar — Share removed */}
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
          onClick={() => navigate("/app/2b")}
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
          Who's In?
        </h2>
        <div style={{ width: "60px" }} />
      </div>

      {/* Session summary card */}
      <div style={{ padding: "0 16px", marginBottom: "16px" }}>
        <div
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #E8E8E8",
          }}
        >
          <div
            className="relative"
            style={{
              height: "80px",
              overflow: "hidden",
              backgroundColor: "#000000",
            }}
          >
            <img
              src={MOCK_FILM.posterUrl}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{
                filter: "blur(20px) brightness(0.5)",
                transform: "scale(1.2)",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.35)" }}
            />
            <div className="absolute inset-0 flex items-center px-4 gap-3">
              <img
                src={MOCK_FILM.posterUrl}
                alt={MOCK_FILM.title}
                style={{
                  width: "40px",
                  height: "60px",
                  borderRadius: "6px",
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
                    font: font(700, 18, 1.2),
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  {MOCK_FILM.title}
                </p>
                <p
                  style={{
                    font: font(400, 13, 1.3),
                    color: "rgba(255,255,255,0.75)",
                    margin: "2px 0 0",
                  }}
                >
                  1:15PM · HOYTS Sylvia Park
                </p>
                <p
                  style={{
                    font: font(400, 13, 1.3),
                    color: "rgba(255,255,255,0.6)",
                    margin: "2px 0 0",
                  }}
                >
                  {going.length} confirmed · {rsvpList.length - going.length}{" "}
                  awaiting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar row + invite */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "0 16px 12px",
        }}
      >
        <FriendAvatarStack friends={going} size={32} maxVisible={4} />
        <button
          onClick={() => setInviteSheetOpen(true)}
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            border: "1.5px solid #D4A853",
            background: "transparent",
            font: font(600, 13),
            color: "#D4A853",
            cursor: "pointer",
          }}
        >
          + Invite
        </button>
      </div>

      {/* Section label */}
      <div
        style={{
          padding: "0 16px 8px",
          borderBottom: "1px solid #E8E8E8",
        }}
      >
        <p
          style={{
            font: font(600, 11),
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "#8E8E93",
            margin: "0 0 8px",
          }}
        >
          Invited ({rsvpList.length})
        </p>
      </div>

      {/* RSVP friend list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {rsvpList.map((friend) => (
          <div key={friend.id} onClick={() => handleRsvpTap(friend.id)}>
            <FriendRow friend={friend} showRSVP />
            {/* Reminder sent indicator */}
            {reminderSent.has(friend.id) && friend.rsvpStatus === "invited" && (
              <div
                style={{
                  padding: "0 16px 8px 68px",
                  marginTop: "-4px",
                }}
              >
                <span
                  style={{
                    font: font(400, 12),
                    color: "#D4A853",
                  }}
                >
                  ✓ Reminder sent
                </span>
              </div>
            )}
          </div>
        ))}
        <div style={{ height: "32px" }} />
      </div>

      {/* Invite bottom sheet */}
      <BottomSheet
        isOpen={inviteSheetOpen}
        onClose={() => setInviteSheetOpen(false)}
      >
        <div style={{ padding: "0 16px 16px" }}>
          <h3
            style={{
              font: font(600, 17, 1),
              color: "#000000",
              margin: "0 0 16px",
            }}
          >
            Invite More Friends
          </h3>
          {MOCK_CONTACTS.slice(0, 4).map((contact) => {
            const alreadyInvited = invitedContacts.has(contact.id);
            return (
              <div
                key={contact.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 0",
                  borderBottom: "1px solid #F0F0F0",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: contact.avatarColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ font: font(700, 11), color: "#FFFFFF" }}>
                    {contact.initials}
                  </span>
                </div>
                <span
                  style={{
                    font: font(500, 15),
                    color: "#000000",
                    flex: 1,
                  }}
                >
                  {contact.name}
                </span>
                {alreadyInvited ? (
                  <span
                    style={{
                      font: font(600, 13),
                      color: "#D4A853",
                    }}
                  >
                    ✓ Invited
                  </span>
                ) : (
                  <button
                    onClick={() => handleInviteContact(contact.id)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "999px",
                      backgroundColor: "#D4A853",
                      border: "none",
                      font: font(600, 13),
                      color: "#FFFFFF",
                      cursor: "pointer",
                    }}
                  >
                    Invite
                  </button>
                )}
              </div>
            );
          })}
          <div style={{ marginTop: "16px" }}>
            <GoldButton
              fullWidth
              onClick={() => setInviteSheetOpen(false)}
            >
              Done
            </GoldButton>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
