import { createSlice } from "@reduxjs/toolkit"
import { loginUser } from "./LoginThunks";
interface AuthState {
  loading: boolean
  user: {
     id: number
     isAdmin:boolean
     } | null
  message:string | null,
  error:string | null,
}
const initialState: AuthState = {
  loading: false,
  user: null,
  message: null,
  error: null,
}

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.message = null
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = {
        id: action.payload.id,
        isAdmin: action.payload.isAdmin
    }
        state.message = "تم تسجيل الدخول بنجاح"
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

  },
})
export default authSlice.reducer
