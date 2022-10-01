import { faker } from "@faker-js/faker";
import { createReservation, getReservations } from "../API/ReservationsAPI";
import { createRooms, getRooms } from "../API/RoomsAPI";
import { createUser, getUsers } from "../API/UsersAPI";
import { areValidReservationDates } from "./Validators";

faker.setLocale("es_MX");
const amenity = () => ({
  icon: "add",
  description: faker.commerce.productAdjective(),
});
const image = () => ({
  url: "https://loremflickr.com/800/600/room",
  title: faker.commerce.productDescription(),
});

const room = (code) => {
  return {
    code: `${code}`,
    name: faker.commerce.productMaterial(),
    amenities: new Array(faker.datatype.number({ min: 1, max: 10 }))
      .fill({})
      .map(() => {
        return amenity();
      }),
    images: new Array(faker.datatype.number({ min: 1, max: 10 }))
      .fill({})
      .map(() => {
        return image();
      }),
    coverImg: "https://loremflickr.com/800/600/room",
    sleeps: faker.datatype.number({ min: 1, max: 15 }),
    price: faker.commerce.price(30000, 200000, 0, "$"),
  };
};

export const populateRooms = async (quantity = 20) => {
  let response = await getRooms();
  if (response.length > 0) {
    return;
  }
  const ROOMS = new Array(quantity).fill({}).map((item, index) => {
    return (item = room(index + 10));
  });
  await createRooms(ROOMS);
};

const firstName = () => faker.name.firstName();
const lastName = () => faker.name.lastName();
const user = (firstName, lastName) => ({
  firstName,
  lastName,
  phoneNumber: faker.phone.number(),
  email: faker.internet.email(firstName, lastName),
  birthdate: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
});

export const populateUsers = async (quantity = 40) => {
  let response = await getUsers();
  if (response.length > 0) {
    return;
  }
  const USERS = new Array(quantity).fill({}).map((item) => {
    return (item = user(firstName(), lastName()));
  });
  await createUser(USERS);
};

const from = () => faker.date.soon(60);
const to = (from) => faker.date.soon(30, from);
const reservationTemplate = (email, code, checkIn, checkOut) => ({
  id: `${(checkIn.getFullYear()+'').slice(2)}${checkIn.getDate()}${checkIn.getMonth()+1}${checkOut.getDate()}${checkOut.getMonth()+1}${code}`,
  checkIn,
  checkOut,
  user: email,
  room: code,
});

export const populateReservations = async (quantity = 45) => {
  let response = await getReservations();
  if (response.length > 0) {
    return;
  }
  let users = await getUsers();
  let rooms = await getRooms();
  let reservations = await getReservations();
  const RESERVATIONS = [];
  
  faker.helpers.shuffle(users)[0].map((user, index) => {
    const room = faker.helpers.arrayElement(...rooms);
    const roomReservations = reservations.filter((reservation) => reservation.room === room.code);
    let checkIn = from();
    let checkOut = to(checkIn);
    while (!areValidReservationDates(roomReservations, checkIn, checkOut)) {
      checkIn = from();
      checkOut = to(checkIn);
    }
    RESERVATIONS.push(reservationTemplate(user.email, room.code, checkIn, checkOut));
    });
  await createReservation(RESERVATIONS)
};
