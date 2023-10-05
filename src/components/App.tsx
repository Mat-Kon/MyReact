import { Component, ReactNode } from 'react';
import { Results } from './Results';
import { Search } from './Search';

class App extends Component {
  render(): ReactNode {
    return (
      <div className="wrapper">
        <Search text={''} />
        <Results />
      </div>
    );
  }
}

export { App };
