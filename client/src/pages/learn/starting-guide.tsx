import { ArrowLeft, Rocket, CheckCircle2, Target } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    title: "1. Tentukan Niche",
    desc: "Pilih topik yang kamu sukai dan kuasai. Jangan mencoba menjadi segalanya untuk semua orang.",
    icon: Target
  },
  {
    title: "2. Kenali Audiens",
    desc: "Siapa yang akan menonton kontenmu? Apa masalah mereka yang bisa kamu bantu selesaikan?",
    icon: CheckCircle2
  },
  {
    title: "3. Pilih Platform",
    desc: "Fokus pada satu platform dulu (TikTok, Instagram, atau YouTube) sebelum melebar.",
    icon: Rocket
  },
  {
    title: "4. Konsistensi",
    desc: "Buat jadwal posting yang realistis. Kualitas penting, tapi konsistensi membangun kebiasaan penonton.",
    icon: CheckCircle2
  }
];

export default function StartingGuide() {
  return (
    <div className="pb-8 min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3">
        <Link href="/tools">
          <ArrowLeft className="cursor-pointer hover:text-primary" />
        </Link>
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <Rocket className="text-red-400" size={20} /> Ide Awal
        </h1>
      </header>

      <div className="p-4 space-y-6">
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold mb-2">Mulai Perjalananmu</h2>
          <p className="text-muted-foreground">Panduan langkah demi langkah untuk menjadi content creator sukses.</p>
        </div>

        <div className="space-y-4">
          {STEPS.map((step, i) => (
            <Card key={i} className="bg-card/50 border-white/5 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary" />
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl shrink-0">
                    <step.icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 mt-4">
          Buat Rencana Konten Pertamamu
        </Button>
      </div>
    </div>
  );
}
