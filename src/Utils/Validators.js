const isDateBetweenDates = (check, from, to) => {
  return (check>from) && (check<to);
}
const isDateEarlierThanDate = (check, from, to) => {
  return (check<from);
}

export const areValidReservationDates = (reservations, checkIn, checkOut) => {
  if (reservations.length===0) return true;
  reservations.map((reservation) => {
    if (isDateBetweenDates(checkIn, reservation.checkIn, reservation.checkOut)) {
      return false;
    }
    if (!isDateEarlierThanDate(checkOut, reservation.checkIn)) {
      return false;
    }
  })
}