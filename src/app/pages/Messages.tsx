import {
  ArrowUpRight,
  Bot,
  Check,
  CheckCheck,
  Circle,
  Clock,
  Filter,
  MoreHorizontal,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Sparkles,
  User,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const conversations = [
  {
    id: 1,
    name: "Maria Oliveira",
    channel: "WhatsApp",
    lastMessage: "Obrigada, problema resolvido!",
    time: "2m",
    unread: 0,
    status: "resolved",
    botName: "Support Bot",
    avatar: "MO",
    avatarColor: "#7C3AED",
  },
  {
    id: 2,
    name: "João Silva",
    channel: "Web",
    lastMessage: "How do I reset my password?",
    time: "5m",
    unread: 3,
    status: "active",
    botName: "Support Bot",
    avatar: "JS",
    avatarColor: "#3B82F6",
  },
  {
    id: 3,
    name: "Ana Ferreira",
    channel: "API",
    lastMessage: "I need help with billing",
    time: "12m",
    unread: 1,
    status: "active",
    botName: "Sales Assistant",
    avatar: "AF",
    avatarColor: "#14B8A6",
  },
  {
    id: 4,
    name: "Carlos Mendez",
    channel: "WhatsApp",
    lastMessage: "Quando o pedido chega?",
    time: "28m",
    unread: 0,
    status: "pending",
    botName: "Support Bot",
    avatar: "CM",
    avatarColor: "#F59E0B",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    channel: "Web",
    lastMessage: "Thanks for the quick response!",
    time: "1h",
    unread: 0,
    status: "resolved",
    botName: "Sales Assistant",
    avatar: "SJ",
    avatarColor: "#6366F1",
  },
  {
    id: 6,
    name: "Lucas Pereira",
    channel: "Web",
    lastMessage: "I can't access my account",
    time: "2h",
    unread: 0,
    status: "pending",
    botName: "Onboarding Bot",
    avatar: "LP",
    avatarColor: "#EF4444",
  },
];

const initialMessages = [
  {
    id: 1,
    type: "bot",
    text: "Hi João! I'm Ava, your support assistant. How can I help you today? 👋",
    time: "14:22",
    status: "read",
  },
  {
    id: 2,
    type: "user",
    text: "Hi, I need help resetting my password",
    time: "14:23",
    status: "read",
  },
  {
    id: 3,
    type: "bot",
    text: "Of course! I can help you with that. To reset your password, I'll send a reset link to your registered email address.\n\nCould you please confirm the email associated with your account?",
    time: "14:23",
    status: "read",
  },
  {
    id: 4,
    type: "user",
    text: "joao.silva@example.com",
    time: "14:24",
    status: "read",
  },
  {
    id: 5,
    type: "bot",
    text: "Perfect! I've sent a password reset link to **joao.silva@example.com**. Please check your inbox — it should arrive within 2 minutes.\n\n⚡ If you don't see it, check your spam folder.",
    time: "14:24",
    status: "read",
  },
  {
    id: 6,
    type: "user",
    text: "How do I reset my password?",
    time: "14:31",
    status: "delivered",
  },
];

const channelColors: Record<string, string> = {
  WhatsApp: "#22C55E",
  Web: "#3B82F6",
  API: "#F59E0B",
  Slack: "#6366F1",
};

const statusColors: Record<string, string> = {
  active: "var(--success)",
  resolved: "var(--text-tertiary)",
  pending: "var(--warning)",
};

function formatMessage(text: string) {
  return text.split("\n").map((line, i) => {
    const formatted = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: formatted }} />
        {i < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
}

export function Messages() {
  const [selectedConv, setSelectedConv] = useState(conversations[1]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      type: "user" as const,
      text: input,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      status: "sent" as const,
    };
    setMessages([...messages, newMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          text: "I understand your concern. Let me look into this for you right away. Could you provide your account ID so I can pull up your details?",
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          status: "delivered",
        },
      ]);
    }, 2200);
  };

  const filtered = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full" style={{ height: "calc(100vh - var(--topbar-height))" }}>
      {/* Conversation list */}
      <div
        className="flex flex-col shrink-0"
        style={{
          width: 320,
          background: "var(--bg-secondary)",
          borderRight: "1px solid var(--border-subtle)",
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-4"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>
              Conversations
            </h3>
            <div className="flex items-center gap-2">
              <span
                className="rounded-full px-2 py-0.5"
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  background: "rgba(99,102,241,0.15)",
                  color: "var(--brand-indigo)",
                }}
              >
                {conversations.filter((c) => c.unread > 0).length} new
              </span>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-tertiary)",
                  cursor: "pointer",
                  padding: 4,
                }}
              >
                <Filter size={14} />
              </button>
            </div>
          </div>
          {/* Search */}
          <div
            className="flex items-center gap-2 rounded-[8px] px-3"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-default)",
              height: 36,
            }}
          >
            <Search size={13} style={{ color: "var(--text-tertiary)" }} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text-primary)",
                fontSize: "0.8125rem",
                flex: 1,
              }}
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-2">
          {filtered.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConv(conv)}
              className="w-full flex items-start gap-3 px-4 py-3 transition-all text-left"
              style={{
                background:
                  selectedConv.id === conv.id ? "var(--surface-elevated)" : "transparent",
                border: "none",
                borderLeft: selectedConv.id === conv.id
                  ? "3px solid var(--brand-indigo)"
                  : "3px solid transparent",
                cursor: "pointer",
                transition: "all 150ms ease-in-out",
              }}
              onMouseEnter={(e) => {
                if (selectedConv.id !== conv.id) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedConv.id !== conv.id) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }
              }}
            >
              {/* Avatar */}
              <div
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: `${conv.avatarColor}22`,
                  border: `1px solid ${conv.avatarColor}33`,
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: conv.avatarColor,
                }}
              >
                {conv.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: conv.unread > 0 ? 600 : 500,
                      color: "var(--text-primary)",
                      maxWidth: 130,
                    }}
                    className="truncate block"
                  >
                    {conv.name}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                      {conv.time}
                    </span>
                    {conv.unread > 0 && (
                      <span
                        className="flex items-center justify-center rounded-full"
                        style={{
                          width: 16,
                          height: 16,
                          background: "var(--brand-indigo)",
                          fontSize: "0.625rem",
                          fontWeight: 700,
                          color: "#fff",
                        }}
                      >
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
                <p
                  className="truncate"
                  style={{
                    fontSize: "0.75rem",
                    color: conv.unread > 0 ? "var(--text-secondary)" : "var(--text-tertiary)",
                    fontWeight: conv.unread > 0 ? 500 : 400,
                  }}
                >
                  {conv.lastMessage}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="rounded-full px-1.5 py-0.5"
                    style={{
                      fontSize: "0.5625rem",
                      fontWeight: 600,
                      background: `${channelColors[conv.channel]}18`,
                      color: channelColors[conv.channel],
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {conv.channel}
                  </span>
                  <Circle
                    size={5}
                    style={{ color: statusColors[conv.status], fill: statusColors[conv.status] }}
                  />
                  <span style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                    {conv.status}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Chat header */}
        <div
          className="flex items-center justify-between px-5 py-3.5 shrink-0"
          style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 38,
                height: 38,
                background: `${selectedConv.avatarColor}22`,
                border: `1px solid ${selectedConv.avatarColor}33`,
                fontSize: "0.75rem",
                fontWeight: 700,
                color: selectedConv.avatarColor,
              }}
            >
              {selectedConv.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {selectedConv.name}
                </h3>
                <span
                  className="rounded-full px-2 py-0.5"
                  style={{
                    fontSize: "0.5625rem",
                    fontWeight: 600,
                    background: `${channelColors[selectedConv.channel]}18`,
                    color: channelColors[selectedConv.channel],
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {selectedConv.channel}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="rounded-full pulse-dot"
                  style={{
                    width: 5,
                    height: 5,
                    background:
                      selectedConv.status === "active" ? "var(--success)" : "var(--text-tertiary)",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                  {selectedConv.status === "active" ? "Active conversation" : "Resolved"}
                </span>
                <span style={{ color: "var(--border-medium)" }}>·</span>
                <Bot size={11} style={{ color: "var(--brand-indigo)" }} />
                <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                  {selectedConv.botName}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 rounded-[8px] px-3 py-2 transition-all"
              style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                color: "var(--success)",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              <ArrowUpRight size={12} />
              Escalate
            </button>
            <button
              className="flex items-center justify-center rounded-[8px] transition-all"
              style={{
                width: 34,
                height: 34,
                background: "var(--surface)",
                border: "1px solid var(--border-default)",
                cursor: "pointer",
              }}
            >
              <Phone size={14} style={{ color: "var(--text-secondary)" }} />
            </button>
            <button
              className="flex items-center justify-center rounded-[8px] transition-all"
              style={{
                width: 34,
                height: 34,
                background: "var(--surface)",
                border: "1px solid var(--border-default)",
                cursor: "pointer",
              }}
            >
              <MoreHorizontal size={14} style={{ color: "var(--text-secondary)" }} />
            </button>
          </div>
        </div>

        {/* AI status bar */}
        <div
          className="flex items-center gap-3 px-5 py-2.5"
          style={{
            background: "linear-gradient(90deg, rgba(99,102,241,0.06) 0%, transparent 100%)",
            borderBottom: "1px solid rgba(99,102,241,0.1)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <Sparkles size={12} style={{ color: "var(--brand-indigo)" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--brand-indigo)", fontWeight: 500 }}>
              AI Autopilot
            </span>
          </div>
          <span style={{ color: "var(--border-medium)" }}>·</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
            GPT-4o · Support Bot
          </span>
          <span style={{ color: "var(--border-medium)" }}>·</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
            Sentiment: <span style={{ color: "var(--success)", fontWeight: 500 }}>Neutral</span>
          </span>
          <span style={{ color: "var(--border-medium)" }}>·</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
            Intent: <span style={{ color: "var(--accent-cyan)", fontWeight: 500 }}>Password Reset</span>
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: 28,
                  height: 28,
                  background:
                    msg.type === "bot"
                      ? "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(59,130,246,0.25))"
                      : `${selectedConv.avatarColor}22`,
                  border:
                    msg.type === "bot"
                      ? "1px solid rgba(99,102,241,0.3)"
                      : `1px solid ${selectedConv.avatarColor}33`,
                  flexShrink: 0,
                }}
              >
                {msg.type === "bot" ? (
                  <Bot size={12} style={{ color: "var(--brand-indigo)" }} strokeWidth={1.75} />
                ) : (
                  <User size={12} style={{ color: selectedConv.avatarColor }} strokeWidth={1.75} />
                )}
              </div>

              {/* Bubble */}
              <div
                className="rounded-[12px] px-4 py-3"
                style={{
                  maxWidth: "65%",
                  background:
                    msg.type === "bot"
                      ? "var(--surface-elevated)"
                      : "linear-gradient(135deg, #7C3AED 0%, #6366F1 60%, #3B82F6 100%)",
                  border: msg.type === "bot" ? "1px solid var(--border-default)" : "none",
                  boxShadow:
                    msg.type === "user"
                      ? "0 2px 12px rgba(99,102,241,0.3)"
                      : "var(--shadow-xs)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-primary)",
                    lineHeight: 1.55,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {formatMessage(msg.text)}
                </p>
                <div
                  className="flex items-center gap-1 mt-1.5"
                  style={{ justifyContent: msg.type === "user" ? "flex-end" : "flex-start" }}
                >
                  <span
                    style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1 }}
                  >
                    {msg.time}
                  </span>
                  {msg.type === "user" && (
                    <span>
                      {msg.status === "read" ? (
                        <CheckCheck size={11} style={{ color: "rgba(255,255,255,0.6)" }} />
                      ) : msg.status === "delivered" ? (
                        <CheckCheck size={11} style={{ color: "rgba(255,255,255,0.4)" }} />
                      ) : (
                        <Check size={11} style={{ color: "rgba(255,255,255,0.4)" }} />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-2.5">
              <div
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: 28,
                  height: 28,
                  background: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(59,130,246,0.25))",
                  border: "1px solid rgba(99,102,241,0.3)",
                }}
              >
                <Bot size={12} style={{ color: "var(--brand-indigo)" }} strokeWidth={1.75} />
              </div>
              <div
                className="flex items-center gap-1.5 rounded-[12px] px-4 py-3"
                style={{
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div
          className="px-5 py-4 shrink-0"
          style={{
            background: "var(--bg-secondary)",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <div
            className="flex items-end gap-3 rounded-[12px] px-4 py-3"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-default)",
              transition: "border-color 200ms",
            }}
          >
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-tertiary)",
                cursor: "pointer",
                padding: "2px",
                flexShrink: 0,
              }}
            >
              <Paperclip size={16} />
            </button>

            <textarea
              placeholder="Type a message... (Enter to send)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text-primary)",
                fontSize: "0.875rem",
                resize: "none",
                lineHeight: 1.5,
                maxHeight: 100,
                fontFamily: "var(--font-family)",
              }}
            />

            <div className="flex items-center gap-2 shrink-0">
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-tertiary)",
                  cursor: "pointer",
                  padding: "2px",
                }}
              >
                <Smile size={16} />
              </button>
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="flex items-center justify-center rounded-[8px] transition-all"
                style={{
                  width: 32,
                  height: 32,
                  background: input.trim()
                    ? "linear-gradient(135deg, #7C3AED, #3B82F6)"
                    : "var(--surface-elevated)",
                  border: input.trim() ? "none" : "1px solid var(--border-default)",
                  cursor: input.trim() ? "pointer" : "not-allowed",
                  boxShadow: input.trim() ? "0 2px 8px rgba(99,102,241,0.3)" : "none",
                  transition: "all 200ms ease-in-out",
                }}
              >
                <Send
                  size={13}
                  style={{ color: input.trim() ? "#fff" : "var(--text-tertiary)" }}
                />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 px-1">
            <Clock size={11} style={{ color: "var(--text-tertiary)" }} />
            <span style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
              AI is responding automatically · Avg 1.2s response time
            </span>
          </div>
        </div>
      </div>

      {/* Right panel: conversation info */}
      <div
        className="shrink-0 flex flex-col"
        style={{
          width: 260,
          background: "var(--bg-secondary)",
          borderLeft: "1px solid var(--border-subtle)",
        }}
      >
        <div
          className="px-4 py-4"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <h4 style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            User Info
          </h4>
        </div>
        <div className="p-4 flex flex-col gap-4">
          {/* Avatar + name */}
          <div className="flex flex-col items-center text-center">
            <div
              className="flex items-center justify-center rounded-full mb-3"
              style={{
                width: 56,
                height: 56,
                background: `${selectedConv.avatarColor}22`,
                border: `2px solid ${selectedConv.avatarColor}44`,
                fontSize: "1rem",
                fontWeight: 700,
                color: selectedConv.avatarColor,
              }}
            >
              {selectedConv.avatar}
            </div>
            <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>
              {selectedConv.name}
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
              via {selectedConv.channel}
            </p>
          </div>

          {/* Stats */}
          <div
            className="rounded-[8px] p-3"
            style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}
          >
            {[
              { label: "Sessions", value: "14" },
              { label: "Avg. Duration", value: "4m 22s" },
              { label: "Satisfaction", value: "4.8/5" },
              { label: "First seen", value: "Jan 2025" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-1.5"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-primary)" }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-tertiary)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Pro User", "Priority", "Password Issue"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2 py-1"
                  style={{
                    fontSize: "0.6875rem",
                    background: "var(--surface-elevated)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-default)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}