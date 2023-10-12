import React from 'react';
import { Message } from 'semantic-ui-react';
import './APIError.css';

interface APIErrorProps {
  apiResponse: string;
}

class APIError extends React.Component<APIErrorProps> {
  render() {
    return (
      <div className="apiErrorMessage_mainDiv">
        {this.props.apiResponse !== '' && (
          <Message className="apiErrorMessage__div">
            <Message className="apiErrorMessage__header">API Error</Message>
            <p>{this.props.apiResponse}</p>
          </Message>
        )}
      </div>
    );
  }
}

export default APIError;
