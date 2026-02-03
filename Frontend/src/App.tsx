import { useState } from 'react'

import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { addTodo, deleteTodo, setEditTodo, toggleTodo, updateTodo } from './feature/Todo/todoSlice'

function App() {
  const [input, setInput] = useState<string>("")
  const dispatch = useAppDispatch();
  const {todos, editId} = useAppSelector(state => state.todo)

  const handleAdd = ():void =>{
      if(!input.trim()) return;
      if(editId !== null){
         dispatch(updateTodo(input));
      }else{
        dispatch(addTodo(input));
      }
      setInput("");
  }

const handleEdit = (id: number, title: string)=>{
  dispatch(setEditTodo(id))
  setInput(title);
}


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
          key={data.id}
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
            onChange={() => dispatch(toggleTodo(data.id))}
          />
          <h3 style={{ textDecoration: data.completed ? "line-through" : "none" }}>
            {data.title}
          </h3>
          <button onClick={() => dispatch(deleteTodo(data.id))}>Delete</button>
          <button onClick={() => handleEdit(data.id, data.title)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default App
