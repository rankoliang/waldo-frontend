import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ScrollableImage from './ScrollableImage';
import CharactersInterface from './CharactersInterface';
import ErrorBoundary from './ErrorBoundary';
import { searchForSelectedCharacter } from '../features/searches/searchesSlice';

const GameCanvas = ({ level, level: { image_path }, ...props }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleClick = ({ nativeEvent: { offsetX, offsetY }, target }) => {
    const { zoom } = target.style;

    const x = offsetX / zoom;
    const y = offsetY / zoom;
    const coords = { x, y };

    dispatch(searchForSelectedCharacter({ level, coords, setError }));
  };

  return (
    <ErrorBoundary error={error}>
      <ScrollableImage
        src={image_path}
        alt="Find Waldo!"
        onClick={handleClick}
        {...props}
      />
      <CharactersInterface />
    </ErrorBoundary>
  );
};

export default GameCanvas;
