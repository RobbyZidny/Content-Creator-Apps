import { useState } from "react";
import { ArrowLeft, PenTool, Copy, RefreshCw, Wand2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function AICaptionGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [caption, setCaption] = useState("");
  const [tone, setTone] = useState([50]);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Mock API call
    setTimeout(() => {
      setCaption("✨ Just shipped a new update! 🚀 Can't wait for you all to see what I've been working on. Hard work really pays off when you love what you do. \n\n#coding #developer #techlife #shipping #startup");
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
          <Wand2 className="text-pink-400" size={20} /> AI Captions
        </h1>
      </header>

      <div className="p-4 space-y-6">
        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Description / Context</Label>
              <Textarea 
                placeholder="What is your post about?" 
                className="bg-white/5 border-white/10 min-h-[100px]" 
              />
            </div>
            
            <div className="space-y-4 pt-2">
              <div className="flex justify-between text-sm">
                <Label>Tone: Professional</Label>
                <Label>Casual</Label>
              </div>
              <Slider 
                value={tone} 
                onValueChange={setTone} 
                max={100} 
                step={1} 
                className="[&_.bg-primary]:bg-pink-400"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold"
            >
              {isGenerating ? (
                <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Writing...</>
              ) : (
                <><PenTool className="mr-2 h-4 w-4" /> Generate Caption</>
              )}
            </Button>
          </CardContent>
        </Card>

        {caption && (
          <div className="space-y-2">
            <Label className="px-1">Result</Label>
            <div className="relative">
              <Textarea 
                value={caption} 
                readOnly 
                className="min-h-[150px] bg-card border-white/10 font-mono text-sm leading-relaxed"
              />
              <Button 
                size="sm" 
                variant="secondary" 
                className="absolute bottom-2 right-2 bg-white/10 hover:bg-white/20 text-white"
                onClick={() => navigator.clipboard.writeText(caption)}
              >
                <Copy size={14} className="mr-1" /> Copy
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
