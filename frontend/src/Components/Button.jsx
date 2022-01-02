import React from 'react'
import './css/Button.css'

function Button ({ toggleButton, setToggleButton }) {
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
