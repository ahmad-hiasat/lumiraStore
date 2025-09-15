import { createSlice } from "@reduxjs/toolkit";
import { changePasswordOtpUser, loginUser, requestResetUserId, resetPasswordUser } from "./LoginThunks";

interface AuthState {
  loading: boolean;
  user: {
    id: number;
    isAdmin: boolean;
  } | null;
  message: string | null;
  error: string | null;
  resetId: string | null; // لإمساك id المستخدم بعد إرسال الإيميل
  messageActivate: string | null;
  errorActivate: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  message: null,
  error: null,
  resetId: null,
  messageActivate: null,
  errorActivate: null,
};

const forgetPasswordSlice = createSlice({
  name: "forget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload.id,
          isAdmin: action.payload.isAdmin,
        };
        state.message = "تم تسجيل الدخول بنجاح";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // requestResetUserId
    builder
      .addCase(requestResetUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestResetUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.resetId = action.payload.id;
        state.message = action.payload.message; // "enter otp"
      })
      .addCase(requestResetUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // changePasswordOtpUser
    builder
      .addCase(changePasswordOtpUser.pending, (state) => {
        state.loading = true;
        state.errorActivate = null;
        state.messageActivate = null;
      })
      .addCase(changePasswordOtpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.messageActivate = action.payload.message;
      })
      .addCase(changePasswordOtpUser.rejected, (state, action) => {
        state.loading = false;
        state.errorActivate = action.payload as string;
      })
      //
      builder
  .addCase(resetPasswordUser.pending, (state) => {
    state.loading = true;
    state.error = null;
    state.message = null;
  })
  .addCase(resetPasswordUser.fulfilled, (state, action) => {
    state.loading = false;
    state.message = action.payload.message; 
  })
  .addCase(resetPasswordUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });

  },
});

export default forgetPasswordSlice.reducer;
