import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Heart, TrendingUp } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground">
              MindMapr
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Your emotional journey, understood
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 my-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-card border border-border/50 transition-smooth hover:shadow-soft hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Advanced sentiment detection understands your emotions with precision
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-card border border-border/50 transition-smooth hover:shadow-soft hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-heading text-lg mb-2">Emotional Journaling</h3>
              <p className="text-sm text-muted-foreground">
                Express yourself freely and track your emotional patterns over time
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-card border border-border/50 transition-smooth hover:shadow-soft hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading text-lg mb-2">Insights & Trends</h3>
              <p className="text-sm text-muted-foreground">
                Visualize your mood patterns and gain meaningful insights
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="w-full sm:w-auto gradient-warm border-0 text-primary-foreground font-medium px-8 py-6 text-lg rounded-xl shadow-soft hover:shadow-lg transition-smooth hover:scale-105">
                Get Started
              </Button>
            </Link>
            <Link to="/auth?mode=login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-border bg-card/50 backdrop-blur-sm px-8 py-6 text-lg rounded-xl transition-smooth hover:bg-card">
                Sign In
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground pt-8 animate-in fade-in duration-700 delay-500">
            Start your journey to better emotional awareness today
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;