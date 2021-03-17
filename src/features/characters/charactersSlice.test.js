import charactersReducer, {
  getCharactersInitialState,
  charactersSet,
  characterSelected,
  characterFound,
} from './charactersSlice';

describe('charactersSlice', () => {
  let state;
  let dispatch;
  const characters = [
    { id: 1, name: 'Waldo' },
    { id: 2, name: 'Odlaw' },
    { id: 3, name: 'Wizard' },
  ];

  beforeEach(() => {
    state = getCharactersInitialState();
    dispatch = (action) => {
      state = charactersReducer(state, action);
    };
  });

  describe('initialState', () => {
    it('has an all and selected state', () => {
      expect(state).toMatchObject({ all: [], selected: null, found: {} });
    });
  });

  describe('charactersSet', () => {
    beforeEach(() => {
      dispatch(charactersSet(characters));
    });

    it('sets the characters', () => {
      expect(state.all).toEqual(characters);
    });

    it('selects the first character', () => {
      expect(state.selected).toEqual(characters[0]);
    });

    it('creates a found object with all values set to false', () => {
      expect(state.found).toMatchObject({
        1: false,
        2: false,
        3: false,
      });
    });
  });

  describe('characterSelected', () => {
    it('selects the chosen character', () => {
      dispatch(characterSelected(characters[1]));

      expect(state.selected).toMatchObject(characters[1]);
    });
  });

  describe('characterFound', () => {
    it('sets the character to found', () => {
      dispatch(characterFound(characters[0]));

      expect(state.found[characters[0].id]).toBe(true);
    });
  });
});
