import { useEffect, useState } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { createTodo, deleteTodoOne, fetchTodo, updateTodoOne } from './feature/Todo/todoThunk'

function App() {
  const [input, setInput] = useState<string>("")
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState<string|null>(null)

  const handleAdd = ():void =>{
      if(!input.trim()) return;
      const payload = {
        title: input
      }
      if(editId !== null){
        const updatePayload = {
          title: input,
          _id: editId
        }
         dispatch(updateTodoOne(updatePayload));
      }else{
        dispatch(createTodo(payload));
      }
      setInput("");
  }
const handleEdit = (_id: string, title: string)=>{
  setEditId(_id)
  setInput(title);
}

const {todos}  = useAppSelector((state)=> state.todo) 
useEffect(()=>{
  dispatch(fetchTodo())
}, [dispatch])


  return (
    <div style={{ padding: 20 }}>
      <h2>Todo App (TypeScript)</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add Todo"
      />

      <button onClick={handleAdd}>
        {editId !== null ? "Update" : "Add"}
      </button>

      {todos.map((data) => (
        <div
          key={data._id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <input
            type="checkbox"
            checked={data.completed}
            // onChange={() => dispatch(toggleTodo(data._id))}
          />
          <h3 style={{ textDecoration: data.completed ? "line-through" : "none" }}>
            {data.title}
          </h3>
          <button onClick={() => dispatch(deleteTodoOne(data._id))}>Delete</button>
          <button onClick={() => handleEdit(data._id, data.title)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default App
