import {
  Bot,
  ChevronDown,
  Code,
  Globe,
  Info,
  Lock,
  MessageSquare,
  Pause,
  Play,
  Plus,
  Save,
  Settings,
  Shield,
  Sliders,
  Sparkles,
  Trash2
} from "lucide-react";
import React, { useState } from "react";

const tabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "instructions", label: "Instructions", icon: Sparkles },
  { id: "rules", label: "Rules", icon: Shield },
  { id: "responses", label: "Responses", icon: MessageSquare },
  { id: "advanced", label: "Advanced", icon: Code },
];

const models = [
  { id: "gpt4o", label: "GPT-4o", badge: "Recommended", description: "Best reasoning & comprehension" },
  { id: "gpt4o-mini", label: "GPT-4o mini", badge: "Fast", description: "Speed-optimized, lower cost" },
  { id: "claude35", label: "Claude 3.5 Sonnet", badge: "Smart", description: "Excellent at nuanced tasks" },
  { id: "gemini", label: "Gemini 1.5 Pro", badge: "Multimodal", description: "Supports image inputs" },
];

const defaultRules = [
  { id: 1, text: "Never share personal customer data with third parties", enabled: true },
  { id: 2, text: "Always respond in the same language as the user", enabled: true },
  { id: 3, text: "Do not provide medical, legal, or financial advice", enabled: true },
  { id: 4, text: "Escalate to human agent if user is frustrated", enabled: false },
];

const tones = ["Professional", "Friendly", "Casual", "Empathetic", "Concise"];

function BlockHeader({
  icon: Icon,
  title,
  subtitle,
  color = "var(--brand-indigo)",
  bg = "rgba(99,102,241,0.1)",
}: {
  icon: any;
  title: string;
  subtitle?: string;
  color?: string;
  bg?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="flex items-center justify-center rounded-[10px] shrink-0"
        style={{ width: 36, height: 36, background: bg, border: `1px solid ${color}22` }}
      >
        <Icon size={16} style={{ color }} strokeWidth={1.75} />
      </div>
      <div>
        <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 1 }}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function ConfigBlock({
  children,
  gradient = false,
}: {
  children: React.ReactNode;
  gradient?: boolean;
}) {
  return (
    <div
      className="p-5 rounded-[12px] mb-4"
      style={{
        background: gradient
          ? "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(99,102,241,0.04) 100%)"
          : "var(--surface)",
        border: gradient ? "1px solid rgba(99,102,241,0.15)" : "1px solid var(--border-default)",
      }}
    >
      {children}
    </div>
  );
}

