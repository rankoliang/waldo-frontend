import { useContext, createContext, useReducer } from 'react';
import charactersReducer, {
  getCharactersInitialState,
} from './charactersSlice';

const CharactersContext = createContext(null);

export const useCharactersStore = () => {
  const [state, dispatch] = useReducer(
    charactersReducer,
    getCharactersInitialState
  );

  return { state, dispatch };
};

export const useCharacters = () => {
  return useContext(CharactersContext).state.all;
};

export const useSelectedCharacter = () => {
  return useContext(CharactersContext).state.selected;
};

export const useCharactersDispatch = () => {
  return useContext(CharactersContext).dispatch;
};

export const useCharactersFound = () => {
  return useContext(CharactersContext).state.found;
};

export default CharactersContext;
