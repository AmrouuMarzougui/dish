import React, { useEffect, useRef, useState } from "react";
import pizza from "../../../../assets/pizza.png";
import updateSVG from "../../../../assets/modifier.svg";
import deleteSVG from "../../../../assets/supprimer.svg";
import showSVG from "../../../../assets/see.svg";
import Slider from "@mui/material/Slider";
import "./myRates.scss";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import close from "../../../../assets/close.svg";
import backArrow from "../../../../assets/back.svg";
import { useAppSelector } from "../../../../app/store/hooks";
import { selectDeviceWidth } from "../../../../app/store/storeModules/root/root";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { getMyRates } from "../../../../app/store/storeModules/common/commonService";
import EmptyMessage from "../../../../sharedComponents/emptyMessage/emptyMessage";
import {
  addUpdateRating,
  deleteRating,
} from "../../../../app/store/storeModules/announces/announcesService";
import moment from "moment";
import swal from "sweetalert";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "40px",
  boxShadow: 24,
};

// const styleShowModalBox = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//    width: "auto",
//    maxWidth: 450,
//   bgcolor: "background.paper",
//   borderRadius: "40px",
//   boxShadow: 24,
// };

const MyRates = () => {
  const [modelData, setModelData] = useState(false);
  const [modelShowData, setModelShowData] = useState(false);

  const deviceWidth = useAppSelector(selectDeviceWidth);
  const navigate = useNavigate();
  const [rates, setRates] = useState<Array<any>>([]);
  const [selectedRate, setSelectedRate] = useState(undefined);

  useEffect(() => {
    getData(true);
  }, []);

  const open = (index: number) => {
    setSelectedRate(rates[index]);
    setModelData(true);
  };

  const changeRtaes = (e: any) => {
    setRates(e);
  }

  const openshowModal = (index: number) => {
    setSelectedRate(rates[index]);
    setModelShowData(true);
  };

  const getData = (changedSomething?: boolean) => {
    setModelData(false);
    setModelShowData(false);
    setSelectedRate(undefined);
    if (changedSomething) {
      getMyRates().then((res: any) => {
        res.data?.sort((curr: any, prev: any) => {
          if (moment(curr.updatedAt).isAfter(moment(prev.updatedAt))) return -1;
          if (moment(curr.updatedAt).isBefore(moment(prev.updatedAt))) return 1;
          return 0;
        });
        setRates(res.data as Array<any>);
      });
    }
  };

  return (
    <div>
      <div className="profileHeaderContainer">
        <span
          onClick={() => {
            deviceWidth <= 768 && navigate(-1);
          }}
        >
          {deviceWidth <= 768 && (
            <img
              style={{ margin: "0 10px 0 0" }}
              draggable={false}
              src={backArrow}
              alt=""
            />
          )}
          <span>Mes avis</span>
        </span>
      </div>
      <div style={{ margin: "20px 0" }} className="horizontalSeparator" />

      <div className="ratesContainer">
        {rates.map((item, index: number) => (
          <RateComp
            item={item}
            key={index}
            openModal={() => open(index)}
            openShowModal={() => openshowModal(index)}
            getData={() => getData(true)}
          />
        ))}
      </div>

      {rates.length === 0 && (
        <EmptyMessage
          config={{
            title: "Aucun avis",
            text: "Vous n'avez pas des avis en ce moment",
          }}
        />
      )}

      {/* ////// show modal //// */}

      <Modal open={modelShowData} onClose={() => setModelShowData(false)}>
        <Box className="styleShowModalBox">
          <ShowRateComp
            data={selectedRate}
            closeModal={() => setModelShowData(false)}
          />
        </Box>
      </Modal>

      {/* ////// end show modal //// */}

      {deviceWidth > 768 ? (
        <Modal open={modelData} onClose={() => setModelData(false)}>
          <Box sx={style}>
            <EditAddRateComp data={selectedRate} submitEvent={getData} />
          </Box>
        </Modal>
      ) : (
        <BottomSheet open={modelData} onDismiss={() => setModelData(false)}>
          <EditAddRateComp data={selectedRate} submitEvent={getData} />
        </BottomSheet>
      )}
    </div>
  );
};

