// features/cart/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchAddCart, fetchGetCart, fetchDeleteProductInCart, fetchDeleteAllCart, fetchBuyOrder } from "./cartThunks";

interface CartOrder {
  id: string;
  count: number;
  _id: string;
  ProductPrice:number
}

interface CartState {
  orders: CartOrder[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: CartState = {
  orders: [],
  loading: false,
  error: null,
  message: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // إضافة للسلة
    builder
      .addCase(fetchAddCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchAddCart.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(fetchAddCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // جلب السلة
    builder
      .addCase(fetchGetCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetCart.fulfilled, (state, action) => {
        state.loading = false;
          state.orders = (action.payload.ar || []).filter(
          (item: CartOrder) => Object.keys(item).length > 0
        )
      })
      .addCase(fetchGetCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // حذف منتج
    builder
      .addCase(fetchDeleteProductInCart.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order.id !== action.payload.productId);
        state.message = action.payload.message;
      })
      .addCase(fetchDeleteProductInCart.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // حذف كل المنتجات
    builder
      .addCase(fetchDeleteAllCart.fulfilled, (state, action) => {
        state.orders = [];
        state.message = action.payload.message;
      })
      .addCase(fetchDeleteAllCart.rejected, (state, action) => {
        state.error = action.payload as string;
      });
    builder
      .addCase(fetchBuyOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      })
      .addCase(fetchBuyOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message; 
        state.orders = [];
      })
      .addCase(fetchBuyOrder.rejected, (state, action) => {
        
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
