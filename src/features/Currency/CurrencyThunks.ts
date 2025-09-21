import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/api";

export const fetchCurrency = createAsyncThunk(
  "currency/fetchCurrency",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getCurrencyApi();
      // console.log("Currency API response:", data);
      return data; // 
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("فشل في تحميل العملة");
    }
  }
);
