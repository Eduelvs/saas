import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  CheckCircle,
  Clock,
  ExternalLink,
  MessageSquare,
  MoreHorizontal,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const messageData = [
  { time: "00:00", messages: 42, resolved: 38 },
  { time: "04:00", messages: 18, resolved: 16 },
  { time: "08:00", messages: 95, resolved: 88 },
  { time: "10:00", messages: 148, resolved: 132 },
  { time: "12:00", messages: 210, resolved: 195 },
  { time: "14:00", messages: 187, resolved: 172 },
  { time: "16:00", messages: 243, resolved: 220 },
  { time: "18:00", messages: 198, resolved: 181 },
  { time: "20:00", messages: 156, resolved: 142 },
  { time: "22:00", messages: 89, resolved: 80 },
  { time: "Now", messages: 64, resolved: 58 },
];

const weeklyData = [
  { day: "Mon", value: 1240 },
  { day: "Tue", value: 1890 },
  { day: "Wed", value: 2100 },
  { day: "Thu", value: 1750 },
  { day: "Fri", value: 2340 },
  { day: "Sat", value: 980 },
  { day: "Sun", value: 760 },
];

const stats = [
  {
    label: "Total Chatbots",
    value: "12",
    sub: "+2 this month",
    trend: "up",
    icon: Bot,
    color: "#6366F1",
    bg: "rgba(99,102,241,0.1)",
  },
  {
    label: "Active Now",
    value: "3",
    sub: "Online & responding",
    trend: "neutral",
    icon: Activity,
    color: "#22C55E",
    bg: "rgba(34,197,94,0.1)",
  },
  {
    label: "Messages Today",
    value: "1,482",
    sub: "+18% vs yesterday",
    trend: "up",
    icon: MessageSquare,
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.1)",
  },
  {
    label: "Resolution Rate",
    value: "94.2%",
    sub: "-1.3% vs last week",
    trend: "down",
    icon: CheckCircle,
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.1)",
  },
];

const recentActivity = [
  {
    id: 1,
    bot: "Support Bot",
    event: "Resolved 47 tickets",
    time: "2 min ago",
    type: "success",
  },
  {
    id: 2,
    bot: "Sales Assistant",
    event: "New integration: Slack",
    time: "15 min ago",
    type: "info",
  },
  {
    id: 3,
    bot: "Support Bot",
    event: "Handoff escalation triggered",
    time: "32 min ago",
    type: "warning",
  },
  {
    id: 4,
    bot: "Onboarding Bot",
    event: "Configuration updated",
    time: "1h ago",
    type: "neutral",
  },
  {
    id: 5,
    bot: "Sales Assistant",
    event: "Webhook error: 3 failed",
    time: "2h ago",
    type: "error",
  },
];

const bots = [
  {
    name: "Support Bot",
    model: "GPT-4o",
    messages: "847",
    rate: "96%",
    status: "active",
    channels: ["WhatsApp", "Web"],
  },
  {
    name: "Sales Assistant",
    model: "Claude 3.5",
    messages: "512",
    rate: "91%",
    status: "active",
    channels: ["Slack", "API"],
  },
  {
    name: "Onboarding Bot",
    model: "GPT-4o mini",
    messages: "123",
    rate: "88%",
    status: "idle",
    channels: ["Web"],
  },
];

const typeColors: Record<string, string> = {
  success: "var(--success)",
  info: "var(--brand-indigo)",
  warning: "var(--warning)",
  error: "var(--error)",
  neutral: "var(--text-tertiary)",
};

