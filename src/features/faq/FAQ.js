import React, { useEffect, useState } from "react";
import FirstSection from "../../sharedComponents/firstSection/firstSection";
import NavBar from "../../sharedComponents/navBar/navBar";
import { NavBarRightComp } from "../mainHome/mainHome";
import faqImage from "../../assets/pictures/faq.jpg";
import "./FAQ.scss";
import { faqDataSecondRow, faqData } from "./questions/FAQData";
import SingleQuestion from "./questions/Questions";

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [questions, setQuestions] = useState(faqData);

  return (
    <div className="about-us-container">
      <NavBar
        config={{
          rightComponent: <NavBarRightComp />,
        }}
      />
      <FirstSection image={faqImage} title={"FAQ"} />
      <div className="title-help">
        <h2>questions fréquentes</h2>
      </div>

      <div className="container">
        <div className="item">
          <section className="info">
            {questions.map((question) => (
              <SingleQuestion key={question.id} {...question} />
            ))}
          </section>
        </div>
        <div className="item">
          <section className="info">
            {faqDataSecondRow.map((question) => (
              <SingleQuestion key={question.id} {...question} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
