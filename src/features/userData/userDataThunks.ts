import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/api";

export const fetchUserData = createAsyncThunk(
  "userData/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.userApi();
      // console.log(data);
      
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("فشل في تحميل العميل");
    }
  }
);
