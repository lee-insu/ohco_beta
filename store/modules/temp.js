import { createSlice } from "@reduxjs/toolkit";

const initialState = { temp: null };

const tempSlice = createSlice({
  name: "temp",
  initialState,
  reducers: {
    getTemp: (state, action) => {
      state.temp = action.payload;
    },
  },
});

export const { getTemp } = tempSlice.actions;
export default tempSlice.reducer;
