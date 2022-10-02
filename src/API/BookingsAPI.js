import axios from "axios";
import { settings } from "../Configs/settings";

export const createBooking = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${settings.baseAPIURL}/bookings`,
        data,
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log("create booking error: ", err);
        reject(err)});
  });
};
export const getBookings = (roomCode) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${settings.baseAPIURL}/bookings/${roomCode ? `?room=${roomCode}` :''}`,
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log("Get booking error: ", err);
        reject(err)});
  });
};