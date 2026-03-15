import { useState } from "react";
import {
  User,
  Building,
  Shield,
  Key,
  CreditCard,
  Bell,
  Globe,
  Palette,
  Database,
  ChevronRight,
  Check,
  Upload,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
} from "lucide-react";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "organization", label: "Organization", icon: Building },
  { id: "security", label: "Security", icon: Shield },
  { id: "api", label: "API Keys", icon: Key },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const apiKeys = [
  {
    id: 1,
    name: "Production Key",
    key: "sk-nd-live-4xK9mP2jL8nQ7rT3vY1wX6uZ5",
    created: "Jan 15, 2025",
    lastUsed: "2 hours ago",
    status: "active",
  },
  {
    id: 2,
    name: "Development Key",
    key: "sk-nd-dev-7pR4sM9kH2cB5nJ1wF8vL3eA6",
    created: "Feb 3, 2025",
    lastUsed: "5 days ago",
    status: "active",
  },
];

function ToggleSwitch({ on = false }: { on?: boolean }) {
  const [enabled, setEnabled] = useState(on);
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="rounded-full transition-all shrink-0"
      style={{
        width: 42,
        height: 24,
        background: enabled ? "linear-gradient(135deg, #7C3AED, #3B82F6)" : "var(--surface)",
        border: enabled ? "none" : "1px solid var(--border-medium)",
        position: "relative",
        cursor: "pointer",
        boxShadow: enabled ? "0 0 10px rgba(99,102,241,0.25)" : "none",
        transition: "all 200ms ease-in-out",
      }}
    >
      <span
        className="rounded-full"
        style={{
          position: "absolute",
          top: enabled ? 4 : 3,
          left: enabled ? 22 : 3,
          width: 16,
          height: 16,
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
          transition: "all 200ms ease-in-out",
        }}
      />
    </button>
  );
}

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[12px] overflow-hidden mb-4"
      style={{ background: "var(--surface)", border: "1px solid var(--border-default)" }}
    >
      <div
        className="px-5 py-4"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", marginTop: 2 }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function FormField({
  label,
  defaultValue,
  type = "text",
  placeholder,
  hint,
}: {
  label: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
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
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="input-ds"
      />
      {hint && (
        <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 4 }}>{hint}</p>
      )}
    </div>
  );
}

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [showKey, setShowKey] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const copyKey = (id: number) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-[1100px]">
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
            Settings
          </h1>
          <p style={{ color: "var(--text-tertiary)", fontSize: "0.9375rem" }}>
            Manage your account, organization, and platform preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary flex items-center gap-2"
          style={{ transition: "all 200ms ease-in-out" }}
        >
          {saved ? <Check size={14} /> : null}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex gap-5">
        {/* Sidebar nav */}
        <div
          className="shrink-0 p-2 rounded-[12px]"
          style={{
            width: 200,
            background: "var(--surface)",
            border: "1px solid var(--border-default)",
            height: "fit-content",
          }}
        >
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className="flex items-center gap-2.5 rounded-[8px] px-3 py-2.5 w-full text-left transition-all mb-0.5 relative"
              style={{
                background: activeSection === id ? "var(--surface-elevated)" : "transparent",
                color: activeSection === id ? "var(--text-primary)" : "var(--text-tertiary)",
                border: "none",
                cursor: "pointer",
                fontSize: "0.8125rem",
                fontWeight: activeSection === id ? 500 : 400,
              }}
              onMouseEnter={(e) => {
                if (activeSection !== id) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== id) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
                }
              }}
            >
              {activeSection === id && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 3,
                    height: 16,
                    borderRadius: "0 2px 2px 0",
                    background: "linear-gradient(180deg, #7C3AED, #3B82F6)",
                  }}
                />
              )}
              <Icon
                size={14}
                style={{ color: activeSection === id ? "var(--brand-indigo)" : "inherit", flexShrink: 0 }}
                strokeWidth={activeSection === id ? 2 : 1.75}
              />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeSection === "profile" && (
            <div>
              <SectionCard title="Personal Information" subtitle="Update your name, email and profile photo">
                <div className="flex items-start gap-5 mb-5">
                  {/* Avatar */}
                  <div className="relative">
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 72,
                        height: 72,
                        background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      AC
                    </div>
                    <button
                      className="absolute bottom-0 right-0 flex items-center justify-center rounded-full"
                      style={{
                        width: 24,
                        height: 24,
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border-medium)",
                        cursor: "pointer",
                      }}
                    >
                      <Upload size={11} style={{ color: "var(--text-secondary)" }} />
                    </button>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      Alex Costa
                    </p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", marginTop: 2 }}>
                      Pro Plan · Member since Jan 2025
                    </p>
                    <button
                      style={{
                        marginTop: 8,
                        fontSize: "0.75rem",
                        color: "var(--brand-indigo)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 500,
                        padding: 0,
                      }}
                    >
                      Change photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="First Name" defaultValue="Alex" />
                  <FormField label="Last Name" defaultValue="Costa" />
                  <FormField
                    label="Email Address"
                    defaultValue="alex@acme.com"
                    type="email"
                  />
                  <FormField label="Phone" defaultValue="+55 11 9 9999-9999" />
                </div>
              </SectionCard>

              <SectionCard title="Preferences" subtitle="Customize your platform experience">
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Dark Mode", desc: "Use dark theme (currently active)", on: true },
                    { label: "Compact View", desc: "Reduce spacing in lists and tables", on: false },
                    { label: "Keyboard Shortcuts", desc: "Enable global keyboard shortcuts", on: true },
                    { label: "Beta Features", desc: "Access experimental features early", on: false },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-3"
                      style={{ borderBottom: "1px solid var(--border-subtle)" }}
                    >
                      <div>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 500 }}>
                          {item.label}
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                          {item.desc}
                        </p>
                      </div>
                      <ToggleSwitch on={item.on} />
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {activeSection === "organization" && (
            <div>
              <SectionCard title="Organization Details" subtitle="Manage your workspace settings">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Organization Name"
                    defaultValue="Acme Corp"
                    placeholder="Company name"
                  />
                  <FormField
                    label="Workspace Slug"
                    defaultValue="acme-corp"
                    hint="Used in API calls and webhooks"
                  />
                  <div className="col-span-2">
                    <FormField
                      label="Website"
                      defaultValue="https://acme.com"
                      type="url"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        color: "var(--text-secondary)",
                        marginBottom: 6,
                      }}
                    >
                      Timezone
                    </label>
                    <div
                      className="flex items-center justify-between rounded-[8px] px-3"
                      style={{
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border-default)",
                        height: 40,
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>
                        America/Sao_Paulo (UTC-3)
                      </span>
                      <Globe size={14} style={{ color: "var(--text-tertiary)" }} />
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Team Members" subtitle="2 members · Pro Plan includes up to 10">
                <div className="flex flex-col gap-2 mb-4">
                  {[
                    { name: "Alex Costa", email: "alex@acme.com", role: "Owner", avatar: "AC", color: "#7C3AED" },
                    { name: "Maria Silva", email: "maria@acme.com", role: "Admin", avatar: "MS", color: "#3B82F6" },
                  ].map((member) => (
                    <div
                      key={member.email}
                      className="flex items-center gap-3 rounded-[8px] px-4 py-3"
                      style={{
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      <div
                        className="flex items-center justify-center rounded-full shrink-0"
                        style={{
                          width: 34,
                          height: 34,
                          background: `${member.color}20`,
                          border: `1px solid ${member.color}30`,
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: member.color,
                        }}
                      >
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>
                          {member.name}
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                          {member.email}
                        </p>
                      </div>
                      <span
                        className="rounded-full px-2.5 py-1"
                        style={{
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          background: "rgba(99,102,241,0.1)",
                          color: "var(--brand-indigo)",
                          border: "1px solid rgba(99,102,241,0.2)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="btn-secondary flex items-center gap-2 w-full justify-center">
                  <Plus size={13} />
                  Invite Team Member
                </button>
              </SectionCard>
            </div>
          )}

          {activeSection === "security" && (
            <div>
              <SectionCard title="Password" subtitle="Update your account password">
                <div className="flex flex-col gap-4">
                  <FormField label="Current Password" type="password" placeholder="••••••••••••" />
                  <FormField label="New Password" type="password" placeholder="Min. 8 characters" />
                  <FormField label="Confirm New Password" type="password" placeholder="Repeat new password" />
                  <button className="btn-primary" style={{ alignSelf: "flex-start", padding: "10px 20px" }}>
                    Update Password
                  </button>
                </div>
              </SectionCard>

              <SectionCard title="Two-Factor Authentication" subtitle="Add an extra layer of security to your account">
                <div className="flex items-center justify-between p-4 rounded-[8px] mb-4"
                  style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-default)" }}
                >
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>
                      Authenticator App (TOTP)
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                      Use Google Authenticator or similar
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1"
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      background: "rgba(34,197,94,0.1)",
                      color: "var(--success)",
                      border: "1px solid rgba(34,197,94,0.2)",
                    }}
                  >
                    Enabled
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    { label: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity", on: true },
                    { label: "Login Notifications", desc: "Email alert on new device login", on: true },
                    { label: "IP Allowlist", desc: "Restrict access to specific IP ranges", on: false },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-3"
                      style={{ borderBottom: "1px solid var(--border-subtle)" }}
                    >
                      <div>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 500 }}>
                          {item.label}
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                          {item.desc}
                        </p>
                      </div>
                      <ToggleSwitch on={item.on} />
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {activeSection === "api" && (
            <div>
              <SectionCard title="API Keys" subtitle="Manage authentication keys for the NeuralDS API">
                <div className="flex flex-col gap-3 mb-4">
                  {apiKeys.map((key) => (
                    <div
                      key={key.id}
                      className="rounded-[10px] p-4"
                      style={{
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border-default)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                            {key.name}
                          </p>
                          <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 2 }}>
                            Created {key.created} · Last used {key.lastUsed}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="rounded-full px-2 py-0.5"
                            style={{
                              fontSize: "0.6875rem",
                              fontWeight: 600,
                              background: "rgba(34,197,94,0.1)",
                              color: "var(--success)",
                              border: "1px solid rgba(34,197,94,0.2)",
                            }}
                          >
                            Active
                          </span>
                          <button
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "var(--text-tertiary)",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) =>
                              ((e.currentTarget as HTMLElement).style.color = "var(--error)")
                            }
                            onMouseLeave={(e) =>
                              ((e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)")
                            }
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-2 rounded-[6px] px-3"
                        style={{
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border-subtle)",
                          height: 36,
                        }}
                      >
                        <code
                          style={{
                            flex: 1,
                            fontSize: "0.75rem",
                            color: "var(--text-secondary)",
                            fontFamily: "monospace",
                          }}
                        >
                          {showKey[key.id] ? key.key : key.key.replace(/sk-nd-.+/, "sk-nd-••••••••••••••••••••••••••")}
                        </code>
                        <button
                          onClick={() =>
                            setShowKey((prev) => ({ ...prev, [key.id]: !prev[key.id] }))
                          }
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--text-tertiary)",
                            cursor: "pointer",
                          }}
                        >
                          {showKey[key.id] ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                        <button
                          onClick={() => copyKey(key.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: copied === key.id ? "var(--success)" : "var(--text-tertiary)",
                            cursor: "pointer",
                          }}
                        >
                          {copied === key.id ? <Check size={13} /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="btn-primary flex items-center gap-2">
                  <Plus size={13} />
                  Generate New Key
                </button>
              </SectionCard>

              <SectionCard title="Usage & Limits" subtitle="Current billing period: March 2026">
                <div className="flex flex-col gap-4">
                  {[
                    { label: "API Requests", used: 48230, total: 100000, color: "var(--brand-indigo)" },
                    { label: "Messages Processed", used: 12840, total: 50000, color: "var(--accent-teal)" },
                    { label: "Active Bots", used: 3, total: 12, color: "var(--brand-purple)" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                          {item.label}
                        </span>
                        <span style={{ fontSize: "0.8125rem", color: "var(--text-primary)", fontWeight: 600 }}>
                          {item.used.toLocaleString()} /{" "}
                          <span style={{ color: "var(--text-tertiary)" }}>
                            {item.total.toLocaleString()}
                          </span>
                        </span>
                      </div>
                      <div
                        className="rounded-full overflow-hidden"
                        style={{ height: 6, background: "var(--surface-elevated)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${(item.used / item.total) * 100}%`,
                            background: item.color,
                            boxShadow: `0 0 8px ${item.color}60`,
                          }}
                        />
                      </div>
                      <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", marginTop: 3 }}>
                        {Math.round((item.used / item.total) * 100)}% used
                      </p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {activeSection === "billing" && (
            <div>
              <SectionCard title="Current Plan" subtitle="Pro Plan — Billed monthly">
                <div
                  className="rounded-[12px] p-5 mb-4"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.08))",
                    border: "1px solid rgba(99,102,241,0.25)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="gradient-brand-text" style={{ fontSize: "1.375rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                        Pro Plan
                      </p>
                      <p style={{ color: "var(--text-tertiary)", fontSize: "0.875rem", marginTop: 4 }}>
                        Up to 12 bots · 50k messages/mo · 10 team members
                      </p>
                    </div>
                    <div className="text-right">
                      <p style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                        $79
                        <span style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", fontWeight: 400 }}>/mo</span>
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Next billing: Apr 1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <button className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.8125rem" }}>
                      Upgrade to Enterprise
                    </button>
                    <button className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.8125rem" }}>
                      Manage Plan
                    </button>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Payment Method" subtitle="Cards used for billing">
                <div
                  className="flex items-center gap-3 rounded-[8px] p-4 mb-3"
                  style={{
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--border-default)",
                  }}
                >
                  <div
                    className="rounded-[6px] flex items-center justify-center"
                    style={{
                      width: 40,
                      height: 28,
                      background: "linear-gradient(135deg, #1a1f36, #2d3460)",
                      border: "1px solid var(--border-medium)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    VISA
                  </div>
                  <div className="flex-1">
                    <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>
                      •••• •••• •••• 4242
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                      Expires 12/27
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5"
                    style={{
                      fontSize: "0.6875rem",
                      background: "rgba(34,197,94,0.1)",
                      color: "var(--success)",
                      border: "1px solid rgba(34,197,94,0.2)",
                      fontWeight: 600,
                    }}
                  >
                    Default
                  </span>
                </div>
                <button className="btn-secondary flex items-center gap-2">
                  <CreditCard size={13} />
                  Add Payment Method
                </button>
              </SectionCard>
            </div>
          )}

          {activeSection === "notifications" && (
            <SectionCard title="Notification Preferences" subtitle="Choose how and when you receive alerts">
              <div className="flex flex-col gap-1">
                {[
                  { label: "Bot offline alerts", desc: "Immediate notification when a bot goes down", email: true, push: true },
                  { label: "Weekly performance report", desc: "Summary of key metrics every Monday", email: true, push: false },
                  { label: "Handoff escalations", desc: "When a conversation is escalated to human", email: true, push: true },
                  { label: "New integrations", desc: "When a new channel is connected", email: false, push: true },
                  { label: "Billing updates", desc: "Invoice ready, payment processed", email: true, push: false },
                  { label: "Team activity", desc: "When a teammate joins or makes changes", email: false, push: false },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3.5"
                    style={{ borderBottom: i < 5 ? "1px solid var(--border-subtle)" : "none" }}
                  >
                    <div>
                      <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>Email</span>
                        <ToggleSwitch on={item.email} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>Push</span>
                        <ToggleSwitch on={item.push} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}
