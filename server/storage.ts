import { type User, type InsertUser, type ScheduledPost, type InsertScheduledPost, type Media, type InsertMedia, users, scheduledPosts, media } from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  deleteUser(id: string): Promise<void>;
  
  getScheduledPosts(userId: string): Promise<ScheduledPost[]>;
  createScheduledPost(post: InsertScheduledPost): Promise<ScheduledPost>;
  deleteScheduledPost(id: string): Promise<void>;
  
  getMedia(userId: string): Promise<Media[]>;
  createMedia(mediaItem: InsertMedia): Promise<Media>;
  deleteMedia(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  async getScheduledPosts(userId: string): Promise<ScheduledPost[]> {
    return await db.select().from(scheduledPosts).where(eq(scheduledPosts.userId, userId));
  }

  async createScheduledPost(post: InsertScheduledPost): Promise<ScheduledPost> {
    const result = await db.insert(scheduledPosts).values(post).returning();
    return result[0];
  }

  async deleteScheduledPost(id: string): Promise<void> {
    await db.delete(scheduledPosts).where(eq(scheduledPosts.id, id));
  }

  async getMedia(userId: string): Promise<Media[]> {
    return await db.select().from(media).where(eq(media.userId, userId));
  }

  async createMedia(mediaItem: InsertMedia): Promise<Media> {
    const result = await db.insert(media).values(mediaItem).returning();
    return result[0];
  }

  async deleteMedia(id: string): Promise<void> {
    await db.delete(media).where(eq(media.id, id));
  }
}

export const storage = new DatabaseStorage();
