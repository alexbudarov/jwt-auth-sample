import React from "react";
import { observer } from "mobx-react";
import { Layout } from "antd";
import { AppHeader } from "../header/Header";
import { AppRoutes } from "../routes/AppRoutes";
import { AppErrorBoundary } from "../../core/error/ErrorBoundary";

export const AppMain = observer(() => {
  return (
    <Layout className="main-layout">
      <Layout.Header>
        <AppHeader />
      </Layout.Header>
      <Layout className="layout-container">
        <Layout className="layout-content">
          <Layout.Content>
            <AppErrorBoundary>
              <AppRoutes />
            </AppErrorBoundary>
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
});
