import { Request, Response } from "express";
import Todo from "../models/Todo";

export const createTodo = async(req: Request, res: Response)=>{
try {
    const { title } = req.body;
    const newTodo = await Todo.create({ title, completed: false})
    if(!newTodo){
        return res.status(500).json({message: "Something went wrong"});
    }
    return res.status(201).json({todo: newTodo})
} catch (error: any) {
    res.status(500).json({message: error.message});
}
}


export const getAllTodo = async(req:Request, res:Response)=>{
    try {
        const todos = await Todo.find();
        if(!todos){
            return res.status(500).json({message: "No todos found"});
        }

        return res.status(200).json({todos})
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export const deleteTodo = async(req: Request, res: Response)=>{
try {
    const { _id } = req.params;
    const todo = await Todo.findByIdAndDelete(_id)
    if(!todo){
        return res.status(500).json({message: "Todo not found"});
    }
    return res.status(201).json({message: "Todo deleted Sucessfully", todo})
} catch (error: any) {
    res.status(500).json({message: error.message});
}
}


export const updateTodo = async(req: Request, res: Response)=>{
try {
    const { _id } = req.params;
    const {title} = req.body;
    const todo = await Todo.findByIdAndUpdate(
        _id,
       { title},
       {new: true}
    )
    if(!todo){
        return res.status(500).json({message: "Todo not found"});
    }
    return res.status(201).json({message: "Todo updated Sucessfully", todo})
} catch (error: any) {
    res.status(500).json({message: error.message});
}
}


