import { env } from "@workspace/env/client";
import { createAuthClient } from "better-auth/react";

export const authClient: ReturnType<typeof createAuthClient> = createAuthClient({
  baseURL: env.VITE_API_URL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
