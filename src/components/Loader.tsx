import { Component, ReactNode } from 'react';

type Props = {
  isLoading: boolean;
};

class Loader extends Component<Props> {
  render(): ReactNode {
    const { isLoading } = this.props;
    return isLoading ? <h2 className="loader">Loading</h2> : null;
  }
}

export default Loader;
