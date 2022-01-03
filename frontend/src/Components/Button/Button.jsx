import React from 'react'
import './Button.css'

const Button = ({ toggleButton, setToggleButton }) => {
  return (
    <div className='button'>
      <div
        className='button__submit'
        onClick={() => {
          setToggleButton(!toggleButton)
        }}
      >
        Search
      </div>
    </div>
  )
}

export default Button