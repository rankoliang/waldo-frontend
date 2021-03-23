import { useSelector, useDispatch } from 'react-redux';
import { selectCharactersNotFound } from '../features/characters/charactersSlice';
import { menuHidden, useMenu } from '../features/menu/menuSlice';
import { useZoom } from '../features/game/gameHooks';
import { searchForCharacter } from '../features/searches/searchesSlice';
import { selectLevel } from '../features/game/gameSlice';

const CharacterSelectMenu = (setError) => {
  const dispatch = useDispatch();
  const level = useSelector(selectLevel);

  const zoom = useZoom();
  const undiscoveredCharacters = useSelector(selectCharactersNotFound);
  const menuStore = useMenu();
  const { state: menu } = menuStore;

  if (!menu.visible) return null;

  const {
    coords: { x, y },
  } = menu;

  const createHandleOnClick = (character) => () => {
    const coords = { x: x / zoom, y: y / zoom };

    dispatch(searchForCharacter({ level, coords, character, setError }));
    menuStore.dispatch(menuHidden());
  };

  return (
    <div
      className="dropdown-content character-select-menu"
      style={{ top: y, left: x }}
    >
      {undiscoveredCharacters.map((character) => (
        <div
          className="dropdown-item"
          onClick={createHandleOnClick(character)}
          key={character.id}
        >
          {character.name}
        </div>
      ))}
    </div>
  );
};

export default CharacterSelectMenu;
