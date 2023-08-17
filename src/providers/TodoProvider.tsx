import React, { createContext, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { TodoContextType, Todos } from "../types"

const defaultValue: TodoContextType = {
  filterTodos: [],
  setFilterTodos: () => {},
  todos: [],
  setTodos: () => {},
  filter: 'total',
  setFilter: () => {},
  search: "",
  setSearch: () => {},
  loading: false,
  setLoading: () => {},
  openModal: false,
  openEditModal: false,
  setOpenModal: () => {},
  setOpenEditModal: () => {},
  idTodoEdit: '',
  setIdTodoEdit: () => {}
};

export const TodoContext = createContext<TodoContextType>(defaultValue)

interface Props {
  children: React.ReactNode
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [openEditModal, setOpenEditModal] = useState(defaultValue.openEditModal)
  const [openModal, setOpenModal] = useState(defaultValue.openModal)
  const [loading, setLoading] = useState(defaultValue.loading)
  const [filterTodos, setFilterTodos] = useLocalStorage<Todos>('TODOS', defaultValue.filterTodos)
  const [todos, setTodos] = useState<Todos>(filterTodos)
  const [filter, setFilter] = useState(defaultValue.filter)
  const [search, setSearch] = useState('')
  const [idTodoEdit, setIdTodoEdit] = useState(defaultValue.idTodoEdit)

  const contextValue: TodoContextType = {
    filterTodos,
    setFilterTodos,
    todos,
    setTodos,
    filter,
    setFilter,
    search,
    setSearch,
    loading,
    setLoading,
    openModal,
    openEditModal,
    setOpenModal,
    setOpenEditModal,
    idTodoEdit,
    setIdTodoEdit
  }

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  )
}