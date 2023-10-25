import { Component, ReactNode } from 'react';
import Search from './Search';
import ErrorBtn from './ErrorBtn';

type Props = unknown;
type State = {
  isError: boolean;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isError: false };
  }

  handlerErr = (): void => {
    this.setState({ isError: true }, () => {
      throw new Error('This is a test error!');
    });
  };

  render(): ReactNode {
    return (
      <div className="wrapper">
        <ErrorBtn handlerErr={this.handlerErr} />
        <Search />
      </div>
    );
  }
}

export default App;
