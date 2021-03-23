import { useSelector, useDispatch } from 'react-redux';
import { selectCharacters, selectCharactersFound } from './charactersSlice';

export const useCharacters = () => {
  return useSelector(selectCharacters);
};

export const useCharactersFound = () => {
  return useSelector(selectCharactersFound);
};

export const useCharactersDispatch = () => {
  return useDispatch();
};
