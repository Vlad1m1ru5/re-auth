import { Card } from "antd";
import * as React from "react";

export interface AppCardProps {
  children?: React.ReactNode;
}

export function AppCard({ children }: AppCardProps) {
  return <Card bordered={false}>{children}</Card>;
}
