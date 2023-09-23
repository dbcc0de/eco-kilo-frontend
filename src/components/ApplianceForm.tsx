import { FormEvent, useState } from "react";
import "./ApplianceForm.css";
import Home from "../models/Home";
import Appliance from "../models/Appliance";
import defaultApplianceArray from "../specs/defaultKwh";

interface Props {
  home: Home;
  editHomeHandler: (home: Home) => void;
}

const ApplianceForm = ({ home, editHomeHandler }: Props) => {
  const [applianceName, setApplianceName] = useState("");
  const [applianceKwh, setApplianceKwh] = useState("");
  const [applianceStart, setApplianceStart] = useState(0);
  const [applianceStop, setApplianceStop] = useState(0);
  const [addAppliance, setAddAppliance] = useState(false);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (applianceStart <= applianceStop) {
      const addedAppliance: Appliance = {
        name: applianceName,
        kwh: Number(applianceKwh),
        startTime: applianceStart,
        endTime: applianceStop,
      };

      const homeCopy = {
        ...home,
        appliances: home.appliances
          ? [...home.appliances, addedAppliance]
          : [addedAppliance],
      };
      editHomeHandler(homeCopy);
      console.log(homeCopy);
      setAddAppliance(false);
    } else {
      alert("Appliance stop time must be greater than appliance start time.");
    }
  };

  const handleDefaultChange = (e: any) => {
    let appKwh = defaultApplianceArray.find(
      (item) => item.name === e.target.value
    ).kwh;
    setApplianceName(e.target.value);
    setApplianceKwh(appKwh);
  };

  return (
    <div className="ApplianceForm">
      {addAppliance ? (
        <div className="popupContainer">
          <form onSubmit={(e) => handleSubmit(e)}>
            <p>Home: {home.name}</p>
            <label htmlFor="defaultApplianceName"></label>
            <select
              name="defaultApplianceName"
              value={applianceName}
              onChange={handleDefaultChange}
            >
              <option>Select Your Appliance</option>
              {defaultApplianceArray.map((item) => (
                <option key={item.index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <label htmlFor="applianceName">Appliance Name:</label>
            <input
              type="text"
              name="applianceName"
              id="applianceName"
              placeholder={applianceName}
              value={applianceName}
              onChange={(e) => setApplianceName(e.target.value)}
            />
            <label htmlFor="applianceKwh">Appliance Energy (in kWh):</label>
            <input
              type="number"
              name="applianceKwh"
              id="applianceKwh"
              min={0}
              step={0.01}
              value={applianceKwh}
              onChange={(e) => setApplianceKwh(e.target.value)}
            />
            <label htmlFor="applianceStart">
              Appliance Start to Stop Time:
            </label>
            <input
              type="range"
              // could have time scaled by 60 min (24 * 60), and step 1 min
              min={0}
              max={24}
              step={0.1}
              name="applianceStart"
              id="applianceStart"
              value={applianceStart}
              onChange={(e) => setApplianceStart(Number(e.target.value))}
            />
            <p>
              {applianceStart}:00 - {applianceStop}:00
            </p>
            <label htmlFor="applianceStop">Appliance Start to Stop Time:</label>

            <input
              type="range"
              min={0}
              max={24}
              step={0.1}
              name="applianceStop"
              id="applianceStop"
              value={applianceStop}
              onChange={(e) => setApplianceStop(Number(e.target.value))}
            />
            <button>Confirm Add Appliance</button>
            <button onClick={() => setAddAppliance(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <button
          className="addApplianceButton"
          onClick={() => setAddAppliance(true)}
        >
          +
        </button>
      )}
    </div>
  );
};

export default ApplianceForm;
