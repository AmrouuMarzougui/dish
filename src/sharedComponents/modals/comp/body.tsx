import {
  selectDeviceWidth,
  setShoppingModal,
} from "../../../app/store/storeModules/root/root";
import close from "../../../assets/close.svg";
import moinInActive from "../../../assets/moinInActive.svg";
import moinActive from "../../../assets/moinActive.svg";
import plusInActive from "../../../assets/plusInActive.svg";
import plusActive from "../../../assets/plusActive.svg";
import { Paths } from "../../../app/utils/paths";
import React, { useEffect, useRef, useState } from "react";
import "../modal.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store/hooks";
import {
  addToCart,
  getCart,
} from "../../../app/store/storeModules/cart/cartService";
import {
  setCart,
  setOrderDetails,
} from "../../../app/store/storeModules/cart/cartSlice";

const Body: React.FC<{ item: any }> = ({ item }) => {
  const deviceWidth = useAppSelector(selectDeviceWidth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState("");
  const [count, setCount] = useState(1);
  const description = useRef("");
  const increment = (inc: number) => {
    if (inc > 0 && count === 1) {
      setCount(count + inc);
    }
    if (inc < 0 && count === 2) {
      setCount(count + inc);
    }
  };

  const addToCartFn = () => {
    const res = JSON.parse(localStorage.getItem("RESTAURANT") as string);
    if (localStorage.getItem("ORDER_DETAILS") === "null") {
      const resDetail = {
        restaurant: res,
      };
      dispatch(setOrderDetails(resDetail));
    }
    let temp: { [key: string]: any } = {
      description: description.current,
      options: checkedd.length > 0 ? checkedd : [],
    };
    !!item?.bottleType ? (temp.boisson = item?._id) : (temp.plat = item?._id);
    addToCart(temp).then(() => {
      dispatch(setShoppingModal(null));
      getCart().then((res: any) => {
        dispatch(setCart(res.data));
        navigate(Paths.shop);
      });
    });
  };

  // console.log("checked", checked)

  /////// check list ////////////////////////////////////////////////////////////////////
  const [checkedd, setCheckedd] = useState<any>([]);

  // Add/Remove checked item from list
  const handleCheck = (event: any) => {
    var updatedList = [...checkedd];
    // var updatedList:any[] = [...checkedd]
    if (event.target.checked) {
      updatedList = [...checkedd, event.target.value];
    } else {
      updatedList.splice(checkedd.indexOf(event.target.value), 1);
    }
    setCheckedd(updatedList);
  };

  console.log("checkedd", checkedd);

  return (
    <div>
      <div className="shoppingModalContainer">
        <div
          className="shoppingModalHeader"
          style={{ backgroundImage: `url(${item?.imageUrl})` }}
        >
          <img
            onClick={() => dispatch(setShoppingModal(null))}
            className="close clickable"
            src={close}
            alt=""
          />
        </div>
        <div className="cont">
          <div className="shoppingModalDescription">
            <span className="shoppingModalDescriptionTitle">{item?.name}</span>
            <span>{item?.description}</span>
          </div>
          {item?.options?.length > 0 && <div className="horizontalSeparator" />}
          <div className="shoppingModalChoices">
            {item?.options?.map((item: any, index: number) => (
              <div key={index} className="checklist-input">
                <input
                  style={{ height: "25px", width: "25px" }}
                  value={item?.name}
                  type="checkbox"
                  onChange={handleCheck}
                />
                <div className="option-details">
                  <span>{item?.name}</span>
                  <span>+ {item?.price.toFixed(2)} €</span>
                </div>

                {/* <span >{item}</span> */}
              </div>

              // <div
              //   className="radioEl"
              //   onClick={() => setChecked(item?.name?.toString())}
              // >
              //   <div className="flexRadio">
              //     <span
              //       className={`radio ${
              //         checked === item?.name ? "isActive" : ""
              //       }`}
              //     >
              //       <span
              //         className={`innerRadio ${
              //           checked === item?.name ? "isActive" : ""
              //         }`}
              //       />
              //     </span>
              //     <span className="radioLabel">{item?.name}</span>
              //   </div>
              //   <span
              //     className={`price ${
              //       checked === item?.name ? "isActive" : ""
              //     }`}
              //   >
              //     + {item?.price.toFixed(2)} €
              //   </span>
              // </div>
            ))}
            {/* </div> */}
          </div>
          <div className="horizontalSeparator" />
          <div className="shoppingModalSpecialInstruction">
            <span>Instructions spéciales </span>
            <textarea
              onChange={(e) => (description.current = e.target.value)}
              tabIndex={-1}
              placeholder={"Ajouter une remarque ou une instruction spéciale"}
              rows={3}
            />
          </div>
        </div>
        <div className="shoppingModalFooter">
          <div className="shoppingModalFooterSettings">
            {/*<img onClick={() => increment(-1)} className={count === 1 ? 'unClickable' : 'clickable'} draggable={false} src={count === 1 ? moinInActive : moinActive} alt='' />*/}
            {/*<span>{count}</span>*/}
            {/*<img onClick={() => increment(1)} className={count === 2 ? 'unClickable' : 'clickable'} draggable={false} src={count === 2 ? plusInActive : plusActive} alt='' />*/}
          </div>
          <button className={"btn success"} onClick={addToCartFn}>
            <span>Ajouter{deviceWidth > 768 && ` à la commande`}</span>
            <span>+ {item?.price.toFixed(2)} € </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
