import { IoAdd } from 'react-icons/io5'
import './ButtonAddTodo.scss'
import { useContext } from 'react'
import { TodoContext } from '../../providers/TodoProvider'

export const ButtonAddTodo = () => {
  const {setOpenModal} = useContext(TodoContext)
  
  function handleClick() {
    setOpenModal(true)
  }
  return (
    <button onClick={handleClick} className='btn btn-add' aria-label='Agregar otra tarea'>
      <IoAdd />
    </button>
  )
}