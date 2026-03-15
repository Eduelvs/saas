import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
export function TopbarProfile() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-[8px] pl-1 pr-2 transition-all hover:bg-(--surface-elevated) hover:border-(--border-medium)"
          style={{
            height: 36,
            background: "var(--surface)",
            border: "1px solid var(--border-default)",
            cursor: "pointer",
          }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 26,
              height: 26,
              background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
              fontSize: "0.625rem",
              fontWeight: 600,
              color: "#fff",
            }}
          >
            AC
          </div>
          <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-primary)" }}>
            Alex
          </span>
          <ChevronDown size={12} style={{ color: "var(--text-tertiary)" }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-[200px] rounded-[10px] border border-(--border-default) bg-(--surface-elevated) p-1 shadow-lg"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        <DropdownMenuLabel className="px-2 py-1.5 font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              Alex
            </span>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              alex@exemplo.com
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-(--border-subtle)" />
        <DropdownMenuItem
          className="rounded-[6px] cursor-pointer"
          style={{ color: "var(--text-secondary)" }}
          onSelect={(e) => e.preventDefault()}
        >
          <User className="size-4" />
          Meu perfil
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-[6px] cursor-pointer"
          style={{ color: "var(--text-secondary)" }}
          onSelect={(e) => e.preventDefault()}
        >
          <Settings className="size-4" />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-(--border-subtle)" />
        <DropdownMenuItem
          variant="destructive"
          className="rounded-[6px] cursor-pointer focus:bg-(--error-subtle) focus:text-(--error)"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <LogOut className="size-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
