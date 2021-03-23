import { useReducer, useContext } from 'react';
import MenuContext from './MenuContext';

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

export default menuReducer;

export const menuShown = ({ coords }) => {
  return { type: 'menu/show', payload: { coords } };
};

export const menuHidden = () => {
  return { type: 'menu/hide' };
};

export const useMenuStore = () => {
  const [state, dispatch] = useReducer(menuReducer, {
    visible: false,
    coordinates: null,
  });

  return { state, dispatch };
};

export const useMenu = () => {
  return useContext(MenuContext);
};
