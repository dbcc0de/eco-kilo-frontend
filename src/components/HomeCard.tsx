import { FormEvent, useContext, useState } from "react";
import Home from "../models/Home";
import "./HomeCard.css";
import AuthContext from "../context/AuthContext";
import Appliance from "../models/Appliance";
import { Link } from "react-router-dom";
import EnergyResults from "./EnergyResults";
import MUIMaps from "./MUIMaps";
import { getLatLon } from "../services/latLonService";
import ApplianceForm from "./ApplianceForm";
import HomesForm from "./HomesForm";

interface Props {
  home: Home;
  deleteHomeHandler: (id: string) => void;
  editHomeHandler: (home: Home) => void;
  length: number;
}

const HomeCard = ({
  home,
  deleteHomeHandler,
  editHomeHandler,
  length,
}: Props) => {
  const [openToEdit, setOpenToEdit] = useState(false);
  const { user } = useContext(AuthContext);
  const [homeName, setHomeName] = useState(home.name || "");
  const [city, setCity] = useState(home.city || "");
  const [state, setState] = useState(home.state || "");
  const [collapse, setCollapse] = useState(false);
  const [showResults, setShowResults] = useState(false);
  // const [applianceName, setApplianceName] = useState(home.appliances || "");
  // const [applianceKwh, setApplianceKwh] = useState(home.appliances || "");
  // const [applianceStart, setApplianceStart] = useState("7");
  // const [applianceEnd, setApplianceEnd] = useState("15");
  const [appliances, setAppliances] = useState<Appliance[]>(
    home.appliances || []
  );

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

  const handleEditSubmission = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const geocodeLatLon = await getLatLon(city, state);
    const updatedHome: Home = {
      _id: home._id,
      googleId: user?.uid!,
      name: homeName,
      lat: geocodeLatLon.results[0].geometry.location.lat || 42.2808256,
      lon: geocodeLatLon.results[0].geometry.location.lng || -83.7430378,
      city: city,
      state: state,
      appliances,
    };
    editHomeHandler(updatedHome);
    setOpenToEdit(false);
  };

  const handleRemoveAppliance = async (index: number): Promise<void> => {
    // need to send back home with updated appliance array
    const copy = {
      ...home,
    };
    const updatedAppliances = [
      ...home.appliances!.slice(0, index),
      ...home.appliances!.slice(index + 1),
    ];
    copy.appliances = updatedAppliances;
    editHomeHandler(copy);
  };

  return (
    <li className="HomeCard">
      {openToEdit ? (
        <form onSubmit={(e) => handleEditSubmission(e)}>
          <label htmlFor="homeName">Home: </label>
          <input
            type="text"
            id="homeName"
            value={homeName}
            onChange={(e) => setHomeName(e.target.value)}
          />
          <MUIMaps setCity={setCity} setState={setState} />
          {home.appliances?.map((item, index) => {
            return (
              <div id="editApplianceContainer" key={item.name + index}>
                <label htmlFor="applianceName">Appliance Name:</label>
                <input
                  type="text"
                  name="applianceName"
                  id="applianceName"
                  value={appliances[index].name}
                  onChange={(e) =>
                    setAppliances((prev) => {
                      // move this to function at top of page
                      const previousAppliance = prev[index];
                      const updatedAppliance = {
                        ...previousAppliance,
                        name: e.target.value,
                      };
                      return [
                        ...prev.slice(0, index),
                        updatedAppliance,
                        ...prev.slice(index + 1),
                      ];
                    })
                  }
                />
                <label htmlFor="applianceKwh">Appliance Energy (in kWh):</label>
                <input
                  type="text"
                  name="applianceKwh"
                  id="applianceKwh"
                  value={appliances[index].kwh}
                  onChange={(e) =>
                    setAppliances((prev) => {
                      const previousAppliance = prev[index];
                      const updatedAppliance = {
                        ...previousAppliance,
                        kwh: Number(e.target.value),
                      };
                      return [
                        ...prev.slice(0, index),
                        updatedAppliance,
                        ...prev.slice(index + 1),
                      ];
                    })
                  }
                />
                <br></br>
                <label htmlFor="applianceStart">
                  Appliance Start to Stop Time:
                </label>
                <input
                  type="range"
                  min={0}
                  max={1440}
                  step={15}
                  name="applianceStart"
                  id="applianceStart"
                  value={appliances[index].startTime * 60}
                  onChange={(e) =>
                    setAppliances((prev) => {
                      // move this to function at top of page
                      const previousAppliance = prev[index];
                      const updatedAppliance = {
                        ...previousAppliance,
                        startTime: Number(e.target.value) / 60,
                      };
                      return [
                        ...prev.slice(0, index),
                        updatedAppliance,
                        ...prev.slice(index + 1),
                      ];
                    })
                  }
                />
                <p>
                  {convertToStandard(appliances[index].startTime * 60)} -
                  {convertToStandard(appliances[index].endTime * 60)}
                </p>
                <label htmlFor="applianceEnd">
                  Appliance Start to Stop Time:
                </label>

                <input
                  type="range"
                  min={0}
                  max={1440}
                  step={15}
                  name="applianceEnd"
                  id="applianceEnd"
                  value={appliances[index].endTime * 60}
                  onChange={(e) =>
                    setAppliances((prev) => {
                      // move this to function at top of page
                      const previousAppliance = prev[index];
                      const updatedAppliance = {
                        ...previousAppliance,
                        endTime: Number(e.target.value) / 60,
                      };
                      return [
                        ...prev.slice(0, index),
                        updatedAppliance,
                        ...prev.slice(index + 1),
                      ];
                    })
                  }
                />
              </div>
            );
          })}
          <button type="submit">Submit Changes</button>
          <button type="button" onClick={() => setOpenToEdit(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          {/* Shows data from DB, does not update when form submits unless changed to state variables */}
          <p>Home: {home.name}</p>
          <p>City: {home.city}</p>
          <p>State: {home.state}</p>
          <p id="appliancesLabel">
            Appliances: {home.appliances?.length || 0}{" "}
          </p>
          {!collapse && home.appliances?.length ? (
            <button
              className="viewMinApplianceButton"
              onClick={() => setCollapse(true)}
            >
              View
            </button>
          ) : (
            <ul id={home.appliances?.length ? "scrollList" : "null"}>
              {home.appliances?.map((item, index) => (
                <li key={item.name + index}>
                  <p>Name: {item.name}</p>
                  <p>kWh: {item.kwh}</p>
                  <p>Start Time: {convertToStandard(item.startTime * 60)}</p>
                  <p>End Time: {convertToStandard(item.endTime * 60)}</p>
                  <button onClick={() => handleRemoveAppliance(index)}>
                    Remove Appliance
                  </button>
                </li>
              ))}
            </ul>
          )}
          {collapse ? (
            <button
              className="minimizeAppliancesButton"
              onClick={() => setCollapse(false)}
            >
              Minimize Appliances
            </button>
          ) : (
            <></>
          )}
          <ApplianceForm home={home} editHomeHandler={editHomeHandler} />

          <div className="buttonContainer">
            <button onClick={() => setOpenToEdit(true)}>Edit Home</button>
            <button onClick={() => deleteHomeHandler(home._id!)}>
              Delete Home
            </button>
          </div>
          {!showResults ? (
            <button
              className="viewEnergyButton"
              onClick={() => setShowResults(true)}
            >
              View My Energy Data
            </button>
          ) : (
            <div className="popupContainer">
              <EnergyResults setShowResults={setShowResults} home={home} />
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default HomeCard;
