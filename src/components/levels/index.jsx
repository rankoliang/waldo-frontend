import { useEffect, useState } from 'react';
import { Container, Columns, Footer, Content } from 'react-bulma-components';
import { fetchLevels } from '../../helpers';
import ErrorBoundary from '../ErrorBoundary';
import LoadingHandler from '../LoadingHandler';
import styles from './levels.module.css';
import LevelCard from './LevelCard';

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
                Made by{' '}
                <a href="https://github.com/rankoliang/waldo-frontend">
                  Ranko Liang
                </a>
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

export default Levels;
