import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  nim: text("nim").notNull(),
  major: text("major").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const scheduledPosts = pgTable("scheduled_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  platform: text("platform").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("Planning"),
  scheduledDate: timestamp("scheduled_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertScheduledPostSchema = createInsertSchema(scheduledPosts).omit({
  id: true,
  createdAt: true,
});

export type InsertScheduledPost = z.infer<typeof insertScheduledPostSchema>;
export type ScheduledPost = typeof scheduledPosts.$inferSelect;

export const media = pgTable("media", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMediaSchema = createInsertSchema(media).omit({
  id: true,
  createdAt: true,
});

export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof media.$inferSelect;
