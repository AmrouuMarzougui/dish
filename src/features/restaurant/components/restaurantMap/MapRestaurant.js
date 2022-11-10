import { useNavigate } from "react-router-dom";
import "./MapRestaurant.scss";
const { compose, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps");

const GoogleMapApi = compose(
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen:
        ({ isOpen }) =>
        () => ({
          isOpen: !isOpen,
        }),
    }
  ),
  withScriptjs,
  withGoogleMap
)((props) => {
  let iconMarker = new window.google.maps.MarkerImage(
    "https://i.ibb.co/cv3rRWY/logo3e-1.png",
    null,
    null,
    null,
    new window.google.maps.Size(45, 45)
  );

  const getMarkerSvg = (item) => `
  <svg xmlns='http://www.w3.org/2000/svg' width='54.385' height='71.4' viewBox='0 0 54.385 71.4'>
    <path fill='${!!item.reduction ? "#fb5557" : "#45b995"}'
          d='M-85.347 389.123a27.224 27.224 0 0 0-27.192 27.2c0 9.679 2.945 13.56 17.093
          32.212 2.456 3.238 5.241 6.912 8.427 11.156a2.092 2.092 0 0 0 2.927.419 2.094 2.094 0 0 0
          .419-.419c3.165-4.224 5.939-7.879 8.384-11.107 14.183-18.707 17.134-22.6 17.134-32.262a27.224 27.224 0 0 0-27.192-27.199z'
          transform='translate(112.539 -389.123)'
    >
    </path>
    ${
      !!item.reduction
        ? `
      <text font-family='circe' font-weight='bold' font-size='13' x='${
        item.globalRating.toString().length > 1 ? 20 : 22
      }' y='25' fill='white'>${item.globalRating}</text>
      <line opacity='0.4' stroke='white' stroke-width='1' x1='1' x2='53' y1='32' y2='32' />
      <text font-family='circe' font-weight='bold' font-size='13' x='17' y='50' fill='white'>${
        item.reduction
      }%</text>
    `
        : `
      <text font-family='circe' font-weight='bold' font-size='16' x='22' y='35' fill='white'>${item.globalRating}</text>
    `
    }
  </svg>
  `;

  const navigate = useNavigate();

  return (
    <GoogleMap
      defaultZoom={props.defaultZoom}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      <Marker
        icon={window.URL.createObjectURL(
          new Blob([getMarkerSvg(props.el)], { type: "image/svg+xml" })
        )}
        position={{ lat: props.lat, lng: props.lng }}
        onClick={props.onToggleOpen}
      >
        {props.isOpen && (
          <InfoWindow onCloseClick={props.onToggleOpen}>
            <div
              className="map-info-window"
              style={{
                minWidth: "250px",
                maxWidth: "250px",
                minHeight: "400px",
              }}
            >
              <img
                src={props.image}
                style={{ width: "100%", height: "120px" }}
              />
              <div style={{ padding: "5px 10px" }}>
                <div className="map-info-title" style={{ fontWeight: "bold" }}>
                  {props.title}

                  <span className="rate" style={{ float: "right" }}>
                    {props.globalRating}
                    <span className="outOfTen">/ 10</span>
                  </span>
                </div>

                <div className="map-info-title">
                  <span> Prix moyen {" " + props.avergePrice} € </span>

                  <span
                    className="comments-map clickable"
                    onClick={() => navigate(`/restaurantRates/${props.id}`)}
                  >
                    {props.ratingLength || 0}
                  </span>
                </div>
                <span style={{ color: "gray" }}>{props.speciality}</span>
                <div className="map-info-emplacement">
                  <div className="map-info-content">{props.localisation}</div>
                </div>
                {/* <div className="map-info-tel">
                  <div className="map-info-content">{props.phone}</div>
                </div> */}
              </div>
            </div>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  );
});

export default GoogleMapApi;
