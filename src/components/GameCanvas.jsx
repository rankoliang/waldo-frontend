import { useReducer, useState } from 'react';
import ScrollableImage from './ScrollableImage';
import CharactersInterface from './CharactersInterface';
import ErrorBoundary from './ErrorBoundary';
import CharacterSelectMenu from './CharacterSelectMenu';

const menuShown = ({ coords }) => {
  return { type: 'menu/show', payload: { coords } };
};

const menuHidden = () => {
  return { type: 'menu/hide' };
};

const menuReducer = (state, action) => {
  switch (action.type) {
    case 'menu/show':
      const { coords } = action.payload;
      return { ...state, coords, visible: true };
    case 'menu/hide':
      return { ...state, coordinates: null, visible: false };
    default:
      return state;
  }
};

const GameCanvas = ({ level, level: { image_path }, ...props }) => {
  const [error, setError] = useState(null);
  const [menu, menuDispatch] = useReducer(menuReducer, {
    visible: false,
    coordinates: null,
  });

  const handleClick = ({ nativeEvent: { offsetX: x, offsetY: y } }) => {
    if (menu.visible) {
      menuDispatch(menuHidden());
    } else {
      menuDispatch(menuShown({ coords: { x, y } }));
    }
  };

  return (
    <ErrorBoundary error={error}>
      <ScrollableImage
        src={image_path}
        alt="Find Waldo!"
        onClick={handleClick}
        {...props}
      >
        <CharacterSelectMenu menu={menu} />
      </ScrollableImage>
      <CharactersInterface />
    </ErrorBoundary>
  );
};

export default GameCanvas;
