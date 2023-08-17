import React, { useContext } from 'react'
import './InfoTodos.scss'
import { TodoContext } from '../../providers/TodoProvider'
import { TodoContextType } from '../../types'

export const InfoTodos = () => {

  const {
    filterTodos,
    filter, 
    setFilter,
    setSearch
  } = useContext<TodoContextType>(TodoContext)

  const complete = filterTodos.filter(todo => !!todo.completed).length
  const pending = filterTodos.filter(todo => !todo.completed).length
  const total = filterTodos.length

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const dataValue = (event.target as HTMLButtonElement).dataset.type
    if(dataValue && dataValue !== filter) {
      setFilter(dataValue)
      setSearch('')
    } 
  }

  return (
    <div className='info-todos'>
      <button 
        className={`${filter === 'complete' ? 'select-filter' : ''}`} 
        onClick={handleClick} 
        data-type="complete"
      >
          Completados: {complete}
      </button>
      <button 
        className={`${filter === 'pending' ? 'select-filter' : ''}`} 
        onClick={handleClick} 
        data-type="pending"
      >
        Pendientes: {pending}
      </button>
      <button 
        className={`${filter === 'total' ? 'select-filter' : ''}`} 
        onClick={handleClick} 
        data-type="total"
      >
        Totales: {total}
      </button>
    </div>
  )
}