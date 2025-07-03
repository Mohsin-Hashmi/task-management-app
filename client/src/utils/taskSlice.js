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
    removeTask: (state, action) => {
      return state.filter((task) => task._id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.findIndex((task) => task._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload; // Overwrite the updated task
      }
    },
  },
});

export const { addTasks, addSingleTask, removeTask, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
