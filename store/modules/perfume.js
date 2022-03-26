import { createSlice } from "@reduxjs/toolkit";

const initialState = { perfume: [] };

const perfumeSlice = createSlice({
  name: "perfume",
  initialState,
  reducers: {
    getPerfume: (state, action) => {
      state.perfume = action.payload;
    },
  },
});

export const { getPerfume } = perfumeSlice.actions;
export default perfumeSlice.reducer;
