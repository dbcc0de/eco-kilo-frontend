import { useContext, useEffect, useState } from "react";
import HomesForm from "./HomesForm";
import "./LandingPage.css";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import Home from "../models/Home";
import { addHome, getHomes } from "../services/homeService";
import logoWords from "../assets/logoWords.png";
import dtePie from "../assets/dtePie.png";
import SampleApplianceForm from "./SampleApplianceForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const [homes, setHomes] = useState<Home[]>([]);
  const [flipCard, setFlipCard] = useState(false);

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
        Is your utility company raising rates at peak hours? Do you know how
        much that could cost you?
      </h2>
      <h3>
        Some utilities, including DTE and Consumers, have introduced "Time of
        Day" rates that mean you pay more when energy is most expensive — at
        peak hours!
      </h3>
      <section id="peakVisualContainer">
        <div id="pieChartIntro">
          <p>
            Electricity is nearly <span>30% more</span> expensive at peak hours!
          </p>
          <img src={dtePie} id="dtePie"></img>
        </div>
        <div
          id="utilityCardContainer"
          className={`card ${flipCard ? "flip" : ""}`}
          onClick={(e) => setFlipCard((prev) => !prev)}
        >
          {!flipCard ? (
            <div id="dteCardContainer" className="front">
              <FontAwesomeIcon id="flipIcon" icon={faRotate} />

              <h4>
                DTE Peak Rates are from <span>3pm - 7pm</span>
              </h4>
              <p>
                During the Summer Months (June 1st - September 30th) off-peak
                rate is $0.1545 cents per kWh and an
                <span> on-peak rate is $0.2098 cents per kwh.</span> That means
                it costs 35.8% more to use electricity during peak summer hours.{" "}
              </p>
              <p>
                From October 1st - May 31st you will pay an off-peak rate of
                $0.1545 cents per kWh and an{" "}
                <span> on-peak rate of $0.1675 cents per kWh.</span> It's not as
                much as the summer peak rate but it's still 8.4% more expensive
                to use electricity during peak hours.{" "}
              </p>
            </div>
          ) : (
            <div id="consumersCardContainer" className="back">
              <FontAwesomeIcon id="flipIcon" icon={faRotate} />

              <h4>
                Consumers Peak Rates are from <span>2pm - 7pm</span>
              </h4>
              <p>
                During the Summer Months (June 1st - September 30th) off-peak
                rate is $0.167 cents per kWh and an
                <span> on-peak rate is $0.223 cents per kwh.</span> That means
                it costs 33.5% more to run an appliance during peak hours.{" "}
              </p>
              <p>
                From October 1st - May 31st you will pay an off-peak rate of
                $0.157 cents per kWh and an
                <span> on-peak rate of $0.17 cents per kWh.</span>
                It's not as much as the summer peak rate but it's still 8.3%
                more expensive to use electricity during peak hours.{" "}
              </p>
            </div>
          )}
        </div>
      </section>
      <h2>
        How much money could I save if I ran an appliance during off-peak hours
        instead? Use the form below to find out!
      </h2>
      <div className="sampleRateFormContainer">
        <h3>Try Our Sample Appliance Form</h3>
        <p>(it will enter the standard kwh for the average appliance)</p>
        <SampleApplianceForm />
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

export default LandingPage;
