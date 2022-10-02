import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createBooking, getBookings } from "../API/BookingsAPI";
import { getRooms } from "../API/RoomsAPI";
import { createUser, getUsers } from "../API/UsersAPI";
import BookingForm from "../Components/BookingForm/BookingForm";
import { useQuery } from "../Utils/Hooks";
import { v4 as uuidv4 } from 'uuid';
import { bookingTemplate } from "../Utils/Mocks";

const BookingsPage = ({ }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState(query.get("roomCode")|| undefined);
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [selectedRoomBookings, setSelectedRoomBookings] = useState(undefined);

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
      {selectedRoom && (
        <Row>
          <Col>
          <h2> Room details</h2>
          </Col>
          <Col>
          <h2> New Booking</h2>
            <BookingForm bookings={selectedRoomBookings} handleSubmit={handleSubmit} code={selectedRoom.code} />
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