import { useSelector, useDispatch } from 'react-redux';
import { selectCharactersNotFound } from '../features/characters/charactersSlice';
import { menuHidden, useMenu } from '../features/menu/menuSlice';
import { useZoom } from '../features/game/gameHooks';
import { searchForCharacter } from '../features/searches/searchesSlice';
import { selectLevel } from '../features/game/gameSlice';
import { Image } from 'react-bulma-components';

const CharacterSelectMenu = (setError) => {
  const dispatch = useDispatch();
  const level = useSelector(selectLevel);

  const zoom = useZoom();
  const undiscoveredCharacters = useSelector(selectCharactersNotFound);
  const menuStore = useMenu();
  const { state: menu } = menuStore;

  if (!menu.visible) return null;

  const {
    coords,
    coords: { x, y },
  } = menu;

  const createHandleOnClick = (character) => () => {
    dispatch(searchForCharacter({ level, coords, character, setError }));
    menuStore.dispatch(menuHidden());
  };

  if (undiscoveredCharacters.length === 0) return null;

  return (
    <div
      className="dropdown-content character-select-menu"
      style={{ top: y * zoom, left: x * zoom }}
    >
      {undiscoveredCharacters.map((character) => (
        <div
          className="dropdown-item"
          onClick={createHandleOnClick(character)}
          key={character.id}
        >
          <Image src={character.avatar_path} size={48} />
        </div>
      ))}
    </div>
  );
};

export default CharacterSelectMenu;
