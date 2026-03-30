import Anthropic from "@anthropic-ai/sdk";
import { zValidator } from "@hono/zod-validator";
import { env } from "@workspace/env/server";
import { Hono } from "hono";
import { z } from "zod";

import { requireAuth, type AuthEnv } from "../middleware/auth";

const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

const app = new Hono<AuthEnv>().use(requireAuth).post(
  "/tag-item",
  zValidator(
    "json",
    z.object({
      imageUrl: z.string().url(),
    }),
  ),
  async (c) => {
    const { imageUrl } = c.req.valid("json");

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "url", url: imageUrl },
            },
            {
              type: "text",
              text: `Analyze this clothing item image and return a JSON object with these fields:
- "name": a short descriptive name (e.g. "Blue Denim Jacket", "White Cotton T-Shirt")
- "category": one of [T-shirts, Shirts, Sweaters, Pants, Jeans, Shorts, Skirts, Dresses, Jackets, Coats, Shoes, Bags, Jewelry, Hats] or suggest a new category if none fit
- "color": the primary color
- "style": one of [casual, formal, sporty, streetwear, bohemian, minimalist, vintage, preppy]
- "seasons": array of applicable seasons [spring, summer, fall, winter]
- "occasions": array of applicable occasions [work, casual, party, date, workout, outdoor]
- "brand": brand name if visible, otherwise null

Return ONLY the JSON object, no other text.`,
            },
          ],
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    try {
      const tags = JSON.parse(text);
      return c.json(tags);
    } catch {
      return c.json({ error: "Failed to parse AI response", raw: text }, 500);
    }
  },
);

export default app;
