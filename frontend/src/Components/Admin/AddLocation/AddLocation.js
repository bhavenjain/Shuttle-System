import React, { useState, useEffect } from 'react'
import Input from '../../Input/Input'
import './AddLocation.css'

const options = ['Botanical Garden', 'Pari Chowk', 'SNU']

const AddLocation = () => {
  const [addLocation, setAddLocation] = useState('')
  const [addLocationButton, setAddLocationButton] = useState(false)

  const handleChange = event => {
    setAddLocation(event.target.value)
  }

  useEffect(() => {
    options.push(addLocation)
    console.log(options)
  }, [addLocationButton])

  return (
    <div className='addLocation'>
      <form action=''>
        <label htmlFor=''>Add a location:</label>
        <Input field='Add Location' handleChange={handleChange} />
        <button
          className='addLocation__button'
          onClick={() => {
            setAddLocationButton(!addLocationButton)
          }}
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default AddLocation
