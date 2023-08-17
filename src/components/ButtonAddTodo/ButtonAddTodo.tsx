import { BiAddToQueue } from 'react-icons/bi'
import './ButtonAddTodo.scss'
import { useContext } from 'react'
import { TodoContext } from '../../providers/TodoProvider'

export const ButtonAddTodo = () => {
  const {setOpenModal} = useContext(TodoContext)
  
  function handleClick() {
    setOpenModal(true)
  }
  return (
    <button onClick={handleClick} className='btn-add' aria-label='Agregar otra tarea'>
      <BiAddToQueue />
    </button>
  )
}