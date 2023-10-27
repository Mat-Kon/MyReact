type Props = {
  isLoading: boolean;
};

const Loader: React.FC<Props> = ({ isLoading }) => {
  return isLoading ? <h2 className="loader">Loading</h2> : null;
};

export default Loader;
