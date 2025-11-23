import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

import MoodChart from "@/components/MoodChart";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { EntryCard } from "@/components/dashboard/EntryCard";
import { EmptyState } from "@/components/dashboard/EmptyState";

// This is what a Journal Entry looks like
interface Entry {
  _id: string;
  id: string;
  content: string;
  mood_label: string | null;
  mood_confidence: number | null;
  created_at: string;
}

const Dashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();

  // State to hold all our journal entries
  const [entries, setEntries] = useState<Entry[]>([]);
  // State to hold entries after filtering (search, mood, etc.)
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedMood, setSelectedMood] = useState("all");

  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;

  // Load entries when the user logs in
  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  // Re-filter entries whenever the search, sort, or filter changes
  useEffect(() => {
    filterAndSortEntries();
  }, [entries, searchTerm, sortBy, selectedMood]);

  const fetchEntries = async () => {
    try {
      const { data } = await api.get("/entries");
      // We map _id to id just to be safe and consistent
      const mappedData = data.map((entry: any) => ({
        ...entry,
        id: entry._id,
      }));
      setEntries(mappedData || []);
    } catch (error: any) {
      toast.error("Failed to load entries");
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortEntries = () => {
    let result = [...entries];

    // 1. Filter by Search Term
    if (searchTerm) {
      result = result.filter((entry) =>
        entry.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter by Mood
    if (selectedMood !== "all") {
      result = result.filter((entry) => entry.mood_label === selectedMood);
    }

    // 3. Sort by Date
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredEntries(result);
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  // Calculate pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  // Show loading spinner while checking auth or fetching data
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your journal...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader
          userName={user.name || user.email || "User"}
          onSignOut={signOut}
        />

        {/* Mood Trends Chart */}
        <Card className="mb-8 shadow-card border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-heading">Mood Trends (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <MoodChart entries={entries} />
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <DashboardFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedMood={selectedMood}
          onMoodChange={setSelectedMood}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* New Entry Button */}
        <Link to="/new-entry">
          <Button className="mb-6 gradient-warm border-0 text-primary-foreground font-medium shadow-soft hover:shadow-lg transition-smooth hover:scale-105">
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </Link>

        {/* Entry List */}
        {currentEntries.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {currentEntries.map((entry, index) => (
                <div key={entry.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <EntryCard entry={entry} />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-card/50 backdrop-blur-sm"
                >
                  Previous
                </Button>
                <span className="flex items-center px-4 text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-card/50 backdrop-blur-sm"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;