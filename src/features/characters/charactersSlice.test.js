import { configureStore } from '@reduxjs/toolkit';

import charactersReducer, {
  charactersSet,
  characterSelected,
  characterFound,
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
    it('has an all and selected state', () => {
      expect(store.getState().characters).toMatchObject({
        all: [],
        selected: null,
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

    it('selects the first character', () => {
      expect(store.getState().characters.selected).toEqual(characters[0]);
    });

    it('creates a found object with all values set to false', () => {
      expect(store.getState().characters.found).toMatchObject({
        1: false,
        2: false,
        3: false,
      });
    });
  });

  describe('characterSelected', () => {
    it('selects the chosen character', () => {
      store.dispatch(characterSelected(characters[1]));

      expect(store.getState().characters.selected).toMatchObject(characters[1]);
    });
  });

  describe('characterFound', () => {
    it('sets the character to found', () => {
      store.dispatch(characterFound(characters[0]));

      expect(store.getState().characters.found[characters[0].id]).toBe(true);
    });
  });
});
