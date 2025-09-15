import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../../services/api"


export const fetchProducts = createAsyncThunk(
  "productData/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.productApi();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("فشل في تحميل المنتجات");
    }
  }
);
export const fetchAddProducts = createAsyncThunk(
  "AddProduct/fetchAddProducts",
  async (NewData: { title: string; price: number; desc: string , img:string , count:number}, { rejectWithValue }) => {
    try {
      const data = await api.AddProductsApi(NewData);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("فشل في تحميل المنتجات");
    }
  }
);
export const fetchDeleteProducts = createAsyncThunk(
  "DeleteProduct/fetchDeleteProducts",
  async ( {id} : { id: string }, { rejectWithValue }) => {
    try {
      const data = await api.deleteProductApi(id);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("فشل في تحميل المنتجات");
    }
  }
);