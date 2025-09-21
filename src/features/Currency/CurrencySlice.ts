// src/features/currency/CurrencySlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrency } from "./CurrencyThunks";

interface CurrencyState {
  country: string;
  price: number;
  loading: boolean;
  error: string | null;
}

const initialState: CurrencyState = {
  country: "",
  price: 0,
  loading: false,
  error: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.loading = false;
        state.country = action.payload.country;
        state.price = action.payload.price;
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }),
});

export default currencySlice.reducer;
