import { useEffect, useState } from "react";
import Home from "../models/Home";
import { getUtilityRates } from "../services/utilityRatesService";
import "./EnergyResults.css";
import UtilityResponse from "../models/UtilityResponse";

interface Props {
  home: Home;
  setShowResults: (boolean: boolean) => void;
}

const EnergyResults = ({ home, setShowResults }: Props) => {
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

  let utilityRate = utilityResponse?.outputs.residential || 0.1611;

  if (
    utilityResponse?.outputs.utility_name === "Detroit Public Lighting" ||
    utilityResponse?.outputs.utility_name === "Detroit Edison Co (The)"
  ) {
    utilityRate = 0.1545;
  }

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
    setPeakCostCounter(0);
    setOffPeakCostCounter(0);
    if (home.appliances) {
      home.appliances.map((item) => {
        let beforePeak: number | null = null;
        if (item.startTime < peakStart) {
          if (item.endTime <= peakStart) {
            beforePeak = item.endTime - item.startTime;
            const offPeakBeforePeak =
              Number(beforePeak) * item.kwh * utilityRate;
            setOffPeakCostCounter(
              (prev) => (prev += Number(offPeakBeforePeak))
            );
          } else {
            beforePeak = peakStart - item.startTime;
            const offPeakIncludePeak =
              Number(beforePeak) * item.kwh * utilityRate;
            setOffPeakCostCounter(
              (prev) => (prev += Number(offPeakIncludePeak))
            );
          }
        }
        let duringPeak: number | null = null;
        if (item.startTime <= peakEnd && item.endTime >= peakStart) {
          if (item.startTime >= peakStart && item.endTime <= peakEnd) {
            duringPeak = item.endTime - item.startTime;
            const peakOnlyCost =
              Number(duringPeak) * item.kwh * utilityRate * 1.37;
            setPeakCostCounter((prev) => (prev += Number(peakOnlyCost)));
            console.log(peakCostCounter);
          } else {
            duringPeak = peakEnd - item.startTime;
            const peakMixedCost =
              Number(duringPeak) * item.kwh * utilityRate * 1.37;
            setPeakCostCounter((prev) => (prev += Number(peakMixedCost)));
            console.log(peakCostCounter);
          }
        }
        let afterPeak = null;
        if (item.endTime > peakEnd) {
          if (item.startTime <= peakEnd) {
            afterPeak = item.endTime - peakEnd;
            const offPeakMixedCost = Number(afterPeak) * item.kwh * utilityRate;
            setOffPeakCostCounter((prev) => (prev += Number(offPeakMixedCost)));
          } else {
            afterPeak = item.endTime - item.startTime;
            const offPeakOnly = Number(afterPeak) * item.kwh * utilityRate;
            setOffPeakCostCounter((prev) => (prev += Number(offPeakOnly)));
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
      <p>Your utility rate is: {utilityRate} cents per kilowatt hour. </p>
      <p>
        You peak utility rate is: {((utilityRate || 0.1611) * 1.37).toFixed(4)}{" "}
        cents per kilowatt hour.
      </p>
      {peakCostCounter ? (
        <>
          {" "}
          <p>Peak rate costs per day: ${peakCostCounter.toFixed(2)} </p>
          <p>Off peak rate costs per day: ${offPeakCostCounter.toFixed(2)} </p>
          <p>
            Total costs per day: $
            {(offPeakCostCounter + peakCostCounter).toFixed(2)}
          </p>
        </>
      ) : (
        <p>Press Calculate to see your costs</p>
      )}

      {/* add utility rate */}
      {/* add average utility rate and bill */}
      {/* suggest improvements  */}
      <button onClick={() => calculateAllHours(home)}>Calculate Costs</button>
      <button onClick={() => setShowResults(false)}>Exit</button>
    </div>
  );
};

export default EnergyResults;
