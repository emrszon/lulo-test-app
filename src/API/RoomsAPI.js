import axios from "axios";
import { settings } from "../Configs/settings";

export const createRooms = async (rooms) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${settings.baseAPIURL}/rooms`,
        rooms,
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log("populate rooms error: ", err);
        reject(err)});
  });
};
export const getRooms =  (roomCode) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${settings.baseAPIURL}/rooms?${roomCode? `code=${roomCode}`:''}`,
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log("Get rooms error: ", err);
        reject(err)});
  });
};
