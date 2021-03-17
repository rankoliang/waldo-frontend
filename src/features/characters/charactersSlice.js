import { createSlice } from '@reduxjs/toolkit';

export const getCharactersInitialState = () => ({
  all: [],
  selected: null,
  found: {},
});

const charactersSlice = createSlice({
  name: 'characters',
  initialState: getCharactersInitialState(),
  reducers: {
    charactersSet: (state, action) => {
      state.all = action.payload;
      state.selected = state.all.length >= 1 ? state.all[0] : null;
      state.found = initialFound(state.all);
    },
    characterSelected: (state, action) => {
      state.selected = action.payload;
    },
    characterFound: (state, action) => {
      state.found[action.payload.id] = true;
    },
  },
});

export default charactersSlice.reducer;

export const {
  charactersSet,
  characterSelected,
  characterFound,
} = charactersSlice.actions;

const initialFound = (characters) => {
  return Object.fromEntries(
    characters.map((character) => [character.id, false])
  );
};
