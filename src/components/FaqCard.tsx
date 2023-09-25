import { useState } from "react";
import "./FaqCard.css";
import Faq from "../models/Faq";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  faq: Faq;
}

const FaqCard = ({ faq }: Props) => {
  const [displayFAQ, setDisplayFAQ] = useState(false);
  return (
    <li className="FaqCard">
      <div id="CardContainer">
        <div>
          <button onClick={() => setDisplayFAQ((prev) => !prev)}>
            {" "}
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
        <div>
          {/* <p id="appliancesLabel"> */}

          <p id="faqQuestion"> {faq.question}</p>
          {displayFAQ && <p>{faq.answer}</p>}
        </div>
      </div>
    </li>
  );
};

export default FaqCard;
