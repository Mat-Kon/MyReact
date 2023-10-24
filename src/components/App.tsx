import { Component, ReactNode } from 'react';
import Search from './Search';
import ErrorBtn from './ErrorBtn';

type Props = unknown;
type State = {
  isError: boolean;
};

class App extends Component<Props, State> {
  throwError = (): never => {
    throw new Error('This is a test error!');
  };

  render(): ReactNode {
    return (
      <div className="wrapper">
        <ErrorBtn throwError={this.throwError} />
        <Search />
      </div>
    );
  }
}

export default App;
