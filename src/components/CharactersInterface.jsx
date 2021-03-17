import { Navbar } from 'react-bulma-components';

const CharactersInterface = ({ characters = [] }) => {
  return (
    <Navbar color="dark" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        {characters.map(({ id, name }) => (
          <Navbar.Item renderAs="div" key={id}>
            {name}
          </Navbar.Item>
        ))}
      </Navbar.Brand>
    </Navbar>
  );
};

export default CharactersInterface;
