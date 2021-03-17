import { Navbar } from 'react-bulma-components';

const CharactersInterface = ({
  characters = [],
  selectCharacter,
  selectedCharacter,
}) => {
  return (
    <Navbar color="dark" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        {characters.map((character) => (
          <Navbar.Item
            key={character.id}
            active={selectedCharacter === character}
            onClick={() => {
              selectCharacter(character);
            }}
          >
            {character.name}
          </Navbar.Item>
        ))}
      </Navbar.Brand>
    </Navbar>
  );
};

export default CharactersInterface;
