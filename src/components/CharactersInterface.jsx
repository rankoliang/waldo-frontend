import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from 'react-bulma-components';
import TimerMessage from './TimerMessage';
import { selectPhase, gameMagnified } from '../features/game/gameSlice';
import {
  useCharacters,
  useCharactersFound,
} from '../features/characters/CharactersHooks';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';

const CharactersInterface = ({ setModalShow }) => {
  const dispatch = useDispatch();
  const characters = useCharacters();
  const charactersFound = useCharactersFound();
  const gamePhase = useSelector(selectPhase);

  return (
    <Navbar
      style={{ overflow: 'auto' }}
      color="dark"
      role="navigation"
      aria-label="main navigation"
    >
      <Navbar.Brand>
        <TimerMessage setModalShow={setModalShow} />
        <Navbar.Item
          onClick={() => {
            dispatch(gameMagnified(1.25));
          }}
        >
          <AiOutlineZoomIn style={{ fontSize: '1.5rem' }} />
        </Navbar.Item>
        <Navbar.Item
          onClick={() => {
            dispatch(gameMagnified(0.8));
          }}
        >
          <AiOutlineZoomOut style={{ fontSize: '1.5rem' }} />
        </Navbar.Item>
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
