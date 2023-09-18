import { useContext, useEffect, useState } from "react";
import HomesForm from "./HomesForm";
import "./LandingPage.css";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import Home from "../models/Home";
import { addHome, getHomes } from "../services/homeService";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const [homes, setHomes] = useState<Home[]>([]);

  const loadUserHomesHandler = async (): Promise<void> => {
    setHomes(await getHomes(user?.uid!));
  };

  const addHomeHandler = async (home: Home): Promise<void> => {
    await addHome(home);
    loadUserHomesHandler();
    console.log(homes);
    console.log(home.lat);
    console.log(home.lon);
  };

  return (
    <div className="LandingPage">
      <h2>Here's how Eco Kilo Works:</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ea, sunt
        incidunt labore molestiae blanditiis ad debitis, nihil nobis tempora
        reprehenderit deserunt vero consectetur iste esse. Sapiente consectetur
        cumque quisquam.
      </p>
      {/* link to user form that inputs homes data */}
      {user ? (
        <>
          <HomesForm addHomeHandler={addHomeHandler} />
        </>
      ) : (
        <>
          <p>Sign in to submit your home's data</p>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </>
      )}
    </div>
  );
};

export default LandingPage;
