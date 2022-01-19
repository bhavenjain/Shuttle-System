import React, { useState, useEffect } from 'react'
import Field from '../Field/Field'
import TabsForm from '../TabsForm/TabsForm'
import Button from '../Button/Button'
import BusLogs from '../BusLogs/BusLogs'
import Note from '../Note/Note'
import NoBus from './NoBus/NoBus'
import { getBusesApi, getLocationsApi } from '../../http'
import '../../App.css'

const LandingPage = () => {
  // User selected location
  const [location, setLocation] = useState({
    from: '',
    to: '',
  })

  const [options, setOptions] = useState([]) // Locations

  // User selected date
  const [dates, setDates] = useState({
    date: '',
    day: '',
    month: '',
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

  // Get Buses Data
  const getData = async () => {
    try {
      const { data } = await getBusesApi()
      setData(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLocations()
    getData()
  }, [])

  // Parse the loaded data
  useEffect(() => {
    if (location.from && location.to && dates.day) {
      let tempForBus = []
      data.forEach((bus) => {
        if (
          bus.to.toLowerCase() === location.to.toLowerCase() &&
          bus.from.toLowerCase() === location.from.toLowerCase() &&
          JSON.stringify(bus.date.slice(0, 2)) === JSON.stringify(dates.date) &&
          bus.remaining > 0 &&
          bus.remaining <= bus.total
        ) {
          const temp =
            dates.day + ', ' + bus.date.slice(0, 2) + ' ' + dates.month
          tempForBus.push(bus)
          setSendDate(temp)
        }
      })
      if (tempForBus.length > 0) {
        setBuses(tempForBus)
      } else {
        setBuses(null)
      }
      tempForBus = []
    }
  }, [toggleButton])

  return (
    <div className="app">
      {/* <img src={Background} className='app__back' alt='' srcset='' /> */}
      <h1 className="app__heading">Shuttle Status</h1>
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
        console.log()
      )}
      <Note />
    </div>
  )
}

export default LandingPage
