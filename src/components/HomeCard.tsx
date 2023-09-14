import { useContext } from "react";
import Home from "../models/Home";
import "./HomeCard.css";
import AuthContext from "../context/AuthContext";

interface Props {
  home: Home;
}

const HomeCard = ({ home }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <li className="HomeCard">
      <p>Home: {home.name}</p>
      <p>State: {home.state}</p>
      <p>City: {home.city}</p>
      <p>Appliances: {home.appliances[0].name}</p>
    </li>
  );
};

export default HomeCard;
