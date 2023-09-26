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

  // must add noon edge case if minutes >= 720 && minutes < 780 return 12 noon
  // convert decimals to two places
  const convertToStandard = (minutes: number) => {
    if (minutes < 720) {
      if (minutes === 0) {
        return `12:00 A.M.`;
      } else if (minutes < 60) {
        return `12:${minutes} A.M.`;
      } else {
        return `${Math.floor(minutes / 60)}:${
          minutes % 60 === 0 ? "00" : minutes % 60
        } A.M.`;
      }
    } else {
      if (minutes === 1440) {
        return `12:00 A.M`;
      } else if (minutes === 720) {
        return `12:00 P.M.`;
      } else if (minutes > 720 && minutes < 780) {
        return `12:${(minutes - 720) % 60} P.M`;
      } else {
        return `${Math.floor((minutes - 720) / 60)}:${
          (minutes - 720) % 60 === 0 ? "00" : (minutes - 720) % 60
        } P.M.`;
      }
    }
  };

  const applianceStartConversion = convertToStandard(applianceStart);
  const applianceStopConversion = convertToStandard(applianceStop);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (applianceStart <= applianceStop) {
      const addedAppliance: Appliance = {
        name: applianceName,
        kwh: Number(applianceKwh),
        startTime: applianceStart / 60,
        endTime: applianceStop / 60,
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
    if (e.target.value === "Select Your Appliance") {
      setApplianceKwh("");
    } else {
      let appKwh = defaultApplianceArray.find(
        (item) => item.name === e.target.value
      ).kwh;
      setApplianceName(e.target.value);
      setApplianceKwh(appKwh);
    }
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
            <label htmlFor="applianceStart">Appliance Start Time:</label>
            <input
              type="range"
              // could have time scaled by 60 min (24 * 60), and step 1 min
              min={0}
              max={1440}
              step={15}
              name="applianceStart"
              id="applianceStart"
              value={applianceStart}
              onChange={(e) => setApplianceStart(Number(e.target.value))}
            />
            <div id="timeConversionContainer">
              <p>
                <span
                  id={
                    applianceStart >= 900 && applianceStart <= 1140
                      ? "peakAlert"
                      : "null"
                  }
                >
                  {applianceStartConversion}
                </span>
                <span
                  id={
                    applianceStop >= 900 && applianceStop <= 1140
                      ? "peakAlert"
                      : "null"
                  }
                >
                  -- {applianceStopConversion}
                </span>
                {(applianceStop >= 900 && applianceStop <= 1140) ||
                (applianceStart >= 900 && applianceStart <= 1140) ? (
                  <p id="peakIndicator">Red = contains peak rate</p>
                ) : (
                  <></>
                )}
              </p>
            </div>
            <label htmlFor="applianceStop">Appliance Stop Time:</label>

            <input
              type="range"
              min={0}
              max={1440}
              step={15}
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
          Add
        </button>
      )}
    </div>
  );
};

export default ApplianceForm;
