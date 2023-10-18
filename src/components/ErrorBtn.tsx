import { Component, ReactNode } from 'react';

type Props = {
  handleError: () => void;
};

class ErrorBtn extends Component<Props> {
  componentDidMount(): void {
    const { handleError } = this.props;
    window.addEventListener('error', handleError);
  }

  getError = () => {
    throw new Error('You caused is Error');
  };
  render(): ReactNode {
    return (
      <button className="error-btn" onClick={this.getError}>
        Get an error
      </button>
    );
  }
}

export default ErrorBtn;
