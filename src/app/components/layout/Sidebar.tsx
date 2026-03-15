import { NavLink, useLocation } from "react-router";
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  Zap,
  Settings,
  Palette,
  ChevronDown,
  ChevronRight,
  Plus,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Bot, label: "Chatbots", path: "/chatbot" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Zap, label: "Integrations", path: "/integrations" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: Palette, label: "Design System", path: "/design-system" },
];

const bots = [
  { name: "Support Bot", status: "active", color: "#22C55E" },
  { name: "Sales Assistant", status: "active", color: "#22C55E" },
  { name: "Onboarding Bot", status: "idle", color: "#F59E0B" },
];

export function Sidebar() {
  const location = useLocation();
  const [botsExpanded, setBotsExpanded] = useState(true);

  return (
    <aside
      className="flex flex-col h-full"
      style={{
        width: "var(--sidebar-width)",
        background: "var(--sidebar)",
        borderRight: "1px solid var(--border-subtle)",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5"
        style={{ height: "var(--topbar-height)", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div
          className="flex items-center justify-center rounded-[10px] shrink-0"
          style={{
            width: 32,
            height: 32,
            background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 60%, #3B82F6 100%)",
            boxShadow: "0 0 16px rgba(99,102,241,0.3)",
          }}
        >
          <Sparkles size={16} color="#ffffff" strokeWidth={2} />
        </div>
        <div>
          <span
            className="block"
            style={{
              fontWeight: 600,
              fontSize: "0.9375rem",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            NeuralDS
          </span>
          <span
            style={{
              fontSize: "0.6875rem",
              color: "var(--text-tertiary)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Platform
          </span>
        </div>
      </div>

      {/* Scrollable nav */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {/* Main nav */}
        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive =
              path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
            return (
              <NavLink
                key={path}
                to={path}
                className="relative flex items-center gap-3 rounded-[8px] px-3 py-2 group transition-all"
                style={{
                  background: isActive ? "var(--surface-elevated)" : "transparent",
                  color: isActive ? "var(--text-primary)" : "var(--text-tertiary)",
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 500 : 400,
                  transition: "all 150ms ease-in-out",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
                  }
                }}
              >
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 3,
                      height: 18,
                      borderRadius: "0 2px 2px 0",
                      background: "linear-gradient(180deg, #7C3AED, #3B82F6)",
                    }}
                  />
                )}
                <Icon
                  size={16}
                  strokeWidth={isActive ? 2 : 1.75}
                  style={{
                    color: isActive ? "var(--brand-indigo)" : "var(--text-tertiary)",
                    flexShrink: 0,
                    transition: "color 150ms ease-in-out",
                  }}
                />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Divider */}
        <div
          className="my-4 mx-1"
          style={{ height: 1, background: "var(--border-subtle)" }}
        />

        {/* Active Bots section */}
        <div>
          <button
            onClick={() => setBotsExpanded(!botsExpanded)}
            className="flex items-center justify-between w-full px-3 py-1.5 rounded-[6px] mb-1 transition-all"
            style={{
              color: "var(--text-tertiary)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              background: "transparent",
              border: "none",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)")
            }
          >
            <span>Active Bots</span>
            {botsExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </button>

          {botsExpanded && (
            <div className="flex flex-col gap-0.5">
              {bots.map((bot) => (
                <NavLink
                  key={bot.name}
                  to="/chatbot"
                  className="flex items-center gap-2.5 rounded-[8px] px-3 py-2 transition-all"
                  style={{
                    color: "var(--text-tertiary)",
                    fontSize: "0.8125rem",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
                  }}
                >
                  <span
                    className="shrink-0 rounded-full pulse-dot"
                    style={{
                      width: 6,
                      height: 6,
                      background: bot.color,
                      boxShadow: `0 0 6px ${bot.color}80`,
                    }}
                  />
                  <span className="truncate">{bot.name}</span>
                </NavLink>
              ))}

              <button
                className="flex items-center gap-2.5 rounded-[8px] px-3 py-2 w-full transition-all mt-0.5"
                style={{
                  color: "var(--text-tertiary)",
                  fontSize: "0.8125rem",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.color = "var(--brand-indigo)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
                }}
              >
                <Plus
                  size={14}
                  style={{ border: "1px dashed currentColor", borderRadius: 4, padding: 1 }}
                />
                <span>New Chatbot</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="px-3 py-4"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        {bottomItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname.startsWith(path);
          return (
            <NavLink
              key={path}
              to={path}
              className="relative flex items-center gap-3 rounded-[8px] px-3 py-2 mb-0.5 transition-all"
              style={{
                background: isActive ? "var(--surface-elevated)" : "transparent",
                color: isActive ? "var(--text-primary)" : "var(--text-tertiary)",
                fontSize: "0.875rem",
                fontWeight: isActive ? 500 : 400,
                textDecoration: "none",
                transition: "all 150ms ease-in-out",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
                }
              }}
            >
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 3,
                    height: 18,
                    borderRadius: "0 2px 2px 0",
                    background: "linear-gradient(180deg, #7C3AED, #3B82F6)",
                  }}
                />
              )}
              <Icon
                size={16}
                strokeWidth={isActive ? 2 : 1.75}
                style={{ color: isActive ? "var(--brand-indigo)" : "var(--text-tertiary)", flexShrink: 0 }}
              />
              <span>{label}</span>
            </NavLink>
          );
        })}

        {/* User profile */}
        <div
          className="flex items-center gap-3 rounded-[8px] px-3 py-2 mt-2 cursor-pointer transition-all"
          style={{
            background: "var(--surface-elevated)",
            border: "1px solid var(--border-subtle)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--surface-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--surface-elevated)";
          }}
        >
          <div
            className="shrink-0 rounded-full flex items-center justify-center"
            style={{
              width: 28,
              height: 28,
              background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "#fff",
            }}
          >
            AC
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="truncate"
              style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.3 }}
            >
              Alex Costa
            </p>
            <p
              className="truncate"
              style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", lineHeight: 1.3 }}
            >
              Pro Plan
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
