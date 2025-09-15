import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/api";
import { fetchUserData } from "../userData/userDataThunks";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (loginData: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.login(loginData);
      await dispatch(fetchUserData());
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred.");
      }
    }
  }
);
// 
export const requestResetUserId = createAsyncThunk(
  "auth/requestResetUserId",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await api.requestResetId(email);
      return response; // {id, status, message}
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

// تحقق الـ OTP
export const changePasswordOtpUser = createAsyncThunk(
  "auth/changePasswordOtpUser",
  async ({ id, otp }: { id: string | number; otp: number }, { rejectWithValue }) => {
    try {
      const response = await api.verifyOtpApi({ id, otp });
      return response; // {message:"ok", status:true}
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

//

export const resetPasswordUser = createAsyncThunk(
  "auth/resetPasswordUser",
  async ({ id, password }: { id: string | number; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.resetPasswordApi({ id, password });
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

