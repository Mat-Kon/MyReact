type Props = {
  isLoading: boolean;
};

const Loader: React.FC<Props> = ({ isLoading }) => {
  return isLoading ? <div className="loader"></div> : null;
};

export default Loader;
