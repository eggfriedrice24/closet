import { serve } from "@hono/node-server";
import { env } from "@workspace/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { auth } from "./auth";
import aiRoutes from "./routes/ai";
import { uploadHandlers } from "./routes/upload";
import wardrobeRoutes from "./routes/wardrobe";

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

app.all("/api/uploadthing", (c) => uploadHandlers(c.req.raw));

app.route("/api/wardrobe", wardrobeRoutes);
app.route("/api/ai", aiRoutes);

app.get("/", (c) => {
  return c.json({ message: "Closet API" });
});

const port = 3001;

// eslint-disable-next-line no-console
console.log(`Server running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });

export type AppType = typeof app;
