// import List from './List'

// const list = [
//   {
//     id: 1,
//     title: 'Learn HTML',
//     //active | complete
//     status: 'complete',
//   },
//   {
//     id: 2,
//     title: 'Learn JS',
//     status: 'active',
//   },
//   {
//     id: 3,
//     title: 'Learn Tailwind',
//     status: 'active',
//   },
// ]

// function App() {
//   return (
//     <>
//       <header className='primary-header'>
//         <div className='container'>
//           <h1>TODO</h1>
//           <button className='theme-toggler-btn'>
//             <img src='./icon-sun.svg' alt='theme-toggler-icon' />
//           </button>
//         </div>
//       </header>

//       <main>
//         <section>
//           <div className='container'>
//             <form className='todo-form'>
//               <div className='form-control'>
//                 <input
//                   type='text'
//                   className='todo'
//                   placeholder='e.i. complete homework'
//                 />
//                 <button type='submit' className='submit-btn'>
//                   Submit
//                 </button>
//               </div>
//             </form>

//             <div className='todo-container'>
//               <List items={list} />

//               <div className='todo-container-footer'>
//                 <p>3 item left</p>

//                 <div className='btn-container'>
//                   <button className='show-all-btn'>all</button>
//                   <button className='show-active-btn'>active</button>
//                   <button className='show-complete-btn'>completed</button>
//                 </div>

//                 <button className='clear-btn'>clear item</button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   )
// }

// export default App

import { useState, useEffect } from 'react'
import List from './List'
import { ToastContainer, toast } from 'react-toastify'

const getLocalStorage = () => {
  let todos = localStorage.getItem('todos')
  if (todos) {
    return (todos = JSON.parse(localStorage.getItem('todos')))
  } else {
    return []
  }
}

function App() {
  const [todos, setTodos] = useState(getLocalStorage())
  const [name, setName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  const handleClearList = () => {
    setTodos([])
  }
  const removeItem = (id) => {
    // [1, 2, 3, 4]
    const newTodos = todos.filter(function (todo) {
      return todo.id != id
    })
    setTodos(newTodos)
    console.log('removeItem ' + id)
  }
  const handleChange = (e) => {
    setName(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      alert('Please write todo')
    } else if (name && isEditing) {
      const newTodosList = todos.map(function (todo) {
        if (todo.id === editId) {
          return { ...todo, title: name }
        }
        return todo
      })

      setTodos(newTodosList)

      setIsEditing(false)
      setEditId(null)
    } else {
      const newTodo = {
        id: new Date().getTime().toString(),
        title: name,
        status: 'active',
      }
      setTodos([...todos, newTodo])
      setName('')
    }
  }
  const editItem = (id) => {
    const specificTodo = todos.find((todo) => todo.id === id)
    setIsEditing(true)
    setEditId(specificTodo.id)
    setName(specificTodo.title)
  }

  // todo complete filter
  const handleFilter = (e) => {
    let btnClicked = e.target.textContent
    if (btnClicked === 'all') {
    } else if (btnClicked === 'active') {
    } else if (btnClicked === 'completed') {
    }
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <header className='primary-header'>
        <div className='container'>
          <h1>todo</h1>
          <button className='theme-toggler-btn'>
            <img src='./icon-sun.svg' alt='theme-toggler-icon' />
          </button>
        </div>
      </header>

      <main>
        <section>
          <div className='container'>
            <form className='todo-form' onSubmit={handleSubmit}>
              <div className='form-control'>
                <input
                  type='text'
                  className='todo'
                  placeholder='e.i. complete homework'
                  value={name}
                  onChange={handleChange}
                />
                <button type='submit' className='submit-btn'>
                  {isEditing ? 'edit' : 'submit'}
                </button>
              </div>
            </form>

            {todos.length >= 1 ? (
              <div className='todo-container'>
                <List
                  items={todos}
                  removeItem={removeItem}
                  editItem={editItem}
                />
                <div className='todo-container-footer'>
                  <p>{todos.length} items left</p>

                  <div className='btn-container' onClick={handleFilter}>
                    <button className='show-all-btn'>all</button>
                    <button className='show-active-btn'>active</button>
                    <button className='show-completed-btn'>completed</button>
                  </div>

                  <button className='clear-btn' onClick={handleClearList}>
                    clear items
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
