import { FormEvent, useContext, useState } from "react";
import "./HomesForm.css";
import AuthContext from "../context/AuthContext";
import Home from "../models/Home";
import { useNavigate } from "react-router-dom";
import MUIMaps from "./MUIMaps";

interface Props {
  addHomeHandler: (home: Home) => void;
}

const HomesForm = ({ addHomeHandler }: Props) => {
  const { user } = useContext(AuthContext);
  const [homeName, setHomeName] = useState("");
  // need to find out how to convert location to lat and long
  // is there an input method for city / state (are users just in US?)
  const [suggestions, setSuggestions] = useState([]);
  const [placeDetail, setPlaceDetail] = useState();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [applianceName, setApplianceName] = useState("");
  const [applianceKwh, setApplianceKwh] = useState("");
  const [applianceStart, setApplianceStart] = useState("7");
  const [applianceEnd, setApplianceEnd] = useState("15");
  // need to set a status to loading or submitting when form submits and is waiting
  // const [status, setStatus] = useState("Submitting")
  const navigate = useNavigate();

  const loadSuggestions = async (inputValue: string) => {
    //
  };

  const handleSuggestionSelected = async (suggestion: string) => {
    //
  };

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
    // use geolocation if x is true (state variable)
    navigator.geolocation.getCurrentPosition((res) => {
      home.lat = res.coords.latitude;
      home.lon = res.coords.longitude;
    });
    // or else take in city state (search for city / state api)
    // insert city state
    console.log(home);
    addHomeHandler(home);

    //Navigate to /homes
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
          const newValue = e.target.value;
          setPlaceDetail(undefined);
          loadSuggestions(newValue);
        }}
      />
      <MUIMaps setCity={setCity} setState={setState} />
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
      <div id="googlemaps-attribution-container"></div>
    </form>
  );
};

export default HomesForm;
