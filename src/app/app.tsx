import * as React from "react";
import { AppCard, AppForm, AppGrid, AppLayout } from "~/components";

export function App() {
  return (
    <AppLayout>
      <AppGrid>
        <AppCard>
          <AppForm />
        </AppCard>
      </AppGrid>
    </AppLayout>
  );
}
