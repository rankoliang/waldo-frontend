import { useSelector, useDispatch } from 'react-redux';
import {
  selectCharacters,
  selectCharacterSelected,
  selectCharactersFound,
} from './charactersSlice';

export const useCharacters = () => {
  return useSelector(selectCharacters);
};

export const useSelectedCharacter = () => {
  return useSelector(selectCharacterSelected);
};

export const useCharactersFound = () => {
  return useSelector(selectCharactersFound);
};

export const useCharactersDispatch = () => {
  return useDispatch();
};
