import React from "react"
import ReactDOM from "react-dom"
import './Modal.scss'

interface Props {
  children: React.ReactNode
}

export const Modal: React.FC<Props> = ({children}) => {
  const modal = (document.getElementById('modal') as HTMLElement)

  return ReactDOM.createPortal(
    <div className="modal">
      {children}
    </div>,
    modal
  )
}