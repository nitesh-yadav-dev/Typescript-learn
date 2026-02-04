import { createSlice } from "@reduxjs/toolkit";
import type { Todo } from "../../types/todo";
import { createTodo, fetchTodo, deleteTodoOne } from "./todoThunk";


type TodeState = {
    todos: Todo[];
    editId: number | null;
    loading: boolean;
    error: string| null;
}

const initialState: TodeState = {
    todos:[],
    editId: null,
    loading: false,
    error: null
}


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(fetchTodo.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTodo.fulfilled, (state, action)=>{
            state.loading = false;
            state.todos = action.payload
        })
        .addCase(fetchTodo.rejected, (state, action)=>{
            state.loading = false;
            state.error  = action.payload as string
        })
        .addCase(createTodo.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(createTodo.fulfilled, (state)=>{
            state.loading = false;
           state.error = null;
        })
        .addCase(createTodo.rejected, (state, action)=>{
            state.loading = false;
            state.error  = action.payload as string
        })

        .addCase(deleteTodoOne.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(deleteTodoOne.fulfilled, (state)=>{
            state.loading = false;
           state.error = null;
        })
        .addCase(deleteTodoOne.rejected, (state, action)=>{
            state.loading = false;
            state.error  = action.payload as string
        })
    },
})
export const {

} = todoSlice.actions

export default todoSlice.reducer;