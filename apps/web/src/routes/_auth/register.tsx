import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { RegisterForm } from "@/features/auth/components/register-form";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  return <RegisterForm onSuccess={() => navigate({ to: "/" })} />;
}
