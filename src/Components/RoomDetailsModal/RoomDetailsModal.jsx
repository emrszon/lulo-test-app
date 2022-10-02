import React from "react";
import "./RoomDetailsModal.scss";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { compareAsc, format } from "date-fns";
import { humanizeBookingsDates } from "../../Utils/Formatters";
const RoomDetailsModal = ({ show, room, handleClick, onHide }) => {

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`${room?.code} - ${room?.name}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion defaultActiveKey="2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Images</Accordion.Header>
            <Accordion.Body>
              <Carousel className="d-block mx-auto">
                {room?.images?.map((image, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={`${image.url}?random=${index}`}
                        alt={`${image.title}`}
                      />
                      <Carousel.Caption>
                        <p>{`${image.title}`}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Details</Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Bookings</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                {room?.bookings.sort((bookingA, bookingB)=>compareAsc(new Date(bookingA.checkIn), new Date(bookingB.checkIn))).map((booking, index) => {
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
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>handleClick(room?.code)}>Make a Book</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomDetailsModal;
