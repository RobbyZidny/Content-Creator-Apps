import { Switch, Route, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Profile from "@/pages/profile";
import MobileLayout from "@/components/mobile-layout";
import ToolsIndex from "@/pages/tools/index";
import ContentPlanner from "@/pages/tools/planner";
import AIContentIdeas from "@/pages/tools/ideas";
import AICaptionGenerator from "@/pages/tools/caption";
import Analytics from "@/pages/tools/analytics";
import Collaboration from "@/pages/tools/collaboration";
import Integrations from "@/pages/tools/integrations";
import MediaManager from "@/pages/tools/media-manager";
import Inspiration from "@/pages/learn/inspiration";
import StartingGuide from "@/pages/learn/starting-guide";
import ToolsGuide from "@/pages/learn/tools-guide";
import BestTimes from "@/pages/learn/best-times";
import Benefits from "@/pages/learn/benefits";
import Friends from "@/pages/network/friends";
import { api } from "@/lib/api";

function Router() {
  const [location, setLocation] = useLocation();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Check authentication on app load
    const checkAuth = async () => {
      // Skip auth check if already on login page
      if (location === "/") {
        setAuthChecked(true);
        return;
      }

      try {
        await api.getCurrentUser();
        // User is authenticated, allow navigation
        setAuthChecked(true);
      } catch (error) {
        // User is not authenticated, redirect to login
        setLocation("/");
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  // Show loading while checking auth
  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <MobileLayout>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/explore" component={Dashboard} /> {/* Reuse dashboard for demo */}
        <Route path="/notifications" component={Dashboard} /> {/* Reuse dashboard for demo */}
        
        {/* Tools Routes */}
        <Route path="/tools" component={ToolsIndex} />
        <Route path="/tools/planner" component={ContentPlanner} />
        <Route path="/tools/ideas" component={AIContentIdeas} />
        <Route path="/tools/caption" component={AICaptionGenerator} />
        <Route path="/tools/analytics" component={Analytics} />
        <Route path="/tools/collaboration" component={Collaboration} />
        <Route path="/tools/integrations" component={Integrations} />
        <Route path="/tools/media" component={MediaManager} />

        {/* Learn & Network Routes */}
        <Route path="/learn/inspiration" component={Inspiration} />
        <Route path="/learn/starting-guide" component={StartingGuide} />
        <Route path="/learn/tools-guide" component={ToolsGuide} />
        <Route path="/learn/best-times" component={BestTimes} />
        <Route path="/learn/benefits" component={Benefits} />
        <Route path="/network/friends" component={Friends} />

        <Route component={NotFound} />
      </Switch>
    </MobileLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
