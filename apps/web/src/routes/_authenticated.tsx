import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authClient } from "@workspace/api-client";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const session = await authClient.getSession();

    if (!session.data) {
      throw redirect({ to: "/sign-in" });
    }

    return { user: session.data.user };
  },
  component: () => <Outlet />,
});
