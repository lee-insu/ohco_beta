import { createSlice } from "@reduxjs/toolkit";

const initialState = { email: null };

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    getEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { getEmail } = emailSlice.actions;
export default emailSlice.reducer;
