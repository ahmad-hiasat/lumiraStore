import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../../services/api"

export const activateUser = createAsyncThunk(
  "auth/activateUser",
  async (activateData: { email: string ; otp: number }, thunkAPI) => {
    try {
      const response = await api.activate(activateData)
      
      return response
    } catch (error: unknown) {
  if (error instanceof Error) {
    return thunkAPI.rejectWithValue(error.message);
  } else {
    return thunkAPI.rejectWithValue("An unknown error occurred.");
  }
}
  }
)

