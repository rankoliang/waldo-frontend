import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

export const gameStarted = createAsyncThunk('gameStartedStatus', async () => {
  return { startTime: new Date().toJSON() };
});

const gameSlice = createSlice({
  name: 'game',
  initialState: { zoom: 1, level: null, startTime: null },
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
  },
  extraReducers: {
    [gameStarted.fulfilled]: (state, action) => {
      const { startTime } = action.payload;

      state.startTime = startTime;
    },
  },
});

export const selectZoom = (state) => state.game.zoom;
export const selectLevel = (state) => state.game.level;
export const selectStartTime = createSelector(
  (state) => state.game.startTime,
  (jsonDate) => new Date(jsonDate)
);

export const { zoomSet, levelSet } = gameSlice.actions;

export default gameSlice.reducer;
