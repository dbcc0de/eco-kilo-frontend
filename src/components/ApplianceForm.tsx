import { useState } from "react";
import "./ApplianceForm.css";

const ApplianceForm = () => {
  const [] = useState("");
  return (
    <form className="ApplianceForm">
      {/* <label htmlFor="applianceName">Appliance Name:</label>
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
        {applianceStart}:00 - {applianceEnd}:00
      </p>
      <label htmlFor="applianceEnd">Appliance Start to Stop Time:</label>

      <input
        type="range"
        min={0}
        max={24}
        step={1}
        name="applianceEnd"
        id="applianceEnd"
        value={applianceEnd}
        onChange={(e) => setApplianceEnd(e.target.value)}
      /> */}
    </form>
  );
};

export default ApplianceForm;
