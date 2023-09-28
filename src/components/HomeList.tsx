import { useContext, useEffect } from "react";
import Home from "../models/Home";
import HomeCard from "./HomeCard";
import "./HomeList.css";
import AuthContext from "../context/AuthContext";
import ApplianceForm from "./ApplianceForm";

interface Props {
  homes: Home[];
  deleteHomeHandler: (id: string) => void;
  editHomeHandler: (home: Home) => void;
}

const HomeList = ({ homes, deleteHomeHandler, editHomeHandler }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <ul className="HomeList">
      {homes.map((item, index) => (
        <HomeCard
          length={homes.length}
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
