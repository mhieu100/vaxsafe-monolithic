import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slice/accountSlide";
import centerReducer from "./slice/centerSlice";
import vaccineReducer from "./slice/vaccineSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    center: centerReducer,
    vaccine: vaccineReducer,
    user: userReducer,
  },
});
