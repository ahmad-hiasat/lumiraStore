import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleProduct } from "./singleProductThunks";

interface Product {
  _id: string;
  title: string;
  desc: string;
  price: number;
  img: string;
  count: number;
  NumberOfSales:number
}
interface SingleProductState {
    SingleProductId: Product | null ;
    loading: boolean;
    error: string | null;
  }
const initialState: SingleProductState = {
    SingleProductId: null,
    loading: false,
    error: null,
};
const SingleProductSlice = createSlice({
  name: "SingleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.SingleProductId = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default SingleProductSlice.reducer;
