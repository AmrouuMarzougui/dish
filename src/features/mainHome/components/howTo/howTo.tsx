import React from "react";
import "./howTo.scss";
import { useTranslation } from "react-i18next";
import mobileApp from "../../../../assets/mobileApp.png";
import howToStep1 from "../../../../assets/howToStep1.svg";
import howToStep2 from "../../../../assets/howToStep2.svg";
import howToStep3 from "../../../../assets/howToStep3.svg";
import { getDocumentWidth } from "../../../../app/utils/func/commonFuncs";
import { useAppSelector } from "../../../../app/store/hooks";
import { selectDeviceWidth } from "../../../../app/store/storeModules/root/root";
import Swal from "sweetalert2";
import allWhiteLogo from "../../../../assets/myDishLogo.svg";

const HowTo = () => {
  const { t } = useTranslation();
  const deviceWidth = useAppSelector(selectDeviceWidth);
  return (
    <div className="howToContainer">
      <div className="stepsContainer">
        <label className="howToLabel">{t("HOME.HOW_TO.LABEL")}</label>
        <div className="stepHowTo">
          <img
            draggable={false}
            width="40px"
            height="40px"
            src={howToStep1}
            alt=""
          />
          <span>{t("HOME.HOW_TO.STEPS.STEP1")}</span>
        </div>
        <div className="stepHowTo">
          <img
            draggable={false}
            width="40px"
            height="40px"
            src={howToStep2}
            alt=""
          />
          <span>{t("HOME.HOW_TO.STEPS.STEP2")}</span>
        </div>
        <div className="stepHowTo">
          <img
            draggable={false}
            width="40px"
            height="40px"
            src={howToStep3}
            alt=""
          />
          <span>{t("HOME.HOW_TO.STEPS.STEP3")}</span>
        </div>
        <div className="storeContainer">
          <button
            className="btn success iphone"
            onClick={() =>
              Swal.fire({
                imageUrl: `${allWhiteLogo}`,
                imageHeight: 70,
                imageWidth: 150,
                imageAlt: "construction",
                text: "Application en cours de construction",
              })
            }
          >
            Iphone
          </button>
          <button
            className="btn success android"
            onClick={() =>
              Swal.fire({
                imageUrl: `${allWhiteLogo}`,
                imageHeight: 70,
                imageWidth: 150,
                imageAlt: "construction",
                text: "Application en cours de construction",
              })
            }
          >
            Android
          </button>
        </div>
      </div>
      {deviceWidth > 768 && (
        <img
          draggable={false}
          src={mobileApp}
          alt=""
          className="mobileAppContainer"
        />
      )}
    </div>
  );
};

export default HowTo;
