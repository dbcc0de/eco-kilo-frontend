import { useContext, useEffect, useState } from "react";
import HomesForm from "./HomesForm";
import "./LandingPage.css";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import Home from "../models/Home";
import { addHome, getHomes } from "../services/homeService";
import PeakVisualChart from "./PeakVisualChart";
import { Link } from "react-router-dom";
import logoWords from "../assets/logoWords.png";
import streetLight from "../assets/streetlightSilo.png";
import wires from "../assets/wiresDefault.png";

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
    <div
      className="LandingPage"
      style={{
        backgroundImage: `url(${wires})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
      }}
    >
      <h2>
        Problem: I'm spending more on utilities. What is this new peak rate?
      </h2>
      <section id="peakVisualContainer">
        <p id="pieVisualIntro">
          Energy is nearly <span>30% more</span> expensive at peak hours!
        </p>
        <PeakVisualChart />
        <p>Peak Hours Between 3pm - 7pm</p>
      </section>
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
          tempora reprehenderit.
          {/* <Link to="/education">
            <button>Education Page</button>
          </Link> */}
        </p>

        {/* link to user form that inputs homes data */}
      </div>

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
      <div className="logoAndMeterContainer">
        <div className="blueCircle">
          <div className="whiteCircle">
            <img
              id="logoWords"
              src={logoWords}
              alt="thunderbolt logo with words eco kilo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
