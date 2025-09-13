import { createSlice } from "@reduxjs/toolkit"
import { registerUser } from "./registerThunks";
interface RegisterState {
  loading: boolean
  user: { id: number; token: string } | null
  message:string | null,
  error:string | null,
}

const initialState: RegisterState = {
  loading: false,
  user: null,
  message: null,
  error: null,
}

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.message = null
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default RegisterSlice.reducer
