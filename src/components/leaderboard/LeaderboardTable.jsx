import { Table, Container, Pagination } from 'react-bulma-components';
import classNames from 'classnames';
import styles from './leaderboard.module.css';

const LeaderboardTable = ({ scores, page, pages, setPage, position }) => {
  return (
    <Container fluid>
      <Pagination
        className={styles.leaderboard__pagination}
        current={page}
        total={pages}
        delta={5}
        onChange={setPage}
      ></Pagination>
      <Table className="mb-4">
        <thead>
          <tr>
            <th className={styles.min}>Rank</th>
            <th className={styles.fill}>Name</th>
            <th className={styles.min}>Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, i) => {
            const rank = i + 1 + (page - 1) * 20;
            return (
              <tr
                key={i}
                className={classNames({
                  'is-selected': rank === Number(position),
                })}
              >
                <th className={styles.min}>{rank}</th>
                <td className={styles.fill}>{score.name}</td>
                <td className={styles.min}>
                  {(score.milliseconds / 1000).toFixed(2)} s
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default LeaderboardTable;
