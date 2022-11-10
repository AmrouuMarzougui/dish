import React, { useEffect } from "react";
import FirstSection from "../../sharedComponents/firstSection/firstSection";
import NavBar from "../../sharedComponents/navBar/navBar";
import { NavBarRightComp } from "../mainHome/mainHome";
import contact from "../../assets/pictures/contact.jpg";
import "./ContactUs.scss";
import phone from "../../assets/phone.svg";
import email from "../../assets/email-mail-svgrepo-com.svg";
import { Divider, InputLabel, TextField } from "@mui/material";

const ContactUs = () => {
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
      <FirstSection image={contact} title={"Contactez-nous"} />
      <section className="contact-us-section">
        <div className="contact-us-container">
          <div className="card-container-contact-us">
            <div className="item-card-contact-us">
              <div className="item-colomn">
                <h2>Contactez</h2>
                <h2 className="contact-us-title-second-part">Nous</h2>
                <div className="contact-us-info">
                  <img src={phone} className="icon-contact-us" />{" "}
                  <span>2123123132123</span>
                </div>
                <Divider />
                <div className="contact-us-info">
                  <img src={email} className="icon-contact-us" />{" "}
                  <span>contact@mydish.com</span>
                </div>

                <Divider />
              </div>
            </div>
            <div className="item-card-contact-us">
              <div className="first-row">
                <h2>ECRIVEZ-VOUS</h2>
                <p>
                  Vous avez une question à nous poser ? Vous souhaitez avoir
                  plus d'informations ? Nous sommes à votre écoute !
                </p>
              </div>
              <form>
                <div className="input-contact-us">
                  <div className="input-col">
                    <TextField
                      id="outlined-basic"
                      label="Prénom"
                      variant="outlined"
                    />
                  </div>
                  <div className="input-col">
                    <TextField
                      id="outlined-basic"
                      label="Nom"
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="input-contact-us">
                  <div className="input-col">
                    <TextField
                      id="outlined-basic"
                      label="Adresse Email"
                      variant="outlined"
                    />
                  </div>
                  <div className="input-col">
                    <TextField
                      id="outlined-basic"
                      label="Téléphone"
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="input-contact-us">
                  <div className="input-col-message">
                    <TextField
                      id="outlined-multiline-static"
                      label="Message"
                      multiline
                      rows={4}
                      defaultValue=""
                    />
                  </div>
                </div>

                <div className="contact-us-btn-container">
                  <button className="contact-us-btn" type="submit">
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
