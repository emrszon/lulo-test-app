import { format } from "date-fns";

export const humanizeBookingsDates = (date) => format(new Date(date), "dd MMM");
export const calendarizeDate = (date) => format(new Date(date), "yyyy-MM-dd");