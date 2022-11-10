import { useNavigate } from "react-router-dom";

const { compose, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps");
const MarketMap = compose(
  withStateHandlers(
    () => ({
      isOpen: {},
    }),
    {
      onToggleOpen:
        ({ isOpen }) =>
        (id) => ({
          isOpen: {
            ...isOpen,
            [id]: isOpen[id] == undefined ? true : !isOpen[id],
          },
        }),
    }
  ),
  withScriptjs,
  withGoogleMap
)((props) => {
  const sallesPositions = [
    {
      id: 0,
      title: "Saint-Louis",
      info: `Notre marque référence en terme de machine est Panatta marque de qualité italienne, et pour tout nos accessoires notre fournisseur direct est Leader Fit.`,
      position: {
        lat: 47.59647925752822,
        lng: 7.551033142198212,
      },
      localisation: "2 rue des Entrepreneurs 68300 Saint-Louis",
      phone: "03 89 69 85 06",
    },
    {
      id: 1,
      title: "Langres",
      info: `Accessible aux amateurs comme aux confirmés, notre coach est là pour vous accompagner et vous guider au plus près de vos objectifs.`,
      position: {
        lat: 47.84398187928568,
        lng: 5.331765062945728,
      },
      localisation: "Rue Louis Lepitre 52200 Langres",
      phone: "03 25 84 62 33",
    },
    {
      id: 2,
      title: "Blatterans",
      info: `Accessible aux amateurs comme aux confirmés, notre coach est là pour vous accompagner et vous guider au plus près de vos objectifs.`,
      position: {
        lat: 46.748522810205394,
        lng: 5.464403704482563,
      },
      localisation: "",
      phone: "",
      isOpen: false,
    },
    {
      id: 3,
      title: "Montmorot",
      info: `Le complexe d'une superficie de 380m² a ouvert ses portes au mois de juin 2015, c'est une salle en libre accès avec système de badge individuelle ouverte de 6h à 23h 7j/7`,
      position: {
        lat: 46.6729561830691,
        lng: 5.539417228912009,
      },
      localisation: "85 Rue des Salines 39570 Montmorot",
      phone: "03 84 44 02 94",
    },
    {
      id: 4,
      title: "Le Creusot",
      info: `Notre mission vous motivé, vous inspiré, vous guidé dans vos objectifs.`,
      position: {
        lat: 46.78638551999664,
        lng: 4.435623998519369,
      },
      localisation: "Boulevard des Abattoirs 71210 Torcy",
      phone: "03 85 68 35 43",
    },
    {
      id: 5,
      title: "besançon",
      info: `Ouvert depuis 2015 avec une surface de 350 M2 et offrant accès à divers zone d'entrainement.`,
      position: {
        lat: 47.22488330893421,
        lng: 5.9686807802484605,
      },
      localisation: "226C Rue de Dole, 25000 Besançon",
      phone: "03 81 63 68 92",
    },
    {
      id: 6,
      title: "Lons-Le-Saunier",
      info: `Plusieurs espaces ont été créés, un espace cross training, musculation, cardio, fitness et biking, des espaces complet pour des séances intensives pour le plus grand bonheur de nos adhérents.`,
      position: {
        lat: 46.669621778162266,
        lng: 5.567650217209983,
      },
      localisation: "12 Chemin de la Guiche 39000 Lons-le-Saunier",
      phone: "03 84 43 41 38",
    },
    {
      id: 7,
      title: "Saint-Vit",
      info: `Un club Sur-Mesure : Eh oui !! Chez nous on fait tout pour que nos citronnés murissent dans les meilleurs conditions. C’est toi qui créer ton abonnement en te rajoutant les options que tu désirs.`,
      position: {
        lat: 47.18156844336826,
        lng: 5.803807846524429,
      },
      localisation: "21 Boulevard de la Gare 25410 Saint-Vit",
      phone: "03 81 80 43 60",
    },
    {
      id: 8,
      title: "Louhans",
      info: `Dans un accueil souriant et chaleureux par notre hôtesse d'accueil Alicia, toujours disponible pour conseiller et renseigner les adhérents.`,
      position: {
        lat: 46.62855877499802,
        lng: 5.217021610798946,
      },
      localisation: "4 Rue de Bram 71500 Louhans",
      phone: "03 85 74 01 41",
    },
    {
      id: 9,
      title: "Beaune",
      info: `La salle Fitness Addict est une salle de fitness, musculation et remise en forme, de plus de 400 m².`,
      position: {
        lat: 47.01311431646109,
        lng: 4.844203851744859,
      },
      localisation: "2 Rue du Beaumarche, 21200 Beaune",
      phone: "03 80 20 61 31",
    },
    {
      id: 10,
      title: "Dole",
      info: `Votre club met à votre disposition un espace de Cardio-Training, une zone de Musculation guidée, une zone de charges libres ainsi qu’un espace Fitness.`,
      position: {
        lat: 47.06811773519001,
        lng: 5.457552173627988,
      },

      localisation: "Rue des Prairières 39100 Choisey",
      phone: "03 84 69 58 96",
    },
    {
      id: 11,
      title: "Oyonnax",
      info: `C'est depuis le 16 Septembre 2019 que votre club de relimi en forme LemonOne Fitness à ouvert ces portes.`,
      position: {
        lat: 46.269575219012076,
        lng: 5.658516962891957,
      },
      localisation: "5 Cours de Verdun, 01100 Oyonnax",
      phone: "04 74 73 87 96",
    },
    {
      id: 12,
      title: "Autun",
      info: `La salle est ouverte 7/7j de 6h00 à 23h00 ce qui permet à n’importe quel moment de la journée de venir s’entraîner à notre salle de sport.`,
      position: {
        lat: 46.96864656116126,
        lng: 4.305933169051943,
      },
      localisation: "48 Route d'Arnay 71400 Autun",
      phone: "03 85 54 28 44",
    },
    {
      id: 13,
      title: "Paray-le-Monial",
      info: `S’il y avait une définition à donner, ce serait le sport plaisir haut de gamme sur mesure accessible à tout le monde`,
      position: {
        lat: 46.467331970413966,
        lng: 4.107803478554378,
      },
      localisation: "Parc d'Activites du, Champ Bossu, 71600 Paray-le-Monial",
      phone: "03 85 25 46 35",
    },
    {
      id: 14,
      title: "Pontarlier",
      info: `Notre club de remise en forme Lemon one Pontarlier vous accueil sur une surface de 600 M2 depuis 04 Octobre 2019 à Doubs. Ouvert 7/7 de 6h à 23h`,
      position: {
        lat: 46.92504474279692,
        lng: 6.344285062977134,
      },
      localisation: "4a Rue de Besançon 25300 Doubs",
      phone: "03 81 39 38 92",
    },
  ];
  let iconMarker = new window.google.maps.MarkerImage(
    "https://i.ibb.co/cv3rRWY/logo3e-1.png",
    null,
    null,
    null,
    new window.google.maps.Size(32, 32)
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

  console.log("props.adsList", props.adsList && props.adsList);

  return (
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{ lat: 48.8566, lng: 2.3522 }}
      className="mapCard"
    >
      {props.adsList &&
        props.adsList.map((el, index) => (
          <Marker
            icon={window.URL.createObjectURL(
              new Blob([getMarkerSvg(el)], { type: "image/svg+xml" })
            )}
            key={el._id}
            position={{
              lat: el.location?.coordinates[1],
              lng: el.location?.coordinates[0],
            }}
            onClick={() => {
              props.onToggleOpen(el._id);
            }}
          >
            {props.isOpen[el._id] === true && (
              <InfoWindow key={el.id}>
                <div
                  className="map-info-window"
                  style={{
                    minWidth: "250px",
                    maxWidth: "250px",
                    minHeight: "400px",
                  }}
                >
                  <img
                    src={el?.imageUrl}
                    style={{ width: "100%", height: "120px" }}
                  />
                  <div style={{ padding: "5px 10px" }}>
                    <div
                      className="map-info-title"
                      style={{ fontWeight: "bold" }}
                    >
                      {el?.name}

                      <span className="rate" style={{ float: "right" }}>
                        {el?.globalRating}
                        <span className="outOfTen">/ 10</span>
                      </span>
                    </div>

                    <div className="map-info-title">
                      <span> Prix moyen {" " + el?.avgPrice[0]} € </span>

                      <span
                        className="comments-map clickable"
                        onClick={() => navigate(`/restaurantRates/${el?._id}`)}
                      >
                        {el?.rating.length || 0}
                      </span>
                    </div>
                    <span style={{ color: "gray" }}>
                      {el?.specialty?.map(
                        (item, index) => `${index !== 0 ? " • " : ""}${item}`
                      )}
                    </span>
                    <div className="map-info-emplacement">
                      <div className="map-info-content">{el?.address}</div>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
    </GoogleMap>
    // </div>
  );
});
export default MarketMap;
