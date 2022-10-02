import { compareAsc } from "date-fns";
import React from "react";
import { Accordion, Carousel, ListGroup, Row } from "react-bootstrap";
import { humanizeBookingsDates } from "../../Utils/Formatters";

const RoomBookingsList = ({bookings}) => {
  if (bookings?.length === 0 ){
    return ( <h5 className="text-center">
      No bookings found!
    </h5> )
  }
  return (
    <ListGroup>
    {bookings?.sort((bookingA, bookingB)=>compareAsc(new Date(bookingA.checkIn), new Date(bookingB.checkIn))).map((booking, index) => {
      return (
        <ListGroup.Item key={index}>
          <span className="d-flex align-content-center pb-2">
            <span className="material-symbols-outlined">person</span>
            <span>User: </span>
            <span className="px-2">{booking?.user}</span>
          </span>
          <Row>
            <span className="d-flex align-content-center col">
              <span className="material-symbols-outlined">login</span>
              <span>Check In: </span>
              <span className="px-2">
                {humanizeBookingsDates(booking?.checkIn)}
              </span>
            </span>
            <span className="d-flex align-content-center col">
              <span className="material-symbols-outlined">logout</span>
              <span>Check Out:</span>
              <span className="px-2">
                {humanizeBookingsDates(booking?.checkOut)}
              </span>
            </span>
          </Row>
        </ListGroup.Item>
      );
    })}
  </ListGroup>
  );
}

export default RoomBookingsList;