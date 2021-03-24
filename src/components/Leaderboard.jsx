import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading } from 'react-bulma-components';
import { fetchLeaderboard, fetchLevel } from '../helpers';
import ErrorBoundary from './ErrorBoundary';
import LoadingHandler from './LoadingHandler';

const Leaderboard = () => {
  const { levelId } = useParams();
  const [scores, setScores] = useState([]);
  const [level, setLevel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLevel(levelId)
      .then(({ level }) => {
        setLevel(level);
        return level;
      })
      .then((level) => fetchLeaderboard(level.id))
      .then(setScores)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [levelId]);

  return (
    <ErrorBoundary error={error}>
      <LoadingHandler loading={loading}>
        <Heading>{level?.title} Leaderboard</Heading>
        {scores.map((score, i) => {
          return (
            <div key={i}>
              {score.name} - {score.milliseconds / 1000}s
            </div>
          );
        })}
      </LoadingHandler>
    </ErrorBoundary>
  );
};

export default Leaderboard;
