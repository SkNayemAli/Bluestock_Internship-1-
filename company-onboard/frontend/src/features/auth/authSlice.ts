import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: null | { id: number; email: string; name?: string };
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = slice.actions;
export default slice.reducer;
