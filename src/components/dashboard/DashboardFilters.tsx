import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DashboardFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedMood: string;
    onMoodChange: (value: string) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
}

export const DashboardFilters = ({
    searchTerm,
    onSearchChange,
    selectedMood,
    onMoodChange,
    sortBy,
    onSortChange,
}: DashboardFiltersProps) => {
    return (
        <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 bg-card/50 backdrop-blur-sm"
                />
            </div>
            <Select value={selectedMood} onValueChange={onMoodChange}>
                <SelectTrigger className="bg-card/50 backdrop-blur-sm">
                    <SelectValue placeholder="Filter by mood" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Moods</SelectItem>
                    <SelectItem value="happy">Happy</SelectItem>
                    <SelectItem value="sad">Sad</SelectItem>
                    <SelectItem value="stressed">Stressed</SelectItem>
                    <SelectItem value="calm">Calm</SelectItem>
                    <SelectItem value="angry">Angry</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="bg-card/50 backdrop-blur-sm">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};
