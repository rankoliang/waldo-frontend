import { Component } from 'react';
import GameNavbar from './GameNavbar';
import GameCanvas from './GameCanvas';
import { useEffect, useState } from 'react';
import { fetchLevels, fetchLevelCharacters, ResponseError } from '../helpers';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Hero, Heading } from 'react-bulma-components';

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
      <GameNavbar characters={characters} />
      <ErrorBoundary error={error}>
        <GameCanvas level={level} loading={loading} />
      </ErrorBoundary>
    </>
  );
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.error) {
      return (
        <>
          <Hero color="danger">
            <Hero.Body>
              <Container>
                <Heading>{this.props.error.code}</Heading>
                <Heading subtitle size={4}>
                  {this.props.error.message}
                </Heading>
              </Container>
            </Hero.Body>
          </Hero>
        </>
      );
    }

    return this.props.children;
  }
}

export default Game;