const typeBgs: Record<string, string> = {
  success: "rgba(34,197,94,0.1)",
  info: "rgba(99,102,241,0.1)",
  warning: "rgba(245,158,11,0.1)",
  error: "rgba(239,68,68,0.1)",
  neutral: "rgba(100,116,139,0.1)",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "var(--surface-elevated)",
          border: "1px solid var(--border-medium)",
          borderRadius: 8,
          padding: "10px 14px",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: 6 }}>
          {label}
        </p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ fontSize: "0.8125rem", color: p.color, fontWeight: 500 }}>
            {p.name}: <span style={{ color: "var(--text-primary)" }}>{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  return (
    <div className="p-6 max-w-[1400px]">
      {/* Welcome header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "var(--brand-indigo)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Tuesday, March 3
            </span>
          </div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              marginBottom: 4,
            }}
          >
            <span className="gradient-brand-text">Good morning,</span>{" "}
            <span style={{ color: "var(--text-primary)" }}>Alex</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>
            Your AI platform is running smoothly. Here's today's overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="btn-secondary flex items-center gap-2"
            style={{ borderRadius: "var(--radius-md)", padding: "9px 16px" }}
          >
            <TrendingUp size={14} />
            <span>View Report</span>
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Sparkles size={14} />
            <span>New Chatbot</span>
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card-ds p-5"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="flex items-center justify-center rounded-[10px]"
                style={{
                  width: 38,
                  height: 38,
                  background: stat.bg,
                  border: `1px solid ${stat.color}25`,
                }}
              >
                <stat.icon size={18} style={{ color: stat.color }} strokeWidth={1.75} />
              </div>
              {stat.trend === "up" && (
                <span
                  className="flex items-center gap-1 rounded-full px-2 py-1"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: "var(--success)",
                  }}
                >
                  <ArrowUpRight size={10} />
                  Up
                </span>
              )}
              {stat.trend === "down" && (
                <span
                  className="flex items-center gap-1 rounded-full px-2 py-1"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: "var(--error)",
                  }}
                >
                  <ArrowDownRight size={10} />
                  Down
                </span>
              )}
            </div>
            <div>
              <p
                style={{
                  fontSize: "1.875rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: 4,
                }}
              >
                {stat.value}
              </p>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", fontWeight: 500 }}>
                {stat.label}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 4 }}>
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Messages over time */}
        <div
          className="col-span-2 card-ds p-5"
          style={{ borderRadius: "var(--radius-lg)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 style={{ color: "var(--text-primary)", fontSize: "0.9375rem", fontWeight: 600 }}>
                Message Volume
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 2 }}>
                Today's conversation flow
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "#6366F1", display: "inline-block" }} />
                Messages
              </span>
              <span className="flex items-center gap-1.5" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "#14B8A6", display: "inline-block" }} />
                Resolved
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={messageData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="time"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="messages"
                name="Messages"
                stroke="#6366F1"
                strokeWidth={2}
                fill="url(#colorMessages)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="resolved"
                name="Resolved"
                stroke="#14B8A6"
                strokeWidth={2}
                fill="url(#colorResolved)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly volume */}
        <div className="card-ds p-5" style={{ borderRadius: "var(--radius-lg)" }}>
          <div className="mb-5">
            <h3 style={{ color: "var(--text-primary)", fontSize: "0.9375rem", fontWeight: 600 }}>
              Weekly Activity
            </h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 2 }}>
              Messages per day
            </p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                name="Messages"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bots + Activity */}
      <div className="grid grid-cols-3 gap-4">
        {/* Active bots */}
        <div className="col-span-2 card-ds" style={{ borderRadius: "var(--radius-lg)" }}>
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            <h3 style={{ color: "var(--text-primary)", fontSize: "0.9375rem", fontWeight: 600 }}>
              Active Chatbots
            </h3>
            <button
              className="flex items-center gap-1.5"
              style={{
                fontSize: "0.75rem",
                color: "var(--brand-indigo)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              View all <ExternalLink size={11} />
            </button>
          </div>
          <div className="p-5 flex flex-col gap-3">
            {bots.map((bot) => (
              <div
                key={bot.name}
                className="flex items-center gap-4 p-4 rounded-[10px] transition-all cursor-pointer"
                style={{
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--border-subtle)",
                  transition: "all 150ms ease-in-out",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-medium)";
                  (e.currentTarget as HTMLElement).style.background = "var(--surface-hover)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                  (e.currentTarget as HTMLElement).style.background = "var(--surface-elevated)";
                }}
              >
                {/* Bot avatar */}
                <div
                  className="flex items-center justify-center rounded-[10px] shrink-0"
                  style={{
                    width: 40,
                    height: 40,
                    background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(59,130,246,0.2))",
                    border: "1px solid rgba(99,102,241,0.2)",
                  }}
                >
                  <Bot size={18} style={{ color: "var(--brand-indigo)" }} strokeWidth={1.75} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {bot.name}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5"
                      style={{
                        fontSize: "0.625rem",
                        fontWeight: 600,
                        background:
                          bot.status === "active" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                        color: bot.status === "active" ? "var(--success)" : "var(--warning)",
                        border: `1px solid ${bot.status === "active" ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {bot.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                      Model: {bot.model}
                    </span>
                    <span style={{ color: "var(--border-default)" }}>·</span>
                    {bot.channels.map((ch) => (
                      <span
                        key={ch}
                        className="rounded-full px-2 py-0.5"
                        style={{
                          fontSize: "0.625rem",
                          background: "rgba(99,102,241,0.08)",
                          color: "var(--text-tertiary)",
                          border: "1px solid rgba(99,102,241,0.12)",
                        }}
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        lineHeight: 1.1,
                      }}
                    >
                      {bot.messages}
                    </p>
                    <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                      messages
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--accent-teal)",
                        lineHeight: 1.1,
                      }}
                    >
                      {bot.rate}
                    </p>
                    <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                      resolved
                    </p>
                  </div>
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--text-tertiary)",
                      cursor: "pointer",
                      padding: 4,
                    }}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="card-ds" style={{ borderRadius: "var(--radius-lg)" }}>
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            <h3 style={{ color: "var(--text-primary)", fontSize: "0.9375rem", fontWeight: 600 }}>
              Activity Feed
            </h3>
            <Clock size={14} style={{ color: "var(--text-tertiary)" }} />
          </div>
          <div className="p-4 flex flex-col gap-2">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-[8px] transition-all cursor-pointer"
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "var(--surface-elevated)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "transparent")
                }
              >
                <div
                  className="flex items-center justify-center rounded-[6px] shrink-0 mt-0.5"
                  style={{
                    width: 26,
                    height: 26,
                    background: typeBgs[item.type],
                  }}
                >
                  {item.type === "success" && (
                    <CheckCircle size={12} style={{ color: typeColors[item.type] }} />
                  )}
                  {item.type === "info" && (
                    <Zap size={12} style={{ color: typeColors[item.type] }} />
                  )}
                  {item.type === "warning" && (
                    <AlertCircle size={12} style={{ color: typeColors[item.type] }} />
                  )}
                  {item.type === "error" && (
                    <AlertCircle size={12} style={{ color: typeColors[item.type] }} />
                  )}
                  {item.type === "neutral" && (
                    <Activity size={12} style={{ color: typeColors[item.type] }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-primary)",
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.event}
                  </p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", marginTop: 2 }}>
                    {item.bot} · {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
