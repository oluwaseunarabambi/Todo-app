import React, {useState} from "react"


function Todo() {

    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const handleInputChange = (e)=> {
        setInputValue(e.target.value);
    }

    const addTodo = ()=> {
        if (inputValue.trim() !== '') {
            setTodos([...todos, {id: Date.now(), text: inputValue}]);
            setInputValue('');
        }
    };

    const editTodo = (id)=> {
       setEditId(id);  
       setEditValue(todos.find(todo => todo.id === id).text);
    };

    const saveEdit = ()=> {
        setTodos(todos.map(todo=> todo.id === editId ? {...todo, text: editValue } : todo));
        setEditId(null);
        setEditValue('');
    };

    const cancelEdit = ()=> {
        setEditId(null);
        setEditValue('');
    };

    const deleteTodo = (id)=> {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    console.log(addTodo);
    
    return (

        <div className="todo-app">
            <h1>Machala Todo Application</h1>

            <div className="todo-input">

                <input 
                    type="text" 
                    value={inputValue}
                    onChange={handleInputChange} 
                    placeholder="Enter a new Task"
                />

                <button onClick={addTodo}>Add Todo</button>
                    
            </div>
            <ul className="todo-list">
              {todos.map((todo) => (
                
                <li key={todo.id}>
                    {editId === todo.id ? (
                        <>
                        
                            <input 
                                type="text" 
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}  
                            />

                            <button onClick={saveEdit}>Save</button>
                            <button onClick={cancelEdit}>Cancel</button>
                        </>
                    ) : (
                      
                      <>

                        <span>{todo.text}</span>
                        <div className="actions">
                            
                            <button onClick={()=> editTodo(todo.id)}>Edit Task</button>
                            <button onClick={()=> deleteTodo(todo.id)}>Delete Task</button>

                        </div>

                      </>
                    )}    

                    </li>
            
                ))}  
            </ul>
        </div>
    );
};


export default Todo;