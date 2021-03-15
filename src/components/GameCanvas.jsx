import Level from './Level';
import { Container, Hero, Heading } from 'react-bulma-components';
import { Progress } from 'react-bulma-components';
import 'react-bulma-components/dist/react-bulma-components.min.css';

const GameCanvas = ({ level, loading, errors }) => {
  if (loading) {
    return <Progress />;
  } else if (errors.levels) {
    return (
      <Hero color="danger">
        <Hero.Body>
          <Container>
            <Heading>{errors.levels.status}</Heading>
            <Heading subtitle size={4}>
              {errors.levels.message}
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
