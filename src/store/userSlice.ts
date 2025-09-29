import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  userId: number | null;
  role: string | null;
}

const initialState: userState = {
  userId: null,
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    clearUserId: (state) => {
      state.userId = null;
    },
    setUserRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    clearUserRole: (state) => {
      state.role = null;
    },
    clearUserInfo: (state) => {
      state.userId = null;
      state.role = null;
    },
  },
});

export const { setUserId, clearUserId, setUserRole, clearUserRole, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
