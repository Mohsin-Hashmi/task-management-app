import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTasks: (state, action) => {
      return action.payload;
    },
    removeTask: (state, action) =>
      state.filter((task) => task._id !== action.payload),
  },
});

export const { addTasks, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
