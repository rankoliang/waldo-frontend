import ScrollableImage from './ScrollableImage';
import CharactersInterface from './CharactersInterface';
import areas from '../areas/areas';
import 'react-bulma-components/dist/react-bulma-components.min.css';

const GameCanvas = ({
  level: { image_path },
  characters = [],
  error = null,
  ...props
}) => {
  const handleClick = ({ nativeEvent: { offsetX, offsetY }, target }) => {
    const { zoom } = target.style;

    const x = offsetX / zoom;
    const y = offsetY / zoom;
    const coords = { x, y };
    console.log(coords);

    console.log(areas.containing(x, y));
  };

  return (
    <>
      <ScrollableImage
        src={image_path}
        alt="Find Waldo!"
        onClick={handleClick}
        {...props}
      />
      <CharactersInterface characters={characters} />
    </>
  );
};

export default GameCanvas;
