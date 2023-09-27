import "./SampleApplianceForm.css";
import defaultApplianceArray from "../specs/defaultKwh";
import { FormEvent, useState } from "react";
import SampleBarChart from "./SampleBarChart";
import wires from "../assets/wiresDefault.png";

const SampleApplianceForm = () => {
  const [utilityCo, setUtilityCo] = useState("");
  const [applianceName, setApplianceName] = useState("");
  const [applianceKwh, setApplianceKwh] = useState("");
  const [applianceHours, setApplianceHours] = useState(0);
  const [applianceMins, setApplianceMins] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [summerPeakRateCalc, setSummerPeakRateCalc] = useState("");
  const [winterPeakRateCalc, setWinterPeakRateCalc] = useState("");
  const [offPeakRateCalc, setOffPeakRateCalc] = useState("");
  const [offPeakWinterRateCalc, setOffPeakWinterRateCalc] = useState("");

  let peakRateSummer = 0.2098;
  let peakRateWinter = 0.1675;
  let offPeakRate = 0.1545;

  //   const peakRateCalc = Number(applianceKwh) * Number(applianceHours) * peakRate;

  const handleDefaultChange = (e: any) => {
    if (e.target.value === "Select An Appliance") {
      setApplianceKwh("");
    } else {
      let appKwh = defaultApplianceArray.find(
        (item) => item.name === e.target.value
      ).kwh;
      setApplianceName(e.target.value);
      setApplianceKwh(appKwh);
    }
  };

  const calcCostFunction = (rate: number): string => {
    return (
      Number(applianceKwh) *
      rate *
      ((Number(applianceHours) * 60 + Number(applianceMins)) / 60)
    ).toFixed(2);
  };

  const calcSavings = (peak: string, offPeak: string): number => {
    if (Number(peak) - Number(offPeak) < 1) {
      return parseFloat((Number(peak) - Number(offPeak)).toFixed(2));
    } else {
      return parseFloat((Number(peak) - Number(offPeak)).toFixed(2));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setOffPeakWinterRateCalc("");
    if (utilityCo === "DTE Energy") {
      const dteSummerPeakCosts: string = calcCostFunction(peakRateSummer);
      setSummerPeakRateCalc(dteSummerPeakCosts);
      const dteWinterPeakCosts: string = calcCostFunction(peakRateWinter);
      setWinterPeakRateCalc(dteWinterPeakCosts);
      const dteOffPeakCosts: string = calcCostFunction(offPeakRate);
      setOffPeakRateCalc(dteOffPeakCosts);
    } else if (utilityCo === "Consumers Energy") {
      const consumersSummerPeak = calcCostFunction(0.223);
      setSummerPeakRateCalc(consumersSummerPeak);
      const consumersWinterPeak = calcCostFunction(0.17);
      setWinterPeakRateCalc(consumersWinterPeak);
      const consumersOffPeak = calcCostFunction(0.167);
      setOffPeakRateCalc(consumersOffPeak);
      const consumersOffPeakWinter = calcCostFunction(0.157);
      setOffPeakWinterRateCalc(consumersOffPeakWinter);
    } else {
      const otherSummerPeak = calcCostFunction(0.2174);
      setSummerPeakRateCalc(otherSummerPeak);
      const otherWinterPeak = calcCostFunction(0.1748);
      setWinterPeakRateCalc(otherWinterPeak);
      const otherOffPeak = calcCostFunction(0.1611);
      setOffPeakRateCalc(otherOffPeak);
    }
    setShowResults(true);
  };

  return (
    <div id="formAndShowDataContainer">
      <form onSubmit={handleSubmit} className="SampleApplianceForm">
        <div id="utilityRadioContainer">
          <label>Select Your Utility Company:</label>
          <div id="radioContainer">
            <label htmlFor="dte">
              <input
                type="radio"
                id="dte"
                name="utilityCo"
                value={"DTE Energy"}
                required
                onChange={(e) => setUtilityCo(e.target.value)}
              />
              DTE Energy
            </label>

            <label htmlFor="consumers">
              <input
                type="radio"
                id="consumers"
                name="utilityCo"
                value={"Consumers Energy"}
                onChange={(e) => setUtilityCo(e.target.value)}
              />
              Consumers Energy
            </label>

            <label htmlFor="utilityCo">
              <input
                type="radio"
                id="otherCo"
                name="utilityCo"
                value={"Other"}
                onChange={(e) => setUtilityCo(e.target.value)}
              />
              Other
            </label>
          </div>
        </div>
        <label htmlFor="defaultApplianceName"></label>
        <select
          name="defaultApplianceName"
          value={applianceName}
          onChange={handleDefaultChange}
        >
          <option>Select An Appliance</option>
          {defaultApplianceArray.map((item) => (
            <option key={item.index + item.name} value={item.name}>
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
          required
          step={0.01}
          value={applianceKwh}
          onChange={(e) => setApplianceKwh(e.target.value)}
        />
        <label htmlFor="applianceHours">Time used (in hours):</label>
        <input
          type="text"
          name="applianceHours"
          min={0}
          required
          value={Number(applianceHours)}
          onChange={(e) => setApplianceHours(Number(e.target.value))}
        ></input>
        <label htmlFor="applianceMins">Time used (in minutes):</label>
        <input
          type="text"
          name="applianceHours"
          min={0}
          required
          value={Number(applianceMins)}
          onChange={(e) => setApplianceMins(Number(e.target.value))}
        ></input>
        <button>Submit</button>
      </form>
      {showResults ? (
        <div id="dataResults">
          <SampleBarChart
            summerPeakRateCalc={summerPeakRateCalc}
            winterPeakRateCalc={winterPeakRateCalc}
            offPeakRateCalc={offPeakRateCalc}
            offPeakWinterRateCalc={offPeakWinterRateCalc}
          />
          <div id="costContainer">
            <div id="costDailyCalc">
              <p>Cost at summer peak rate: ${summerPeakRateCalc}/day</p>
              <p>Cost at off-peak rate: ${offPeakRateCalc}/day</p>
              <p>Cost at winter peak rate: ${winterPeakRateCalc}/day</p>
              {offPeakWinterRateCalc && (
                <p>
                  Cost at off-peak winter rate: ${offPeakWinterRateCalc}/day
                </p>
              )}
            </div>
            <div id="calcSavingsResults">
              <p>
                By using off peak hours in the summer you could save:
                {` $${calcSavings(summerPeakRateCalc, offPeakRateCalc).toFixed(
                  2
                )} `}
                a day, or
                {` $${(
                  Number(calcSavings(summerPeakRateCalc, offPeakRateCalc)) * 21
                ).toFixed(2)} `}
                a month.
              </p>
              <p>
                By using off peak hours in the winter you could save:
                {offPeakWinterRateCalc ? (
                  <p>
                    {` $${calcSavings(
                      winterPeakRateCalc,
                      offPeakWinterRateCalc
                    ).toFixed(2)} `}
                    a day, or
                    {` $${(
                      Number(
                        calcSavings(winterPeakRateCalc, offPeakWinterRateCalc)
                      ) * 21
                    ).toFixed(2)} `}
                    a month.
                  </p>
                ) : (
                  <p>
                    {` $${calcSavings(
                      winterPeakRateCalc,
                      offPeakRateCalc
                    ).toFixed(2)} `}
                    a day, or
                    {` $${(
                      Number(calcSavings(winterPeakRateCalc, offPeakRateCalc)) *
                      21
                    ).toFixed(2)} `}
                    a month.
                  </p>
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div id="wireImgContainer">
          <img src={wires} />
        </div>
      )}
    </div>
  );
};

export default SampleApplianceForm;
