import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Hero,
  Heading,
  Table,
  Container,
  Button,
} from 'react-bulma-components';
import { fetchLeaderboard } from '../helpers';
import ErrorBoundary from './ErrorBoundary';
import LoadingHandler from './LoadingHandler';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const { levelId } = useParams();
  const [scores, setScores] = useState([]);
  const [level, setLevel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard(levelId)
      .then(({ level, scores }) => {
        setLevel(level);
        setScores(scores);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [levelId]);

  return (
    <ErrorBoundary error={error}>
      <LoadingHandler loading={loading}>
        <Hero
          className="leaderboard__title-background"
          style={{ backgroundImage: `url(${level?.image_path})` }}
        >
          <Hero.Body>
            <Container className="leaderboard__title">
              <Heading>{level?.title}</Heading>
              <Heading subtitle size={3}>
                Leaderboard
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
        <Button renderAs={Link} color="primary" to={`/levels/${levelId}`}>
          Play
        </Button>
        <Container fluid>
          <Table className="leaderboard">
            <thead>
              <tr>
                <th className="min">Rank</th>
                <th className="fill">Name</th>
                <th className="min">Time</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, i) => {
                return (
                  <tr key={i}>
                    <th className="min">{i + 1}</th>
                    <td className="fill">{score.name}</td>
                    <td className="min">
                      {(score.milliseconds / 1000).toFixed(2)} s
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </LoadingHandler>
    </ErrorBoundary>
  );
};

export default Leaderboard;
