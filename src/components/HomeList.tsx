import { useContext, useEffect } from "react";
import Home from "../models/Home";
import HomeCard from "./HomeCard";
import "./HomeList.css";
import AuthContext from "../context/AuthContext";

interface Props {
  homes: Home[];
  deleteHomeHandler: (id: string) => void;
}

const HomeList = ({ homes, deleteHomeHandler }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <ul className="HomeList">
      {homes.map((item) => (
        <HomeCard
          home={item}
          key={item._id}
          deleteHomeHandler={deleteHomeHandler}
        />
      ))}
    </ul>
  );
};

export default HomeList;
