import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const NewEntry = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Please write something in your journal");
      return;
    }

    setLoading(true);

    try {
      // Send the entry to the backend
      // The backend will automatically use AI to analyze the mood!
      const { data } = await api.post("/entries", {
        content: content.trim(),
      });

      if (data.mood_label) {
        toast.success(`Entry saved! Mood detected: ${data.mood_label}`);
      } else {
        toast.success("Entry saved!");
      }

      // Go back to the dashboard to see the new entry
      navigate("/dashboard");
    } catch (error: any) {
      toast.error("Failed to save entry");
      console.error("Error saving entry:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 hover:bg-background/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl flex items-center gap-2">
              New Journal Entry
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </CardTitle>
            <CardDescription>
              Write about your day or feelings. AI will analyze the sentiment automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Textarea
                placeholder="How are you feeling today?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] text-lg leading-relaxed bg-background/50 resize-none focus-visible:ring-primary/20"
              />

              <Button
                type="submit"
                className="w-full gradient-warm border-0 text-primary-foreground font-medium"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing & Saving...
                  </>
                ) : (
                  "Save Entry"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewEntry;