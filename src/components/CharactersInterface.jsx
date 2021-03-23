import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from 'react-bulma-components';
import TimerMessage from './TimerMessage';
import {
  useCharacters,
  useCharactersFound,
} from '../features/characters/CharactersHooks';
import {
  selectStartTime,
  selectTotalMilliseconds,
} from '../features/game/gameSlice';

const CharactersInterface = () => {
  const characters = useCharacters();
  const charactersFound = useCharactersFound();
  const startTime = useSelector(selectStartTime);
  const totalMilliseconds = useSelector(selectTotalMilliseconds);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!totalMilliseconds) {
      setTimeout(() => {
        setTimeElapsed(Math.round((new Date() - startTime) / 1000));
      }, 1000);
    } else {
      setTimeElapsed(totalMilliseconds);
    }
  }, [totalMilliseconds, timeElapsed, startTime]);

  return (
    <Navbar color="dark" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        <Navbar.Item renderAs="div">
          <TimerMessage />
        </Navbar.Item>
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
