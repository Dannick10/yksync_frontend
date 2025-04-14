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
  Filler,
} from "chart.js";
import { useMemo, useState } from "react";
import type { statusProject } from "@/@types/statusTypes";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSkipBackLine,
  RiSkipForwardLine,
  RiLineChartLine,
  RiCalendarLine,
} from "react-icons/ri";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DisplayCountProject from "./DisplayCountProject";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
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
  monthDisplayCount = 6,
}: ChartComponentProps) => {

  const [monthOffset, setMonthOffset] = useState(indexMoth);
  const [yearOffset, setYearOffset] = useState(0);

  const monthOrder = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
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
    return `${month}/${year % 100}`;
  });

  const createStartedGradient = (ctx: any) => {
    if (!ctx) return null;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(99, 102, 241, 0.4)");
    gradient.addColorStop(1, "rgba(99, 102, 241, 0.0)");
    return gradient;
  };

  const createFinishedGradient = (ctx: any) => {
    if (!ctx) return null;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(20, 184, 166, 0.4)");
    gradient.addColorStop(1, "rgba(20, 184, 166, 0.0)");
    return gradient;
  };

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
                (Number.parseInt(monthYear.split("/")[1]) + 2000)
            ] || 0
        ),
        borderColor: "#6366f1",
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return createStartedGradient(ctx);
        },
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#6366f1",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Projetos Finalizados",
        data: months.map(
          (monthYear) =>
            projectCounts.endCounts[
              monthYear.split("/")[0] +
                "-" +
                (Number.parseInt(monthYear.split("/")[1]) + 2000)
            ] || 0
        ),
        borderColor: "#14b8a6",
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return createFinishedGradient(ctx);
        },
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#14b8a6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          color: "#64748b",
          padding: 10,
        },
        grid: {
          color: "rgba(226, 232, 240, 0.6)",
          drawBorder: false,
        },
        border: {
          display: false,
        },
        max: Math.max(
          ...months.map(
            (monthYear) =>
              Math.max(
                projectCounts.startCounts[
                  monthYear.split("/")[0] +
                    "-" +
                    (Number.parseInt(monthYear.split("/")[1]) + 2000)
                ] || 0,
                projectCounts.endCounts[
                  monthYear.split("/")[0] +
                    "-" +
                    (Number.parseInt(monthYear.split("/")[1]) + 2000)
                ] || 0
              ) + 1
          ),
          3
        ),
      },
      x: {
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          color: "#64748b",
          padding: 10,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: "500",
          },
          color: "#334155",
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        caretSize: 6,
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${value} ${value === 1 ? "projeto" : "projetos"}`;
          },
        },
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    elements: {
      line: {
        borderJoinStyle: "round" as const,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  const handleMonthChange = (delta: number) =>
    setMonthOffset((prev) => prev + delta);
  const handleYearChange = (delta: number) =>
    setYearOffset((prev) => prev + delta);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <RiLineChartLine className="h-5 w-5 text-gray-700" />
          <h3 className="text-xl font-bold text-gray-800">
            Evolução de Projetos
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
          <button
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => handleYearChange(-1)}
            aria-label="Retroceder ano"
            title="Retroceder um ano"
          >
            <RiSkipBackLine className="h-5 w-5" />
          </button>
          <button
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => handleMonthChange(-1)}
            aria-label="Retroceder mês"
            title="Retroceder um mês"
          >
            <RiArrowLeftSLine className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md shadow-sm">
            <RiCalendarLine className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              {months[0].split("/")[0]} -{" "}
              {months[months.length - 1].split("/")[0]} {displayYear}
            </span>
          </div>

          <button
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => handleMonthChange(1)}
            aria-label="Avançar mês"
            title="Avançar um mês"
          >
            <RiArrowRightSLine className="h-5 w-5" />
          </button>
          <button
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => handleYearChange(1)}
            aria-label="Avançar ano"
            title="Avançar um ano"
          >
            <RiSkipForwardLine className="h-5 w-5" />
          </button>
        </div>
      </div>

      <DisplayCountProject />

      <motion.div
        className="flex-1 w-full bg-white rounded-xl border border-gray-200 shadow-sm p-4 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-full">
          <Line data={data} options={options as any} />
        </div>
      </motion.div>
    </div>
  );
};

export default ChartComponent;
