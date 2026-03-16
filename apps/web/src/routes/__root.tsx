import { Outlet, createRootRoute } from "@tanstack/react-router";

import { ThemeProvider } from "@/components/theme-provider";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}
