import { zValidator } from "@hono/zod-validator";
import { eq, and } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "../db";
import { wardrobeItem } from "../db/schema/index";
import { requireAuth, type AuthEnv } from "../middleware/auth";

const app = new Hono<AuthEnv>()
  .use(requireAuth)
  .get("/", async (c) => {
    const userId = c.get("user").id;
    const category = c.req.query("category");

    const items = category
      ? await db
          .select()
          .from(wardrobeItem)
          .where(and(eq(wardrobeItem.userId, userId), eq(wardrobeItem.category, category)))
      : await db.select().from(wardrobeItem).where(eq(wardrobeItem.userId, userId));
    return c.json(items);
  })
  .get("/:id", async (c) => {
    const userId = c.get("user").id;
    const id = c.req.param("id");

    const [item] = await db
      .select()
      .from(wardrobeItem)
      .where(and(eq(wardrobeItem.id, id), eq(wardrobeItem.userId, userId)));

    if (!item) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json(item);
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string().min(1),
        imageUrl: z.string().url(),
        imageKey: z.string().min(1),
        category: z.string().min(1),
        color: z.string().nullable().optional(),
        style: z.string().nullable().optional(),
        season: z.array(z.string()).nullable().optional(),
        occasion: z.array(z.string()).nullable().optional(),
        brand: z.string().nullable().optional(),
        notes: z.string().nullable().optional(),
        aiTagsAccepted: z.boolean().default(false),
      }),
    ),
    async (c) => {
      const userId = c.get("user").id;
      const data = c.req.valid("json");
      const id = crypto.randomUUID();

      const [item] = await db
        .insert(wardrobeItem)
        .values({ id, userId, ...data })
        .returning();

      return c.json(item, 201);
    },
  )
  .patch(
    "/:id",
    zValidator(
      "json",
      z.object({
        name: z.string().min(1).optional(),
        category: z.string().min(1).optional(),
        color: z.string().nullable().optional(),
        style: z.string().nullable().optional(),
        season: z.array(z.string()).nullable().optional(),
        occasion: z.array(z.string()).nullable().optional(),
        brand: z.string().nullable().optional(),
        notes: z.string().nullable().optional(),
      }),
    ),
    async (c) => {
      const userId = c.get("user").id;
      const id = c.req.param("id");
      const data = c.req.valid("json");

      const [item] = await db
        .update(wardrobeItem)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(wardrobeItem.id, id), eq(wardrobeItem.userId, userId)))
        .returning();

      if (!item) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(item);
    },
  )
  .delete("/:id", async (c) => {
    const userId = c.get("user").id;
    const id = c.req.param("id");

    const [item] = await db
      .delete(wardrobeItem)
      .where(and(eq(wardrobeItem.id, id), eq(wardrobeItem.userId, userId)))
      .returning();

    if (!item) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json({ success: true });
  });

export default app;
