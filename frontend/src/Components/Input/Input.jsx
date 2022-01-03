import React from 'react'
import "./Input.css"

const Input = ({ field, handleChange }) => {
  return (
    <div>
      <label className='input'>
        <input className='input__field' type='text' placeholder=' ' onChange={handleChange} />
        <span className='input__label'>{field}</span>
      </label>
    </div>
  )
}

export default Input
