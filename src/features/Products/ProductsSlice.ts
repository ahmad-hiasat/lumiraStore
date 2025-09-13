// src/features/Products/ProductsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./ProductsThunks";

interface Product {
  NumberOfSales:number
  category:string
  count: number;
  _id: string;
  img: string;
  desc: string;
  title: string;
  price: number;
  livRate: number;
}
interface ProductsState {
  productsData: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  productsData: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
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
