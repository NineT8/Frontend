import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import MoodChart from "@/components/MoodChart";
import MoodTrendChart from "@/components/MoodTrendChart";

interface Entry {
  _id: string;
  id: string;
  mood_label: string | null;
  created_at: string;
}

const Analytics = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  const fetchEntries = async () => {
    try {
      const { data } = await api.get("/entries");
      // Map _id to id for compatibility
      const mappedData = data.map((entry: any) => ({
        ...entry,
        id: entry._id,
      }));
      setEntries(mappedData || []);
    } catch (error: any) {
      toast.error("Failed to load analytics data");
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodStats = () => {
    const moodCounts: Record<string, number> = {
      happy: 0,
      sad: 0,
      stressed: 0,
      calm: 0,
      angry: 0,
      neutral: 0,
    };

    entries.forEach((entry) => {
      if (entry.mood_label && entry.mood_label in moodCounts) {
        moodCounts[entry.mood_label]++;
      }
    });

    const total = Object.values(moodCounts).reduce((sum, count) => sum + count, 0);

    return {
      counts: moodCounts,
      total,
      mostCommon:
        total > 0
          ? Object.entries(moodCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
          : "none",
    };
  };

  const stats = getMoodStats();

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 hover:bg-background/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
          Analytics & Insights
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-heading">Mood Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <MoodChart entries={entries} />
            </CardContent>
          </Card>

          <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-heading">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Entries</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Most Common Mood</p>
                <p className="text-2xl font-semibold text-foreground capitalize">
                  {stats.mostCommon}
                </p>
              </div>
              <div className="space-y-2 pt-4 border-t border-border">
                {Object.entries(stats.counts).map(([mood, count]) => (
                  <div key={mood} className="flex justify-between items-center">
                    <span className="text-sm capitalize text-muted-foreground">{mood}</span>
                    <span className="text-sm font-medium text-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-heading">Mood Trends Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <MoodTrendChart entries={entries} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;