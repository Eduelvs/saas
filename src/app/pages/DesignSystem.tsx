import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CheckCheck,
  ChevronDown,
  Loader2,
  MessageSquare,
  Send,
  Sparkles,
  TrendingUp,
  Zap
} from "lucide-react";
import React, { useState } from "react";

// ── Section wrapper ──────────────────────────────────────
function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="mb-12">
      <div className="mb-5">
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: 4,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)" }}>{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function ShowcaseBlock({
  label,
  children,
  dark = true,
}: {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className="rounded-[12px] overflow-hidden"
      style={{ border: "1px solid var(--border-default)" }}
    >
      <div
        className="px-4 py-2.5"
        style={{
          background: "var(--surface-elevated)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <span
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
          }}
        >
          {label}
        </span>
      </div>
      <div
        className="p-6 flex flex-wrap items-center gap-4"
        style={{
          background: dark ? "var(--surface)" : "var(--bg-primary)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function TokenChip({ name, value, color }: { name: string; value: string; color?: string }) {
  return (
    <div
      className="flex items-center gap-3 rounded-[8px] px-3 py-2.5"
      style={{
        background: "var(--surface-elevated)",
        border: "1px solid var(--border-subtle)",
        minWidth: 200,
      }}
    >
      {color && (
        <div
          className="rounded-[4px] shrink-0"
          style={{
            width: 20,
            height: 20,
            background: color,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
      )}
      <div>
        <code
          style={{
            fontSize: "0.6875rem",
            color: "var(--accent-teal)",
            display: "block",
            lineHeight: 1.3,
          }}
        >
          {name}
        </code>
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
            lineHeight: 1.3,
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

// ── Button component ──────────────────────────────────────
function DSButton({
  variant = "primary",
  size = "md",
  children,
  icon,
  loading = false,
  disabled = false,
}: {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "teal";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}) {
  const sizeStyles: Record<string, { padding: string; fontSize: string; height: string }> = {
    sm: { padding: "6px 12px", fontSize: "0.75rem", height: "30px" },
    md: { padding: "10px 18px", fontSize: "0.875rem", height: "38px" },
    lg: { padding: "12px 24px", fontSize: "0.9375rem", height: "44px" },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: disabled
        ? "rgba(99,102,241,0.2)"
        : "linear-gradient(135deg, #7C3AED 0%, #6366F1 60%, #3B82F6 100%)",
      color: disabled ? "rgba(255,255,255,0.4)" : "#ffffff",
      border: "none",
      boxShadow: disabled ? "none" : "0 2px 8px rgba(99,102,241,0.3)",
    },
    secondary: {
      background: "var(--surface-elevated)",
      color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
      border: "1px solid var(--border-default)",
    },
    ghost: {
      background: "transparent",
      color: disabled ? "var(--text-disabled)" : "var(--text-secondary)",
      border: "none",
    },
    danger: {
      background: disabled ? "rgba(239,68,68,0.1)" : "rgba(239,68,68,0.12)",
      color: disabled ? "rgba(239,68,68,0.4)" : "var(--error)",
      border: "1px solid rgba(239,68,68,0.25)",
    },
    teal: {
      background: "rgba(20,184,166,0.1)",
      color: "var(--accent-teal)",
      border: "1px solid rgba(20,184,166,0.25)",
    },
  };

  const { padding, fontSize, height } = sizeStyles[size];

  return (
    <button
      disabled={disabled || loading}
      className="flex items-center justify-center gap-2 rounded-[8px] font-medium transition-all"
      style={{
        padding,
        fontSize,
        height,
        ...variantStyles[variant],
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        fontFamily: "var(--font-family)",
        transition: "all 200ms ease-in-out",
      }}
    >
      {loading ? <Loader2 size={13} className="animate-spin" /> : icon}
      {children}
    </button>
  );
}

// ── Badge / Tag ──────────────────────────────────────
function DSBadge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "purple" | "teal";
}) {
  const variantStyles: Record<string, React.CSSProperties> = {
    default: { background: "var(--surface-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border-default)" },
    success: { background: "rgba(34,197,94,0.1)", color: "var(--success)", border: "1px solid rgba(34,197,94,0.25)" },
    warning: { background: "rgba(245,158,11,0.1)", color: "var(--warning)", border: "1px solid rgba(245,158,11,0.25)" },
    error: { background: "rgba(239,68,68,0.1)", color: "var(--error)", border: "1px solid rgba(239,68,68,0.25)" },
    info: { background: "rgba(59,130,246,0.1)", color: "var(--brand-blue)", border: "1px solid rgba(59,130,246,0.25)" },
    purple: { background: "rgba(124,58,237,0.12)", color: "var(--brand-purple)", border: "1px solid rgba(124,58,237,0.25)" },
    teal: { background: "rgba(20,184,166,0.1)", color: "var(--accent-teal)", border: "1px solid rgba(20,184,166,0.25)" },
  };
  return (
    <span
      className="rounded-full px-2.5 py-1 inline-flex items-center gap-1"
      style={{ fontSize: "0.6875rem", fontWeight: 600, ...variantStyles[variant] }}
    >
      {children}
    </span>
  );
}

// ── Input DS ──────────────────────────────────────
function DSInput({
  label,
  placeholder,
  type = "text",
  error,
  success,
}: {
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
  success?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ minWidth: 240 }}>
      {label && (
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
      )}
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: "var(--surface-elevated)",
          border: `1px solid ${
            error ? "var(--error)" : success ? "var(--success)" : focused ? "var(--brand-indigo)" : "var(--border-default)"
          }`,
          borderRadius: "var(--radius-md)",
          color: "var(--text-primary)",
          padding: "10px 14px",
          fontSize: "0.875rem",
          outline: "none",
          boxShadow: focused
            ? error
              ? "0 0 0 3px rgba(239,68,68,0.12)"
              : "0 0 0 3px rgba(99,102,241,0.12)"
            : "none",
          transition: "all 200ms ease-in-out",
          fontFamily: "var(--font-family)",
        }}
      />
      {error && (
        <p style={{ fontSize: "0.75rem", color: "var(--error)", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
          <AlertCircle size={11} /> {error}
        </p>
      )}
      {success && (
        <p style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
          <Check size={11} /> {success}
        </p>
      )}
    </div>
  );
}

// ── Card DS ──────────────────────────────────────
function DSCard({
  variant = "default",
  title,
  subtitle,
  value,
  icon,
  color,
  children,
}: {
  variant?: "default" | "analytics" | "feature" | "chatbot";
  title: string;
  subtitle?: string;
  value?: string;
  icon?: React.ReactNode;
  color?: string;
  children?: React.ReactNode;
}) {
  if (variant === "analytics") {
    return (
      <div
        className="card-ds p-5"
        style={{ minWidth: 200, borderRadius: "var(--radius-lg)" }}
      >
        <div className="flex items-start justify-between mb-3">
          <div
            className="rounded-[10px] flex items-center justify-center"
            style={{ width: 36, height: 36, background: `${color}18`, border: `1px solid ${color}25` }}
          >
            <span style={{ color }}>{icon}</span>
          </div>
          <TrendingUp size={14} style={{ color: "var(--success)" }} />
        </div>
        <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          {value}
        </p>
        <p style={{ fontSize: "0.8125rem", color: "var(--text-primary)", fontWeight: 500, marginTop: 2 }}>
          {title}
        </p>
        <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 2 }}>{subtitle}</p>
      </div>
    );
  }

  if (variant === "chatbot") {
    return (
      <div
        className="card-ds p-4"
        style={{ minWidth: 240, borderRadius: "var(--radius-lg)" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="rounded-[10px] flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(59,130,246,0.2))",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <Bot size={18} style={{ color: "var(--brand-indigo)" }} strokeWidth={1.75} />
          </div>
          <div>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
              {title}
            </p>
            <DSBadge variant="success">● Active</DSBadge>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{subtitle}</span>
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-teal)" }}>{value}</span>
        </div>
      </div>
    );
  }

  if (variant === "feature") {
    return (
      <div
        className="p-5 rounded-[12px]"
        style={{
          minWidth: 200,
          background: "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(99,102,241,0.04) 100%)",
          border: "1px solid rgba(99,102,241,0.15)",
        }}
      >
        <div
          className="rounded-[10px] flex items-center justify-center mb-4"
          style={{ width: 40, height: 40, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.2)" }}
        >
          <span style={{ color: "var(--brand-indigo)" }}>{icon}</span>
        </div>
        <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
          {title}
        </p>
        <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", lineHeight: 1.5 }}>
          {subtitle}
        </p>
      </div>
    );
  }

  return (
    <div
      className="card-ds p-5"
      style={{ minWidth: 220, borderRadius: "var(--radius-lg)" }}
    >
      <h4 style={{ color: "var(--text-primary)", marginBottom: 6, fontWeight: 600 }}>{title}</h4>
      <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", lineHeight: 1.5 }}>
        {subtitle || "Card with surface elevated background, subtle border and smooth elevation on hover."}
      </p>
      {children}
    </div>
  );
}

// ── Toggle DS ──────────────────────────────────────
function DSToggle({ label, defaultOn = false }: { label?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setOn(!on)}
        className="rounded-full transition-all"
        style={{
          width: 42,
          height: 24,
          background: on ? "linear-gradient(135deg, #7C3AED, #3B82F6)" : "var(--surface-elevated)",
          border: on ? "none" : "1px solid var(--border-medium)",
          position: "relative",
          cursor: "pointer",
          boxShadow: on ? "0 0 12px rgba(99,102,241,0.3)" : "none",
          transition: "all 200ms ease-in-out",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: on ? 4 : 3,
            left: on ? 22 : 3,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            transition: "all 200ms ease-in-out",
          }}
        />
      </button>
      {label && (
        <span style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>{label}</span>
      )}
    </div>
  );
}

