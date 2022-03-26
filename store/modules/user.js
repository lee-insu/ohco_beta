import { createSlice } from "@reduxjs/toolkit";

const initialState = { displayName: "", isLogin: false };

const userSlice = createSlice({
  name: "displayName",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.displayName = action.payload;
      state.isLogin = true;
    },
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
