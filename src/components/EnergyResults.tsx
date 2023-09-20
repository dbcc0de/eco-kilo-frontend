import { useEffect, useState } from "react";
import Home from "../models/Home";
import { getUtilityRates } from "../services/utilityRatesService";
import "./EnergyResults.css";
import UtilityResponse from "../models/UtilityResponse";

interface Props {
  home: Home;
}

const EnergyResults = ({ home }: Props) => {
  let [offPeakCostCounter, setOffPeakCostCounter] = useState(0);
  let [peakCostCounter, setPeakCostCounter] = useState(0);
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
      setPeakCostCounter(0);
      setOffPeakCostCounter(0);
      home.appliances.map((item) => {
        if (item.endTime <= 19 && item.startTime >= 15) {
          console.log("This appliance is only using peak hours.");
          const kwhPerDay: number = item.kwh * (item.endTime - item.startTime);
          const costPerDay: number =
            Number(
              kwhPerDay * (utilityResponse?.outputs.residential || 0.1611)
            ) * 1.64;
          setPeakCostCounter((prev) => (prev += costPerDay));
          console.log(peakCostCounter);
        } else if (item.endTime > 15 && item.startTime < 19) {
          console.log("Uses peak and off peak hours");
          //  TV starts at 1 and goes until 10
          //  1-3 is off peak, 3-7 is peak, 7-10 is off peak
          // TV begins at 13, ends at 22
          // 15 - 19 peak hours
          // 15 - 13 = 2 hours before peak
          //   22 - 19 = 3 hours after peak
          //  peak hours = end time - start time - hours before peak - hours after peak

          // setpeakCostCounter((peakCostCounter += costPerDay));
        } else if (
          item.endTime < 15 ||
          item.endTime > 19 ||
          item.startTime < 15 ||
          item.startTime > 19
        ) {
          console.log("This appliance uses off peak hours");
          const kwhPerDay: number = item.kwh * (item.endTime - item.startTime);
          const costPerDay: number = Number(
            kwhPerDay * (utilityResponse?.outputs.residential || 0.1611)
          );
          setOffPeakCostCounter((prev) => (prev += costPerDay));
        }
      });
    }
  };

  const calculateAllHours = (home: Home): void => {
    const peakStart = 15;
    const peakEnd = 19;
    if (home.appliances) {
      home.appliances.map((item) => {
        let beforePeak = null;
        if (item.startTime < peakStart) {
          if (item.endTime <= peakStart) {
            beforePeak = item.endTime - item.startTime;
          } else {
            beforePeak = peakStart - item.startTime;
          }
        }
        let duringPeak: number | null = null;
        if (item.startTime <= peakEnd && item.endTime >= peakStart) {
          if (item.startTime >= peakStart && item.endTime <= peakEnd) {
            duringPeak = item.endTime - item.startTime;
            const peakCost =
              Number(duringPeak) *
              item.kwh *
              (utilityResponse?.outputs.residential || 0.1611);
            setPeakCostCounter((prev) => (prev += Number(peakCost)));
          } else {
            duringPeak = peakEnd - item.startTime;
          }
        }
        let afterPeak = null;
        if (item.endTime > peakEnd) {
          if (item.startTime <= peakEnd) {
            afterPeak = item.endTime - peakEnd;
          } else {
            afterPeak = item.endTime - item.startTime;
          }
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
      <p>Peak rate costs: ${peakCostCounter.toFixed(2)} </p>
      <p>Off peak rate costs: ${offPeakCostCounter.toFixed(2)} </p>
      <p>Total costs: ${(offPeakCostCounter + peakCostCounter).toFixed(2)}</p>
      {/* add utility rate */}
      {/* add average utility rate and bill */}
      {/* suggest improvements  */}
      <button onClick={() => kwhSumAllAppliances(home)}>Calculate</button>
      <button onClick={() => calculateAllHours(home)}>Check For Peak</button>
    </div>
  );
};

export default EnergyResults;
