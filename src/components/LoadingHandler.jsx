import BeatLoader from 'react-spinners/BeatLoader';

const LoadingHandler = ({ loading, children }) => {
  if (loading) {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        className="center-contents"
      >
        <BeatLoader color="#D82229" size={40} />
      </div>
    );
  } else {
    return children;
  }
};

export default LoadingHandler;
