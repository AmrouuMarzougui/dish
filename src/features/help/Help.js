import React, { useEffect } from "react";
import FirstSection from "../../sharedComponents/firstSection/firstSection";
import NavBar from "../../sharedComponents/navBar/navBar";
import { NavBarRightComp } from "../mainHome/mainHome";
import "./Help.scss";
import mobileApp from "../../assets/mobileApp.png";
import obtenirImage from "../../assets/pictures/obtenir-aide.jpg";
import { helpData } from "./helpData/HelpData";

const Help = () => {
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
      <FirstSection image={obtenirImage} title={"obtenir de l'aide"} />
      <div className="title-help">
        <h2>comment créer un compte ?</h2>
      </div>
      <div className="container">
        <div className="item">
          <div className="item-image-row">
            <img src={mobileApp} className="image-row" style={{height: "auto"}}/>
          </div>
        </div>
        <div className="item">
          <div className="help-couner">
            <div>
              {helpData.map((t, index) => (
                <p key={index}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
