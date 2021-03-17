import { createSlice, createSelector } from '@reduxjs/toolkit';

export const getSearchesInitalState = () => ({
  successes: {},
  failures: [],
});

const searchesSlice = createSlice({
  name: 'searches',
  initialState: getSearchesInitalState(),
  reducers: {
    characterFound: (state, action) => {
      const { character, coords } = action.payload;
      state.successes[character.id] = coords;
    },
    searchFailed: (state, action) => {
      state.failures.push(action.payload);
    },
  },
});

export default searchesSlice.reducer;

export const { characterFound, searchFailed } = searchesSlice.actions;

export const selectSuccessfulSearches = createSelector(
  (state) => state.searches.successes,
  (successes) => Object.values(successes)
);

export const selectFailedSearches = (state) => state.searches.failures;
