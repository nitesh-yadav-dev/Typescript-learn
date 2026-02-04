import express from 'express'
import { createTodo, deleteTodo, getAllTodo, updateTodo } from '../controller/todoController';

const router = express.Router();


router.post('/createTodo', createTodo);
router.get('/getTodos', getAllTodo)
router.delete('/deleteTodo/:_id', deleteTodo)
router.put('/updateTodo/:_id', updateTodo)

export default router;