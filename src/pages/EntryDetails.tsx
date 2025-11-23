import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash2, Save, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import api from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Entry {
  _id: string;
  id: string;
  content: string;
  mood_label: string | null;
  mood_confidence: number | null;
  created_at: string;
  updated_at: string;
}

const EntryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user && id) {
      fetchEntry();
    }
  }, [user, id]);

  const fetchEntry = async () => {
    try {
      const { data } = await api.get(`/entries/${id}`);
      setEntry({ ...data, id: data._id });
      setEditedContent(data.content);
    } catch (error: any) {
      toast.error("Failed to load entry");
      console.error("Error fetching entry:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editedContent.trim()) {
      toast.error("Entry cannot be empty");
      return;
    }

    setSaving(true);
    try {
      const { data } = await api.put(`/entries/${id}`, {
        content: editedContent.trim(),
      });

      setEntry({ ...data, id: data._id });
      setIsEditing(false);
      toast.success("Entry updated successfully!");
    } catch (error: any) {
      toast.error("Failed to update entry");
      console.error("Error updating entry:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/entries/${id}`);
      toast.success("Entry deleted successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error("Failed to delete entry");
      console.error("Error deleting entry:", error);
    }
  };

  const getMoodColor = (mood: string | null) => {
    if (!mood) return "bg-muted";
    const moodColors: Record<string, string> = {
      happy: "bg-mood-happy",
      sad: "bg-mood-sad",
      stressed: "bg-mood-stressed",
      calm: "bg-mood-calm",
      angry: "bg-mood-angry",
      neutral: "bg-mood-neutral",
    };
    return moodColors[mood.toLowerCase()] || "bg-muted";
  };

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

  if (!entry) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 hover:bg-background/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {format(new Date(entry.created_at), "MMMM d, yyyy 'at' h:mm a")}
              </CardTitle>
              {entry.mood_label && (
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-3 h-3 rounded-full ${getMoodColor(entry.mood_label)}`} />
                  <span className="text-sm font-medium capitalize">{entry.mood_label}</span>
                  {entry.mood_confidence && (
                    <span className="text-xs text-muted-foreground">
                      ({(entry.mood_confidence * 100).toFixed(0)}% confidence)
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsEditing(true)}
                    className="bg-card/50 backdrop-blur-sm"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-card/50 backdrop-blur-sm text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Entry</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this entry? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedContent(entry.content);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    onClick={handleSave}
                    disabled={saving}
                    className="gradient-warm border-0"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {isEditing ? (
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[300px] text-lg leading-relaxed bg-background/50 resize-none focus-visible:ring-primary/20"
              />
            ) : (
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{entry.content}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EntryDetails;