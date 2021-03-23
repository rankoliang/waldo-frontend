import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from 'react-bulma-components';
import {
  useCharacters,
  useCharactersFound,
} from '../features/characters/CharactersHooks';
import { selectStartTime } from '../features/game/gameSlice';

const CharactersInterface = () => {
  const characters = useCharacters();
  const charactersFound = useCharactersFound();
  const startTime = useSelector(selectStartTime);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeElapsed(Math.round((new Date() - startTime) / 1000));
    }, 995);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Navbar color="dark" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        <Navbar.Item renderAs="div">{timeElapsed} s</Navbar.Item>
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
