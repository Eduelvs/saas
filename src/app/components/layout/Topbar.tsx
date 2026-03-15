import { Bell, Search, Sparkles, Wifi, WifiOff } from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { TopbarProfile } from "./TopbarProfile";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "Overview of your AI platform" },
  "/chatbot": { title: "Chatbot Configuration", subtitle: "Support Bot — v2.4.1" },
  "/messages": { title: "Messages", subtitle: "Real-time conversations" },
  "/integrations": { title: "Integrations", subtitle: "Connected channels & APIs" },
  "/settings": { title: "Settings", subtitle: "Platform configuration" },
  "/design-system": { title: "Design System", subtitle: "Tokens, components & patterns" },
};

export function Topbar() {
  const location = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);
  const [botOnline] = useState(true);

  const current = pageTitles[location.pathname] || { title: "NeuralDS", subtitle: "" };

  return (
    <header
      className="flex items-center justify-between px-6"
      style={{
        height: "var(--topbar-height)",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-subtle)",
        flexShrink: 0,
      }}
    >
      {/* Page info */}
      <div className="flex items-center gap-3">
        <div>
          <h1
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
            }}
          >
            {current.title}
          </h1>
          {current.subtitle && (
            <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", lineHeight: 1.3 }}>
              {current.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Global search */}
        <div
          className="flex items-center gap-2 rounded-[8px] px-3 transition-all"
          style={{
            background: searchFocused ? "var(--surface-elevated)" : "var(--surface)",
            border: searchFocused
              ? "1px solid var(--brand-indigo)"
              : "1px solid var(--border-default)",
            height: 36,
            width: searchFocused ? 260 : 220,
            boxShadow: searchFocused ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
            transition: "all 200ms ease-in-out",
          }}
        >
          <Search size={14} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search anything..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontSize: "0.8125rem",
              width: "100%",
            }}
          />
          <kbd
            style={{
              fontSize: "0.625rem",
              color: "var(--text-tertiary)",
              background: "var(--surface)",
              border: "1px solid var(--border-default)",
              borderRadius: 4,
              padding: "1px 5px",
              lineHeight: 1.6,
              fontFamily: "monospace",
              flexShrink: 0,
              opacity: searchFocused ? 0 : 1,
              transition: "opacity 150ms",
            }}
          >
            ⌘K
          </kbd>
        </div>

        {/* Bot status */}
        <div
          className="flex items-center gap-2 rounded-[8px] px-3"
          style={{
            background: botOnline ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
            border: `1px solid ${botOnline ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
            height: 36,
          }}
        >
          {botOnline ? (
            <Wifi size={13} style={{ color: "var(--success)" }} />
          ) : (
            <WifiOff size={13} style={{ color: "var(--error)" }} />
          )}
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              color: botOnline ? "var(--success)" : "var(--error)",
            }}
          >
            {botOnline ? "3 bots online" : "Offline"}
          </span>
          <span
            className="rounded-full pulse-dot"
            style={{
              width: 5,
              height: 5,
              background: botOnline ? "var(--success)" : "var(--error)",
              boxShadow: `0 0 6px ${botOnline ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)"}`,
            }}
          />
        </div>

        {/* AI status badge */}
        <div
          className="flex items-center gap-1.5 rounded-[8px] px-3"
          style={{
            background: "rgba(99,102,241,0.08)",
            border: "1px solid rgba(99,102,241,0.2)",
            height: 36,
          }}
        >
          <Sparkles size={12} style={{ color: "var(--brand-indigo)" }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--brand-indigo)" }}>
            AI Active
          </span>
        </div>

        {/* Notifications */}
        <button
          className="relative flex items-center justify-center rounded-[8px] transition-all"
          style={{
            width: 36,
            height: 36,
            background: "var(--surface)",
            border: "1px solid var(--border-default)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--surface-elevated)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-medium)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--surface)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-default)";
          }}
        >
          <Bell size={15} style={{ color: "var(--text-secondary)" }} />
          <span
            className="absolute rounded-full"
            style={{
              width: 7,
              height: 7,
              background: "var(--brand-indigo)",
              top: 7,
              right: 7,
              boxShadow: "0 0 6px rgba(99,102,241,0.6)",
            }}
          />
        </button>

        {/* Profile */}
        <TopbarProfile />
      </div>
    </header>
  );
}
