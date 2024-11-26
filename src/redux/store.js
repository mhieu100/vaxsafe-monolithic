import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slice/accountSlide";


export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});
