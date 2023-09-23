import { useEffect, useState } from "react";
import Home from "../models/Home";
import { getUtilityRates } from "../services/utilityRatesService";
import "./EnergyResults.css";
import UtilityResponse from "../models/UtilityResponse";
import ResultsChart from "./ResultsChart";

interface Props {
  home: Home;
  setShowResults: (boolean: boolean) => void;
}

const EnergyResults = ({ home, setShowResults }: Props) => {
  const [offPeakCostCounter, setOffPeakCostCounter] = useState(0);
  const [peakCostCounter, setPeakCostCounter] = useState(0);
  // const [] = useState();
  const [utilityResponse, setUtilityResponse] =
    useState<UtilityResponse | null>(null);
  useEffect(() => {
    (async () => {
      await setUtilityResponse(await getUtilityRates(home.lat, home.lon));
    })();
  }, []);
  let [utilityRate, setUtilityRate] = useState(
    utilityResponse?.outputs.residential || 0.1611
  );
  // moved utilityRate to state variable
  // let utilityRate = utilityResponse?.outputs.residential || 0.1611;

  const calculateAllHours = (home: Home): void => {
    if (
      utilityResponse?.outputs.utility_name === "Detroit Public Lighting" ||
      utilityResponse?.outputs.utility_name === "Detroit Edison Co (The)"
    ) {
      setUtilityRate(0.1545);
    }
    const peakStart = 15;
    const peakEnd = 19;
    setPeakCostCounter(0);
    setOffPeakCostCounter(0);
    console.log(home);
    console.log(home.appliances);
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
            console.log(beforePeak);
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
    } else {
      alert("Enter an appliance to calculate your costs");
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
    <>
      <div className="EnergyResults">
        <p>Your Utility Company is: {utilityResponse?.outputs.utility_name}</p>
        <p>Your utility rate is: {utilityRate} cents per kilowatt hour. </p>
        <p>
          You peak utility rate is:{" "}
          {((utilityRate || 0.1611) * 1.37).toFixed(4)} cents per kilowatt hour.
        </p>
        {peakCostCounter ? (
          <>
            {" "}
            <p>Peak rate costs per day: ${peakCostCounter.toFixed(2)} </p>
            <p>
              Off peak rate costs per day: ${offPeakCostCounter.toFixed(2)}{" "}
            </p>
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
        <p>What if my costs changed?</p>
        <div>
          <button onClick={() => setPeakCostCounter((prev) => prev - 0.25)}>
            -
          </button>
          <p style={{ display: "inline" }}>Adjust Peak Costs</p>
          <button onClick={() => setPeakCostCounter((prev) => prev + 0.25)}>
            +
          </button>
        </div>
        <div>
          <button onClick={() => setOffPeakCostCounter((prev) => prev - 0.25)}>
            -
          </button>
          <p style={{ display: "inline" }}>Adjust Off Peak Costs</p>
          <button onClick={() => setOffPeakCostCounter((prev) => prev + 0.25)}>
            +
          </button>
        </div>
      </div>
      <ResultsChart
        peakCostCounter={peakCostCounter}
        offPeakCostCounter={offPeakCostCounter}
      />
    </>
  );
};

export default EnergyResults;
