import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlics";
import taskReducer from "./taskSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer
  },
});
export default store;
