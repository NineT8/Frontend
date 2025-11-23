import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const EmptyState = () => {
    return (
        <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-sm">
            <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No entries found</p>
                <Link to="/new-entry">
                    <Button className="gradient-warm border-0 text-primary-foreground">
                        Create Your First Entry
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};
