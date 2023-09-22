import { useState } from "react";
import "./EducationPage.css";
import Faq from "./FaqList";

const EducationPage = () => {
  // const toggleFAQ = (index: number) => {
  //   setFaq(
  //     faq.map((faq, i) => {
  //       if (i === index) {
  //         faq.open = !faq.open;
  //       } else {
  //         faq.open = false;
  //       }

  //       return faq;
  //     })
  //   );
  // };

  return (
    <div className="EducationPage">
      <h2>Education Page</h2>
      <Faq />
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
