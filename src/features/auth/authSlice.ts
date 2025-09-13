// import { createSlice } from "@reduxjs/toolkit"
// import { resentUser, changePasswordUser, changePasswordOtpUser } from "./authThunks"
// import Cookies from "js-cookie";
// interface AuthState {
//   loading: boolean
//   user: { id: number; token: string } | null
//   message:string | null,
//   error:string | null,
//   messageChangePass:  string | null,
//   errorChangePass:  string | null,
//   messageChangePassOtp:  string | null,
//   errorChangePassOtp:  string | null,
// }

// const initialState: AuthState = {
//   loading: false,
//   user: null,
//   message: null,
//   error: null,
//   messageChangePass: null,
//   errorChangePass: null,
//   messageChangePassOtp: null,
//   errorChangePassOtp: null,
// }

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout(state) {
//       state.user = null
//       state.message = null
//       state.error = null
//     },
//   },
//   extraReducers: (builder) => {
//     builder
// // resent code
//       // .addCase(resentUser.pending, (state) => {
//       //   state.loading = true
//       //   state.message = null
//       //   state.error = null
//       // })
//       // .addCase(resentUser.fulfilled, (state, action) => {
//       //   state.loading = false
//       //   state.message = action.payload
//       // })
//       // .addCase(resentUser.rejected, (state, action) => {
//       //   state.loading = false
//       //   state.error = action.payload as string
//       // })
      
//       // change password
//       .addCase(changePasswordUser.pending, (state) => {
//         state.loading = true
//         state.messageChangePass = null
//         state.errorChangePass = null
//       })
//       .addCase(changePasswordUser.fulfilled, (state, action) => {
//         state.loading = false
//         state.messageChangePass = action.payload
//       })
//       .addCase(changePasswordUser.rejected, (state, action) => {
//         state.loading = false
//         state.errorChangePass = action.payload as string
//       })
//       // change password otp
//       .addCase(changePasswordOtpUser.pending, (state) => {
//         state.loading = true
//         state.messageChangePassOtp = null
//         state.errorChangePassOtp = null
//       })
//       .addCase(changePasswordOtpUser.fulfilled, (state, action) => {
//         state.loading = false
//         state.messageChangePassOtp = action.payload
//         const email = action.meta.arg.email;
//         Cookies.set("reset_email", email, { expires: 7 }); 
//       })
//       .addCase(changePasswordOtpUser.rejected, (state, action) => {
//         state.loading = false
//         state.errorChangePassOtp = action.payload as string
//       })
//   },
// })

// // export const { logout } = authSlice.actions
// export default authSlice.reducer
