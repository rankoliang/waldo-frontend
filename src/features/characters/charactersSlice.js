const charactersReducer = (state, action) => {
  switch (action.type) {
    case 'characters/set':
      const all = action.payload;
      const selected = all?.length >= 1 ? all[0] : null;
      const found = initialFound(all);

      return { ...state, all, selected, found };
    case 'characters/select':
      return { ...state, selected: action.payload };
    case 'characters/found':
      return { ...state, found: { ...state.found, [action.payload.id]: true } };
    default:
      return state;
  }
};

const initialFound = (characters) => {
  return Object.fromEntries(
    characters.map((character) => [character.id, false])
  );
};

export const charactersSet = (characters) => {
  return { type: 'characters/set', payload: characters };
};

export const characterSelected = (character) => {
  return { type: 'characters/select', payload: character };
};

export const characterFound = (character) => {
  return { type: 'characters/found', payload: character };
};

export const getCharactersInitialState = () => ({
  all: [],
  selected: null,
  found: {},
});

export default charactersReducer;
