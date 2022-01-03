import React, { useState, useEffect } from 'react'
import AddLocation from './AddLocation/AddLocation'
import AddBus from './AddBus/AddBus'
import axios from 'axios'
import './Admin.css'

const Admin = () => {
  const [options, setOptions] = useState([])

  // Fetch the data
  const getData = async () => {
    axios
      .get('http://localhost:5000/api/getLocations')
      .then(response => {
        const see = response.data.locations
        let temp = []
        see.forEach(item => {
          temp.push(item.locations)
        })
        setOptions(temp)
        // console.log(temp)
      })
      .catch(error => alert('Not Recived'))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='admin'>
      <AddLocation options={options} />
    </div>
  )
}

export default Admin