export function ChatbotConfig() {
  const [activeTab, setActiveTab] = useState("instructions");
  const [isActive, setIsActive] = useState(true);
  const [rules, setRules] = useState(defaultRules);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [selectedModel, setSelectedModel] = useState("gpt4o");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [newRule, setNewRule] = useState("");
  const [instructions, setInstructions] = useState(
    `You are a professional customer support assistant for Acme Corp. Your primary goal is to help customers resolve their issues efficiently and empathetically.

Key responsibilities:
- Answer product-related questions accurately
- Help with account issues and billing inquiries  
- Guide users through technical troubleshooting
- Collect feedback and escalate complex issues

Always maintain a ${selectedTone.toLowerCase()} tone and ensure customer satisfaction is your top priority.`
  );

  const addRule = () => {
    if (newRule.trim()) {
      setRules([...rules, { id: Date.now(), text: newRule, enabled: true }]);
      setNewRule("");
    }
  };

  const toggleRule = (id: number) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  };

  const deleteRule = (id: number) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 max-w-[1200px]">
      {/* Bot header card */}
      <div
        className="gradient-border-card p-5 mb-6 flex items-center gap-5"
        style={{ border: "1px solid rgba(99,102,241,0.2)" }}
      >
        {/* Bot avatar */}
        <div
          className="flex items-center justify-center rounded-[16px] shrink-0"
          style={{
            width: 64,
            height: 64,
            background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(59,130,246,0.25))",
            border: "1px solid rgba(99,102,241,0.3)",
            boxShadow: "0 0 20px rgba(99,102,241,0.15)",
          }}
        >
          <Bot size={28} style={{ color: "var(--brand-indigo)" }} strokeWidth={1.5} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1.5">
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Support Bot
            </h2>
            <span
              className="rounded-full px-2.5 py-1"
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                background: isActive ? "rgba(34,197,94,0.1)" : "rgba(100,116,139,0.1)",
                color: isActive ? "var(--success)" : "var(--text-tertiary)",
                border: `1px solid ${isActive ? "rgba(34,197,94,0.25)" : "rgba(100,116,139,0.2)"}`,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {isActive ? "● Active" : "○ Inactive"}
            </span>
            <span
              className="rounded-full px-2.5 py-1"
              style={{
                fontSize: "0.6875rem",
                background: "rgba(99,102,241,0.1)",
                color: "var(--text-secondary)",
                border: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              v2.4.1
            </span>
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
            Customer support assistant — GPT-4o · 847 messages today · 96.2% resolution
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex items-center gap-2 rounded-[8px] px-4 py-2 transition-all"
            style={{
              background: isActive ? "rgba(239,68,68,0.08)" : "rgba(34,197,94,0.08)",
              border: `1px solid ${isActive ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)"}`,
              color: isActive ? "var(--error)" : "var(--success)",
              cursor: "pointer",
              fontSize: "0.8125rem",
              fontWeight: 500,
            }}
          >
            {isActive ? <Pause size={13} /> : <Play size={13} />}
            <span>{isActive ? "Pause Bot" : "Activate"}</span>
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Save size={13} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Tabs + Content */}
      <div className="flex gap-5">
        {/* Tab sidebar */}
        <div
          className="shrink-0 p-2 rounded-[12px] flex flex-col gap-1"
          style={{
            width: 192,
            background: "var(--surface)",
            border: "1px solid var(--border-default)",
            height: "fit-content",
          }}
        >
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2.5 rounded-[8px] px-3 py-2.5 w-full text-left transition-all"
              style={{
                background: activeTab === id ? "var(--surface-elevated)" : "transparent",
                color: activeTab === id ? "var(--text-primary)" : "var(--text-tertiary)",
                border: "none",
                cursor: "pointer",
                fontSize: "0.8125rem",
                fontWeight: activeTab === id ? 500 : 400,
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== id) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== id) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
                }
              }}
            >
              {activeTab === id && (
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
                strokeWidth={activeTab === id ? 2 : 1.75}
                style={{ color: activeTab === id ? "var(--brand-indigo)" : "inherit", flexShrink: 0 }}
              />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 min-w-0">
          {/* Instructions tab */}
          {activeTab === "instructions" && (
            <div>
              <ConfigBlock gradient>
                <BlockHeader
                  icon={Sparkles}
                  title="System Instructions"
                  subtitle="Define how the AI should behave and what its purpose is"
                  color="var(--brand-indigo)"
                  bg="rgba(99,102,241,0.12)"
                />
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginBottom: 8,
                    }}
                  >
                    System Prompt
                  </label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={10}
                    className="input-ds"
                    style={{
                      resize: "vertical",
                      fontFamily: "var(--font-family)",
                      lineHeight: 1.6,
                      minHeight: 200,
                    }}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                      {instructions.length} characters · ~{Math.ceil(instructions.split(" ").length / 0.75)} tokens
                    </span>
                    <div className="flex items-center gap-1" style={{ color: "var(--success)" }}>
                      <Info size={12} />
                      <span style={{ fontSize: "0.75rem" }}>Well-structured prompt</span>
                    </div>
                  </div>
                </div>
              </ConfigBlock>

              {/* Tone */}
              <ConfigBlock>
                <BlockHeader
                  icon={MessageSquare}
                  title="Conversation Tone"
                  subtitle="Choose the personality style for responses"
                  color="var(--accent-teal)"
                  bg="rgba(20,184,166,0.1)"
                />
                <div className="flex flex-wrap gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className="rounded-full px-4 py-2 transition-all"
                      style={{
                        background:
                          selectedTone === tone
                            ? "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(59,130,246,0.2))"
                            : "var(--surface-elevated)",
                        border:
                          selectedTone === tone
                            ? "1px solid rgba(99,102,241,0.4)"
                            : "1px solid var(--border-default)",
                        color:
                          selectedTone === tone ? "var(--text-primary)" : "var(--text-tertiary)",
                        fontSize: "0.8125rem",
                        fontWeight: selectedTone === tone ? 500 : 400,
                        cursor: "pointer",
                        boxShadow:
                          selectedTone === tone
                            ? "0 0 12px rgba(99,102,241,0.15)"
                            : "none",
                      }}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </ConfigBlock>
            </div>
          )}

          {/* Rules tab */}
          {activeTab === "rules" && (
            <div>
              <ConfigBlock gradient>
                <BlockHeader
                  icon={Shield}
                  title="Behavior Rules"
                  subtitle="Set guardrails and constraints for the AI"
                  color="#F59E0B"
                  bg="rgba(245,158,11,0.1)"
                />

                <div className="flex flex-col gap-2 mb-4">
                  {rules.map((rule) => (
                    <div
                      key={rule.id}
                      className="flex items-center gap-3 p-3.5 rounded-[8px]"
                      style={{
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border-subtle)",
                        opacity: rule.enabled ? 1 : 0.5,
                      }}
                    >
                      <button
                        onClick={() => toggleRule(rule.id)}
                        className="shrink-0 rounded-full transition-all"
                        style={{
                          width: 20,
                          height: 20,
                          background: rule.enabled
                            ? "var(--success)"
                            : "var(--surface)",
                          border: `1px solid ${rule.enabled ? "var(--success)" : "var(--border-medium)"}`,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {rule.enabled && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        )}
                      </button>
                      <p
                        style={{
                          flex: 1,
                          fontSize: "0.8125rem",
                          color: rule.enabled ? "var(--text-primary)" : "var(--text-tertiary)",
                          fontWeight: 400,
                        }}
                      >
                        {rule.text}
                      </p>
                      <button
                        onClick={() => deleteRule(rule.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--text-tertiary)",
                          cursor: "pointer",
                          padding: 4,
                          borderRadius: 4,
                          transition: "color 150ms",
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
                  ))}
                </div>

                {/* Add rule */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a new rule..."
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addRule()}
                    className="input-ds"
                    style={{ flex: 1 }}
                  />
                  <button
                    onClick={addRule}
                    className="btn-primary flex items-center gap-1.5"
                    style={{ padding: "10px 16px", whiteSpace: "nowrap" }}
                  >
                    <Plus size={13} />
                    Add Rule
                  </button>
                </div>
              </ConfigBlock>
            </div>
          )}

          {/* General tab */}
          {activeTab === "general" && (
            <div>
              <ConfigBlock>
                <BlockHeader
                  icon={Settings}
                  title="Bot Identity"
                  subtitle="Configure the basic identity of your chatbot"
                />
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Bot Name", value: "Support Bot", placeholder: "Enter bot name" },
                    { label: "Display Name", value: "Ava", placeholder: "Name shown to users" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          color: "var(--text-secondary)",
                          marginBottom: 6,
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        type="text"
                        defaultValue={f.value}
                        placeholder={f.placeholder}
                        className="input-ds"
                      />
                    </div>
                  ))}
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
                      Description
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Customer support assistant for Acme Corp"
                      className="input-ds"
                      style={{ resize: "vertical" }}
                    />
                  </div>
                </div>
              </ConfigBlock>

              <ConfigBlock>
                <BlockHeader
                  icon={Globe}
                  title="Language & Region"
                  subtitle="Configure language detection and response settings"
                  color="var(--accent-teal)"
                  bg="rgba(20,184,166,0.1)"
                />
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Primary Language", value: "English (US)" },
                    { label: "Fallback Language", value: "Portuguese (BR)" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          color: "var(--text-secondary)",
                          marginBottom: 6,
                        }}
                      >
                        {f.label}
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
                          {f.value}
                        </span>
                        <ChevronDown size={14} style={{ color: "var(--text-tertiary)" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </ConfigBlock>
            </div>
          )}

          {/* Advanced tab */}
          {activeTab === "advanced" && (
            <div>
              <ConfigBlock gradient>
                <BlockHeader
                  icon={Code}
                  title="AI Model"
                  subtitle="Select the language model powering this bot"
                  color="var(--brand-purple)"
                  bg="rgba(124,58,237,0.1)"
                />
                <div className="grid grid-cols-2 gap-3">
                  {models.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModel(m.id)}
                      className="p-4 rounded-[10px] text-left transition-all"
                      style={{
                        background:
                          selectedModel === m.id
                            ? "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(99,102,241,0.12))"
                            : "var(--surface-elevated)",
                        border:
                          selectedModel === m.id
                            ? "1px solid rgba(99,102,241,0.4)"
                            : "1px solid var(--border-default)",
                        cursor: "pointer",
                        boxShadow: selectedModel === m.id ? "var(--shadow-glow-sm)" : "none",
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color:
                              selectedModel === m.id ? "var(--text-primary)" : "var(--text-secondary)",
                          }}
                        >
                          {m.label}
                        </span>
                        <span
                          className="rounded-full px-2 py-0.5"
                          style={{
                            fontSize: "0.625rem",
                            fontWeight: 600,
                            background:
                              selectedModel === m.id
                                ? "rgba(99,102,241,0.2)"
                                : "rgba(100,116,139,0.15)",
                            color:
                              selectedModel === m.id ? "var(--brand-indigo)" : "var(--text-tertiary)",
                          }}
                        >
                          {m.badge}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                        {m.description}
                      </p>
                    </button>
                  ))}
                </div>
              </ConfigBlock>

              <ConfigBlock>
                <BlockHeader
                  icon={Sliders}
                  title="Parameters"
                  subtitle="Fine-tune model behavior"
                  color="var(--accent-cyan)"
                  bg="rgba(34,211,238,0.1)"
                />

                <div className="flex flex-col gap-5">
                  {/* Temperature */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <label
                          style={{
                            fontSize: "0.8125rem",
                            fontWeight: 500,
                            color: "var(--text-secondary)",
                          }}
                        >
                          Temperature
                        </label>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 1 }}>
                          Controls creativity vs. consistency
                        </p>
                      </div>
                      <span
                        className="rounded-[6px] px-2 py-1"
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "var(--brand-indigo)",
                          background: "rgba(99,102,241,0.1)",
                        }}
                      >
                        {temperature.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={2}
                      step={0.1}
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "var(--brand-indigo)" }}
                    />
                    <div
                      className="flex justify-between"
                      style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", marginTop: 4 }}
                    >
                      <span>Precise</span>
                      <span>Creative</span>
                    </div>
                  </div>

                  {/* Max tokens */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <label
                          style={{
                            fontSize: "0.8125rem",
                            fontWeight: 500,
                            color: "var(--text-secondary)",
                          }}
                        >
                          Max Response Tokens
                        </label>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 1 }}>
                          Maximum length of each AI response
                        </p>
                      </div>
                      <span
                        className="rounded-[6px] px-2 py-1"
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "var(--accent-teal)",
                          background: "rgba(20,184,166,0.1)",
                        }}
                      >
                        {maxTokens}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={256}
                      max={4096}
                      step={128}
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "var(--accent-teal)" }}
                    />
                  </div>
                </div>
              </ConfigBlock>

              <ConfigBlock>
                <BlockHeader
                  icon={Lock}
                  title="Privacy & Security"
                  subtitle="Data handling and compliance settings"
                  color="var(--warning)"
                  bg="rgba(245,158,11,0.1)"
                />
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Enable conversation logging", desc: "Store full chat history", on: true },
                    { label: "PII detection & masking", desc: "Auto-mask sensitive data", on: true },
                    { label: "Human handoff triggers", desc: "Escalate on frustration signals", on: false },
                    { label: "Audit trail", desc: "Log all config changes", on: true },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-3.5 rounded-[8px]"
                      style={{
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border-subtle)",
                      }}
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
              </ConfigBlock>
            </div>
          )}

          {/* Responses tab */}
          {activeTab === "responses" && (
            <div>
              <ConfigBlock>
                <BlockHeader
                  icon={MessageSquare}
                  title="Response Configuration"
                  subtitle="Configure greeting, fallback and closing messages"
                />
                {[
                  { label: "Welcome Message", value: "Hi! I'm Ava, your support assistant. How can I help you today? 👋", rows: 3 },
                  { label: "Fallback Message", value: "I'm sorry, I didn't quite understand that. Could you rephrase your question?", rows: 2 },
                  { label: "Handoff Message", value: "I'll connect you with a human agent right away. Please hold on for a moment.", rows: 2 },
                  { label: "Closing Message", value: "Thank you for contacting us! Is there anything else I can help you with?", rows: 2 },
                ].map((item) => (
                  <div key={item.label} className="mb-4">
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        color: "var(--text-secondary)",
                        marginBottom: 6,
                      }}
                    >
                      {item.label}
                    </label>
                    <textarea
                      rows={item.rows}
                      defaultValue={item.value}
                      className="input-ds"
                      style={{ resize: "vertical" }}
                    />
                  </div>
                ))}
              </ConfigBlock>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ on }: { on: boolean }) {
  const [enabled, setEnabled] = useState(on);
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="rounded-full transition-all shrink-0"
      style={{
        width: 40,
        height: 22,
        background: enabled
          ? "linear-gradient(135deg, #7C3AED, #3B82F6)"
          : "var(--surface)",
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
          top: enabled ? 3 : 2,
          left: enabled ? 21 : 2,
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
