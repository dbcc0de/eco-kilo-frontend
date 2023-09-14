import { useContext, useEffect, useState } from "react";
import "./UsersPage.css";
import Home from "../models/Home";
import AuthContext from "../context/AuthContext";
import { addHome, getHomes } from "../services/homeService";
import HomesForm from "./HomesForm";
import HomeList from "./HomeList";

const UsersPage = () => {
  const [homes, setHomes] = useState<Home[]>([]);
  const { user } = useContext(AuthContext);

  const loadUserHomesHandler = async (): Promise<void> => {
    setHomes(await getHomes(user?.uid!));
  };
  useEffect(() => {
    (async () => {
      await loadUserHomesHandler();
    })();
  }, [user]);
  const addHomeHandler = async (home: Home): Promise<void> => {
    await addHome(home);
    loadUserHomesHandler();
    console.log(homes);
  };

  return (
    <div className="UsersPage">
      <HomeList homes={homes} />
      <HomesForm addHomeHandler={addHomeHandler} />
    </div>
  );
};

export default UsersPage;
