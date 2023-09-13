import { useContext, useState } from "react";
import "./HomesForm.css";
import AuthContext from "../context/AuthContext";
import Appliance from "../models/Appliance";

const HomesForm = () => {
  const { user } = useContext(AuthContext);
  const [homeName, setHomeName] = useState("");
  // need to find out how to convert location to lat and long
  // is there an input method for city / state (are users just in US?)
  const [cityState, setCityState] = useState("");
  const [applianceName, setApplianceName] = useState("");
  const [applianceKwh, setApplianceKwh] = useState("");
  const [applianceStart, setApplianceStart] = useState("0");
  const [applianceStop, setApplianceStop] = useState("12");

  return (
    <form className="HomesForm">
      <label htmlFor="homeName">Home Name:</label>
      <input
        type="text"
        name="homeName"
        id="homeName"
        value={homeName}
        onChange={(e) => setHomeName(e.target.value)}
      />
      <label htmlFor="cityState">City and State:</label>
      <input
        type="text"
        name="cityState"
        id="cityState"
        value={cityState}
        onChange={(e) => setCityState(e.target.value)}
      />

      <label htmlFor="applianceName">Appliance Name:</label>
      <input
        type="text"
        name="applianceName"
        id="applianceName"
        value={applianceName}
        onChange={(e) => setApplianceName(e.target.value)}
      />
      <label htmlFor="applianceKwh">Appliance Energy (in kWh):</label>
      <input
        type="text"
        name="applianceKwh"
        id="applianceKwh"
        value={applianceKwh}
        onChange={(e) => setApplianceKwh(e.target.value)}
      />
      <label htmlFor="applianceStart">Appliance Start to Stop Time:</label>
      <input
        type="range"
        min={0}
        max={24}
        step={1}
        name="applianceStart"
        id="applianceStart"
        value={applianceStart}
        onChange={(e) => setApplianceStart(e.target.value)}
      />
      <p>
        {applianceStart}:00 - {applianceStop}:00
      </p>
      <label htmlFor="applianceStop">Appliance Start to Stop Time:</label>

      <input
        type="range"
        min={0}
        max={24}
        step={1}
        name="applianceStop"
        id="applianceStop"
        value={applianceStop}
        onChange={(e) => setApplianceStop(e.target.value)}
      />
    </form>
  );
};

export default HomesForm;
