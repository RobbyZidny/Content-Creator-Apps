import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, PlusSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import avatarImage from "@assets/generated_images/cool_3d_avatar_of_a_student_creator.png";
import { Link } from "wouter";

const POSTS = [
  {
    id: 1,
    user: "alex.design",
    avatar: avatarImage,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    caption: "Working on the new UI kit for the campus app! 🎨✨ #design #uiux #studentlife",
    likes: 124,
    comments: 18,
    time: "2h ago"
  },
  {
    id: 2,
    user: "sarah_codes",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    caption: "Finally fixed that bug in my final project... coffee time! ☕️💻 #coding #cs #allnighter",
    likes: 89,
    comments: 12,
    time: "4h ago"
  },
  {
    id: 3,
    user: "photo_club",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    caption: "Sunset shots from yesterday's workshop. Who's joining next week? 📸 #photography #campus",
    likes: 245,
    comments: 45,
    time: "6h ago"
  }
];

export default function Dashboard() {
  return (
    <div className="pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex justify-between items-center transition-all duration-300">
        <h1 className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Feed</h1>
        <div className="flex gap-4 items-center">
            <PlusSquare size={24} className="cursor-pointer hover:text-primary transition-colors" />
            <Link href="/profile">
               <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] cursor-pointer hover:scale-105 transition-transform">
                <img src={avatarImage} alt="Profile" className="w-full h-full rounded-full object-cover bg-black" />
              </div>
            </Link>
        </div>
      </header>

      {/* Stories */}
      <div className="py-4 overflow-x-auto no-scrollbar flex gap-4 px-4 border-b border-white/5 bg-background/50">
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i} 
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group"
          >
            <div className={`w-[70px] h-[70px] rounded-full p-[2px] transition-all duration-300 ${i === 0 ? 'bg-white/10 border-2 border-dashed border-white/20 hover:border-primary' : 'bg-gradient-to-tr from-primary to-secondary group-hover:shadow-[0_0_15px_hsl(265,89%,66%,0.4)]'}`}>
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden border-[3px] border-background">
                {i === 0 ? (
                  <span className="text-3xl text-white/50 group-hover:text-primary transition-colors">+</span>
                ) : (
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Story" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                )}
              </div>
            </div>
            <span className="text-[11px] font-medium text-muted-foreground group-hover:text-white transition-colors truncate w-full text-center">{i === 0 ? 'Your Story' : `User ${i}`}</span>
          </motion.div>
        ))}
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-6 mt-2">
        {POSTS.map((post, i) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col border-b border-white/5 pb-6 bg-card/20 backdrop-blur-sm"
          >
            <div className="px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary/50 to-secondary/50 p-[1.5px]">
                   <img src={post.avatar} alt={post.user} className="w-full h-full rounded-full object-cover bg-black border-2 border-black" />
                </div>
                <div>
                  <p className="font-semibold text-sm hover:text-primary transition-colors">{post.user}</p>
                  <p className="text-[10px] text-muted-foreground">Original Audio</p>
                </div>
              </div>
              <MoreHorizontal size={20} className="text-muted-foreground hover:text-white cursor-pointer" />
            </div>

            <div className="aspect-[4/5] bg-muted w-full relative overflow-hidden group cursor-pointer">
              <img src={post.image} alt="Post content" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-8 backdrop-blur-[2px]">
                 <div className="flex flex-col items-center gap-1 text-white drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Heart className="fill-white" size={32} />
                    <span className="font-bold">{post.likes}</span>
                 </div>
                 <div className="flex flex-col items-center gap-1 text-white drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    <MessageCircle className="fill-white" size={32} />
                    <span className="font-bold">{post.comments}</span>
                 </div>
              </div>
            </div>

            <div className="px-4 mt-3">
              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-5">
                  <motion.div whileTap={{ scale: 0.8 }} className="cursor-pointer hover:text-red-500 transition-colors">
                     <Heart size={26} strokeWidth={1.5} />
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.8 }} className="cursor-pointer hover:text-primary transition-colors">
                     <MessageCircle size={26} strokeWidth={1.5} />
                  </motion.div>
                   <motion.div whileTap={{ scale: 0.8 }} className="cursor-pointer hover:text-secondary transition-colors">
                     <Share2 size={26} strokeWidth={1.5} />
                  </motion.div>
                </div>
                <motion.div whileTap={{ scale: 0.8 }} className="cursor-pointer hover:text-primary transition-colors">
                   <Bookmark size={26} strokeWidth={1.5} />
                </motion.div>
              </div>
              
              <div className="space-y-1">
                <p className="font-semibold text-sm">{post.likes} likes</p>
                <p className="text-sm text-white/90 leading-snug">
                  <span className="font-semibold mr-2">{post.user}</span>
                  {post.caption}
                </p>
                <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wide font-medium">{post.time} • See translation</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
