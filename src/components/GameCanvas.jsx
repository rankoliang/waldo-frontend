import { useState } from 'react';
import ScrollableImage from './ScrollableImage';
import CharactersInterface from './CharactersInterface';
import { fetchFound } from '../helpers';
import ErrorBoundary from './ErrorBoundary';

const GameCanvas = ({
  level,
  level: { image_path },
  characters = [],
  ...props
}) => {
  const [error, setError] = useState(null);
  const [selectedCharacter, selectCharacter] = useState(characters[0]);

  const handleClick = ({ nativeEvent: { offsetX, offsetY }, target }) => {
    const { zoom } = target.style;

    const x = offsetX / zoom;
    const y = offsetY / zoom;
    const coords = { x, y };

    fetchFound({ level, character: selectedCharacter, coords })
      .then(({ found }) => {
        console.log({ character: selectedCharacter.name, found });
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
      <CharactersInterface
        selectedCharacter={selectedCharacter}
        characters={characters}
        selectCharacter={selectCharacter}
      />
    </ErrorBoundary>
  );
};

export default GameCanvas;
