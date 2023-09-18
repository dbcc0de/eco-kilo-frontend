import { useContext, useEffect, useState } from "react";
import "./UsersPage.css";
import Home from "../models/Home";
import AuthContext from "../context/AuthContext";
import {
  addHome,
  deleteHome,
  editHome,
  getHomes,
} from "../services/homeService";
import HomesForm from "./HomesForm";
import HomeList from "./HomeList";
import MUIMaps from "./MUIMaps";

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

  const deleteHomeHandler = async (id: string): Promise<void> => {
    await deleteHome(id);
    loadUserHomesHandler();
  };

  const editHomeHandler = async (home: Home): Promise<void> => {
    await editHome(home, home._id!);
    loadUserHomesHandler();
  };

  return (
    <div className="UsersPage">
      {homes.length ? (
        <>
          <HomeList
            homes={homes}
            deleteHomeHandler={deleteHomeHandler}
            editHomeHandler={editHomeHandler}
          />
        </>
      ) : (
        <p>Here is loading screen</p>
      )}
      <HomesForm addHomeHandler={addHomeHandler} />
    </div>
  );
};

export default UsersPage;
