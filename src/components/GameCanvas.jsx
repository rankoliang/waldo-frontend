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
  const [successes, setSuccesses] = useState([]);
  const [failures, setFailures] = useState([]);
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
          setSuccesses([...successes, { x, y }]);
        } else {
          setFailures([...failures, { x, y }]);
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
        successes={successes}
        failures={failures}
        {...props}
      ></ScrollableImage>
      <CharactersInterface />
    </ErrorBoundary>
  );
};

export default GameCanvas;
