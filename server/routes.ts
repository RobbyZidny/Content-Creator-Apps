import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import { insertUserSchema, insertScheduledPostSchema, insertMediaSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username sudah digunakan" });
      }
      
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });
      
      req.session.userId = user.id;
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Terjadi kesalahan saat mendaftar" });
    }
  });
  
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username dan password harus diisi" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Username atau password salah" });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Username atau password salah" });
      }
      
      req.session.userId = user.id;
      
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat login" });
    }
  });
  
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Terjadi kesalahan saat logout" });
      }
      res.json({ message: "Logout berhasil" });
    });
  });
  
  app.get("/api/user", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Tidak terautentikasi" });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        req.session.destroy(() => {});
        return res.status(401).json({ message: "User tidak ditemukan" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat mengambil data user" });
    }
  });

  app.get("/api/posts", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Tidak terautentikasi" });
    }
    
    try {
      const posts = await storage.getScheduledPosts(req.session.userId);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat mengambil data post" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Tidak terautentikasi" });
    }
    
    try {
      const validatedData = insertScheduledPostSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });
      
      const post = await storage.createScheduledPost(validatedData);
      res.json(post);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Terjadi kesalahan saat membuat post" });
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Tidak terautentikasi" });
    }
    
    try {
      await storage.deleteScheduledPost(req.params.id);
      res.json({ message: "Post berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat menghapus post" });
    }
  });

  app.get("/api/media", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Tidak terautentikasi" });
    }
    
    try {
      const mediaItems = await storage.getMedia(req.session.userId);
      res.json(mediaItems);
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat mengambil data media" });
    }
  });

  app.post("/api/media/upload", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Tidak terautentikasi" });
    }
    
    try {
      const validatedData = insertMediaSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });
      
      const mediaItem = await storage.createMedia(validatedData);
      res.json(mediaItem);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Terjadi kesalahan saat mengupload media" });
    }
  });

  app.delete("/api/media/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Tidak terautentikasi" });
    }
    
    try {
      await storage.deleteMedia(req.params.id);
      res.json({ message: "Media berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat menghapus media" });
    }
  });

  return httpServer;
}
