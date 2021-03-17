import { configureStore } from '@reduxjs/toolkit';
import searchesReducer, {
  characterFound,
  searchFailed,
  selectSuccessfulSearches,
  selectFailedSearches,
} from './searchesSlice';

describe('searchesSlice', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        searches: searchesReducer,
      },
    });
  });

  describe('characterFound', () => {
    it('adds an entry to the successes state', () => {
      store.dispatch(
        characterFound({
          character: { id: 1, name: 'Wally' },
          coords: { x: 5, y: 5 },
        })
      );

      expect(selectSuccessfulSearches(store.getState())).toEqual([
        { x: 5, y: 5 },
      ]);
    });
  });

  describe('searchFailed', () => {
    it('adds an entry to the failure state', () => {
      store.dispatch(searchFailed({ x: 5, y: 5 }));
      expect(selectFailedSearches(store.getState())).toEqual([{ x: 5, y: 5 }]);
    });
  });
});
