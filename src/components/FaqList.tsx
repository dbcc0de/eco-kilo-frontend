import React, { useState } from "react";
import "./FaqList.css";
import allFaqs from "../specs/faqHub";
import FaqCard from "./FaqCard";

// interface Props {
//   faq: any;
//   index: any;
//   toggleFAQ: any;
// }
// { faq, index, toggleFAQ }: Props

const FaqList = () => {
  return (
    <ul className="faqs">
      {allFaqs.map((item) => (
        <FaqCard faq={item} />
      ))}
    </ul>
  );
};

export default FaqList;
