import React, { useEffect } from "react";
import FirstSection from "../../sharedComponents/firstSection/firstSection";
import NavBar from "../../sharedComponents/navBar/navBar";
import { NavBarRightComp } from "../mainHome/mainHome";
import aboutus from "../../assets/pictures/aboutus.jpg";
import "./AboutUs.scss";
import aboutus2 from "../../assets/pictures/about-us2.jpg";

const AboutUs = () => {
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
      <FirstSection image={aboutus} title={"à propos"} />
      <div className="container">
        <div className="item">
          <div className="item-image-row">
            <img src={aboutus2} className="image-row" />
          </div>
        </div>
        <div className="item">
          <div className="card-row">
            <h2>
              <span>MY</span>
              <span className="underlined">DISH</span>
            </h2>
            <p>
              Mydish vous permet d'utiliser votre smartphone pour consulter le
              menu des meille notre urs restaurants et épiceries, et passer une
              commande pour la livraison à domicile. C’est le moyen le plus
              rapide, le plus simple et le plus pratique de commander vos repas,
              depuis votre ordinateur ou votre smartphone grâce à appli
              gratuite.
            </p>
            <p>
              Mydish vous aide à trouver et réserver les meilleurs restaurants à
              côté de chez vous ou partout ailleurs, selon vos envies et votre
              budget. En réduisant le temps d'attente aux tables durant les
              repas, vous obtenez plus de commandes et servez plus de clients
              chaque jour.
            </p>
            <p>
              Mydish vous aide à trouver et réserver les meilleurs restaurants à
              côté de chez vous ou partout ailleurs, selon vos envies et votre
              budget. En réduisant le temps d'attente aux tables durant les
              repas, vous obtenez plus de commandes et servez plus de clients
              chaque jour.
            </p>
            <p>
              Nous pensons que manger est un plaisir, et que commander un repas
              devrait être rapide et amusant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
