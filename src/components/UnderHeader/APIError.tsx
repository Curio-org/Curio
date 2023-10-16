import React from "react";
import { Message } from "semantic-ui-react";
import "./APIError.css";

interface APIErrorProps {
  apiResponse: string;
}

const APIError: React.FC<APIErrorProps> = ({ apiResponse }) => {
  return (
    <div className="apiErrorMessage_mainDiv">
      {apiResponse !== "" && (
        <Message className="apiErrorMessage__div">
          <Message className="apiErrorMessage__header">API Error</Message>
          <p>{apiResponse}</p>
        </Message>
      )}
    </div>
  );
};

export default APIError;
