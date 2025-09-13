import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/api";
import { fetchUserData } from "../userData/userDataThunks";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (loginData: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.login(loginData);
       console.log("Login Response:", response);
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
