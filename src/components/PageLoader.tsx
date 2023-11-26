import { useAppSelector } from '../hooks/reduxHooks';

const PageLoader: React.FC = () => {
  const isRouted = useAppSelector((store) => store.routed.isRouted);

  return isRouted ? (
    <div className="page-loader">
      <div className="page-loader__icon" data-testid="loader"></div>
    </div>
  ) : null;
};

export default PageLoader;
