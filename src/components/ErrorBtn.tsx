type Props = {
  handlerErr: () => void;
};

const ErrorBtn: React.FC<Props> = ({ handlerErr }) => {
  return (
    <button className="error-btn" onClick={handlerErr}>
      Get an error
    </button>
  );
};

export default ErrorBtn;
