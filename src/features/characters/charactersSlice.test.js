import charactersReducer, {
  getCharactersInitialState,
  charactersSet,
  characterSelected,
} from './charactersSlice';

describe('charactersSlice', () => {
  let state;
  let dispatch;

  beforeEach(() => {
    state = getCharactersInitialState();
    dispatch = (action) => {
      state = charactersReducer(state, action);
    };
  });

  describe('initialState', () => {
    it('has an all and selected state', () => {
      expect(state).toMatchObject({ all: [], selected: null });
    });
  });

  describe('charactersSet', () => {
    const characters = [
      { id: 1, name: 'Waldo' },
      { id: 2, name: 'Odlaw' },
      { id: 3, name: 'Wizard' },
    ];

    beforeEach(() => {
      dispatch(charactersSet(characters));
    });

    it('sets the characters', () => {
      expect(state.all).toEqual(characters);
    });

    it('selects the first character', () => {
      expect(state.selected).toEqual(characters[0]);
    });
  });

  describe('characterSelected', () => {
    const characters = [
      { id: 1, name: 'Waldo' },
      { id: 2, name: 'Odlaw' },
      { id: 3, name: 'Wizard' },
    ];

    it('selects the chosen character', () => {
      dispatch(characterSelected(characters[1]));

      expect(state.selected).toMatchObject(characters[1]);
    });
  });
});
