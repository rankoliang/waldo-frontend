import { Table, Container, Pagination } from 'react-bulma-components';

const LeaderboardTable = ({ scores, page, pages, setPage }) => {
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
            return (
              <tr key={i}>
                <th className="min">{i + 1 + (page - 1) * 20}</th>
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
