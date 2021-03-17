import { useDispatch } from 'react-redux';
import { fetchLevel, fetchLevelCharacters } from '../helpers';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCanvas from './GameCanvas';
import ErrorBoundary from './ErrorBoundary';
import LoadingHandler from './LoadingHandler';
import { charactersSet } from '../features/characters/charactersSlice';

const Level = () => {
  const { levelId } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [level, setLevel] = useState(null);

  useEffect(() => {
    fetchLevel(levelId)
      .then(({ level }) => {
        setLevel(level);
        return level;
      })
      .then(fetchLevelCharacters)
      .then((characters) => {
        dispatch(charactersSet(characters));
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [levelId, dispatch]);

  return (
    <ErrorBoundary error={error}>
      <LoadingHandler loading={loading}>
        <GameCanvas level={level} />
      </LoadingHandler>
    </ErrorBoundary>
  );
};

export default Level;
export { Level };
