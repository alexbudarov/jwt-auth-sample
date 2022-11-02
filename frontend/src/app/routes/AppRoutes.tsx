import { TicketListScreenLayout } from "../screens/ticket/TicketListScreenLayout";
import { Routes, Route } from "react-router-dom";
import { Home } from "../screens/home/Home";
import React from "react";
import { Page404 } from "../../core/routing/Page404";
import { AuthRedirect } from "../../core/security/AuthRedirect";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="auth" element={<AuthRedirect />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Page404 />} />
      <Route path="ticket-list">
        <Route index element={<TicketListScreenLayout />} />
        <Route path=":recordId" element={<TicketListScreenLayout />} />
      </Route>
    </Routes>
  );
}
