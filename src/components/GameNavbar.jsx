import { Navbar } from 'react-bulma-components';
import { Link } from 'react-router-dom';

const GameNavbar = () => {
  return (
    <Navbar color="dark" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        <Navbar.Item renderAs={Link} to="/">
          Home
        </Navbar.Item>
        <Navbar.Item>Leaderboard</Navbar.Item>
      </Navbar.Brand>
    </Navbar>
  );
};

export default GameNavbar;
