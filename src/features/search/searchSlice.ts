import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchProducts } from "./searchThunks";

interface SearchState {
  results: [];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // هنا لازم تتأكد الباي لود جاي ازاي
        state.results = action.payload.products || action.payload || [];
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "حدث خطأ أثناء البحث";
      });
  },
});

export const { clearResults } = searchSlice.actions;
export default searchSlice.reducer;
