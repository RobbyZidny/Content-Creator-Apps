import { ArrowLeft, Wrench, Smartphone, Video, Mic } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TOOLS = [
  {
    category: "Video Editing",
    icon: Video,
    items: [
      { name: "CapCut", type: "Mobile", cost: "Free/Paid" },
      { name: "DaVinci Resolve", type: "PC", cost: "Free/Paid" },
      { name: "Premiere Pro", type: "PC", cost: "Paid" }
    ]
  },
  {
    category: "Design & Thumbnail",
    icon: Smartphone,
    items: [
      { name: "Canva", type: "Web/App", cost: "Free/Paid" },
      { name: "Figma", type: "Web", cost: "Free" },
      { name: "Snapseed", type: "Mobile", cost: "Free" }
    ]
  },
  {
    category: "Audio & Music",
    icon: Mic,
    items: [
      { name: "Audacity", type: "PC", cost: "Free" },
      { name: "Epidemic Sound", type: "Web", cost: "Paid" },
      { name: "Adobe Podcast", type: "Web", cost: "Free (AI)" }
    ]
  }
];

export default function ToolsGuide() {
  return (
    <div className="pb-8 min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3">
        <Link href="/tools">
          <ArrowLeft className="cursor-pointer hover:text-primary" />
        </Link>
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <Wrench className="text-blue-400" size={20} /> Tools Guide
        </h1>
      </header>

      <div className="p-4 space-y-6">
        <p className="text-muted-foreground text-sm">Rekomendasi alat tempur untuk content creator dari pemula hingga pro.</p>

        {TOOLS.map((cat, i) => (
          <div key={i} className="space-y-3">
            <h3 className="font-bold text-lg flex items-center gap-2 text-white">
              <cat.icon size={18} className="text-primary" /> {cat.category}
            </h3>
            <div className="grid gap-3">
              {cat.items.map((tool, j) => (
                <Card key={j} className="bg-card/50 border-white/5">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-white">{tool.name}</h4>
                      <Badge variant="outline" className="text-[10px] mt-1 text-white/60 border-white/10">{tool.type}</Badge>
                    </div>
                    <Badge className={tool.cost.includes("Free") ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                      {tool.cost}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
