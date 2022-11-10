import React, { useEffect } from "react";
import FirstSection from "../../sharedComponents/firstSection/firstSection";
import NavBar from "../../sharedComponents/navBar/navBar";
import { NavBarRightComp } from "../mainHome/mainHome";
import conditionImage from "../../assets/pictures/condition.jpg";
import "./Condition.scss";
import ConditionSection from "../../sharedComponents/conditionSection/ConditionSection";
import { conditionData } from "./conditionData/ConditionData";

const Conditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-us-container">
      <NavBar
        config={{
          rightComponent: <NavBarRightComp />,
        }}
      />
      <FirstSection image={conditionImage} title={"conditions"} />
      <div className="condition-container">
      {conditionData.map((condition) => (
        <ConditionSection
          title={condition.title}
          listdescription={condition.listdescription}
        />
      ))}
      </div>
     
    </div>
  );
};

export default Conditions;
