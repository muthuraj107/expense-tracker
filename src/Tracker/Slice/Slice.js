import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "user",
  initialState: {
    auth: false,
    userId: "",
    userName: "",
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setUserData: (state, action) => {
      state.userId = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    removeAuth: (state) => {
      state.auth = false;
    },
    removeUserId: (state, action) => {
      state.userId = "";
    },
  },
});
export const { setAuth, setUserData, removeAuth, removeUserId, setUserName } =
  Slice.actions;
export default Slice.reducer;