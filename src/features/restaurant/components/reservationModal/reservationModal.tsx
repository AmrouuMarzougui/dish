import close from "../../../../assets/close.svg";
import React, { useEffect, useState } from "react";
import "./reservationModal.scss";
import calendar from "../../../../assets/calender.svg";
import clock from "../../../../assets/clockActive.svg";
import clockDisabled from "../../../../assets/clockDisabled.svg";
import body from "../../../../assets/personne.svg";
import bodyDisabled from "../../../../assets/personneDisabled.svg";
import ticket from "../../../../assets/ticket.svg";
import ticketDisabled from "../../../../assets/ticketDisabled.svg";
import selectArrow from "../../../../assets/selectArrow.svg";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CalendarPicker from "@mui/lab/CalendarPicker";
import { Paths } from "../../../../app/utils/paths";
import { useNavigate } from "react-router-dom";
import VerticalScroll from "../../../../sharedComponents/verticalScroll/verticalScroll";
import { useAppDispatch } from "../../../../app/store/hooks";
import moment from "moment";
import "moment/locale/fr";
import { setOrderDetails } from "../../../../app/store/storeModules/cart/cartSlice";
import { passOrder } from "../../../../app/store/storeModules/cart/cartService";
import swal from "sweetalert";

moment.locale("fr");

