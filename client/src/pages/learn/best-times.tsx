import { ArrowLeft, Clock, Calendar, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BestTimes() {
  return (
    <div className="pb-8 min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3">
        <Link href="/tools">
          <ArrowLeft className="cursor-pointer hover:text-primary" />
        </Link>
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <Clock className="text-green-400" size={20} /> Jam Upload
        </h1>
      </header>

      <div className="p-4 space-y-6">
        <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/20">
           <h2 className="font-bold text-lg mb-1">Golden Rule 💡</h2>
           <p className="text-sm text-white/80">"Waktu terbaik adalah saat audiensmu paling aktif. Cek analytics untuk data akurat."</p>
        </div>

        <Tabs defaultValue="instagram" className="w-full">
          <TabsList className="w-full bg-card/50 border border-white/5 mb-4">
            <TabsTrigger value="instagram" className="flex-1">IG</TabsTrigger>
            <TabsTrigger value="tiktok" className="flex-1">TikTok</TabsTrigger>
            <TabsTrigger value="youtube" className="flex-1">YouTube</TabsTrigger>
          </TabsList>

          <TabsContent value="instagram" className="space-y-4">
            <TimeCard day="Senin" times={["11:00 AM", "12:00 PM"]} />
            <TimeCard day="Selasa" times={["11:00 AM", "02:00 PM"]} />
            <TimeCard day="Rabu" times={["11:00 AM", "12:00 PM"]} />
            <TimeCard day="Kamis" times={["11:00 AM"]} highlight />
            <TimeCard day="Jumat" times={["11:00 AM", "02:00 PM"]} />
          </TabsContent>

          <TabsContent value="tiktok" className="space-y-4">
            <TimeCard day="Senin" times={["06:00 AM", "10:00 AM", "10:00 PM"]} />
            <TimeCard day="Selasa" times={["02:00 AM", "04:00 AM", "09:00 AM"]} highlight />
            <TimeCard day="Rabu" times={["07:00 AM", "08:00 AM", "11:00 PM"]} />
            <TimeCard day="Kamis" times={["09:00 AM", "12:00 PM", "07:00 PM"]} highlight />
            <TimeCard day="Jumat" times={["05:00 AM", "01:00 PM", "03:00 PM"]} />
          </TabsContent>

          <TabsContent value="youtube" className="space-y-4">
             <TimeCard day="Weekdays" times={["02:00 PM", "04:00 PM"]} />
             <TimeCard day="Weekends" times={["09:00 AM", "11:00 AM"]} highlight />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TimeCard({ day, times, highlight }: { day: string, times: string[], highlight?: boolean }) {
  return (
    <Card className={`border-white/5 ${highlight ? 'bg-primary/10 border-primary/30' : 'bg-card/50'}`}>
      <CardContent className="p-4 flex justify-between items-center">
        <span className="font-bold">{day}</span>
        <div className="flex gap-2">
          {times.map((t, i) => (
            <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-md font-mono">{t}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
