import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { statusProject } from "@/@types/statusTypes";
import { useRouter } from "next/navigation";

type calendarProps = {
  id?: string
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
}: calendarProps) => {0

  const multiGrid = projects ? multiMonthPlugin : dayGridPlugin;

  const formatCalendar = projects ? "multiMonthYear" : "dayGridWeek";

  const events = projects
    ? projects.map(({ _id,name, startDate, endDate, color }) => ({
        id: _id,
        title: name,
        start: startDate,
        end: endDate,
        backgroundColor: color,
        borderColor: color,
      }))
    : [
        {
          id: id,
          title: name,
          start: start,
          end: end,
          backgroundColor: color,
          borderColor: color,
        },
      ];

      const router = useRouter()

      const handleProjectId = (e: any) => {
          const {id} = e.event

            router.push('/projects/' + id)
      }

  return (
    <FullCalendar
      plugins={[multiGrid]}
      initialView={formatCalendar}
      height="100%"
      eventClick={handleProjectId}
      events={events}
    />
  );
};

export default MyFullCalendar;
