import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/api";
// import Cookies from "js-cookie" 

export const fetchLogout = createAsyncThunk(
  "logout/fetchLogout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.logoutApi();
      // Cookies.remove("user_id");
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("فشل في تحميل العميل");
    }
  }
);
