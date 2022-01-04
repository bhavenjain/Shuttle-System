import React, { useState, useEffect } from 'react'
import Field from '../../Components/Field/Field'
import TabsForm from '../../Components/TabsForm/TabsForm'
import Button from '../../Components/Button/Button'
import BusLogs from '../../Components/BusLogs/BusLogs'
import Note from '../../Components/Note/Note'
import Booking from '../../Components/Booking/Booking'
import { Data } from '../../util'
import axios from 'axios'
import '../../App.css'
// import NotFound from './Components/NotFound'

//const options = ['Botanical Garden', 'Pari Chowk', 'SNU']

const LandingPage = () => {
  const [location, setLocation] = useState({
    from: '',
    to: ''
  })

const [options, setOptions] = useState([])

const [dates, setDates] = useState({
    date: '',
    day: '',
    month: ''
  })

  const [data, setData] = useState(null)

  const [buses, setBuses] = useState(null)
  const [toggleButton, setToggleButton] = useState(false)
  const [sendDate, setSendDate] = useState('')

 // Fetch the data
const getLocations = async() => {
  axios
  .get('http://localhost:5000/api/getLocations')
  .then(response => {
    const see = response.data.locations
    let temp = []
    see.forEach(item => {
      temp.push(item.locations)
    })
    setOptions(temp)
    console.log(temp)
  })
  .catch(error => alert('Not Recived'))
}

const getData = async () => {
    axios
      .get('http://localhost:5000/api/getbuses')
      .then(response => {
        const see = response.data
        setData(see.data)
        console.log(see.data)
      })
      .catch(error => alert('Not Recived'))
  }

  useEffect(() => {
    getLocations()
    getData()
  }, [])

  useEffect(() => {
    if (location.from && location.to && dates.day) {
      let tempForBus = []
      // console.log(toggleButton)
      data.forEach(bus => {
        if (
          bus.to.toLowerCase() === location.to.toLowerCase() &&
          bus.from.toLowerCase() === location.from.toLowerCase() &&
          JSON.stringify(bus.date) === dates.date && (bus.remaining > 0 && bus.remaining <= bus.total)
        ) {
          const temp =
            dates.day + ', ' + JSON.stringify(bus.date) + ' ' + dates.month
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
    <div className='app'>
      
      <h1 className='app__heading'>Shuttle Status</h1>
      <form>
        <Field
          options={options}
          location={location}
          setLocation={setLocation}
        />
        <TabsForm dates={dates} setDates={setDates} />
        <Button toggleButton={toggleButton} setToggleButton={setToggleButton} />
      </form>
      {buses ? (
        <BusLogs buses={buses} dates={dates} sendDate={sendDate} />
      ) : (
        <h1></h1>
      )}

      <Note />
      {/* <NotFound /> */}
      {/* <Booking /> */}
    </div>
  )
}

export default LandingPage
