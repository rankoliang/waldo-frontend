import {
  Button,
  Card,
  Container,
  Columns,
  Footer,
  Content,
} from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchLevels } from '../../helpers';
import ErrorBoundary from '../ErrorBoundary';

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
  const { levels, error } = useLevels();

  return (
    <>
      <Container>
        <Columns breakpoint="desktop" className="m-4">
          <ErrorBoundary error={error}>
            {levels.map((level) => (
              <Columns.Column desktop={{ size: 'half' }} key={level.id}>
                <LevelCard level={level} />
              </Columns.Column>
            ))}
          </ErrorBoundary>
        </Columns>
      </Container>
      <Footer className="mt-4">
        <Container>
          <Content style={{ textAlign: 'center' }}>
            <div>
              <p>
                Made by <a href="https://github.com/rankoliang/">Ranko Liang</a>
                .
              </p>
              <p>
                <strong>Not an official Where's Waldo website.</strong>
              </p>
            </div>
          </Content>
        </Container>
      </Footer>
    </>
  );
};

const LevelCard = ({ level: { id, title, image_path } }) => {
  return (
    <Card>
      <Link to={`/levels/${id}`}>
        <Card.Image src={image_path} className="level-card__thumbnail" />
      </Link>
      <Card.Header>
        <Card.Header.Title className="is-centered">{title}</Card.Header.Title>
      </Card.Header>
      <Card.Footer>
        <Card.Footer.Item
          renderAs={ButtonLink}
          color="primary"
          to={`/levels/${id}`}
        >
          Play
        </Card.Footer.Item>
        <Card.Footer.Item
          renderAs={ButtonLink}
          to={`/levels/${id}/leaderboard`}
        >
          Leaderboard
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
