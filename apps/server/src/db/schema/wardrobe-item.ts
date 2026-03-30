import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { user } from "./user";

export const wardrobeItem = pgTable("wardrobe_item", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  imageKey: text("image_key").notNull(),
  category: text("category").notNull(),
  color: text("color"),
  style: text("style"),
  season: text("season").array(),
  occasion: text("occasion").array(),
  brand: text("brand"),
  notes: text("notes"),
  aiTagsAccepted: boolean("ai_tags_accepted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertWardrobeItemSchema = createInsertSchema(wardrobeItem);
export const selectWardrobeItemSchema = createSelectSchema(wardrobeItem);

export type InsertWardrobeItem = typeof wardrobeItem.$inferInsert;
export type SelectWardrobeItem = typeof wardrobeItem.$inferSelect;
