import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {
  characterFound,
  selectCharacterSelected,
} from '../../features/characters/charactersSlice';
import { fetchFound } from '../../helpers';

export const searchForSelectedCharacter = createAsyncThunk(
  'searchForSelectedCharacterStatus',
  async ({ level, coords, setError }, { getState, dispatch }) => {
    const character = selectCharacterSelected(getState());
    fetchFound({ level, character, coords })
      .then(({ found }) => {
        if (found) {
          dispatch(characterFound(character));
          dispatch(searchSuccessful({ character, coords }));
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