export function DesignSystem() {
  const [activeNav, setActiveNav] = useState("foundation");

  const navItems = [
    { id: "foundation", label: "Foundation" },
    { id: "components", label: "Components" },
    { id: "patterns", label: "Patterns" },
    { id: "templates", label: "Templates" },
  ];

  return (
    <div className="flex min-h-full">
      {/* DS sticky nav */}
      <div
        className="sticky top-0 shrink-0 p-4 self-start"
        style={{
          width: 180,
          top: 0,
          height: "calc(100vh - var(--topbar-height))",
          overflowY: "auto",
          borderRight: "1px solid var(--border-subtle)",
          background: "var(--bg-secondary)",
        }}
      >
        <p
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 10,
            paddingLeft: 4,
          }}
        >
          Navigation
        </p>
        {navItems.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setActiveNav(id)}
            className="block rounded-[6px] px-3 py-2 mb-0.5 transition-all"
            style={{
              fontSize: "0.8125rem",
              color: activeNav === id ? "var(--text-primary)" : "var(--text-tertiary)",
              fontWeight: activeNav === id ? 500 : 400,
              background: activeNav === id ? "var(--surface-elevated)" : "transparent",
              textDecoration: "none",
              transition: "all 150ms ease-in-out",
            }}
            onMouseEnter={(e) => {
              if (activeNav !== id) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeNav !== id) {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
              }
            }}
          >
            {label}
          </a>
        ))}

        <div style={{ height: 1, background: "var(--border-subtle)", margin: "12px 0" }} />
        <p
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 10,
            paddingLeft: 4,
          }}
        >
          Quick Jump
        </p>
        {[
          "Colors", "Typography", "Spacing", "Shadows",
          "Buttons", "Inputs", "Cards", "Badges", "Toggles", "Chat UI",
        ].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="block px-3 py-1.5 transition-all"
            style={{
              fontSize: "0.75rem",
              color: "var(--text-tertiary)",
              textDecoration: "none",
              borderRadius: 4,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
            }}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex items-center justify-center rounded-[12px]"
              style={{
                width: 44,
                height: 44,
                background: "linear-gradient(135deg, #7C3AED, #6366F1, #3B82F6)",
                boxShadow: "0 0 20px rgba(99,102,241,0.3)",
              }}
            >
              <Sparkles size={20} color="#fff" />
            </div>
            <div>
              <h1
                className="gradient-brand-text"
                style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1 }}
              >
                NeuralDS
              </h1>
              <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
                Design System v1.0 · AI Chatbot SaaS Platform
              </p>
            </div>
          </div>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: 600, lineHeight: 1.6 }}>
            A clean, scalable, and premium design system for building AI-powered SaaS interfaces. Dark-first,
            MacBook-inspired, B2B professional.
          </p>
        </div>

        {/* ─────────────────── FOUNDATION ─────────────────── */}
        <Section id="foundation" title="Foundation" subtitle="Design tokens and core visual language">

          {/* Colors */}
          <div id="colors" className="mb-8">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>
              Color System
            </h3>

            {/* Background layer */}
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
              Background Layer
            </p>
            <div className="flex flex-wrap gap-3 mb-5">
              {[
                { name: "color.background.primary", value: "#0B0F19", color: "#0B0F19" },
                { name: "color.background.secondary", value: "#111827", color: "#111827" },
                { name: "color.surface.default", value: "#161B26", color: "#161B26" },
                { name: "color.surface.elevated", value: "#1C2233", color: "#1C2233" },
                { name: "color.surface.hover", value: "#1E2738", color: "#1E2738" },
              ].map((t) => (
                <TokenChip key={t.name} name={t.name} value={t.value} color={t.color} />
              ))}
            </div>

            {/* Brand gradient */}
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
              Brand Gradient
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              {[
                { name: "color.brand.purple", value: "#7C3AED", color: "#7C3AED" },
                { name: "color.brand.indigo", value: "#6366F1", color: "#6366F1" },
                { name: "color.brand.blue", value: "#3B82F6", color: "#3B82F6" },
              ].map((t) => (
                <TokenChip key={t.name} name={t.name} value={t.value} color={t.color} />
              ))}
              <div
                className="rounded-[10px] flex items-center justify-center px-6"
                style={{
                  height: 56,
                  background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #3B82F6 100%)",
                  minWidth: 180,
                }}
              >
                <span style={{ color: "#fff", fontSize: "0.8125rem", fontWeight: 600 }}>
                  gradient.brand.primary
                </span>
              </div>
            </div>

            {/* Semantic */}
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
              Semantic Colors
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              {[
                { name: "color.feedback.success", value: "#22C55E", color: "#22C55E" },
                { name: "color.feedback.warning", value: "#F59E0B", color: "#F59E0B" },
                { name: "color.feedback.error", value: "#EF4444", color: "#EF4444" },
                { name: "color.feedback.info", value: "#3B82F6", color: "#3B82F6" },
                { name: "color.accent.teal", value: "#14B8A6", color: "#14B8A6" },
                { name: "color.accent.cyan", value: "#22D3EE", color: "#22D3EE" },
              ].map((t) => (
                <TokenChip key={t.name} name={t.name} value={t.value} color={t.color} />
              ))}
            </div>

            {/* Text */}
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
              Text
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "color.text.primary", value: "#F8FAFC", color: "#F8FAFC" },
                { name: "color.text.secondary", value: "#94A3B8", color: "#94A3B8" },
                { name: "color.text.tertiary", value: "#64748B", color: "#64748B" },
                { name: "color.text.disabled", value: "#334155", color: "#334155" },
                { name: "color.text.accent", value: "#818CF8", color: "#818CF8" },
              ].map((t) => (
                <TokenChip key={t.name} name={t.name} value={t.value} color={t.color} />
              ))}
            </div>
          </div>

          {/* Typography */}
          <div id="typography" className="mb-8">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>
              Typography Scale
            </h3>
            <div
              className="rounded-[12px] overflow-hidden"
              style={{ background: "var(--surface)", border: "1px solid var(--border-default)" }}
            >
              {[
                { label: "Display", token: "text.display", size: "3rem", weight: 800, tracking: "-0.04em", sample: "Build smarter chatbots" },
                { label: "H1", token: "text.h1", size: "1.75rem", weight: 700, tracking: "-0.03em", sample: "AI Platform Dashboard" },
                { label: "H2", token: "text.h2", size: "1.375rem", weight: 600, tracking: "-0.02em", sample: "Configuration Settings" },
                { label: "H3", token: "text.h3", size: "1.125rem", weight: 600, tracking: "-0.015em", sample: "System Instructions" },
                { label: "Body Large", token: "text.body.lg", size: "1rem", weight: 400, tracking: "0", sample: "Manage your AI-powered conversations" },
                { label: "Body", token: "text.body", size: "0.875rem", weight: 400, tracking: "0", sample: "Configure your chatbot behavior and responses" },
                { label: "Body Small", token: "text.body.sm", size: "0.8125rem", weight: 400, tracking: "0", sample: "Support multiple channels simultaneously" },
                { label: "Caption", token: "text.caption", size: "0.75rem", weight: 400, tracking: "0", sample: "Last updated 2 hours ago" },
                { label: "Label", token: "text.label", size: "0.6875rem", weight: 600, tracking: "0.07em", sample: "ACTIVE · PRODUCTION" },
              ].map((t, i) => (
                <div
                  key={t.label}
                  className="flex items-center gap-4 px-5 py-3"
                  style={{ borderBottom: i < 8 ? "1px solid var(--border-subtle)" : "none" }}
                >
                  <div style={{ width: 80, flexShrink: 0 }}>
                    <code style={{ fontSize: "0.6875rem", color: "var(--accent-teal)" }}>
                      {t.label}
                    </code>
                  </div>
                  <div style={{ width: 120, flexShrink: 0 }}>
                    <code style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                      {t.size} / {t.weight}
                    </code>
                  </div>
                  <p
                    style={{
                      fontSize: t.size,
                      fontWeight: t.weight,
                      letterSpacing: t.tracking,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                      textTransform: t.label === "Label" ? "uppercase" : undefined,
                    }}
                  >
                    {t.sample}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing */}
          <div id="spacing" className="mb-8">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>
              Spacing Scale (8px base)
            </h3>
            <ShowcaseBlock label="spacing tokens" dark>
              {[2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64].map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <div
                    style={{
                      width: size,
                      height: size,
                      background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
                      borderRadius: 2,
                      minWidth: 2,
                      minHeight: 2,
                    }}
                  />
                  <code style={{ fontSize: "0.5625rem", color: "var(--text-tertiary)" }}>
                    {size}px
                  </code>
                </div>
              ))}
            </ShowcaseBlock>
          </div>

          {/* Border Radius */}
          <div className="mb-8">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>
              Border Radius
            </h3>
            <ShowcaseBlock label="radius tokens">
              {[
                { token: "radius.xs", value: "4px", r: 4 },
                { token: "radius.sm", value: "6px", r: 6 },
                { token: "radius.md", value: "8px", r: 8 },
                { token: "radius.lg", value: "12px", r: 12 },
                { token: "radius.xl", value: "16px", r: 16 },
                { token: "radius.2xl", value: "24px", r: 24 },
                { token: "radius.full", value: "9999px", r: 9999 },
              ].map((item) => (
                <div key={item.token} className="flex flex-col items-center gap-2">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border-medium)",
                      borderRadius: item.r,
                    }}
                  />
                  <code style={{ fontSize: "0.5625rem", color: "var(--accent-teal)", textAlign: "center" }}>
                    {item.value}
                  </code>
                </div>
              ))}
            </ShowcaseBlock>
          </div>

          {/* Shadows */}
          <div id="shadows">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>
              Shadow & Glow System
            </h3>
            <ShowcaseBlock label="elevation & glow">
              {[
                { label: "shadow.xs", style: { boxShadow: "0 1px 2px rgba(0,0,0,0.4)" } },
                { label: "shadow.sm", style: { boxShadow: "0 2px 8px rgba(0,0,0,0.4)" } },
                { label: "shadow.md", style: { boxShadow: "0 4px 16px rgba(0,0,0,0.45)" } },
                { label: "shadow.lg", style: { boxShadow: "0 8px 32px rgba(0,0,0,0.5)" } },
                { label: "glow.brand", style: { boxShadow: "0 0 24px rgba(99,102,241,0.35)", border: "1px solid rgba(99,102,241,0.3)" } },
                { label: "glow.teal", style: { boxShadow: "0 0 24px rgba(20,184,166,0.35)", border: "1px solid rgba(20,184,166,0.3)" } },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-3">
                  <div
                    className="rounded-[10px]"
                    style={{
                      width: 64,
                      height: 64,
                      background: "var(--surface-elevated)",
                      ...item.style,
                    }}
                  />
                  <code style={{ fontSize: "0.5625rem", color: "var(--text-tertiary)", textAlign: "center" }}>
                    {item.label}
                  </code>
                </div>
              ))}
            </ShowcaseBlock>
          </div>
        </Section>

        {/* ─────────────────── COMPONENTS ─────────────────── */}
        <Section id="components" title="Components" subtitle="Reusable UI building blocks with all variants and states">

          {/* Buttons */}
          <div id="buttons" className="mb-8">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>
              Buttons
            </h3>
            <div className="flex flex-col gap-3">
              <ShowcaseBlock label="variants">
                <DSButton variant="primary">Primary</DSButton>
                <DSButton variant="secondary">Secondary</DSButton>
                <DSButton variant="ghost">Ghost</DSButton>
                <DSButton variant="danger">Danger</DSButton>
                <DSButton variant="teal">Teal Accent</DSButton>
              </ShowcaseBlock>
              <ShowcaseBlock label="sizes">
                <DSButton variant="primary" size="sm">Small</DSButton>
                <DSButton variant="primary" size="md">Medium</DSButton>
                <DSButton variant="primary" size="lg">Large</DSButton>
              </ShowcaseBlock>
              <ShowcaseBlock label="states">
                <DSButton variant="primary" icon={<Sparkles size={13} />}>With Icon</DSButton>
                <DSButton variant="primary" loading>Loading...</DSButton>
                <DSButton variant="primary" disabled>Disabled</DSButton>
                <DSButton variant="secondary" icon={<ArrowRight size={13} />}>Continue</DSButton>
              </ShowcaseBlock>
            </div>
          </div>

          {/* Inputs */}
          <div id="inputs" className="mb-8">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>
              Inputs & Form Controls
            </h3>
            <div className="flex flex-col gap-3">
              <ShowcaseBlock label="text fields">
                <DSInput label="Default" placeholder="Enter value..." />
                <DSInput label="With Error" placeholder="Enter email..." error="Invalid email address" />
                <DSInput label="With Success" placeholder="Username" success="Username available" />
              </ShowcaseBlock>
              <ShowcaseBlock label="toggles">
                <DSToggle label="Enable feature" defaultOn />
                <DSToggle label="Dark mode" defaultOn={false} />
                <DSToggle label="Auto-response" defaultOn />
                <DSToggle label="Notifications" defaultOn={false} />
              </ShowcaseBlock>
              <ShowcaseBlock label="selects">
                {["GPT-4o", "Claude 3.5", "Gemini Pro"].map((opt) => (
                  <div
                    key={opt}
                    className="flex items-center justify-between rounded-[8px] px-3 cursor-pointer"
                    style={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border-default)",
                      height: 40,
                      minWidth: 160,
                    }}
                  >
                    <span style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>{opt}</span>
                    <ChevronDown size={14} style={{ color: "var(--text-tertiary)" }} />
                  </div>
                ))}
              </ShowcaseBlock>
              <ShowcaseBlock label="checkboxes & radio">
                {[true, false, true].map((checked, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="rounded-[4px] flex items-center justify-center"
                      style={{
                        width: 18,
                        height: 18,
                        background: checked ? "linear-gradient(135deg, #7C3AED, #3B82F6)" : "var(--surface-elevated)",
                        border: checked ? "none" : "1px solid var(--border-medium)",
                        cursor: "pointer",
                      }}
                    >
                      {checked && <Check size={10} color="#fff" strokeWidth={2.5} />}
                    </div>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>
                      Option {i + 1}
                    </span>
                  </div>
                ))}
                {[true, false].map((active, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: 18,
                        height: 18,
                        background: "var(--surface-elevated)",
                        border: active ? "2px solid var(--brand-indigo)" : "1px solid var(--border-medium)",
                        cursor: "pointer",
                      }}
                    >
                      {active && (
                        <div
                          className="rounded-full"
                          style={{ width: 8, height: 8, background: "var(--brand-indigo)" }}
                        />
                      )}
                    </div>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>
                      Radio {i + 1}
                    </span>
                  </div>
                ))}
              </ShowcaseBlock>
            </div>
          </div>

          {/* Cards */}
          <div id="cards" className="mb-8">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>
              Cards
            </h3>
            <div className="flex flex-col gap-3">
              <ShowcaseBlock label="default card">
                <DSCard variant="default" title="Default Card" subtitle="Surface with subtle border, hover elevation effect." />
                <DSCard variant="default" title="Configuration Card">
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                      With custom footer content
                    </p>
                  </div>
                </DSCard>
              </ShowcaseBlock>
              <ShowcaseBlock label="analytics card">
                <DSCard variant="analytics" title="Total Messages" value="12,482" subtitle="+18% vs last week" icon={<MessageSquare size={16} />} color="#6366F1" />
                <DSCard variant="analytics" title="Active Bots" value="3 / 12" subtitle="All systems nominal" icon={<Bot size={16} />} color="#22C55E" />
                <DSCard variant="analytics" title="Success Rate" value="94.2%" subtitle="-1.3% this week" icon={<BarChart3 size={16} />} color="#14B8A6" />
              </ShowcaseBlock>
              <ShowcaseBlock label="chatbot card">
                <DSCard variant="chatbot" title="Support Bot" subtitle="GPT-4o · WhatsApp" value="96%" />
                <DSCard variant="chatbot" title="Sales Assistant" subtitle="Claude 3.5 · Slack" value="91%" />
              </ShowcaseBlock>
              <ShowcaseBlock label="feature card">
                <DSCard variant="feature" title="AI Autopilot" subtitle="Automated responses with GPT-4o. Zero manual intervention." icon={<Sparkles size={16} />} />
                <DSCard variant="feature" title="Multi-Channel" subtitle="Deploy across WhatsApp, Web, API and more." icon={<Zap size={16} />} />
                <DSCard variant="feature" title="Analytics" subtitle="Real-time insights and conversation metrics." icon={<BarChart3 size={16} />} />
              </ShowcaseBlock>
            </div>
          </div>

          {/* Badges */}
          <div id="badges" className="mb-8">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>
              Badges & Status Indicators
            </h3>
            <ShowcaseBlock label="badge variants">
              <DSBadge variant="default">Default</DSBadge>
              <DSBadge variant="success">● Active</DSBadge>
              <DSBadge variant="warning">⚠ Idle</DSBadge>
              <DSBadge variant="error">● Error</DSBadge>
              <DSBadge variant="info">ℹ Info</DSBadge>
              <DSBadge variant="purple">✦ New</DSBadge>
              <DSBadge variant="teal">AI Ready</DSBadge>
            </ShowcaseBlock>
          </div>
        </Section>

        {/* ─────────────────── PATTERNS ─────────────────── */}
        <Section id="patterns" title="Patterns" subtitle="Composable UI patterns specific to the AI chatbot platform">

          {/* Chat UI */}
          <div id="chat-ui" className="mb-8">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>
              Chat UI Components
            </h3>
            <div
              className="rounded-[12px] overflow-hidden"
              style={{ background: "var(--surface)", border: "1px solid var(--border-default)", maxWidth: 480 }}
            >
              {/* AI status bar */}
              <div
                className="flex items-center gap-2 px-4 py-2"
                style={{
                  background: "linear-gradient(90deg, rgba(99,102,241,0.08), transparent)",
                  borderBottom: "1px solid rgba(99,102,241,0.1)",
                }}
              >
                <Sparkles size={11} style={{ color: "var(--brand-indigo)" }} />
                <span style={{ fontSize: "0.6875rem", color: "var(--brand-indigo)", fontWeight: 500 }}>
                  AI Autopilot · GPT-4o · Support Bot
                </span>
              </div>

              <div className="p-4 flex flex-col gap-3">
                {/* Bot message */}
                <div className="flex items-end gap-2">
                  <div
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: 26,
                      height: 26,
                      background: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(59,130,246,0.25))",
                      border: "1px solid rgba(99,102,241,0.3)",
                    }}
                  >
                    <Bot size={11} style={{ color: "var(--brand-indigo)" }} />
                  </div>
                  <div
                    className="rounded-[12px] px-4 py-3"
                    style={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border-default)",
                      maxWidth: 300,
                    }}
                  >
                    <p style={{ fontSize: "0.875rem", color: "var(--text-primary)", lineHeight: 1.5 }}>
                      Hi! I'm Ava, your support assistant. How can I help you today? 👋
                    </p>
                    <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", marginTop: 4 }}>14:22</p>
                  </div>
                </div>

                {/* User message */}
                <div className="flex items-end gap-2 flex-row-reverse">
                  <div
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{ width: 26, height: 26, background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)", fontSize: "0.5625rem", fontWeight: 700, color: "var(--brand-indigo)" }}
                  >
                    JS
                  </div>
                  <div
                    className="rounded-[12px] px-4 py-3"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 60%, #3B82F6 100%)",
                      maxWidth: 260,
                      boxShadow: "0 2px 12px rgba(99,102,241,0.3)",
                    }}
                  >
                    <p style={{ fontSize: "0.875rem", color: "#fff", lineHeight: 1.5 }}>
                      I need to reset my password
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <p style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.5)" }}>14:23</p>
                      <CheckCheck size={10} style={{ color: "rgba(255,255,255,0.5)" }} />
                    </div>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex items-end gap-2">
                  <div
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: 26,
                      height: 26,
                      background: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(59,130,246,0.25))",
                      border: "1px solid rgba(99,102,241,0.3)",
                    }}
                  >
                    <Bot size={11} style={{ color: "var(--brand-indigo)" }} />
                  </div>
                  <div
                    className="flex items-center gap-1.5 rounded-[12px] px-4 py-3"
                    style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-default)" }}
                  >
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>

              {/* Input */}
              <div
                className="px-4 py-3"
                style={{ borderTop: "1px solid var(--border-subtle)" }}
              >
                <div
                  className="flex items-center gap-2 rounded-[10px] px-3"
                  style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-default)", height: 40 }}
                >
                  <span style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", flex: 1 }}>
                    Type a message...
                  </span>
                  <div
                    className="flex items-center justify-center rounded-[6px]"
                    style={{
                      width: 28,
                      height: 28,
                      background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
                      boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
                    }}
                  >
                    <Send size={12} color="#fff" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Config block pattern */}
          <div className="mb-8">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>
              Configuration Blocks
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Instructions block */}
              <div
                className="p-4 rounded-[12px]"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.06), rgba(99,102,241,0.04))",
                  border: "1px solid rgba(99,102,241,0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="rounded-[8px] flex items-center justify-center" style={{ width: 28, height: 28, background: "rgba(99,102,241,0.15)" }}>
                    <Sparkles size={13} style={{ color: "var(--brand-indigo)" }} />
                  </div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    Instructions Block
                  </p>
                </div>
                <div
                  className="rounded-[8px] p-3"
                  style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)", fontSize: "0.8125rem", color: "var(--text-tertiary)", lineHeight: 1.5 }}
                >
                  You are a professional support assistant...
                </div>
              </div>

              {/* Integration block */}
              <div
                className="p-4 rounded-[12px]"
                style={{ background: "var(--surface)", border: "1px solid var(--border-default)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="rounded-[8px] flex items-center justify-center" style={{ width: 28, height: 28, background: "rgba(34,197,94,0.1)" }}>
                    <Zap size={13} style={{ color: "var(--success)" }} />
                  </div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    Channel Card
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  {[
                    { name: "WhatsApp", status: "connected", color: "#22C55E" },
                    { name: "Web Widget", status: "connected", color: "#3B82F6" },
                    { name: "Telegram", status: "inactive", color: "#64748B" },
                  ].map((ch) => (
                    <div
                      key={ch.name}
                      className="flex items-center justify-between rounded-[6px] px-3 py-2"
                      style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
                    >
                      <span style={{ fontSize: "0.8125rem", color: "var(--text-primary)" }}>{ch.name}</span>
                      <span
                        className="rounded-full"
                        style={{
                          width: 6,
                          height: 6,
                          background: ch.color,
                          display: "inline-block",
                          boxShadow: ch.status === "connected" ? `0 0 6px ${ch.color}80` : "none",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ─────────────────── TEMPLATES ─────────────────── */}
        <Section id="templates" title="Templates" subtitle="Pre-built page layouts applying the design system">
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: "Dashboard", desc: "Overview with stats, charts and activity feed", gradient: "135deg, rgba(99,102,241,0.12), rgba(59,130,246,0.08)" },
              { title: "Bot Config", desc: "Tabbed configuration interface with blocks", gradient: "135deg, rgba(124,58,237,0.12), rgba(99,102,241,0.08)" },
              { title: "Messages", desc: "Two-panel chat with conversation list", gradient: "135deg, rgba(20,184,166,0.1), rgba(59,130,246,0.08)" },
              { title: "Integrations", desc: "Channel cards with status and settings", gradient: "135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.06)" },
              { title: "Settings", desc: "Sectioned settings with form inputs", gradient: "135deg, rgba(34,197,94,0.08), rgba(20,184,166,0.06)" },
              { title: "Design System", desc: "This page — full token documentation", gradient: "135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1)" },
            ].map((tpl) => (
              <div
                key={tpl.title}
                className="p-4 rounded-[12px] cursor-pointer transition-all"
                style={{
                  background: `linear-gradient(${tpl.gradient})`,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.25)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  className="rounded-[8px] mb-3"
                  style={{ height: 80, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                />
                <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                  {tpl.title}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{tpl.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}