import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Field from '../../Components/Field/Field'
import TabsForm from '../../Components/TabsForm/TabsForm'
import Button from '../../Components/Button/Button'
import BusLogs from '../../Components/BusLogs/BusLogs'
import Note from '../../Components/Note/Note'
import Booking from '../../Components/Booking/Booking'
import { Data } from '../../util'
import '../../App.css'
// import NotFound from './Components/NotFound'



const options = ['Botanical Garden', 'Pari Chowk', 'SNU']

const LandingPage = () => {
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
