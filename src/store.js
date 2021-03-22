import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './features/characters/charactersSlice';
import searchesReducer from './features/searches/searchesSlice';
import gameReducer from './features/game/gameSlice';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    searches: searchesReducer,
    game: gameReducer,
  },
});

export default store;
