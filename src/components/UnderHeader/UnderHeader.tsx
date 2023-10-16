import React from "react";
import "./UnderHeader.css";
import Feature from "./Feature";

const UnderHeader = () => {
  return (
    <div className="curio_whatcurio section__margin" id="curio">
      <div className="curio_whatcurio-feature">
        <Feature
          title="What is CURIO"
          text="We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own. Connection has put impossible own apartments boisterous. At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by."
        />
      </div>
      <div className="curio_whatcurio-heading">
        <h1 className="gradient__text">
          The possibilities are beyond your imagination
        </h1>
        <p>Explore the Tool</p>
      </div>
      <div className="curio_whatcurio-container">
        <Feature
          title="Translator"
          text="We so opinion friends me message as delight. Whole front do of plate heard oh ought."
        />
        <Feature
          title="Knowledgebase"
          text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b"
        />
        <Feature
          title="Education"
          text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b"
        />
      </div>
    </div>
  );
};

export default UnderHeader;
