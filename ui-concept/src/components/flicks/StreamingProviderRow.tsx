interface StreamingProvider {
  name: string;
  type: string; // "Subscription" | "Free (with ads)" | "Rental from $5.99"
  logoEmoji: string; // fallback
  logoColor: string;
}

interface StreamingProviderRowProps {
  provider: StreamingProvider;
}

export function StreamingProviderRow({ provider }: StreamingProviderRowProps) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
      }}
    >
      {/* Logo */}
      <div
        className="rounded-[10px] flex items-center justify-center text-[20px] flex-shrink-0"
        style={{
          width: "44px",
          height: "44px",
          backgroundColor: provider.logoColor,
        }}
      >
        {provider.logoEmoji}
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-[15px] font-semibold" style={{ color: "#000000" }}>
          {provider.name}
        </p>
        <p className="text-[13px]" style={{ color: "#8E8E93" }}>
          {provider.type}
        </p>
      </div>

      {/* Chevron */}
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
        <path
          d="M1 1l6 6-6 6"
          stroke="#C8C8C8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
