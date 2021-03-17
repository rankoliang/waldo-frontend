import GameCanvas from './GameCanvas';
import ErrorBoundary from './ErrorBoundary';
import { useEffect, useState } from 'react';
import { fetchLevels, fetchLevelCharacters, ResponseError } from '../helpers';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import CharactersInterface from './CharactersInterface';

const Game = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [level, setLevel] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const levels = await fetchLevels();

        if (levels.length >= 1) {
          setLevel(levels[0]);

          const characters = await fetchLevelCharacters(levels[0]);

          setCharacters(characters);
        } else {
          setError(
            new ResponseError({ status: 404, statusText: 'No levels found' })
          );
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <ErrorBoundary error={error}>
        <GameCanvas level={level} loading={loading} />
        <CharactersInterface characters={characters} />
      </ErrorBoundary>
    </>
  );
};

export default Game;
