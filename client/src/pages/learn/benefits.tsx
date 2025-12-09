import { ArrowLeft, TrendingUp, DollarSign, Briefcase, Heart } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

const BENEFITS = [
  {
    title: "Personal Branding",
    desc: "Membangun reputasi dan dikenal sebagai ahli di bidangmu.",
    icon: Heart,
    color: "text-pink-400"
  },
  {
    title: "Monetisasi",
    desc: "Potensi penghasilan dari ads, endorsement, affiliate, dan produk digital.",
    icon: DollarSign,
    color: "text-green-400"
  },
  {
    title: "Networking",
    desc: "Bertemu dengan orang-orang hebat dan kolaborasi yang membuka peluang baru.",
    icon: Briefcase,
    color: "text-blue-400"
  },
  {
    title: "Skill Development",
    desc: "Otomatis belajar skill baru: public speaking, editing, desain, dan marketing.",
    icon: TrendingUp,
    color: "text-purple-400"
  }
];

export default function Benefits() {
  return (
    <div className="pb-8 min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3">
        <Link href="/tools">
          <ArrowLeft className="cursor-pointer hover:text-primary" />
        </Link>
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <DollarSign className="text-yellow-400" size={20} /> Keuntungan
        </h1>
      </header>

      <div className="p-4 space-y-6">
        <div className="text-center py-4">
          <h2 className="text-3xl font-bold mb-2 font-display bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">Why Create?</h2>
        </div>

        <div className="grid gap-4">
          {BENEFITS.map((item, i) => (
            <Card key={i} className="bg-card/50 border-white/5 hover:bg-card/80 transition-all">
              <CardContent className="p-5 flex gap-4 items-center">
                <div className={`p-3 rounded-full bg-white/5 ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
