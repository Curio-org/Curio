import React from "react";
import "./UnderHeader.css";
import Feature from "./Feature";

const UnderHeader = () => {
  return (
    <div className="curio_whatcurio section__margin" id="curio">
      <div className="curio_whatcurio-feature">
        <Feature
          title="What is CURIO"
          text="Welcome to Curio, a remarkable web application designed to address the language and communication barriers between mentors and learners. Our platform serves as an open space where individuals can translate their favorite YouTube videos into their desired languages, fostering a sense of connection and understanding."
        />
      </div>
      <div className="curio_whatcurio-heading">
        <h1 className="gradient__text">
        Explore the intricate web of possibilities, where every choice has a precise ripple effect
        </h1>
        <p>Start Translating Now...</p>
      </div>
      <div className="curio_whatcurio-container">
        <Feature
          title="Translator"
          text="At its current stage of development, Curio offers translation and viewing functionalities, with plans to expand into machine dubbing in the future"
        />
        <Feature
          title="Innovation"
          text="One of the most intriguing aspects of Curio is its ability to link students studying different languages. We provide a platform where these language enthusiasts can come together and put their skills to the test through audio dubbing. By dubbing videos in the languages they are learning, students can immerse themselves in real-world language practice and gain valuable experience."
        />
        <Feature
          title="Validation"
          text="Curio takes this innovative approach a step further by incorporating a validation process. After students submit their dubbed audio, it undergoes a thorough review. We compare the transcript of the dubbed audio with the converted transcript of the original audio in the dubbed language, using the reliable Google Translator. This meticulous validation process ensures that the dub meets the minimum criteria for acceptance, guaranteeing the quality and accuracy of the dubbed content."
        />
      </div>
    </div>
  );
};

export default UnderHeader;
