import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  season: "",
  sex: "",
  style: "",
  theme: "",
  mood: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    getSeason: (state, action) => {
      state.season = action.payload;
    },
    getSex: (state, action) => {
      state.sex = action.payload;
    },
    getStyle: (state, action) => {
      state.style = action.payload;
    },
    getTheme: (state, action) => {
      state.theme = action.payload;
    },
    getMood: (state, action) => {
      state.mood = action.payload;
    },
  },
});

export const {
  getSeason,
  getSex,
  getStyle,
  getMood,
  getTheme,
} = filterSlice.actions;
export default filterSlice.reducer;
