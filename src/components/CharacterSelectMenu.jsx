import { useSelector } from 'react-redux';
import { selectCharactersNotFound } from '../features/characters/charactersSlice';

const CharacterSelectMenu = ({ menu }) => {
  const undiscoveredCharacters = useSelector(selectCharactersNotFound);

  if (!menu.visible) return null;

  const {
    coords: { x, y },
  } = menu;

  return (
    <div className="character-select-menu" style={{ top: y, left: x }}>
      {undiscoveredCharacters.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
};

export default CharacterSelectMenu;
