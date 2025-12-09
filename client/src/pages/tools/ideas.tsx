import { useState } from "react";
import { ArrowLeft, Sparkles, Copy, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

export default function AIContentIdeas() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState<string[]>([]);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Mock API call
    setTimeout(() => {
      setIdeas([
        "Day in the life of a student creator: Behind the scenes",
        "Top 5 study hacks using AI tools",
        "How to balance coding and social life",
        "My desk setup tour 2025",
        "React vs Vue: A student perspective"
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="pb-8 min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3">
        <Link href="/tools">
          <ArrowLeft className="cursor-pointer hover:text-primary" />
        </Link>
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <Sparkles className="text-primary" size={20} /> AI Ideas
        </h1>
      </header>

      <div className="p-4 space-y-6">
        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Niche / Topic</Label>
              <Input placeholder="e.g., Tech, Lifestyle, Coding" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold"
            >
              {isGenerating ? (
                <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                <><Sparkles className="mr-2 h-4 w-4" /> Generate Ideas</>
              )}
            </Button>
          </CardContent>
        </Card>

        {ideas.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold px-1">Generated Ideas</h2>
            {ideas.map((idea, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-card border border-white/5 flex justify-between items-start gap-3 group"
              >
                <p className="text-sm leading-relaxed text-white/90">{idea}</p>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary shrink-0">
                  <Copy size={16} />
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
