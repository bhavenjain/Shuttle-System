import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Components/Navbar'
import Field from './Components/Field'
import TabsForm from './Components/TabsForm'
import Button from './Components/Button'
import BusLogs from './Components/BusLogs'
import Note from './Components/Note'
import { Data } from './util'
import './App.css'

const options = ['Botanical Garden', 'Pari Chowk', 'SNU']

function App () {
  const [location, setLocation] = useState({
    from: '',
    to: ''
  })

  const [dates, setDates] = useState({
    date: '',
    day: '',
    month: ''
  })

  const [buses, setBuses] = useState(null)
  const [toggleButton, setToggleButton] = useState(false)
  const [sendDate, setSendDate] = useState('')

  useEffect(() => {
    // console.log(buses)
  }, [buses])

  useEffect(() => {
    if (location.from && location.to && dates.day) {
      let tempForBus = []
      // console.log(toggleButton)
      Data.forEach(bus => {
        if (
          bus.to === location.to.toLowerCase() &&
          bus.from === location.from.toLowerCase() &&
          JSON.stringify(bus.date) === dates.date
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
      <Navbar />
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
    </div>
  )
}

export default App
