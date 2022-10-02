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
import RoomDetails from "../RoomDetails/RoomDetails";
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
        <RoomDetails room={room} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>handleClick(room?.code)}>Make a Book</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomDetailsModal;
