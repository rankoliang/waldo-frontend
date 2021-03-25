import { useSelector } from 'react-redux';
import { Navbar } from 'react-bulma-components';
import TimerMessage from './TimerMessage';
import { selectPhase } from '../features/game/gameSlice';
import {
  useCharacters,
  useCharactersFound,
} from '../features/characters/CharactersHooks';

const CharactersInterface = ({ setModalShow }) => {
  const characters = useCharacters();
  const charactersFound = useCharactersFound();
  const gamePhase = useSelector(selectPhase);

  return (
    <Navbar color="dark" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        <TimerMessage setModalShow={setModalShow} />
        {gamePhase !== 'ended' &&
          characters.map((character) => (
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
