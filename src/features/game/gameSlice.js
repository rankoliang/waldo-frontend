import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: { zoom: 1 },
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
  },
});

export const selectZoom = (state) => state.game.zoom;

export const { zoomSet } = gameSlice.actions;

export default gameSlice.reducer;
