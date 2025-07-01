import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTasks: (state, action) => {
      return action.payload;
    },
      addSingleTask: (state, action) => {
    state.push(action.payload); // appends one task
  },
    removeTask: (state, action) =>
      state.filter((task) => task._id !== action.payload),
  },
});

export const { addTasks, addSingleTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
