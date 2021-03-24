import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Hero, Heading, Container, Button } from 'react-bulma-components';
import { fetchLeaderboard } from '../helpers';
import ErrorBoundary from './ErrorBoundary';
import LoadingHandler from './LoadingHandler';
import { Link } from 'react-router-dom';
import LeaderboardTable from './LeaderboardTable';

const Leaderboard = ({ initialPage = 1 }) => {
  const { levelId } = useParams();
  const [scores, setScores] = useState([]);
  const [level, setLevel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setLeaderboardLoading(true);

    fetchLeaderboard(levelId, page)
      .then(({ level, scores, pages }) => {
        setLevel(level);
        setScores(scores);
        setPages(pages);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
        setLeaderboardLoading(false);
      });
  }, [levelId, page]);

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
        <LoadingHandler loading={leaderboardLoading}>
          <LeaderboardTable
            scores={scores}
            page={page}
            pages={pages}
            setPage={setPage}
          />
        </LoadingHandler>
      </LoadingHandler>
    </ErrorBoundary>
  );
};

export default Leaderboard;
