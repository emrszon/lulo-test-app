import axios from "axios";
import { settings } from "../Configs/settings";

export const createReservation = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${settings.baseAPIURL}/reservations`,
        data,
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log("create reservation error: ", err);
        reject(err)});
  });
};
export const getReservations = (roomCode) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${settings.baseAPIURL}/reservations/${roomCode ? roomCode :''}`,
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log("Get reservation error: ", err);
        reject(err)});
  });
};