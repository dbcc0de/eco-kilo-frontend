import { useContext } from "react";
import Home from "../models/Home";
import "./HomeCard.css";
import AuthContext from "../context/AuthContext";

interface Props {
  home: Home;
  deleteHomeHandler: (id: string) => void;
}

const HomeCard = ({ home, deleteHomeHandler }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <li className="HomeCard">
      <p>Home: {home.name}</p>
      <p>State: {home.state}</p>
      <p>City: {home.city}</p>
      <p>Appliances: {home.appliances[0].name}</p>
      <button onClick={() => deleteHomeHandler(home._id!)}>X</button>
    </li>
  );
};

export default HomeCard;
