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
  projects: any;
}

const ChartComponent = ({ projects }: ChartComponentProps) => {
  const [projectStartCounts, SetProjectStartCounts] = useState<{
    [key: string]: number;
  }>({});
  const [projectEndCounts, SetProjectEndCounts] = useState<{
    [key: string]: number;
  }>({});

  const getProjectsFinishedToday = () => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    let count: { [key: string]: number } = {};

    projects.forEach((project: any) => {
      const endDate = new Date(project.endDate);
      const endDateString = endDate.toISOString().split("T")[0];

      if (endDateString === todayString) {
        const month = endDate.toLocaleString("default", { month: "short" });
        if (!count[month]) {
          count[month] = 0;
        }
        count[month] += 1;
      }
    });

    return count;
  };

  const getProjectCount = (dateKey: string) => {
    const counts: { [key: string]: number } = {};
    const currentDate = new Date(); // Data atual

    projects.forEach((project: any) => {
      const date = new Date(project[dateKey]);

      if (dateKey === "endDate" && date > currentDate) {
        return;
      }

      const month = date.toLocaleString("default", { month: "short" });

      if (!counts[month]) {
        counts[month] = 1;
      } else {
        counts[month] += 1;
      }
    });

    return counts;
  };

  useEffect(() => {
    SetProjectStartCounts(getProjectCount("startDate"));
    SetProjectEndCounts(getProjectCount("endDate"));
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
  const previousMonth = monthOrder[currentMonthIndex + 1];
  const nextMonth = monthOrder[currentMonthIndex + 3];
  const months = [previousMonth, currentMonth, nextMonth];

  const data = {
    labels: months,
    datasets: [
      {
        label: "Projetos Iniciados",
        data: months.map((month) => projectStartCounts[month] || 0),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Projetos Finalizados",
        data: months.map((month) => projectEndCounts[month] || 0),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Projetos de hoje",
        data: months.map((month) => {
          const projectsFinishedToday = getProjectsFinishedToday();

          if (projectsFinishedToday[month]) {
            return projectsFinishedToday[month];
          }
          return 0;
        }),
        borderColor: "rgba(255, 255, 132, 1)",
        backgroundColor: "rgba(255, 255, 1, 0.2)",
        fill: false,
        tension: 3,
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
