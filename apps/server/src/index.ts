import { serve } from "@hono/node-server";
import { env } from "@workspace/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { auth } from "./auth";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: env.TRUSTED_ORIGINS.split(","),
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/", (c) => {
  return c.json({ message: "Closet Command API" });
});

const port = 3001;

// eslint-disable-next-line no-console
console.log(`Server running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });

export type AppType = typeof app;
