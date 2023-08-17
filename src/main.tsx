import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.scss'
import { TodoProvider } from './providers/TodoProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoProvider>
      <App />
      <div id='modal'></div>
    </TodoProvider>
  </React.StrictMode>,
)
