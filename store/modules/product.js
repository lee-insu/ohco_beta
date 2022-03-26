import { createSlice } from "@reduxjs/toolkit";

const initialState = { product: [] };

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { getProduct } = productSlice.actions;
export default productSlice.reducer;
