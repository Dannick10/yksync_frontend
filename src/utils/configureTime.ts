import { differenceInDays, differenceInHours, differenceInMonths, differenceInYears } from "date-fns";

export type timeResult = {
  formatTime: string;
  colorStatus: string;
};

export const configureTIme = (
  timeStart: string | Date,
  timeEnd: string | Date
) => {
  const pastDateProject = new Date(timeStart);
  const afterDateProject = new Date(timeEnd);

  const daysDifference = differenceInDays(afterDateProject, pastDateProject);
  const hoursDifference = differenceInHours(afterDateProject, pastDateProject);
  const monthsDifference = differenceInMonths(afterDateProject, pastDateProject);
  const yearsDifference = differenceInYears(afterDateProject, pastDateProject);

  const absoluteDays = Math.abs(daysDifference);
  const absoluteHours = Math.abs(hoursDifference % 24);
  const absoluteMonths = Math.abs(monthsDifference % 12);
  const absoluteYears = Math.abs(yearsDifference);

  let formatTime = "";

  if (daysDifference > 0) {

    if (absoluteYears > 0) {
      formatTime = `${absoluteYears} ano${absoluteYears > 1 ? 's' : ''}`;
      if (absoluteMonths > 0) {
        formatTime += ` e ${absoluteMonths} mês${absoluteMonths > 1 ? 'es' : ''}`;
      }
      formatTime += ' restante' + (absoluteYears > 1 || absoluteMonths > 0 ? 's' : '');
    } else if (absoluteMonths > 0) {
      formatTime = `${absoluteMonths} mês${absoluteMonths > 1 ? 'es' : ''}`;
      if (absoluteDays % 30 > 0) {
        formatTime += ` e ${absoluteDays % 30} dia${absoluteDays % 30 > 1 ? 's' : ''}`;
      }
      formatTime += ' restante' + (absoluteMonths > 1 || (absoluteDays % 30) > 0 ? 's' : '');
    } else if (absoluteDays > 0) {
      formatTime = `${absoluteDays} dia${absoluteDays > 1 ? 's' : ''}`;
      if (absoluteHours > 0) {
        formatTime += ` e ${absoluteHours} hora${absoluteHours > 1 ? 's' : ''}`;
      }
      formatTime += ' restante' + (absoluteDays > 1 || absoluteHours > 0 ? 's' : '');
    } else {
      formatTime = `${absoluteHours} hora${absoluteHours > 1 ? 's' : ''} restante${absoluteHours > 1 ? 's' : ''}`;
    }
  } else if (daysDifference === 0) {

    formatTime = "Hoje";
  } else {

    if (absoluteYears > 0) {
      formatTime = `Expirado há ${absoluteYears} ano${absoluteYears > 1 ? 's' : ''}`;
      if (absoluteMonths > 0) {
        formatTime += ` e ${absoluteMonths} mês${absoluteMonths > 1 ? 'es' : ''}`;
      }
    } else if (absoluteMonths > 0) {
      formatTime = `Expirado há ${absoluteMonths} mês${absoluteMonths > 1 ? 'es' : ''}`;
      if (absoluteDays % 30 > 0) {
        formatTime += ` e ${absoluteDays % 30} dia${absoluteDays % 30 > 1 ? 's' : ''}`;
      }
    } else if (absoluteDays > 0) {
      formatTime = `Expirado há ${absoluteDays} dia${absoluteDays > 1 ? 's' : ''}`;
      if (absoluteHours > 0) {
        formatTime += ` e ${absoluteHours} hora${absoluteHours > 1 ? 's' : ''}`;
      }
    } else {
      formatTime = `Expirado há ${absoluteHours} hora${absoluteHours > 1 ? 's' : ''}`;
    }
  }

  const colorStatus =
    daysDifference > 0
      ? `linear-gradient(90deg, #2E8B57 , #00A86B )`
      : daysDifference === 0
        ? "linear-gradient(90deg, #FFD700 , #FFC300)"
        : `linear-gradient(90deg, #DC143C  , #B22222 )`;

  return {
    formatTime,
    colorStatus,
  };
};