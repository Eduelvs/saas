import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Layout() {
  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: "var(--bg-primary)", fontFamily: "var(--font-family)" }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: "var(--bg-primary)" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
