// Coded by Dharven Doshi
import React, { useEffect, useState } from "react";
import { getEventData } from "../../services/EventService";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

interface CategoryCount {
  category: string;
  count: number;
}

interface PriceRange {
  range: string;
  count: number;
}

interface EventData {
  categoryCounts: CategoryCount[];
  priceRanges: PriceRange[];
}
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const AnalyticsComponent = () => {
  const [eventData, setEventData] = useState<EventData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEventData();
        if (response.success) {
          console.log(response.data);
          console.log(response.data.categoryCounts);
          setEventData(response.data);
        } else {
          console.error("Data fetch was not successful:", response.message);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  const pieData = {
    labels: eventData.categoryCounts.map((item) => item.category || undefined),
    datasets: [
      {
        label: "Category Counts",
        data: eventData.categoryCounts.map((item) => item.count || 0),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#E7E9ED",
          "#4BC0C0",
          "#F77825",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const lineData = {
    labels: eventData.priceRanges.map((item) => item.range),
    datasets: [
      {
        label: "Event Count by Price Range",
        data: eventData.priceRanges.map((item) => item.count || 0),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Event Category Distribution</h2>
        <div className="w-full flex justify-center">
          <div className="w-72 h-72 md:w-80 md:h-80">
            <Doughnut data={pieData} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <Line data={lineData} />
      </div>
    </div>

  );
};

export default AnalyticsComponent;
