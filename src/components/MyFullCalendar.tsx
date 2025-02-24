import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { statusProject } from "@/@types/statusTypes";

type calendarProps = {
  name?: string;
  start?: Date | string;
  end?: Date | string;
  color?: string;
  projects?: statusProject[];
};

const MyFullCalendar = ({
  name,
  start,
  end,
  color,
  projects,
}: calendarProps) => {

  const multiGrid = projects ? multiMonthPlugin : dayGridPlugin;

  const formatCalendar = projects ? "multiMonthYear" : "dayGridWeek";

  const events = projects
    ? projects.map(({ name, startDate, endDate, color }) => ({
        title: name,
        start: startDate,
        end: endDate,
        backgroundColor: color,
        borderColor: color,
      }))
    : [
        {
          title: name,
          start: start,
          end: end,
          backgroundColor: color,
          borderColor: color,
        },
      ];

  return (
    <FullCalendar
      plugins={[multiGrid]}
      initialView={formatCalendar}
      height="100%"
      events={events}
    />
  );
};

export default MyFullCalendar;
