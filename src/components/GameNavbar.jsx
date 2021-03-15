import { Navbar } from 'react-bulma-components';

const GameNavbar = ({ characters = [] }) => {
  return (
    <Navbar color="light" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        {characters.map(({ id, name }) => (
          <Navbar.Item renderAs="div" key={id}>
            {name}
          </Navbar.Item>
        ))}
        <Navbar.Item>Leaderboard</Navbar.Item>
      </Navbar.Brand>
    </Navbar>
  );
};

export default GameNavbar;
