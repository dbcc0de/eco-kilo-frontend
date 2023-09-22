import { useContext, useEffect, useState } from "react";
import HomesForm from "./HomesForm";
import "./LandingPage.css";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import Home from "../models/Home";
import { addHome, getHomes } from "../services/homeService";
import PeakVisualChart from "./PeakVisualChart";
import { Link } from "react-router-dom";

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
      <h2>
        Problem: I'm spending more on utilities. What is this new peak rate?
      </h2>
      <p>
        Utilities such as DTE and Consumers have introduced "Peak Rates" during
        the afternoon to the evening. Energy is the most expensive to buy from
        the grid at those times, so you may be paying more.
      </p>
      <h2>Learn how you can save more with Eco Kilo:</h2>
      <div className="landingFlex">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ea,
          sunt incidunt labore molestiae blanditiis ad debitis, nihil nobis
          tempora reprehenderit deserunt vero consectetur iste esse. Sapiente
          consectetur cumque quisquam.
        </p>
        <Link to="/education">
          <button>Education Page</button>
        </Link>
        {/* link to user form that inputs homes data */}
        {user ? (
          <>
            <HomesForm addHomeHandler={addHomeHandler} />
          </>
        ) : (
          <div>
            <p>Sign in to submit your home's data</p>
            <button className="signInButton" onClick={signInWithGoogle}>
              Sign in with Google
            </button>
          </div>
        )}
      </div>
      <div className="circle"></div>
      <PeakVisualChart />
    </div>
  );
};

export default LandingPage;
