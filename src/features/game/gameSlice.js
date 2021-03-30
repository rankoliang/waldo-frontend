import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

import { charactersReset } from '../characters/charactersSlice';
import { searchesReset } from '../searches/searchesSlice';
import { clamp } from '../../helpers';

export const gameStarted = createAsyncThunk(
  'gameStartedStatus',
  async (_, { dispatch }) => {
    dispatch(gameReset());
    dispatch(charactersReset());
    dispatch(searchesReset());

    return { startTime: new Date().toJSON() };
  }
);

export const gameEnded = createAsyncThunk('gameEndedStatus', async () => {
  return { endTime: new Date().toJSON() };
});

const getInitialState = () => {
  return {
    zoom: 1,
    magnification: 1,
    level: null,
    token: null,
    duration: null,
    startTime: null,
    endTime: null,
    phase: null,
  };
};

const gameSlice = createSlice({
  name: 'game',
  initialState: getInitialState(),
  reducers: {
    zoomSet: {
      reducer: (state, action) => {
        const { zoom } = action.payload;

        state.zoom = zoom;
      },
      prepare: (zoom) => {
        return { payload: { zoom } };
      },
    },
    levelSet: {
      reducer: (state, action) => {
        const { level } = action.payload;

        state.level = level;
      },
      prepare: (level) => {
        return { payload: { level } };
      },
    },
    gameMagnified: (state, action) => {
      const magnification = action.payload;

      state.magnification = clamp(state.magnification * magnification, 1, 3.5);
    },
    magnificationReset: (state) => {
      state.magnification = 1;
    },
    tokenSet: (state, action) => {
      const { token } = action.payload;

      state.token = token;
    },
    durationSet: (state, action) => {
      const { duration } = action.payload;

      state.duration = duration;
    },
    gameExited: (state) => {
      state.phase = null;
    },
    gameReset: getInitialState,
  },
  extraReducers: {
    [gameStarted.fulfilled]: (state, action) => {
      const { startTime } = action.payload;

      state.startTime = startTime;
      state.phase = 'started';
    },
    [gameEnded.fulfilled]: (state, action) => {
      const { endTime } = action.payload;

      state.endTime = endTime;
      state.phase = 'ended';
    },
  },
});

export const selectZoom = (state) => state.game.zoom * state.game.magnification;
export const selectLevel = (state) => state.game.level;
export const selectToken = (state) => state.game.token;
export const selectDuration = (state) => state.game.duration;
export const selectStartTime = createSelector(
  (state) => state.game.startTime,
  (jsonDate) => new Date(jsonDate)
);

export const selectPhase = (state) => state.game.phase;

export const {
  zoomSet,
  levelSet,
  gameReset,
  gameExited,
  gameMagnified,
  magnificationReset,
  tokenSet,
  durationSet,
} = gameSlice.actions;

export default gameSlice.reducer;
