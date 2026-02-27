import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "../../components/layout/StatusBar";
import { GoldButton } from "../../components/cinema-together/GoldButton";
import {
  MOCK_FILM,
  MOCK_SEAT_MAP,
  SEAT_ROWS,
  SEAT_COLS,
} from "../../data/mockData";
import type { Seat, SeatStatus } from "../../data/mockData";

const font = (w: number, s: number, lh = 1) =>
  `${w} ${s}px/${lh} -apple-system, system-ui, BlinkMacSystemFont, sans-serif`;

const SEAT_SIZE = 24;
const SEAT_GAP = 4;
const AISLE_GAP = 10;

function seatColor(status: SeatStatus): string {
  switch (status) {
    case "available":
      return "#E8E8E8";
    case "occupied":
      return "#C0C0C0";
    case "friend":
      return "#D4A853";
    case "suggested":
      return "rgba(212,168,83,0.25)";
    case "selected":
      return "#F23953";
  }
}

function seatBorder(status: SeatStatus): string {
  if (status === "friend") return "2px solid #D4A853";
  if (status === "suggested") return "1.5px dashed #D4A853";
  if (status === "selected") return "2px solid #F23953";
  return "none";
}

export function BookingScreen() {
  const navigate = useNavigate();
  const film = MOCK_FILM;
  const [seats, setSeats] = useState<Seat[]>(MOCK_SEAT_MAP);
  const [confirmed, setConfirmed] = useState(false);
  const [ticketCount, setTicketCount] = useState(2);

  const selectedCount = seats.filter((s) => s.status === "selected").length;
  const pricePerTicket = 19;
  const total = selectedCount * pricePerTicket;

  const toggleSeat = (row: string, col: number) => {
    setSeats((prev) =>
      prev.map((s) => {
        if (s.row !== row || s.col !== col) return s;
        if (s.status === "occupied" || s.status === "friend") return s;
        if (s.status === "selected") return { ...s, status: "suggested" };
        if (s.status === "available" || s.status === "suggested") {
          if (selectedCount >= ticketCount) return s;
          return { ...s, status: "selected" };
        }
        return s;
      })
    );
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  if (confirmed) {
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
          Booking Confirmed!
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
          {selectedCount} ticket{selectedCount !== 1 ? "s" : ""} for{" "}
          {film.title} at HOYTS Sylvia Park. You're sitting with Sarah & Tom.
        </p>
        <p
          style={{
            font: font(400, 13, 1),
            color: "#8E8E93",
            margin: "8px 0 0",
          }}
        >
          Wed 18 Feb · 1:15PM
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
          View Who's In
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
          padding: "4px 16px 8px",
          position: "relative",
        }}
      >
        <button
          onClick={() => navigate("/app/1a")}
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
          Select Seats
        </h2>
        <div style={{ width: "60px" }} />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Session summary */}
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
              src={film.posterUrl}
              alt={film.title}
              style={{
                width: "40px",
                height: "58px",
                borderRadius: "6px",
                objectFit: "cover",
                flexShrink: 0,
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div style={{ flex: 1 }}>
              <p
                style={{
                  font: font(600, 14, 1.2),
                  color: "#000000",
                  margin: 0,
                }}
              >
                {film.title}
              </p>
              <p
                style={{
                  font: font(400, 12, 1.3),
                  color: "#8E8E93",
                  margin: "2px 0 0",
                }}
              >
                1:15PM Wed · HOYTS Sylvia Park
              </p>
            </div>
            {/* Ticket count */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1.5px solid #C8C8C8",
                  background: "transparent",
                  font: font(500, 16),
                  color: "#000000",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                −
              </button>
              <span style={{ font: font(600, 14), color: "#000000" }}>
                {ticketCount}
              </span>
              <button
                onClick={() => setTicketCount(Math.min(6, ticketCount + 1))}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1.5px solid #C8C8C8",
                  background: "transparent",
                  font: font(500, 16),
                  color: "#000000",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Screen indicator */}
        <div style={{ padding: "8px 32px 16px" }}>
          <div
            style={{
              height: "3px",
              borderRadius: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, #C8C8C8 20%, #C8C8C8 80%, transparent 100%)",
            }}
          />
          <p
            style={{
              font: font(500, 10),
              color: "#8E8E93",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "2px",
              margin: "6px 0 0",
            }}
          >
            Screen
          </p>
        </div>

        {/* Seat map */}
        <div style={{ padding: "0 12px" }}>
          {SEAT_ROWS.map((row) => {
            const rowSeats = seats.filter((s) => s.row === row);
            return (
              <div
                key={row}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: `${SEAT_GAP}px`,
                  marginBottom: `${SEAT_GAP}px`,
                }}
              >
                {/* Row label */}
                <span
                  style={{
                    width: "16px",
                    font: font(500, 10),
                    color: "#C8C8C8",
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  {row}
                </span>

                {Array.from({ length: SEAT_COLS }, (_, i) => i + 1).map(
                  (col) => {
                    const seat = rowSeats.find((s) => s.col === col);
                    const isAisle = col === 4 || col === 10;

                    return (
                      <div
                        key={col}
                        style={{
                          marginLeft: isAisle ? `${AISLE_GAP}px` : 0,
                        }}
                      >
                        {seat ? (
                          <button
                            onClick={() => toggleSeat(row, col)}
                            disabled={
                              seat.status === "occupied" ||
                              seat.status === "friend"
                            }
                            style={{
                              width: `${SEAT_SIZE}px`,
                              height: `${SEAT_SIZE}px`,
                              borderRadius: "5px",
                              backgroundColor: seatColor(seat.status),
                              border: seatBorder(seat.status),
                              cursor:
                                seat.status === "occupied" ||
                                seat.status === "friend"
                                  ? "default"
                                  : "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 0,
                              transition:
                                "background-color 150ms, border 150ms",
                              animation:
                                seat.status === "suggested"
                                  ? "pulse-gold 2s infinite"
                                  : undefined,
                            }}
                          >
                            {seat.friendInitials && (
                              <span
                                style={{
                                  font: font(700, 7),
                                  color: "#FFFFFF",
                                }}
                              >
                                {seat.friendInitials}
                              </span>
                            )}
                          </button>
                        ) : (
                          <div
                            style={{
                              width: `${SEAT_SIZE}px`,
                              height: `${SEAT_SIZE}px`,
                            }}
                          />
                        )}
                      </div>
                    );
                  }
                )}

                {/* Row label right */}
                <span
                  style={{
                    width: "16px",
                    font: font(500, 10),
                    color: "#C8C8C8",
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  {row}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            padding: "16px",
            flexWrap: "wrap",
          }}
        >
          {(
            [
              ["Available", "#E8E8E8", undefined],
              ["Occupied", "#C0C0C0", undefined],
              ["Friends", "#D4A853", "2px solid #D4A853"],
              ["Suggested", "rgba(212,168,83,0.25)", "1.5px dashed #D4A853"],
              ["Selected", "#F23953", undefined],
            ] as [string, string, string | undefined][]
          ).map(([label, bg, border]) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "3px",
                  backgroundColor: bg,
                  border: border ?? "none",
                }}
              />
              <span style={{ font: font(400, 11), color: "#8E8E93" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Price summary */}
        <div
          style={{
            padding: "0 16px 8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ font: font(400, 14, 1), color: "#8E8E93" }}>
            {selectedCount > 0
              ? `${selectedCount}× Adult`
              : "Tap suggested seats to select"}
          </span>
          {selectedCount > 0 && (
            <span style={{ font: font(700, 18, 1), color: "#000000" }}>
              ${total}.00
            </span>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div
        style={{
          padding: "12px 16px 24px",
          borderTop: "1px solid #E8E8E8",
          backgroundColor: "#FFFFFF",
        }}
      >
        <GoldButton
          fullWidth
          onClick={handleConfirm}
          disabled={selectedCount === 0}
        >
          Confirm Booking{selectedCount > 0 ? ` · $${total}.00` : ""}
        </GoldButton>
      </div>

      <style>{`
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,83,0.3); }
          50% { box-shadow: 0 0 0 3px rgba(212,168,83,0.15); }
        }
      `}</style>
    </div>
  );
}
