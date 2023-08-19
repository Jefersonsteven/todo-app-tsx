import { useContext, useState } from 'react'
import { Todo, TodoContextType } from '../../types'
import './TodoItem.scss'
import { MdOutlineDelete } from 'react-icons/md'
import {MdEdit} from 'react-icons/md'
import { TodoContext } from '../../providers/TodoProvider'

export const TodoItem: React.FC<Todo> = ({ 
  id, 
  title,
  description, 
  completed
}) => {

  const {
    setFilterTodos,
    todos, 
    setTodos, 
    setFilter,
    setOpenEditModal,
    setIdTodoEdit,
    filterTodos
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
    const newTodos = filterTodos.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          completed: !(todo.completed)
        }
      }
      return todo
    })

    setFilterTodos(newTodos)
    setTodos(newTodos)
    setFilter('total')
  }

  return (
    <>
    <div className='todo'>
      <div className='todo__options'>
        <input className='todo__check' type="checkbox" checked={completed} onChange={handleCheckTodo}/>
        <button className='btn todo__delete' onClick={() => setOpenModal(currentOpen => !currentOpen)}>
          <MdOutlineDelete/>
        </button>
      </div>
      <h2 className={`todo__title ${completed ? 'todo__text--complete' : ''}`}>{title}</h2>
      <p className={`todo__description ${completed ? 'todo__text--complete' : ''}`}>{description}</p>
      <div className='todo__options2'>
        <button className='btn todo__edit' onClick={handleEditTodo}>
          <MdEdit/>
        </button>
      </div>
      
      {openModal && 
        <div className='modal-delete'>
          <div className='modal-delete__content'>
            <p className='modal-delete__title'>Estas Seguro ?!</p>
            <div className='modal-delete__buttons'>
              <button className='btn modal-delete__button modal-delete__button--cancel' onClick={() => setOpenModal(currentOpen => !currentOpen)}>Cancelar</button>
              <button className='btn modal-delete__button modal-delete__button--delete' onClick={handleDeleteTodo}>Eliminar</button>
            </div>
          </div>
        </div>
      }
    </div>
    </>
  )
}