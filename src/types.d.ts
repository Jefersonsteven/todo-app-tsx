export type Hex = `#${string}`

export interface Todo {
  id: string
  title: string
  color: Hex
  description: string
  completed: boolean
}

export type Todos = Todo[]

export interface TodoContextType {
  filterTodos: Todos
  setFilterTodos: (todos: Todos) => void
  todos: Todos
  setTodos: (todos: Todos) => void
  filter: string
  setFilter: (filter: string) => void
  search: string
  setSearch: (search: string) => void
  loading: boolean
  setLoading: (state: boolean) => void
  openModal: boolean
  openEditModal: boolean,
  setOpenModal: (state: boolean) => void
  setOpenEditModal: (state: boolean) => void
  idTodoEdit: string
  setIdTodoEdit: (state: string) => void
}