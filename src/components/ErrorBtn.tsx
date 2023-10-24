import { Component, ReactNode } from 'react';

type Props = {
  throwError: () => never;
};

class ErrorBtn extends Component<Props> {
  render(): ReactNode {
    const { throwError } = this.props;
    return (
      <button className="error-btn" onClick={throwError}>
        Get an error
      </button>
    );
  }
}

export default ErrorBtn;
