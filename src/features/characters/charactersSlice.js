const charactersReducer = (state, action) => {
  switch (action.type) {
    case 'characters/set':
      const all = action.payload;
      const selected = all?.length >= 1 ? all[0] : null;

      return { ...state, all, selected };
    case 'characters/select':
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};

export const charactersSet = (payload) => {
  return { type: 'characters/set', payload };
};

export const characterSelected = (payload) => {
  return { type: 'characters/select', payload };
};

export const getCharactersInitialState = () => ({
  all: [],
  selected: null,
});

export default charactersReducer;
