import React from "react";
import { Accordion, Carousel, ListGroup } from "react-bootstrap";
import RoomBookingsList from "../RoomBookingsList/RoomBookingsList";
import RoomFeatures from "../RoomFeatures/RoomFeatures";
import RoomGallery from "../RoomGallery/RoomGallery";

const RoomDetails = ({defaultActiveKey="2", room}) => {
  return (
  <Accordion className="bg-transparent" defaultActiveKey={defaultActiveKey||2} flush alwaysOpen>
  <Accordion.Item className="bg-transparent" eventKey="0">
    <Accordion.Header>Images</Accordion.Header>
    <Accordion.Body>
      <RoomGallery images={room?.images} />
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header>Details</Accordion.Header>
    <Accordion.Body>
      <RoomFeatures room={room}/>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header>Bookings</Accordion.Header>
    <Accordion.Body>
      <RoomBookingsList bookings={room?.bookings} />
    </Accordion.Body>
  </Accordion.Item>
</Accordion>);
}

export default RoomDetails;