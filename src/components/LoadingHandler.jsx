import { Progress } from 'react-bulma-components';

const LoadingHandler = ({ loading, children }) => {
  if (loading) {
    return <Progress className="progress-bar"/>;
  } else {
    return children;
  }
};

export default LoadingHandler;
