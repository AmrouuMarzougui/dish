import React, { useEffect, useRef, useState } from "react";
import "./restaurantLandingPage.scss";
import allWhiteLogo from "../../assets/logoBlanc.svg";

import landing2 from "../../assets/landingPage2.png";
import landing3 from "../../assets/landingPage3.png";
import landing4 from "../../assets/landingPage4.png";
import landing5 from "../../assets/landingPage5.png";

import _ressources from "../../assets/_ressources.svg";
import clients from "../../assets/clients.svg";
import temps from "../../assets/temps.svg";

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../app/utils/paths";
import NavBar from "../../sharedComponents/navBar/navBar";
import PhoneNumberInput from "../../sharedComponents/phoneNumberInput/phoneNumberInput";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import {
  pushToToastsArray,
  selectDeviceWidth,
} from "../../app/store/storeModules/root/root";
import { selectConnectedUser } from "../../app/store/storeModules/authentication/authenticationSlice";
import { AddMyRestaurantDataInterface } from "../../app/utils/interfaces/apiInterfaces/restaurantInterfaces";
import { addMyRestaurant } from "../../app/store/storeModules/announces/announcesService";
import { generateUniqueId } from "../../app/utils/func/commonFuncs";
import { emailRegex } from "../../app/consts/regex";
import swal from "sweetalert";

