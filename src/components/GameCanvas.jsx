import Level from './Level';
import { Container, Hero, Heading } from 'react-bulma-components';
import { Progress } from 'react-bulma-components';
import 'react-bulma-components/dist/react-bulma-components.min.css';

const GameCanvas = ({ level, loading, error }) => {
  if (loading) {
    return <Progress />;
  } else if (error) {
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
    return <Level level={level} />;
  }
};
export default GameCanvas;
