import axios from "axios";
import Home from "../models/Home";
import Appliance from "../models/Appliance";

const baseURL: string = process.env.REACT_APP_API_URL || "";

// service to get all of a user's homes
export const getHomes = async (googleId: string): Promise<Home[]> => {
  return (await axios.get(`${baseURL}/users/${googleId}/homes`)).data;
};

// service for post, add home with appliances
export const addHome = async (home: Home): Promise<Home> => {
  console.log(home);
  return (await axios.post(`${baseURL}/users/homes`, home)).data;
};

// service for delete home
export const deleteHome = async (id: string): Promise<void> => {
  return await axios.delete(`${baseURL}/homes/${encodeURIComponent(id)}`);
};

// service for put, update home and appliances
export const editHome = async (home: Home, id: string): Promise<Home> => {
  return (await axios.put(`${baseURL}/homes/${encodeURIComponent(id)}`, home))
    .data;
};
