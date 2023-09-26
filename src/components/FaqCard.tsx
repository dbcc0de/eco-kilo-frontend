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
      <div
        id="CardContainer"
        className={!displayFAQ ? "CardHover" : "null"}
        onClick={() => setDisplayFAQ((prev) => !prev)}
      >
        <div className={displayFAQ ? "faqQuestion" : "null"}>
          <button>
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
        <div>
          {/* <p id="appliancesLabel"> */}

          <p className={displayFAQ ? "faqQuestion" : "null"}>{faq.question}</p>
          {displayFAQ && <p id="answerParagraph">{faq.answer}</p>}
        </div>
      </div>
    </li>
  );
};

export default FaqCard;
