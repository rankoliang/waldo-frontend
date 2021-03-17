import { Navbar } from 'react-bulma-components';
import { characterSelected } from '../features/characters/charactersSlice';
import {
  useCharacters,
  useSelectedCharacter,
  useCharactersDispatch,
  useCharactersFound,
} from '../features/characters/CharactersContext';

const CharactersInterface = () => {
  const characters = useCharacters();
  const selectedCharacter = useSelectedCharacter();
  const charactersFound = useCharactersFound();
  const dispatch = useCharactersDispatch();

  return (
    <Navbar color="dark" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        {characters.map((character) => (
          <Navbar.Item
            key={character.id}
            active={selectedCharacter === character}
            onClick={() => {
              dispatch(characterSelected(character));
            }}
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
