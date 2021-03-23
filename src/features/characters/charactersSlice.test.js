import { configureStore } from '@reduxjs/toolkit';

import charactersReducer, {
  charactersSet,
  characterFound,
  selectCharactersNotFound,
} from './charactersSlice';

describe('charactersSlice', () => {
  let store;
  const characters = [
    { id: 1, name: 'Waldo' },
    { id: 2, name: 'Odlaw' },
    { id: 3, name: 'Wizard' },
  ];

  beforeEach(() => {
    store = configureStore({
      reducer: {
        characters: charactersReducer,
      },
    });
  });

  describe('initialState', () => {
    it('has an all and found state', () => {
      expect(store.getState().characters).toMatchObject({
        all: [],
        found: {},
      });
    });
  });

  describe('charactersSet', () => {
    beforeEach(() => {
      store.dispatch(charactersSet(characters));
    });

    it('sets the characters', () => {
      expect(store.getState().characters.all).toEqual(characters);
    });

    it('creates a found object with all values set to false', () => {
      expect(store.getState().characters.found).toMatchObject({
        1: false,
        2: false,
        3: false,
      });
    });
  });

  describe('characterFound', () => {
    it('sets the character to found', () => {
      store.dispatch(characterFound(characters[0]));

      expect(store.getState().characters.found[characters[0].id]).toBe(true);
    });
  });

  describe('selectCharactersNotFound', () => {
    beforeEach(() => {
      store.dispatch(charactersSet(characters));
    });

    it('returns an array of unfound characters', () => {
      store.dispatch(characterFound(characters[0]));

      expect(selectCharactersNotFound(store.getState())).toEqual(
        characters.slice(1)
      );
    });
  });
});
