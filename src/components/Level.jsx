import { Progress } from 'react-bulma-components';
import ScrollableImage from './ScrollableImage';
import areas from '../areas/areas';

const Level = ({ level: { image_path }, loading = false, ...props }) => {
  const handleClick = ({ nativeEvent: { offsetX, offsetY }, target }) => {
    const { zoom } = target.style;

    const x = offsetX / zoom;
    const y = offsetY / zoom;
    const coords = { x, y };
    console.log(coords);

    console.log(areas.containing(x, y));
  };

  if (loading) {
    return <Progress />;
  } else {
    return (
      <ScrollableImage
        src={image_path}
        alt="Find Waldo!"
        onClick={handleClick}
        {...props}
      />
    );
  }
};

export default Level;
