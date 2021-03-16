import Level from './Level';
import { Progress } from 'react-bulma-components';
import 'react-bulma-components/dist/react-bulma-components.min.css';

const GameCanvas = ({ level, loading }) => {
  if (loading) {
    return <Progress />;
  } else {
    return <Level level={level} />;
  }
};
export default GameCanvas;
