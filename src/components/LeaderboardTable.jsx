import { Table, Container, Pagination } from 'react-bulma-components';
import classNames from 'classnames';

const LeaderboardTable = ({ scores, page, pages, setPage, position }) => {
  return (
    <Container fluid>
      <Pagination
        className="leaderboard__pagination"
        current={page}
        total={pages}
        delta={5}
        onChange={setPage}
      ></Pagination>
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
            const rank = i + 1 + (page - 1) * 20;
            return (
              <tr
                key={i}
                className={classNames({ 'is-selected': rank == position })}
              >
                <th className="min">{rank}</th>
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
  );
};

export default LeaderboardTable;
