import { ArrowLeft, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

const INTEGRATIONS = [
  { name: "Instagram", connected: true, color: "bg-pink-500" },
  { name: "TikTok", connected: true, color: "bg-black border border-white/20" },
  { name: "YouTube", connected: false, color: "bg-red-500" },
  { name: "Twitter / X", connected: false, color: "bg-blue-400" },
  { name: "Pinterest", connected: false, color: "bg-red-600" },
];

export default function Integrations() {
  return (
    <div className="pb-8 min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3">
        <Link href="/tools">
          <ArrowLeft className="cursor-pointer hover:text-primary" />
        </Link>
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <LinkIcon className="text-cyan-400" size={20} /> Integrations
        </h1>
      </header>

      <div className="p-4 space-y-6">
        <p className="text-sm text-muted-foreground">Connect your social accounts to enable auto-posting and analytics tracking.</p>

        <div className="space-y-3">
          {INTEGRATIONS.map((app, i) => (
            <Card key={i} className="bg-card/50 border-white/5 overflow-hidden">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${app.color} flex items-center justify-center text-white font-bold text-xs`}>
                    {app.name.substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{app.name}</h3>
                    <p className="text-xs text-muted-foreground">{app.connected ? "Connected" : "Not connected"}</p>
                  </div>
                </div>
                <Switch checked={app.connected} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
