import { Navbar } from 'react-bulma-components';
import { useRouteMatch, NavLink } from 'react-router-dom';

const GameNavbar = () => {
  const match = useRouteMatch({ path: '/levels/:levelId', exact: true });

  return (
    <Navbar color="dark" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        <Navbar.Item
          renderAs={NavLink}
          exact
          to="/"
          activeClassName="is-active"
        >
          <strong>Where's Waldo?</strong>
        </Navbar.Item>
        {match && (
          <Navbar.Item
            renderAs={NavLink}
            to={(location) => `${location.pathname}/leaderboard`}
            textColor="warning"
          >
            Leaderboard
          </Navbar.Item>
        )}
      </Navbar.Brand>
    </Navbar>
  );
};

export default GameNavbar;
