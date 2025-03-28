"use client";

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
import {  useMemo, useState } from "react";
import { statusProject } from "@/@types/statusTypes";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";

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
  indexMoth?: number; 
  monthDisplayCount?: number; 
}

const ChartComponent = ({
  projectsCurrent,
  projectsFinish,
  indexMoth = 0,
  monthDisplayCount = 5,
}: ChartComponentProps) => {
  const [monthOffset, setMonthOffset] = useState(indexMoth);
  const [yearOffset, setYearOffset] = useState(0);

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
      const year = projectDate.getFullYear();
      const key = `${month}-${year}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  };

  const projectCounts = useMemo(
    () => ({
      startCounts: countProjects(projectsCurrent, "startDate"),
      endCounts: countProjects(projectsFinish, "endDate"),
    }),
    [projectsCurrent, projectsFinish]
  );

  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();
  const displayYear = currentYear + yearOffset;

  const months = Array.from({ length: monthDisplayCount }, (_, i) => {
    const totalMonths = currentMonthIndex + monthOffset + i;
    const monthIndex = totalMonths % 12;
    const yearAdjust = Math.floor(totalMonths / 12);
    const month = monthOrder[monthIndex < 0 ? monthIndex + 12 : monthIndex];
    const year = displayYear + yearAdjust;
    return `${month}/${year % 100}`; // Ex.: "jan/25"
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Projetos Iniciados",
        data: months.map(
          (monthYear) =>
            projectCounts.startCounts[
              monthYear.split("/")[0] +
                "-" +
                (parseInt(monthYear.split("/")[1]) + 2000)
            ] || 0
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Projetos Finalizados",
        data: months.map(
          (monthYear) =>
            projectCounts.endCounts[
              monthYear.split("/")[0] +
                "-" +
                (parseInt(monthYear.split("/")[1]) + 2000)
            ] || 0
        ),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
        max: Math.max(projectsCurrent.length, projectsFinish.length) + 3,
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Estatísticas de Projetos - ${displayYear}`,
        font: { size: 18 },
      },
    },
  };

  const handleMonthChange = (delta: number) =>
    setMonthOffset((prev) => prev + delta);
  const handleYearChange = (delta: number) =>
    setYearOffset((prev) => prev + delta);

  return (
    <div className="w-full h-[400px] flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
        <button
          className="text-lg text-white bg-zinc-700 p-2 rounded-full hover:bg-zinc-800 active:scale-95 transition-all"
          onClick={() => handleYearChange(-1)}
          aria-label="Retroceder ano"
          title="Retroceder um ano"
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          className="text-lg text-white bg-zinc-700 p-2 rounded-full hover:bg-zinc-800 active:scale-95 transition-all"
          onClick={() => handleMonthChange(-1)}
          aria-label="Retroceder mês"
          title="Retroceder um mês"
        >
          <FaChevronCircleLeft />
        </button>
        <span className="text-gray-700 bg-gray-100 px-4 py-2 rounded-md font-medium whitespace-nowrap">
          {months[0].split("/")[0]} - {months[months.length - 1].split("/")[0]}{" "}
          {displayYear}
        </span>
        <button
          className="text-lg text-white bg-zinc-700 p-2 rounded-full hover:bg-zinc-800 active:scale-95 transition-all"
          onClick={() => handleMonthChange(1)}
          aria-label="Avançar mês"
          title="Avançar um mês"
        >
          <FaChevronCircleRight />
        </button>
        <button
          className="text-lg text-white bg-zinc-700 p-2 rounded-full hover:bg-zinc-800 active:scale-95 transition-all"
          onClick={() => handleYearChange(1)}
          aria-label="Avançar ano"
          title="Avançar um ano"
        >
          <FaAngleDoubleRight />
        </button>
      </div>
      <div className="flex-1 w-full h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
