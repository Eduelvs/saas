import { useState } from "react";
import {
  MessageCircle,
  Globe,
  Code2,
  Slack,
  Bot,
  Check,
  Plus,
  Settings,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  Zap,
  Copy,
  Eye,
  EyeOff,
  Webhook,
} from "lucide-react";

const integrations = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Connect your WhatsApp Business number to handle conversations at scale",
    icon: MessageCircle,
    color: "#22C55E",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.2)",
    status: "connected",
    bots: 2,
    messages: "847 today",
    badge: "Official API",
  },
  {
    id: "web",
    name: "Web Widget",
    description: "Embed an AI chat widget on any website with a simple code snippet",
    icon: Globe,
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
    status: "connected",
    bots: 3,
    messages: "1,203 today",
    badge: "JavaScript",
  },
  {
    id: "api",
    name: "REST API",
    description: "Build custom integrations using our fully documented REST API",
    icon: Code2,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    status: "connected",
    bots: 1,
    messages: "312 today",
    badge: "v2.1",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Deploy your chatbot directly inside Slack channels and DMs",
    icon: Slack,
    color: "#6366F1",
    bg: "rgba(99,102,241,0.1)",
    border: "rgba(99,102,241,0.2)",
    status: "connected",
    bots: 1,
    messages: "89 today",
    badge: "App",
  },
  {
    id: "telegram",
    name: "Telegram",
    description: "Create a Telegram bot that responds with AI-powered conversations",
    icon: Bot,
    color: "#22D3EE",
    bg: "rgba(34,211,238,0.1)",
    border: "rgba(34,211,238,0.2)",
    status: "not_connected",
    bots: 0,
    messages: "--",
    badge: "Bot API",
  },
  {
    id: "webhook",
    name: "Webhooks",
    description: "Receive real-time event notifications via HTTP POST to your endpoints",
    icon: Webhook,
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.1)",
    border: "rgba(20,184,166,0.2)",
    status: "not_connected",
    bots: 0,
    messages: "--",
    badge: "Events",
  },
];

const webhookEvents = [
  { event: "conversation.started", desc: "New conversation created", enabled: true },
  { event: "message.received", desc: "User sent a message", enabled: true },
  { event: "message.sent", desc: "Bot sent a response", enabled: false },
  { event: "conversation.resolved", desc: "Conversation marked as resolved", enabled: true },
  { event: "handoff.triggered", desc: "Escalation to human agent", enabled: true },
  { event: "intent.detected", desc: "AI identified user intent", enabled: false },
];

