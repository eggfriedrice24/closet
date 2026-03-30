import { relations } from "drizzle-orm";

import { account } from "./account";
import { session } from "./session";
import { user } from "./user";
import { wardrobeItem } from "./wardrobe-item";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  wardrobeItems: many(wardrobeItem),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const wardrobeItemRelations = relations(wardrobeItem, ({ one }) => ({
  user: one(user, {
    fields: [wardrobeItem.userId],
    references: [user.id],
  }),
}));
