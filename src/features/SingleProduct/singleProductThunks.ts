import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../../services/api"


export const fetchSingleProduct = createAsyncThunk(
  "SingleProductData/fetchSingleProduct",
  async (id:string, { rejectWithValue }) => {
    try {
      const data = await api.SingleProductApi(id);
      return data;
    } catch (error: unknown) {
  if (error instanceof Error) {
    return rejectWithValue(error.message);
  }
  return rejectWithValue("فشل في تحميل المنتجات");
}
  }
);