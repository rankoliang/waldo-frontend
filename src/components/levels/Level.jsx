import { useDispatch } from 'react-redux';
import { fetchLevel } from '../../helpers';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCanvas from './GameCanvas';
import ErrorBoundary from '../ErrorBoundary';
import LoadingHandler from '../LoadingHandler';
import { charactersSet } from '../../features/characters/charactersSlice';
import { levelSet, gameStarted, tokenSet } from '../../features/game/gameSlice';

const Level = () => {
  const { levelId } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(gameStarted());

    const root = document.querySelector('.App');

    const handleResize = () => {
      root.style.height = window.innerHeight + 'px';
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      root.style.height = 'initial';
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    fetchLevel(levelId)
      .then(({ characters, token, ...level }) => {
        dispatch(levelSet(level));
        dispatch(charactersSet(characters));
        dispatch(tokenSet({ token }));
        return level;
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [levelId, dispatch]);

  return (
    <ErrorBoundary error={error}>
      <LoadingHandler loading={loading}>
        <GameCanvas />
      </LoadingHandler>
    </ErrorBoundary>
  );
};

export default Level;
export { Level };
