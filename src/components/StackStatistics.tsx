"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCodeSSlashFill,
  RiDatabase2Fill,
  RiServerFill,
  RiTestTubeFill,
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiBarChartGroupedFill,
  RiLoader4Line,
} from "react-icons/ri";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { getStacks } from "@/redux/slices/stackSlices";
import Loading from "@/app/loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TechStacksWithCounts = {
  [key: string]: number;
};

const TechStatistics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stacks, loading, error } = useSelector(
    (state: RootState) => state.stack
  );
  const [activeCategory, setActiveCategory] = useState<string>("frontend");

  useEffect(() => {
    dispatch(getStacks());
  }, [dispatch]);

  if (loading || !stacks || !stacks.stacks) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-6 flex flex-col items-center justify-center h-[400px]">
        <p className="text-red-500">Erro ao carregar estatísticas: {error}</p>
      </div>
    );
  }

  const techStacks = stacks.stacks;

  const totalTechs = Object.values(techStacks).reduce(
    (acc: number, category: any) => {
      return acc + Object.keys(category).length;
    },
    0
  );

  const getMostUsedTech = (category: TechStacksWithCounts) => {
    if (Object.keys(category).length === 0)
      return { name: "Nenhuma", count: 0 };

    return Object.entries(category).reduce(
      (max, [tech, count]) => (count > max.count ? { name: tech, count } : max),
      {
        name: "",
        count: 0,
      }
    );
  };

  const mostUsedTechs = {
    frontend: getMostUsedTech(techStacks.frontend),
    backend: getMostUsedTech(techStacks.backend),
    database: getMostUsedTech(techStacks.database),
    tests: getMostUsedTech(techStacks.tests),
  };

  const chartData = {
    labels: Object.keys(
      techStacks[activeCategory as keyof typeof techStacks] || {}
    ),
    datasets: [
      {
        label: `Uso de tecnologias ${getCategoryLabel(activeCategory)}`,
        data: Object.values(
          techStacks[activeCategory as keyof typeof techStacks] || {}
        ),
        backgroundColor: getGradientColors(
          Object.keys(
            techStacks[activeCategory as keyof typeof techStacks] || {}
          ).length
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `${value} ${value === 1 ? "projeto" : "projetos"}`;
          },
        },
      },
    },
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return <RiCodeSSlashFill className="h-5 w-5" />;
      case "backend":
        return <RiServerFill className="h-5 w-5" />;
      case "database":
        return <RiDatabase2Fill className="h-5 w-5" />;
      case "tests":
        return <RiTestTubeFill className="h-5 w-5" />;
      default:
        return <RiBarChartGroupedFill className="h-5 w-5" />;
    }
  };

  function getCategoryLabel(category: string): string {
    switch (category) {
      case "frontend":
        return "Frontend";
      case "backend":
        return "Backend";
      case "database":
        return "Banco de Dados";
      case "tests":
        return "Testes";
      default:
        return "";
    }
  }

  function getGradientColors(count: number): string[] {
    const baseColors = [
      "rgba(75, 192, 192, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(153, 102, 255, 0.8)",
      "rgba(255, 159, 64, 0.8)",
      "rgba(255, 99, 132, 0.8)",
      "rgba(255, 206, 86, 0.8)",
    ];

    return Array(count)
      .fill(0)
      .map((_, i) => baseColors[i % baseColors.length]);
  }

  const handlePrevCategory = () => {
    const categories = ["frontend", "backend", "database", "tests"];
    const currentIndex = categories.indexOf(activeCategory);
    const prevIndex =
      (currentIndex - 1 + categories.length) % categories.length;
    setActiveCategory(categories[prevIndex]);
  };

  const handleNextCategory = () => {
    const categories = ["frontend", "backend", "database", "tests"];
    const currentIndex = categories.indexOf(activeCategory);
    const nextIndex = (currentIndex + 1) % categories.length;
    setActiveCategory(categories[nextIndex]);
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-bold">Estatísticas de Tecnologias</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <RiBarChartGroupedFill className="h-5 w-5 text-gray-700" />
            <h3 className="font-medium">Total de Tecnologias</h3>
          </div>
          <p className="text-2xl font-bold">{totalTechs}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <RiCodeSSlashFill className="h-5 w-5 text-gray-700" />
            <h3 className="font-medium">Frontend Favorito</h3>
          </div>
          <p className="text-2xl font-bold capitalize">
            {mostUsedTechs.frontend.name}
          </p>
          <p className="text-sm text-gray-500">
            {mostUsedTechs.frontend.count}{" "}
            {mostUsedTechs.frontend.count === 1 ? "projeto" : "projetos"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <RiServerFill className="h-5 w-5 text-gray-700" />
            <h3 className="font-medium">Backend Favorito</h3>
          </div>
          <p className="text-2xl font-bold capitalize">
            {mostUsedTechs.backend.name}
          </p>
          <p className="text-sm text-gray-500">
            {mostUsedTechs.backend.count}{" "}
            {mostUsedTechs.backend.count === 1 ? "projeto" : "projetos"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <RiDatabase2Fill className="h-5 w-5 text-gray-700" />
            <h3 className="font-medium">Database Favorito</h3>
          </div>
          <p className="text-2xl font-bold capitalize">
            {mostUsedTechs.database.name}
          </p>
          <p className="text-sm text-gray-500">
            {mostUsedTechs.database.count}{" "}
            {mostUsedTechs.database.count === 1 ? "projeto" : "projetos"}
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevCategory}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Categoria anterior"
        >
          <RiArrowLeftSLine className="h-5 w-5" />
        </button>

        <div className="flex space-x-2 sm:space-x-4">
          {["frontend", "backend", "database", "tests"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                activeCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {getCategoryIcon(category)}
              <span className="hidden sm:inline">
                {getCategoryLabel(category)}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={handleNextCategory}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Próxima categoria"
        >
          <RiArrowRightSLine className="h-5 w-5" />
        </button>
      </div>

      {/* Chart Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-[300px] mt-4"
        >
          {Object.keys(
            techStacks[activeCategory as keyof typeof techStacks] || {}
          ).length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-gray-500">
                Nenhuma tecnologia{" "}
                {getCategoryLabel(activeCategory).toLowerCase()} encontrada
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Technology Tags */}
      <div className="mt-6">
        <h3 className="font-medium mb-3">
          Todas as Tecnologias {getCategoryLabel(activeCategory)}
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(
            techStacks[activeCategory as keyof typeof techStacks] || {}
          ).map(([tech, count]) => (
            <div
              key={tech}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
            >
              <span className="capitalize">{tech}</span>
              <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                {count as number}
              </span>
            </div>
          ))}

          {Object.keys(
            techStacks[activeCategory as keyof typeof techStacks] || {}
          ).length === 0 && (
            <p className="text-gray-500 text-sm">
              Nenhuma tecnologia encontrada
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechStatistics;
