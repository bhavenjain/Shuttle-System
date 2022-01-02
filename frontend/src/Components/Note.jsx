import React from 'react'
import './css/Note.css'

function Note () {
  return (
    <div className='note'>
      <div className='note__content'>
        <h4>Note: </h4>
        <ul>
          <li>The cost of each ticket is rupees 50.</li>
          <li>
            The shuttle runs only between these locations:
            <ul>
              <li>Botanical Garden</li>
              <li>Pari Chowk</li>
              <li>SNU</li>
            </ul>
          </li>
          <li>All the students are responsible for their own belongings</li>
        </ul>
      </div>
    </div>
  )
}

export default Note
