import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, LogOut, Mail, User as UserIcon, Calendar } from "lucide-react";
import { format } from "date-fns";

const Profile = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-8 animate-fade-in">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full gradient-warm flex items-center justify-center">
                <UserIcon className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>

            <div className="space-y-4">
              {user.name && (
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                  <UserIcon className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Name</p>
                    <p className="text-foreground">{user.name}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                  <p className="text-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Member Since</p>
                  <p className="text-foreground">
                    {user.created_at ? format(new Date(user.created_at), "MMMM d, yyyy") : "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <Button
                onClick={signOut}
                variant="outline"
                className="w-full bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;