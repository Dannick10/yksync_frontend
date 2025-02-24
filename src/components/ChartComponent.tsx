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
import { statusProject } from "@/@types/statusTypes";

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
  projectsCurrent: statusProject[];
  projectsFinish: statusProject[];
}

const ChartComponent = ({
  projectsCurrent,
  projectsFinish,
}: ChartComponentProps) => {
  const [projectCounts, setProjectCounts] = useState<{
    startCounts: { [key: string]: number };
    endCounts: { [key: string]: number };
  }>({
    startCounts: {},
    endCounts: {},
  });

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

  const countProjects = (
    projects: statusProject[],
    dateKey: keyof statusProject
  ) => {
    const counts: { [key: string]: number } = {};

    projects.forEach((project) => {
      const projectDate = new Date(project[dateKey]);
      const month = monthOrder[projectDate.getMonth()];

      counts[month] = (counts[month] || 0) + 1;
    });

    return counts;
  };

  useEffect(() => {
    setProjectCounts({
      startCounts: countProjects(projectsCurrent, "startDate"),
      endCounts: countProjects(projectsFinish, "endDate"),
    });
  }, [projectsCurrent, projectsFinish]);

  console.log(projectCounts);

  const currentMonthIndex = new Date().getMonth();
  const months = Array.from(
    { length: 5 },
    (_, i) => monthOrder[(currentMonthIndex + i - 1) % 12]
  );

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
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
        max: Math.min(projectsCurrent.length + 3, 10),
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartComponent;
