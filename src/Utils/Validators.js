import { addDays, areIntervalsOverlapping, isWithinInterval } from "date-fns";

const isDateBetweenDates = (check, from, to) => {
  return (check>from) && (check<to);
}
const isDateEarlierThanDate = (check, from, to) => {
  return (check<from)&&(check<to);
}
const isDateBeyondDate = (check, from, to) => {
  return (check>from)&&(check>to);
}

export const areValidBookingDates = (bookings, checkIn, checkOut) => {
  if (bookings.length===0) return true;
  let valid = true;
  bookings.map((booking) => {
    const bookingInterval = {
            start: new Date(booking.checkIn),
            end: new Date(booking.checkOut)
          }
    const newBookingInterval={
      start: checkIn,
            end: checkOut
    }
    if (areIntervalsOverlapping(bookingInterval, newBookingInterval) || isWithinInterval(checkIn, bookingInterval) || isWithinInterval(checkOut, bookingInterval)  ) {
      return  valid=false;
    }
  })
  return valid
}

// export const isAvailableUntil = (bookings) => {
//   if (bookings.length===0) return "no limit";

//   const intervalToCheck={
//     start: 0,
//     end: addDays(new Date(), 1)
//   }
//   bookings.map((booking) => {
//     const bookingInterval= {
//       start: booking.checkIn,
//       end: booking.checkOut
//     }
//     if (areIntervalsOverlapping(intervalToCheck, bookingInterval)) {
//       return false;
//     }
//   })
//   return true;
// }


export const isAvailableForDates = (bookings, intervalToCheck={
  start: 0,
  end: addDays(new Date(), 1)
}) => {
  if (bookings.length===0) return true;
  bookings.map((booking) => {
    const bookingInterval= {
      start: new Date(booking.checkIn),
      end: new Date(booking.checkOut)
    }
    if (areIntervalsOverlapping(intervalToCheck, bookingInterval)) {
      return false;
    }
  })
  return true;
}