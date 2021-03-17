import { useState } from 'react';
import ScrollableImage from './ScrollableImage';
import CharactersInterface from './CharactersInterface';
import { fetchFound } from '../helpers';
import ErrorBoundary from './ErrorBoundary';
import {
  useSelectedCharacter,
  useCharactersDispatch,
} from '../features/characters/CharactersContext';
import { characterFound } from '../features/characters/charactersSlice';

const GameCanvas = ({ level, level: { image_path }, ...props }) => {
  const [error, setError] = useState(null);
  const selectedCharacter = useSelectedCharacter();
  const dispatch = useCharactersDispatch();

  const handleClick = ({ nativeEvent: { offsetX, offsetY }, target }) => {
    const { zoom } = target.style;

    const x = offsetX / zoom;
    const y = offsetY / zoom;
    const coords = { x, y };

    fetchFound({ level, character: selectedCharacter, coords })
      .then(({ found }) => {
        if (found) {
          dispatch(characterFound(selectedCharacter));
        }
      })
      .catch(setError);
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
