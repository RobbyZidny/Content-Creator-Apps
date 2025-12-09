import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Sparkles, type LucideIcon, BarChart2, Users, Link as LinkIcon, PenTool, Lightbulb, UserPlus, Rocket, Wrench, Clock, DollarSign, Image as ImageIcon } from "lucide-react";
import aiIcon from "@assets/generated_images/ai_brain_icon.png";
import chartIcon from "@assets/generated_images/analytics_chart_icon.png";
import calendarIcon from "@assets/generated_images/calendar_planner_icon.png";
import inspirationIcon from "@assets/generated_images/inspiration_icon.png";
import communityIcon from "@assets/generated_images/community_icon.png";
import guideIcon from "@assets/generated_images/guide_book_icon.png";
import clockIcon from "@assets/generated_images/clock_icon.png";
import mediaIcon from "@assets/generated_images/media_gallery_icon.png";
import trophyIcon from "@assets/generated_images/trophy_icon.png";

const TOOLS = [
  // --- Core Tools ---
  {
    title: "Content Planner",
    description: "Schedule & organize",
    icon: Calendar,
    image: calendarIcon,
    href: "/tools/planner",
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Media Manager",
    description: "Upload & organize",
    icon: ImageIcon,
    image: mediaIcon,
    href: "/tools/media",
    color: "text-pink-400",
    bg: "bg-pink-400/10"
  },
  {
    title: "AI Ideas",
    description: "Generate concepts",
    icon: Sparkles,
    image: aiIcon,
    href: "/tools/ideas",
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    title: "AI Captions",
    description: "Write better copy",
    icon: PenTool,
    image: null,
    href: "/tools/caption",
    color: "text-pink-400",
    bg: "bg-pink-400/10"
  },
  {
    title: "Analytics",
    description: "Track performance",
    icon: BarChart2,
    image: chartIcon,
    href: "/tools/analytics",
    color: "text-green-400",
    bg: "bg-green-400/10"
  },
  
  // --- Resources & Guides ---
  {
    title: "Inspirasi",
    description: "Trending ideas",
    icon: Lightbulb,
    image: inspirationIcon,
    href: "/learn/inspiration",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10"
  },
  {
    title: "Teman Creator",
    description: "Find friends",
    icon: UserPlus,
    image: communityIcon,
    href: "/network/friends",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10"
  },
  {
    title: "Ide Awal",
    description: "Starting guide",
    icon: Rocket,
    image: guideIcon,
    href: "/learn/starting-guide",
    color: "text-red-400",
    bg: "bg-red-400/10"
  },
  {
    title: "Tools Guide",
    description: "Best equipment",
    icon: Wrench,
    image: null,
    href: "/learn/tools-guide",
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Jam Upload",
    description: "Best times",
    icon: Clock,
    image: clockIcon,
    href: "/learn/best-times",
    color: "text-green-400",
    bg: "bg-green-400/10"
  },
  {
    title: "Buat Team",
    description: "Collaboration",
    icon: Users,
    image: null,
    href: "/tools/collaboration",
    color: "text-orange-400",
    bg: "bg-orange-400/10"
  },
  {
    title: "Keuntungan",
    description: "Why create?",
    icon: DollarSign,
    image: trophyIcon,
    href: "/learn/benefits",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10"
  },
  {
    title: "Integrations",
    description: "Connect apps",
    icon: LinkIcon,
    image: null,
    href: "/tools/integrations",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10"
  }
];

export default function ToolsIndex() {
  return (
    <div className="pb-8">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-4">
        <h1 className="text-xl font-display font-bold">Creator Tools</h1>
        <p className="text-sm text-muted-foreground">Supercharge your content workflow</p>
      </header>

      <div className="p-4 grid grid-cols-2 gap-4">
        {TOOLS.map((tool, i) => (
          <Link key={i} href={tool.href}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer relative overflow-hidden rounded-2xl border border-white/5 bg-card/50 hover:bg-card/80 transition-colors p-4 flex flex-col items-center text-center gap-3 aspect-square justify-center"
            >
              {tool.image ? (
                <div className="w-16 h-16 mb-2 relative">
                   <div className={`absolute inset-0 blur-xl opacity-20 ${tool.bg} rounded-full`} />
                   <img src={tool.image} alt={tool.title} className="w-full h-full object-contain relative z-10" />
                </div>
              ) : (
                 <div className={`w-14 h-14 rounded-2xl ${tool.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <tool.icon className={`w-7 h-7 ${tool.color}`} />
                </div>
              )}
             
              <div>
                <h3 className="font-bold text-white leading-tight">{tool.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
