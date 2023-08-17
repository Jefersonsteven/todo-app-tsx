import { useContext } from 'react'
import './App.scss'
import { FormTodo } from './components/FormTodo/FormTodo'
import { InfoTodos } from './components/InfoTodos/InfoTodos'
import { Modal } from './components/Modal/Modal'
import { Searchbar } from './components/SearchBar/SearchBar'
import { Todos } from './components/Todos/Todos'
import { TodoContext } from './providers/TodoProvider'
import { ButtonAddTodo } from './components/ButtonAddTodo/ButtonAddTodo'

function App() {
  const {openModal, openEditModal, idTodoEdit} = useContext(TodoContext)

  return (
    <main>
      <ButtonAddTodo/>
      <Searchbar />
      <InfoTodos />
      <Todos />

      {openModal &&
        <Modal>
          <FormTodo/>
        </Modal>
      }

      {openEditModal &&
        <Modal>
          <FormTodo id={idTodoEdit}/>
        </Modal>
      }
    </main>
  )
}

export default App