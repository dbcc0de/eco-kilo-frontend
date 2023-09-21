import { FormEvent, useState } from "react";
import "./ApplianceForm.css";
import Home from "../models/Home";
import Appliance from "../models/Appliance";
import { editHome } from "../services/homeService";

interface Props {
  home: Home;
  editHomeHandler: (home: Home) => void;
}

const ApplianceForm = ({ home, editHomeHandler }: Props) => {
  const [applianceName, setApplianceName] = useState("");
  const [applianceKwh, setApplianceKwh] = useState(0);
  const [applianceStart, setApplianceStart] = useState(0);
  const [applianceStop, setApplianceStop] = useState(0);
  const [addAppliance, setAddAppliance] = useState(false);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const addedAppliance: Appliance = {
      name: applianceName,
      kwh: applianceKwh,
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
  };

  return (
    <div className="ApplianceForm">
      {addAppliance ? (
        <div className="popupContainer">
          <form onSubmit={(e) => handleSubmit(e)}>
            <p>Home: {home.name}</p>
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
              type="number"
              name="applianceKwh"
              id="applianceKwh"
              value={applianceKwh}
              onChange={(e) => setApplianceKwh(Number(e.target.value))}
            />
            <label htmlFor="applianceStart">
              Appliance Start to Stop Time:
            </label>
            <input
              type="range"
              min={0}
              max={24}
              step={1}
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
              step={1}
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
        <button onClick={() => setAddAppliance(true)}>Add Appliance</button>
      )}
    </div>
  );
};

export default ApplianceForm;
