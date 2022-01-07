import React from 'react'
import './Button.css'

const Button = ({ toggleButton, setToggleButton, setNo }) => {
  return (
    <div className="button">
      <div
        className="button__submit"
        onClick={() => {
          setNo(true)
          setToggleButton(!toggleButton)
        }}
      >
        Search
      </div>
    </div>
  )
}

export default Button
