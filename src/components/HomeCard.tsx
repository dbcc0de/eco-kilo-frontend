import { FormEvent, useContext, useState } from "react";
import Home from "../models/Home";
import "./HomeCard.css";
import AuthContext from "../context/AuthContext";
import Appliance from "../models/Appliance";
import { Link } from "react-router-dom";
import EnergyResults from "./EnergyResults";

interface Props {
  home: Home;
  deleteHomeHandler: (id: string) => void;
  editHomeHandler: (home: Home) => void;
}

const HomeCard = ({ home, deleteHomeHandler, editHomeHandler }: Props) => {
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

  const handleEditSubmission = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const updatedHome: Home = {
      _id: home._id,
      googleId: user?.uid!,
      name: homeName,
      lat: 0,
      lon: 0,
      city: city,
      state: state,
      appliances,
    };
    editHomeHandler(updatedHome);
  };

  return (
    <li className="HomeCard">
      {openToEdit ? (
        <form onSubmit={(e) => handleEditSubmission(e)}>
          <label htmlFor="homeName">Home: </label>
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
          {home.appliances.map((item, index) => {
            return (
              <div key={item.name + index}>
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
                  value={appliances[index].startTime}
                  onChange={(e) =>
                    setAppliances((prev) => {
                      // move this to function at top of page
                      const previousAppliance = prev[index];
                      const updatedAppliance = {
                        ...previousAppliance,
                        startTime: Number(e.target.value),
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
                  {appliances[index].startTime}:00 - {appliances[index].endTime}
                  :00
                </p>
                <label htmlFor="applianceEnd">
                  Appliance Start to Stop Time:
                </label>

                <input
                  type="range"
                  min={0}
                  max={24}
                  step={1}
                  name="applianceEnd"
                  id="applianceEnd"
                  value={appliances[index].endTime}
                  onChange={(e) =>
                    setAppliances((prev) => {
                      // move this to function at top of page
                      const previousAppliance = prev[index];
                      const updatedAppliance = {
                        ...previousAppliance,
                        endTime: Number(e.target.value),
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
          <button>Submit Changes</button>
          <button onClick={() => setOpenToEdit(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p>Home: {home.name}</p>
          <p>State: {home.state}</p>
          <p>City: {home.city}</p>
          <p>Appliances: </p>
          {!collapse ? (
            <button onClick={() => setCollapse(true)}>Arrow Open</button>
          ) : (
            <ul>
              {home.appliances.map((item) => (
                <li>
                  <p>Name: {item.name}</p>
                  <p>kWh: {item.kwh}</p>
                  <p>Start Time: {item.startTime}</p>
                  <p>End Time: {item.endTime}</p>
                </li>
              ))}
              <button onClick={() => setCollapse(false)}>Arrow Collapse</button>
            </ul>
          )}
          <button onClick={() => setOpenToEdit(true)}>Edit</button>{" "}
          <button onClick={() => deleteHomeHandler(home._id!)}>
            Delete Home
          </button>
          {!showResults ? (
            <button onClick={() => setShowResults(true)}>
              View My Energy Data
            </button>
          ) : (
            <>
              <EnergyResults home={home} />
              <button onClick={() => setShowResults(false)}>Close Data</button>
            </>
          )}
        </>
      )}
    </li>
  );
};

export default HomeCard;
