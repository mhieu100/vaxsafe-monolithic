import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slice/accountSlide";
import centerReducer from "./slice/centerSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    center: centerReducer,
  },
});
