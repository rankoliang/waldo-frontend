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
import LoadingHandler from '../LoadingHandler';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './levels.module.css';

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

    const root = document.querySelector('.App');

    const handleResize = () => {
      root.style.minHeight = window.innerHeight + 'px';
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      root.style.minHeight = '';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { levels, loading, error };
};

const Levels = () => {
  const { levels, error, loading } = useLevels();

  return (
    <>
      <Container fluid>
        <LoadingHandler loading={loading}>
          <Columns className={`${styles.levelsColumns}`}>
            <ErrorBoundary error={error}>
              {levels.map((level) => (
                <Columns.Column
                  desktop={{ size: 'half' }}
                  className={styles.levelsColumnsItem}
                  key={level.id}
                >
                  <LevelCard level={level} />
                </Columns.Column>
              ))}
            </ErrorBoundary>
          </Columns>
        </LoadingHandler>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setLoading(false);
    };
    image.src = image_path;
  }, []);

  return (
    <Card>
      <Link to={`/levels/${id}`}>
        <LoadableImage src={image_path} alt={title} loading={loading} />
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

const LoadableImage = ({ loading, src, ...props }) => {
  if (loading) {
    return (
      <div className={`center-contents ${styles.spinnerWrapper}`}>
        <BeatLoader color="#D82229" size={40} />
      </div>
    );
  } else {
    return <Card.Image src={src} {...props} />;
  }
};

const ButtonLink = ({ children, ...props }) => {
  return (
    <Button renderAs={Link} {...props}>
      {children}
    </Button>
  );
};

export default Levels;
