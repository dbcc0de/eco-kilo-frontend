import { useContext, useEffect, useState } from "react";
import HomesForm from "./HomesForm";
import "./LandingPage.css";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import Home from "../models/Home";
import { addHome, getHomes } from "../services/homeService";
import logoWords from "../assets/logoWords.png";
import dtePie from "../assets/dtePie.png";
import overPeak from "../assets/overPeak.png";
import thoughtBubble from "../assets/thoughtBubble.png";
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
      <div id="landingIntro">
        <h2>Is your utility company raising rates at peak hours?</h2>
        <div id="overPeakContainer">
          <img
            src={overPeak}
            id="overPeakImg"
            alt="museum roof illustrating peak rates as a hill"
          />
        </div>
      </div>
      <h3>
        Some utilities, including DTE and Consumers, have introduced "Time of
        Day" rates that mean you pay more when energy is most expensive — at
        peak hours!
      </h3>
      <section id="peakVisualContainer">
        <div id="pieChartIntro">
          <p id="pieChartIntroPara">
            Electricity can be over <span>30% more</span> expensive at peak
            hours!
          </p>
          <img src={dtePie} id="dtePie"></img>
        </div>
        <div id="selectUtilityContainer">
          <p onClick={(e) => setFlipCard((prev) => !prev)} id="chosenContainer">
            <span
              className={!flipCard ? "chosenUtility" : "null"}
              id="selectDTE"
            >
              DTE{" "}
            </span>
            <span
              className={flipCard ? "chosenUtility" : "null"}
              id="selectConsumers"
            >
              Consumers
            </span>
          </p>
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
                <table>
                  <tr>
                    <th>Summer</th>
                    <th>Off Peak Rate</th>
                    <th>Peak Rate</th>
                  </tr>
                  <tr>
                    <td>June 1 - Sep 30</td>
                    <td>$0.1545/kwh</td>
                    <td>$0.2098/kwh</td>
                  </tr>
                  <p>
                    It costs <span>35.8% more</span> to use electricity during
                    peak summer hours.
                  </p>
                </table>
                <table>
                  <tr>
                    <th>Winter</th>
                    <th>Off Peak Rate</th>
                    <th>Peak Rate</th>
                  </tr>
                  <tr>
                    <td>Oct 1 - May 31</td>
                    <td>$0.1545/kwh</td>
                    <td>$0.1675/kwh</td>
                  </tr>
                  <p>
                    It costs <span>8.4% more</span> to use electricity during
                    peak summer hours.
                  </p>
                </table>
              </div>
            ) : (
              <div id="consumersCardContainer" className="back">
                <FontAwesomeIcon id="flipIcon" icon={faRotate} />

                <h4>
                  Consumers Peak Rates are from <span>2pm - 7pm</span>
                </h4>
                <table>
                  <tr>
                    <th>Summer</th>
                    <th>Off Peak Rate</th>
                    <th>Peak Rate</th>
                  </tr>
                  <tr>
                    <td>June 1 - Sep 30</td>
                    <td>$0.167/kwh</td>
                    <td>$0.223/kwh</td>
                  </tr>
                  <p>
                    It costs <span>33.5% more</span> to use electricity during
                    peak summer hours.
                  </p>
                </table>
                <table>
                  <tr>
                    <th>Winter</th>
                    <th>Off Peak Rate</th>
                    <th>Peak Rate</th>
                  </tr>
                  <tr>
                    <td>Oct 1 - May 31</td>
                    <td>$0.157/kwh</td>
                    <td>$0.17/kwh</td>
                  </tr>
                  <p>
                    It costs <span>8.3% more</span> to use electricity during
                    peak summer hours.
                  </p>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
      <div id="thoughtSampleContainer">
        <div id="thoughtContainer">
          <img id="thoughtBubble" src={thoughtBubble} alt="thought bubble" />
        </div>
        <div id="sampleContainer">
          <h3>Try Our Sample Appliance Form</h3>
          <p>(it will enter the standard kwh for the average appliance)</p>
        </div>
      </div>
      <div className="sampleRateFormContainer">
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
