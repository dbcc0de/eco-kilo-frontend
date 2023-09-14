import Appliance from "./Appliance";

export default interface Home {
  _id?: string;
  googleId: string;
  name: string;
  lat: number;
  lon: number;
  city: string;
  state: string;
  appliances: Appliance[];
}
