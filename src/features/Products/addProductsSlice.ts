import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./ProductsThunks";

interface Product {
    title: string;
    price: number;
    desc: string;
    img: string;
    count: number;
}
interface AddProductsState {
  productsData: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: AddProductsState = {
  productsData: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "AddProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productsData = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;
