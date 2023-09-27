import "./EducationPage.css";
import FaqList from "./FaqList";
import streetLight from "../assets/streetlightSilo.png";
import logoWords from "../assets/logoWords.png";

const EducationPage = () => {
  return (
    <div className="EducationPage">
      <h2>Care to learn more about peak rates and utility costs?</h2>
      <FaqList />
      <div id="streetLightContainer">
        <img
          src={streetLight}
          alt="silhouette of a street light"
          id="streetLightImg"
        />
      </div>
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
      </footer>
    </div>
  );
};

export default EducationPage;
