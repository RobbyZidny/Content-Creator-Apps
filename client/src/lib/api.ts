import type { User, ScheduledPost, Media, InsertScheduledPost, InsertMedia } from "@shared/schema";

interface RegisterData {
  username: string;
  password: string;
  nim: string;
  major: string;
}

interface LoginData {
  username: string;
  password: string;
}

export const api = {
  async register(data: RegisterData): Promise<User> {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Gagal mendaftar");
    }
    return res.json();
  },

  async login(data: LoginData): Promise<User> {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Gagal login");
    }
    return res.json();
  },

  async logout(): Promise<void> {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Gagal logout");
    }
  },

  async getCurrentUser(): Promise<User> {
    const res = await fetch("/api/user", {
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Tidak terautentikasi");
    }
    return res.json();
  },

  async getPosts(): Promise<ScheduledPost[]> {
    const res = await fetch("/api/posts", {
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Gagal mengambil data post");
    }
    return res.json();
  },

  async createPost(data: Omit<InsertScheduledPost, "userId">): Promise<ScheduledPost> {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Gagal membuat post");
    }
    return res.json();
  },

  async deletePost(id: string): Promise<void> {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Gagal menghapus post");
    }
  },

  async getMedia(): Promise<Media[]> {
    const res = await fetch("/api/media", {
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Gagal mengambil data media");
    }
    return res.json();
  },

  async uploadMedia(url: string): Promise<Media> {
    const res = await fetch("/api/media/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Gagal mengupload media");
    }
    return res.json();
  },

  async deleteMedia(id: string): Promise<void> {
    const res = await fetch(`/api/media/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Gagal menghapus media");
    }
  },
};
