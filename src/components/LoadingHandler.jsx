import BeatLoader from 'react-spinners/BeatLoader';

const LoadingHandler = ({ loading, children }) => {
  if (loading) {
    return (
      <div className="center-contents w-100 h-100">
        <BeatLoader color="#D82229" size={40} />
      </div>
    );
  } else {
    return children;
  }
};

export default LoadingHandler;
