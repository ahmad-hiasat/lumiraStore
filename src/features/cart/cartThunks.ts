import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/api";
export const fetchAddCart = createAsyncThunk(
  "cart/fetchAddCart",
  async ({ productId, count }: { productId: string; count: number }, { rejectWithValue }) => {
    try {
      const data = await api.AddCartApi({ productId, count });
      return data; 
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("فشل في إضافة المنتج للسلة");
    }
  }
);

export const fetchGetCart = createAsyncThunk(
  "cart/fetchGetCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getCartApi();
       console.log("Cart API response:", data);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("فشل في تحميل السلة");
    }
  }
);

// Delete
export const fetchDeleteProductInCart = createAsyncThunk(
  "cart/fetchDeleteProductInCart",
  async ({ productId }: { productId: string }, { rejectWithValue }) => {
    try {
      const data = await api.deleteCartApi(productId);
      return { productId, ...data };
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("فشل في حذف المنتج من السلة");
    }
  }
);

// Delete all
export const fetchDeleteAllCart = createAsyncThunk(
  "cart/fetchDeleteAllCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.deleteAllCartApi();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("فشل في حذف السلة بالكامل");
    }
  }
);
