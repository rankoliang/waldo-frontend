import { Navbar } from 'react-bulma-components';
import {
  useCharacters,
  useCharactersFound,
} from '../features/characters/CharactersHooks';

const CharactersInterface = () => {
  const characters = useCharacters();
  const charactersFound = useCharactersFound();

  return (
    <Navbar color="dark" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        {characters.map((character) => (
          <Navbar.Item
            renderAs="div"
            key={character.id}
            textColor={charactersFound[character.id] ? 'danger' : null}
          >
            {character.name}
          </Navbar.Item>
        ))}
      </Navbar.Brand>
    </Navbar>
  );
};

export default CharactersInterface;
