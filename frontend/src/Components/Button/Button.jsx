import React from 'react'
import './Button.css'

const Button = ({ toggleButton, setToggleButton, setNo, getData }) => {
  return (
    <div className="button">
      <div
        className="button__submit"
        onClick={() => {
          setNo(true)
          setToggleButton(!toggleButton)
          getData()
        }}
      >
        Search
      </div>
    </div>
  )
}

export default Button
