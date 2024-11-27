import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slice/accountSlide";
import centerReducer from "./slice/centerSlice";
import vaccineReducer from "./slice/vaccineSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    center: centerReducer,
    vaccine: vaccineReducer
  },
});
