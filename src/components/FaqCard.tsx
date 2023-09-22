import { useState } from "react";
import "./FaqCard.css";
import Faq from "../models/Faq";

interface Props {
  faq: Faq;
}

const FaqCard = ({ faq }: Props) => {
  const [displayFAQ, setDisplayFAQ] = useState(false);
  return (
    <li className="FaqCard">
      <button onClick={() => setDisplayFAQ((prev) => !prev)}>X</button>
      <div>
        <p> {faq.question}</p>
        {displayFAQ && <p>{faq.answer}</p>}
      </div>
    </li>
  );
};

export default FaqCard;
