import { configureStore } from "@reduxjs/toolkit";
import  Slice  from "../Slice/Slice";

export default configureStore({
  reducer: {
    user:Slice,
  },
});