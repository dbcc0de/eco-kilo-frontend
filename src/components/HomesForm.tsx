import { FormEvent, useContext, useState } from "react";
import "./HomesForm.css";
import AuthContext from "../context/AuthContext";
import Appliance from "../models/Appliance";
import { addHome } from "../services/homeService";
import Home from "../models/Home";

interface Props {
  addHomeHandler: (home: Home) => void;
}

const HomesForm = ({ addHomeHandler }: Props) => {
  const { user } = useContext(AuthContext);
  const [homeName, setHomeName] = useState("");
  // need to find out how to convert location to lat and long
  // is there an input method for city / state (are users just in US?)
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [applianceName, setApplianceName] = useState("");
  const [applianceKwh, setApplianceKwh] = useState("");
  const [applianceStart, setApplianceStart] = useState("7");
  const [applianceEnd, setApplianceEnd] = useState("15");

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    // does lat lon API go here first?
    const home: Home = {
      googleId: user?.uid!,
      name: homeName,
      lat: 0,
      lon: 0,
      city: city,
      state: state,
      appliances: [
        {
          name: applianceName,
          kwh: Number(applianceKwh),
          startTime: Number(applianceStart),
          endTime: Number(applianceEnd),
        },
      ],
    };
    navigator.geolocation.getCurrentPosition((res) => {
      home.lat = res.coords.latitude;
      home.lon = res.coords.longitude;
    });
    addHomeHandler(home);
    // setHomeName("");
    // setCity("");
    // setState("");
    // setApplianceName("");
    // setApplianceStart("7");
    // setApplianceEnd("15");
  };

  return (
    <form className="HomesForm" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="homeName">Home Name:</label>
      <input
        type="text"
        name="homeName"
        id="homeName"
        value={homeName}
        onChange={(e) => setHomeName(e.target.value)}
      />
      <label htmlFor="city">City: </label>
      <input
        type="text"
        name="city"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <label htmlFor="state">State: </label>
      <input
        type="text"
        name="state"
        id="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />

      <button>Submit your home data</button>
    </form>
  );
};

export default HomesForm;
