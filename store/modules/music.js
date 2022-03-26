import { createSlice } from "@reduxjs/toolkit";

const initialState = { music: [] };

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    getMusic: (state, action) => {
      state.music = action.payload;
    },
  },
});

export const { getMusic } = musicSlice.actions;
export default musicSlice.reducer;
