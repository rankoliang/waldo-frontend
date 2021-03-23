import { Navbar } from 'react-bulma-components';
import { NavLink } from 'react-router-dom';

const GameNavbar = () => {
  return (
    <Navbar color="dark" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        <Navbar.Item
          renderAs={NavLink}
          exact
          to="/"
          activeClassName="is-active"
        >
          Where's Waldo?
        </Navbar.Item>
      </Navbar.Brand>
    </Navbar>
  );
};

export default GameNavbar;
