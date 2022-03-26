import { createSlice } from "@reduxjs/toolkit";

const initialState = { cody: [] };

const codySlice = createSlice({
  name: "cody",
  initialState,
  reducers: {
    getCody: (state, action) => {
      state.cody = action.payload;
    },
  },
});

export const { getCody } = codySlice.actions;
export default codySlice.reducer;
