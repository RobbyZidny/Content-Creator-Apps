import { ArrowLeft, Lightbulb, Star, Zap } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const INSPIRATIONS = [
  {
    category: "Trending Now",
    items: [
      { title: "Day in the Life", desc: "Show your raw, unfiltered daily routine." },
      { title: "ASMR Packaging", desc: "Satisfying sounds of packing orders or organizing." },
      { title: "AI Art Reveals", desc: "Show the process of creating art with AI tools." }
    ]
  },
  {
    category: "Evergreen",
    items: [
      { title: "Tutorials / How-To", desc: "Teach a specific skill in under 60 seconds." },
      { title: "Myths vs Facts", desc: "Debunk common misconceptions in your niche." },
      { title: "Tools I Use", desc: "Share your favorite apps and equipment." }
    ]
  }
];

export default function Inspiration() {
  return (
    <div className="pb-8 min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3">
        <Link href="/tools">
          <ArrowLeft className="cursor-pointer hover:text-primary" />
        </Link>
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <Lightbulb className="text-yellow-400" size={20} /> Inspirasi Content
        </h1>
      </header>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">Daily Spark</h2>
              <p className="text-white/80">"Document, don't create. Share your learning process."</p>
              <div className="mt-4 flex items-center gap-2 text-yellow-400 text-sm font-bold">
                <Zap size={16} /> Try this today
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-yellow-500/30 blur-3xl rounded-full" />
          </div>

          {INSPIRATIONS.map((section, i) => (
            <div key={i} className="space-y-3">
              <h3 className="font-bold text-lg text-white/90">{section.category}</h3>
              <div className="grid gap-3">
                {section.items.map((item, j) => (
                  <Card key={j} className="bg-card/50 border-white/5 hover:bg-card/80 transition-colors">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="mt-1 bg-white/10 p-2 rounded-lg">
                        <Star size={16} className="text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
