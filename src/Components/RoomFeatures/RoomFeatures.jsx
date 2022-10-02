import React from "react";
import { Accordion, Badge, Carousel, ListGroup } from "react-bootstrap";

const RoomFeatures = ({room }) => {
  return (
    <ListGroup as="ul" variant="flush" className="">
    <ListGroup.Item className="d-flex justify-content-between bg-transparent">
      <span>Sleeps: </span>
      <Badge bg="primary">{room?.sleeps}</Badge>
    </ListGroup.Item>
    <ListGroup.Item className="d-flex justify-content-between bg-transparent">
      <span>Price:</span>
      <Badge bg="success">{`${room?.price} COP`}</Badge>
    </ListGroup.Item>
    <ListGroup.Item>
      Amenities:
      <ListGroup variant="flush">
        {room?.amenities.map((amenity, index) => {
          return (
            <ListGroup.Item key={index} className="d-flex align-content-center">
              <span className="material-symbols-outlined">
                {amenity.icon}
              </span>
              <span className="px-2">{amenity.description}</span>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </ListGroup.Item>
  </ListGroup>
  );
}

export default RoomFeatures;