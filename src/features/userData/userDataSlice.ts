import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "./userDataThunks";

interface userType {
status: boolean,
id: number,
email: string,
username:string,
funds : number
isAdmin:boolean
}

interface userState {
  userData: userType | null ;
  loading: boolean | null;
  error: string | null;
}

const initialState: userState = {
  userData: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    logout(state) {
      state.userData = null
      state.loading = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { logout } = userSlice.actions
export default userSlice.reducer;
