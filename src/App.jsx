import React, { useEffect, useState } from 'react'
import Animate from './components/Animate'
import Notification from './components/Notification'
import Header from './components/Header'
import StatsGrid from './components/StatsGrid'
import ClearButton from './components/ClearButton'
import Input from './components/Input'
import TodoList from './components/TodoList'
import { playSound } from './components/PlaySound'

const App = () => {

  const STORAGE_KEY = "todos";

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [notification, setNotification] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false)
  
  //get from local storage
  useEffect(()=>{
    try{
      const data = localStorage.getItem(STORAGE_KEY);
      if(data){
        setTodos(JSON.parse(data))
      }
    }catch(error){
      console.log("Load error : ",error);
    }finally{
      setHasLoaded(true);
    }
  },[])

  useEffect(()=>{
    if(!hasLoaded) return;
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }catch(error){
      console.log("save error : ",error)
    }
  }, [todos, hasLoaded])

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleAddTodo = () => {
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([newTodo, ...todos]);
    setInput("")
    playSound("add")
    showNotification("✨ Task added successfully")
  };

  const toggleTodo = (id)=>{
    setTodos(todos.map((todo)=>
    todo.id===id ? {...todo, completed : !todo.completed} : todo));
    const todo = todos.find((t)=>t.id === id)
    if(!todo.completed){
      playSound("complete")
      showNotification("🎉 Great Job task completed!")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddTodo()
  };

  
  const handleEditKeyPress = (e, id) => {
    if (e.key === "Enter") {
      saveEdit(id)
    } else if (e.key === "Escape") {
      cancelEdit()
    }
  }

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    if (!editingText.trim()) return;
   
    setTodos(todos.map((todo) => (todo.id === id
      ? { ...todo, text: editingText } : todo)))
    setEditingText("");
    setEditingId(null);
    playSound("update")
    showNotification("Task updated successfully")
  };

  const cancelEdit = () => {
    setEditingText("")
    setEditingId(null)
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))  // ✅ also fixed: todo not todos
    playSound("delete")
    showNotification("🗑️ Task deleted", "info")
  }

  
  const clearCompletedTask = ()=>{
    setTodos(todos.filter((t)=>!t.completed));
    playSound("delete")
    showNotification("🗑️ Task deleted", "info")
  }

  const activeTodos = todos.filter((t)=>!t.completed).length;
  const completedTodos = todos.filter(t=>t.completed).length;
  const progress = todos.length>0 ? (completedTodos/todos.length)*100 : 0;

  return (
    <div className='min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 p-3 sm:p-6 relative overflow-hidden'>
      <Animate />
      <Notification notification={notification} onClose={() => setNotification(null)} />
      <div className='max-w-3xl mx-auto relative z-10'>
        
        <Header 
        activeTodos={activeTodos} 
        progress={progress} 
        totalTodos={progress.length}/>
        
        <StatsGrid 
          activeTodos={activeTodos}
          completeTodos={completedTodos}
          totalTodos={todos.length}
        />
        
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onAdd={handleAddTodo}
          onKeyPress={handleKeyPress}
        />

        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onStartEdit={startEditing}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
          editingId={editingId}
          editText={editingText}
          onEditTextChange={(e) => setEditingText(e.target.value)}
          onEditKeyPress={handleEditKeyPress}
          onToggle = {toggleTodo}
        />

        <ClearButton 
        completedTodos={completedTodos} 
        onClick={clearCompletedTask}/>
      </div>
    </div>
  )
}

export default App