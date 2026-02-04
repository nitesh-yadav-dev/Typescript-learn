import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


type updatePayload = {
    _id: string;
    title: string;
}

export const fetchTodo = createAsyncThunk('todo/fetchTodos', async(_, thunkAPI)=>{
    try {
        const response = await axios.get("http://localhost:5000/todo/getTodos");
        return response.data.todos
    } catch (error:any) {
         return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch todo');
    }
})


export const createTodo = createAsyncThunk('todo/createTodo', async(payload:object, thunkAPI)=>{
    try {
        const response = await axios.post("http://localhost:5000/todo/createTodo", payload)
        thunkAPI.dispatch(fetchTodo())
        return response.data
    } catch (error:any) {
         return thunkAPI.rejectWithValue(error.response?.data || 'Failed to create Todo');
    }
})

export const deleteTodoOne = createAsyncThunk('todo/deleteTodo', async(_id:string, thunkAPI)=>{
    try {
        const response = await axios.delete(`http://localhost:5000/todo/deleteTodo/${_id}`)
        thunkAPI.dispatch(fetchTodo())
        return response.data
    } catch (error:any) {
         return thunkAPI.rejectWithValue(error.response?.data || 'Failed to create Todo');
    }
})

export const updateTodoOne = createAsyncThunk('todo/updateTodoOne', async(payload:updatePayload, thunkAPI)=>{
    console.log(payload, "ppp")
    try {
        const response = await axios.put(`http://localhost:5000/todo/updateTodo/${payload._id}`,  payload)
        thunkAPI.dispatch(fetchTodo())
        return response.data
    } catch (error:any) {
         return thunkAPI.rejectWithValue(error.response?.data || 'Failed to create Todo');
    }
})