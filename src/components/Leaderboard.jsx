import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Hero, Heading, Container, Button } from 'react-bulma-components';
import { fetchLeaderboard } from '../helpers';
import ErrorBoundary from './ErrorBoundary';
import LoadingHandler from './LoadingHandler';
import { Link } from 'react-router-dom';
import LeaderboardTable from './LeaderboardTable';

const Leaderboard = () => {
  const { levelId } = useParams();
  const position =
    new URLSearchParams(useLocation().search).get('position') || null;
  const [scores, setScores] = useState([]);
  const [level, setLevel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [page, setPage] = useState(position ? Math.ceil(position / 20) : 1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const lbtimeout = setTimeout(() => {
      setLeaderboardLoading(true);
    },50);

    fetchLeaderboard(levelId, page)
      .then(({ level, scores, pages }) => {
        setLevel(level);
        setScores(scores);
        setPages(pages);
        if (page > pages) {
          setPage(pages);
        }
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
        clearTimeout(lbtimeout)
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
            position={position}
          />
        </LoadingHandler>
      </LoadingHandler>
    </ErrorBoundary>
  );
};

export default Leaderboard;
