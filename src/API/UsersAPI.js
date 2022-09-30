import axios from "axios";
import { settings } from "../Configs/settings";

export const createUser = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${settings.baseAPIURL}/users`,
        data,
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log("create user error: ", err);
        reject(err)});
  });
};
export const getUsers =  () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${settings.baseAPIURL}/users`,
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log("Get users error: ", err);
        reject(err)});
  });
};