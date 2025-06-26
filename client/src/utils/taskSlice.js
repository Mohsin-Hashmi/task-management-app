
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        addTasks: (state, action)=>{
            return action.payload;
        }
    }
})

export const {addTasks}  = taskSlice.actions;
export default taskSlice.reducer;