function ApiKeyField({ label, value }: { label: string; value: string }) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.8125rem",
          fontWeight: 500,
          color: "var(--text-secondary)",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <div
        className="flex items-center gap-2 rounded-[8px] px-3"
        style={{
          background: "var(--surface-elevated)",
          border: "1px solid var(--border-default)",
          height: 40,
        }}
      >
        <code
          style={{
            flex: 1,
            fontSize: "0.8125rem",
            color: "var(--text-primary)",
            fontFamily: "monospace",
          }}
        >
          {visible ? value : "•".repeat(32)}
        </code>
        <button
          onClick={() => setVisible(!visible)}
          style={{ background: "transparent", border: "none", color: "var(--text-tertiary)", cursor: "pointer" }}
        >
          {visible ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
        <button
          onClick={copy}
          style={{ background: "transparent", border: "none", color: copied ? "var(--success)" : "var(--text-tertiary)", cursor: "pointer" }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}

export function Integrations() {
  const [selectedChannel, setSelectedChannel] = useState(integrations[0]);
  const [webhooks, setWebhooks] = useState(webhookEvents);

  const toggleWebhook = (idx: number) => {
    setWebhooks(webhooks.map((w, i) => (i === idx ? { ...w, enabled: !w.enabled } : w)));
  };

  return (
    <div className="p-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              marginBottom: 4,
            }}
          >
            Integrations
          </h1>
          <p style={{ color: "var(--text-tertiary)", fontSize: "0.9375rem" }}>
            Connect your chatbots to the channels where your customers are
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={14} />
          Add Integration
        </button>
      </div>

      {/* Stats bar */}
      <div
        className="flex items-center gap-6 p-4 rounded-[12px] mb-6"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(59,130,246,0.05) 100%)",
          border: "1px solid rgba(99,102,241,0.15)",
        }}
      >
        {[
          { label: "Active Channels", value: "4", color: "var(--success)" },
          { label: "Total Messages Today", value: "2,451", color: "var(--brand-indigo)" },
          { label: "Avg Response Time", value: "1.2s", color: "var(--accent-teal)" },
          { label: "API Uptime", value: "99.98%", color: "var(--warning)" },
        ].map((stat, idx, arr) => (
          <div key={stat.label} className="flex items-center gap-3">
            <div>
              <p
                style={{
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: stat.color,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{stat.label}</p>
            </div>
            {idx < arr.length - 1 && (
              <div style={{ width: 1, height: 36, background: "var(--border-subtle)" }} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Integration cards */}
        <div className="col-span-2">
          <h3
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              marginBottom: 12,
            }}
          >
            Available Channels
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                onClick={() => setSelectedChannel(integration)}
                className="p-4 rounded-[12px] cursor-pointer transition-all"
                style={{
                  background:
                    selectedChannel.id === integration.id
                      ? `linear-gradient(135deg, ${integration.bg}, rgba(0,0,0,0))`
                      : "var(--surface)",
                  border:
                    selectedChannel.id === integration.id
                      ? `1px solid ${integration.border}`
                      : "1px solid var(--border-default)",
                  boxShadow:
                    selectedChannel.id === integration.id
                      ? `0 0 20px ${integration.color}12`
                      : "none",
                  transition: "all 200ms ease-in-out",
                }}
                onMouseEnter={(e) => {
                  if (selectedChannel.id !== integration.id) {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-medium)";
                    (e.currentTarget as HTMLElement).style.background = "var(--surface-elevated)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedChannel.id !== integration.id) {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-default)";
                    (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                  }
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="flex items-center justify-center rounded-[10px]"
                    style={{
                      width: 40,
                      height: 40,
                      background: integration.bg,
                      border: `1px solid ${integration.border}`,
                    }}
                  >
                    <integration.icon
                      size={18}
                      style={{ color: integration.color }}
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full px-2 py-0.5"
                      style={{
                        fontSize: "0.5625rem",
                        fontWeight: 600,
                        background:
                          integration.status === "connected"
                            ? "rgba(34,197,94,0.1)"
                            : "rgba(100,116,139,0.1)",
                        color:
                          integration.status === "connected"
                            ? "var(--success)"
                            : "var(--text-tertiary)",
                        border: `1px solid ${integration.status === "connected" ? "rgba(34,197,94,0.2)" : "rgba(100,116,139,0.15)"}`,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {integration.status === "connected" ? "● Live" : "○ Inactive"}
                    </span>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {integration.name}
                    </h4>
                    <span
                      className="rounded px-1.5"
                      style={{
                        fontSize: "0.5625rem",
                        fontWeight: 600,
                        background: `${integration.color}18`,
                        color: integration.color,
                        padding: "1px 5px",
                      }}
                    >
                      {integration.badge}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-tertiary)",
                      lineHeight: 1.4,
                    }}
                  >
                    {integration.description}
                  </p>
                </div>

                {integration.status === "connected" && (
                  <div
                    className="flex items-center justify-between pt-3 mt-3"
                    style={{ borderTop: "1px solid var(--border-subtle)" }}
                  >
                    <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                      {integration.bots} bot{integration.bots !== 1 ? "s" : ""}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                      {integration.messages}
                    </span>
                  </div>
                )}

                {integration.status === "not_connected" && (
                  <button
                    className="w-full flex items-center justify-center gap-1.5 rounded-[6px] py-2 mt-3 transition-all"
                    style={{
                      background: `${integration.color}12`,
                      border: `1px dashed ${integration.color}40`,
                      color: integration.color,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <Plus size={12} />
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div>
          <h3
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              marginBottom: 12,
            }}
          >
            Configuration
          </h3>

          <div
            className="rounded-[12px] overflow-hidden"
            style={{ background: "var(--surface)", border: "1px solid var(--border-default)" }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 p-4"
              style={{
                background: `linear-gradient(135deg, ${selectedChannel.bg}, transparent)`,
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <div
                className="flex items-center justify-center rounded-[8px]"
                style={{
                  width: 32,
                  height: 32,
                  background: selectedChannel.bg,
                  border: `1px solid ${selectedChannel.border}`,
                }}
              >
                <selectedChannel.icon
                  size={15}
                  style={{ color: selectedChannel.color }}
                  strokeWidth={1.75}
                />
              </div>
              <div className="flex-1">
                <h4
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {selectedChannel.name}
                </h4>
                <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                  {selectedChannel.badge}
                </p>
              </div>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-tertiary)",
                  cursor: "pointer",
                }}
              >
                <Settings size={14} />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-4">
              {selectedChannel.status === "connected" ? (
                <>
                  {/* Status */}
                  <div
                    className="flex items-center gap-2 rounded-[8px] p-3"
                    style={{
                      background: "rgba(34,197,94,0.06)",
                      border: "1px solid rgba(34,197,94,0.15)",
                    }}
                  >
                    <Check size={13} style={{ color: "var(--success)" }} />
                    <span style={{ fontSize: "0.8125rem", color: "var(--success)", fontWeight: 500 }}>
                      Connected & Active
                    </span>
                    <button
                      className="ml-auto"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--text-tertiary)",
                        cursor: "pointer",
                      }}
                    >
                      <RefreshCw size={12} />
                    </button>
                  </div>

                  {/* API Keys */}
                  <ApiKeyField
                    label="API Key"
                    value="sk-nd-live-4xK9mP2jL8nQ7rT3vY1wX6"
                  />
                  <ApiKeyField
                    label="Webhook Secret"
                    value="whsec-f8a3c2e9b7d4k1m5n0p6r2"
                  />

                  {/* Assigned bots */}
                  <div>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        color: "var(--text-secondary)",
                        marginBottom: 8,
                      }}
                    >
                      Assigned Bots
                    </p>
                    <div className="flex flex-col gap-2">
                      {["Support Bot", "Sales Assistant"].slice(0, selectedChannel.bots).map((bot) => (
                        <div
                          key={bot}
                          className="flex items-center gap-2 rounded-[6px] px-3 py-2"
                          style={{
                            background: "var(--surface-elevated)",
                            border: "1px solid var(--border-subtle)",
                          }}
                        >
                          <div
                            className="rounded-[6px] flex items-center justify-center"
                            style={{
                              width: 22,
                              height: 22,
                              background: "rgba(99,102,241,0.15)",
                            }}
                          >
                            <Bot size={11} style={{ color: "var(--brand-indigo)" }} />
                          </div>
                          <span style={{ fontSize: "0.8125rem", color: "var(--text-primary)", flex: 1 }}>
                            {bot}
                          </span>
                          <span
                            className="rounded-full"
                            style={{
                              width: 6,
                              height: 6,
                              background: "var(--success)",
                              display: "block",
                              boxShadow: "0 0 6px rgba(34,197,94,0.5)",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-[8px] py-2 transition-all"
                      style={{
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border-default)",
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                        fontSize: "0.8125rem",
                      }}
                    >
                      <ExternalLink size={12} />
                      Docs
                    </button>
                    <button className="flex-1 btn-primary" style={{ padding: "8px 12px", fontSize: "0.8125rem" }}>
                      Manage
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div
                    className="flex items-center justify-center rounded-full mx-auto mb-3"
                    style={{
                      width: 48,
                      height: 48,
                      background: selectedChannel.bg,
                      border: `1px solid ${selectedChannel.border}`,
                    }}
                  >
                    <selectedChannel.icon
                      size={22}
                      style={{ color: selectedChannel.color }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
                    Not connected
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", marginBottom: 16, lineHeight: 1.5 }}>
                    {selectedChannel.description}
                  </p>
                  <button
                    className="btn-primary w-full flex items-center justify-center gap-2"
                    style={{ padding: "10px 16px" }}
                  >
                    <Zap size={13} />
                    Setup {selectedChannel.name}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Webhooks */}
          {selectedChannel.id === "api" && (
            <div
              className="mt-4 rounded-[12px] overflow-hidden"
              style={{ background: "var(--surface)", border: "1px solid var(--border-default)" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <Webhook size={13} style={{ color: "var(--accent-teal)" }} />
                <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  Event Webhooks
                </h4>
              </div>
              <div className="p-3 flex flex-col gap-1">
                {webhooks.map((wh, i) => (
                  <div
                    key={wh.event}
                    className="flex items-center justify-between rounded-[6px] px-3 py-2 transition-all"
                    style={{ background: "var(--surface-elevated)" }}
                  >
                    <div>
                      <code style={{ fontSize: "0.6875rem", color: "var(--accent-teal)", display: "block" }}>
                        {wh.event}
                      </code>
                      <span style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                        {wh.desc}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleWebhook(i)}
                      className="rounded-full transition-all shrink-0 ml-3"
                      style={{
                        width: 30,
                        height: 17,
                        background: wh.enabled
                          ? "linear-gradient(135deg, #7C3AED, #3B82F6)"
                          : "var(--surface)",
                        border: wh.enabled ? "none" : "1px solid var(--border-medium)",
                        position: "relative",
                        cursor: "pointer",
                        transition: "all 200ms ease-in-out",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: wh.enabled ? 2 : 2,
                          left: wh.enabled ? 15 : 2,
                          width: 13,
                          height: 13,
                          borderRadius: "50%",
                          background: "#fff",
                          transition: "all 200ms ease-in-out",
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}