import React from "react";
import { createBrowserRouter } from "react-router";

import { Layout } from "./components/layout/Layout";
import { ChatbotConfig, Dashboard, DesignSystem, Integrations, Login, Messages, SettingsPage } from "./pages";
function NotFound() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-[#F8FAFC] mb-2">404 — Page Not Found</h1>
        <p className="text-[#64748B]">This page doesn't exist yet.</p>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "chatbot", Component: ChatbotConfig },
      { path: "messages", Component: Messages },
      { path: "integrations", Component: Integrations },
      { path: "settings", Component: SettingsPage },
      { path: "design-system", Component: DesignSystem },
      { path: "*", Component: NotFound },
    ],
  },
]);
