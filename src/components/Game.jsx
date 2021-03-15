import GameNavbar from './GameNavbar';
import GameCanvas from './GameCanvas';
import { useEffect, useState } from 'react';
import { fetchLevels, fetchLevelCharacters } from '../helpers';
import 'react-bulma-components/dist/react-bulma-components.min.css';

const Game = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ canvas: null, navbar: null });
  const [level, setLevel] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchLevels()
      .then((levels) => {
        if (levels.length >= 1) {
          setLevel(levels[0]);
        } else {
          setError({ status: '404', message: 'No levels found' });
        }
      })
      .catch((error) => setError((state) => ({ ...state, canvas: error })))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (level) {
      fetchLevelCharacters(level)
        .then(setCharacters)
        .catch((error) => setError((state) => ({ ...state, navbar: error })));
    }
  }, [level]);

  return (
    <>
      <GameNavbar characters={characters} />
      <GameCanvas level={level} loading={loading} error={error.canvas} />
    </>
  );
};

export default Game;
