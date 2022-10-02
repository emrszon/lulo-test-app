import React, { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getBookings } from "../API/BookingsAPI";
import { getRooms } from "../API/RoomsAPI";
import RoomCard from "../Components/RoomCard/RoomCard";
import RoomDetailsModal from "../Components/RoomDetailsModal/RoomDetailsModal";
import { useQuery } from "../Utils/Hooks";

const RoomsPage = ({}) => {
  const query = useQuery();
  const roomCode = query.get("roomCode");
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(undefined);
  const [selectedRoom, setSelectedRoom] = useState(roomCode||undefined);
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(undefined);

  const fetchRooms = async () => {
    try {
      const response = await getRooms();
      setRooms(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBookings = async (code=undefined) => {
    try {
      const response = await getBookings(code);
      setSelectedRoomInfo({...rooms.find((room)=>room.code===code),bookings: response});
      setSelectedRoom(undefined)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!rooms) {
      fetchRooms();
    }
  });
  useEffect(() => {
    if(selectedRoom){
      fetchBookings(selectedRoom);
    }
  })

  const handleClickRoom=(code) => {
    setSelectedRoom(code);
  }
  const handleCloseRoomModal=() => {
    setSelectedRoomInfo(undefined);
  }
  const handleClickMakeBook=(id)=>{
    setSelectedRoomInfo(undefined);
    navigate(`/bookings?roomCode=${id}`)
  }
  return (
    <Container>
      <h1>Rooms</h1>
      <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
        {rooms?.map((room, index) => {
          return (
            <RoomCard room={room} key={room.code} handleClick={handleClickRoom} index={index}/>)
        })}
      </Row>
      <RoomDetailsModal room={selectedRoomInfo} show={selectedRoomInfo} handleClick={handleClickMakeBook} onHide={handleCloseRoomModal} />
    </Container>
  );
};

export default RoomsPage;
