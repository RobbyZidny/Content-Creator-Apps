import { useState, useEffect } from "react";
import { ArrowLeft, Image as ImageIcon, Trash2, Upload, Plus } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import type { Media } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function MediaManager() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const data = await api.getMedia();
      setMedia(data);
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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadUrl.trim()) {
      toast({
        title: "Error",
        description: "URL gambar harus diisi",
        variant: "destructive",
      });
      return;
    }

    try {
      await api.uploadMedia(uploadUrl);
      toast({
        title: "Berhasil",
        description: "Media berhasil diupload",
      });
      setUploadUrl("");
      setIsDialogOpen(false);
      loadMedia();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal mengupload media",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus media ini?")) return;

    try {
      await api.deleteMedia(id);
      toast({
        title: "Berhasil",
        description: "Media berhasil dihapus",
      });
      loadMedia();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menghapus media",
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
        <h1 className="text-xl font-display font-bold flex items-center gap-2" data-testid="text-title">
          <ImageIcon className="text-purple-400" size={20} /> Media Manager
        </h1>
      </header>

      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground" data-testid="text-count">{media.length} items</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90" data-testid="button-upload">
                <Upload size={16} className="mr-2" /> Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Upload Media</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input 
                    placeholder="https://example.com/image.jpg" 
                    className="bg-white/5 border-white/10"
                    value={uploadUrl}
                    onChange={(e) => setUploadUrl(e.target.value)}
                    data-testid="input-url"
                  />
                  <p className="text-xs text-muted-foreground">
                    Contoh: https://images.unsplash.com/photo-...
                  </p>
                </div>
                <Button type="submit" className="w-full bg-primary" data-testid="button-submit">
                  Upload
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground py-8" data-testid="text-loading">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence>
              {media.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  layout
                  className="relative group rounded-xl overflow-hidden aspect-square border border-white/10"
                  data-testid={`card-media-${item.id}`}
                >
                  <img src={item.url} alt="Uploaded" className="w-full h-full object-cover" data-testid={`img-media-${item.id}`} />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="h-10 w-10 rounded-full"
                      onClick={() => handleDelete(item.id)}
                      data-testid={`button-delete-${item.id}`}
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                </motion.div>
              ))}
              
              {/* Upload Placeholder */}
              <motion.div 
                layout
                onClick={() => setIsDialogOpen(true)}
                className="aspect-square rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary hover:bg-white/5 transition-colors text-muted-foreground hover:text-primary"
                data-testid="button-add-placeholder"
              >
                <Plus size={32} />
                <span className="text-xs font-bold">Add Image</span>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
