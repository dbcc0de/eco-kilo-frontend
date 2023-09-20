import axios from "axios";
import UtilityResponse from "../models/UtilityResponse";

const api_key = process.env.REACT_APP_API_KEY_NREL || "";
// make a service that takes in a specific home lat and lon
// that lat lon will return the utility company name and rates
// use the response to calculate energy costs and savings

export const getUtilityRates = async (
  lat: number,
  lon: number
): Promise<UtilityResponse> => {
  return (
    await axios.get("https://developer.nrel.gov/api/utility_rates/v3.json?", {
      params: { api_key, lat, lon },
    })
  ).data;
};
