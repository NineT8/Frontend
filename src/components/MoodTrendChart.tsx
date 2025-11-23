import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { format, subDays } from "date-fns";

Chart.register(...registerables);

interface Entry {
  mood_label: string | null;
  created_at: string;
}

interface MoodTrendChartProps {
  entries: Entry[];
}

const MoodTrendChart = ({ entries }: MoodTrendChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Get last 30 days
    const days = 30;
    const labels: string[] = [];
    const moodData: Record<string, number[]> = {
      happy: [],
      sad: [],
      stressed: [],
      calm: [],
      angry: [],
      neutral: [],
    };

    // Initialize data for each day
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      labels.push(format(date, "MMM d"));
      
      Object.keys(moodData).forEach((mood) => {
        moodData[mood].push(0);
      });
    }

    // Count moods per day
    entries.forEach((entry) => {
      if (!entry.mood_label) return;
      
      const entryDate = new Date(entry.created_at);
      const daysDiff = Math.floor(
        (new Date().getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysDiff < days && entry.mood_label in moodData) {
        const index = days - 1 - daysDiff;
        if (index >= 0 && index < days) {
          moodData[entry.mood_label][index]++;
        }
      }
    });

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Happy",
            data: moodData.happy,
            borderColor: "hsl(50, 100%, 60%)",
            backgroundColor: "hsl(50, 100%, 60%, 0.1)",
            tension: 0.4,
          },
          {
            label: "Sad",
            data: moodData.sad,
            borderColor: "hsl(220, 60%, 55%)",
            backgroundColor: "hsl(220, 60%, 55%, 0.1)",
            tension: 0.4,
          },
          {
            label: "Stressed",
            data: moodData.stressed,
            borderColor: "hsl(0, 70%, 55%)",
            backgroundColor: "hsl(0, 70%, 55%, 0.1)",
            tension: 0.4,
          },
          {
            label: "Calm",
            data: moodData.calm,
            borderColor: "hsl(80, 30%, 70%)",
            backgroundColor: "hsl(80, 30%, 70%, 0.1)",
            tension: 0.4,
          },
          {
            label: "Angry",
            data: moodData.angry,
            borderColor: "hsl(0, 80%, 50%)",
            backgroundColor: "hsl(0, 80%, 50%, 0.1)",
            tension: 0.4,
          },
          {
            label: "Neutral",
            data: moodData.neutral,
            borderColor: "hsl(30, 10%, 60%)",
            backgroundColor: "hsl(30, 10%, 60%, 0.1)",
            tension: 0.4,
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
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
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

  return <canvas ref={chartRef} />;
};

export default MoodTrendChart;