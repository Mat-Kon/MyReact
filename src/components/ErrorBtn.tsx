import { Component, ReactNode } from 'react';

type Props = {
  handlerErr: () => void;
};

class ErrorBtn extends Component<Props> {
  render(): ReactNode {
    const { handlerErr } = this.props;
    return (
      <button className="error-btn" onClick={handlerErr}>
        Get an error
      </button>
    );
  }
}

export default ErrorBtn;
