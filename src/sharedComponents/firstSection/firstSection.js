import "./firstSection.scss";

const FirstSection = ({ image, title }) => {
  return (
    <div
      className="container-first-section"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="centered">
        <h2 className="first-section-title">{title}</h2>
      </div>
    </div>
  );
};

export default FirstSection;
