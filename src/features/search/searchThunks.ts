// features/search/searchThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/api";

export const fetchSearchProducts = createAsyncThunk(
  "search/fetchSearchProducts",
  async (title: string, { rejectWithValue }) => {
    try {
      if (title.length < 3) {
        return rejectWithValue("Min search length is 3");
      }
      const data = await api.searchProductsApi(title);
      console.log(data);
      
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("فشل البحث عن المنتجات");
    }
  }
);
