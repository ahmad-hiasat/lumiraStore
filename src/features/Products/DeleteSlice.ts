import { createSlice } from "@reduxjs/toolkit";
import { fetchDeleteProducts } from "./ProductsThunks";

interface AddProductsState {
  loading: boolean;
  error: string | null;
  message : string | null
}

const initialState: AddProductsState = {
  loading: false,
  error: null,
  message: null
};

const productsSlice = createSlice({
  name: "DeleteProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeleteProducts.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchDeleteProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(fetchDeleteProducts.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
  },
});

export default productsSlice.reducer;
