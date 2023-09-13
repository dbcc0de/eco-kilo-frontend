import axios from "axios";
import Home from "../models/Home";
import Appliance from "../models/Appliance";

const baseURL: string = process.env.REACT_APP_API_URL || "";

// service to get all of a user's homes

// service for post, add home with appliances
export const addHome = async (home: Home): Promise<Home> => {
  return (await axios.post(`${baseURL}`, home)).data;
};
