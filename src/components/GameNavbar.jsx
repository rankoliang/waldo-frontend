import { Navbar } from 'react-bulma-components';

const GameNavbar = () => {
  return (
    <Navbar
      color="light"
      role="navigation"
      aria-label="main navigation"
    >
      <Navbar.Brand>
        <Navbar.Item renderAs="div">Waldo</Navbar.Item>
        <Navbar.Item renderAs="div">Wizard</Navbar.Item>
        <Navbar.Item renderAs="div">Wilma</Navbar.Item>
        <Navbar.Item>Leaderboard</Navbar.Item>
      </Navbar.Brand>
    </Navbar>
  );
};

export default GameNavbar;
