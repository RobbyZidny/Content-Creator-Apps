import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Settings, Grid, Bookmark, Film, Edit3, LogOut, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import avatarImage from "@assets/generated_images/cool_3d_avatar_of_a_student_creator.png";
import { api } from "@/lib/api";
import type { User } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const user = await api.getCurrentUser();
      setProfile(user);
    } catch (error) {
      if (error instanceof Error && error.message === "Tidak terautentikasi") {
        setLocation("/");
        return;
      }
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal memuat profil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      toast({
        title: "Berhasil",
        description: "Berhasil logout",
      });
      setLocation("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal logout",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Yakin ingin menghapus akun? Semua data akan hilang.")) {
      toast({
        title: "Info",
        description: "Fitur hapus akun belum tersedia",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground" data-testid="text-loading">Loading...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-display font-bold" data-testid="text-username">{profile.username}</h1>
        <div className="flex gap-4 items-center">
          <Edit3 size={24} className="cursor-pointer hover:text-primary" data-testid="button-edit" />
          
          <Dialog>
            <DialogTrigger asChild>
              <Settings size={24} className="cursor-pointer hover:text-primary" data-testid="button-settings" />
            </DialogTrigger>
            <DialogContent className="bg-card border-white/10 text-white w-[90%] rounded-xl">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription className="text-muted-foreground">Manage your account preferences</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-white/10 hover:bg-white/5 hover:text-white" 
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 border border-red-500/20" 
                  onClick={handleDeleteAccount}
                  data-testid="button-delete-account"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="px-4 pt-4 pb-8">
        {/* Profile Info */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-primary via-secondary to-primary animate-gradient bg-[length:200%_200%]">
              <div className="w-full h-full rounded-full bg-black p-[2px]">
                <img src={avatarImage} alt="Profile" className="w-full h-full rounded-full object-cover bg-muted" data-testid="img-avatar" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-secondary text-black text-xs font-bold px-2 py-0.5 rounded-full border-2 border-background">
              PRO
            </div>
          </div>
          
          <h2 className="text-2xl font-display font-bold text-center" data-testid="text-profile-name">{profile.username}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span className="bg-white/5 px-2 py-0.5 rounded text-xs border border-white/5" data-testid="text-nim">NIM: {profile.nim}</span>
            <span>•</span>
            <span className="text-primary" data-testid="text-major">{profile.major}</span>
          </div>

          <p className="text-center mt-4 text-sm text-white/80 max-w-xs">
            Digital creator & student. Building the future one pixel at a time. 🎨✨
          </p>

          {/* Stats */}
          <div className="flex justify-around w-full mt-6 border-y border-white/5 py-4">
            <div className="text-center">
              <div className="font-bold text-lg" data-testid="text-posts-count">1.2k</div>
              <div className="text-xs text-muted-foreground">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg" data-testid="text-followers-count">45.5k</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg" data-testid="text-following-count">342</div>
              <div className="text-xs text-muted-foreground">Following</div>
            </div>
          </div>

          <div className="flex gap-2 w-full mt-6">
            <Button className="flex-1 bg-primary hover:bg-primary/90" data-testid="button-follow">Follow</Button>
            <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5" data-testid="button-message">Message</Button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="w-full bg-transparent border-b border-white/5 p-0 h-12 rounded-none">
            <TabsTrigger 
              value="grid" 
              className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              data-testid="tab-grid"
            >
              <Grid size={20} />
            </TabsTrigger>
            <TabsTrigger 
              value="reels" 
              className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              data-testid="tab-reels"
            >
              <Film size={20} />
            </TabsTrigger>
            <TabsTrigger 
              value="saved" 
              className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              data-testid="tab-saved"
            >
              <Bookmark size={20} />
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="aspect-square bg-muted relative group overflow-hidden"
                  data-testid={`img-grid-${i}`}
                >
                   <img 
                    src={`https://images.unsplash.com/photo-${1550000000000 + i}?w=400&h=400&fit=crop`} 
                    alt="Post" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reels">
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Film size={48} className="mb-4 opacity-20" />
              <p data-testid="text-no-reels">No reels yet</p>
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Bookmark size={48} className="mb-4 opacity-20" />
              <p data-testid="text-private-collection">Private collection</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
