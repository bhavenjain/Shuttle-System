import React, { useState, useEffect } from 'react'
import AddLocation from './AddLocation/AddLocation'
import AddBus from './AddBus/AddBus'
import { getLocationsApi } from '../../http'
import { objectToListLocations } from '../../util'
import './Admin.css'

const Admin = () => {
  const [options, setOptions] = useState([])

  // Fetch the Locations
  const getData = async () => {
    try {
      const { data } = await getLocationsApi()
      const locationsList = data.locations
      objectToListLocations(locationsList, setOptions)
    } catch (error) {
      console.log('Error')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='admin'>
      <AddLocation options={options} />
      <AddBus options={options} />
    </div>
  )
}

export default Admin
