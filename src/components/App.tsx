import { Result } from './Results';
import { Search } from './search';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Search />
      <Result />
    </div>
  );
};

export { App };
