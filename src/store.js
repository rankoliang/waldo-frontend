import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './features/characters/charactersSlice';
import searchesReducer from './features/searches/searchesSlice';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    searches: searchesReducer,
  },
});

export default store;
