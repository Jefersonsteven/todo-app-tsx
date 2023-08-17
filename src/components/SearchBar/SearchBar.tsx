import { useContext } from 'react';
import './SearchBar.scss'
import { GrSearch } from 'react-icons/gr';
import { TodoContext } from '../../providers/TodoProvider';
import { TodoContextType } from '../../types';

export const Searchbar = () => {
  const {
    filterTodos,
    setTodos,
    setFilter, 
    search, 
    setSearch
  } = useContext<TodoContextType>(TodoContext)

  function handleInput (event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setSearch(value)

    let newTodos
    if(value !== '') {
      newTodos = filterTodos.filter(todo => {
        const todoTitle = todo.title.toLowerCase()
        const searchValue = value.toLowerCase()

        return todoTitle.includes(searchValue)
      })
    } else {
      newTodos = filterTodos
    }
    setFilter('total')
    setTodos(newTodos)
  }

  return (
    <div className='search'>  
      <GrSearch />
      <input className='search__input' type="text" value={search} onChange={handleInput}/>
    </div>
  )
}