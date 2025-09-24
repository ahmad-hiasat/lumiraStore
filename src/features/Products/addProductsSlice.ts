import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAddProducts } from "./ProductsThunks";
import { IAddProduct } from "@/types/type";

interface AddState {
  newProduct: IAddProduct | null;
  loading: boolean;
  error: string | null;
}

const initialState: AddState = {
  newProduct: null,
  loading: false,
  error: null,
};

const addProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    resetAddState: (state) => {
      state.newProduct = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddProducts.fulfilled, (state, action: PayloadAction<IAddProduct>) => {
        state.loading = false;
        state.newProduct = action.payload;
      })
      .addCase(fetchAddProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAddState } = addProductSlice.actions;
export default addProductSlice.reducer;
