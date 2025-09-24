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

// get

type FetchError = {
  response?: {
    status?: number;
  };
  message?: string;
};

export const fetchGetCart = createAsyncThunk(
  "cart/fetchGetCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getCartApi();
      console.log(data);
      
      return data; 
    } catch (error: unknown) {
      const err = error as FetchError;

      if (err.response?.status === 404) {
        return [];
      }
      const message =
        typeof err.message === "string"
          ? err.message
          : "حدث خطأ غير متوقع أثناء جلب السلة";
      return rejectWithValue(message);
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

// checkout 

export const fetchBuyOrder = createAsyncThunk(
  "cart/fetchBuyOrder",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.buyOrderApi();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("❌ Error message:", error.message);
        return rejectWithValue(error.message);
      }
      console.log("❌ Unknown error:", error);
      return rejectWithValue("فشل في إتمام الطلب");
    }
  }
);
