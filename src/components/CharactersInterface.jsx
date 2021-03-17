import { Navbar } from 'react-bulma-components';
import { characterSelected } from '../features/characters/charactersSlice';
import {
  useCharacters,
  useSelectedCharacter,
  useCharactersDispatch,
} from '../features/characters/CharactersContext';

const CharactersInterface = () => {
  const characters = useCharacters();
  const selectedCharacter = useSelectedCharacter();
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
          >
            {character.name}
          </Navbar.Item>
        ))}
      </Navbar.Brand>
    </Navbar>
  );
};

export default CharactersInterface;
