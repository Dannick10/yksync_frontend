"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { statusProject } from "@/@types/statusTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCalendarAlt, FaCalendarWeek, FaCalendar } from "react-icons/fa";

type calendarProps = {
  id?: string;
  name?: string;
  start?: Date | string;
  end?: Date | string;
  color?: string;
  projects?: statusProject[];
};

const MyFullCalendar = ({
  id,
  name,
  start,
  end,
  color,
  projects,
}: calendarProps) => {
  const [view, setView] = useState(projects ? "multiMonthYear" : "dayGridWeek");

  const router = useRouter();

  const handleProjectId = (e: any) => {
    const { id } = e.event;
    router.push(`/projects/${id}`);
  };

  const events = projects
    ? projects.map(({ _id, name, startDate, endDate, color }) => ({
        id: _id,
        title: name,
        start: startDate,
        end: endDate,
        backgroundColor: color,
        borderColor: color,
      }))
    : [
        {
          id,
          title: name,
          start,
          end,
          backgroundColor: color,
          borderColor: color,
        },
      ];

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-center gap-2 flex-wrap">
        <button
          className={`p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 active:bg-gray-800 transition-all ${view === "dayGridMonth" ? "bg-gray-800" : ""}`}
          onClick={() => setView("dayGridMonth")}
          aria-label="Visualizar por mês"
          title="Mês"
        >
          <FaCalendarAlt />
        </button>
        <button
          className={`p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 active:bg-gray-800 transition-all ${view === "multiMonthYear" ? "bg-gray-800" : ""}`}
          onClick={() => setView("multiMonthYear")}
          aria-label="Visualizar por multi-mês"
          title="Multi-mês"
        >
          <FaCalendar />
        </button>
        <button
          className={`p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 active:bg-gray-800 transition-all ${view === "dayGridWeek" ? "bg-gray-800" : ""}`}
          onClick={() => setView("dayGridWeek")}
          aria-label="Visualizar por semana"
          title="Semana"
        >
          <FaCalendarWeek />
        </button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, multiMonthPlugin]}
        initialView={view}
        height="100%"
        eventClick={handleProjectId}
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
      />
    </div>
  );
};

export default MyFullCalendar;
