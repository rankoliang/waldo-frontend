import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading } from 'react-bulma-components';
import { fetchLeaderboard } from '../helpers';
import ErrorBoundary from './ErrorBoundary';
import LoadingHandler from './LoadingHandler';

const Leaderboard = () => {
  const { levelId } = useParams();
  const [scores, setScores] = useState([]);
  const [title, setTitle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard(levelId)
      .then(({ title, scores }) => {
        setTitle(title);
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
        <Heading>{title} Leaderboard</Heading>
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
