import React, { useContext, useEffect, useState } from 'react'
import './FormTodo.scss'
import { GrFormClose } from 'react-icons/gr'
import { TodoContext } from '../../providers/TodoProvider'
import { Todo } from '../../types';

interface Props {
  id?: string
}

let colorPalette = [
  { name: 'Peach', code: '#FFDAB9', checked: false },
  { name: 'Lavender', code: '#E6E6FA', checked: false },
  { name: 'Mint', code: '#98FB98', checked: false },
  { name: 'Sky Blue', code: '#87CEEB', checked: false },
  { name: 'Coral', code: '#FF6F61', checked: false },
  { name: 'Lilac', code: '#C8A2C8', checked: false },
  { name: 'Aqua', code: '#00FFFF', checked: false }
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
    
    const newColors = colorPalette.map(color => ({...color, checked: color.name === name}))
    
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
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
      <div className='todo-form__option'>
        <button type='button' className='btn todo-form__close' onClick={handleBack}>
          <GrFormClose/>
        </button>  
      </div>  
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
        {colors.map(color => { 
          return(
           <label className='todo-form__color-label' key={color.name} style={{ borderColor: `${color.code}` }}>
              <input
                className='todo-form__color-picker'
                name={color.name}
                value={color.code}
                type='checkbox'
                checked={color.checked}
                onChange={changeColor}
              />
              <style>
                {`.todo-form__color-picker[type="checkbox"]::before {  
                  box-shadow: inset 1em 1em ${form.color}
                }`}
              </style>
          </label>
        )})}
      </div>

      <div className='todo-form__buttons'>
        <button
          type='button'
          className='btn todo-form__btn--close' 
          onClick={handleBack}>
            Cancelar
        </button>
        <button
          className='btn todo-form__btn--submit' 
          type='submit'>
          {isEdit ? 'Editar' : 'Crear'}
        </button>
      </div>
    </form>
  )
}