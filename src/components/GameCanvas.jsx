import { useState } from 'react';
import { useSelector } from 'react-redux';
import ScrollableImage from './ScrollableImage';
import CharactersInterface from './CharactersInterface';
import ErrorBoundary from './ErrorBoundary';
import CharacterSelectMenu from './CharacterSelectMenu';
import MenuContext from '../features/menu/MenuContext';
import {
  menuHidden,
  menuShown,
  useMenuStore,
} from '../features/menu/menuSlice';
import { selectLevel } from '../features/game/gameSlice';

const GameCanvas = (props) => {
  const [error, setError] = useState(null);
  const level = useSelector(selectLevel);
  const { image_path } = level;
  const menuStore = useMenuStore();

  const handleClick = ({ nativeEvent: { offsetX: x, offsetY: y } }) => {
    if (menuStore.state.visible) {
      menuStore.dispatch(menuHidden());
    } else {
      menuStore.dispatch(menuShown({ coords: { x, y } }));
    }
  };

  return (
    <ErrorBoundary error={error}>
      <MenuContext.Provider value={menuStore}>
        <ScrollableImage
          src={image_path}
          alt="Find Waldo!"
          onClick={handleClick}
          {...props}
        >
          <CharacterSelectMenu setError={setError} />
        </ScrollableImage>
        <CharactersInterface />
      </MenuContext.Provider>
    </ErrorBoundary>
  );
};

export default GameCanvas;
