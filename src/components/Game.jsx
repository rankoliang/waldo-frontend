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
    (async () => {
      try {
        const levels = await fetchLevels();

        if (levels.length >= 1) {
          setLevel(levels[0]);

          const characters = await fetchLevelCharacters(levels[0]);

          setCharacters(characters);
        } else {
          setErrors({ status: '404', message: 'No levels found' });
        }
      } catch (error) {
        setErrors((state) => ({ ...state, [error.field]: error }));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <GameNavbar characters={characters} />
      <GameCanvas level={level} loading={loading} errors={errors} />
    </>
  );
};

export default Game;
