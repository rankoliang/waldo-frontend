import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

import { charactersReset } from '../characters/charactersSlice';
import { searchesReset } from '../searches/searchesSlice';

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
    level: null,
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

export const selectZoom = (state) => state.game.zoom;
export const selectLevel = (state) => state.game.level;
export const selectStartTime = createSelector(
  (state) => state.game.startTime,
  (jsonDate) => new Date(jsonDate)
);

export const selectTotalMilliseconds = createSelector(
  (state) => state.game.startTime,
  (state) => state.game.endTime,
  (startDateJSON, endDateJSON) => {
    if (!startDateJSON || !endDateJSON) return null;

    const startDate = new Date(startDateJSON);
    const endDate = new Date(endDateJSON);

    return endDate - startDate;
  }
);

export const selectPhase = (state) => state.game.phase;

export const { zoomSet, levelSet, gameReset } = gameSlice.actions;

export default gameSlice.reducer;
