import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createBooking, getBookings } from "../API/BookingsAPI";
import { getRooms } from "../API/RoomsAPI";
import { createUser, getUsers } from "../API/UsersAPI";
import BookingForm from "../Components/BookingForm/BookingForm";
import { useQuery } from "../Utils/Hooks";
import { v4 as uuidv4 } from 'uuid';
import { bookingTemplate } from "../Utils/Mocks";
import RoomDetails from "../Components/RoomDetails/RoomDetails";

const BookingsPage = ({ }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState(query.get("roomCode")|| undefined);
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [selectedRoomBookings, setSelectedRoomBookings] = useState(undefined);
  const [show, setShow] = useState(false);

  const fetchRoomInfo = async (roomCode) => {
    try {
      const response = await getRooms(roomCode);
      if (response) setSelectedRoom(response[0]);
    } catch (error) {
      console.log(error);

    }
  };
  const fetchBookings = async (code=undefined) => {
    try {
      const response = await getBookings(code);
      if (response) setSelectedRoomBookings(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(roomCode){
      fetchRoomInfo(roomCode);
      fetchBookings(roomCode);
      setRoomCode(undefined);
    }
  })

  const handleSubmit = async ({firstName, lastName, birthdate, email, phoneNumber, checkIn, checkOut, room}) => {
    try {
      const response = await getUsers(email);
      if (!response) {
        await createUser({id: uuidv4(),firstName, lastName, birthdate: new Date(birthdate), email, phoneNumber});
      }
      await createBooking(bookingTemplate(email, room, new Date(checkIn), new Date(checkOut)))
      await fetchBookings(room);
    } catch (error) {
      console.log(`Create Booking error: ${error}`);
    }
  }

  return (
    <Container>
      <h1 >
        Bookings
      </h1>
      <Toast bg={"danger"} className="w-100" onClose={() => setShow(false)} show={show} delay={10000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Invalid Check-In/Check-Out dates!.</Toast.Body>
      </Toast>
      {selectedRoom && (
        <Row>
          <Col lg="6">
          <h3> Room details</h3>
          <h4>{`${selectedRoom?.code} - ${selectedRoom?.name}`}</h4>
          <RoomDetails room={{...selectedRoom, bookings: selectedRoomBookings}} defaultActiveKey="1" />
          </Col>
          <Col lg="6">
          <h3> New Booking</h3>
            <BookingForm bookings={selectedRoomBookings} handleSubmit={handleSubmit} code={selectedRoom?.code} setShow={setShow} />
          </Col>
        </Row>
      )}
      {!selectedRoom && (
        <Row>
          <Col>
          No Room find/selected
          </Col>
          <Button onClick={()=>navigate("/rooms")}> Go to rooms</Button>
        </Row>
      )}
      </Container>
  );
}

export default BookingsPage;