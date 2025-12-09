import { ArrowLeft, TrendingUp, Users, Eye, Activity } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

const DATA = [
  { name: 'Mon', views: 400, likes: 240 },
  { name: 'Tue', views: 300, likes: 139 },
  { name: 'Wed', views: 500, likes: 380 },
  { name: 'Thu', views: 280, likes: 390 },
  { name: 'Fri', views: 590, likes: 480 },
  { name: 'Sat', views: 800, likes: 600 },
  { name: 'Sun', views: 700, likes: 550 },
];

const ENGAGEMENT_DATA = [
  { name: 'IG', value: 65 },
  { name: 'TT', value: 85 },
  { name: 'YT', value: 45 },
  { name: 'X', value: 30 },
];

export default function Analytics() {
  return (
    <div className="pb-8 min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3">
        <Link href="/tools">
          <ArrowLeft className="cursor-pointer hover:text-primary" />
        </Link>
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <TrendingUp className="text-green-400" size={20} /> Analytics
        </h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-4 flex flex-col gap-1">
              <span className="text-muted-foreground text-xs font-medium flex items-center gap-1">
                <Eye size={12} /> Total Views
              </span>
              <span className="text-2xl font-bold text-white">45.2k</span>
              <span className="text-green-400 text-xs font-bold flex items-center">
                +12% <TrendingUp size={10} className="ml-1" />
              </span>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-4 flex flex-col gap-1">
              <span className="text-muted-foreground text-xs font-medium flex items-center gap-1">
                <Users size={12} /> Followers
              </span>
              <span className="text-2xl font-bold text-white">12.8k</span>
              <span className="text-green-400 text-xs font-bold flex items-center">
                +5.4% <TrendingUp size={10} className="ml-1" />
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Growth Chart */}
        <Card className="bg-card/50 border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Growth Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Bar Chart */}
        <Card className="bg-card/50 border-white/5">
           <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Engagement by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[150px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ENGAGEMENT_DATA}>
                  <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="value" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
