import { fetchLevel, fetchLevelCharacters } from '../helpers';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCanvas from './GameCanvas';
import ErrorBoundary from './ErrorBoundary';
import LoadingHandler from './LoadingHandler';
import CharactersContext, {
  useCharactersStore,
} from '../features/characters/CharactersContext';
import { charactersSet } from '../features/characters/charactersSlice';

const Level = () => {
  const { levelId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [level, setLevel] = useState(null);
  const charactersStore = useCharactersStore();
  const { dispatch } = charactersStore;

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
        <CharactersContext.Provider value={charactersStore}>
          <GameCanvas level={level} />
        </CharactersContext.Provider>
      </LoadingHandler>
    </ErrorBoundary>
  );
};

export default Level;
export { Level };
