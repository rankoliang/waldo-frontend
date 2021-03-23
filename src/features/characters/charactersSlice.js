import { createSlice, createSelector } from '@reduxjs/toolkit';

export const getCharactersInitialState = () => ({
  all: [],
  found: {},
});

const charactersSlice = createSlice({
  name: 'characters',
  initialState: getCharactersInitialState(),
  reducers: {
    charactersSet: (state, action) => {
      state.all = action.payload;
      state.found = initialFound(state.all);
    },
    characterFound: (state, action) => {
      state.found[action.payload.id] = true;
    },
    charactersReset: getCharactersInitialState,
  },
});

export default charactersSlice.reducer;

export const {
  charactersSet,
  characterSelected,
  characterFound,
  charactersReset,
} = charactersSlice.actions;

export const selectCharacters = (state) => state.characters.all;

export const selectCharactersFound = (state) => state.characters.found;

export const selectCharactersNotFound = createSelector(
  selectCharacters,
  selectCharactersFound,
  (characters, foundCharacters) =>
    characters.filter((character) => !foundCharacters[character.id])
);

const initialFound = (characters) => {
  return Object.fromEntries(
    characters.map((character) => [character.id, false])
  );
};
