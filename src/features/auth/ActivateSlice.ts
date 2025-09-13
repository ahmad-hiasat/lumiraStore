import { createSlice } from "@reduxjs/toolkit"
import { activateUser } from "./ActivateThunks";
interface AuthState {
  loading: boolean
  user: { id: number; token: string } | null
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
  name: "activate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(activateUser.pending, (state) => {
        state.loading = true
        state.message = null
        state.error = null
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = { id: action.payload.id, token: action.payload.token }
        state.message = "تم التفعيل بنجاح"
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default authSlice.reducer
