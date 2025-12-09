import { ArrowLeft, UserPlus, MessageCircle, MapPin } from "lucide-react";
import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CREATORS = [
  { name: "Jessica Lin", niche: "Lifestyle & Beauty", location: "Jakarta", status: "Open to Collab" },
  { name: "Budi Santoso", niche: "Tech Reviewer", location: "Surabaya", status: "Busy" },
  { name: "Arief Muhammad", niche: "Comedy / Skits", location: "Bandung", status: "Open to Collab" },
  { name: "Sarah Digi", niche: "Digital Art", location: "Bali", status: "Open to Collab" },
  { name: "Rizky Gamer", niche: "Gaming", location: "Jakarta", status: "Busy" }
];

export default function Friends() {
  return (
    <div className="pb-8 min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3">
        <Link href="/tools">
          <ArrowLeft className="cursor-pointer hover:text-primary" />
        </Link>
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <UserPlus className="text-cyan-400" size={20} /> Teman Creator
        </h1>
      </header>

      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-xl border border-cyan-500/20 mb-4">
          <h2 className="font-bold text-lg text-white">Expand Your Circle 🌐</h2>
          <p className="text-sm text-white/80">Temukan kreator lain di sekitarmu untuk kolaborasi.</p>
        </div>

        {CREATORS.map((creator, i) => (
          <Card key={i} className="bg-card/50 border-white/5">
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar className="h-12 w-12 border border-white/10">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 20}`} />
                <AvatarFallback>{creator.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-white">{creator.name}</h3>
                <p className="text-xs text-primary font-medium">{creator.niche}</p>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                  <MapPin size={10} /> {creator.location} • <span className={creator.status === "Open to Collab" ? "text-green-400" : "text-yellow-400"}>{creator.status}</span>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="hover:text-primary hover:bg-white/5">
                <MessageCircle size={20} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
