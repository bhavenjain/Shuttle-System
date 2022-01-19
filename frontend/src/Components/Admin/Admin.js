import React, { useState, useEffect } from 'react'
import AddLocation from './AddLocation/AddLocation'
import AddBus from './AddBus/AddBus'
import { getLocationsApi } from '../../http'
import './Admin.css'

const Admin = () => {
  const [options, setOptions] = useState([])

  // Fetch the Locations
  const getData = async () => {
    try {
      const { data } = await getLocationsApi()
      const see = data.locations
      let temp = []
      see.forEach((item) => {
        temp.push(item.locations)
      })
      temp.sort()
      setOptions(temp)
    } catch (error) {
      console.log('Error')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="admin">
      <AddLocation options={options} />
      <AddBus options={options} />
    </div>
  )
}

export default Admin
