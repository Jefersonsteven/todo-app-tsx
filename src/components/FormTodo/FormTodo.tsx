import React, { useContext, useEffect, useState } from 'react'
import './FormTodo.scss'
import { GrFormClose } from 'react-icons/gr'
import { TodoContext } from '../../providers/TodoProvider'
import { Todo } from '../../types';

interface Props {
  id?: string
}

let colorPalette = [
  { name: 'Peach', code: '#FFDAB9', cheked: false },
  { name: 'Lavender', code: '#E6E6FA', cheked: false },
  { name: 'Mint', code: '#98FB98', cheked: false },
  { name: 'Sky Blue', code: '#87CEEB', cheked: false },
  { name: 'Coral', code: '#FF6F61', cheked: false },
  { name: 'Lilac', code: '#C8A2C8', cheked: false },
  { name: 'Aqua', code: '#00FFFF', cheked: false }
];

let formDefault: Todo = {
  id: crypto.randomUUID(),
  color: '#7e7e7e',
  title: '',
  description: '',
  completed: false
}

export const FormTodo: React.FC<Props> = ({ id }) => {
  const {setOpenModal, setOpenEditModal, todos, setFilterTodos, setTodos} = useContext(TodoContext)
  const [colors, setColors] = useState(colorPalette)
  const [form, setForm] = useState<Todo>(formDefault)
  const isEdit = (id && id.length > 0) ? true : false

  useEffect(() => {
    if(isEdit) {
      const newFormDefault = todos.filter(todo => todo.id === id)[0]
      setForm(newFormDefault)
  
      const newColorPallete = colorPalette.filter(color => {
        if(color.code === newFormDefault.color) return {...color, cheked: true}
        return color
      })
      setColors(newColorPallete)
    }
  }, [])



  function changeColor(event: React.ChangeEvent<HTMLInputElement>){
    const value = event?.target.value as Todo['color']
    const name = event?.target.name
    
    const newColors = colorPalette.map(color => ({...color, cheked: color.name === name}))
    
    setColors(newColors)
    setForm({
      ...form,
      color: value
    })
  }

  function handleText(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = event.target.value
    const name = event.target.name

    setForm({
      ...form,
      [name]: value
    })
  }

  function handleBack () {
    if(isEdit) setOpenEditModal(false)
    else setOpenModal(false)

    const newForm: Todo = {
      id: crypto.randomUUID(),
      color: '#7e7e7e',
      title: '',
      description: '',
      completed: false
    }

    formDefault = newForm
  }

  function handleSubmit() {
    if(isEdit) {
  
      const newTodos = todos.map(todo => {
        if(todo.id === id) {
          return {
            ...form,
            id: todo.id
          }
        }
        return todo
      })

      setTodos(newTodos)
      setFilterTodos(newTodos)
    } else {
      if(form.title === '' || form.description === '') return
      const newTodos = todos
      newTodos.push(form)
      setFilterTodos(newTodos)
    }
  
    handleBack()
  }

  return (
    <form
      className='todo-form'
      onSubmit={handleSubmit}
      style={{backgroundColor: `${form.color}`}}
    >
      <button type='button' className='todo-form__close' onClick={handleBack}>
        <GrFormClose/>
      </button>  
      <label className='todo-form__title'>
        Que tienes que hacer?
        <input
          type="text" 
          name="title"
          value={form.title} 
          placeholder='Aprender Solid ...'
          onChange={handleText}
        />
      </label>
      <label className='todo-form__description'>
        Como lo harás?
        <textarea
          value={form.description}
          name="description"
          cols={30} 
          rows={10}
          placeholder='Con la documentación de solid y videos en YouTube ...'
          onChange={handleText}
        >
        </textarea>
      </label>
      <div className='todo-form__color'>
        {colors.map(color =>(
           <label key={color.name} style={{ background: `${color.code}` }}>
           <input
             name={color.name}
             value={color.code}
             type='checkbox'
             checked={color.cheked}
             onChange={changeColor}
           />
         </label>
        ))}
      </div>

      <div className='todo-form__buttons'>
        <button
          type='button'
          className='todo-form__btn todo-form__btn--close' 
          onClick={handleBack}>
            Cancelar
        </button>
        <button
          className='todo-form__btn todo-form__btn--submit' 
          type='submit'>
          {isEdit ? 'Editar' : 'Crear'}
        </button>
      </div>
    </form>
  )
}