import { FormEvent, useContext, useState } from "react";
import "./HomesForm.css";
import AuthContext from "../context/AuthContext";
import Home from "../models/Home";
import { useNavigate } from "react-router-dom";
import MUIMaps from "./MUIMaps";
import { getLatLon } from "../services/latLonService";

interface Props {
  addHomeHandler: (home: Home) => void;
}

const HomesForm = ({ addHomeHandler }: Props) => {
  const { user } = useContext(AuthContext);
  const [homeName, setHomeName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const geocodeLatLon = await getLatLon(city, state);
    console.log(geocodeLatLon);
    const home: Home = {
      googleId: user?.uid!,
      name: homeName,
      lat: geocodeLatLon.results[0].geometry.location.lat || 42.2808256,
      lon: geocodeLatLon.results[0].geometry.location.lng || -83.7430378,
      city: city,
      state: state,
    };
    // home.appliances = arrayOfAppliances
    addHomeHandler(home);
    navigate("/homes");
    console.log(city);
    console.log(state);
  };

  return (
    <form className="HomesForm" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="homeName">Home Name:</label>
      <input
        type="text"
        name="homeName"
        id="homeName"
        value={homeName}
        onChange={(e) => {
          setHomeName(e.target.value);
        }}
      />
      <label htmlFor="setLocation">
        Enter City and State:
        <MUIMaps setCity={setCity} setState={setState} />
      </label>

      <div className="formButton">
        <button>Submit your home data</button>
      </div>
      <div id="googlemaps-attribution-container"></div>
    </form>
  );
};

export default HomesForm;
