import React, { useState, useEffect } from 'react'
import AddLocation from './AddLocation/AddLocation'
import AddBus from './AddBus/AddBus'
import { getLocationsApi } from '../../http'
import AdminLogin from "../Login/AdminLogin"
import { objectToListLocations } from '../../util'
import './Admin.css'

const Admin = () => {
  const [options, setOptions] = useState([])
  const [auth, setAuth] = useState(false)

  // Fetch the Locations
  const getData = async () => {
    try {
      const { data } = await getLocationsApi()
      const locationsList = data.locations
      setOptions(...options,locationsList);
      // objectToListLocations(locationsList, setOptions)
    } catch (error) {
      console.log('Error')
    }
  }
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='admin'>
      {auth ? (<>
        <AddLocation options={options} />
        <AddBus options={options} />
      </>) : <AdminLogin setAuth={setAuth} />}
    </div>
  )
}

export default Admin