const RateComp: React.FC<{
  openModal: Function;
  item: any;
  openShowModal: Function;
  getData: Function;

}> = ({ openModal, item, openShowModal, getData }) => {
  return (
    <div className="rateCont">
      <img draggable={false} src={item?.restaurant?.imageUrl} alt="" />
      <div className="mainCont">
        <div className="cardHeader">
          <div className="head">
            <span className="title">{item?.restaurant?.name}</span>
            <span className="speciality">{item?.restaurant?.category}</span>
          </div>
          <div>
            <img
              onClick={() => openModal()}
              className="clickable"
              src={updateSVG}
              alt=""
            />
            <img
              onClick={() =>
                // deleteRating({RatingId : item?._id})

                swal({
                  title: "??tes-vous s??r de supprimer cet avis?",
                  // text: "Once deleted, you will not be able to recover this imaginary file!",
                  icon: "warning",
                  dangerMode: true,
                  buttons: ["Annuler", "Oui"],
                }).then((willDelete) => {
                  if (willDelete) {
                    deleteRating({ RatingId: item?._id })
                      .then((result) => {
                        getData();
                        swal("avis supprim?? avec succ??es", {
                          icon: "success",
                        })
                      }
                        // swal("avis supprim?? avec succ??es", {
                        //   icon: "success",
                        // }).then(() => 
                        //   getData
                        // )
                      )
                      .catch((err) =>
                        swal("avis nos supprim??!!", {
                          icon: "danger",
                        })
                      );
                  }
                })
              }
              className="clickable"
              src={deleteSVG}
              alt=""
            />
            <img
              className="clickable"
              src={showSVG}
              onClick={() => openShowModal()}
              alt=""
            />
          </div>
        </div>
        <div className="cardMid">
          <div className="mid">
            <div className="rateTitle">
              <span>{item?.comment}</span>
              <span className="date">
                {moment(item?.updatedAt).format("MMM Do YYYY HH:mm")}
              </span>
            </div>
            <span className="rateNumber">
              {item?.globalRating} <span className="outOfTen">/ 10</span>
            </span>
          </div>
          <div className="cardDesc">{item?.detail}</div>
        </div>
      </div>
    </div>
  );
};

export const EditAddRateComp: React.FC<{
  item?: any;
  data?: any;
  submitEvent: Function;
}> = ({ submitEvent, item, data }) => {
  const [comment, setComment] = useState(data?.comment || "");
  const [detail, setDetail] = useState(data?.detail || "");
  const globalRating = useRef(data?.globalRating || 5.5);

  const submit = () => {
    addUpdateRating(
      {
        detail,
        comment,
        globalRating: globalRating.current,
        restaurant: item?._id,
      },
      !!data ? data?._id?.toString() : null
    )
      .then(() => submitEvent(true))
      .catch(() => submitEvent());
  };

  const getDisabled = () => {
    return comment.length > 0 && detail.length > 0;
  };
  return (
    <div className="rateModal">
      <div className="modalHeader">
        <span>{!data ? "Ajouter un avis" : "Modifier l'avis"}</span>
        <img
          onClick={() => submitEvent()}
          className="close clickable"
          src={close}
          alt=""
        />
      </div>
      <div style={{ margin: "20px 0" }} className="horizontalSeparator" />
      <div className="slider">
        <span className="note">Note</span>
        <Slider
          onChange={(e: any) => (globalRating.current = e.target.value)}
          aria-label="Small"
          valueLabelDisplay="auto"
          defaultValue={globalRating.current}
          step={0.5}
          min={1}
          max={10}
        />
      </div>
      <div className="title">
        <span>Titre de l'avis</span>
        <input
          placeholder={"??criver le titre de votre avis"}
          onChange={(e) => setComment(e.target.value)}
          tabIndex={-1}
          defaultValue={data?.comment}
          type="text"
        />
      </div>
      <div className="rate">
        <span>Avis</span>
        <textarea
          placeholder={"??criver l'avis"}
          onChange={(e) => setDetail(e.target.value)}
          tabIndex={-1}
          defaultValue={data?.detail}
          rows={7}
        />
      </div>
      <div style={{ height: "50px" }} />
      <button
        disabled={!getDisabled()}
        className={`btn ${getDisabled() ? "cursorEnabled" : ""}`}
        onClick={submit}
      >
        Valider
      </button>
    </div>
  );
};

export const ShowRateComp: React.FC<{
  data?: any;
  item?: any;
  closeModal: Function;
}> = ({ closeModal, item, data }) => {
  const globalRating = useRef(data?.globalRating || 5.5);

  return (
    <div className="rateModal">
      <div className="modalHeader">
        <span className="title" style={{ marginBottom: "0px" }}>
          {"L'Arp??ge"}
        </span>
        <img
          onClick={() => closeModal()}
          className="close clickable"
          src={close}
          alt=""
        />
      </div>
      <div className="rate">
        <h3>
          {" "}
          <span>{data?.comment}</span> <span>{globalRating.current}</span>{" "}
        </h3>
        <h3>{data?.detail}</h3>
      </div>
    </div>
  );
};

export default MyRates;
