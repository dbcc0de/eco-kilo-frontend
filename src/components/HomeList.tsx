import { useContext, useEffect } from "react";
import Home from "../models/Home";
import HomeCard from "./HomeCard";
import "./HomeList.css";
import AuthContext from "../context/AuthContext";

interface Props {
  homes: Home[];
  deleteHomeHandler: (id: string) => void;
  editHomeHandler: (home: Home) => void;
}

const HomeList = ({ homes, deleteHomeHandler, editHomeHandler }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <ul className="HomeList">
      {homes.map((item) => (
        <HomeCard
          home={item}
          key={item._id}
          deleteHomeHandler={deleteHomeHandler}
          editHomeHandler={editHomeHandler}
        />
      ))}
    </ul>
  );
};

export default HomeList;
