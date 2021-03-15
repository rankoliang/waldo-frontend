import GameNavbar from './GameNavbar';
import GameCanvas from './GameCanvas';
import { useEffect, useState } from 'react';
import { fetchLevels, fetchLevelCharacters } from '../helpers';
import 'react-bulma-components/dist/react-bulma-components.min.css';

const Game = () => {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ levels: null, characters: null });
  const [level, setLevel] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchLevels()
      .then((levels) => {
        if (levels.length >= 1) {
          setLevel(levels[0]);
        } else {
          setErrors({ status: '404', message: 'No levels found' });
        }
      })
      .catch((error) => setErrors((state) => ({ ...state, levels: error })))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (level) {
      fetchLevelCharacters(level)
        .then(setCharacters)
        .catch((error) =>
          setErrors((state) => ({ ...state, characters: error }))
        );
    }
  }, [level]);

  return (
    <>
      <GameNavbar characters={characters} />
      <GameCanvas level={level} loading={loading} errors={errors} />
    </>
  );
};

export default Game;
