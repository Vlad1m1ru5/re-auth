import { Layout } from "antd";
import * as React from "react";

export interface AppLayoutProps {
  children?: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Layout>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
}
