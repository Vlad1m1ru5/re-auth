import { Col, Row } from "antd";
import * as React from "react";

export interface AppGridProps {
  children?: React.ReactNode;
}

export function AppGrid({ children }: AppGridProps) {
  return (
    <Row justify="center">
      <Col>{children}</Col>
    </Row>
  );
}
