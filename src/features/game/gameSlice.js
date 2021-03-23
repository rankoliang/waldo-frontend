import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: { zoom: 1, level: null },
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
});

export const selectZoom = (state) => state.game.zoom;
export const selectLevel = (state) => state.game.level;

export const { zoomSet, levelSet } = gameSlice.actions;

export default gameSlice.reducer;
