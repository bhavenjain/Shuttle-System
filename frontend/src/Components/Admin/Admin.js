import React, { useState, useEffect } from 'react'
import AddLocation from './AddLocation/AddLocation'
import AddBus from './AddBus/AddBus'
import UpdateBus from './UpdateBus/UpdateBus'
import DeleteBus from './DeleteBus/DeleteBus'
import { getLocationsApi, handleGetApi } from '../../http'
import AdminLogin from '../Login/AdminLogin'
import { objectToListLocations } from '../../util'
import './Admin.css'

const Admin = () => {
  const [options, setOptions] = useState([])
  const [page, setPage] = useState(0)
  const [auth, setAuth] = useState(false)

  // Fetch the Locations
  const baseURL = process.env.REACT_APP_API_URL
  const getData = async () => {
    try {
      const data = await handleGetApi(`${baseURL}/location-getLocations`)
      console.log(data)
      const locationsList = data.locations
      setOptions(...options, locationsList)
      // objectToListLocations(locationsList, setOptions)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='admin'>
      {auth ? (
        <>
          {page === 0 ? (
            <div className="admin__section1">
              <button className='admin__options' onClick={() => setPage(1)}>
                Add/Delete Location
              </button>
              <button className='admin__options' onClick={() => setPage(2)}>
                Add Bus
              </button>
              <button className='admin__options' onClick={() => setPage(3)}>
                Update Bus
              </button>
              <button className='admin__options' onClick={() => setPage(4)}>
                Delete Bus
              </button>
            </div>
          ) : (
            <>
              {page === 1 ? <AddLocation options={options} setPage={setPage} /> : console.log('')}
              {page === 2 ? <AddBus options={options} setPage={setPage} /> : console.log('')}
              {page === 3 ? <UpdateBus options={options} setPage={setPage} /> : console.log('')}
              {page === 4 ? <DeleteBus options={options} setPage={setPage} /> : console.log('')}
            </>
          )}
        </>
      ) : (
        <AdminLogin setAuth={setAuth} />
      )}
    </div>
  )
}

export default Admin
