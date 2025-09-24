import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../../services/api"
import { IAddProduct } from "@/types/type";

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
export const fetchAddProducts = createAsyncThunk<IAddProduct, Omit<IAddProduct, "_id">>(
  "addProduct/fetchAddProducts",
  async (newData, { rejectWithValue }) => {
    try {
      const product = await api.AddProductsApi(newData);
      console.log(product);
      
      return product; 
    } catch (error : unknown ) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("فشل في تحميل المنتجات");
    }
  }
);
// delete

export const fetchDeleteProducts = createAsyncThunk(
  "DeleteProduct/fetchDeleteProducts",
  async ( id: string , { rejectWithValue }) => {
    try {
      const data = await api.deleteProductApi(id);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("فشل في حذف المنتجات");
    }
  }
);
// ProductsUpdate
export const fetchUpdateProduct = createAsyncThunk(
  "products/fetchUpdateProduct",
  async (
    {
      id,
      updates,
    }: {
      id: string;
      updates: Partial<{ title: string; price: number; desc: string; img: string; count: number }>;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await api.updateProductApi(id, updates);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("فشل في تعديل المنتج");
    }
  }
);