const RestaurantLandingPage = () => {
  const deviceWidth = useAppSelector(selectDeviceWidth);
  const connectedUser = useAppSelector(selectConnectedUser);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [HEIGHT, setHeight] = useState("");

  const [isNavBar, setNavBar] = useState(false);
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    document.addEventListener("scroll", () => {
      setNavBar(window.scrollY > 300);
    });
    return () => {
      document.removeEventListener("scroll", () => null);
    };
  }, []);

  //   const required = (key: string) => `${key} est obligatoire`;
  // const notValid = (key: string) => `${key} n\'est pas valide`;
  // const isMissing = (key?: string | null) =>
  //   !key || key.toString().trim().length === 0;

  //   const getValidation = (data: AddMyRestaurantDataInterface) => ({
  //     firstName: isMissing(data?.owner.firstName) ? required("Le nom") : null,
  //     lastName: isMissing(data?.owner.lastName) ? required("Le prénom") : null,
  //     address: isMissing(data?.address) ? required("L'adresse") : null,
  //     phoneNumber: isMissing(data?.phoneNumber) ? required("Le code postale") : null,
  //     login: isMissing(data?.login)
  //       ? required("L'adresse E-mail")
  //       : !emailRegex.test(data?.login)
  //       ? notValid("L'adresse E-mail")
  //       : null,
  //   });

  const [validButton, setValidButton] = useState(false);

  const dispatch = useAppDispatch();

  // const addRestaurantForm = useRef<AddMyRestaurantDataInterface>({
  //   name: '',
  //   email: '',
  //   address: '',
  //   postalCode: '',
  //   country: '',
  //   password: '',
  //   telephone: NaN,
  // })

  // const handleSubmit = () => {
  //   registerRequest(addRestaurantForm.current);
  // }
  const [selectedCountry, setSelectedCountry] = useState<any>(undefined);

  const [formData, setFormData] = useState({
    name: "",
    login: "",
    address: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const onChangeForm = (value: string, key: string) => {
    const temp = { ...formData } as any;
    temp[key] = value;
    setFormData(temp);
    //   setUpdateValidation(getValidation(temp as UpdateProfileInterface));
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    addMyRestaurant({
      name: formData.name,
      owner: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      login: formData.login,
    })
      .then((res: any) => {
        swal("Restaurant ajouté avec succées", {
          icon: "success",
        }).then((ress: any) => {
          navigate(Paths.home);
        });
      })
      .catch((err: any) => {
        if (err.code == 403) {
          dispatch(
            pushToToastsArray({
              uniqueId: generateUniqueId(),
              message: "Dèja existant",
              type: "danger",
            })
          );
        } else {
          dispatch(
            pushToToastsArray({
              uniqueId: generateUniqueId(),
              message:
                "un erreur est survenue lors de l'ajout de restaurant !!",
              type: "danger",
            })
          );
        }
      });
  };

  console.log("formData", formData);

  useEffect(() => {
    if (deviceWidth < 768) setHeight("988px");
    else if (deviceWidth < 1024) setHeight("654px");
    else setHeight("820px");
  }, [deviceWidth]);

  const buttons = (
    <div className="buttonsHead">
      <span onClick={() => navigate(Paths.auth.index)}>
        {t("NAVBAR.GET_CONNECTED")}
      </span>
      <button
        className={"btn cursorEnabled"}
        onClick={() => navigate(Paths.auth.index + "/" + Paths.auth.register)}
      >
        {t("FOOTER.SUBSCRIBE")}
      </button>
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      <div style={isNavBar ? {} : { display: "none" }}>
        <NavBar
          config={{
            rightComponent:
              deviceWidth > 768 && !connectedUser ? buttons : undefined,
          }}
        />
      </div>
      <div className="landingPage1">
        <div className="head">
          <img
            onClick={() => navigate(Paths.home)}
            className="clickable"
            draggable={false}
            src={allWhiteLogo}
            alt=""
          />
          {deviceWidth > 768 && !connectedUser && buttons}
        </div>
        <div className="middle">
          <span>{t("RESTAURANT_LANDING.DEVELOP")}</span>
          <span className="orange">{t("RESTAURANT_LANDING.WITH_MY_DISH")}</span>
          <span className="earnClients">
            {t("RESTAURANT_LANDING.EARN_CLIENTS")}
          </span>
        </div>
        <div className="landingForm">
          <div className="headerForm">
            <span className="title">
              Optimisez votre activité et renforcez la notoriété de votre
              marque.
            </span>
            <span className="miniTitle">
              Recevez les commandes et et gérez-les facilement sur notre
              plateforme.
            </span>
          </div>

          <form onSubmit={submitForm}>
            <div className="formCont">
              <input
                placeholder="Nom du restaurant *"
                type="text"
                onChange={(e) => {
                  onChangeForm(e.target.value, "name");
                  setValidButton(
                    e.target.value.length > 0 &&
                      formData?.address.length > 0 &&
                      formData?.firstName.length > 0 &&
                      formData?.lastName.length > 0 &&
                      formData?.login.length > 0 &&
                      formData?.phoneNumber.length > 0
                  );
                }}
                value={formData?.name}
                required
              />
              <input
                placeholder="Adresse du restaurant *"
                type="text"
                onChange={(e) => {
                  onChangeForm(e.target.value, "address");
                  setValidButton(
                    e.target.value.length > 0 &&
                      formData?.name.length > 0 &&
                      formData?.firstName.length > 0 &&
                      formData?.lastName.length > 0 &&
                      formData?.login.length > 0 &&
                      formData?.phoneNumber.length > 0
                  );
                }}
                value={formData?.address}
                required
              />
              <input
                placeholder="Nom *"
                type="text"
                onChange={(e) => {
                  onChangeForm(e.target.value, "lastName");
                  setValidButton(
                    e.target.value.length > 0 &&
                      formData?.address.length > 0 &&
                      formData?.firstName.length > 0 &&
                      formData?.login.length > 0 &&
                      formData?.name.length > 0 &&
                      formData?.phoneNumber.length > 0
                  );
                }}
                value={formData?.lastName}
                required
              />
              <input
                placeholder="Prénom *"
                type="text"
                onChange={(e) => {
                  onChangeForm(e.target.value, "firstName");
                  setValidButton(
                    e.target.value.length > 0 &&
                      formData?.address.length > 0 &&
                      formData?.lastName.length > 0 &&
                      formData?.login.length > 0 &&
                      formData?.name.length > 0 &&
                      formData?.phoneNumber.length > 0
                  );
                }}
                required
                value={formData?.firstName}
              />

              <PhoneNumberInput
                config={{
                  label: "",
                  placeholder: "Numéro de téléphone portable *",
                  onChange: (value: { number: number; country: any }) => {
                    formData.phoneNumber = value.number.toString();
                    setSelectedCountry(value.country);
                    setValidButton(
                      !isNaN(value.number) &&
                        value.number.toString().length > 6 &&
                        formData?.address.length > 0 &&
                        formData?.firstName.length > 0 &&
                        formData?.login.length > 0 &&
                        formData?.name.length > 0 &&
                        formData?.lastName.length > 0
                    );
                  },
                }}
              />
              <input
                placeholder="Adresse e-mail *"
                type="text"
                onChange={(e) => {
                  onChangeForm(e.target.value, "login");
                  setValidButton(
                    e.target.value.length > 0 &&
                      formData?.address.length > 0 &&
                      formData?.firstName.length > 0 &&
                      formData?.phoneNumber.length > 0 &&
                      formData?.name.length > 0 &&
                      formData?.lastName.length > 0
                  );
                }}
                value={formData?.login}
              />
              <input placeholder="Nombre de restaurants" type="text" />
              <input placeholder="Cuisine" type="text" />
            </div>
            <div className="footerCont">
              <span>
                En cliquant sur Envoyer une demande, vous acceptez les{" "}
                <span
                  className="qsd clickable"
                  onClick={() => navigate(Paths.condition)}
                >
                  Conditions
                </span>{" "}
                et la{" "}
                <span
                  className="qsd clickable"
                  onClick={() => navigate(Paths.privacyPolicy)}
                >
                  Politique de confidentialité
                </span>{" "}
                de mydish.
              </span>
              <button
                className={
                  !validButton
                    ? "btn success restaurant-btn-add"
                    : "btn success"
                }
                type="submit"
                disabled={!validButton}
              >
                Envoyer une demande
              </button>
            </div>
          </form>
        </div>
      </div>
      <div style={{ backgroundColor: "#f4f4f4", height: HEIGHT }} />
      <div className="profit">
        <div className="profitItem">
          <div className="textCont">
            <span>{t("RESTAURANT_LANDING.PROFIT.TITLE1")}</span>
            <p>{t("RESTAURANT_LANDING.PROFIT.TEXT")}</p>
          </div>
          <img draggable={false} src={landing2} alt="" />
        </div>
        <div className="profitItem">
          <img draggable={false} src={landing3} alt="" />
          <div className="textCont">
            <span>{t("RESTAURANT_LANDING.PROFIT.TITLE2")}</span>
            <p>{t("RESTAURANT_LANDING.PROFIT.TEXT")}</p>
          </div>
        </div>
        <div className="profitItem">
          <div className="textCont">
            <span>{t("RESTAURANT_LANDING.PROFIT.TITLE3")}</span>
            <p>{t("RESTAURANT_LANDING.PROFIT.TEXT")}</p>
          </div>
          <img draggable={false} src={landing4} alt="" />
        </div>
      </div>
      <div className="whyMyDish">
        <span>{t("RESTAURANT_LANDING.WHY_MY_DISH.WHY")}</span>
        <div style={{ height: "45px" }} />
        <div className="whyProfitsCont">
          <div className="whyProfit">
            <img draggable={false} src={_ressources} alt="" />
            <div>
              <span>{t("RESTAURANT_LANDING.WHY_MY_DISH.TITLE1")}</span>
              <span>{t("RESTAURANT_LANDING.WHY_MY_DISH.TEXT1")}</span>
            </div>
          </div>
          <div className="whyProfit">
            <img draggable={false} src={temps} alt="" />
            <div>
              <span>{t("RESTAURANT_LANDING.WHY_MY_DISH.TITLE2")}</span>
              <span>{t("RESTAURANT_LANDING.WHY_MY_DISH.TEXT2")}</span>
            </div>
          </div>
          <div className="whyProfit">
            <img draggable={false} src={clients} alt="" />
            <div>
              <span>{t("RESTAURANT_LANDING.WHY_MY_DISH.TITLE3")}</span>
              <span>{t("RESTAURANT_LANDING.WHY_MY_DISH.TEXT3")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="partnersCont">
        <span>{t("RESTAURANT_LANDING.PARTNERS.TITLE")}</span>
        <div style={{ height: "50px" }} />
        <div className="partners">
          <img draggable={false} src={landing5} alt="" />
          <div>
            <p>{t("RESTAURANT_LANDING.PARTNERS.TEXT")}</p>
            <span>{t("RESTAURANT_LANDING.PARTNERS.AUTHOR")}</span>
            <span>{t("RESTAURANT_LANDING.PARTNERS.ROLE")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLandingPage;
