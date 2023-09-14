import { useContext, useEffect } from "react";
import Home from "../models/Home";
import HomeCard from "./HomeCard";
import "./HomeList.css";
import AuthContext from "../context/AuthContext";

interface Props {
  homes: Home[];
  //   loadUserHomesHandler: () => void;
}

const HomeList = ({ homes }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <ul className="HomeList">
      {homes.map((item) => (
        <HomeCard home={item} key={item._id} />
      ))}
    </ul>
  );
};

export default HomeList;
