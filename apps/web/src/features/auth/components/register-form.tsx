import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { signIn, signUp } from "@workspace/api-client";
import { env } from "@workspace/env/client";
import { registerSchema } from "@workspace/shared";
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

type RegisterFormProps = {
  onSuccess: () => void;
};

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [serverError, setServerError] = useState("");

  const form = useForm({
    defaultValues: { name: "", email: "", password: "" },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError("");
      const result = await signUp.email(value);

      if (result.error) {
        setServerError(result.error.message ?? "Registration failed");
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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">Get started with Closet</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <form.Field name="name">
            {(field) => (
              <Field data-invalid={field.state.meta.errors.length > 0 || undefined}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
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
        </div>
        <form.Field name="password">
          {(field) => (
            <Field data-invalid={field.state.meta.errors.length > 0 || undefined}>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <span className="text-muted-foreground ml-auto text-sm">Min. 8 characters</span>
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
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
            )}
          </form.Subscribe>
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or continue with
        </FieldSeparator>
        <SocialButtons onGoogleClick={handleGoogleSignIn} action="Sign up" />
        <FieldDescription className="text-center">
          Already have an account?{" "}
          <Link to="/sign-in" className="underline underline-offset-2">
            Sign in
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
