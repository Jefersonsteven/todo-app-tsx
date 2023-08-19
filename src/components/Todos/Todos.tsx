import './Todos.scss'
import { TodoItem } from '../TodoItem/TodoItem'
import { TodoContextType } from '../../types'
import { useContext, useEffect } from 'react'
import { useFilterData } from '../../hooks/useFilterData'
import { TodoContext } from '../../providers/TodoProvider'

export const Todos = () => {

  const {
    filterTodos,
    todos, 
    setTodos, 
    filter,
    search,
    loading
  } = useContext<TodoContextType>(TodoContext)

  useEffect(() => {
    useFilterData(filter, filterTodos, setTodos)
  }, [filter])

  return (
    <ul className='todos'>
      {loading ? <p>Cargando ...</p> : null}
      {todos.length === 0 && filter === 'total' && search === '' ? <p>Crea una tarea !!</p> : null}
      {todos.length === 0 && filter === 'pending' ? <p>No tienes ninguna tarea pendiente</p> : null}
      {todos.length === 0 && filter === 'complete' ? <p>No haz completado ninguna tarea</p> : null}
      {todos.length === 0 && search.length > 0 ? <p>No tienes ninguna tarea que se titulo: <strong>{search}</strong>, crea una tarea.</p> : null}

      {todos
        .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? -1 : 1))
        ?.map(({id, title, color, description, completed}) => (
        <li key={id} className='todos__todo' style={{backgroundColor: `${color}`}}>
          <TodoItem
            title={title}
            id={id}
            color={color}
            description={description}
            completed={completed}
          />
        </li>
      ))}
    </ul>
  )
}