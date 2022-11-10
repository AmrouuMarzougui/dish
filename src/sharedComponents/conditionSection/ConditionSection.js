import "./ConditionSection.scss";

const ConditionSection = ({ title, listdescription }) => {
  return (
    <div className="container-condition-section">
      <h1 className="condition-title">{title}</h1>

      {listdescription &&
        listdescription.map((t, index) => (
          <div key={index}>
            <p>{t.description}</p>
            {t.items && t.items.map((item, i) => <p key={i}>- {item}</p>)}
          </div>
        ))}
    </div>
  );
};

export default ConditionSection;
