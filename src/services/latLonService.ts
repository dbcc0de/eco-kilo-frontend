import axios from "axios";

const baseURL: string = process.env.REACT_APP_API_URL || "";

// service to get the city and state from the HomesForm
/* need to gather city and state and use the LocationIQ API to convert 
    city state => lat & lon
    when a user submits the form they submit city and state, we need the 
    handleSubmit to asynchronously convert city state to lat lon
    and populate the Home object getting sent to MongoDB with lat lon.
*/
export const getLatLon = async (city: string, state: string): Promise<void> => {
  console.log(city);
  console.log(state);
  return (await axios.get(`${baseURL}/users/homes`)).data;
};
