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
import logoWords from "../assets/logoWords.png";

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
  }, [homes]);

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
        <div className={user ? "loader" : "null"}></div>
      )}
      <HomesForm addHomeHandler={addHomeHandler} />
      <footer>
        <div className="blueCircle">
          <div className="whiteCircle">
            <img
              id="logoWords"
              src={logoWords}
              alt="thunderbolt logo with words eco kilo"
            />
          </div>
        </div>
        <a href="/education">Education</a>
      </footer>
    </div>
  );
};

export default UsersPage;
