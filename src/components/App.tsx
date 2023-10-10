import { Component, ReactNode } from 'react';
import Search from './Search';

class App extends Component {
  render(): ReactNode {
    return (
      <div className="wrapper">
        <Search text={''} />
      </div>
    );
  }
}

export default App;
