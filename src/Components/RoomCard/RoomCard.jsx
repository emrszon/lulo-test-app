import React from "react";
import "./RoomCard.scss";
import { Badge, Card, Col, ListGroup } from "react-bootstrap";
const RoomCard = ({room, handleClick, index}) => {
  return(
  <Col className="room-card">
    <Card className="btn btn-outline-white" onClick={()=>handleClick(room?.code)}>
      <Card.Img variant="top" src={`${room.coverImg}?random=${index}`} />
      <Card.Body>
        <Card.Title>{room.name}</Card.Title>
        <ListGroup as="ul" variant="flush" className="">
          <ListGroup.Item className="d-flex justify-content-between bg-transparent">
            <span>Capacidad: </span>
            <Badge bg="primary">{room.sleeps}</Badge>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between bg-transparent">
            <span>Precio:</span>
            <Badge bg="success">{`${room.price} COP`}</Badge>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  </Col>
  );
}

export default RoomCard;