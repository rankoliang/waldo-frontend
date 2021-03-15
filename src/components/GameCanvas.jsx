import { useEffect, useState } from 'react';
import Level from './Level';
import { fetchLevels } from '../helpers';
import { Container, Hero, Heading } from 'react-bulma-components';
import 'react-bulma-components/dist/react-bulma-components.min.css';

const GameCanvas = () => {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchLevels()
      .then((levels) => {
        setLevels(levels);
        setLoading(false);
      })
      .catch(setError);
  }, []);

  if (error) {
    return (
      <Hero color="danger">
        <Hero.Body>
          <Container>
            <Heading>{error.status}</Heading>
            <Heading subtitle size={4}>
              {error.message}
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
    );
  } else {
    return levels
      .slice(0, 1)
      .map((level) => <Level level={level} loading={loading} key={level.id} />);
  }
};
export default GameCanvas;
