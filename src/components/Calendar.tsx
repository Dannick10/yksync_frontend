import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

type calendarProps = {
    name: string,
    start: Date |string,
    end: Date | string
}

const MyFullCalendar = ({name,start,end}: calendarProps) => {

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"

      events={[
    { title: name, start:start, end: end },
      ]}
    />
  );
}

export default MyFullCalendar