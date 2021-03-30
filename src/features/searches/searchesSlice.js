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
import {
  gameEnded,
  tokenSet,
  selectToken,
  durationSet,
} from '../../features/game/gameSlice';
import { fetchFound } from '../../helpers';

export const searchForCharacter = createAsyncThunk(
  'searchForCharacterStatus',
  async ({ level, coords, setError, character }, { getState, dispatch }) => {
    if (selectCharactersFound(getState())[character.id]) return;
    const token = selectToken(getState());

    fetchFound({ level, character, coords, token })
      .then(({ found, token, duration }) => {
        if (found) {
          dispatch(characterFound(character));
          dispatch(searchSuccessful({ character, coords }));
          dispatch(tokenSet({ token }));
          if (duration) {
            dispatch(durationSet({ duration }));
          }
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
    searchesReset: getSearchesInitalState,
  },
});

export default searchesSlice.reducer;

export const {
  searchSuccessful,
  searchFailed,
  searchesReset,
} = searchesSlice.actions;

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
