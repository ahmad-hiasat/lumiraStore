import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../../services/api"

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: { email: string; password: string; username: string }, thunkAPI) => {
    try {
      const response = await api.signup(userData)
      return response.message;
    } catch (error: unknown) {
  if (error instanceof Error) {
    return thunkAPI.rejectWithValue(error.message);
  } else {
    return thunkAPI.rejectWithValue("An unknown error occurred.");
  }
}
  }
)