// import { createAsyncThunk } from "@reduxjs/toolkit"
// import * as api from "../../services/api"

// // resent code 
// export const resentUser = createAsyncThunk(
//   "auth/resentUser",
//   async (resentData: { email: string }, thunkAPI) => {
//     try {
//       const response = await api.resentCode(resentData)
//       return response
//     } catch (error: unknown) {
//   if (error instanceof Error) {
//     return thunkAPI.rejectWithValue(error.message);
//   } else {
//     return thunkAPI.rejectWithValue("An unknown error occurred.");
//   }
// }
//   }
// )
// // change password
// export const changePasswordUser = createAsyncThunk(
//   "auth/changePasswordUser",
//   async (changePasswordData: { email: string , password:string }, thunkAPI) => {
//     try {
//       const response = await api.changePassword(changePasswordData)
//       return response
//     } catch (error: unknown) {
//   if (error instanceof Error) {
//     return thunkAPI.rejectWithValue(error.message);
//   } else {
//     return thunkAPI.rejectWithValue("An unknown error occurred.");
//   }
// }
//   }
// )
// // change password otp
// export const changePasswordOtpUser = createAsyncThunk(
//   "auth/changePasswordOtpUser",
//   async (changePasswordDataOtp: { email: string , otp: number }, thunkAPI) => {
//     try {
//       const response = await api.changePasswordOtp(changePasswordDataOtp)
//       return response
//     } catch (error: unknown) {
//   if (error instanceof Error) {
//     return thunkAPI.rejectWithValue(error.message);
//   } else {
//     return thunkAPI.rejectWithValue("An unknown error occurred.");
//   }
// }
//   }
// )

