import { differenceInDays, differenceInHours } from "date-fns";

export type timeResult = {
    formatTime: string,
    colorStatus: string
}

export const configureTIme = (timeStart: string | Date, timeEnd: string | Date) => {
    const pastDateProject = new Date(timeStart);
  const afterDateProject = new Date(timeEnd);

  const daysDifference = differenceInDays(afterDateProject, pastDateProject);
  const hoursDifference = differenceInHours(afterDateProject, pastDateProject);


  const formatTime =
    daysDifference > 0
      ? `${Math.abs(daysDifference)} dias e ${Math.abs(hoursDifference % 24)} horas restantes`
      : daysDifference === 0
        ? "Hoje"
        : `Expirado há ${Math.abs(daysDifference)} dias e ${Math.abs(hoursDifference % 24)} horas atrás`;


    const colorStatus = daysDifference > 0  ? `bg-orange-300`
    : daysDifference === 0
      ? "bg-yellow-300"
      : `bg-green-300`;

      return {
        formatTime,
        colorStatus
      }
}

