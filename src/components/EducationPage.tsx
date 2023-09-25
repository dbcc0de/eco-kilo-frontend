import "./EducationPage.css";
import FaqList from "./FaqList";

const EducationPage = () => {
  return (
    <div className="EducationPage">
      <h2>Education Page</h2>
      <FaqList />
    </div>
  );
};
// {!showResults ? (
//   <button
//     className="viewEnergyButton"
//     onClick={() => setShowResults(true)}
//   >
//     View My Energy Data
//   </button>
// ) : (
//   <div className="popupContainer">
//     <EnergyResults setShowResults={setShowResults} home={home} />
//   </div>
// )}

export default EducationPage;
