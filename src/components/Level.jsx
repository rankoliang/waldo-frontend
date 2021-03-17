import { fetchLevel, fetchLevelCharacters } from '../helpers';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCanvas from './GameCanvas';
import ErrorBoundary from './ErrorBoundary';
import LoadingHandler from './LoadingHandler';

const Level = () => {
  const { levelId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [level, setLevel] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchLevel(levelId)
      .then(({ level }) => {
        setLevel(level);
        return level;
      })
      .then(fetchLevelCharacters)
      .then(setCharacters)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ErrorBoundary error={error}>
      <LoadingHandler loading={loading}>
        <GameCanvas level={level} characters={characters} />
      </LoadingHandler>
    </ErrorBoundary>
  );
};

export default Level;
export { Level };
