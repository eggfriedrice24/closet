import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { signIn } from "@workspace/api-client";
import { env } from "@workspace/env/client";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useState } from "react";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCredentialsSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn.email({ email, password });

    if (result.error) {
      setError(result.error.message ?? "Sign in failed");
      setLoading(false);
      return;
    }

    navigate({ to: "/" });
  }

  async function handleGoogleSignIn() {
    await signIn.social({ provider: "google", callbackURL: `${env.VITE_APP_URL}/` });
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold">Sign In</h1>
          <p className="text-muted-foreground text-sm">Welcome back to Closet Command</p>
        </div>

        <form onSubmit={handleCredentialsSignIn} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="bg-border h-px flex-1" />
          <span className="text-muted-foreground text-xs">or</span>
          <div className="bg-border h-px flex-1" />
        </div>

        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
          Continue with Google
        </Button>

        <p className="text-muted-foreground mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-foreground underline">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}
