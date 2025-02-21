import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps {
  projects: any[];
}

const ChartComponent = ({ projects }: ChartComponentProps) => {
  const [projectCounts, setProjectCounts] = useState<{
    startCounts: { [key: string]: number };
    endCounts: { [key: string]: number };
    todayCounts: { [key: string]: number };
  }>({
    startCounts: {},
    endCounts: {},
    todayCounts: {},
  });
  
  const countProjects = (dateKey: string, filterToday: boolean = false) => {
    const counts: { [key: string]: number } = {};
    const today = new Date();
    
    projects.forEach((project) => {
      const projectDate = new Date(project[dateKey]);
      const month = projectDate.toLocaleString("default", { month: "short" });

      if (filterToday && projectDate.toLocaleDateString() === today.toLocaleDateString()) {
        counts[month] = (counts[month] || 0) + 1;
      } else if (!filterToday && projectDate <= today) {
        counts[month] = (counts[month] || 0) + 1;
      }
    });

    return counts;
  };

  useEffect(() => {
    setProjectCounts({
      startCounts: countProjects("startDate"),
      endCounts: countProjects("endDate"),
      todayCounts: countProjects("endDate", true),
    });
  }, [projects]);

  const monthOrder = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];
  const currentMonth = new Date().toLocaleString("default", { month: "short" });
  const currentMonthIndex = monthOrder.indexOf(currentMonth);
  const months = [
    monthOrder[(currentMonthIndex + 11) % 12], 
    currentMonth,
    monthOrder[(currentMonthIndex + 1) % 12],
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: "Projetos Iniciados",
        data: months.map((month) => projectCounts.startCounts[month] || 0),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Projetos Finalizados",
        data: months.map((month) => projectCounts.endCounts[month] || 0),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Projetos de hoje",
        data: months.map((month) => projectCounts.todayCounts[month] || 0),
        borderColor: "rgba(255, 255, 132, 1)",
        backgroundColor: "rgba(255, 255, 1, 0.2)",
        fill: false,
        tension: 0.4,
        pointRadius: 10,
        lineTension: 0,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
        max: 10,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartComponent;
