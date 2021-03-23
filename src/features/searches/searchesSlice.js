import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {
  characterFound,
  selectCharactersFound,
  selectCharactersNotFound,
} from '../../features/characters/charactersSlice';
import { gameEnded } from '../../features/game/gameSlice';
import { fetchFound } from '../../helpers';

export const searchForCharacter = createAsyncThunk(
  'searchForCharacterStatus',
  async ({ level, coords, setError, character }, { getState, dispatch }) => {
    if (selectCharactersFound(getState())[character.id]) return;

    fetchFound({ level, character, coords })
      .then(({ found }) => {
        if (found) {
          dispatch(characterFound(character));
          dispatch(searchSuccessful({ character, coords }));
          handleTurnEnd({ getState, dispatch });
        } else {
          dispatch(searchFailed(coords));
        }
      })
      .catch(setError);
  }
);

export const getSearchesInitalState = () => ({
  successes: {},
  failures: [],
  error: null,
});

const searchesSlice = createSlice({
  name: 'searches',
  initialState: getSearchesInitalState(),
  reducers: {
    searchSuccessful: (state, action) => {
      const { character, coords } = action.payload;
      state.successes[character.id] = coords;
    },
    searchFailed: (state, action) => {
      state.failures.push(action.payload);
    },
  },
});

export default searchesSlice.reducer;

export const { searchSuccessful, searchFailed } = searchesSlice.actions;

export const selectSuccessfulSearches = createSelector(
  (state) => state.searches.successes,
  (successes) => Object.values(successes)
);

export const selectFailedSearches = (state) => state.searches.failures;

// private

const handleTurnEnd = ({ getState, dispatch }) => {
  if (selectCharactersNotFound(getState()).length === 0) {
    dispatch(gameEnded());
  }
};
