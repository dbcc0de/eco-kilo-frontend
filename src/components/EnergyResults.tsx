import Home from "../models/Home";
import "./EnergyResults.css";

interface Props {
  home: Home;
}

const EnergyResults = ({ home }: Props) => {
  return (
    <div className="EnergyResults">
      <p>{home.appliances[0].kwh} kwh</p>
      <p>{home.appliances[0].startTime}</p>
      <p>{home.appliances[0].endTime}</p>
      <p>
        Result of Appliance 1:{"Total kWhs "}
        {(home.appliances[0].endTime - home.appliances[0].startTime) *
          home.appliances[0].kwh}
      </p>
      <p>{home.appliances[1].kwh} kwh</p>
      <p>{home.appliances[1].startTime}</p>
      <p>{home.appliances[1].endTime}</p>
    </div>
  );
};

export default EnergyResults;
