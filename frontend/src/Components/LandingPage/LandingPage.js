import React, { useState, useEffect } from 'react'
import { objectToListLocations, parseBuses } from '../../util'
import { getBusesApi, getLocationsApi } from '../../http'
import TabsForm from '../TabsForm/TabsForm'
import BusLogs from '../BusLogs/BusLogs'
import Button from '../Button/Button'
import Field from '../Field/Field'
import NoBus from './NoBus/NoBus'
import Note from '../Note/Note'
import '../../App.css'

const LandingPage = () => {
  // User selected location
  const [location, setLocation] = useState({
    from: '',
    to: ''
  })

  // Locations
  const [options, setOptions] = useState([])

  // User selected date
  const [dates, setDates] = useState({
    date: '',
    day: '',
    month: ''
  })

  const [data, setData] = useState(null) // Bus data
  const [no, setNo] = useState(false) // To display if bus is not availbale
  const [buses, setBuses] = useState(null) // Set available buses
  const [toggleButton, setToggleButton] = useState(false) // Button Toggle
  const [sendDate, setSendDate] = useState('') // Date state

  // Fetch the data for locations
  const getLocations = async () => {
    try {
      const { data } = await getLocationsApi()
      const locationsList = data.locations
      objectToListLocations(locationsList, setOptions)
    } catch (error) {
      console.log('Error')
    }
  }

  // Get Buses Data
  const getData = async () => {
    try {
      const { data } = await getBusesApi()
      setData(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initial call to api
  useEffect(() => {
    getLocations()
    getData()
  }, [])

  // Parse the loaded data
  useEffect(() => {
    parseBuses(location, dates, data, setSendDate, setBuses)
  }, [toggleButton, location, data])

  return (
    <div className='app'>
      <h1 className='app__heading'>Shuttle Status</h1>
      <form>
        <Field
          options={options}
          location={location}
          setLocation={setLocation}
        />
        <TabsForm setDates={setDates} />
        <Button
          toggleButton={toggleButton}
          setToggleButton={setToggleButton}
          setNo={setNo}
        />
      </form>
      {buses ? (
        <BusLogs buses={buses} dates={dates} sendDate={sendDate} />
      ) : no ? (
        <NoBus />
      ) : (
        console.log('')
      )}
      <Note />
    </div>
  )
}

export default LandingPage
