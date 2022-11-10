import React, { useEffect } from "react";
import FirstSection from "../../sharedComponents/firstSection/firstSection";
import NavBar from "../../sharedComponents/navBar/navBar";
import { NavBarRightComp } from "../mainHome/mainHome";
import privacyPolicyImage from "../../assets/pictures/privacy.jpg";
import "./PrivacyPolicy.scss";
import ConditionSection from "../../sharedComponents/conditionSection/ConditionSection";
import { privacyPolicyData } from "./privacyPolicyData/PrivacyPolicyData";

const PrivacyPolicy = () => {
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
      <FirstSection
        image={privacyPolicyImage}
        title={"politique de confidentialité"}
      />
      <div className="condition-container">
        <p>
          Cette politique de confidentialité décrit nos politiques et procédures
          sur la collecte, l’utilisation et la divulgation de vos informations
          lorsque vous utilisez le service et vous informe de vos droits à la
          confidentialité et de la manière dont la loi vous protège.
        </p>
        <p>
          Nous utilisons vos données personnelles pour fournir et améliorer le
          service. En utilisant le Service, vous acceptez la collecte et
          l’utilisation des informations conformément à la présente politique de
          confidentialité.
        </p>
        {privacyPolicyData.map((privacy) => (
          <ConditionSection
            title={privacy.title}
            listdescription={privacy.listdescription}
          />
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
