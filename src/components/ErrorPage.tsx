import { Component, ReactNode } from 'react';

class ErrorPage extends Component {
  render(): ReactNode {
    return (
      <div className="wrapper">
        <h1 className="error-message-2">This mistake gave victory to the Empire!</h1>
      </div>
    );
  }
}

export default ErrorPage;
