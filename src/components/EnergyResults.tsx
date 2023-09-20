import { useEffect, useState } from "react";
import Home from "../models/Home";
import { getUtilityRates } from "../services/utilityRatesService";
import "./EnergyResults.css";
import UtilityResponse from "../models/UtilityResponse";

interface Props {
  home: Home;
}

const EnergyResults = ({ home }: Props) => {
  const [utilityResponse, setUtilityResponse] =
    useState<UtilityResponse | null>(null);
  useEffect(() => {
    (async () => {
      await setUtilityResponse(await getUtilityRates(home.lat, home.lon));
    })();
  }, []);

  // to calculate peak rates and off peak rates, take an appliance end and starttime and decipher if within or outside of peak hours
  // peak hours = 15 - 19
  // off peak hours = 0 - 15, 19 - 24
  // what if an appliance spans both? need to calculate differently

  const peakAndOffPeakCalculation = (home: Home): void => {
    if (home.appliances) {
      home.appliances.map((item) => {
        if (item.endTime <= 19 && item.startTime >= 15) {
          console.log("This appliance is only using peak hours.");
          const kwhPerDay = item.kwh * (item.endTime - item.startTime);
          const costPerDay =
            Number(
              kwhPerDay * (utilityResponse?.outputs.residential || 0.1611)
            ) * 1.64;
          console.log(costPerDay);
        } else if (item.endTime > 15 && item.startTime < 19) {
          console.log("Uses peak and off peak hours");
        } else if (
          item.endTime < 15 ||
          item.endTime > 19 ||
          item.startTime < 15 ||
          item.startTime > 19
        ) {
          console.log("This appliance uses off peak hours");
        }
      });
    }
  };

  const kwhSumAllAppliances = (home: Home): void => {
    // Need to map out the appliances, and mulitply the kwh for each appliance by the time span of use
    if (home.appliances) {
      home.appliances.map((item) => {
        const kwhPerDay = item.kwh * (item.endTime - item.startTime);
        console.log(kwhPerDay);
        // calculate energy costs of kwhPerDay by utility rate
        // if no response, gives US avg (according to EIA) of 16.11 c / kwh
        const costPerDay = Number(
          kwhPerDay * (utilityResponse?.outputs.residential || 0.1611)
        );
        console.log(typeof utilityResponse?.outputs.residential);
        console.log(costPerDay);
      });
      console.log(home.appliances.reduce((pv, cv) => pv + cv.kwh, 0));
    }
  };

  return (
    <div className="EnergyResults">
      <p>Your Utility Company is: {utilityResponse?.outputs.utility_name}</p>
      <p>
        Your utility rate is: {utilityResponse?.outputs.residential} cents per
        kilowatt hour.{" "}
      </p>
      {/* add utility rate */}
      {/* add average utility rate and bill */}
      {/* suggest improvements  */}
      <button onClick={() => kwhSumAllAppliances(home)}>Calculate</button>
      <button onClick={() => peakAndOffPeakCalculation(home)}>
        Check For Peak
      </button>

      {home.appliances ? (
        <>
          {" "}
          <p>{home.appliances[0].kwh} kwh</p>
          <p>{home.appliances[0].startTime}</p>
          <p>{home.appliances[0].endTime}</p>
          <p>
            Result of Appliance 1:{"Total kWhs "}
            {(home.appliances[0].endTime - home.appliances[0].startTime) *
              home.appliances[0].kwh}
          </p>
        </>
      ) : (
        <p>Get rekt</p>
      )}
    </div>
  );
};

export default EnergyResults;
