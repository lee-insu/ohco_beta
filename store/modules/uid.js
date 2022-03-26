import { createSlice } from "@reduxjs/toolkit";

const initialState = { uid: null };

const uidSlice = createSlice({
  name: "uid",
  initialState,
  reducers: {
    getUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const { getUid } = uidSlice.actions;
export default uidSlice.reducer;
