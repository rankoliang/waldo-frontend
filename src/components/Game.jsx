import GameCanvas from './GameCanvas';
import ErrorBoundary from './ErrorBoundary';
import { useEffect, useState } from 'react';
import { fetchLevels, fetchLevelCharacters, ResponseError } from '../helpers';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Navbar } from 'react-bulma-components';

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
        <Characters characters={characters} />
      </ErrorBoundary>
    </>
  );
};

const Characters = ({ characters = [] }) => {
  return (
    <Navbar color="dark" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        {characters.map(({ id, name }) => (
          <Navbar.Item renderAs="div" key={id}>
            {name}
          </Navbar.Item>
        ))}
      </Navbar.Brand>
    </Navbar>
  );
};

export default Game;
