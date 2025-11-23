import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BarChart3, User, LogOut } from "lucide-react";

interface DashboardHeaderProps {
    userName: string;
    onSignOut: () => void;
}

export const DashboardHeader = ({ userName, onSignOut }: DashboardHeaderProps) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {userName}</p>
            </div>
            <div className="flex gap-2">
                <Link to="/analytics">
                    <Button variant="outline" size="icon" className="bg-card/50 backdrop-blur-sm">
                        <BarChart3 className="w-5 h-5" />
                    </Button>
                </Link>
                <Link to="/profile">
                    <Button variant="outline" size="icon" className="bg-card/50 backdrop-blur-sm">
                        <User className="w-5 h-5" />
                    </Button>
                </Link>
                <Button variant="outline" size="icon" onClick={onSignOut} className="bg-card/50 backdrop-blur-sm">
                    <LogOut className="w-5 h-5" />
                </Button>
                <ThemeToggle />
            </div>
        </div>
    );
};
