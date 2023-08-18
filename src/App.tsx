import { useContext } from 'react'
import './App.scss'
import { FormTodo } from './components/FormTodo/FormTodo'
import { InfoTodos } from './components/InfoTodos/InfoTodos'
import { Modal } from './components/Modal/Modal'
import { Searchbar } from './components/SearchBar/SearchBar'
import { Todos } from './components/Todos/Todos'
import { TodoContext } from './providers/TodoProvider'
import { ButtonAddTodo } from './components/ButtonAddTodo/ButtonAddTodo'
import typescript from '/images/typescript.png'
import react from '/images/react.png'

function App() {
  const {openModal, openEditModal, idTodoEdit} = useContext(TodoContext)

  return (
    <main className='main'>
      <header className='main__header'>
        <div className='main__info'>
          <h1 className='main__title'>Todo App</h1>
          <figure className='main__technologies'>
            <img className='main__logo' src={typescript} alt="typescript" />
            <img className='main__logo' src={react} alt="reactjs" />
          </figure>
        </div>
        <ButtonAddTodo/>
      </header>

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