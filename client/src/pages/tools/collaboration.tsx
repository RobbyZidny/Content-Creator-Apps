import { ArrowLeft, Users, UserPlus, Mail, Check } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const COLLABORATORS = [
  { name: "Sarah Editor", role: "Editor", status: "Active", avatar: "S" },
  { name: "Mike Manager", role: "Manager", status: "Active", avatar: "M" },
  { name: "Jenny Design", role: "Designer", status: "Pending", avatar: "J" },
];

export default function Collaboration() {
  return (
    <div className="pb-8 min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3">
        <Link href="/tools">
          <ArrowLeft className="cursor-pointer hover:text-primary" />
        </Link>
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <Users className="text-orange-400" size={20} /> Team
        </h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Invite */}
        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-4 space-y-4">
            <h2 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Invite Collaborator</h2>
            <div className="flex gap-2">
              <Input placeholder="email@example.com" className="bg-white/5 border-white/10" />
              <Button size="icon" className="bg-primary hover:bg-primary/90 shrink-0">
                <UserPlus size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Team List */}
        <div className="space-y-3">
          <h2 className="font-bold text-sm text-muted-foreground uppercase tracking-wider px-1">Active Members</h2>
          {COLLABORATORS.map((member, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/5">
              <Avatar className="h-10 w-10 border border-white/10">
                <AvatarFallback className="bg-white/10 text-white">{member.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
              <Badge variant={member.status === "Active" ? "default" : "secondary"} className={member.status === "Active" ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"}>
                {member.status}
              </Badge>
            </div>
          ))}
        </div>

        {/* Tasks Section */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <h2 className="font-bold text-sm text-muted-foreground uppercase tracking-wider px-1">Assigned Tasks</h2>
          <div className="p-4 rounded-xl bg-card border border-white/5 space-y-3">
             <div className="flex items-start gap-3">
               <div className="mt-0.5 h-5 w-5 rounded-full border-2 border-white/20 flex items-center justify-center cursor-pointer hover:border-primary"></div>
               <div>
                 <p className="text-sm text-white">Review latest video draft</p>
                 <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-4 w-4"><AvatarFallback className="text-[8px] bg-primary text-white">S</AvatarFallback></Avatar>
                    <span className="text-[10px] text-muted-foreground">Due Tomorrow</span>
                 </div>
               </div>
             </div>
             <div className="flex items-start gap-3 opacity-50">
               <div className="mt-0.5 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                 <Check size={12} className="text-white" />
               </div>
               <div>
                 <p className="text-sm text-white line-through">Create thumbnail variants</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
