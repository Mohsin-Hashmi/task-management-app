import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlics";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
