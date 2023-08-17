import { useContext, useState } from 'react'
import { Todo, TodoContextType } from '../../types'
import './TodoItem.scss'
import { GrFormClose } from 'react-icons/gr'
import {MdEdit} from 'react-icons/md'
import { TodoContext } from '../../providers/TodoProvider'

export const TodoItem: React.FC<Todo> = ({ 
  id, 
  title, 
  color, 
  description, 
  completed
}) => {

  const {
    setFilterTodos,
    todos, 
    setTodos, 
    setFilter,
    setOpenEditModal,
    setIdTodoEdit
  } = useContext<TodoContextType>(TodoContext)

  const [openModal, setOpenModal] = useState(false)

  function handleDeleteTodo () {
    const newTodos = todos.filter(todo => todo.id !== id)

    setFilter('total')
    setTodos(newTodos)
    setFilterTodos(newTodos)
  }

  function handleEditTodo () {
    setIdTodoEdit(id)
    setOpenEditModal(true)
  }

  function handleCheckTodo () {
    const newTodos = todos.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          completed: !(todo.completed)
        }
      }
      return todo
    })

    setFilter('total')
    setFilterTodos(newTodos)
    setTodos(newTodos)
  }

  return (
    <>
    <div className='todo' style={{backgroundColor: `${color}`}}>
      <div className='todo__options'>
        <input type="checkbox" checked={completed} onChange={handleCheckTodo}/>
        <button className='todo__delete' onClick={() => setOpenModal(currentOpen => !currentOpen)}>
          <GrFormClose/>
        </button>
      </div>
      <h2 className='todo__title'>{title}</h2>
      <p className='todo__description'>{description}</p>
      <div className='todo__options2'>
        <button className='todo__edit' onClick={handleEditTodo}>
          <MdEdit/>
        </button>
      </div>
      
      {openModal && 
        <div className='modal-delete'>
          <div className='modal-delete__content'>
            <p>Estas Seguro ?!</p>
            <button onClick={() => setOpenModal(currentOpen => !currentOpen)}>Cancelar</button>
            <button onClick={handleDeleteTodo}>Eliminar</button>
          </div>
        </div>
      }
    </div>
    </>
  )
}