import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface EntryCardProps {
    entry: {
        id: string;
        content: string;
        mood_label: string | null;
        created_at: string;
    };
}

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

export const EntryCard = ({ entry }: EntryCardProps) => {
    return (
        <Link to={`/entry/${entry.id}`}>
            <Card className="h-full shadow-card border-border/50 bg-card/80 backdrop-blur-sm transition-smooth hover:shadow-soft hover:-translate-y-1 cursor-pointer">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">
                            {(() => {
                                try {
                                    return format(new Date(entry.created_at), "MMM d, yyyy");
                                } catch (e) {
                                    return "Unknown Date";
                                }
                            })()}
                        </span>
                        {entry.mood_label && (
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${getMoodColor(entry.mood_label)}`} />
                                <span className="text-sm font-medium capitalize">{entry.mood_label}</span>
                            </div>
                        )}
                    </div>
                    <p className="text-foreground line-clamp-4">{entry.content}</p>
                </CardContent>
            </Card>
        </Link>
    );
};
