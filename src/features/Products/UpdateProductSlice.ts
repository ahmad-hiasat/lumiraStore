// features/Products/updateProductSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUpdateProduct } from "./ProductsThunks";

interface Product {
  _id: string;
  title: string;
  price: number;
  desc: string;
  img: string;
  count: number;
}

interface UpdateProductState {
  loading: boolean;
  error: string | null;
  updatedProduct: Product | null;
}

const initialState: UpdateProductState = {
  loading: false,
  error: null,
  updatedProduct: null,
};

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.loading = false;
      state.error = null;
      state.updatedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updatedProduct = null;
      })
      .addCase(fetchUpdateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.updatedProduct = action.payload;
      })
      .addCase(fetchUpdateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUpdateState } = updateProductSlice.actions;
export default updateProductSlice.reducer;
