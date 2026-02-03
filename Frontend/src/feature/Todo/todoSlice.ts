import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../../types/todo";


type TodeState = {
    todos: Todo[];
    editId: number | null
}

const initialState: TodeState = {
    todos:[],
    editId: null,
}


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
        addTodo(state, action:PayloadAction<string>){
            state.todos.push({
                id:Date.now(),
                title:action.payload,
                completed:false
            })
        },
        toggleTodo(state, action:PayloadAction<number>){
            const todo = state.todos.find(td => td.id === action.payload);
            if(todo){
                todo.completed  = !todo.completed;
            }
        },
        deleteTodo(state, action:PayloadAction<number>){
            state.todos = state.todos.filter(td => td.id !== action.payload);
        },
        setEditTodo(state, action:PayloadAction<number>){
            state.editId = action.payload;
        },
        updateTodo(state, action:PayloadAction<string>){
            const todo = state.todos.find(td => td.id === state.editId);
            if(todo){
                todo.title  = action.payload;
            }
            state.editId = null;       
         }

    }
})
export const {
    addTodo,
    toggleTodo,
    deleteTodo,
    setEditTodo,
    updateTodo,
} = todoSlice.actions

export default todoSlice.reducer;