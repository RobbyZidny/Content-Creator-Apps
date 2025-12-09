import { useState, useEffect } from "react";
import { ArrowLeft, Calendar as CalendarIcon, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";
import type { ScheduledPost } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function ContentPlanner() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    type: "",
    status: "Planning",
    scheduledDate: "",
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getPosts();
      setPosts(data);
    } catch (error) {
      if (error instanceof Error && error.message === "Tidak terautentikasi") {
        setLocation("/");
        return;
      }
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal memuat data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.platform || !formData.type || !formData.scheduledDate) {
      toast({
        title: "Error",
        description: "Semua field harus diisi",
        variant: "destructive",
      });
      return;
    }

    try {
      await api.createPost({
        title: formData.title,
        platform: formData.platform,
        type: formData.type,
        status: formData.status,
        scheduledDate: new Date(formData.scheduledDate),
        userId: "", // Will be set by backend
      });

      toast({
        title: "Berhasil",
        description: "Post berhasil dijadwalkan",
      });

      // Reset form
      setFormData({
        title: "",
        platform: "",
        type: "",
        status: "Planning",
        scheduledDate: "",
      });
      setIsDialogOpen(false);
      
      // Reload posts
      loadPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal membuat post",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus post ini?")) return;

    try {
      await api.deletePost(id);
      toast({
        title: "Berhasil",
        description: "Post berhasil dihapus",
      });
      loadPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menghapus post",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pb-8 min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3">
        <Link href="/tools">
          <ArrowLeft className="cursor-pointer hover:text-primary" data-testid="button-back" />
        </Link>
        <h1 className="text-xl font-display font-bold" data-testid="text-title">Content Planner</h1>
      </header>

      <div className="p-4 space-y-6">
        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-white/5 bg-black/20"
              data-testid="calendar-main"
            />
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold" data-testid="text-upcoming">Upcoming Content</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90" data-testid="button-add">
                <Plus size={16} className="mr-1" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Schedule Content</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input 
                    placeholder="e.g., Summer Vlog" 
                    className="bg-white/5 border-white/10"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    data-testid="input-title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={formData.platform} onValueChange={(value) => setFormData({ ...formData, platform: value })}>
                    <SelectTrigger className="bg-white/5 border-white/10" data-testid="select-platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="bg-white/5 border-white/10" data-testid="select-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reel">Reel</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Post">Post</SelectItem>
                      <SelectItem value="Story">Story</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger className="bg-white/5 border-white/10" data-testid="select-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Ready">Ready</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input 
                    type="datetime-local" 
                    className="bg-white/5 border-white/10"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    data-testid="input-date"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary" data-testid="button-submit">Save Schedule</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {loading ? (
            <p className="text-center text-muted-foreground py-8" data-testid="text-loading">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8" data-testid="text-empty">Belum ada post terjadwal</p>
          ) : (
            posts.map((post) => {
              const postDate = new Date(post.scheduledDate);
              return (
                <div key={post.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/5" data-testid={`card-post-${post.id}`}>
                  <div className="flex-col flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-xs text-muted-foreground">{postDate.toLocaleString('default', { month: 'short' })}</span>
                    <span className="font-bold text-lg">{postDate.getDate()}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold" data-testid={`text-post-title-${post.id}`}>{post.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px] h-5" data-testid={`badge-platform-${post.id}`}>{post.platform}</Badge>
                      <Badge variant="secondary" className="text-[10px] h-5" data-testid={`badge-type-${post.id}`}>{post.type}</Badge>
                      <Badge variant="outline" className="text-[10px] h-5 border-white/10" data-testid={`badge-status-${post.id}`}>{post.status}</Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-muted-foreground hover:text-white" data-testid={`button-menu-${post.id}`}>
                        <MoreHorizontal size={20} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-card border-white/10">
                      <DropdownMenuItem 
                        onClick={() => handleDelete(post.id)} 
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                        data-testid={`button-delete-${post.id}`}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