const ModalReservation: React.FC<{ closeEvent: Function; restaurant: any }> = ({
  closeEvent,
  restaurant,
}) => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [WIDTH, setWidth] = useState(25);
  const [date, setDate] = React.useState<Date | null>(new Date());
  const navigate = useNavigate();
  const [selectedTimeInterval, setSelectedTimeInterval] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(0);
  const dayly = [
    { label: "11:30", value: 690 },
    { label: "12:00", value: 720 },
    { label: "12:30", value: 750 },
    { label: "13:00", value: 780 },
    { label: "13:30", value: 810 },
    { label: "14:00", value: 840 },
    { label: "14:30", value: 870 },
    { label: "15:00", value: 900 },
    { label: "15:30", value: 930 },
  ];

  const nighty = [
    { label: "19:30", value: 1170 },
    { label: "20:00", value: 1200 },
    { label: "20:30", value: 1230 },
    { label: "21:00", value: 1260 },
    { label: "21:30", value: 1290 },
    { label: "22:00", value: 1320 },
    { label: "22:30", value: 1350 },
    { label: "23:00", value: 1380 },
    { label: "23:30", value: 1410 },
    { label: "00:00", value: 1440 },
  ];

  const day = [
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
  ];
  const night = [
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
    "00:00",
  ];
  const TIMES = [day, night];
  const RESERVATION_TIMES = [dayly, nighty];

  const [selectedTime, setSelectedTime] = useState(0);
  const [selectedPeopleNumber, setSelectedPeopleNumber] = useState(0);

  const now = new Date();
  const current = now.getHours() + ":" + now.getMinutes();
  console.log(typeof current);

  useEffect(() => {
    setWidth(step * 25);
  }, [step]);

  const today = new Date();
  const todayHour = new Date().getHours();
  const todayMinutes = new Date().getMinutes();

  const changedTime = (e: number) => {
    setSelectedTime(e);
  };
  const changedPeopleNumber = (e: number) => {
    setSelectedPeopleNumber(e);
  };

  const goToShopping = () => {
    const resDetail = {
      restaurant: restaurant,
      date: date,
      // time: TIMES[selectedTimeInterval][selectedTime],
      time: RESERVATION_TIMES[selectedTimeInterval][selectedTime].label,

      peopleNumber: selectedPeopleNumber + 1,
      offre: selectedOffer === 0,
    };
    dispatch(setOrderDetails(resDetail));
    navigate(Paths.shop);
  };

  return (
    <div className="modalReservationContainer">
      <div className="cont">
        <div className="modalHeader">
          <span>Réservation • {restaurant?.name}</span>
          <img
            onClick={() => closeEvent()}
            className="clickable"
            draggable={false}
            src={close}
            alt=""
          />
        </div>
        <div className="horizontalSeparator" />
        <div className="stepsContainer">
          <div className="headerSteps">
            <div className="iconsContainer">
              <div className="iconCont">
                {step === 1 ? (
                  <img
                    onClick={() => setStep(1)}
                    className="clickable"
                    draggable={false}
                    src={calendar}
                    alt=""
                  />
                ) : (
                  <span
                    onClick={() => setStep(1)}
                    className="valueSelectedTab clickable"
                  >
                    {moment(date).format("MMM Do YYYY")}
                  </span>
                )}
              </div>
              <div className="iconCont">
                {step !== 2 && WIDTH > 50 ? (
                  <span
                    onClick={() => setStep(2)}
                    className="valueSelectedTab clickable"
                  >
                    {`${selectedTimeInterval === 0 ? "Déjeuner" : "Dîner"} ${
                      // TIMES[selectedTimeInterval][selectedTime]
                      RESERVATION_TIMES[selectedTimeInterval][selectedTime]
                        .label
                    }`}
                  </span>
                ) : (
                  <img
                    onClick={() => setStep(2)}
                    className="clickable"
                    draggable={false}
                    src={step === 2 ? clock : clockDisabled}
                    alt=""
                  />
                )}
              </div>
              <div className="iconCont">
                {step !== 3 && WIDTH > 75 ? (
                  <span
                    onClick={() => setStep(3)}
                    className="valueSelectedTab clickable"
                  >
                    {selectedPeopleNumber + 1} pers.
                  </span>
                ) : (
                  <img
                    onClick={() => setStep(3)}
                    className="clickable"
                    draggable={false}
                    src={step === 3 ? body : bodyDisabled}
                    alt=""
                  />
                )}
              </div>
              <div className="iconCont">
                <img
                  onClick={() => setStep(4)}
                  className="clickable"
                  draggable={false}
                  src={step === 4 ? ticket : ticketDisabled}
                  alt=""
                />
              </div>
            </div>
            <div className="underline" style={{ width: WIDTH + "%" }} />
            <div className="underlineStatic" />
          </div>
          <div className="step">
            {step === 1 && (
              <div className="calendar">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <CalendarPicker
                    className="calendarPicker"
                    date={date}
                    onChange={(newDate) => setDate(newDate)}
                    minDate={new Date()}
                  />
                </LocalizationProvider>
              </div>
            )}
            {step === 2 && (
              <div className="scrollCont">
                <div className="selectCont">
                  <span
                    onClick={() => setSelectedTimeInterval(0)}
                    className={`clickable ${selectedTimeInterval === 0}`}
                  >
                    Déjeuner
                  </span>
                  <span
                    onClick={() => setSelectedTimeInterval(1)}
                    className={`clickable ${selectedTimeInterval === 1}`}
                  >
                    Dîner
                  </span>
                  {/*<img draggable={false} src={selectArrow} alt='' />*/}
                </div>
                <VerticalScroll
                  key={1}
                  elements={RESERVATION_TIMES[selectedTimeInterval].map(
                    (t) => t.label
                  )}
                  selected={selectedTime}
                  onChange={changedTime}
                />
              </div>
            )}
            {step === 3 && (
              <div className="scrollCont">
                <div className="selectCont">
                  <span>Nombre de personnes</span>
                </div>
                <VerticalScroll
                  key={2}
                  elements={[1, 2, 3, 4, 5, 6]}
                  selected={selectedPeopleNumber}
                  onChange={changedPeopleNumber}
                />
              </div>
            )}
            {step === 4 && (
              <div className="scrollCont noBorder">
                <div className="selectCont">
                  <span>Offre</span>
                </div>
                <div
                  onClick={() => setSelectedOffer(0)}
                  className={`cont clickable ${selectedOffer === 0 && "gray"}`}
                >
                  <span className="title orange">-25% sur la carte</span>
                  <span className="text">
                    Hors menu. hors boisson. Valable pour le créneau horaire
                    réservé
                  </span>
                </div>
                <div
                  onClick={() => setSelectedOffer(1)}
                  className={`cont clickable ${selectedOffer === 1 && "gray"}`}
                >
                  <span className="title">Réservation sans offre</span>
                  <span className="text">
                    La réservation à la carte standard sans promotion
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ height: "50px" }} />
      <button
        className="btn success ModalButton"
        onClick={() =>
          step < 4
            ? step === 2 &&
              today?.getDate() == date?.getDate() &&
              RESERVATION_TIMES[selectedTimeInterval][selectedTime].value <
                todayHour * 60
              ? swal(
                  "Vous devez choisir un temps valide",
                  `${RESERVATION_TIMES[selectedTimeInterval][selectedTime].label} n'est pas vilde auhourd'hui`
                )
              : setStep(step + 1)
            : goToShopping()
        }
      >
        Suivant
      </button>
    </div>
  );
};

export default ModalReservation;
