import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { LoginForm } from "@/features/auth/components/login-form";

export const Route = createFileRoute("/_auth/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  return <LoginForm onSuccess={() => navigate({ to: "/" })} />;
}
