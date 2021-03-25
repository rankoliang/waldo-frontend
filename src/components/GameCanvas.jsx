import { useState, useEffect } from 'react';
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
import { selectLevel, selectPhase } from '../features/game/gameSlice';
import { SuccessMarkers } from './SuccessMarker';
import { FailureMarkers } from './FailureMarker';
import WinningForm from './WinningForm';

const GameCanvas = (props) => {
  const [error, setError] = useState(null);
  const level = useSelector(selectLevel);
  const { image_path } = level;
  const menuStore = useMenuStore();
  const [modalShow, setModalShow] = useState(false);
  const gamePhase = useSelector(selectPhase);

  const handleClick = ({ nativeEvent: { offsetX: x, offsetY: y } }) => {
    if (menuStore.state.visible) {
      menuStore.dispatch(menuHidden());
    } else {
      menuStore.dispatch(menuShown({ coords: { x, y } }));
    }
  };

  useEffect(() => {
    if (gamePhase === 'ended') {
      setModalShow(true);
    }
  }, [gamePhase]);

  return (
    <ErrorBoundary error={error}>
      <MenuContext.Provider value={menuStore}>
        <ScrollableImage
          src={image_path}
          alt="Find Waldo!"
          onClick={handleClick}
          {...props}
        >
          <SuccessMarkers />
          <FailureMarkers />
          <CharacterSelectMenu setError={setError} />
        </ScrollableImage>
        <CharactersInterface setModalShow={setModalShow} />
      </MenuContext.Provider>
      <WinningForm show={modalShow} setModalShow={setModalShow} />
    </ErrorBoundary>
  );
};

export default GameCanvas;
