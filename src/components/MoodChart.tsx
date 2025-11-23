import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface Entry {
  mood_label: string | null;
  created_at: string;
}

interface MoodChartProps {
  entries: Entry[];
}

const MoodChart = ({ entries }: MoodChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Filter entries from last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentEntries = entries.filter((entry) => {
      const date = new Date(entry.created_at);
      return !isNaN(date.getTime()) && date >= sevenDaysAgo;
    });

    // Count moods
    const moodCounts: Record<string, number> = {
      happy: 0,
      sad: 0,
      stressed: 0,
      calm: 0,
      angry: 0,
      neutral: 0,
    };

    recentEntries.forEach((entry) => {
      if (entry.mood_label && entry.mood_label in moodCounts) {
        moodCounts[entry.mood_label]++;
      }
    });

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Happy", "Sad", "Stressed", "Calm", "Angry", "Neutral"],
        datasets: [
          {
            data: [
              moodCounts.happy,
              moodCounts.sad,
              moodCounts.stressed,
              moodCounts.calm,
              moodCounts.angry,
              moodCounts.neutral,
            ],
            backgroundColor: [
              "hsl(50, 100%, 60%)",
              "hsl(220, 60%, 55%)",
              "hsl(0, 70%, 55%)",
              "hsl(80, 30%, 70%)",
              "hsl(0, 80%, 50%)",
              "hsl(30, 10%, 60%)",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 15,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [entries]);

  return (
    <div className="h-[300px] w-full flex items-center justify-center">
      <canvas ref={chartRef} />
    </div>
  );
};

export default MoodChart;