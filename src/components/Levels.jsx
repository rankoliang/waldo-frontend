import { Button, Card, Container } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchLevels } from '../helpers';
import ErrorBoundary from './ErrorBoundary';

const useLevels = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    fetchLevels()
      .then(setLevels)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { levels, loading, error };
};

const Levels = () => {
  const { levels, loading, error } = useLevels();

  return (
    <Container>
      <ErrorBoundary error={error}>
        {levels.map((level) => (
          <LevelCard level={level} key={level.id} />
        ))}
      </ErrorBoundary>
    </Container>
  );
};

const LevelCard = ({ level: { image_path, title } }) => {
  return (
    <Card>
      <Card.Image src={image_path}></Card.Image>
      <Card.Header>
        <Card.Header.Title className="is-centered">{title}</Card.Header.Title>
      </Card.Header>
      <Card.Footer>
        <Card.Footer.Item renderAs={ButtonLink} color="primary" to="/level">
          Play
        </Card.Footer.Item>
      </Card.Footer>
    </Card>
  );
};

const ButtonLink = ({ children, ...props }) => {
  return (
    <Button renderAs={Link} {...props}>
      {children}
    </Button>
  );
};

export default Levels;
