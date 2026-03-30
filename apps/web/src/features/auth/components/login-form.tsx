import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { signIn } from "@workspace/api-client";
import { env } from "@workspace/env/client";
import { signInSchema } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { useState } from "react";

import { SocialButtons } from "./social-buttons";

type LoginFormProps = {
  onSuccess: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [serverError, setServerError] = useState("");

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError("");
      const result = await signIn.email(value);

      if (result.error) {
        setServerError(result.error.message ?? "Sign in failed");
        return;
      }

      onSuccess();
    },
  });

  async function handleGoogleSignIn() {
    await signIn.social({ provider: "google", callbackURL: `${env.VITE_APP_URL}/` });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="p-6 md:p-8"
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-balance">Sign in to Closet</p>
        </div>
        <form.Field name="email">
          {(field) => (
            <Field data-invalid={field.state.meta.errors.length > 0 || undefined}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={field.state.meta.errors.length > 0 || undefined}
              />
              {field.state.meta.errors.map((error) => (
                <FieldDescription key={String(error)}>{String(error)}</FieldDescription>
              ))}
            </Field>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <Field data-invalid={field.state.meta.errors.length > 0 || undefined}>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={field.state.meta.errors.length > 0 || undefined}
              />
              {field.state.meta.errors.map((error) => (
                <FieldDescription key={String(error)}>{String(error)}</FieldDescription>
              ))}
            </Field>
          )}
        </form.Field>
        {serverError && <p className="text-destructive text-sm">{serverError}</p>}
        <Field>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>
            )}
          </form.Subscribe>
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or continue with
        </FieldSeparator>
        <SocialButtons onGoogleClick={handleGoogleSignIn} action="Login" />
        <FieldDescription className="text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline underline-offset-2">
            Sign up
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
