import axios from "axios";
import GeocodeResponse from "../models/GeocodeResponse";

const key = process.env.REACT_APP_API_KEY_GOOGLE || "";

// service to get the city and state from the HomesForm
/* need to gather city and state and use the LocationIQ API to convert 
    city state => lat & lon
    when a user submits the form they submit city and state, we need the 
    handleSubmit to asynchronously convert city state to lat lon
    and populate the Home object getting sent to MongoDB with lat lon.
*/

/* make interface for google response
replace  void with interface
use axios to hit same endpoint as postman /geocode/?...

*/
export const getLatLon = async (
  city: string,
  state: string
): Promise<GeocodeResponse> => {
  return (
    await axios.get("https://maps.googleapis.com/maps/api/geocode/json?", {
      params: { address: `${city} ${state}`, key },
    })
  ).data;
};
